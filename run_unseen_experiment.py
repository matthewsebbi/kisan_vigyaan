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

# Question Block v3 (Step 1)
question_block = """============================================================
PEARL MILLET — QUESTION BLOCK v3
============================================================

ROLE

You are a visual phenotype observer for Pearl Millet.

Your first task is to determine ONLY what is visually observable
in the sample image.

Do not infer the disease.

Do not convert an ambiguous observation into a definite observation.

For every feature, use exactly one of:

PRESENT
ABSENT
UNCERTAIN
NOT_VISIBLE

PRESENT:
The feature is visually supported.

ABSENT:
The relevant structure is visible and the feature is not present.

UNCERTAIN:
Some evidence exists, but the feature cannot be reliably determined.

NOT_VISIBLE:
The relevant region or structure cannot be adequately inspected.

Distinguish:
- direct visual observation
- inference
- unavailable evidence

Never treat color alone as disease-defining.

When morphology is more diagnostic than color, morphology takes priority.

When two candidate diseases share a feature, mark that feature as
NON_SPECIFIC rather than using it as strong diagnostic evidence.

Do not force every field to have a value.


============================================================
STAGE 1 — ESTABLISH THE AFFECTED STRUCTURE
============================================================

Q1. What plant structure is visible?
    - leaf_blade
    - leaf_sheath
    - stem
    - panicle
    - spikelet
    - floret
    - whole_plant
    - multiple_parts
    - uncertain

Q2. Where is the PRIMARY abnormality?

Q3. Is the abnormality primarily:
    - vegetative
    - reproductive
    - both
    - uncertain

Q4. Is the affected structure:
    - normal in overall form
    - locally damaged
    - malformed
    - replaced by another structure
    - uncertain

Q5. Is the affected plant part sufficiently visible
    to support morphological analysis?


============================================================
STAGE 2 — DETERMINE THE SYMPTOM STRUCTURE
============================================================

Q6. Is the abnormality:
    - discrete
    - continuous/diffuse
    - linear/streak-like
    - structural replacement
    - localized enlargement
    - exudation
    - uncertain

Q7. Is there a distinct lesion?

Q8. Is there a visible fungal/spore-associated structure?

Q9. Is the primary abnormality a change in:
    - color
    - tissue structure
    - surface structure
    - organ shape
    - reproductive structure
    - multiple
    - uncertain


============================================================
LEAF BRANCH
Activate only when the primary affected part is a leaf.
============================================================

4A. SURFACE MORPHOLOGY

Q10. Is the affected feature visibly raised above the surrounding
    leaf surface?

Q11. Is the raised feature:
     - pustular
     - smooth
     - irregular
     - uncertain

Q12. Is powdery material visible?

Q13. Is an exposed spore mass visible?

Q14. Is the affected area visibly flat and within the leaf tissue?

Q15. Is the affected tissue dry/papery/necrotic?


4B. LEAF LESION GEOMETRY

Q16. Are distinct lesions present?

Q17. What is their primary shape?
     - circular
     - oval
     - elliptical
     - spindle
     - diamond
     - oblong
     - rectangular
     - fusiform
     - irregular
     - linear
     - indeterminate

Q18. Are lesions elongated?

Q19. Are the ends:
     - rounded
     - pointed
     - tapered
     - blunt
     - indeterminate

Q20. Is the lesion wider near its center than at its ends?

Q21. Are multiple lesions beginning to coalesce?

Q22. Does lesion morphology appear to change progressively
     from small lesions to larger lesions?


4C. CENTER/MARGIN MORPHOLOGY

Q23. Is a distinct lesion center visible?

Q24. What is the center color?

Q25. Is a distinct margin visible?

Q26. What is the margin color?

Q27. Is there a chlorotic/yellow halo around the lesion?

Q28. Is the transition:
     - sharp
     - gradual
     - indeterminate


4D. LEAF DISTRIBUTION

Q29. How are lesions distributed?
     - isolated
     - scattered
     - clustered
     - dense
     - continuous
     - indeterminate

Q30. Are lesions concentrated near:
     - leaf tip
     - leaf margin
     - leaf base
     - mid-leaf
     - lower leaves
     - upper leaves
     - no clear concentration
     - not visible

Q31. Do lesions cross or ignore the veins?

Q32. Is there directional/longitudinal organization?


4E. CONDITIONAL LEAF DIFFERENTIAL

After Q10-Q32, DO NOT ask "is it Blast?"

Instead produce a differential evidence state:

{
  "leaf_differential": {
    "blast": {
      "supported_features": [],
      "contradictory_features": [],
      "unknown_features": []
    },
    "rust": {
      "supported_features": [],
      "contradictory_features": [],
      "unknown_features": []
    },
    "leaf_spots": {
      "supported_features": [],
      "contradictory_features": [],
      "unknown_features": []
    }
  }
}

Blast gets strong support from:
- necrotic lesion
- progressive enlargement
- spindle/diamond morphology when developed
- grayish center
- darker margin

Rust gets strong support from:
- raised
- powdery
- pustular
- spore mass

Leaf Spots gets support from:
- discrete foliar lesions
- flat dry necrosis
- variable morphology
- no strong Blast geometry
- no clear pustular surface

Do not use color alone as a decisive discriminator.


============================================================
PANICLE / FLORET BRANCH
Activate when the affected structure is reproductive.
============================================================

Q33. Is the panicle transformed into a leafy/vegetative structure?

Q34. Is the panicle broadly malformed, or are individual florets
     independently abnormal?

Q35. Are individual grains/florets visibly replaced or enlarged?

Q36. Are discrete abnormal structures present?

Q37. Do the abnormal structures project beyond their normal
     floret/grain position?


============================================================
ERGOT ↔ SMUT DIFFERENTIAL
============================================================

Q38. Does the abnormal structure occupy the position normally
     occupied by a grain/floret?

Q39. Relative to adjacent normal grains, is the abnormal structure:
     - approximately grain-shaped
     - rounded/ball-like
     - elongated
     - strongly elongated
     - indeterminate

Q40. Is the abnormal structure wider than,
     similar in width to,
     or narrower than adjacent normal grains?

Q41. Does it project outward from an individual floret?

Q42. Is the dominant geometry:
     - internally enlarged
     - outwardly projecting
     - both
     - indeterminate

Q43. Is a surrounding membrane visible?

Q44. Membrane status:
     - intact
     - rupturing
     - ruptured
     - not visible

Q45. Is a loose/exposed dark spore mass visible?

Q46. Is sticky or mucilaginous exudate visible?

Q47. Is the exudate:
     - clear
     - pinkish
     - brownish
     - other
     - indeterminate

Q48. Are elongated dark structures projecting from florets?

Q49. Can the abnormal structure be directly compared with adjacent
     normal grain size and shape?


============================================================
DOWNY MILDEW BRANCH
============================================================

Q50. Is there diffuse or longitudinal chlorosis on the leaf?

Q51. Are multiple leaves affected?

Q52. Is the panicle transformed into leafy/vegetative tissue?

Q53. Are normal grains substantially absent?

Q54. Does the abnormal panicle resemble a green ear?

Q55. Is downy/velvety growth visible?


============================================================
COLOR BLOCK
============================================================

Q56. Identify the dominant visible colors.

Q57. Identify lesion center color separately.

Q58. Identify lesion margin color separately.

Q59. Identify surrounding tissue color.

Q60. Are the colors affected by:
     - strong lighting
     - shadow
     - glare
     - white-balance distortion
     - compression
     - blur


============================================================
EXPLICIT NEGATIVE-EVIDENCE BLOCK
============================================================

Q61. Is a raised pustule visibly present?

Q62. Is powdery material visibly present?

Q63. Is a spindle/diamond lesion visibly present?

Q64. Is honeydew visibly present?

Q65. Is an elongated sclerotial structure visibly present?

Q66. Is a rounded smut/spore-ball structure visibly present?

Q67. Is green-ear transformation visibly present?

For all of Q61-Q67 use:
PRESENT
ABSENT
UNCERTAIN
NOT_VISIBLE


============================================================
EVIDENCE QUALITY
============================================================

Q68. Which observations are directly visible?

Q69. Which observations are inferred?

Q70. Which important diagnostic features are not visible?

Q71. Which feature would most improve the differential if another
     photograph were available?

Q72. Are there competing candidates that remain visually plausible?
"""

