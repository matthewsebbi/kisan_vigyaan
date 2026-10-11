import requests
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "cropshield-ai"))
from backend.config import GEMINI_API_KEY

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={GEMINI_API_KEY}"
resp = requests.get(url)
print(resp.status_code)
data = resp.json()
for m in data.get("models", []):
    print(m.get("name"))
