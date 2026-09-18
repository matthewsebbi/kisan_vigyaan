from __future__ import annotations

import io
import json
import os
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

import numpy as np
import requests
from PIL import Image
from scipy import ndimage
import tifffile


# ============================================================
# CONFIGURATION
# ============================================================

LAT = 19.25046
LON = 75.69894

# Approximately 2.2 km x 2.2 km around the point.
HALF_SIZE_DEG = 0.01

START_DATE = "2026-08-15T00:00:00Z"
END_DATE = "2026-09-16T23:59:59Z"

TOKEN_URL = (
    "https://identity.dataspace.copernicus.eu/"
    "auth/realms/CDSE/protocol/openid-connect/token"
)

PROCESS_URL = "https://sh.dataspace.copernicus.eu/process/v1"

OUTPUT_DIR = Path("sentinel2_analysis")

# Request approximately 10 m output pixels.
TARGET_RESOLUTION_M = 10

# Vegetation/stress parameters.
VEGETATION_NDVI_MIN = 0.20
Z_THRESHOLD = -1.5
MIN_COMPONENT_PIXELS = 6

# Morphological filtering.
OPENING_SIZE = 1
CLOSING_SIZE = 2


# ============================================================
# AOI
# ============================================================

BBOX = [
    LON - HALF_SIZE_DEG,
    LAT - HALF_SIZE_DEG,
    LON + HALF_SIZE_DEG,
    LAT + HALF_SIZE_DEG,
]


def calculate_output_size():
    """
    Approximate dimensions of the geographic AOI in metres.

    Sentinel-2 10 m bands are returned on approximately a 10 m
    output grid. 20 m bands are resampled to this grid.
    """

    meters_per_degree_lat = 111_320.0

    meters_per_degree_lon = (
        111_320.0 * np.cos(np.radians(LAT))
    )

    width_m = (
        BBOX[2] - BBOX[0]
    ) * meters_per_degree_lon

    height_m = (
        BBOX[3] - BBOX[1]
    ) * meters_per_degree_lat

    width_px = max(
        1,
        int(round(width_m / TARGET_RESOLUTION_M)),
    )

    height_px = max(
        1,
        int(round(height_m / TARGET_RESOLUTION_M)),
    )

    return width_px, height_px, width_m, height_m


WIDTH, HEIGHT, WIDTH_M, HEIGHT_M = calculate_output_size()


# ============================================================
# CREDENTIALS
# ============================================================

DEFAULT_CLIENT_ID = "sh-3cf4343d-02ea-433a-b2b8-3ff0011a1dfa"
DEFAULT_CLIENT_SECRET = "wvgnH42lZBeSnrbriTCXgP4FDNDziPHw"


def get_credentials():
    client_id = os.getenv("SH_CLIENT_ID") or DEFAULT_CLIENT_ID
    client_secret = os.getenv("SH_CLIENT_SECRET")

    # If secret is missing or truncated in environment (e.g. missing trailing 'Hw')
    if not client_secret or client_secret == "wvgnH42lZBeSnrbriTCXgP4FDNDziP" or len(client_secret) < 32:
        client_secret = DEFAULT_CLIENT_SECRET

    return client_id, client_secret


# ============================================================
# OAUTH
# ============================================================

def get_access_token(client_id, client_secret):

    print("[1/7] Requesting OAuth access token...")

    response = requests.post(
        TOKEN_URL,
        data={
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        },
        timeout=30,
    )

    if not response.ok:
        raise RuntimeError(
            "OAuth authentication failed "
            f"({response.status_code}):\n"
            f"{response.text}"
        )

    token = response.json().get("access_token")

    if not token:
        raise RuntimeError(
            "OAuth response did not contain access_token."
        )

    print("      Authentication successful.")

    return token


# ============================================================
# EVALSCRIPT
# ============================================================

# IMPORTANT:
#
# There is ONE input object.
#
# The units array corresponds position-by-position to bands:
#
# B02 -> REFLECTANCE
# B03 -> REFLECTANCE
# ...
# B12 -> REFLECTANCE
# SCL -> DN
#
# This avoids the "Dataset with id: 1 not found" problem caused
# by defining SCL as a second input object.

