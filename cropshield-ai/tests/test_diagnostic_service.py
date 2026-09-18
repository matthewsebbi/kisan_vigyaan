"""Tests for DiagnosticService: Qwen diagnosis with mocked Wiki and Rice end-to-end diagnosis."""

import pytest
from unittest.mock import MagicMock
from pathlib import Path

from backend.schemas import EnvironmentalContext, DiagnosisResponse
from backend.services.wiki_service import WikiService
from backend.services.environment_service import EnvironmentService
from backend.services.qwen_client import QwenClient
from backend.services.diagnostic_service import DiagnosticService


MOCK_VISION_JSON_BLAST = """```json
{
  "plant_parts": ["leaf_blade"],
  "symptom_class": "discrete_lesion",
  "lesion_presence": true,
  "lesion_size": "1-2 cm",
  "primary_shape": "spindle_diamond",
  "elongation": "high",
  "width_profile": "wider_center",
  "lesion_ends": "pointed_tapered",
  "center_color": "pale_gray to whitish",
  "margin_color": "reddish_brown to dark_brown",
  "surrounding_color": "green",
  "color_transition": "sharp_two_tone",
  "current_texture": "dry_necrotic",
  "early_appearance": "unclear",
  "orientation": "longitudinal",
  "distribution": "scattered",
  "coalescence": "partial",
  "vein_relationship": "expands_across_veins",
  "spatial_location": "leaf_blade",
  "whole_plant_features": [],
  "visible_structures": [],
  "uncertainty": [],
  "image_quality": "clear"
}
```"""

MOCK_REASONING_JSON_BLAST = """```json
{
  "crop": "Rice",
  "diagnosis": "Blast",
  "confidence": 0.96,
  "decisive_features": [
    "spindle_diamond lesion geometry with pointed/tapered ends",
    "sharp two-tone necrotic center with reddish-brown margin",
    "scattered distribution on leaf blade expanding across veins"
  ],
  "environmental_support": [
    "High relative humidity (92%) and frequent rain showers promote rapid conidial sporulation"
  ],
  "strongest_alternative": {
    "name": "Brown Spot",
    "reason_less_likely": "Brown spot lesions are strictly oval/circular with rounded ends and lack the characteristic tapered diamond geometry"
  },
  "uncertainty": [],
  "wiki_sources": []
}
```"""


MOCK_CMP_BLAST = """```json
{
  "disease": "Blast",
  "reference_image_used": false,
  "visual_match_score": null,
  "phenotype_match_score": 92.0,
  "overall_score": 92.0,
  "confidence": 0.95,
  "matching_features": ["spindle_diamond lesion geometry", "pointed/tapered ends"],
  "contradicting_features": [],
  "observed_features": ["spindle lesions"],
  "missing_expected_features": [],
  "reasoning": "High alignment with blast hallmark features"
}
```"""

MOCK_CMP_BROWN_SPOT = """```json
{
  "disease": "Brown Spot",
  "reference_image_used": false,
  "visual_match_score": null,
  "phenotype_match_score": 35.0,
  "overall_score": 35.0,
  "confidence": 0.85,
  "matching_features": [],
  "contradicting_features": ["Observed lesions are spindle-shaped, not circular/oval"],
  "observed_features": ["spindle lesions"],
  "missing_expected_features": ["circular spots with yellow halo"],
  "reasoning": "Contradicts brown spot circular geometry"
}
```"""


