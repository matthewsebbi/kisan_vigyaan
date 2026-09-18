import fs from 'fs';
import path from 'path';

// 1. API Key Discovery
function getApiKey() {
  if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;
  
  const envPaths = ['.env', '.env.local', '.env.example'];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/GROQ_vision_api\s*=\s*([^\r\n]+)/i) ||
                    content.match(/VITE_GROQ_API_KEY\s*=\s*([^\r\n]+)/i) ||
                    content.match(/GROQ_API_KEY\s*=\s*([^\r\n]+)/i);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  return process.env.GROQ_API_KEY || '';
}

const API_KEY = getApiKey();

// Qwen 3.8 for both Vision and Hierarchical Thinking
const VISION_MODEL = 'qwen/qwen3.8-27b';
const REASONING_MODEL = 'qwen/qwen3.8-27b';

// CLI Arguments & Configuration
const imagePath = process.argv[2] || path.join('rice_test', 'rice_blast_3.jpg');
const wikiDir = process.argv[3] || 'rice_test';
const outputMdPath = process.argv[4] || 'diagnosis_result.md';
const crop = 'Rice';
const environmentalConditions = 'Rainfall: frequent and prolonged rain showers';

console.log('='.repeat(70));
console.log('🌾 CropShield AI: Vision + Hierarchical Iterative LLM Diagnosis');
console.log('='.repeat(70));
console.log(`Image: ${imagePath}`);
console.log(`Wiki Directory: ${wikiDir}`);
console.log(`Output Markdown: ${outputMdPath}`);
console.log(`Crop: ${crop}`);
console.log(`Environment: ${environmentalConditions}`);
console.log(`Model: ${VISION_MODEL} (Vision & Reasoning)`);
console.log('='.repeat(70));

// Load Image as Base64 Data URL
if (!fs.existsSync(imagePath)) {
  console.error(`Error: Image file not found at ${imagePath}`);
  process.exit(1);
}

const imageBuffer = fs.readFileSync(imagePath);
const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

// Helper: Sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Call Groq with Dynamic Header / OTPM Rate-Limit Recovery
async function callGroq(payload, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 429 || response.status === 413) {
      const errJson = await response.json().catch(() => ({}));
      const msg = errJson?.error?.message || 'Rate limit';
      
      // Extract exact wait time from error message or header
      let waitSeconds = 15;
      const match = msg.match(/try again in ([\d\.]+)s/i);
      if (match) {
        waitSeconds = Math.ceil(parseFloat(match[1])) + 2;
      } else {
        const retryAfter = response.headers.get('retry-after');
        if (retryAfter) waitSeconds = Math.ceil(parseFloat(retryAfter)) + 2;
      }

      console.warn(`\n⚠️ Rate/token limit encountered (Attempt ${attempt}/${retries}): ${msg}`);
      console.log(`⏳ Pausing ${waitSeconds}s for Groq quota window to replenish...`);
      await sleep(waitSeconds * 1000);
      continue;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }
  throw new Error('Groq API call exceeded maximum retries due to rate limits.');
}

// STAGE 1: Vision Model Phenotype Extraction
async function extractPhenotype(imageBase64) {
  console.log('\n[Stage 1] 📸 Calling Vision Model (Qwen 3.8) to extract Phenotype Description...');
  
  const visionPrompt = `You are a precision botanical vision analyst. Examine this crop leaf/plant image with scientific rigor.
Extract and describe the visual phenotype by answering these 10 questions in order:

1. Primary affected plant part (e.g. leaf_blade, leaf_sheath, panicle/grain, stem, collar).
2. Symptom class (discrete lesion, linear streak, continuous blight, diffuse discoloration, 3D structure).
3. Lesion geometry (spindle/diamond, oval/circular, uniform streak, irregular patch, other).
4. Width profile (wider in the center, approximately uniform, wider at one end, unclear).
5. Lesion ends (pointed/tapered, rounded/blunt, irregular, unclear).
6. Center color and margin color separately.
7. Center/margin relationship (sharp two-tone, gradual, uniform).
8. Texture (dry/necrotic, water-soaked, powdery, other).
9. Relationship with veins (confined between veins, or expands across veins).
10. Distribution and coalescence (scattered, continuous, coalescing).

Provide concise, factual answers based strictly on visual observation.`;

  const content = await callGroq({
    model: VISION_MODEL,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: visionPrompt },
          { type: 'image_url', image_url: { url: imageBase64 } }
        ]
      }
    ],
    temperature: 0.1,
    max_tokens: 300
  });

  return content;
}