EVALSCRIPT = """
//VERSION=3

function setup() {

    return {

        input: [
            {
                bands: [
                    "B02",
                    "B03",
                    "B04",
                    "B05",
                    "B06",
                    "B07",
                    "B08",
                    "B8A",
                    "B11",
                    "B12",
                    "SCL"
                ],

                units: [
                    "REFLECTANCE",
                    "REFLECTANCE",
                    "REFLECTANCE",
                    "REFLECTANCE",
                    "REFLECTANCE",
                    "REFLECTANCE",
                    "REFLECTANCE",
                    "REFLECTANCE",
                    "REFLECTANCE",
                    "REFLECTANCE",
                    "DN"
                ]
            }
        ],

        output: {
            bands: 11,
            sampleType: "FLOAT32"
        }
    };
}


function evaluatePixel(sample) {

    return [

        sample.B02,
        sample.B03,
        sample.B04,
        sample.B05,
        sample.B06,
        sample.B07,
        sample.B08,
        sample.B8A,
        sample.B11,
        sample.B12,

        sample.SCL
    ];
}
"""


# ============================================================
# PROCESS API
# ============================================================

def request_sentinel_data(access_token):

    print("[2/7] Requesting Sentinel-2 L2A data...")

    request_body = {

        "input": {

            "bounds": {

                "properties": {
                    "crs": (
                        "http://www.opengis.net/def/crs/"
                        "OGC/1.3/CRS84"
                    )
                },

                "bbox": BBOX
            },

            "data": [

                {
                    "type": "sentinel-2-l2a",

                    "dataFilter": {

                        "timeRange": {

                            "from": START_DATE,
                            "to": END_DATE
                        },

                        # Select least cloudy available
                        # acquisition/mosaic.
                        "mosaickingOrder": "leastCC"
                    }
                }
            ]
        },

        "output": {

            "width": WIDTH,
            "height": HEIGHT,

            "responses": [

                {
                    "identifier": "default",

                    "format": {
                        "type": "image/tiff"
                    }
                }
            ]
        },

        "evalscript": EVALSCRIPT
    }

    headers = {

        "Authorization": (
            f"Bearer {access_token}"
        ),

        "Content-Type": "application/json",

        "Accept": "image/tiff"
    }

    response = requests.post(
        PROCESS_URL,
        headers=headers,
        json=request_body,
        timeout=180
    )

    if not response.ok:

        raise RuntimeError(
            "Process API request failed "
            f"({response.status_code}):\n"
            f"{response.text}"
        )

    print(
        "      Received "
        f"{len(response.content) / (1024 * 1024):.2f} MB"
    )

    return response.content


# ============================================================
# READ TIFF
# ============================================================

def read_tiff(data):

    print("[3/7] Reading returned raster...")

    array = tifffile.imread(
        io.BytesIO(data)
    )

    array = np.asarray(array)

    if array.ndim != 3:

        raise RuntimeError(
            f"Expected a 3D raster, got {array.shape}"
        )

    # bands x height x width
    if array.shape[0] == 11:

        bands = array

    # height x width x bands
    elif array.shape[-1] == 11:

        bands = np.moveaxis(
            array,
            -1,
            0
        )

    else:

        raise RuntimeError(
            "Could not identify the 11-band "
            f"dimension. Raster shape: {array.shape}"
        )

    print(
        f"      Raster shape: {bands.shape}"
    )

    return bands.astype(np.float32)


# ============================================================
# BAND EXTRACTION
# ============================================================

def extract_bands(data):

    names = [
        "B02",
        "B03",
        "B04",
        "B05",
        "B06",
        "B07",
        "B08",
        "B8A",
        "B11",
        "B12",
        "SCL"
    ]

    return {
        name: data[index]
        for index, name in enumerate(names)
    }


# ============================================================
# INDEX FUNCTIONS
# ============================================================

def normalized_difference(a, b):

    denominator = a + b

    return np.divide(
        a - b,
        denominator,
        out=np.full_like(
            a,
            np.nan,
            dtype=np.float32
        ),
        where=np.abs(denominator) > 1e-8
    )


