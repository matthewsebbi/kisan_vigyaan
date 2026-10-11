# Gemini 3.7 Flash (Medium) — Comprehensive Evaluation & Benchmark Report

**Evaluation Date**: 2026-10-11  
**Evaluator**: Antigravity Vision Reasoning Engine (`gemini-3.7-flash`, medium thinking)  
**Phenotype Protocol**: Phenotype Bank V3 + High-Precision Question Block V4  
**Target Crop**: Pearl Millet (*Pennisetum glaucum*)  

---

## 1. Executive Summary

This evaluation tests **Gemini 3.7 Flash** directly across **all 25 benchmark images** comprising both:
1. **The 12 Unseen Holdout Field Images** (`pearl_millet_unseen_v1_12_images`)
2. **The 13 Existing Reference Wiki Images** (`cropshield-ai/wiki/agriculture/Pearl Millet`)

### Key Results Summary

| Benchmark Dataset | Samples | Correct Predictions | Top-1 Accuracy | Mean Score Margin |
| :--- | :---: | :---: | :---: | :---: |
| **Unseen Dataset (12 images)** | 12 | 11 | **91.7%** | **+0.63** |
| **Existing Dataset (13 images)** | 13 | 12 | **92.3%** | **+0.60** |
| **Combined Overall Benchmark** | **25** | **23** | **92.0%** | **+0.61** |

---

## 2. Multi-Model Benchmark Comparison

How Gemini 3.7 Flash compares against previous evaluations on the identical 12-image unseen test set:

| Model Architecture | Provider / Setup | Top-1 Accuracy (Unseen) | Mean Margin | Ergot / Smut Discrimination | Key Failure Modes |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Gemini 3.7 Flash** | **Antigravity (Multimodal)** | **91.7% (11/12)** | **+0.63** | **100% (5/5 Correct)** | Early rounded blast lesion (PMU_002) |
| **Gemini 3.1 Flash Lite** | Google API (Free Tier) | 83.3% (10/12) | +0.57 | 100% (5/5 Correct) | PMU_002 (blast) & PMU_007 (honeydew ergot) |
| **Qwen 3.8-27B (V4 Pipeline)** | Groq Vision | 75.0% (9/12) | +0.42 | 80% (4/5 Correct) | Grain vs floret boundary confusion |
| **Legacy Baseline (Single-Prompt)** | Cloud API | 41.7% (5/12) | -0.15 | 20% (Defaulted to Healthy) | False negative lesion detection |

---

## 3. Dataset 1: Unseen Test Set (12 Images) Breakdown

| Sample ID | Ground Truth | Gemini 3.7 Prediction | Runner-Up | Compatibility | Margin | Result | Diagnostic Feature Observed |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `PMU_001.jpg` | **Blast** | Blast | Leaf Spots | 0.95 vs 0.40 | +0.55 | ✅ **CORRECT** | Classic spindle/fusiform lesion with grey center and dark margin |
| `PMU_002.jpg` | **Blast** | Leaf Spots | Blast | 0.85 vs 0.55 | -0.30 | ❌ **MISCLASSIFIED** | Solitary rounded lesion with blunt ends favors generic leaf spot |
| `PMU_003.jpg` | **Downy Mildew** | Downy Mildew / Green Ear | Ergot | 0.98 vs 0.05 | +0.93 | ✅ **CORRECT** | Panicle phyllody / basal green ear transformation |
| `PMU_004.jpg` | **Downy Mildew** | Downy Mildew / Green Ear | Smut | 0.98 vs 0.05 | +0.93 | ✅ **CORRECT** | Total panicle proliferation into twisted leafy structures ('crazy top') |
| `PMU_005.jpg` | **Ergot** | Ergot | Smut | 0.98 vs 0.15 | +0.83 | ✅ **CORRECT** | Droplets of golden-amber viscous honeydew dripping from florets |
| `PMU_006.jpg` | **Ergot** | Ergot | Smut | 0.98 vs 0.18 | +0.80 | ✅ **CORRECT** | Prominent curved dark sclerotia projecting past spikelet glumes |
| `PMU_007.jpg` | **Ergot** | Ergot | Smut | 0.95 vs 0.20 | +0.75 | ✅ **CORRECT** | Sugary viscous exudate and crusting across infected panicle |
| `PMU_008.jpg` | **Smut** | Smut | Ergot | 0.95 vs 0.25 | +0.70 | ✅ **CORRECT** | Enlarged, plump, bright green immature sori in spikelet positions |
| `PMU_009.jpg` | **Smut** | Smut | Ergot | 0.98 vs 0.18 | +0.80 | ✅ **CORRECT** | Dark green to black swollen sori with ruptured peridia exposing teliospores |
| `PMU_010.jpg` | **Rust** | Rust | Leaf Spots | 0.98 vs 0.25 | +0.73 | ✅ **CORRECT** | Dense erumpent cinnamon-brown powdery pustules (uredinia) |
| `PMU_011.jpg` | **Rust** | Rust | Leaf Spots | 0.98 vs 0.20 | +0.78 | ✅ **CORRECT** | Raised powdery orange-brown pustules breaking leaf epidermis |
| `PMU_012.jpg` | **Leaf Spots** | Leaf Spots | Blast | 0.92 vs 0.45 | +0.47 | ✅ **CORRECT** | Coalescent irregular brown necrotic patches with diffuse chlorosis |

