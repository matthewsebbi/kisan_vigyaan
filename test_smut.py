import sys, os, base64
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "cropshield-ai"))
from backend.services.wiki_service import WikiService
from backend.services.diagnostic_service import DiagnosticService
from backend.services.qwen_client import QwenClient

wiki = WikiService()
crop = 'Pearl Millet'
cand = wiki.get_problem(crop, 'Pearl_Millet_Smut.md')
image_path = r'pearl_millet_unseen_v1_12_images\images\PMU_009.jpg'
with open(image_path, 'rb') as f:
    img_b64 = base64.b64encode(f.read()).decode('utf-8')

diag = DiagnosticService(wiki, None, QwenClient())
ref_path = wiki.find_reference_image(crop, cand)
ref_b64 = wiki.load_reference_image_base64(ref_path)
disease_name = cand.frontmatter.problem
pheno_text = diag._extract_relevant_phenotype(cand)

prompt = f"""Provide evaluation STRICTLY as a raw JSON object with this schema:
```json
{{
  "disease": "{disease_name}",
  "reference_image_used": true,
  "visual_match_score": 0,
  "phenotype_match_score": 0,
  "overall_score": 0,
  "confidence": 0.0,
  "matching_features": ["..."],
  "contradicting_features": ["..."],
  "observed_features": ["..."],
  "missing_expected_features": ["..."],
  "reasoning": "..."
}}
```
Candidate disease: {disease_name}
Documented phenotype:
{pheno_text}
"""

client = QwenClient()
try:
    raw = client.call_vision_comparison(img_b64, prompt, ref_b64, temperature=0.1, max_tokens=1500)
    print("--- RAW ---")
    print(raw)
    print("--- PARSED ---")
    print(diag._extract_json_block(raw))
except Exception as e:
    print("ERROR:", repr(e))
