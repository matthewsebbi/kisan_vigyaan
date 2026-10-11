import os
import json
import base64
import requests
import time
import re
import csv
from dotenv import dotenv_values

# Load environment
env_vars = dotenv_values(".env")
api_key = env_vars.get("GEMINI_API_KEY", "").strip()
if not api_key:
    from dotenv import load_dotenv
    load_dotenv(r"cropshield-ai\.env")
    api_key = os.getenv("GEMINI_API_KEY", "").strip()

print(f"Using GEMINI_API_KEY: {api_key[:8]}...{api_key[-4:] if len(api_key) > 12 else ''}")

MODEL_NAME = "gemini-3.1-flash-lite"
out_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\results\pearl_millet_unseen_gemini_3_1_flash_lite"
os.makedirs(out_dir, exist_ok=True)

# Load Phenotypes V3
phenotypes_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\Pearl_Millet_V3_Phenotype_Bank_V4_Question_Block\phenotypes_v3"
files = [
    "Pearl_Millet_Blast_v3.md",
    "Pearl_Millet_Downy_Mildew_Green_Ear_v3.md",
    "Pearl_Millet_Ergot_v3.md",
    "Pearl_Millet_Leaf_Spots_v3.md",
    "Pearl_Millet_Rust_v3.md",
    "Pearl_Millet_Smut_v3.md"
]
phenotypes_text = ""
for f in files:
    with open(os.path.join(phenotypes_dir, f), 'r', encoding='utf-8') as fh:
        text = fh.read()
        hallmark_match = re.search(r'## Hallmarks(.*?)## Contrastive evidence', text, re.DOTALL)
        if not hallmark_match:
            hallmark_match = re.search(r'## Hallmarks(.*?)##', text, re.DOTALL)
        hallmarks = hallmark_match.group(1).strip() if hallmark_match else ""

        weighting_match = re.search(r'## Evidence weighting(.*?)## Visibility and stage rules', text, re.DOTALL)
        weighting = weighting_match.group(1).strip() if weighting_match else ""

        machine_match = re.search(r'## Machine-comparison notes(.*?)```yaml(.*?)```', text, re.DOTALL)
        machine = machine_match.group(2).strip() if machine_match else ""

        compressed = f"--- {f.replace('Pearl_Millet_','').replace('_v3.md','')} ---\n"
        compressed += f"Hallmarks:\n{hallmarks}\n\n"
        compressed += f"Evidence Weighting:\n{weighting}\n\n"
        compressed += f"Machine Notes:\n{machine}\n\n"
        phenotypes_text += compressed

# Load Question Block V4
qb_path = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\Pearl_Millet_V3_Phenotype_Bank_V4_Question_Block\Pearl_Millet_V4_High_Precision_Question_Block.md"
with open(qb_path, 'r', encoding='utf-8') as f:
    question_block = f.read()

instruction_step1 = f"""{question_block}

Respond ONLY with valid JSON.
"""

instruction_step2_template = """You are a diagnostic reasoning engine for Pearl Millet diseases.
You will be provided with:
1. Structured botanical phenotype observation extracted from a field image.
2. Verified phenotype reference definitions for 6 candidate diseases.

=== EXTRACTED BOTANICAL PHENOTYPE ===
{phenotype_json}

=== CANDIDATE PHENOTYPE DEFINITIONS ===
{phenotypes_text}

=== INSTRUCTIONS ===
1. Review the diagnostic evidence from the observation. Note which structures are present, absent, or uncertain.
2. For each candidate disease, provide:
   - supported_features: list of observed features that strongly support this candidate.
   - contradictory_features: list of observed features that contradict this candidate.
   - unknown_features: features required by the candidate but marked UNCERTAIN/NOT_VISIBLE in observation.
   - compatibility_score: A float between 0.0 and 1.0 indicating how well the evidence matches the candidate.
3. Identify the `top_candidate`. If the highest score is shared or if the highest score is too weak (e.g. < 0.5) due to lack of distinct morphological evidence, set `top_candidate` to "abstain".
4. Output EXACTLY the following JSON format and nothing else.

=== OUTPUT JSON TEMPLATE ===
{{
  "experiment": {{
    "sample_id": "{image_name}",
    "model": "gemini-3.1-flash-lite",
    "question_block": "v4"
  }},
  "candidate_comparison": {{
    "blast": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "downy_mildew_green_ear": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "ergot": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "smut": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "rust": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "leaf_spots": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}}
  }},
  "differential": {{
    "top_candidate": "",
    "runner_up": "",
    "score_margin": 0.0
  }}
}}
"""

