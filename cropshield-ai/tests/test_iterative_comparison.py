"""Comprehensive tests for Dynamic Iterative Disease Comparison Architecture.

Validates:
  - Dynamic discovery of candidate diseases from local Wiki (no hardcoded disease lists)
  - Dynamic reference image validation (valid image vs missing image vs corrupt image)
  - Case A (IMAGE + IMAGE + PHENOTYPE) with visual_match_score
  - Case B (IMAGE + PHENOTYPE) fallback with visual_match_score == None
  - Programmatic ranking by overall_score DESC
  - Configurable weighting (VISUAL_WEIGHT and PHENOTYPE_WEIGHT)
  - Full preservation of intermediate CandidateComparisonResult objects in DiagnosisResponse
  - API efficiency (concise diagnostic phenotype extraction)
"""

import pytest
from unittest.mock import MagicMock
from pathlib import Path

from backend.config import VISUAL_WEIGHT, PHENOTYPE_WEIGHT
from backend.schemas import (
    EnvironmentalContext,
    DiagnosisResponse,
    CandidateComparisonResult,
    ProblemDetail,
    WikiFrontmatter,
)
from backend.services.wiki_service import WikiService
from backend.services.environment_service import EnvironmentService
from backend.services.qwen_client import QwenClient
from backend.services.diagnostic_service import DiagnosticService


def test_find_reference_image_with_existing_file(tmp_path: Path):
    """Test Case A: A valid local reference image is correctly found and validated."""
    wiki_root = tmp_path / "wiki" / "agriculture"
    pearl_dir = wiki_root / "Pearl Millet"
    pearl_dir.mkdir(parents=True)

    # Create dummy valid JPEG file
    from PIL import Image
    dummy_img = Image.new("RGB", (64, 64), color="red")
    img_path = pearl_dir / "Blast.jpg"
    dummy_img.save(img_path, format="JPEG")

    # Create problem detail
    prob = ProblemDetail(
        frontmatter=WikiFrontmatter(crop="Pearl Millet", problem="Pearl Millet Blast"),
        relative_path="Pearl Millet/Pearl_Millet_Blast.md",
        body="## Diagnostic Phenotype\nSpindle diamond lesions.\n## Reference Images\n- `Blast.jpg`",
        sections={"Diagnostic Phenotype": "Spindle diamond lesions.", "Reference Images": "- `Blast.jpg`"},
    )

    ws = WikiService(wiki_root=wiki_root)
    found_path = ws.find_reference_image("Pearl Millet", prob)

    assert found_path is not None
    assert found_path.name == "Blast.jpg"
    b64 = ws.load_reference_image_base64(found_path)
    assert b64 is not None
    assert b64.startswith("data:image/jpeg;base64,")


def test_find_reference_image_missing_fallback(tmp_path: Path):
    """Test Case B: When reference image does not exist, find_reference_image safely returns None."""
    wiki_root = tmp_path / "wiki" / "agriculture"
    sun_dir = wiki_root / "Sunflower"
    sun_dir.mkdir(parents=True)

    # Markdown refers to an image, but the file does NOT exist on disk
    prob = ProblemDetail(
        frontmatter=WikiFrontmatter(crop="Sunflower", problem="Sunflower Alternaria"),
        relative_path="Sunflower/sunflower_alternaria.md",
        body="## Reference Images\n- `nonexistent_alternaria_rings.jpg`",
        sections={"Reference Images": "- `nonexistent_alternaria_rings.jpg`"},
    )

    ws = WikiService(wiki_root=wiki_root)
    found_path = ws.find_reference_image("Sunflower", prob)
    assert found_path is None


def test_find_reference_image_corrupt_file_graceful(tmp_path: Path):
    """Test that a corrupt/invalid image file does not crash the system and returns None."""
    wiki_root = tmp_path / "wiki" / "agriculture"
    crop_dir = wiki_root / "Rice"
    crop_dir.mkdir(parents=True)

    corrupt_img = crop_dir / "Blast.jpg"
    corrupt_img.write_text("NOT_AN_IMAGE_CORRUPTED_BYTES")

    prob = ProblemDetail(
        frontmatter=WikiFrontmatter(crop="Rice", problem="Blast"),
        relative_path="Rice/Blast.md",
        body="## Reference Images\n- `Blast.jpg`",
        sections={"Reference Images": "- `Blast.jpg`"},
    )

    ws = WikiService(wiki_root=wiki_root)
    found_path = ws.find_reference_image("Rice", prob)
    assert found_path is None


