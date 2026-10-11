import os
import json
import base64
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
        # Aggressive minify
        text = re.sub(r'#{1,6}\s*', '', text) # remove headers
        text = re.sub(r'\n\s*\n', '\n', text)
        text = text.replace("    ", " ")
        text = text.replace("============================================================", "")
        text = text.replace("---", "")
        text = text.replace("**", "")
        text = text.replace("  ", " ")
        phenotypes_text += f"\n{f.replace('Pearl_Millet_','')}\n" + text + "\n"

# Question Block v3 (Step 1)
with open('run_batch_experiment.py', 'r', encoding='utf-8') as f:
    code = f.read()
    import re
    qblock = re.search(r'question_block = """(.*?)"""\n\ninstruction_step1', code, re.DOTALL).group(1)
    instruction_step1 = re.search(r'instruction_step1 = f"""(.*?)"""\n\ninstruction_step2_template', code, re.DOTALL).group(1)
    instruction_step1 = instruction_step1.replace("{question_block}", qblock)

instruction_step2_template = """You are evaluating a Pearl Millet observation.
Features: {phenotype_json}
Phenotypes: {phenotypes_text}
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

images = [
    ("leaf spot.webp", "leaf_spots"),
    ("smut 1.jpe", "smut"),
    ("smut2.jpe", "smut")
]

images_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\cropshield-ai\wiki\agriculture\Pearl Millet"
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
                import re as r
                m = r.search(r'try again in (\d+\.?\d*)s', err_text)
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

for img_name, label in images:
    out_file = os.path.join(out_dir, img_name + ".json")
    
    print(f"\nProcessing {img_name}...")
    img_path = os.path.join(images_dir, img_name)
    with open(img_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    mime = "image/webp" if img_name.endswith(".webp") else "image/jpeg"
    
    payload1 = {
        "model": "qwen/qwen3.8-27b",
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": instruction_step1},
                {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{encoded_string}"}}
            ]
        }],
        "response_format": {"type": "json_object"},
        "temperature": 0.0,
        "max_completion_tokens": 800
    }
    
    print("  [Step 1] Qwen Phenotype Extraction...")
    content1 = api_call_with_retry(payload1)
    if not content1:
        continue
        
    try:
        step1_json = json.loads(content1)
        if "evidence_quality" in step1_json:
            del step1_json["evidence_quality"]
        if "sample_observation" in step1_json:
            del step1_json["sample_observation"]
        phenotype_str = json.dumps(step1_json, separators=(',', ':'))
    except Exception as e:
        print("  Error parsing step1 JSON:", e)
        continue
        
    instruction2 = instruction_step2_template.format(
        phenotype_json=phenotype_str,
        phenotypes_text=phenotypes_text[:14000]
    )
    
    payload2 = {
        "model": "openai/gpt-oss-120b",
        "messages": [{"role": "user", "content": instruction2}],
        "response_format": {"type": "json_object"},
        "temperature": 0.0,
        "max_completion_tokens": 1400
    }
    
    print("  [Step 2] GPT-OSS Candidate Comparison...")
    content2 = api_call_with_retry(payload2)
    if not content2:
        continue
        
    try:
        final_output = json.loads(content2)
        final_output["ground_truth"] = label
        final_output["sample_observation"] = step1_json.get("sample_observation", {})
        final_output["evidence"] = step1_json.get("evidence", {})
        
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(final_output, f, indent=2)
        print(f"  Successfully saved {out_file}")
    except Exception as e:
        print("  Error combining final JSON:", e)
        print("Raw content:", content2)

print("\nRecovery batch complete.")