manifest_file = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\pearl_millet_unseen_v1_12_images\GROUND_TRUTH_MANIFEST_DO_NOT_UPLOAD.csv"
images = []
with open(manifest_file, 'r', encoding='utf-8') as mf:
    reader = csv.DictReader(mf)
    for row in reader:
        gt = row["ground_truth"].lower()
        if gt == "downy_mildew":
            gt = "downy_mildew_green_ear"
        elif gt == "leaf_spots":
            gt = "leaf_spots"
        images.append((row["filename"], gt))

images_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\pearl_millet_unseen_v1_12_images\images"

def call_gemini(prompt: str, image_base64: str = None, mime_type: str = None, retries: int = 5) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    
    parts = [{"text": prompt}]
    if image_base64 and mime_type:
        parts.insert(0, {
            "inline_data": {
                "mime_type": mime_type,
                "data": image_base64
            }
        })
        
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.0
        }
    }
    
    for attempt in range(1, retries + 1):
        try:
            resp = requests.post(url, headers=headers, json=payload, timeout=60)
            if resp.status_code == 200:
                try:
                    return resp.json()["candidates"][0]["content"]["parts"][0]["text"]
                except Exception as e:
                    print("  Error parsing response content:", e)
                    return None
            elif resp.status_code == 429:
                wait_sec = 6
                try:
                    err_data = resp.json()
                    details = err_data.get("error", {}).get("details", [])
                    for d in details:
                        if "@type" in d and "RetryInfo" in d["@type"]:
                            wait_sec = int(float(d.get("retryDelay", "5s").rstrip("s"))) + 2
                except Exception:
                    pass
                print(f"  Rate limit 429 hit (attempt {attempt}/{retries}). Waiting {wait_sec}s...")
                time.sleep(wait_sec)
                continue
            else:
                print(f"  Error {resp.status_code}: {resp.text[:200]}")
                time.sleep(2)
        except Exception as e:
            print(f"  Network error (attempt {attempt}): {e}")
            time.sleep(2)
            
    return None

print(f"Starting {MODEL_NAME} benchmark on {len(images)} images...")
start_time = time.time()

for idx, (img_name, label) in enumerate(images, 1):
    out_file = os.path.join(out_dir, img_name + ".json")
    print(f"\n[{idx}/{len(images)}] Processing {img_name} (GT: {label})...")
    img_path = os.path.join(images_dir, img_name)
    with open(img_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    mime = "image/webp" if img_name.endswith(".webp") else "image/jpeg"
    
    # Step 1: Phenotype Extraction
    print("  -> Step 1: Phenotype Extraction...")
    content1 = call_gemini(instruction_step1, encoded_string, mime)
    if not content1:
        print("  FAILED Step 1!")
        continue
        
    try:
        step1_json = json.loads(content1)
        if "evidence_quality" in step1_json:
            del step1_json["evidence_quality"]
        phenotype_str = json.dumps(step1_json, separators=(',', ':'))
    except Exception as e:
        print("  JSON parse error on step 1:", e)
        continue
        
    # Rate limit friendly pause
    time.sleep(4.2)
    
    # Step 2: Diagnostic Reasoning
    instruction2 = instruction_step2_template.format(
        phenotype_json=phenotype_str,
        phenotypes_text=phenotypes_text,
        image_name=img_name
    )
    print("  -> Step 2: Candidate Comparison & Differential Reasoning...")
    content2 = call_gemini(instruction2)
    if not content2:
        print("  FAILED Step 2!")
        continue
        
    try:
        final_output = json.loads(content2)
        final_output["ground_truth"] = label
        final_output["sample_observation"] = step1_json.get("sample_observation", {})
        final_output["evidence"] = step1_json.get("evidence", {})
        
        top_cand = final_output.get("differential", {}).get("top_candidate", "")
        margin = final_output.get("differential", {}).get("score_margin", 0.0)
        is_match = "CORRECT" if top_cand.lower() == label.lower() else "INCORRECT"
        print(f"  Result: Predicted='{top_cand}' vs GT='{label}' [{is_match}, margin={margin:+.2f}]")
        
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(final_output, f, indent=2)
    except Exception as e:
        print("  Error parsing step 2 response:", e)
        
    time.sleep(4.2)

total_elapsed = time.time() - start_time
print(f"\n==========================================")
print(f"Benchmark processing completed in {total_elapsed:.1f} seconds.")
print(f"==========================================")