def test_iterative_comparison_case_a_and_case_b(tmp_path: Path, sample_environment: EnvironmentalContext):
    """
    Test that iterative comparison evaluates candidate diseases one-by-one:
      - Candidate 1 has a reference image -> Case A (visual_match_score populated, weighted overall)
      - Candidate 2 has NO reference image -> Case B (visual_match_score is None, overall = phenotype)
    """
    wiki_root = tmp_path / "wiki" / "agriculture"
    crop_dir = wiki_root / "Pearl Millet"
    crop_dir.mkdir(parents=True)

    # Valid reference image for Blast
    from PIL import Image
    dummy_img = Image.new("RGB", (32, 32), color="green")
    dummy_img.save(crop_dir / "Blast.jpg", format="JPEG")

    (crop_dir / "Pearl_Millet_Blast.md").write_text(
        "---\ncrop: Pearl Millet\nproblem: Pearl Millet Blast\n---\n## Diagnostic Phenotype\nSpindle diamond lesions\n## Reference Images\n- `Blast.jpg`\n"
    )
    # Rust has no image on disk
    (crop_dir / "Pearl_Millet_Rust.md").write_text(
        "---\ncrop: Pearl Millet\nproblem: Pearl Millet Rust\n---\n## Diagnostic Phenotype\nRaised orange pustules\n"
    )

    mock_qwen = MagicMock(spec=QwenClient)
    # Mock vision comparison for Case A (Blast - with ref) and Case B (Rust - without ref)
    def mock_vision_cmp(user_image_b64, prompt, reference_image_b64=None, **kwargs):
        if "Blast" in prompt:
            assert reference_image_b64 is not None, "Blast has a reference image on disk, so it must be passed"
            return """```json
            {
              "disease": "Pearl Millet Blast",
              "reference_image_used": true,
              "visual_match_score": 85.0,
              "phenotype_match_score": 90.0,
              "confidence": 0.94,
              "matching_features": ["spindle lesions", "gray centers"],
              "contradicting_features": [],
              "observed_features": ["spindle necrotic lesions"],
              "missing_expected_features": [],
              "reasoning": "Strong visual and morphological match with Blast"
            }
            ```"""
        else:
            assert reference_image_b64 is None, "Rust has no reference image, so reference_image_b64 must be None"
            return """```json
            {
              "disease": "Pearl Millet Rust",
              "reference_image_used": false,
              "visual_match_score": null,
              "phenotype_match_score": 30.0,
              "confidence": 0.70,
              "matching_features": [],
              "contradicting_features": ["No raised orange pustules observed"],
              "observed_features": ["spindle lesions"],
              "missing_expected_features": ["uredinia pustules"],
              "reasoning": "Symptoms contradict Rust"
            }
            ```"""

    mock_qwen.call_vision_comparison.side_effect = mock_vision_cmp
    mock_qwen.call_vision.return_value = """```json
    {"plant_parts": ["leaf_blade"], "primary_shape": "spindle_diamond", "lesion_ends": "pointed_tapered"}
    ```"""
    mock_qwen.call_reasoning.return_value = """```json
    {
      "crop": "Pearl Millet",
      "diagnosis": "Pearl Millet Blast",
      "confidence": 0.94,
      "decisive_features": ["spindle lesions with pointed ends"],
      "environmental_support": ["High humidity favors blast infection"],
      "strongest_alternative": {
        "name": "Pearl Millet Rust",
        "reason_less_likely": "No pustules observed; lesions are necrotic"
      }
    }
    ```"""

    ws = WikiService(wiki_root=wiki_root)
    env_svc = EnvironmentService(sample_environment)
    diag_svc = DiagnosticService(wiki_service=ws, environment_service=env_svc, qwen_client=mock_qwen)

    res: DiagnosisResponse = diag_svc.diagnose(
        image="data:image/jpeg;base64,dGVzdA==",
        crop="Pearl Millet",
        environmental_context=sample_environment
    )

    assert res.diagnosis == "Pearl Millet Blast"
    assert res.crop == "Pearl Millet"
    assert len(res.candidate_results) == 2

    # Programmatic ranking check: Blast must be ranked first (overall_score DESC)
    blast_res = next(c for c in res.candidate_results if "Blast" in c.disease)
    rust_res = next(c for c in res.candidate_results if "Rust" in c.disease)

    # Check Case A properties
    assert blast_res.reference_image_used is True
    assert blast_res.visual_match_score == 85.0
    assert blast_res.phenotype_match_score == 90.0
    expected_blast_overall = round(VISUAL_WEIGHT * 85.0 + PHENOTYPE_WEIGHT * 90.0, 1)
    assert blast_res.overall_score == expected_blast_overall

    # Check Case B properties
    assert rust_res.reference_image_used is False
    assert rust_res.visual_match_score is None
    assert rust_res.phenotype_match_score == 30.0
    assert rust_res.overall_score == 30.0

    # Ensure ranked first in candidate_results
    assert res.candidate_results[0] == blast_res
    assert res.candidate_results[1] == rust_res


def test_api_efficiency_phenotype_extraction():
    """Verify that _extract_relevant_phenotype filters irrelevant text and keeps tokens low."""
    diag_svc = DiagnosticService()
    prob = ProblemDetail(
        frontmatter=WikiFrontmatter(crop="Rice", problem="Blast"),
        relative_path="Rice/Blast.md",
        body="# Blast\n\n## Diagnostic Phenotype\nSpindle lesions.\n\n## Long Irrelevant History\n" + ("Spam " * 1000),
        sections={
            "Diagnostic Phenotype": "Spindle lesions with pointed tapered ends.",
            "Hallmark Features": "Acute diamond shape with gray center.",
            "Negative / Exclusion Features": "Circular spots.",
            "Long Irrelevant History": "Spam " * 1000
        },
    )

    extracted = diag_svc._extract_relevant_phenotype(prob)
    assert "Spindle lesions" in extracted
    assert "Acute diamond shape" in extracted
    assert "Circular spots" in extracted
    assert "Long Irrelevant History" not in extracted
    assert len(extracted) < 1500
