"""Qwen3.8-27B Client for multimodal vision and structured reasoning via Alibaba Model Studio and Groq APIs."""

import os
import re
import time
import json
import logging
from typing import Dict, Any, Optional, List
import requests

from backend.config import (
    ALIBABA_API_KEY,
    ALIBABA_BASE_URL,
    ALIBABA_MODEL,
    GROQ_API_URL,
    GROQ_BASE_URL,
    GROQ_API_KEY,
    GROQ_MODEL,
    VISION_MODEL,
    REASONING_MODEL,
    GEMINI_API_KEY,
    GEMINI_MODEL,
    GEMINI_API_BASE,
    VISION_PROVIDER,
    OLLAMA_URL,
    OLLAMA_MODEL,
)

logger = logging.getLogger(__name__)


class QwenAPIError(Exception):
    """Raised when LLM API request (Alibaba / Groq / Gemini) fails."""
    pass


class QwenClient:
    """Multimodal Vision & Reasoning LLM Client supporting Alibaba Model Studio (qwen3.8-27b), Groq, and Gemini."""

    def __init__(
        self,
        provider: Optional[str] = None,
        alibaba_api_key: Optional[str] = None,
        alibaba_base_url: str = ALIBABA_BASE_URL,
        alibaba_model: str = ALIBABA_MODEL,
        groq_api_key: Optional[str] = None,
        vision_model: str = VISION_MODEL,
        reasoning_model: str = REASONING_MODEL,
        gemini_api_key: Optional[str] = None,
        gemini_model: str = GEMINI_MODEL,
    ):
        self._provider_explicit = provider.lower() if provider else None
        self._alibaba_api_key_explicit = alibaba_api_key
        self.alibaba_base_url = alibaba_base_url.rstrip("/") if alibaba_base_url else ALIBABA_BASE_URL
        self.alibaba_model = alibaba_model or ALIBABA_MODEL
        self._api_key_explicit = groq_api_key
        self.vision_model = vision_model
        self.reasoning_model = reasoning_model
        self.gemini_api_key = gemini_api_key or GEMINI_API_KEY
        self.gemini_model = gemini_model

    def _reload_env(self):
        from backend.config import PROJECT_ROOT
        from dotenv import load_dotenv
        for env_file in [".env.example", ".env", ".env.local"]:
            env_path = PROJECT_ROOT / env_file
            if env_path.exists():
                load_dotenv(dotenv_path=env_path, override=True)

    @property
    def provider(self) -> str:
        self._reload_env()
        prov = getattr(self, "_provider_explicit", None) or os.getenv("VISION_PROVIDER") or VISION_PROVIDER or "groq"
        prov = prov.strip().lower()
        if prov == "alibaba" and not self.alibaba_api_key and self.api_key:
            return "groq"
        return prov

    @provider.setter
    def provider(self, val: str):
        self._provider_explicit = val.lower() if val else None

    @property
    def api_key(self) -> str:
        self._reload_env()
        key = getattr(self, "_api_key_explicit", None) or os.getenv("GROQ_API_KEY") or os.getenv("GROQ_vision_api") or GROQ_API_KEY
        return key.strip() if key else ""

    @api_key.setter
    def api_key(self, val: str):
        self._api_key_explicit = val

    @property
    def groq_api_key(self) -> str:
        return self.api_key

    @groq_api_key.setter
    def groq_api_key(self, val: str):
        self._api_key_explicit = val

    @property
    def alibaba_api_key(self) -> str:
        self._reload_env()
        key = getattr(self, "_alibaba_api_key_explicit", None) or os.getenv("ALIBABA_API_KEY") or os.getenv("DASHSCOPE_API_KEY") or ALIBABA_API_KEY
        return key.strip() if key else ""

    @alibaba_api_key.setter
    def alibaba_api_key(self, val: str):
        self._alibaba_api_key_explicit = val

    def call_alibaba(self, payload: Dict[str, Any], retries: int = 3) -> str:
        """
        Execute chat completion request against Alibaba Model Studio DashScope Compatible API.
        """
        if not self.alibaba_api_key:
            raise QwenAPIError("Alibaba API key not configured. Set ALIBABA_API_KEY in environment or .env.")

        url = f"{self.alibaba_base_url}/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.alibaba_api_key}",
            "Content-Type": "application/json",
        }

        for attempt in range(1, retries + 1):
            try:
                response = requests.post(
                    url,
                    headers=headers,
                    json=payload,
                    timeout=90
                )
            except requests.RequestException as e:
                if attempt == retries:
                    raise QwenAPIError(f"Network error connecting to Alibaba Model Studio API: {e}") from e
                time.sleep(2 * attempt)
                continue

            # Handle rate limiting
            if response.status_code == 429:
                wait_seconds = 5 * attempt
                logger.warning(
                    f"Alibaba rate limit encountered (attempt {attempt}/{retries}). Pausing {wait_seconds}s..."
                )
                time.sleep(wait_seconds)
                continue

            if not response.ok:
                error_msg = response.text
                try:
                    err_json = response.json()
                    error_msg = err_json.get("error", {}).get("message", error_msg)
                except Exception:
                    pass
                raise QwenAPIError(f"Alibaba Model Studio API Error ({response.status_code}): {error_msg}")

            data = response.json()
            choices = data.get("choices", [])
            if not choices:
                return ""
            return choices[0].get("message", {}).get("content", "")

        raise QwenAPIError("Alibaba API call exceeded maximum retries due to rate limits.")

    def call_groq(self, payload: Dict[str, Any], retries: int = 5) -> str:
        """
        Execute chat completion request against Groq API with exponential backoff on 429 rate limit.
        """
        if not self.api_key:
            raise QwenAPIError("Groq API key not configured. Set GROQ_API_KEY in environment or .env.")

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        for attempt in range(1, retries + 1):
            try:
                response = requests.post(
                    GROQ_API_URL,
                    headers=headers,
                    json=payload,
                    timeout=90
                )
            except requests.RequestException as e:
                if attempt == retries:
                    raise QwenAPIError(f"Network error connecting to Groq API: {e}") from e
                time.sleep(2 * attempt)
                continue

            # Handle rate-limit / token quota
            if response.status_code in (429, 413):
                wait_seconds = 15
                try:
                    err_json = response.json()
                    msg = err_json.get("error", {}).get("message", "")
                    match = re.search(r"try again in ([\d\.]+)s", msg, re.IGNORECASE)
                    if match:
                        wait_seconds = int(float(match.group(1))) + 2
                    else:
                        retry_after = response.headers.get("retry-after")
                        if retry_after:
                            wait_seconds = int(float(retry_after)) + 2
                except Exception:
                    pass

                # If cooldown is long (e.g. > 6s), do not hang the interactive farmer UI:
                # raise immediately so the caller can switch to fast local botanical evaluation
                if wait_seconds > 6:
                    logger.warning(
                        f"Groq rate limit pause of {wait_seconds}s exceeds interactive threshold. Fast local fallback engaged."
                    )
                    raise QwenAPIError(f"Groq rate limit active (cooldown {wait_seconds}s). Fast local fallback engaged.")

                logger.warning(
                    f"Groq rate limit encountered (attempt {attempt}/{retries}). Pausing {wait_seconds}s..."
                )
                time.sleep(wait_seconds)
                continue

            if not response.ok:
                error_msg = response.text
                raise QwenAPIError(f"Groq API Error ({response.status_code}): {error_msg}")

            data = response.json()
            choices = data.get("choices", [])
            if not choices:
                return ""
            return choices[0].get("message", {}).get("content", "")

        raise QwenAPIError("Groq API call exceeded maximum retries due to rate limits.")

    def call(self, payload: Dict[str, Any], retries: int = 5) -> str:
        """Backward compatible call method defaulting to Groq or active provider."""
        if self.provider == "alibaba":
            return self.call_alibaba(payload, retries=retries)
        return self.call_groq(payload, retries=retries)

    def call_gemini(self, contents: List[Dict[str, Any]], temperature: float = 0.1, max_tokens: int = 600) -> str:
        """Call Google Gemini Flash REST API."""
        if not self.gemini_api_key:
            raise QwenAPIError("Gemini API key not configured.")

        url = f"{GEMINI_API_BASE}/{self.gemini_model}:generateContent?key={self.gemini_api_key}"
        payload = {
            "contents": contents,
            "generationConfig": {
                "temperature": temperature,
                "maxOutputTokens": max_tokens,
            }
        }

        try:
            resp = requests.post(url, json=payload, timeout=45)
            if not resp.ok:
                raise QwenAPIError(f"Gemini API error ({resp.status_code}): {resp.text}")
            data = resp.json()
            candidates = data.get("candidates", [])
            if candidates and "content" in candidates[0]:
                parts = candidates[0]["content"].get("parts", [])
                if parts and "text" in parts[0]:
                    return parts[0]["text"]
            return ""
        except Exception as e:
            raise QwenAPIError(f"Gemini request failed: {e}") from e

    def call_vision(
        self,
        image_base64: str,
        prompt: str,
        temperature: float = 0.1,
        max_tokens: int = 500,
    ) -> str:
        """Call Vision model based on active provider (alibaba, groq, gemini). No automatic fallback."""
        clean_b64 = image_base64
        mime_type = "image/jpeg"
        if image_base64.startswith("data:"):
            header, clean_b64 = image_base64.split(",", 1)
            if "png" in header:
                mime_type = "image/png"
            elif "webp" in header:
                mime_type = "image/webp"

        image_url = f"data:{mime_type};base64,{clean_b64}"

        # 1. Groq Provider (Primary)
        if self.provider == "groq":
            if not self.api_key:
                raise QwenAPIError("GROQ_API_KEY is not configured in environment or .env.")

            payload = {
                "model": self.vision_model or GROQ_MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {"type": "image_url", "image_url": {"url": image_url}},
                        ],
                    }
                ],
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
            return self.call_groq(payload)

        # 2. Alibaba Model Studio Provider (Alternative)
        elif self.provider == "alibaba":
            if not self.alibaba_api_key:
                raise QwenAPIError("ALIBABA_API_KEY is not configured in environment or .env.")

            payload = {
                "model": self.vision_model or self.alibaba_model,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {"type": "image_url", "image_url": {"url": image_url}},
                        ],
                    }
                ],
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
            return self.call_alibaba(payload)

        # 3. Gemini Provider (Optional)
        elif self.provider == "gemini":
            contents = [{
                "role": "user",
                "parts": [
                    {"text": prompt},
                    {
                        "inline_data": {
                            "mime_type": mime_type,
                            "data": clean_b64
                        }
                    }
                ]
            }]
            return self.call_gemini(contents, temperature=temperature, max_tokens=max_tokens)

        else:
            raise QwenAPIError(f"Unsupported VISION_PROVIDER '{self.provider}'. Must be 'groq', 'alibaba', or 'gemini'.")

    def call_vision_comparison(
        self,
        user_image_b64: str,
        prompt: str,
        reference_image_b64: Optional[str] = None,
        temperature: float = 0.1,
        max_tokens: int = 650,
    ) -> str:
        """
        Execute an independent vision comparison call:
        - If reference_image_b64 is provided: sends [USER IMAGE, REFERENCE IMAGE, PHENOTYPE PROMPT]
        - If reference_image_b64 is None: sends [USER IMAGE, PHENOTYPE PROMPT] (phenotype-only visual reasoning)
        """
        def _parse_b64(raw: str):
            clean = raw
            mime = "image/jpeg"
            if raw.startswith("data:"):
                header, clean = raw.split(",", 1)
                if "png" in header:
                    mime = "image/png"
                elif "webp" in header:
                    mime = "image/webp"
            return f"data:{mime};base64,{clean}", clean, mime

        user_url, clean_user, user_mime = _parse_b64(user_image_b64)
        has_ref = bool(reference_image_b64 and len(reference_image_b64) > 30)

        ref_url, clean_ref, ref_mime = (None, None, None)
        if has_ref:
            ref_url, clean_ref, ref_mime = _parse_b64(reference_image_b64)

        # 1. Groq Provider
        if self.provider == "groq":
            if not self.api_key:
                raise QwenAPIError("GROQ_API_KEY is not configured in environment or .env.")

            content: List[Dict[str, Any]] = [{"type": "text", "text": prompt}]
            content.append({"type": "image_url", "image_url": {"url": user_url}})
            if has_ref and ref_url:
                content.append({"type": "image_url", "image_url": {"url": ref_url}})

            payload = {
                "model": self.vision_model or GROQ_MODEL,
                "messages": [{"role": "user", "content": content}],
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
            return self.call_groq(payload)

        # 2. Alibaba Model Studio
        elif self.provider == "alibaba":
            if not self.alibaba_api_key:
                raise QwenAPIError("ALIBABA_API_KEY is not configured in environment or .env.")

            content = [{"type": "text", "text": prompt}]
            content.append({"type": "image_url", "image_url": {"url": user_url}})
            if has_ref and ref_url:
                content.append({"type": "image_url", "image_url": {"url": ref_url}})

            payload = {
                "model": self.vision_model or self.alibaba_model,
                "messages": [{"role": "user", "content": content}],
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
            return self.call_alibaba(payload)

        # 3. Gemini Provider
        elif self.provider == "gemini":
            parts: List[Dict[str, Any]] = [{"text": prompt}]
            parts.append({"inline_data": {"mime_type": user_mime, "data": clean_user}})
            if has_ref and clean_ref and ref_mime:
                parts.append({"inline_data": {"mime_type": ref_mime, "data": clean_ref}})

            contents = [{"role": "user", "parts": parts}]
            return self.call_gemini(contents, temperature=temperature, max_tokens=max_tokens)

        else:
            raise QwenAPIError(f"Unsupported VISION_PROVIDER '{self.provider}'. Must be 'groq', 'alibaba', or 'gemini'.")


    def call_reasoning(
        self,
        prompt: str,
        temperature: float = 0.1,
        max_tokens: int = 600,
    ) -> str:
        """Call reasoning model based on active provider (groq, alibaba, gemini). No automatic fallback."""
        # 1. Groq Provider (Primary)
        if self.provider == "groq":
            if not self.api_key:
                raise QwenAPIError("GROQ_API_KEY is not configured in environment or .env.")

            payload = {
                "model": self.reasoning_model or GROQ_MODEL,
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
            return self.call_groq(payload)

        # 2. Alibaba Model Studio Provider (Alternative)
        elif self.provider == "alibaba":
            if not self.alibaba_api_key:
                raise QwenAPIError("ALIBABA_API_KEY is not configured in environment or .env.")

            payload = {
                "model": self.reasoning_model or self.alibaba_model,
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
            return self.call_alibaba(payload)

        # 3. Gemini Provider (Optional)
        elif self.provider == "gemini":
            contents = [{
                "role": "user",
                "parts": [{"text": prompt}]
            }]
            return self.call_gemini(contents, temperature=temperature, max_tokens=max_tokens)

        else:
            raise QwenAPIError(f"Unsupported VISION_PROVIDER '{self.provider}'. Must be 'groq', 'alibaba', or 'gemini'.")

    def check_llm_health(self) -> Dict[str, Any]:
        """
        Diagnostic probe to test LLM provider connectivity (Groq / Alibaba) and report:
        - provider
        - model
        - healthy (boolean)
        - is_healthy (boolean for backward compatibility)
        - category (healthy_200, authentication_401, permission_403, rate_limit_429, server_5xx, network_error)
        - status_code
        """
        if self.provider == "groq":
            return self._check_groq_health()
        elif self.provider == "alibaba":
            return self._check_alibaba_health()
        else:
            return {
                "provider": self.provider,
                "model": self.vision_model or GROQ_MODEL,
                "healthy": False,
                "is_healthy": False,
                "category": "network_error",
                "status_code": None,
                "error_message": f"Unknown provider '{self.provider}'"
            }

    def _check_alibaba_health(self) -> Dict[str, Any]:
        """Health check probe for Alibaba Cloud Model Studio."""
        target_model = self.vision_model or self.alibaba_model or "qwen3.8-27b"
        result: Dict[str, Any] = {
            "provider": "alibaba",
            "model": target_model,
            "base_url": self.alibaba_base_url,
            "api_key_configured": bool(self.alibaba_api_key),
            "healthy": False,
            "is_healthy": False,
            "status_code": None,
            "category": "network_error",
            "error_message": None,
        }

        if not self.alibaba_api_key:
            result["status_code"] = 401
            result["category"] = "authentication_401"
            result["error_message"] = "ALIBABA_API_KEY is not configured in environment or .env."
            return result

        chat_url = f"{self.alibaba_base_url}/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.alibaba_api_key}",
            "Content-Type": "application/json",
            "User-Agent": "CropShield-Diagnostics/1.0",
        }
        payload = {
            "model": target_model,
            "messages": [{"role": "user", "content": "ping"}],
            "max_tokens": 5,
        }

        try:
            resp = requests.post(chat_url, headers=headers, json=payload, timeout=12)
            result["status_code"] = resp.status_code

            if resp.status_code == 200:
                result["healthy"] = True
                result["is_healthy"] = True
                result["category"] = "healthy_200"
                result["error_message"] = None
            elif resp.status_code == 401:
                result["category"] = "authentication_401"
                result["error_message"] = "Authentication failed (401). Invalid ALIBABA_API_KEY."
            elif resp.status_code == 403:
                result["category"] = "permission_403"
                result["error_message"] = f"Access denied (403): {resp.text[:200]}"
            elif resp.status_code == 429:
                result["category"] = "rate_limit_429"
                result["error_message"] = f"Rate limit / quota exceeded (429): {resp.text[:200]}"
            elif resp.status_code >= 500:
                result["category"] = "server_5xx"
                result["error_message"] = f"Alibaba server error ({resp.status_code}): {resp.text[:200]}"
            else:
                result["category"] = f"status_{resp.status_code}"
                result["error_message"] = f"Unexpected status code {resp.status_code}: {resp.text[:200]}"

            return result

        except requests.RequestException as exc:
            result["category"] = "network_error"
            result["error_message"] = f"Network connection failed: {exc}"
            return result

    def _check_groq_health(self) -> Dict[str, Any]:
        """Health check probe for Groq API."""
        target_model = self.vision_model or GROQ_MODEL or "qwen/qwen3.8-27b"
        result: Dict[str, Any] = {
            "provider": "groq",
            "model": target_model,
            "base_url": GROQ_BASE_URL,
            "api_key_configured": bool(self.api_key),
            "healthy": False,
            "is_healthy": False,
            "status_code": None,
            "category": "network_error",
            "error_message": None,
        }

        if not self.api_key:
            result["status_code"] = 401
            result["category"] = "authentication_401"
            result["error_message"] = "GROQ_API_KEY is not configured in backend/.env."
            return result

        models_url = f"{GROQ_BASE_URL}/models"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "User-Agent": "CropShield-Diagnostics/1.0"
        }

        try:
            resp = requests.get(models_url, headers=headers, timeout=12)
            result["status_code"] = resp.status_code
            server_header = resp.headers.get("server", "").lower()
            cf_ray = resp.headers.get("cf-ray")
            raw_body = resp.text

            is_json = False
            try:
                resp.json()
                is_json = True
            except Exception:
                pass

            if resp.status_code == 403:
                is_cloudflare_waf = (
                    "cloudflare" in server_header
                    or cf_ray is not None
                    or "Access denied. Please check your network settings." in raw_body
                    or "challenge-platform" in raw_body
                    or not is_json
                )
                if is_cloudflare_waf:
                    result["category"] = "permission_403"
                    result["error_message"] = "Cloudflare edge firewall blocked request to api.groq.com (403 Forbidden)."
                else:
                    result["category"] = "permission_403"
                    result["error_message"] = f"Groq returned 403: {raw_body[:200]}"
                return result

            elif resp.status_code == 401:
                result["category"] = "authentication_401"
                result["error_message"] = "Groq Authentication Failed (401)."
                return result

            elif resp.status_code == 429:
                result["category"] = "rate_limit_429"
                result["error_message"] = "Groq rate limit exceeded (429)."
                return result

            elif resp.status_code >= 500:
                result["category"] = "server_5xx"
                result["error_message"] = f"Groq Server Error ({resp.status_code})."
                return result

            elif resp.status_code == 200:
                result["healthy"] = True
                result["is_healthy"] = True
                result["category"] = "healthy_200"
                return result

            result["category"] = f"status_{resp.status_code}"
            return result

        except requests.RequestException as e:
            result["category"] = "network_error"
            result["error_message"] = f"Failed to connect to api.groq.com: {e}"
            return result
