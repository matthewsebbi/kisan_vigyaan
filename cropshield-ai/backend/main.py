"""FastAPI Backend Server for CropShield AI (Groq Qwen3.8-27B Primary)."""

import logging
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, status, Query, Body
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.config import HOST, PORT
from backend.schemas import (
    DiagnosisRequest,
    DiagnosisResponse,
    CropInfo,
    ProblemSummary,
    ProblemDetail,
    WikiValidationReport,
    EnvironmentalContext,
    SentinelAnalysisRequest,
    SentinelAnalysisResponse,
)
from backend.services.wiki_service import WikiService, PathTraversalError
from backend.services.environment_service import EnvironmentService
from backend.services.diagnostic_service import DiagnosticService
from backend.services.qwen_client import QwenClient, QwenAPIError
from backend.services.sentinel_service import sentinel_service

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cropshield-backend")

app = FastAPI(
    title="CropShield AI Agriculture Wiki & Diagnostic Backend",
    description="Multimodal diagnostic backend powered by version-controlled Markdown Agriculture Wiki and Qwen3.8-27B.",
    version="2.0.0",
)

# Enable CORS for local Vite development frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Services
wiki_service = WikiService()
environment_service = EnvironmentService()
qwen_client = QwenClient()
diagnostic_service = DiagnosticService(
    wiki_service=wiki_service,
    environment_service=environment_service,
    qwen_client=qwen_client,
)


# ---------------------------------------------------------------------------
# Health & Status Endpoints
# ---------------------------------------------------------------------------


@app.get("/")
@app.get("/health")
@app.get("/api/health")
def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "CropShield AI Backend",
        "wiki_installed": wiki_service.is_installed(),
        "provider": qwen_client.provider,
        "vision_model": qwen_client.vision_model,
        "reasoning_model": qwen_client.reasoning_model,
    }


@app.get("/health/llm")
@app.get("/api/llm/health")
def llm_health_check():
    """
    Diagnostic endpoint to test Groq API connectivity and distinguish:
    - network 403 (Cloudflare edge firewall / IP block)
    - authentication 401 (Invalid/missing API key)
    - model permission 403 (Model access denied)
    - rate limit 429 (Quota exceeded)
    - server 5xx (Groq service outage)
    """
    return qwen_client.check_llm_health()


# ---------------------------------------------------------------------------
# Agriculture Wiki Endpoints (Filesystem Direct)
# ---------------------------------------------------------------------------

@app.get("/api/wiki/status")
def get_wiki_status():
    """Check whether the Agriculture Wiki is installed and discoverable."""
    installed = wiki_service.is_installed()
    crops = wiki_service.list_crops() if installed else []
    return {
        "installed": installed,
        "status": "Wiki installed" if installed else "Wiki not installed",
        "crops_available": crops,
        "crop_count": len(crops),
        "wiki_path": str(wiki_service.wiki_root),
    }


@app.get("/api/wiki/crops", response_model=List[str])
def list_crops():
    """List all crop names present in wiki/agriculture/."""
    return wiki_service.list_crops()


@app.get("/api/wiki/crops/{crop}", response_model=CropInfo)
def get_crop(crop: str):
    """Retrieve crop metadata and problem listings."""
    try:
        return wiki_service.get_crop(crop)
    except PathTraversalError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.get("/api/wiki/crops/{crop}/problems", response_model=List[str])
def list_crop_problems(crop: str):
    """List all problems registered for a crop."""
    try:
        return wiki_service.list_problems(crop)
    except PathTraversalError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.get("/api/wiki/crops/{crop}/problems/{problem}", response_model=ProblemDetail)
def get_crop_problem(crop: str, problem: str):
    """Fetch parsed Markdown document and YAML frontmatter for a specific crop problem."""
    try:
        return wiki_service.get_problem(crop, problem)
    except PathTraversalError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except FileNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.get("/api/wiki/crops/{crop}/search", response_model=List[ProblemSummary])
def search_crop_problems(crop: str, query: str = Query(..., min_length=1)):
    """Search within a crop's problems by keyword."""
    try:
        return wiki_service.search_problems(crop, query)
    except PathTraversalError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.post("/api/wiki/validate", response_model=WikiValidationReport)
def validate_wiki():
    """
    Run comprehensive integrity verification across wiki/agriculture/.
    Returns 'Wiki not installed' if the directory does not exist yet.
    """
    return wiki_service.validate_wiki()


# ---------------------------------------------------------------------------
# Environmental Context Endpoints
# ---------------------------------------------------------------------------

@app.get("/api/environment/current", response_model=EnvironmentalContext)
def get_current_environment():
    """Retrieve default runtime environmental context."""
    return environment_service.get_current_environment()


@app.get("/api/environment/fetch", response_model=EnvironmentalContext)
def fetch_environment(
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude"),
    season: Optional[str] = Query(None, description="Season override"),
    location: Optional[str] = Query(None, description="Location name"),
):
    """
    Fetch real-time weather and climatic data from the Agricultural Environment API
    (or Open-Meteo provider) for specified coordinates and season.
    """
    return environment_service.fetch_live_environment(
        lat=lat,
        lon=lon,
        season_override=season,
        location_name=location,
    )


# ---------------------------------------------------------------------------
# Multimodal Diagnostic Endpoints
# ---------------------------------------------------------------------------

@app.post("/predict", response_model=DiagnosisResponse)
@app.post("/api/predict", response_model=DiagnosisResponse)
@app.post("/api/diagnose", response_model=DiagnosisResponse)
def perform_diagnosis(req: DiagnosisRequest):
    """
    Execute multimodal two-pass diagnosis using Qwen3.8-27B and the Agriculture Wiki:
      1. Candidate disease files retrieved from wiki/agriculture/<crop>/
      2. Environment/climate telemetry retrieved for location and season
      3. Pass 1: Fine-grained botanical phenotype extracted from image
      4. Pass 2: Differential elimination against Wiki profiles + runtime climate
      5. Structured validated diagnosis returned
    """
    if not wiki_service.is_installed():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Wiki not installed: 'wiki/agriculture/' does not exist or has no entries."
        )

    try:
        result = diagnostic_service.diagnose(
            image=req.image,
            crop=req.crop,
            location=req.location,
            latitude=req.latitude,
            longitude=req.longitude,
            season=req.season,
            environmental_context=req.environmental_context,
        )
        return result
    except RuntimeError as re:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(re))
    except QwenAPIError as qe:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(qe))
    except Exception as exc:
        logger.exception("Diagnosis pipeline failure")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc))


# ---------------------------------------------------------------------------
# Sentinel-2 Multispectral Farmland Stress Analysis Endpoint
# ---------------------------------------------------------------------------

@app.post("/api/sentinel/analyze-field", response_model=SentinelAnalysisResponse)
@app.post("/sentinel/analyze-field", response_model=SentinelAnalysisResponse)
def analyze_farmland_field(req: SentinelAnalysisRequest):
    """
    Execute Sentinel-2 10m L2A multispectral analysis over custom farmland polygon.
    Computes NDVI, NDRE, chlorophyll/water stress, and pinpoints exact unhealthy spots.
    """
    if len(req.points) < 3:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least 3 corner points are required to define a farmland boundary."
        )

    try:
        response = sentinel_service.analyze_farmland(req)
        return response
    except Exception as exc:
        logger.exception("Sentinel-2 field analysis failure")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Sentinel-2 stress analysis failed: {str(exc)}"
        )


if __name__ == "__main__":
    uvicorn.run("backend.main:app", host=HOST, port=PORT, reload=True)

