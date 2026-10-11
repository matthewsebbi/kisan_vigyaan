import os
import json
import requests
import time
import re

api_key = os.getenv("GROQ_API_KEY", "")

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
        phenotypes_text += f"\n- {f} -\n" + text + "\n"

instruction_step2_template = """You are evaluating a Pearl Millet observation.
Extracted features: {phenotype_json}

Using ALL SIX candidate phenotypes below, perform the cumulative candidate comparison.
{phenotypes_text}

Output EXACT JSON:
{{
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
"""

broken_files = [
    "rust.jpe.json", "rust2.jpe.json", "leaf spot.webp.json", "smut 1.jpe.json",
    "smut2.jpe.json", "smut3.jpe.json", "ergot_1.jpe.json", "ergot2.jpe.json", "ergot3.jpe.json",
    "leaf_spot.jpg.json"
]

out_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\results\pearl_millet_v3_all_raw"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

def api_call_with_retry(payload, url="https://api.groq.com/openai/v1/chat/completions"):
    while True:
        resp = requests.post(url, headers=headers, json=payload)
        if resp.status_code == 200:
            return resp.json()['choices'][0]['message']['content']
        elif resp.status_code == 429: # rate limit
            try:
                err_text = resp.json().get('error', {}).get('message', '')
                m = re.search(r'try again in (\d+\.?\d*)s', err_text)
                if m:
                    wait_time = float(m.group(1)) + 1
                    print(f"Rate limited. Waiting {wait_time}s...")
                    time.sleep(wait_time)
                else:
                    time.sleep(60)
            except:
                time.sleep(60)
        else:
            print(f"Error {resp.status_code}: {resp.text}")
            return None

for broken_json in broken_files:
    file_path = os.path.join(out_dir, broken_json)
    if not os.path.exists(file_path):
        continue
        
    print(f"\nFixing {broken_json}...")
    with open(file_path, 'r', encoding='utf-8') as fh:
        try:
            data = json.load(fh)
        except json.JSONDecodeError:
            fh.seek(0)
            raw = fh.read()
            if "not_visible" in raw and "evidence_quality" not in raw:
                raw += "\n  }\n}"
            data = json.loads(raw)
            
    step1_json = {
        "sample_observation": data.get("sample_observation", {}),
        "evidence": data.get("evidence", {})
    }
    phenotype_str = json.dumps(step1_json, separators=(',', ':'))
    
    instruction2 = instruction_step2_template.format(
        phenotype_json=phenotype_str,
        phenotypes_text=phenotypes_text
    )
    
    payload2 = {
        "model": "llama-3.1-70b-versatile",
        "messages": [{"role": "user", "content": instruction2}],
        "response_format": {"type": "json_object"},
        "temperature": 0.0
    }
    
    print("  [Step 2] LLAMA-3.3 Candidate Comparison...")
    content2 = api_call_with_retry(payload2)
    if not content2:
        continue
        
    try:
        final_output = json.loads(content2)
        final_output["ground_truth"] = data.get("ground_truth", "")
        final_output["sample_observation"] = data.get("sample_observation", {})
        final_output["evidence"] = data.get("evidence", {})
        final_output["experiment"] = {
            "sample_id": broken_json.replace(".json", ""),
            "model": "qwen+llama-3.3-70b",
            "question_block": "v3"
        }
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(final_output, f, indent=2)
        print(f"  Successfully fixed {file_path}")
    except Exception as e:
        print("  Error combining final JSON:", e)

print("\nFix batch complete.")
