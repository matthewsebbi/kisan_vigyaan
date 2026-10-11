import os
import json
import base64
import requests
import time
import re
import csv
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("GROQ_API_KEY", "")

# Phenotypes
phenotypes_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\Pearl_Millet_Phenotype_V2\Pearl_Millet_Phenotype_V2"
files = [
    "Pearl_Millet_Blast.md",
    "Pearl_Millet_Downy_Mildew_Green_Ear.md",
    "Pearl_Millet_Ergot.md",
    "Pearl_Millet_Leaf_Spots.md",
    "Pearl_Millet_Rust.md",
    "Pearl_Millet_Smut.md"
]
phenotypes_text = ""
for f in files:
    with open(os.path.join(phenotypes_dir, f), 'r', encoding='utf-8') as fh:
        text = fh.read()
        
        # Extract hallmarks
        hallmark_match = re.search(r'## Hallmark Features(.*?)## 2', text, re.DOTALL)
        hallmarks = hallmark_match.group(1).strip() if hallmark_match else ""
        
        # Extract evidence weighting
        weighting_match = re.search(r'## Evidence Weighting(.*?)## 3', text, re.DOTALL)
        weighting = weighting_match.group(1).strip() if weighting_match else ""
        
        # Extract machine comparison
        machine_match = re.search(r'## Machine-Comparison Notes(.*?)```yaml(.*?)```', text, re.DOTALL)
        machine = machine_match.group(2).strip() if machine_match else ""
        
        compressed = f"--- {f.replace('Pearl_Millet_','').replace('.md','')} ---\n"
        compressed += f"Hallmarks:\n{hallmarks}\n\n"
        compressed += f"Evidence Weighting:\n{weighting}\n\n"
        compressed += f"Machine Notes:\n{machine}\n\n"
        
        phenotypes_text += compressed

instruction_step2_template = """You are continuing the evaluation of a Pearl Millet visual phenotype observation experiment.

Extracted features:
{phenotype_json}

Using ALL SIX candidate phenotypes below, perform the cumulative candidate comparison.

CANDIDATE PHENOTYPES KNOWLEDGE BASE:
{phenotypes_text}

FINAL OUTPUT REQUIREMENT FOR STEP 2:
Compare observed phenotype with candidate phenotypes.
Candidate set: Blast, Downy Mildew / Green Ear, Ergot, Smut, Rust, Leaf Spots

If leading candidates remain too close, identify top two candidates and mark "requires_second_stage_visual_comparison": true.
If evidence remains insufficient after second-stage comparison, final state should be "ABSTAIN".

RETURN JSON WITH THE FOLLOWING EXACT STRUCTURE:
{{
  "experiment": {{
    "sample_id": "{image_name}",
    "model": "qwen+gpt-oss-120b",
    "question_block": "v3"
  }},
  "candidate_comparison": {{
    "blast": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "downy_mildew_green_ear": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "ergot": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "smut": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "rust": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}},
    "leaf_spots": {{"supported_features": [],"contradictory_features": [],"unknown_features": [],"compatibility_score": 0.0}}
  }},
  "differential": {{"top_candidate": "","runner_up": "","score_margin": 0.0}},
  "diagnostic_bottleneck": "",
  "requires_second_stage_visual_comparison": false,
  "final_decision": {{"diagnosis": "","abstain": false,"reason": ""}}
}}
CRITICAL: TO SAVE OUTPUT TOKENS, YOU MUST LEAVE ALL ARRAYS ("supported_features", "contradictory_features", "unknown_features") COMPLETELY EMPTY [] IN YOUR OUTPUT JSON. ONLY FILL IN THE SCORES AND THE DIFFERENTIAL/FINAL_DECISION FIELDS.
"""

images = []
manifest_path = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\pearl_millet_unseen_v1_12_images\GROUND_TRUTH_MANIFEST_DO_NOT_UPLOAD.csv"
with open(manifest_path, 'r', encoding='utf-8') as mf:
    reader = csv.DictReader(mf)
    for row in reader:
        gt = row["ground_truth"].lower()
        if gt == "downy_mildew":
            gt = "downy_mildew_green_ear"
        images.append((row["filename"], gt))

