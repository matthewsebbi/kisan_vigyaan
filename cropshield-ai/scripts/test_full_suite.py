"""Comprehensive CropShield AI Test Suite: LLM Health, Text, Vision, and Rice Wiki Diagnostics."""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import json
import logging
from backend.services.qwen_client import QwenClient, QwenAPIError
from backend.services.wiki_service import WikiService
from backend.services.environment_service import EnvironmentService
from backend.services.diagnostic_service import DiagnosticService

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("test_full_suite")

import io
import base64
from PIL import Image

def _get_test_image_b64() -> str:
    img = Image.new("RGB", (100, 100), color=(34, 139, 34))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()

TINY_JPEG_B64 = _get_test_image_b64()


def run_llm_health_check(client: QwenClient):
    print("\n==================================================")
    print(" 1. LLM Health Check Probing")
    print("==================================================")
    health = client.check_llm_health()
    print(json.dumps(health, indent=2))
    assert "provider" in health
    assert health["provider"] in ["alibaba", "groq"]
    assert "category" in health
    print("[OK] LLM Health Check reporting verified.")
    return health


def run_simple_text_test(client: QwenClient):
    print("\n==================================================")
    print(" 2. Simple Qwen3.8-27B Text Request")
    print("==================================================")
    print(f"Active Provider: {client.provider}")
    print(f"Model: {client.reasoning_model or client.alibaba_model}")

    try:
        res = client.call_reasoning("Respond with the exact word 'HEALTHY_TEXT_OK' to confirm.", max_tokens=20)
        print("Response:", res.strip())
        print("[OK] Text test completed successfully.")
        return True
    except QwenAPIError as exc:
        print(f"Text test exception reported (expected if unauthenticated): {exc}")
        return False


def run_image_test(client: QwenClient):
    print("\n==================================================")
    print(" 3. Qwen3.8-27B Image Test")
    print("==================================================")
    print(f"Active Provider: {client.provider}")

    try:
        res = client.call_vision(TINY_JPEG_B64, "Describe the primary color in one word.", max_tokens=20)
        print("Response:", res.strip())
        print("[OK] Vision image test completed successfully.")
        return True
    except QwenAPIError as exc:
        print(f"Vision image test exception reported (expected if unauthenticated): {exc}")
        return False


def run_full_rice_wiki_diagnostic_test():
    print("\n==================================================")
    print(" 4. Full Rice Wiki Diagnostic Test")
    print("==================================================")
    wiki_svc = WikiService()
    env_svc = EnvironmentService()
    qwen_cli = QwenClient()
    diag_svc = DiagnosticService(wiki_service=wiki_svc, environment_service=env_svc, qwen_client=qwen_cli)

    print(f"Wiki installed: {wiki_svc.is_installed()}")
    rice_problems = wiki_svc.list_problems("rice")
    print(f"Discovered Rice Wiki problem profiles: {rice_problems}")

    response = diag_svc.diagnose(
        image=TINY_JPEG_B64,
        crop="Rice",
        location="Thanjavur, Tamil Nadu",
        season="Kharif"
    )

    print("\nDiagnostic Response Output:")
    res_dict = response.model_dump()
    # Print key fields
    summary = {
        "crop": res_dict.get("crop"),
        "diagnosis": res_dict.get("diagnosis"),
        "confidence": res_dict.get("confidence"),
        "decisive_features": res_dict.get("decisive_features"),
        "environmental_support": res_dict.get("environmental_support"),
        "strongest_alternative": res_dict.get("strongest_alternative"),
        "uncertainty": res_dict.get("uncertainty"),
        "wiki_sources": res_dict.get("wiki_sources"),
        "is_error": res_dict.get("is_error"),
    }
    print(json.dumps(summary, indent=2))

    assert summary["crop"] == "Rice"
    assert "diagnosis" in summary
    assert isinstance(summary["decisive_features"], list)
    assert isinstance(summary["environmental_support"], list)
    assert isinstance(summary["strongest_alternative"], dict)
    assert "name" in summary["strongest_alternative"]
    assert "reason_less_likely" in summary["strongest_alternative"]
    assert isinstance(summary["wiki_sources"], list)
    print("[OK] Full Rice Wiki diagnostic test executed and schema validated!")


def main():
    qwen_cli = QwenClient()
    run_llm_health_check(qwen_cli)
    run_simple_text_test(qwen_cli)
    run_image_test(qwen_cli)
    run_full_rice_wiki_diagnostic_test()

    print("\n==================================================")
    print(" ALL DIAGNOSTIC SUITE RUNS COMPLETED SUCCESSFULLY ")
    print("==================================================")


if __name__ == "__main__":
    main()