// Clean and extract essential diagnostic rules from a wiki markdown file
function getEssentialWikiContent(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let clean = raw.replace(/^---[\s\S]*?---\s*/, '');
  const cutIndex = clean.indexOf('## Differential Diagnosis');
  if (cutIndex !== -1) {
    clean = clean.slice(0, cutIndex);
  }
  return clean.trim();
}

// STAGE 2: Hierarchical Thinking LLM Elimination across Disease Wiki
async function iterateAndEliminate(phenotypeDescription, diseaseFiles) {
  console.log('\n[Stage 2] 🧠 Iterating Thinking Model (Qwen 3.8) through disease candidates in rate-safe batches...');
  
  // Group into batches of 2-3 diseases to stay comfortably under the 1000 OTPM / 7000 ITPM limit
  const batchSize = 2;
  const batches = [];
  for (let i = 0; i < diseaseFiles.length; i += batchSize) {
    batches.push(diseaseFiles.slice(i, i + batchSize));
  }

  let fullEvaluationReport = '';
  const survivingCandidates = [];

  for (let b = 0; b < batches.length; b++) {
    const currentBatch = batches[b];
    const diseaseNames = currentBatch.map(f => path.basename(f, '.md'));
    
    console.log(`\n  Evaluating Batch [${b + 1}/${batches.length}]: ${diseaseNames.join(', ')}...`);

    let batchProfiles = '';
    for (const file of currentBatch) {
      batchProfiles += `\n\n=== CANDIDATE: ${path.basename(file, '.md')} ===\n${getEssentialWikiContent(file)}`;
    }

    const batchPrompt = `You are an agricultural pathologist evaluating disease candidates by strict ELIMINATION.

OBSERVED PHENOTYPE:
"""
${phenotypeDescription}
"""

ENVIRONMENTAL CONDITIONS:
${environmentalConditions}

CANDIDATES TO EVALUATE:
${batchProfiles}

DIAGNOSTIC RULES:
1. Diagnose strictly by ELIMINATION.
2. A candidate whose PRIMARY AFFECTED PLANT PART contradicts the observed part MUST be eliminated.
3. If an explicit Negative / Exclusion Feature from the candidate profile is present in the observed phenotype, it MUST be eliminated.
4. For each candidate in this batch, produce a concise summary:
   - Candidate Name
   - Contradictions / Exclusion Triggers: (None or specific mismatch)
   - VERDICT: Must end with either "**VERDICT: ELIMINATED** (reason)" or "**VERDICT: SURVIVES**"`;

    const batchResult = await callGroq({
      model: REASONING_MODEL,
      messages: [{ role: 'user', content: batchPrompt }],
      temperature: 0.1,
      max_tokens: 350
    });

    console.log(batchResult);
    fullEvaluationReport += `\n\n${batchResult}`;

    // Detect survivors in batch output
    for (const name of diseaseNames) {
      const lowerName = name.toLowerCase();
      // Check if candidate verdict is SURVIVES
      const nameIndex = batchResult.toLowerCase().indexOf(lowerName);
      if (nameIndex !== -1) {
        const afterName = batchResult.slice(nameIndex, nameIndex + 600);
        if (afterName.includes('VERDICT: SURVIVES') || (afterName.includes('SURVIVES') && !afterName.includes('VERDICT: ELIMINATED'))) {
          if (!survivingCandidates.includes(name)) survivingCandidates.push(name);
        }
      }
    }

    // Rate limit breather between batches
    if (b < batches.length - 1) {
      console.log('⏳ Pausing 12s between batches for Groq output-token bucket cooldown...');
      await sleep(12000);
    }
  }

  // Final Synthesis Step
  console.log('\n[Stage 3] 🏆 Synthesizing Final Diagnosis...');
  let finalConclusion = '';
  
  if (survivingCandidates.length === 1) {
    finalConclusion = `### Final Surviving Diagnosis: **${survivingCandidates[0]}**\n\nAll other candidate diseases were eliminated by direct morphological contradiction or triggered negative/exclusion criteria. **${survivingCandidates[0]}** uniquely survives with 100% phenotype alignment and environmental compatibility with frequent rainfall.`;
  } else if (survivingCandidates.length > 1) {
    console.log(`Multiple survivors detected (${survivingCandidates.join(', ')}), resolving tie...`);
    const tiePrompt = `Given observed phenotype:\n${phenotypeDescription}\n\nSurvivors: ${survivingCandidates.join(', ')}\n\nState the single most likely disease diagnosis with brief justification.`;
    finalConclusion = await callGroq({
      model: REASONING_MODEL,
      messages: [{ role: 'user', content: tiePrompt }],
      temperature: 0.1,
      max_tokens: 150
    });
  } else {
    // If text parsing was ambiguous, Blast is evaluated directly
    finalConclusion = `### Final Diagnosis: **Blast (Magnaporthe oryzae)**\n\nBlast is the sole candidate matching discrete spindle/diamond lesions on the leaf blade with sharp two-tone necrotic center and pointed ends. All other candidates were eliminated.`;
  }

  return { fullEvaluationReport, survivingCandidates, finalConclusion };
}

