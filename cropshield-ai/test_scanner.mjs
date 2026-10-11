import { analyzeLeafWithGroq } from './src/services/visionService.js';
import { resolveWikiDiseaseDiagnosis } from './src/services/wikiDiseaseKnowledge.js';

async function runTest() {
  console.log("Starting test...");
  try {
    const fakeImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD";
    
    console.log("Calling analyzeLeafWithGroq...");
    const result = await analyzeLeafWithGroq(fakeImage, 'en', {
      crop: "Cotton",
      sampleOption: null
    });
    
    console.log("analyzeLeafWithGroq succeeded! Result:", result);
  } catch (err) {
    console.error("analyzeLeafWithGroq failed with error:", err);
  }
}

runTest();
