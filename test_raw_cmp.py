import sys, os, base64
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "cropshield-ai"))
from backend.services.wiki_service import WikiService
from backend.services.diagnostic_service import DiagnosticService
from backend.services.qwen_client import QwenClient

wiki = WikiService()
crop = 'Pearl Millet'
cand = wiki.get_problem(crop, 'Pearl_Millet_Ergot.md')
image_path = r'pearl_millet_unseen_v1_12_images\images\PMU_009.jpg'
with open(image_path, 'rb') as f:
    img_b64 = base64.b64encode(f.read()).decode('utf-8')

diag = DiagnosticService(wiki, None, QwenClient())
pheno_text = diag._extract_relevant_phenotype(cand)
ref_path = wiki.find_reference_image(crop, cand)
ref_b64 = wiki.load_reference_image_base64(ref_path)

disease_name = cand.frontmatter.problem
prompt = f"""You are an elite botanical vision analyst. Perform an independent comparative diagnosis between the USER CROP IMAGE and the provided REFERENCE IMAGE for '{disease_name}', using the documented disease phenotype as ground truth.

CANDIDATE DISEASE: {disease_name} ({crop})
REFERENCE IMAGE: Attached as the second image (visual reference representation of {disease_name}).

DOCUMENTED DISEASE PHENOTYPE:
{pheno_text}

COMPARISON INSTRUCTIONS:
1. Compare the user's crop image directly against the reference image (lesion shape, size, color, margins, center characteristics, texture, distribution, affected plant organ).
2. Compare the user's crop image against the documented phenotype criteria.
3. Determine numerical visual_match_score (0-100) based on visual resemblance to the reference image.
4. Determine numerical phenotype_match_score (0-100) based on symptom correspondence to documented phenotype.
5. Identify matching, contradicting, and missing expected features.

ANTI-HALLUCINATION RULES:
- Never describe features that cannot reasonably be observed in the images.
- Never treat the reference image as proof that the disease is present; evaluate phenotype consistency.
- Explicitly identify contradictions and missing expected features.
- Do not force a match. If evidence is weak or contradictory, assign a low score.

Provide your evaluation STRICTLY as a raw JSON object with this schema:
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
```"""

client = QwenClient()
try:
    res = client.call_vision_comparison(
        user_image_b64=img_b64,
        prompt=prompt,
        reference_image_b64=ref_b64,
        temperature=0.1,
        max_tokens=1500
    )
    print('--- RAW CMP ---')
    print(res)
    print('--- PARSED ---')
    print(diag._extract_json_block(res))
except Exception as e:
    print('EXCEPTION:', repr(e))
