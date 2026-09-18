"""Filesystem-based Agriculture Wiki Service with strict path safety."""

import os
import re
import base64
import logging
from pathlib import Path
from typing import List, Optional, Dict, Any
from PIL import Image

from backend.config import WIKI_DIR
from backend.schemas import (
    CropInfo,
    ProblemSummary,
    ProblemDetail,
    ValidationIssue,
    WikiValidationReport,
)
from backend.wiki_parser import (
    parse_wiki_document,
    validate_document,
    extract_frontmatter,
    WikiParseError,
)


class PathTraversalError(ValueError):
    """Raised when an illegal path traversal attempt is detected."""
    pass


class WikiService:
    """
    Filesystem-based Wiki reader for 'wiki/agriculture/'.
    Maintains Markdown files as the sole source of truth with zero DB overhead.
    """

    def __init__(self, wiki_root: Optional[Path] = None):
        self.wiki_root = Path(wiki_root).resolve() if wiki_root else WIKI_DIR.resolve()

    def is_installed(self) -> bool:
        """Check if the wiki directory exists and contains crop content."""
        if not self.wiki_root.exists() or not self.wiki_root.is_dir():
            return False
        # Consider installed if there is at least one child directory or markdown file
        try:
            entries = list(self.wiki_root.iterdir())
            return any(e.is_dir() for e in entries)
        except OSError:
            return False

    def _sanitize_name(self, name: str, param_name: str = "identifier") -> str:
        """
        Sanitize and validate a crop or problem name.
        Rejects traversal patterns, separators, absolute paths, and null bytes.
        """
        if not name or not isinstance(name, str):
            raise PathTraversalError(f"Invalid {param_name}: must be a non-empty string.")

        cleaned = name.strip()
        if not cleaned:
            raise PathTraversalError(f"Invalid {param_name}: cannot be blank.")

        # Reject null bytes
        if "\0" in cleaned:
            raise PathTraversalError(f"Illegal characters detected in {param_name}.")

        # Reject absolute paths (POSIX and Windows)
        if cleaned.startswith("/") or cleaned.startswith("\\"):
            raise PathTraversalError(f"Absolute paths not permitted in {param_name}.")
        if len(cleaned) > 1 and cleaned[1] == ":":
            raise PathTraversalError(f"Drive specifiers not permitted in {param_name}.")

        # Reject path separators to prevent directory traversal
        if "/" in cleaned or "\\" in cleaned:
            raise PathTraversalError(f"Path separators not permitted in {param_name}.")

        # Reject traversal tokens
        if ".." in cleaned or cleaned == ".":
            raise PathTraversalError(f"Path traversal tokens not permitted in {param_name}.")

        return cleaned

    def _resolve_crop_dir(self, crop: str) -> Path:
        """Safely resolve crop directory path and enforce root sandboxing."""
        safe_crop = self._sanitize_name(crop, "crop")
        target_dir = (self.wiki_root / safe_crop).resolve()

        if not target_dir.exists() and self.wiki_root.exists():
            aliases = {
                "tomato": "vegetables",
                "paddy": "Rice",
                "bt cotton": "Cotton",
                "chilli": "vegetables",
                "brinjal": "vegetables",
                "eggplant": "vegetables",
                "okra": "vegetables",
                "onion": "vegetables"
            }
            alias_target = aliases.get(safe_crop.lower())
            if alias_target and (self.wiki_root / alias_target).is_dir():
                target_dir = (self.wiki_root / alias_target).resolve()
            else:
                for item in self.wiki_root.iterdir():
                    if item.is_dir() and item.name.lower() == safe_crop.lower():
                        target_dir = item.resolve()
                        break

        # Strict sandbox check: must be direct child or inside wiki_root
        try:
            target_dir.relative_to(self.wiki_root)
        except ValueError as err:
            raise PathTraversalError(f"Access denied: crop '{crop}' escapes wiki root.") from err

        return target_dir

    def _resolve_problem_file(self, crop: str, problem: str) -> Path:
        """Safely resolve problem markdown file path within a crop."""
        crop_dir = self._resolve_crop_dir(crop)
        safe_problem = self._sanitize_name(problem, "problem")

        # Strip .md if supplied by caller for convenience
        if safe_problem.lower().endswith(".md"):
            safe_problem = safe_problem[:-3]

        target_file = (crop_dir / f"{safe_problem}.md").resolve()

        # Strict containment check
        try:
            target_file.relative_to(crop_dir)
            target_file.relative_to(self.wiki_root)
        except ValueError as err:
            raise PathTraversalError(f"Access denied: problem '{problem}' escapes safe directory.") from err

        # Case-insensitive resolution if direct file doesn't exist but directory exists
        if not target_file.exists() and crop_dir.exists() and crop_dir.is_dir():
            target_lower = f"{safe_problem.lower()}.md"
            for item in crop_dir.iterdir():
                if item.is_file() and item.name.lower() == target_lower:
                    return item.resolve()

        return target_file

    def list_crops(self) -> List[str]:
        """List all crop names present in wiki/agriculture/."""
        if not self.is_installed():
            return []
        
        crops = []
        for item in sorted(self.wiki_root.iterdir()):
            if item.is_dir() and not item.name.startswith("."):
                crops.append(item.name)
        return crops

    def get_crop(self, crop: str) -> CropInfo:
        """Get summary info and problems list for a crop."""
        if not self.is_installed():
            return CropInfo(crop=crop, problem_count=0, problems=[])

        crop_dir = self._resolve_crop_dir(crop)
        if not crop_dir.exists() or not crop_dir.is_dir():
            return CropInfo(crop=crop, problem_count=0, problems=[])

        problems = self.list_problems(crop)
        return CropInfo(crop=crop, problem_count=len(problems), problems=problems)

    def _is_problem_file(self, file_path: Path, crop_name: str) -> bool:
        """Determines if a markdown file is a problem/disease file rather than an index/overview."""
        if not file_path.is_file() or file_path.suffix.lower() != ".md":
            return False
        stem = file_path.stem.strip().lower()
        if stem.startswith(".") or stem.startswith("_") or stem == "readme":
            return False
        # Files named exactly after the crop (e.g. rice.md in Rice/, Wheat.md in Wheat/) are Obsidian crop indexes
        if stem == crop_name.strip().lower():
            return False
        return True

    def list_problems(self, crop: str) -> List[str]:
        """List all problem names (without .md) for a given crop."""
        if not self.is_installed():
            return []

        crop_dir = self._resolve_crop_dir(crop)
        if not crop_dir.exists() or not crop_dir.is_dir():
            return []

        problems = []
        for f in sorted(crop_dir.iterdir()):
            if self._is_problem_file(f, crop):
                problems.append(f.stem)
        return problems

    def get_problem(self, crop: str, problem: str) -> ProblemDetail:
        """
        Load a specific problem document, parsing frontmatter and returning ProblemDetail.
        Raises FileNotFoundError if wiki is not installed or problem not found.
        """
        if not self.is_installed():
            raise FileNotFoundError("Wiki not installed: 'wiki/agriculture/' does not exist or has no entries.")

        file_path = self._resolve_problem_file(crop, problem)
        if not file_path.exists() or not file_path.is_file():
            raise FileNotFoundError(f"Problem file '{problem}' not found for crop '{crop}'.")

        try:
            content = file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            content = file_path.read_text(encoding="latin-1")

        rel_path = str(file_path.relative_to(self.wiki_root.parent.parent)).replace("\\", "/")
        return parse_wiki_document(content, relative_path=rel_path)

    def find_reference_image(self, crop: str, problem_detail: ProblemDetail) -> Optional[Path]:
        """
        Dynamically discover and validate a local reference image for a candidate disease.
        Inspects:
          1. Frontmatter 'image' or 'reference_image' field
          2. Markdown sections: '## Reference Images', '## Reference Image'
          3. Convention-based file matching in the crop directory
        Strictly validates image readability via PIL. Returns None if absent, corrupted, or invalid.
        Never invents an image or fakes visual evidence.
        """
        if not self.is_installed():
            return None

        try:
            crop_dir = self._resolve_crop_dir(crop)
        except Exception:
            return None

        if not crop_dir.exists() or not crop_dir.is_dir():
            return None

        valid_exts = {".jpg", ".jpeg", ".jpe", ".png", ".webp"}
        candidates_to_check: List[str] = []

        # 1. Frontmatter fields
        extra = getattr(problem_detail.frontmatter, "extra", {}) or {}
        for key in ["image", "reference_image", "reference_images"]:
            val = extra.get(key)
            if isinstance(val, str) and val.strip():
                candidates_to_check.append(val.strip())
            elif isinstance(val, list):
                for item in val:
                    if isinstance(item, str) and item.strip():
                        candidates_to_check.append(item.strip())

        # 2. Markdown sections (e.g. ## Reference Images, ## Reference Image)
        sections = problem_detail.sections or {}
        for sec_name in ["Reference Images", "Reference Image", "Reference Image Notes"]:
            sec_text = sections.get(sec_name, "")
            if sec_text:
                # Extract markdown links: ![alt](path)
                md_links = re.findall(r"!\[.*?\]\((.*?)\)", sec_text)
                candidates_to_check.extend(md_links)
                # Extract filenames from backticks or bullets: `image.jpg` or - image.jpg
                quoted_matches = re.findall(r"[`\"']([a-zA-Z0-9_\-\.\s]+\.(?:jpe?g|png|webp))[`\"']", sec_text, re.IGNORECASE)
                candidates_to_check.extend(quoted_matches)

        # 3. Directory convention-based matching
        # Gather all actual image files in crop_dir
        actual_images = [f for f in crop_dir.iterdir() if f.is_file() and f.suffix.lower() in valid_exts]

        # Candidate name tokens
        problem_title = problem_detail.frontmatter.problem.strip()
        file_stem = Path(problem_detail.relative_path).stem if problem_detail.relative_path else problem_title
        clean_stem = file_stem.replace("_", " ").lower()
        clean_crop = crop.lower()
        # Strip crop name from problem stem if prefixed (e.g. "Pearl_Millet_Blast" -> "Blast")
        stripped_stem = clean_stem.replace(clean_crop, "").strip()

        # Check direct candidates first
        for cand_str in candidates_to_check:
            clean_cand = cand_str.replace("\\", "/").strip().strip("`").strip("\"").strip("'")
            cand_path = (crop_dir / clean_cand).resolve()
            # Enforce sandbox containment
            try:
                cand_path.relative_to(self.wiki_root)
                if cand_path.is_file() and cand_path.suffix.lower() in valid_exts:
                    if self._is_valid_image(cand_path):
                        return cand_path
            except ValueError:
                continue

        # If not found via direct reference, match with actual images in crop_dir
        for img_file in actual_images:
            img_stem = img_file.stem.strip().lower()
            # Exact match with stripped stem (e.g. "blast" == "blast")
            if img_stem == stripped_stem or img_stem == clean_stem or img_stem == problem_title.lower():
                if self._is_valid_image(img_file):
                    return img_file
            # Substring / fuzzy token match if distinctive
            elif stripped_stem and (stripped_stem in img_stem or img_stem in stripped_stem):
                if self._is_valid_image(img_file):
                    return img_file

        return None

    def _is_valid_image(self, path: Path) -> bool:
        """Validate that an image file exists, is readable, and is a valid image format."""
        if not path.exists() or not path.is_file():
            return False
        try:
            with Image.open(path) as img:
                img.verify()
            return True
        except Exception:
            return False

    def load_reference_image_base64(self, image_path: Path) -> Optional[str]:
        """Convert validated local reference image to base64 data URI."""
        if not self._is_valid_image(image_path):
            return None
        try:
            raw_bytes = image_path.read_bytes()
            suffix = image_path.suffix.lower().lstrip(".")
            mime = "image/png" if suffix == "png" else ("image/webp" if suffix == "webp" else "image/jpeg")
            b64 = base64.b64encode(raw_bytes).decode("utf-8")
            return f"data:{mime};base64,{b64}"
        except Exception as err:
            logging.getLogger(__name__).warning(f"Failed to load reference image base64 from {image_path}: {err}")
            return None


    def search_problems(self, crop: str, query: str) -> List[ProblemSummary]:
        """Search problems in a crop matching a query string in title or body."""
        if not self.is_installed() or not query:
            return []

        q = query.lower().strip()
        crop_dir = self._resolve_crop_dir(crop)
        if not crop_dir.exists() or not crop_dir.is_dir():
            return []

        results: List[ProblemSummary] = []
        for f in sorted(crop_dir.iterdir()):
            if f.is_file() and f.suffix.lower() == ".md" and not f.name.startswith("."):
                try:
                    text = f.read_text(encoding="utf-8")
                    if q in f.stem.lower() or q in text.lower():
                        meta, _ = extract_frontmatter(text)
                        rel_path = str(f.relative_to(self.wiki_root.parent.parent)).replace("\\", "/")
                        results.append(ProblemSummary(
                            crop=meta.get("crop", crop),
                            problem=meta.get("problem", f.stem),
                            relative_path=rel_path,
                            type=meta.get("type"),
                            status=meta.get("status")
                        ))
                except Exception:
                    continue

        return results

    def validate_wiki(self) -> WikiValidationReport:
        """
        Comprehensive integrity validation of wiki/agriculture/.
        Detects missing frontmatter, missing crops/problems, duplicate names,
        malformed YAML, and missing recommended sections.
        Returns 'Wiki not installed' report if directory is missing without crashing.
        """
        if not self.is_installed():
            return WikiValidationReport(
                installed=False,
                status="Wiki not installed",
                total_files_scanned=0,
                total_crops_scanned=0,
                issues=[]
            )

        issues: List[ValidationIssue] = []
        total_files = 0
        valid_count = 0
        invalid_count = 0
        crops_scanned = 0

        for crop_dir in sorted(self.wiki_root.iterdir()):
            if not crop_dir.is_dir() or crop_dir.name.startswith("."):
                continue

            crops_scanned += 1
            seen_problem_names: Dict[str, str] = {}

            for file_path in sorted(crop_dir.iterdir()):
                if not self._is_problem_file(file_path, crop_dir.name):
                    continue

                total_files += 1
                rel_path = str(file_path.relative_to(self.wiki_root)).replace("\\", "/")

                try:
                    content = file_path.read_text(encoding="utf-8")
                except Exception as read_err:
                    issues.append(ValidationIssue(
                        file=rel_path,
                        issue_type="unreadable_file",
                        message=f"Cannot read file: {read_err}",
                        severity="error"
                    ))
                    invalid_count += 1
                    continue

                file_issues = validate_document(content, file_path=rel_path)
                has_error = any(issue.severity == "error" for issue in file_issues)

                # Check duplicate problem name within crop
                try:
                    meta, _ = extract_frontmatter(content)
                    prob_name = str(meta.get("problem", file_path.stem)).strip().lower()
                    if prob_name in seen_problem_names:
                        file_issues.append(ValidationIssue(
                            file=rel_path,
                            issue_type="duplicate_problem",
                            message=f"Duplicate problem '{prob_name}' within crop '{crop_dir.name}' (first in {seen_problem_names[prob_name]})",
                            severity="error"
                        ))
                        has_error = True
                    else:
                        seen_problem_names[prob_name] = rel_path
                except Exception:
                    pass

                issues.extend(file_issues)
                if has_error:
                    invalid_count += 1
                else:
                    valid_count += 1

        status_msg = "Wiki validation passed" if invalid_count == 0 else f"Wiki validation found {invalid_count} errors"
        return WikiValidationReport(
            installed=True,
            status=status_msg,
            total_files_scanned=total_files,
            total_crops_scanned=crops_scanned,
            issues=issues,
            valid_count=valid_count,
            invalid_count=invalid_count
        )
