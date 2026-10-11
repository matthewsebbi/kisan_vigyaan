import sys
import os
import base64

# Add the project root to python path so we can import backend modules
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "cropshield-ai"))

from backend.services.qwen_client import QwenClient

image_path = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\pearl_millet_unseen_v1_12_images\images\PMU_009.jpg"

with open(image_path, "rb") as image_file:
    b64 = base64.b64encode(image_file.read()).decode("utf-8")

client = QwenClient()
print(f"Provider: {client.provider}")
print(f"Gemini Model: {client.gemini_model}")

try:
    print("Sending prompt to Gemini...")
    res = client.call_vision_comparison(
        user_image_b64=b64,
        prompt="Reply with ```json\n{\"test\": 1}\n```",
        reference_image_b64=None,
        temperature=0.1,
        max_tokens=100
    )
    print("Response:")
    print(repr(res))
except Exception as e:
    print("Error:", repr(e))
