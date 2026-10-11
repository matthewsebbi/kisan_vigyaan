import os
import json
import base64
import requests

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
        phenotypes_text += fh.read() + "\n\n"

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

Return:

{
  "evidence_quality": {
    "overall": "high|medium|low",
    "limiting_features": []
  }
}


============================================================
FINAL OUTPUT REQUIREMENT
============================================================

The output must contain:

1. observed phenotype
2. evidence:
   - present
   - absent
   - uncertain
   - not_visible
3. differential evidence for ALL six candidates
4. evidence quality
5. diagnostic bottleneck
6. whether second-stage visual comparison is necessary

Do NOT diagnose during the observation stage.

Do NOT use the filename or supplied ground-truth label.

Do NOT assume that a feature is absent merely because it is not visible.

NOT_VISIBLE and ABSENT are different.

After phenotype extraction, perform the cumulative candidate comparison
using ALL six candidate phenotypes simultaneously.

Candidate set:

- Blast
- Downy Mildew / Green Ear
- Ergot
- Smut
- Rust
- Leaf Spots

If the leading candidates remain too close, identify the top two
candidates and mark:

"requires_second_stage_visual_comparison": true

If the evidence remains insufficient after the second-stage comparison,
the final state should be:

"ABSTAIN"

rather than forcing a disease prediction.

RETURN JSON WITH THE FOLLOWING STRUCTURE:
{
  "experiment": {
    "sample_id": "ergot1.jpg",
    "model": "openai/gpt-oss-120b",
    "question_block": "v3"
  },

  "sample_observation": {
    "plant_part": {},
    "symptom_class": {},
    "geometry": {},
    "surface": {},
    "texture": {},
    "color": {},
    "distribution": {},
    "spatial_location": {},
    "reproductive_structure": {},
    "developmental_stage": {}
  },

  "evidence": {
    "present": [],
    "absent": [],
    "uncertain": [],
    "not_visible": []
  },

  "candidate_comparison": {
    "blast": {
      "supported_features": [],
      "contradictory_features": [],
      "unknown_features": [],
      "compatibility_score": 0.0
    },
    "downy_mildew_green_ear": {
      "supported_features": [],
      "contradictory_features": [],
      "unknown_features": [],
      "compatibility_score": 0.0
    },
    "ergot": {
      "supported_features": [],
      "contradictory_features": [],
      "unknown_features": [],
      "compatibility_score": 0.0
    },
    "smut": {
      "supported_features": [],
      "contradictory_features": [],
      "unknown_features": [],
      "compatibility_score": 0.0
    },
    "rust": {
      "supported_features": [],
      "contradictory_features": [],
      "unknown_features": [],
      "compatibility_score": 0.0
    },
    "leaf_spots": {
      "supported_features": [],
      "contradictory_features": [],
      "unknown_features": [],
      "compatibility_score": 0.0
    }
  },

  "differential": {
    "top_candidate": "",
    "runner_up": "",
    "score_margin": 0.0
  },

  "evidence_quality": {
    "overall": "",
    "limiting_features": []
  },

  "diagnostic_bottleneck": "",

  "requires_second_stage_visual_comparison": false,

  "final_decision": {
    "diagnosis": "",
    "abstain": false,
    "reason": ""
  }
}
"""

instruction = f"""{question_block}

---
CANDIDATE PHENOTYPES KNOWLEDGE BASE:

{phenotypes_text}
"""

image_path = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\cropshield-ai\wiki\agriculture\Pearl Millet\ergot.jpe"

with open(image_path, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

payload = {
    "model": "openai/gpt-oss-120b",
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": instruction
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{encoded_string}"
                    }
                }
            ]
        }
    ],
    "response_format": {"type": "json_object"},
    "temperature": 0.0
}

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

print("Sending request to Groq API with openai/gpt-oss-120b...")
response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
print(f"Status Code: {response.status_code}")
if response.status_code != 200:
    print("Error:", response.text)
else:
    try:
        content = response.json()['choices'][0]['message']['content']
        os.makedirs('results', exist_ok=True)
        with open('results/ergot1_qwen_v3_raw.json', 'w') as f:
            f.write(content)
        print("Successfully saved raw JSON to results/ergot1_qwen_v3_raw.json")
    except Exception as e:
        print("Failed to parse response:", e)
        print("Raw response:", response.text)
