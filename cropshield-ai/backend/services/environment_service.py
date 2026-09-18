"""Runtime environmental and climate context service connecting to Agricultural Environment API."""

import logging
from typing import Optional, Dict, Any
from datetime import datetime
import requests

from backend.config import (
    AGRI_ENV_API_URL,
    OPEN_METEO_FORECAST_URL,
    MAHARASHTRA_DEFAULT_LAT,
    MAHARASHTRA_DEFAULT_LON,
)
from backend.schemas import EnvironmentalContext

logger = logging.getLogger(__name__)


class EnvironmentService:
    """
    Manages runtime environmental and meteorological context.
    Retrieves weather and climatic data from the Agricultural Environment API
    (https://github.com/matthewsebbi/agricultural-environment-API) with Open-Meteo fallback.
    """

    def __init__(self, default_context: Optional[EnvironmentalContext] = None):
        self.default_context = default_context or EnvironmentalContext(
            latitude=MAHARASHTRA_DEFAULT_LAT,
            longitude=MAHARASHTRA_DEFAULT_LON,
            location_name="Maharashtra, India (Default)",
            temperature_c=27.5,
            relative_humidity_percent=78.0,
            rainfall_last_24h_mm=4.0,
            rainfall_last_7_days_mm=32.0,
            leaf_wetness="likely",
            season="kharif",
            soil_condition="moist loamy",
            source="Default Baseline"
        )

    def fetch_live_environment(
        self,
        lat: Optional[float] = None,
        lon: Optional[float] = None,
        season_override: Optional[str] = None,
        location_name: Optional[str] = None,
    ) -> EnvironmentalContext:
        """
        Fetch real-time weather and climate data for a given geolocation.
        Attempts to call the Agri Environment API service first, then Open-Meteo.
        """
        latitude = lat if lat is not None else MAHARASHTRA_DEFAULT_LAT
        longitude = lon if lon is not None else MAHARASHTRA_DEFAULT_LON
        loc_label = location_name or ("Maharashtra, India (Default)" if abs(latitude - MAHARASHTRA_DEFAULT_LAT) < 0.1 else f"Coordinates ({latitude:.4f}, {longitude:.4f})")

        # 1. Attempt Agri Environment API service
        if AGRI_ENV_API_URL:
            try:
                env_url = f"{AGRI_ENV_API_URL.rstrip('/')}/v1/environment"
                resp = requests.get(env_url, params={"lat": latitude, "lon": longitude}, timeout=6)
                if resp.ok:
                    data = resp.json()
                    climate = data.get("climate", {})
                    current = climate.get("current", {})
                    daily = climate.get("daily", {}) or climate.get("next_7d", {})

                    temp = current.get("temperature_2m")
                    rh = current.get("relative_humidity_2m")
                    rain_24h = current.get("precipitation") or current.get("rain") or 0.0
                    rain_7d = sum(daily.get("precipitation_sum", [0.0])) if isinstance(daily.get("precipitation_sum"), list) else None

                    soil = data.get("soil", {})
                    soil_notes = f"pH {soil.get('ph', {}).get('value', 'N/A')}, clay {soil.get('clay', {}).get('value', 'N/A')}%"

                    leaf_wet = "likely" if (rh and rh > 85) or (rain_24h and rain_24h > 0) else ("possible" if (rh and rh > 70) else "dry")
                    season = season_override or self._detect_season()

                    return EnvironmentalContext(
                        latitude=latitude,
                        longitude=longitude,
                        location_name=loc_label,
                        temperature_c=temp,
                        relative_humidity_percent=rh,
                        rainfall_last_24h_mm=rain_24h,
                        rainfall_last_7_days_mm=rain_7d,
                        leaf_wetness=leaf_wet,
                        season=season,
                        soil_condition=soil_notes,
                        source="Agricultural Environment API"
                    )
            except Exception as e:
                logger.info(f"Agri Environment API not responding ({e}), falling back to direct Open-Meteo: {e}")

        # 2. Open-Meteo Fallback (Direct provider from agricultural-environment-API)
        try:
            params = {
                "latitude": latitude,
                "longitude": longitude,
                "timezone": "auto",
                "current": "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain",
                "daily": "precipitation_sum,rain_sum,temperature_2m_max,temperature_2m_min",
                "forecast_days": 7
            }
            resp = requests.get(OPEN_METEO_FORECAST_URL, params=params, timeout=10)
            if resp.ok:
                data = resp.json()
                current = data.get("current", {})
                daily = data.get("daily", {})

                temp = current.get("temperature_2m")
                rh = current.get("relative_humidity_2m")
                rain_24h = current.get("precipitation") or current.get("rain") or 0.0
                rain_7d = sum(daily.get("precipitation_sum", [0.0])) if isinstance(daily.get("precipitation_sum"), list) else None

                leaf_wet = "likely" if (rh and rh > 85) or (rain_24h and rain_24h > 0) else ("possible" if (rh and rh > 70) else "dry")
                season = season_override or self._detect_season()

                return EnvironmentalContext(
                    latitude=latitude,
                    longitude=longitude,
                    location_name=loc_label,
                    temperature_c=temp,
                    relative_humidity_percent=rh,
                    rainfall_last_24h_mm=rain_24h,
                    rainfall_last_7_days_mm=rain_7d,
                    leaf_wetness=leaf_wet,
                    season=season,
                    soil_condition="standard agricultural soil",
                    source="Open-Meteo (Agricultural Environment Provider)"
                )
        except Exception as err:
            logger.warning(f"Open-Meteo fetch failed: {err}. Using default context.")

        # 3. Default fallback with applied overrides
        ctx = self.default_context.model_copy()
        ctx.latitude = latitude
        ctx.longitude = longitude
        ctx.location_name = loc_label
        if season_override:
            ctx.season = season_override
        return ctx

    def get_current_environment(
        self,
        override_context: Optional[EnvironmentalContext] = None
    ) -> EnvironmentalContext:
        """Returns the active runtime environment, merging overrides if provided."""
        if not override_context:
            return self.default_context

        base_dict = self.default_context.model_dump()
        override_dict = {
            k: v for k, v in override_context.model_dump().items() if v is not None
        }
        base_dict.update(override_dict)
        return EnvironmentalContext(**base_dict)

    @staticmethod
    def _detect_season() -> str:
        """Estimate Indian agricultural cropping season from current calendar month."""
        month = datetime.now().month
        if 6 <= month <= 10:
            return "kharif"  # Monsoon / Wet Season
        elif 11 <= month or month <= 2:
            return "rabi"    # Winter / Cool Season
        else:
            return "zaid"    # Summer / Arid Season

    @staticmethod
    def format_for_prompt(env: EnvironmentalContext) -> str:
        """
        Formats environmental observations into clean bullet points for LLM reasoning.
        Environmental conditions serve as supporting context and must never override
        contradictory visual phenotype evidence.
        """
        parts = []
        if env.location_name:
            parts.append(f"- Location: {env.location_name}")
        if env.latitude is not None and env.longitude is not None:
            parts.append(f"- Coordinates: {env.latitude:.4f}°N, {env.longitude:.4f}°E")
        if env.season:
            parts.append(f"- Agricultural Season: {env.season.upper()}")
        if env.temperature_c is not None:
            parts.append(f"- Temperature: {env.temperature_c}°C")
        if env.relative_humidity_percent is not None:
            parts.append(f"- Relative Humidity: {env.relative_humidity_percent}%")
        if env.rainfall_last_24h_mm is not None:
            parts.append(f"- Rainfall (last 24h): {env.rainfall_last_24h_mm} mm")
        if env.rainfall_last_7_days_mm is not None:
            parts.append(f"- Rainfall (last 7 days): {env.rainfall_last_7_days_mm} mm")
        if env.leaf_wetness:
            parts.append(f"- Leaf Wetness: {env.leaf_wetness}")
        if env.soil_condition:
            parts.append(f"- Soil Condition: {env.soil_condition}")
        if env.source:
            parts.append(f"- Climate Telemetry Provider: {env.source}")
        if env.additional_notes:
            parts.append(f"- Additional Climate Notes: {env.additional_notes}")

        return "\n".join(parts) if parts else "No specific environmental data provided."
