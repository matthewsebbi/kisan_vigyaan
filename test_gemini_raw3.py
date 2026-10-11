import sys
import os
import base64
import requests

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "cropshield-ai"))

from backend.config import GEMINI_API_BASE, GEMINI_API_KEY

payload = {
    "contents": [{"role": "user", "parts": [{"text": "Reply with ```json\n{\"test\": 1}\n```"}]}],
    "generationConfig": {
        "temperature": 0.1,
        "maxOutputTokens": 600,
    }
}
url = f"{GEMINI_API_BASE}/gemini-3.8-flash:generateContent?key={GEMINI_API_KEY}"
print(f"URL: {url}")
resp = requests.post(url, json=payload, timeout=60)
print(f"Status Code: {resp.status_code}")
if resp.ok:
    print(f"JSON: {resp.json()}")
else:
    print(f"Response: {resp.text}")