in_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\results\pearl_millet_unseen_v1_raw"
out_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\results\pearl_millet_unseen_v1_gpt_raw"
os.makedirs(out_dir, exist_ok=True)

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

def api_call_with_retry(payload, url="https://api.groq.com/openai/v1/chat/completions"):
    retries = 0
    while True:
        resp = requests.post(url, headers=headers, json=payload)
        if resp.status_code == 200:
            return resp.json()['choices'][0]['message']['content']
        elif resp.status_code == 429: # rate limit
            try:
                err_text = resp.json().get('error', {}).get('message', '')
                print(f"429 Rate Limit: {err_text}")
                import re as r
                m = r.search(r'try again in (\d+\.?\d*)s', err_text)
                if m:
                    wait_time = float(m.group(1)) + 1
                    print(f"Rate limited. Waiting {wait_time}s...")
                    time.sleep(wait_time)
                else:
                    print("Hard rate limit hit or unexpected 429 format. Returning ERROR_429.")
                    return "ERROR_429"
            except:
                print("Rate limited. Waiting 60s...")
                time.sleep(60)
        elif resp.status_code == 400:
            retries += 1
            if retries > 3:
                print(f"Error 400 multiple times. Skipping. {resp.text}")
                return None
            print(f"Error 400 (JSON formatting issue), retrying {retries}/3...")
            time.sleep(2)
        elif resp.status_code == 413:
            print(f"Error 413: {resp.text}")
            return "ERROR_413"
        else:
            print(f"Error {resp.status_code}: {resp.text}")
            return None

for img_name, label in images:
    out_file = os.path.join(out_dir, img_name + ".json")
    if os.path.exists(out_file):
        print(f"Skipping {img_name}, already processed.")
        continue
    
    print(f"\nProcessing {img_name}...")
    
    in_file = os.path.join(in_dir, img_name + ".json")
    if not os.path.exists(in_file):
        print(f"  Missing input JSON: {in_file}")
        continue
        
    with open(in_file, 'r', encoding='utf-8') as f:
        prev_data = json.load(f)
        
    # Reconstruct the phenotype JSON to pass to Step 2
    step1_json = {
        "sample_observation": prev_data.get("sample_observation", {}),
        "evidence": prev_data.get("evidence", {})
    }
    phenotype_str = json.dumps(step1_json, separators=(',', ':'))
    
    instruction2 = instruction_step2_template.format(
        phenotype_json=phenotype_str,
        phenotypes_text=phenotypes_text,
        image_name=img_name
    )
    
    payload2 = {
        "model": "openai/gpt-oss-120b",
        "messages": [{"role": "user", "content": instruction2}],
        "response_format": {"type": "json_object"},
        "temperature": 0.0,
        "max_completion_tokens": 900
    }
    
    print("  [Step 2] GPT-OSS-120B Candidate Comparison...")
    content2 = api_call_with_retry(payload2)
    
    if content2 == "ERROR_413":
        print("  Attempting with further truncated prompt...")
        # Extreme truncation if 413 still happens, keep json intact
        instruction2 = instruction_step2_template.format(
            phenotype_json=phenotype_str,
            phenotypes_text=phenotypes_text[:12000],
            image_name=img_name
        )
        payload2["messages"][0]["content"] = instruction2
        content2 = api_call_with_retry(payload2)

    if not content2 or content2 == "ERROR_413":
        continue
        
    try:
        final_output = json.loads(content2)
        final_output["ground_truth"] = label
        final_output["sample_observation"] = step1_json.get("sample_observation", {})
        final_output["evidence"] = step1_json.get("evidence", {})
        final_output["evidence_quality"] = prev_data.get("evidence_quality", {})
        
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(final_output, f, indent=2)
        print(f"  Successfully saved {out_file}")
    except Exception as e:
        print("  Error combining final JSON:", e)

print("\nBatch processing complete.")