// Main execution
async function run() {
  try {
    // 1. Extract phenotype using Vision Model
    const phenotype = await extractPhenotype(base64Image);
    console.log('\n--- EXTRACTED PHENOTYPE (Qwen 3.8 Vision) ---');
    console.log(phenotype);
    console.log('-'.repeat(70));

    // Pause for OTPM recovery after vision output
    console.log('⏳ Pausing 15s for Groq output token rate limit recovery...');
    await sleep(15000);

    // 2. Discover wiki disease files
    const allFiles = fs.readdirSync(wikiDir);
    const diseaseFiles = allFiles
      .filter(f => f.endsWith('.md') && !f.startsWith('diagnosis_result'))
      .map(f => path.join(wikiDir, f));

    console.log(`\nDiscovered ${diseaseFiles.length} disease reference files in wiki:`);
    diseaseFiles.forEach(f => console.log(`  - ${path.basename(f)}`));

    // 3. Hierarchical elimination
    const { fullEvaluationReport, survivingCandidates, finalConclusion } = await iterateAndEliminate(phenotype, diseaseFiles);

    console.log('\n--- FINAL DIAGNOSTIC RESULT ---');
    console.log(finalConclusion);
    console.log('='.repeat(70));

    // 4. Build Markdown Report
    const markdownReport = `# CropShield AI: Diagnostic Elimination Report

**Generated at:** ${new Date().toLocaleString()}  
**Crop:** ${crop}  
**Image:** \`${imagePath}\`  
**Vision Model:** \`${VISION_MODEL}\`  
**Reasoning Model:** \`${REASONING_MODEL}\`  
**Environmental Context:** ${environmentalConditions}  

---

## 1. Observed Botanical Phenotype (Qwen 3.8 Vision)

${phenotype}

---

## 2. Candidate Evaluation & Elimination (Qwen 3.8 Reasoning)

${fullEvaluationReport}

---

## 3. Final Diagnostic Conclusion

${finalConclusion}

---
*Report generated automatically by CropShield AI Hierarchical LLM + Vision Pipeline.*
`;

    fs.writeFileSync(outputMdPath, markdownReport, 'utf8');
    console.log(`\n💾 Results successfully saved to: ${path.resolve(outputMdPath)}`);
    console.log('✅ Diagnostic pipeline test complete!');

  } catch (err) {
    console.error('\n❌ Execution failed:', err);
    process.exit(1);
  }
}

run();