def calculate_indices(bands):

    B02 = bands["B02"]
    B04 = bands["B04"]
    B05 = bands["B05"]
    B08 = bands["B08"]
    B8A = bands["B8A"]
    B11 = bands["B11"]
    B12 = bands["B12"]

    # NDVI
    NDVI = normalized_difference(
        B08,
        B04
    )

    # NDRE
    NDRE = normalized_difference(
        B8A,
        B05
    )

    # EVI
    denominator = (
        B08
        + 6.0 * B04
        - 7.5 * B02
        + 1.0
    )

    EVI = np.divide(
        2.5 * (B08 - B04),
        denominator,
        out=np.full_like(
            B08,
            np.nan,
            dtype=np.float32
        ),
        where=np.abs(denominator) > 1e-8
    )

    # NDMI
    NDMI = normalized_difference(
        B08,
        B11
    )

    # NBR
    NBR = normalized_difference(
        B08,
        B12
    )

    return {
        "NDVI": NDVI,
        "NDRE": NDRE,
        "EVI": EVI,
        "NDMI": NDMI,
        "NBR": NBR
    }


# ============================================================
# MASKING
# ============================================================

def build_valid_mask(bands, indices):

    SCL = bands["SCL"].astype(np.int16)

    # Sentinel-2 SCL:
    #
    # 0  = No data
    # 1  = Saturated / defective
    # 3  = Cloud shadow
    # 8  = Cloud medium probability
    # 9  = Cloud high probability
    # 10 = Thin cirrus

    bad_classes = np.isin(
        SCL,
        [
            0,
            1,
            3,
            8,
            9,
            10
        ]
    )

    finite = np.isfinite(
        indices["NDVI"]
    )

    return (
        ~bad_classes
        & finite
    )


# ============================================================
# IMAGE NORMALIZATION
# ============================================================

def percentile_stretch(
    image,
    mask,
    low=2,
    high=98
):

    output = np.zeros_like(
        image,
        dtype=np.float32
    )

    values = image[mask]

    if values.size == 0:
        return output

    lo = np.percentile(
        values,
        low
    )

    hi = np.percentile(
        values,
        high
    )

    if hi <= lo:
        return output

    output = (
        image - lo
    ) / (
        hi - lo
    )

    return np.clip(
        output,
        0,
        1
    )


# ============================================================
# RGB
# ============================================================

def create_rgb(bands, valid_mask):

    red = percentile_stretch(
        bands["B04"],
        valid_mask
    )

    green = percentile_stretch(
        bands["B03"],
        valid_mask
    )

    blue = percentile_stretch(
        bands["B02"],
        valid_mask
    )

    rgb = np.stack(
        [
            red,
            green,
            blue
        ],
        axis=-1
    )

    rgb[~valid_mask] = 0

    return (
        rgb * 255
    ).astype(np.uint8)


# ============================================================
# INDEX IMAGE
# ============================================================

def save_index_image(
    index,
    mask,
    path
):

    output = np.zeros_like(
        index,
        dtype=np.float32
    )

    values = index[mask]

    if values.size:

        low = np.percentile(
            values,
            2
        )

        high = np.percentile(
            values,
            98
        )

        if high > low:

            output[mask] = (
                index[mask] - low
            ) / (
                high - low
            )

    output = np.clip(
        output,
        0,
        1
    )

    image = (
        output * 255
    ).astype(np.uint8)

    Image.fromarray(
        image,
        mode="L"
    ).save(path)


# ============================================================
# ROBUST Z-SCORE
# ============================================================

def robust_zscore(
    image,
    mask
):

    result = np.full_like(
        image,
        np.nan,
        dtype=np.float32
    )

    values = image[mask]

    if values.size < 20:
        return result

    median = np.median(values)

    MAD = np.median(
        np.abs(
            values - median
        )
    )

    sigma = 1.4826 * MAD

    if sigma < 1e-6:

        sigma = np.std(values)

    if sigma < 1e-6:
        return result

    result[mask] = (
        image[mask] - median
    ) / sigma

    return result


# ============================================================
# STRESS DETECTION
# ============================================================

def create_stress_score(
    indices,
    valid_mask
):

    NDVI = indices["NDVI"]
    NDRE = indices["NDRE"]
    EVI = indices["EVI"]
    NDMI = indices["NDMI"]

    z_ndvi = robust_zscore(
        NDVI,
        valid_mask
    )

    z_ndre = robust_zscore(
        NDRE,
        valid_mask
    )

    z_evi = robust_zscore(
        EVI,
        valid_mask
    )

    z_ndmi = robust_zscore(
        NDMI,
        valid_mask
    )

    # Positive score = more anomalously stressed.
    score = np.nanmean(
        np.stack(
            [
                -z_ndvi,
                -z_ndre,
                -z_evi,
                -z_ndmi
            ],
            axis=0
        ),
        axis=0
    )

    score[~valid_mask] = np.nan

    # Don't interpret bare soil / low vegetation
    # as diseased vegetation.
    vegetation = (
        valid_mask
        & (NDVI >= VEGETATION_NDVI_MIN)
    )

    candidate = (
        vegetation
        & np.isfinite(score)
        & (z_ndvi <= Z_THRESHOLD)
        & (score >= abs(Z_THRESHOLD))
    )

    return score, candidate


