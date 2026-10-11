import os
import json
import requests
import re

api_key = os.getenv("GROQ_API_KEY", "")

# Load phenotypes
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
        text = re.sub(r'\n\s*\n', '\n', text)
        text = text.replace("    ", " ")
        text = text.replace("============================================================", "")
        text = text.replace("---", "-")
        text = text.replace("  ", " ")
        phenotypes_text += f"\n- {f} -\n" + text + "\n"

# Load step 1
with open('results/ergot1_step1_phenotype.json', 'r') as f:
    phenotype_obj = json.load(f)
    phenotype_json = json.dumps(phenotype_obj, separators=(',', ':'))

instruction_step2 = f"""You are continuing the evaluation of a Pearl Millet visual phenotype observation experiment.

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
    "sample_id": "ergot1.jpg",
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
"""

payload2 = {
    "model": "openai/gpt-oss-120b",
    "messages": [
        {
            "role": "user",
            "content": instruction_step2
        }
    ],
    "response_format": {"type": "json_object"},
    "temperature": 0.0
}

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

print("=== STEP 2: Requesting GPT-OSS for Candidate Comparison ===")
response2 = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload2)

if response2.status_code != 200:
    print("Error in Step 2:", response2.text)
    exit(1)

content2 = response2.json()['choices'][0]['message']['content']
with open('results/ergot1_step2_comparison.json', 'w', encoding='utf-8') as f:
    f.write(content2)
print("Successfully saved Step 2 output.")

try:
    final_output = json.loads(content2)
    final_output["sample_observation"] = phenotype_obj.get("sample_observation", {})
    final_output["evidence"] = phenotype_obj.get("evidence", {})
    final_output["evidence_quality"] = phenotype_obj.get("evidence_quality", {})

    with open('results/ergot1_qwen_v3_raw.json', 'w', encoding='utf-8') as f:
        json.dump(final_output, f, indent=2)
    print("Successfully combined into results/ergot1_qwen_v3_raw.json")
except Exception as e:
    print("Error combining JSON:", e)
