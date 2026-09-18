import os
import requests
from pathlib import Path

# ============================================================
# CONFIGURATION
# ============================================================

CLIENT_ID = "sh-3cf4343d-02ea-433a-b2b8-3ff0011a1dfa"
CLIENT_SECRET = "wvgnH42lZBeSnrbriTCXgP4FDNDziPHw"

# Your GPS coordinate
LAT = 19.25046
LON = 75.69894

# ~2 km x 2 km area around the coordinate
HALF_SIZE = 0.01

BBOX = [
    LON - HALF_SIZE,
    LAT - HALF_SIZE,
    LON + HALF_SIZE,
    LAT + HALF_SIZE,
]

# Recent time period
START_DATE = "2026-09-01T00:00:00Z"
END_DATE = "2026-09-16T23:59:59Z"

TOKEN_URL = (
    "https://identity.dataspace.copernicus.eu/"
    "auth/realms/CDSE/protocol/openid-connect/token"
)

PROCESS_URL = "https://sh.dataspace.copernicus.eu/process/v1"


# ============================================================
# 1. GET OAUTH ACCESS TOKEN
# ============================================================

print("Getting OAuth access token...")

token_response = requests.post(
    TOKEN_URL,
    data={
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    },
    timeout=30,
)

token_response.raise_for_status()

access_token = token_response.json()["access_token"]

print("Authentication successful.")


# ============================================================
# 2. EVALSCRIPT
# ============================================================

# Sentinel-2:
# B04 = Red
# B03 = Green
# B02 = Blue
#
# Multiplication by 2.5 converts Sentinel-2 reflectance
# into a useful display range for an RGB image.

evalscript = """
//VERSION=3

function setup() {
    return {
        input: [
            "B02",
            "B03",
            "B04",
            "SCL"
        ],
        output: {
            bands: 3,
            sampleType: "AUTO"
        }
    };
}

function evaluatePixel(sample) {

    // Mask cloud/shadow classes
    if (
        sample.SCL === 3 ||   // cloud shadow
        sample.SCL === 8 ||   // medium probability cloud
        sample.SCL === 9 ||   // high probability cloud
        sample.SCL === 10      // cirrus
    ) {
        return [0, 0, 0];
    }

    return [
        2.5 * sample.B04,
        2.5 * sample.B03,
        2.5 * sample.B02
    ];
}
"""


# ============================================================
# 3. PROCESS API REQUEST
# ============================================================

request_body = {

    "input": {

        "bounds": {
            "properties": {
                "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
            },
            "bbox": BBOX,
        },

        "data": [
            {
                "type": "sentinel-2-l2a",

                "dataFilter": {
                    "timeRange": {
                        "from": START_DATE,
                        "to": END_DATE,
                    },

                    # Pick the least cloudy acquisition
                    "mosaickingOrder": "leastCC",
                },
            }
        ],
    },

    "output": {

        "width": 2500,
        "height": 2500,

        "responses": [
            {
                "identifier": "default",
                "format": {
                    "type": "image/png"
                },
            }
        ],
    },

    "evalscript": evalscript,
}


# ============================================================
# 4. SEND REQUEST
# ============================================================

print("Requesting Sentinel-2 imagery...")

headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json",
}

response = requests.post(
    PROCESS_URL,
    headers=headers,
    json=request_body,
    timeout=120,
)

print("HTTP status:", response.status_code)

if not response.ok:
    print(response.text)
    response.raise_for_status()


# ============================================================
# 5. SAVE IMAGE
# ============================================================

output_file = Path("sentinel2_rgb.png")

output_file.write_bytes(response.content)

print()
print("SUCCESS!")
print("Image saved to:")
print(output_file.resolve())
print()
print(f"Center: {LAT}, {LON}")
print(f"BBOX: {BBOX}")
print("Resolution: 1024 x 1024")