"""Markdown & YAML Frontmatter Parser for the Agriculture Wiki."""

import re
import yaml
from typing import Tuple, Dict, Any, List, Optional
from backend.schemas import WikiFrontmatter, ProblemDetail, ValidationIssue

REQUIRED_SECTIONS = [
    "Diagnostic Phenotype",
    "Hallmark Features",
    "Negative / Exclusion Features",
]

ALLOWED_PRIMARY_SHAPES = {
    "spindle_diamond",
    "oval_circular",
    "linear_streak",
    "irregular_patch",
    "uniform_streak",
    "diffuse",
    "pustule_or_structure",
    "other",
}

ALLOWED_WIDTH_PROFILES = {
    "wider_center",
    "approximately_uniform",
    "wider_at_one_end",
    "unclear",
}

ALLOWED_LESION_ENDS = {
    "pointed_tapered",
    "rounded_blunt",
    "irregular",
    "unclear",
}


class WikiParseError(Exception):
    """Exception raised when a Wiki document fails parsing."""
    def __init__(self, message: str, issue_type: str = "parse_error"):
        super().__init__(message)
        self.issue_type = issue_type


def extract_frontmatter(content: str, fallback_path: str = "", strict: bool = False) -> Tuple[Dict[str, Any], str]:
    """
    Extract YAML frontmatter and markdown body from raw file content.
    Returns (frontmatter_dict, markdown_body).
    Gracefully falls back to Markdown title extraction if YAML frontmatter is absent and strict=False with fallback_path.
    """
    # Match standard YAML frontmatter between opening and closing ---
    pattern = r"^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$"
    match = re.match(pattern, content.strip())
    
    if not match:
        if strict or not fallback_path:
            raise WikiParseError(
                "Document is missing YAML frontmatter enclosed in '---'.",
                issue_type="missing_frontmatter"
            )

        # Fallback: extract title from top-level Markdown header
        lines = content.strip().splitlines()
        first_line = lines[0].strip() if lines else ""
        problem_title = "Unknown Disease"
        if first_line.startswith("# "):
            problem_title = first_line.replace("# ", "").strip()
        elif fallback_path:
            problem_title = fallback_path.replace("\\", "/").split("/")[-1].replace(".md", "").replace("_", " ").title()

        inferred_crop = "General"
        if fallback_path:
            parts = fallback_path.replace("\\", "/").split("/")
            if len(parts) >= 2:
                inferred_crop = parts[-2]

        meta = {
            "crop": inferred_crop,
            "problem": problem_title,
            "type": "disease",
            "status": "markdown_v1"
        }
        return meta, content.strip()
    
    yaml_text, body = match.groups()
    try:
        data = yaml.safe_load(yaml_text)
        if not isinstance(data, dict):
            raise WikiParseError("YAML frontmatter must evaluate to a dictionary.", issue_type="malformed_yaml")
        return data, body.strip()
    except yaml.YAMLError as exc:
        raise WikiParseError(f"Malformed YAML in frontmatter: {exc}", issue_type="malformed_yaml") from exc


def extract_sections(body: str) -> Dict[str, str]:
    """
    Extract Markdown level 2 sections (## Section Name).
    Returns mapping of section title -> section content.
    """
    sections: Dict[str, str] = {}
    lines = body.splitlines()
    current_title: Optional[str] = None
    current_lines: List[str] = []

    for line in lines:
        if line.startswith("## "):
            if current_title:
                sections[current_title] = "\n".join(current_lines).strip()
            current_title = line.replace("## ", "").strip()
            current_lines = []
        else:
            if current_title:
                current_lines.append(line)

    if current_title:
        sections[current_title] = "\n".join(current_lines).strip()

    return sections


def extract_machine_notes(body: str) -> Dict[str, Any]:
    """
    Extract YAML notes from '## Machine-Comparison Notes' block if present.
    """
    notes_match = re.search(
        r"##\s+Machine-Comparison Notes\s+```ya?ml\s*([\s\S]*?)\s*```",
        body,
        re.IGNORECASE
    )
    if not notes_match:
        return {}
    
    try:
        parsed = yaml.safe_load(notes_match.group(1))
        return parsed if isinstance(parsed, dict) else {}
    except Exception:
        return {}


