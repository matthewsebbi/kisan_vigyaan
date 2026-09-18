"""Tests for FastAPI HTTP endpoints."""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

from backend.main import app
from backend.services.wiki_service import WikiService
from backend.services.diagnostic_service import DiagnosticService
from backend.schemas import DiagnosisResponse, StrongestAlternative


@pytest.fixture
def client():
    return TestClient(app)


def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "wiki_installed" in data


def test_wiki_status_uninstalled(client):
    """When wiki is uninstalled, status endpoint returns 'Wiki not installed'."""
    with patch.object(WikiService, "is_installed", return_value=False):
        response = client.get("/api/wiki/status")
        assert response.status_code == 200
        data = response.json()
        assert data["installed"] is False
        assert data["status"] == "Wiki not installed"
        assert data["crop_count"] == 0


def test_validate_wiki_uninstalled(client):
    """When wiki is uninstalled, validate endpoint returns gracefully."""
    with patch.object(WikiService, "is_installed", return_value=False):
        response = client.post("/api/wiki/validate")
        assert response.status_code == 200
        data = response.json()
        assert data["installed"] is False
        assert data["status"] == "Wiki not installed"


def test_environment_endpoint(client):
    response = client.get("/api/environment/current")
    assert response.status_code == 200
    data = response.json()
    assert "temperature_c" in data
    assert "relative_humidity_percent" in data


def test_fetch_environment_endpoint(client):
    response = client.get("/api/environment/fetch?lat=19.7515&lon=75.7139&season=kharif")
    assert response.status_code == 200
    data = response.json()
    assert "temperature_c" in data
    assert data["season"] == "kharif"
    assert data["latitude"] == 19.7515
    assert data["longitude"] == 75.7139


def test_predict_endpoint_proxy(client):
    """Test the /predict endpoint matching server.mjs reverse proxy."""
    mock_diag = DiagnosisResponse(
        crop="Rice",
        diagnosis="Blast",
        confidence=0.95,
        decisive_features=["spindle_diamond_shape"],
        environmental_support=["high_humidity"],
        strongest_alternative=StrongestAlternative(name="Brown Spot", reason_less_likely="oval spots"),
        uncertainty=[],
        wiki_sources=["wiki/agriculture/Rice/Blast.md"]
    )

    with patch.object(WikiService, "is_installed", return_value=True), \
         patch.object(DiagnosticService, "diagnose", return_value=mock_diag):
        payload = {
            "crop": "Rice",
            "image": "data:image/jpeg;base64,dGVzdA==",
            "environmental_context": {
                "temperature_c": 26.0,
                "relative_humidity_percent": 90.0
            }
        }
        response = client.post("/predict", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["crop"] == "Rice"
        assert data["diagnosis"] == "Blast"
        assert data["confidence"] == 0.95


def test_llm_health_check_endpoint(client):
    """Test the /api/llm/health and /health/llm diagnostic endpoints."""
    response = client.get("/api/llm/health")
    assert response.status_code == 200
    data = response.json()
    assert "provider" in data
    assert data["provider"] in ["alibaba", "groq"]
    assert "category" in data
    assert "status_code" in data
    assert "healthy" in data or "is_healthy" in data
    assert data["category"] in [
        "healthy_200",
        "authentication_401",
        "permission_403",
        "rate_limit_429",
        "server_5xx",
        "network_error",
        "network_403",
        "model_permission_403",
        "network_unreachable",
    ]

