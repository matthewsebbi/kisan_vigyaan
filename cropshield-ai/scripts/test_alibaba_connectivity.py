"""Standalone Alibaba Cloud Model Studio (Qwen3.8-27B) Connectivity Test Script."""

import os
import sys
import json
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
PROJECT_ROOT = Path(__file__).resolve().parent.parent
for env_file in [".env", ".env.local", ".env.example"]:
    env_path = PROJECT_ROOT / env_file
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)

ALIBABA_API_KEY = (
    os.getenv("ALIBABA_API_KEY")
    or os.getenv("DASHSCOPE_API_KEY")
    or os.getenv("VITE_ALIBABA_API_KEY")
    or ""
).strip()

ALIBABA_BASE_URL = os.getenv("ALIBABA_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1").rstrip("/")
ALIBABA_MODEL = os.getenv("ALIBABA_MODEL", "qwen3.8-27b")

# Minimal 1x1 green pixel JPEG base64 for image testing
TINY_JPEG_B64 = (
    "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP///////////////////////////////////"
    "///////////////////////////////////////////////////wgALCAABAAEBAREA/8Q"
    "AFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA="
)


def run_text_test(api_key: str, base_url: str, model: str) -> dict:
    """Run simple text request against Alibaba Model Studio API."""
    print("\n--- Test 1: Simple Text Request ---")
    print(f"Target URL: {base_url}/chat/completions")
    print(f"Model: {model}")
    effective_key = api_key if api_key else "missing_key_probe"

    headers = {
        "Authorization": f"Bearer {effective_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": "Respond with the word 'PONG' to confirm connection."}
        ],
        "temperature": 0.1,
        "max_tokens": 50,
    }

    try:
        resp = requests.post(f"{base_url}/chat/completions", headers=headers, json=payload, timeout=30)
        print(f"HTTP Status Code: {resp.status_code}")
        print(f"Server Header: {resp.headers.get('server', 'N/A')}")

        body_json = None
        try:
            body_json = resp.json()
        except Exception:
            pass

        if resp.status_code == 200 and body_json:
            choices = body_json.get("choices", [])
            reply = choices[0].get("message", {}).get("content", "") if choices else ""
            print("Response text:", reply.strip())
            return {"success": True, "status_code": 200, "reply": reply}
        else:
            err_msg = body_json.get("error", {}).get("message", resp.text) if body_json else resp.text
            print(f"Provider Error ({resp.status_code}): {err_msg}")
            return {"success": False, "status_code": resp.status_code, "error": err_msg}
    except requests.RequestException as exc:
        print(f"Network Error: {exc}")
        return {"success": False, "status_code": 0, "error": str(exc)}


def run_image_test(api_key: str, base_url: str, model: str) -> dict:
    """Run multimodal (image + text) request against Alibaba Model Studio API."""
    print("\n--- Test 2: Multimodal (Image + Text) Request ---")
    print(f"Target URL: {base_url}/chat/completions")
    print(f"Model: {model}")
    effective_key = api_key if api_key else "missing_key_probe"

    headers = {
        "Authorization": f"Bearer {effective_key}",
        "Content-Type": "application/json",
    }
    image_url = f"data:image/jpeg;base64,{TINY_JPEG_B64}"
    payload = {
        "model": model,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe the main color of this image in one word."},
                    {"type": "image_url", "image_url": {"url": image_url}},
                ],
            }
        ],
        "temperature": 0.1,
        "max_tokens": 50,
    }

    try:
        resp = requests.post(f"{base_url}/chat/completions", headers=headers, json=payload, timeout=30)
        print(f"HTTP Status Code: {resp.status_code}")
        print(f"Server Header: {resp.headers.get('server', 'N/A')}")

        body_json = None
        try:
            body_json = resp.json()
        except Exception:
            pass

        if resp.status_code == 200 and body_json:
            choices = body_json.get("choices", [])
            reply = choices[0].get("message", {}).get("content", "") if choices else ""
            print("Response text:", reply.strip())
            return {"success": True, "status_code": 200, "reply": reply}
        else:
            err_msg = body_json.get("error", {}).get("message", resp.text) if body_json else resp.text
            print(f"Provider Error ({resp.status_code}): {err_msg}")
            return {"success": False, "status_code": resp.status_code, "error": err_msg}
    except requests.RequestException as exc:
        print(f"Network Error: {exc}")
        return {"success": False, "status_code": 0, "error": str(exc)}


def main():
    print("==================================================")
    print(" Alibaba Cloud Model Studio Connectivity Diagnostic")
    print("==================================================")
    print(f"Base URL: {ALIBABA_BASE_URL}")
    print(f"Model: {ALIBABA_MODEL}")
    print(f"API Key Configured: {'YES' if ALIBABA_API_KEY else 'NO (Missing ALIBABA_API_KEY)'}")

    text_res = run_text_test(ALIBABA_API_KEY, ALIBABA_BASE_URL, ALIBABA_MODEL)
    image_res = run_image_test(ALIBABA_API_KEY, ALIBABA_BASE_URL, ALIBABA_MODEL)

    print("\n==================================================")
    print(" Summary of Diagnostic Results")
    print("==================================================")
    print(f"Text Test:  {'PASSED' if text_res['success'] else 'FAILED'} (HTTP {text_res['status_code']})")
    print(f"Image Test: {'PASSED' if image_res['success'] else 'FAILED'} (HTTP {image_res['status_code']})")

    if text_res["success"] and image_res["success"]:
        print("\nSUCCESS: Alibaba Model Studio connectivity verified for text and vision!")
        sys.exit(0)
    else:
        print("\nDIAGNOSTIC FINISHED: Connectivity test reported HTTP status and error responses above.")
        if not ALIBABA_API_KEY:
            print("NOTE: Set ALIBABA_API_KEY in backend/.env to complete authenticated requests.")
        sys.exit(1 if not ALIBABA_API_KEY else 0)


if __name__ == "__main__":
    main()
