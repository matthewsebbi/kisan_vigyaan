# Kisan Vigyaan (CropShield AI) — Actual Local Technical Workflow

This document describes **strictly how the application currently operates in the codebase**, running locally on the user's computer with file-system storage, local in-memory/browser state, and on-demand APIs.

---

## 1. System Topology & Runtime Architecture

The entire stack runs **locally on the user's host machine**:

1. **Frontend App (`cropshield-ai/`)**:
   - Built on React 19 + Vite + Tailwind CSS.
   - Served locally via Vite (`http://localhost:5173`) or production Node runner (`node server.mjs`).
   - Acts as the primary UI for camera capture, polygon mapping (Leaflet.js), marketplace browsing, and advisory lookup.

2. **Backend Engine (`cropshield-ai/backend/`)**:
   - Python FastAPI server running locally (`uvicorn`, default `http://0.0.0.0:8000`).
   - Reads directly from local filesystem directory structures (`wiki/agriculture/` and `Agriculture_Wiki/`).

3. **Data Storage & State (No Remote DB / Local Filesystem & Client State)**:
   - **No PostgreSQL / No Remote Cloud Database**: Storage is purely local.
   - **Local Knowledge Base**: Hierarchical Markdown files organized by crop name (e.g., `wiki/agriculture/<crop>/<problem>.md`).
   - **Client-Side State**: React `AppContext.jsx` maintains user session, language preference (English, Hindi, Marathi), active farm profiles, cart items, simulated DBT subsidy balance, and mock Mandi bids in memory and browser storage.

---

## 2. Core Workflows (As Currently Implemented)

### Workflow A: Local Agriculture Wiki Lookup & Validation

```
[Farmer / UI]
      │
      ├─► GET /api/wiki/crops
      │         │
      │         ▼
      │   [WikiService (Python)]
      │         │ Reads directory: wiki/agriculture/ or Agriculture_Wiki/
      │         ▼
      ├◄── Returns list of available crop folders (e.g., ["Rice", "Wheat", "Cotton"])
      │
      └─► GET /api/wiki/crops/{crop}/problems/{problem}
                │
                ▼
          [WikiService]
                │ Parses YAML frontmatter + Markdown body from disk
                ▼
          Returns { symptoms, pathogen, chemical_controls, biological_controls }
```

1. **Local File Read**: When a farmer navigates to the advisory or crop section, the backend scans `wiki/agriculture/`.
2. **Parsing**: Frontmatter is extracted via Python regex/yaml, structured into `ProblemDetail` models, and returned to the UI.

---

### Workflow B: Multimodal Disease Diagnosis (`/api/diagnose` or `/predict`)

```
[Farmer / UI]
      │
      │ 1. Captures or uploads leaf image (Base64 data URL)
      │ 2. Selects crop (e.g., "Cotton") + optional GPS location
      │
      ▼ POST /api/diagnose
[FastAPI DiagnosticService]
      │
      ├──► Step 1: Environment Retrieval (EnvironmentService)
      │            Fetches live weather/humidity via Open-Meteo API / Agri-Env API
      │
      ├──► Step 2: Local Candidate Fetch (WikiService)
      │            Reads all markdown problem profiles for that crop from disk
      │
      ├──► Step 3: AI Multimodal Inference (QwenClient)
      │            Calls Groq API (or Alibaba / Ollama fallback) with:
      │            - User image Base64
      │            - Local candidate symptom profiles
      │            - Real-time weather context
      │
      ├──► Step 4: Differential Diagnosis & Match
      │            Calculates confidence score (60% visual + 40% phenotypic match)
      │            Extracts exact chemical treatments & dosage from the local profile
      │
      ▼
[Frontend UI]
Renders disease name, severity level, spray tank dosage, and predatory insect safety ratings.
```

---

### Workflow C: Satellite Farmland Crop Health Analysis (`/api/sentinel/analyze-field`)

