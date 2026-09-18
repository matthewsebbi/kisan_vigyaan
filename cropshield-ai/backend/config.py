"""Configuration and paths for CropShield AI Backend."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Base paths
BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent
WIKI_DIR = PROJECT_ROOT / "wiki" / "agriculture"

# Load environment variables: .env.example defaults first, then .env and .env.local override
for env_file in [".env.example", ".env", ".env.local"]:
    env_path = PROJECT_ROOT / env_file
    if env_path.exists():
        load_dotenv(dotenv_path=env_path, override=True)

def get_groq_api_key() -> str:
    """Retrieve Groq API key from environment variables."""
    key = (
        os.getenv("GROQ_API_KEY")
        or os.getenv("GROQ_vision_api")
        or os.getenv("VITE_GROQ_API_KEY")
    )
    return key.strip() if key else ""

def get_alibaba_api_key() -> str:
    """Retrieve Alibaba Model Studio API key from environment variables."""
    key = (
        os.getenv("ALIBABA_API_KEY")
        or os.getenv("DASHSCOPE_API_KEY")
        or os.getenv("VITE_ALIBABA_API_KEY")
    )
    return key.strip() if key else ""

def get_gemini_api_key() -> str:
    """Retrieve Google Gemini API key from environment variables."""
    key = (
        os.getenv("GEMINI_API_KEY")
        or os.getenv("GOOGLE_API_KEY")
        or os.getenv("VITE_GEMINI_API_KEY")
    )
    return key.strip() if key else ""

# Provider Selection (Primary: groq)
VISION_PROVIDER = (os.getenv("VISION_PROVIDER") or "groq").strip().lower()

# Groq & AI Model Configuration (Primary Provider)
GROQ_BASE_URL = os.getenv("GROQ_BASE_URL", "https://api.groq.com/openai/v1").rstrip("/")
GROQ_MODEL = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")
GROQ_API_KEY = get_groq_api_key()
GROQ_API_URL = f"{GROQ_BASE_URL}/chat/completions"

# Alibaba Model Studio Configuration (Secondary / Alternative)
ALIBABA_BASE_URL = os.getenv("ALIBABA_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1").rstrip("/")
ALIBABA_MODEL = os.getenv("ALIBABA_MODEL", "qwen3.8-27b")
ALIBABA_API_KEY = get_alibaba_api_key()
ALIBABA_API_URL = f"{ALIBABA_BASE_URL}/chat/completions"

# If configured as alibaba but ALIBABA_API_KEY is missing while Groq key is present, default to groq
if VISION_PROVIDER == "alibaba" and not ALIBABA_API_KEY and GROQ_API_KEY:
    VISION_PROVIDER = "groq"

# Model Selection defaults (Primary default: Groq)
DEFAULT_MODEL = GROQ_MODEL if VISION_PROVIDER == "groq" else (ALIBABA_MODEL if VISION_PROVIDER == "alibaba" else GROQ_MODEL)
VISION_MODEL = os.getenv("VISION_MODEL", DEFAULT_MODEL)
REASONING_MODEL = os.getenv("REASONING_MODEL", DEFAULT_MODEL)

# Google Gemini Configuration
GEMINI_API_KEY = get_gemini_api_key()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

# Local Ollama Configuration (if running)
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2-vision")

# Server Configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

# Agricultural Environment API Configuration (https://github.com/matthewsebbi/agricultural-environment-API)
AGRI_ENV_API_URL = os.getenv("AGRI_ENV_API_URL", "http://127.0.0.1:8001")
OPEN_METEO_FORECAST_URL = "https://api.open-meteo.com/v1/forecast"

# Default Geolocation (Maharashtra, India)
MAHARASHTRA_DEFAULT_LAT = 19.7515
MAHARASHTRA_DEFAULT_LON = 75.7139

# Iterative Disease Comparison Configuration
VISUAL_WEIGHT = float(os.getenv("VISUAL_WEIGHT", "0.60"))
PHENOTYPE_WEIGHT = float(os.getenv("PHENOTYPE_WEIGHT", "0.40"))
MAX_TOP_CANDIDATES_FOR_DIFFERENTIAL = int(os.getenv("MAX_TOP_CANDIDATES", "3"))

