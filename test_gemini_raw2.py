import sys
import os
import base64
import requests

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "cropshield-ai"))

from backend.services.qwen_client import QwenClient
from backend.config import GEMINI_API_BASE, GEMINI_API_KEY

client = QwenClient()
print(f"Gemini Model: {client.gemini_model}")
print(f"URL: {GEMINI_API_BASE}/{client.gemini_model}:generateContent")

payload = {
    "contents": [{"role": "user", "parts": [{"text": "Hello"}]}]
}
url = f"{GEMINI_API_BASE}/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
resp = requests.post(url, json=payload, timeout=30)
print(f"Status Code: {resp.status_code}")
print(f"Response: {resp.text}")
