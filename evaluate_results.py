import json
import os

with open('results/ergot1_qwen_v3_raw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

diff = data.get('differential', {})
top_candidate = diff.get('top_candidate', '').lower()
runner_up = diff.get('runner_up', '').lower()
score_margin = diff.get('score_margin', 0.0)

comp = data.get('candidate_comparison', {})
ergot_score = comp.get('ergot', {}).get('compatibility_score', 0.0)
smut_score = comp.get('smut', {}).get('compatibility_score', 0.0)

requires_second_stage = data.get('requires_second_stage_visual_comparison', False)
final_decision = data.get('final_decision', {})
abstain = final_decision.get('abstain', False)

is_correct = (top_candidate == 'ergot')

# Get evidence details
evidence = data.get('evidence', {})
present_features = evidence.get('present', [])
uncertain_features = evidence.get('uncertain', [])
absent_features = evidence.get('absent', [])

# Formulate evaluation
evaluation = {
    "evaluation_metrics": {
        "is_correct": is_correct,
        "top_candidate": top_candidate,
        "runner_up": runner_up,
        "score_margin": score_margin,
        "ergot_compatibility_score": ergot_score,
        "smut_compatibility_score": smut_score,
        "requires_second_stage_comparison": requires_second_stage,
        "abstained": abstain
    },
    "phenotype_analysis": {
        "decisive_observations": present_features,
        "uncertain_observations": uncertain_features,
        "failed_v3_questions": ["Determining internal structure (sclerotium) vs outwardly projecting structure was uncertain.", "Questions assuming leaf visibility failed due to 'not_visible'"],
        "useful_v3_questions": ["Questions on distinct location of abnormality (occupying grain position) were very useful", "Questions on powdery material / sticky exudate helped rule out other candidates"],
        "error_classification": "none" if is_correct else "phenotype interpretation error"
    }
}

os.makedirs('results', exist_ok=True)
with open('results/ergot1_qwen_v3_evaluation.json', 'w', encoding='utf-8') as f:
    json.dump(evaluation, f, indent=2)

report = f"""# Pearl Millet V3 Evaluation Report

## 1. Top-Level Metrics
- **Correct Prediction (Ergot)?**: {is_correct}
- **Top Candidate**: {top_candidate}
- **Runner-Up**: {runner_up}
- **Score Margin**: {score_margin}
- **Ergot Compatibility Score**: {ergot_score}
- **Smut Compatibility Score**: {smut_score}
- **Requested Second-Stage Comparison**: {requires_second_stage}
- **Abstained**: {abstain}

## 2. Evidence & Observations
### Decisive Observations (Present)
{chr(10).join(['- ' + item for item in present_features])}

### Uncertain Observations
{chr(10).join(['- ' + item for item in uncertain_features])}

## 3. Question Block Analysis
### Useful v3 Questions
- Identifying if abnormality replaces grain/floret
- Determining color and shape of abnormal structures

### Failed / Problematic v3 Questions
- Microscopic structures/sclerotial features (cannot be determined reliably from macroscopic image)
- Questions concerning leaves when only the panicle is visible

## 4. Error Analysis
- **Classification**: {"None - Correct Prediction" if is_correct else "Phenotype Interpretation Error or Insufficient Evidence"}
"""

with open('results/ergot1_qwen_v3_report.md', 'w', encoding='utf-8') as f:
    f.write(report)
print("Evaluation complete.")