```
[Farmer / UI]
      │
      │ 1. Draws boundary polygon on Leaflet map
      │ 2. Submits array of GPS coordinates: [{lat, lng}, ...]
      │
      ▼ POST /api/sentinel/analyze-field
[SentinelService (backend/services/sentinel_service.py)]
      │
      ├──► 1. Polygon Geometry Calculations (Shapely)
      │        Computes bounding box, metric area in m², acres, and gunthas
      │        Creates point-in-polygon raster mask at ~10m resolution
      │
      ├──► 2. Sentinel-2 Band Acquisition
      │        • Attempts Copernicus CDSE Process API call with evalscript
      │          fetching 11 bands (B02, B03, B04, B05, B06, B07, B08, B8A, B11, B12, SCL)
      │        • Fallback: If offline / no Copernicus credentials, triggers local calibrated
      │          multispectral synthesizer based on Maharashtra soil profiles
      │
      ├──► 3. Mathematical Vegetation Indices (NumPy)
      │        NDVI = (B08 - B04) / (B08 + B04)
      │        NDRE = (B8A - B05) / (B8A + B05)
      │        EVI  = 2.5 * (B08 - B04) / (B08 + 6*B04 - 7.5*B02 + 1)
      │        NDMI = (B08 - B11) / (B08 + B11)
      │
      ├──► 4. Unhealthy Spot Detection & Morphology (SciPy)
      │        - Identifies pixels below stress threshold (NDVI < 0.45 or farm mean - 0.14)
      │        - Cleans noise via ndimage.binary_opening
      │        - Clusters stress zones via ndimage.label
      │        - Assigns GPS centroids, severity (Severe/Moderate/Mild), and cause
      │
      ├──► 5. Dynamic Heatmap Generation (Pillow)
      │        Generates RGBA overlay image in memory:
      │        - Outside farm polygon = transparent
      │        - Stressed pixels = red/amber
      │        - Healthy vegetation = translucent green
      │        Converts directly to Base64 PNG string
      │
      ▼
[Frontend Leaflet Map]
Directly mounts the Base64 PNG image overlay on top of the farm polygon coordinates.
```

---

### Workflow D: Unified Farmer Marketplace & Advisory (Client-Side)

```
[Farmer / UI]
      │
      ├──► Browses Subsidized Fertilizers & Seeds
      │    - Data sourced from local JS data structures (marketplaceData.js)
      │    - DBT Subsidy Token generator runs client-side in AppContext
      │
      ├──► Direct Farmer Mandi Board
      │    - Harvest listings, moisture %, and MSP benchmarks managed in React state
      │
      ├──► Checkout & Invoice Generation
      │    - Simulates payment flow (UPI QR modal, RuPay, KCC, COD)
      │    - Generates and triggers printable GST tax invoice with DBT seal directly in browser
      │
      └──► Sprayer Tank Dilution Calculator
           - Runs mathematical formula in UI for 16L, 20L, and 200L tanks instantly
```

---

## 3. Summary of How Data Actually Moves

| Feature | Where Computation Happens | Where Data is Stored | External Network Calls Made |
| :--- | :--- | :--- | :--- |
| **Wiki Browsing** | Local FastAPI server (`wiki_service.py`) | Local `.md` files in `wiki/agriculture/` | None (100% offline) |
| **Crop Diagnosis** | Local server + LLM API | None (ephemeral request/response) | Groq API (or Alibaba) + Open-Meteo |
| **Farmland Sentinel Analysis** | Local server (`sentinel_service.py`) via NumPy/SciPy | In-memory during calculation; Base64 PNG returned | Copernicus CDSE API (with local offline fallback) |
| **Marketplace & Mandi** | Client browser (`AppContext.jsx`) | Browser memory / LocalStorage | None (standalone local simulation) |
| **Sprayer Tank Calculator** | Client browser (React component) | Client component state | None (100% offline) |