def test_qwen_diagnosis_with_mocked_wiki(mock_wiki_service: WikiService, sample_environment: EnvironmentalContext):
    """Test 7: Qwen diagnosis with mocked Wiki content and mocked iterative LLM responses."""
    mock_qwen = MagicMock(spec=QwenClient)
    mock_qwen.call_vision.return_value = MOCK_VISION_JSON_BLAST
    mock_qwen.call_reasoning.return_value = MOCK_REASONING_JSON_BLAST

    def mock_cmp(user_image_b64, prompt, **kwargs):
        if "Blast" in prompt:
            return MOCK_CMP_BLAST
        return MOCK_CMP_BROWN_SPOT

    mock_qwen.call_vision_comparison.side_effect = mock_cmp

    env_service = EnvironmentService(default_context=sample_environment)
    diagnostic_svc = DiagnosticService(
        wiki_service=mock_wiki_service,
        environment_service=env_service,
        qwen_client=mock_qwen
    )

    fake_image_base64 = "data:image/jpeg;base64,dGVzdGltYWdl"
    response: DiagnosisResponse = diagnostic_svc.diagnose(
        image=fake_image_base64,
        crop="Rice",
        environmental_context=sample_environment
    )

    # Assertions on response structure
    assert response.crop == "Rice"
    assert response.diagnosis == "Blast"
    assert response.confidence == 0.96
    assert len(response.decisive_features) >= 2
    assert "spindle_diamond" in response.decisive_features[0].lower()
    assert response.strongest_alternative.name == "Brown Spot"
    assert len(response.strongest_alternative.reason_less_likely) > 0
    assert len(response.wiki_sources) > 0

    # Pass 1 Phenotype preservation assertions
    assert response.phenotype is not None
    assert response.phenotype.primary_shape == "spindle_diamond"
    assert response.phenotype.lesion_ends == "pointed_tapered"
    assert response.phenotype.width_profile == "wider_center"

    # Iterative architecture assertions
    assert len(response.candidate_results) == 2
    assert response.candidate_results[0].disease == "Blast"
    assert response.candidate_results[0].overall_score == 92.0
    assert response.candidate_results[1].disease == "Brown Spot"
    assert response.candidate_results[1].overall_score == 35.0

    # Verify calls
    mock_qwen.call_vision.assert_called_once()
    assert mock_qwen.call_vision_comparison.call_count == 2
    mock_qwen.call_reasoning.assert_called_once()



def test_diagnosis_fails_gracefully_when_wiki_missing(tmp_path: Path):
    """Test that diagnose raises error if Wiki is not installed."""
    empty_wiki_service = WikiService(wiki_root=tmp_path / "absent")
    diagnostic_svc = DiagnosticService(wiki_service=empty_wiki_service)

    with pytest.raises(RuntimeError, match="Wiki not installed"):
        diagnostic_svc.diagnose(image="fake", crop="Rice")


def test_end_to_end_rice_diagnosis_simulation(mock_wiki_service: WikiService, sample_environment: EnvironmentalContext):
    """Test 8: End-to-end Rice diagnosis once the Wiki is attached."""
    # Verify that the Rice candidate entries exist in the Wiki
    rice_problems = mock_wiki_service.list_problems("Rice")
    assert "Blast" in rice_problems
    assert "Brown Spot" in rice_problems

    # Load candidate details
    blast_doc = mock_wiki_service.get_problem("Rice", "Blast")
    assert blast_doc.frontmatter.problem == "Blast"
    assert blast_doc.machine_notes.get("primary_shape") == "spindle_diamond"

    # Verify diagnostic pipeline execution
    mock_qwen = MagicMock(spec=QwenClient)
    mock_qwen.call_vision.return_value = MOCK_VISION_JSON_BLAST
    mock_qwen.call_reasoning.return_value = MOCK_REASONING_JSON_BLAST

    service = DiagnosticService(
        wiki_service=mock_wiki_service,
        environment_service=EnvironmentService(sample_environment),
        qwen_client=mock_qwen
    )

    result = service.diagnose(
        image="data:image/jpeg;base64,YWJj",
        crop="Rice",
        environmental_context=sample_environment
    )

    # Validate output schema
    data = result.model_dump()
    assert data["crop"] == "Rice"
    assert data["diagnosis"] == "Blast"
    assert data["confidence"] > 0.9
    assert isinstance(data["decisive_features"], list)
    assert isinstance(data["environmental_support"], list)
    assert data["strongest_alternative"]["name"] == "Brown Spot"


def test_diagnostic_service_api_error_handling(mock_wiki_service, sample_environment):
    from backend.services.qwen_client import QwenAPIError

    mock_qwen = MagicMock(spec=QwenClient)
    mock_qwen.call_vision.side_effect = QwenAPIError("Groq Cloudflare 403 Forbidden: Access Denied")

    service = DiagnosticService(
        wiki_service=mock_wiki_service,
        environment_service=EnvironmentService(sample_environment),
        qwen_client=mock_qwen
    )

    result = service.diagnose(
        image="data:image/jpeg;base64,YWJj",
        crop="Rice",
        environmental_context=sample_environment
    )

    data = result.model_dump()
    assert data["is_error"] is True
    assert "403" in data["diagnosis"] or "Cloudflare" in data["diagnosis"]
    assert "403" in data["error_details"]
    # Ensure it did not guess Rice Blast or Bacterial Blight
    assert data["diagnosis"] != "Blast"
    assert data["diagnosis"] != "Bacterial Blight"

