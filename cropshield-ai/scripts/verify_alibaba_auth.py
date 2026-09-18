"""Script to verify ALIBABA_API_KEY loading and run real authenticated calls."""

import os
import sys
import time
import json
import base64
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

for env_file in [".env", ".env.local", ".env.example"]:
    env_path = PROJECT_ROOT / env_file
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)

from backend.config import ALIBABA_API_KEY, ALIBABA_BASE_URL, ALIBABA_MODEL


def check_key_loaded():
    print("\n--- 1. Verify ALIBABA_API_KEY Loading ---")
    key_exists = bool(ALIBABA_API_KEY)
    key_len = len(ALIBABA_API_KEY) if key_exists else 0
    print(f"API Key Present: {key_exists}")
    print(f"API Key Length: {key_len} characters")
    if not key_exists:
        print("ERROR: ALIBABA_API_KEY is empty or missing in environment/files.")
        return False
    print("SUCCESS: ALIBABA_API_KEY is loaded by backend configuration.")
    return True


def run_authenticated_text_request():
    print("\n--- 2. Authenticated Text-Only Request (qwen3.8-27b) ---")
    url = f"{ALIBABA_BASE_URL}/chat/completions"
    headers = {
        "Authorization": f"Bearer {ALIBABA_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": ALIBABA_MODEL,
        "messages": [
            {"role": "user", "content": "What is the capital of France? Answer in 3 words."}
        ],
        "temperature": 0.1,
        "max_tokens": 30,
    }

    start_time = time.time()
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=30)
        latency = round(time.time() - start_time, 3)

        print(f"HTTP Status: {resp.status_code}")
        print(f"Latency: {latency} seconds")
        print(f"Request ID (Header): {resp.headers.get('x-request-id') or resp.headers.get('request-id') or 'N/A'}")

        if not resp.ok:
            print(f"Error Response Body: {resp.text}")
            return False, {}

        data = resp.json()
        print(f"Response ID: {data.get('id')}")
        print(f"Model returned: {data.get('model')}")
        print(f"Token Usage: {data.get('usage')}")

        choices = data.get("choices", [])
        content = choices[0].get("message", {}).get("content", "") if choices else ""
        print(f"Content: {content.strip()}")

        return True, data
    except Exception as exc:
        print(f"Request failed: {exc}")
        return False, {}


def run_authenticated_vision_request():
    print("\n--- 3. Authenticated Vision Request (rice_blast_3.jpg) ---")
    img_path = PROJECT_ROOT / "rice_test" / "rice_blast_3.jpg"
    if not img_path.exists():
        print(f"ERROR: Test image {img_path} not found.")
        return False, {}

    with open(img_path, "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode("utf-8")

    image_url = f"data:image/jpeg;base64,{img_b64}"
    url = f"{ALIBABA_BASE_URL}/chat/completions"
    headers = {
        "Authorization": f"Bearer {ALIBABA_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": ALIBABA_MODEL,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe the main visual symptoms on this plant leaf in detail."},
                    {"type": "image_url", "image_url": {"url": image_url}},
                ],
            }
        ],
        "temperature": 0.1,
        "max_tokens": 150,
    }

    start_time = time.time()
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=45)
        latency = round(time.time() - start_time, 3)

        print(f"HTTP Status: {resp.status_code}")
        print(f"Latency: {latency} seconds")
        print(f"Request ID (Header): {resp.headers.get('x-request-id') or resp.headers.get('request-id') or 'N/A'}")

        if not resp.ok:
            print(f"Error Response Body: {resp.text}")
            return False, {}

        data = resp.json()
        print(f"Response ID: {data.get('id')}")
        print(f"Model returned: {data.get('model')}")
        print(f"Token Usage: {data.get('usage')}")

        choices = data.get("choices", [])
        content = choices[0].get("message", {}).get("content", "") if choices else ""
        print(f"Vision Content: {content.strip()[:300]}...")

        return True, data
    except Exception as exc:
        print(f"Vision request failed: {exc}")
        return False, {}


def main():
    key_ok = check_key_loaded()
    if not key_ok:
        sys.exit(1)

    text_ok, text_data = run_authenticated_text_request()
    vision_ok, vision_data = run_authenticated_vision_request()

    if text_ok and vision_ok:
        print("\nSUCCESS: Authenticated Alibaba Cloud Model Studio requests passed!")
        sys.exit(0)
    else:
        print("\nFAILURE: One or more authenticated requests failed.")
        sys.exit(1)


if __name__ == "__main__":
    main()
