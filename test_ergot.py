import requests
import base64
import time
import json

url = "http://localhost:8000/predict"
image_path = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\pearl_millet_unseen_v1_12_images\images\PMU_009.jpg"

with open(image_path, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode("utf-8")

payload = {
    "crop": "Pearl Millet",
    "image": encoded_string
}

start_time = time.time()
print(f"Sending request to {url}...")
try:
    response = requests.post(url, json=payload, timeout=200)
    print(f"Status Code: {response.status_code}")
    print(f"Time Taken: {time.time() - start_time:.2f} seconds")
    try:
        data = response.json()
        print("Diagnosis:", data.get("diagnosis"))
        print("Confidence:", data.get("confidence"))
        print(json.dumps(data, indent=2))
    except Exception as e:
        print("Response text:", response.text)
except Exception as e:
    print("Error:", e)