def parse_wiki_document(content: str, relative_path: str = "") -> ProblemDetail:
    """
    Parses a complete Wiki document, validating frontmatter and separating body.
    Preserves original markdown body without persisting into any external format.
    """
    raw_meta, body = extract_frontmatter(content, fallback_path=relative_path, strict=(not bool(relative_path)))
    
    if not relative_path:
        if "crop" not in raw_meta or not str(raw_meta.get("crop", "")).strip():
            raise WikiParseError("Frontmatter is missing required 'crop' field.", issue_type="missing_crop")
        if "problem" not in raw_meta or not str(raw_meta.get("problem", "")).strip():
            raise WikiParseError("Frontmatter is missing required 'problem' field.", issue_type="missing_problem")
    else:
        # Infer crop from path if missing or generic
        if "crop" not in raw_meta or not str(raw_meta.get("crop", "")).strip() or raw_meta.get("crop") == "General":
            parts = relative_path.replace("\\", "/").split("/")
            if len(parts) >= 2:
                raw_meta["crop"] = parts[-2]
            else:
                raw_meta["crop"] = "Crop"

        if "problem" not in raw_meta or not str(raw_meta.get("problem", "")).strip():
            raw_meta["problem"] = relative_path.replace("\\", "/").split("/")[-1].replace(".md", "").replace("_", " ").title()
    
    crop = str(raw_meta.pop("crop")).strip()
    problem = str(raw_meta.pop("problem")).strip()
    type_val = raw_meta.pop("type", None)
    status_val = raw_meta.pop("status", None)
    schema_ver = raw_meta.pop("phenotype_schema_version", None)

    frontmatter = WikiFrontmatter(
        crop=crop,
        problem=problem,
        type=type_val,
        status=status_val,
        phenotype_schema_version=str(schema_ver) if schema_ver else None,
        extra=raw_meta
    )

    sections = extract_sections(body)
    machine_notes = extract_machine_notes(body)

    return ProblemDetail(
        frontmatter=frontmatter,
        relative_path=relative_path,
        body=body,
        sections=sections,
        machine_notes=machine_notes
    )


def validate_document(content: str, file_path: str) -> List[ValidationIssue]:
    """
    Performs full integrity and schema validation on a Wiki Markdown document.
    Returns list of discovered ValidationIssue items.
    """
    issues: List[ValidationIssue] = []

    try:
        raw_meta, body = extract_frontmatter(content, strict=True)
    except WikiParseError as e:
        issues.append(ValidationIssue(file=file_path, issue_type=e.issue_type, message=str(e), severity="error"))
        return issues
    except Exception as e:
        issues.append(ValidationIssue(file=file_path, issue_type="unreadable_file", message=str(e), severity="error"))
        return issues

    # Validate mandatory frontmatter keys
    if "crop" not in raw_meta or not str(raw_meta.get("crop", "")).strip():
        issues.append(ValidationIssue(file=file_path, issue_type="missing_crop", message="Missing 'crop' in frontmatter", severity="error"))
    if "problem" not in raw_meta or not str(raw_meta.get("problem", "")).strip():
        issues.append(ValidationIssue(file=file_path, issue_type="missing_problem", message="Missing 'problem' in frontmatter", severity="error"))

    sections = extract_sections(body)

    # Check for expected diagnostic sections (v2 structured or v1 identification formats)
    has_phenotype = any(s in sections for s in ["Diagnostic Phenotype", "Identification", "Visual Phenotype"])
    if not has_phenotype:
        issues.append(ValidationIssue(
            file=file_path,
            issue_type="missing_section",
            message="Missing recommended section '## Diagnostic Phenotype' or '## Identification'",
            severity="warning"
        ))

    has_hallmarks = any(s in sections for s in ["Hallmark Features", "Distinguishing Features", "Disease Biology"])
    if not has_hallmarks:
        issues.append(ValidationIssue(
            file=file_path,
            issue_type="missing_section",
            message="Missing recommended section '## Hallmark Features' or '## Distinguishing Features'",
            severity="warning"
        ))

    # Validate machine comparison notes / enum constraints
    machine_notes = extract_machine_notes(body)
    if machine_notes:
        primary_shape = machine_notes.get("primary_shape")
        if primary_shape and str(primary_shape).lower() not in ALLOWED_PRIMARY_SHAPES:
            issues.append(ValidationIssue(
                file=file_path,
                issue_type="invalid_enum",
                message=f"Invalid primary_shape enum '{primary_shape}'. Allowed: {sorted(ALLOWED_PRIMARY_SHAPES)}",
                severity="warning"
            ))
        
        width_profile = machine_notes.get("width_profile")
        if width_profile and str(width_profile).lower() not in ALLOWED_WIDTH_PROFILES:
            issues.append(ValidationIssue(
                file=file_path,
                issue_type="invalid_enum",
                message=f"Invalid width_profile enum '{width_profile}'. Allowed: {sorted(ALLOWED_WIDTH_PROFILES)}",
                severity="warning"
            ))

        ends = machine_notes.get("ends")
        if ends and str(ends).lower() not in ALLOWED_LESION_ENDS:
            issues.append(ValidationIssue(
                file=file_path,
                issue_type="invalid_enum",
                message=f"Invalid lesion ends enum '{ends}'. Allowed: {sorted(ALLOWED_LESION_ENDS)}",
                severity="warning"
            ))

    return issues