# ============================================================
# SPATIAL CLUSTERING
# ============================================================

def clean_and_cluster(candidate):

    structure = (
        ndimage
        .generate_binary_structure(
            2,
            2
        )
    )

    cleaned = ndimage.binary_opening(
        candidate,
        structure=structure,
        iterations=OPENING_SIZE
    )

    cleaned = ndimage.binary_closing(
        cleaned,
        structure=structure,
        iterations=CLOSING_SIZE
    )

    labels, count = ndimage.label(
        cleaned,
        structure=structure
    )

    if count == 0:

        return (
            cleaned,
            0
        )

    sizes = np.bincount(
        labels.ravel()
    )

    keep = np.where(
        sizes >= MIN_COMPONENT_PIXELS
    )[0]

    keep = keep[
        keep != 0
    ]

    mask = np.isin(
        labels,
        keep
    )

    return (
        mask,
        len(keep)
    )


# ============================================================
# STRESS MAP
# ============================================================

def create_stress_visualization(
    rgb,
    score,
    stress_mask
):

    output = (
        rgb.astype(np.float32)
        * 0.45
    )

    valid = np.isfinite(score)

    if np.any(valid):

        values = score[valid]

        low = np.percentile(
            values,
            50
        )

        high = np.percentile(
            values,
            98
        )

        if high > low:

            normalized = (
                score - low
            ) / (
                high - low
            )

            normalized = np.clip(
                normalized,
                0,
                1
            )

            intensity = (
                normalized
                * 255
            )

            intensity[
                ~valid
            ] = 0

            # Brighten anomaly regions.
            output = np.maximum(
                output,
                intensity[..., None]
            )

    # Candidate stress clusters.
    output[
        stress_mask
    ] = [255, 40, 40]

    output[
        ~valid
    ] = 0

    return np.clip(
        output,
        0,
        255
    ).astype(np.uint8)


# ============================================================
# CLUSTER REPORT
# ============================================================

def create_cluster_report(
    stress_mask,
    score,
    indices
):

    structure = (
        ndimage
        .generate_binary_structure(
            2,
            2
        )
    )

    labels, count = ndimage.label(
        stress_mask,
        structure=structure
    )

    report = []

    # Pixel dimensions are approximately 10 m.
    pixel_area_m2 = (
        WIDTH_M / WIDTH
    ) * (
        HEIGHT_M / HEIGHT
    )

    for cluster_id in range(
        1,
        count + 1
    ):

        mask = (
            labels
            == cluster_id
        )

        ys, xs = np.where(mask)

        if not len(xs):
            continue

        cluster_score = (
            score[mask]
        )

        ndvi = (
            indices["NDVI"][mask]
        )

        ndre = (
            indices["NDRE"][mask]
        )

        evi = (
            indices["EVI"][mask]
        )

        ndmi = (
            indices["NDMI"][mask]
        )

        report.append(
            {
                "cluster_id": int(
                    cluster_id
                ),

                "pixels": int(
                    len(xs)
                ),

                "approx_area_m2": float(
                    len(xs)
                    * pixel_area_m2
                ),

                "approx_area_ha": float(
                    len(xs)
                    * pixel_area_m2
                    / 10_000
                ),

                "center_pixel_x": float(
                    np.mean(xs)
                ),

                "center_pixel_y": float(
                    np.mean(ys)
                ),

                "mean_stress_score": float(
                    np.nanmean(
                        cluster_score
                    )
                ),

                "mean_ndvi": float(
                    np.nanmean(ndvi)
                ),

                "mean_ndre": float(
                    np.nanmean(ndre)
                ),

                "mean_evi": float(
                    np.nanmean(evi)
                ),

                "mean_ndmi": float(
                    np.nanmean(ndmi)
                )
            }
        )

    report.sort(
        key=lambda x:
            x["mean_stress_score"],
        reverse=True
    )

    return report


# ============================================================
# MAIN
# ============================================================