instruction_step1 = f"""{question_block}

---
FINAL OUTPUT REQUIREMENT FOR STEP 1:
You are to ONLY perform the phenotype extraction from the provided sample image. Do NOT diagnose the disease yet.

RETURN JSON WITH THE FOLLOWING EXACT STRUCTURE:
{{
  "sample_observation": {{
    "plant_part": {{}},
    "symptom_class": {{}},
    "geometry": {{}},
    "surface": {{}},
    "texture": {{}},
    "color": {{}},
    "distribution": {{}},
    "spatial_location": {{}},
    "reproductive_structure": {{}},
    "developmental_stage": {{}}
  }},
  "evidence": {{
    "present": [],
    "absent": [],
    "uncertain": [],
    "not_visible": []
  }},
  "evidence_quality": {{
    "overall": "",
    "limiting_features": []
  }}
}}
"""

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
    "model": "qwen+qwen-27b",
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
        # map ground truth names down to our expected set of keys if needed, but evaluate_batch.py can handle matching if they are normalized.
        # Downy_Mildew -> downy_mildew_green_ear
        gt = row["ground_truth"].lower()
        if gt == "downy_mildew":
            gt = "downy_mildew_green_ear"
        images.append((row["filename"], gt))

images_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\pearl_millet_unseen_v1_12_images\images"
out_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\results\pearl_millet_unseen_v1_raw"
os.makedirs(out_dir, exist_ok=True)

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
    if not content1 or content1 == "ERROR_413":
        continue
        
    try:
        step1_json = json.loads(content1)
        # minify step 1 output
        if "evidence_quality" in step1_json:
            del step1_json["evidence_quality"]
        phenotype_str = json.dumps(step1_json, separators=(',', ':'))
    except Exception as e:
        print("  Error parsing step1 JSON:", e)
        continue
        
    instruction2 = instruction_step2_template.format(
        phenotype_json=phenotype_str,
        phenotypes_text=phenotypes_text,
        image_name=img_name
    )
    
    payload2 = {
        "model": "qwen/qwen3.8-27b",
        "messages": [{"role": "user", "content": instruction2}],
        "response_format": {"type": "json_object"},
        "temperature": 0.0,
        "max_completion_tokens": 900
    }
    
    print("  [Step 2] Qwen-27B Candidate Comparison...")
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
        final_output["evidence_quality"] = step1_json.get("evidence_quality", {})
        
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(final_output, f, indent=2)
        print(f"  Successfully saved {out_file}")
    except Exception as e:
        print("  Error combining final JSON:", e)

print("\nBatch processing complete.")