**Unseen Subtotal**: 11 / 12 (91.7%)

---

## 4. Dataset 2: Existing Reference Wiki Set (13 Images) Breakdown

| Sample ID | Ground Truth | Gemini 3.7 Prediction | Runner-Up | Compatibility | Margin | Result | Diagnostic Feature Observed |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `blast.jpg` | **Blast** | Blast | Leaf Spots | 0.90 vs 0.55 | +0.35 | ✅ **CORRECT** | Developing spindle lesion with tan center and dark border on leaf edge |
| `Downy mildew.jpe` | **Downy Mildew** | Downy Mildew / Green Ear | Ergot | 0.98 vs 0.05 | +0.93 | ✅ **CORRECT** | Lower panicle floret phyllody transformation into leafy ear |
| `ergot_1.jpe` | **Ergot** | Ergot | Smut | 0.95 vs 0.25 | +0.70 | ✅ **CORRECT** | Sugary honeydew exudate adhering to florets on spike |
| `ergot.jpe` | **Ergot** | Ergot | Smut | 0.98 vs 0.18 | +0.80 | ✅ **CORRECT** | Protruding elongated dark horn-like sclerotia from glumes |
| `ergot2.jpe` | **Ergot** | Ergot | Smut | 0.98 vs 0.15 | +0.83 | ✅ **CORRECT** | Amber liquid droplet exudation from infected florets |
| `ergot3.jpe` | **Ergot** | Ergot | Smut | 0.85 vs 0.20 | +0.65 | ✅ **CORRECT** | Mature dark sclerotia replacing caryopses across earhead |
| `rust.jpe` | **Rust** | Rust | Leaf Spots | 0.95 vs 0.35 | +0.60 | ✅ **CORRECT** | Groups of raised brownish uredinial pustules on foliar blade |
| `rust2.jpe` | **Rust** | Rust | Leaf Spots | 0.95 vs 0.30 | +0.65 | ✅ **CORRECT** | Erumpent powdery pustules erupting through foliar epidermis |
| `leaf spot.webp` | **Leaf Spots** | Leaf Spots | Blast | 0.95 vs 0.55 | +0.40 | ✅ **CORRECT** | Oval brown necrotic lesions with dark margins and chlorotic haloes |
| `leaf_spot.jpg` | **Leaf Spots** | Blast | Leaf Spots | 0.85 vs 0.70 | -0.15 | ❌ **MISCLASSIFIED** | Strongly defined fusiform spindle lesions with tan papery centers |
| `smut 1.jpe` | **Smut** | Smut | Ergot | 0.90 vs 0.30 | +0.60 | ✅ **CORRECT** | Scattered florets replaced by hypertrophied green/dark sori |
| `smut2.jpe` | **Smut** | Smut | Ergot | 0.98 vs 0.18 | +0.80 | ✅ **CORRECT** | Swollen green and black sori replacing grains |
| `smut3.jpe` | **Smut** | Smut | Ergot | 0.90 vs 0.25 | +0.65 | ✅ **CORRECT** | Darkened hypertrophied sori with prominent glumes on panicle |

**Existing Subtotal**: 12 / 13 (92.3%)

---

## 5. Confusion Matrix (Combined 25 Images)

| Ground Truth \ Prediction | Blast | Downy Mildew | Ergot | Smut | Rust | Leaf Spots | Class Recall |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Blast (3)** | **2** | 0 | 0 | 0 | 0 | 1 | **66.7%** |
| **Downy Mildew (3)** | 0 | **3** | 0 | 0 | 0 | 0 | **100.0%** |
| **Ergot (7)** | 0 | 0 | **7** | 0 | 0 | 0 | **100.0%** |
| **Smut (5)** | 0 | 0 | 0 | **5** | 0 | 0 | **100.0%** |
| **Rust (4)** | 0 | 0 | 0 | 0 | **4** | 0 | **100.0%** |
| **Leaf Spots (3)** | 1 | 0 | 0 | 0 | 0 | **2** | **66.7%** |
| **Precision** | **66.7%** | **100.0%** | **100.0%** | **100.0%** | **100.0%** | **66.7%** | **92.0% Overall** |

---

## 6. Key Takeaways & Technical Insights

1. **Zero Panicle Confusion**:
   - `Downy Mildew`, `Ergot`, and `Smut` achieved **100% precision and 100% recall** (15 / 15 correct).
   - Gemini 3.7 Flash flawlessly distinguished honeydew liquid droplets and solid sclerotia (`Ergot`) from swollen green/black sori (`Smut`) and leafy phyllody (`Downy Mildew`).
2. **Superior Decision Margins**:
   - The mean score margin of **+0.61** indicates decisive, high-confidence separations between the top diagnosis and the runner-up.
3. **The Foliar Boundary (Blast vs. Leaf Spot)**:
   - The only 2 discrepancies across the entire 25-image collection occurred at the borderline between early blast lesions and generic leaf spots (`PMU_002` and `leaf_spot.jpg`), which share necrotic papery centers and chlorotic halos.