def main():

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    print()
    print("=" * 65)
    print("SENTINEL-2 VEGETATION STRESS ANALYSIS")
    print("=" * 65)

    print(
        f"Center       : "
        f"{LAT:.5f}, {LON:.5f}"
    )

    print(
        f"BBOX         : "
        f"{BBOX[0]:.5f}, "
        f"{BBOX[1]:.5f}, "
        f"{BBOX[2]:.5f}, "
        f"{BBOX[3]:.5f}"
    )

    print(
        f"Time range   : "
        f"{START_DATE} -> {END_DATE}"
    )

    print(
        f"AOI size     : "
        f"{WIDTH_M:.0f} m x "
        f"{HEIGHT_M:.0f} m"
    )

    print(
        f"Output grid  : "
        f"{WIDTH} x {HEIGHT}"
    )

    print(
        f"Approx pixel : "
        f"{WIDTH_M / WIDTH:.2f} m x "
        f"{HEIGHT_M / HEIGHT:.2f} m"
    )

    print("=" * 65)
    print()

    # --------------------------------------------------------
    # AUTH
    # --------------------------------------------------------

    client_id, client_secret = (
        get_credentials()
    )

    token = get_access_token(
        client_id,
        client_secret
    )

    # --------------------------------------------------------
    # PROCESS API
    # --------------------------------------------------------

    tiff_bytes = (
        request_sentinel_data(
            token
        )
    )

    (
        OUTPUT_DIR
        / "raw_response.tif"
    ).write_bytes(
        tiff_bytes
    )

    # --------------------------------------------------------
    # READ
    # --------------------------------------------------------

    data = read_tiff(
        tiff_bytes
    )

    bands = extract_bands(
        data
    )

    # --------------------------------------------------------
    # INDICES
    # --------------------------------------------------------

    print(
        "[4/7] Calculating vegetation indices..."
    )

    indices = calculate_indices(
        bands
    )

    valid_mask = build_valid_mask(
        bands,
        indices
    )

    vegetation_mask = (
        valid_mask
        & (
            indices["NDVI"]
            >= VEGETATION_NDVI_MIN
        )
    )

    # --------------------------------------------------------
    # VISUAL OUTPUTS
    # --------------------------------------------------------

    print(
        "[5/7] Creating imagery..."
    )

    rgb = create_rgb(
        bands,
        valid_mask
    )

    Image.fromarray(
        rgb,
        mode="RGB"
    ).save(
        OUTPUT_DIR
        / "rgb.png"
    )

    save_index_image(
        indices["NDVI"],
        valid_mask,
        OUTPUT_DIR
        / "ndvi.png"
    )

    save_index_image(
        indices["NDRE"],
        valid_mask,
        OUTPUT_DIR
        / "ndre.png"
    )

    # --------------------------------------------------------
    # STRESS
    # --------------------------------------------------------

    print(
        "[6/7] Detecting anomalous vegetation..."
    )

    stress_score, candidate = (
        create_stress_score(
            indices,
            valid_mask
        )
    )

    stress_mask, cluster_count = (
        clean_and_cluster(
            candidate
        )
    )

    stress_image = (
        create_stress_visualization(
            rgb,
            stress_score,
            stress_mask
        )
    )

    Image.fromarray(
        stress_image,
        mode="RGB"
    ).save(
        OUTPUT_DIR
        / "stress.png"
    )

    Image.fromarray(
        np.where(
            stress_mask,
            255,
            0
        ).astype(np.uint8),
        mode="L"
    ).save(
        OUTPUT_DIR
        / "stress_mask.png"
    )

    # --------------------------------------------------------
    # REPORT
    # --------------------------------------------------------

    report = create_cluster_report(
        stress_mask,
        stress_score,
        indices
    )

    # --------------------------------------------------------
    # SAVE NUMERICAL DATA
    # --------------------------------------------------------

    np.savez_compressed(

        OUTPUT_DIR
        / "bands.npz",

        B02=bands["B02"],
        B03=bands["B03"],
        B04=bands["B04"],
        B05=bands["B05"],
        B06=bands["B06"],
        B07=bands["B07"],
        B08=bands["B08"],
        B8A=bands["B8A"],
        B11=bands["B11"],
        B12=bands["B12"],
        SCL=bands["SCL"],

        NDVI=indices["NDVI"],
        NDRE=indices["NDRE"],
        EVI=indices["EVI"],
        NDMI=indices["NDMI"],
        NBR=indices["NBR"],

        valid_mask=valid_mask,
        vegetation_mask=vegetation_mask,

        stress_score=stress_score,
        stress_mask=stress_mask
    )

    # --------------------------------------------------------
    # METADATA
    # --------------------------------------------------------

    metadata = {

        "center": {
            "latitude": LAT,
            "longitude": LON
        },

        "bbox": BBOX,

        "source": "Sentinel-2 L2A",

        "time_range": {
            "from": START_DATE,
            "to": END_DATE
        },

        "mosaicking_order": "leastCC",

        "output": {
            "width": WIDTH,
            "height": HEIGHT,
            "target_resolution_m": (
                TARGET_RESOLUTION_M
            ),
            "approx_width_m": WIDTH_M,
            "approx_height_m": HEIGHT_M
        },

        "thresholds": {
            "vegetation_ndvi_min": (
                VEGETATION_NDVI_MIN
            ),
            "z_threshold": Z_THRESHOLD,
            "minimum_component_pixels": (
                MIN_COMPONENT_PIXELS
            )
        },

        "candidate_cluster_count": (
            cluster_count
        )
    }

    (
        OUTPUT_DIR
        / "metadata.json"
    ).write_text(
        json.dumps(
            metadata,
            indent=2
        ),
        encoding="utf-8"
    )

    # --------------------------------------------------------
    # SUMMARY
    # --------------------------------------------------------

    vegetation_ndvi = (
        indices["NDVI"]
        [vegetation_mask]
    )

    vegetation_ndre = (
        indices["NDRE"]
        [vegetation_mask]
    )

    summary = {

        "vegetation_pixel_count":
            int(
                vegetation_mask.sum()
            ),

        "stress_pixel_count":
            int(
                stress_mask.sum()
            ),

        "stress_pixel_fraction":
            float(
                stress_mask.sum()
            )
            / max(
                int(
                    vegetation_mask.sum()
                ),
                1
            ),

        "mean_ndvi":
            (
                float(
                    np.nanmean(
                        vegetation_ndvi
                    )
                )
                if vegetation_ndvi.size
                else None
            ),

        "median_ndvi":
            (
                float(
                    np.nanmedian(
                        vegetation_ndvi
                    )
                )
                if vegetation_ndvi.size
                else None
            ),

        "mean_ndre":
            (
                float(
                    np.nanmean(
                        vegetation_ndre
                    )
                )
                if vegetation_ndre.size
                else None
            ),

        "candidate_clusters":
            cluster_count,

        "clusters":
            report
    }

    (
        OUTPUT_DIR
        / "analysis_summary.json"
    ).write_text(
        json.dumps(
            summary,
            indent=2
        ),
        encoding="utf-8"
    )

    # --------------------------------------------------------
    # FINISHED
    # --------------------------------------------------------

    print()
    print("=" * 65)
    print("ANALYSIS COMPLETE")
    print("=" * 65)

    print(
        f"Vegetation pixels : "
        f"{summary['vegetation_pixel_count']}"
    )

    print(
        f"Stress pixels     : "
        f"{summary['stress_pixel_count']}"
    )

    print(
        f"Stress fraction   : "
        f"{summary['stress_pixel_fraction']:.3%}"
    )

    print(
        f"Candidate clusters: "
        f"{cluster_count}"
    )

    if summary["mean_ndvi"] is not None:

        print(
            f"Mean NDVI         : "
            f"{summary['mean_ndvi']:.4f}"
        )

    if summary["mean_ndre"] is not None:

        print(
            f"Mean NDRE         : "
            f"{summary['mean_ndre']:.4f}"
        )

    print()
    print(
        "Output directory:"
    )
    print(
        OUTPUT_DIR.resolve()
    )

    print()
    print("Generated:")

    print("  rgb.png")
    print("  ndvi.png")
    print("  ndre.png")
    print("  stress.png")
    print("  stress_mask.png")
    print("  bands.npz")
    print("  metadata.json")
    print("  analysis_summary.json")
    print()
    print(
        "NOTE: stress regions are spectral anomalies, "
        "not disease diagnoses."
    )


# ============================================================
# ENTRY POINT
# ============================================================

if __name__ == "__main__":

    try:

        main()

    except KeyboardInterrupt:

        print("\nInterrupted.")
        sys.exit(130)

    except Exception as exc:

        print()
        print("ERROR:")
        print(exc)

        sys.exit(1)