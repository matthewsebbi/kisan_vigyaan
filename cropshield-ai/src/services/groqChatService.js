/**
 * Groq GPT-OSS Agronomist Chat Service
 * Integrates OpenAI GPT-OSS (openai/gpt-oss-120b & openai/gpt-oss-20b) hosted on Groq LPU
 * for real-time, dynamic multilingual farming intelligence and actionable advice.
 */

import { generateChotaKissanResponse, classifyAgriculturalIntent, SUPPORTED_LANGUAGES, detectSpokenLanguage } from './chotaKissanEngine';

const GROQ_CHAT_URL = 'https://api.groq.com/openai/v1/chat/completions';
export const PRIMARY_GROQ_MODEL = 'openai/gpt-oss-120b';
export const FALLBACK_GROQ_MODEL = 'openai/gpt-oss-20b';

/**
 * Retrieve the active Groq API Key
 */
export const getGroqApiKey = () => {
  return import.meta.env.VITE_GROQ_API_KEY || '';
};

/**
 * Build a specialized agronomist system prompt for Indian agriculture
 * Grounded in CropShield AI / Kisan Vigyaan architecture with strict domain guardrails
 */
const buildSystemPrompt = (lang = 'en', farmContext = {}, isVoiceMode = true) => {
  const langMeta = SUPPORTED_LANGUAGES[lang] || { name: 'English', nativeName: 'English' };

  return `You are "Kisan AI" (किसान एआई), the intelligent real-time agronomist voice assistant for the "CropShield AI" (किसान विज्ञान / Kisan Vigyaan) agricultural intelligence platform.

### HOW OUR PROJECT WORKS (CROPSHIELD AI / KISAN VIGYAAN ARCHITECTURE):
Our project is a comprehensive precision agriculture & crop protection system for Indian farmers and agricultural officers. It integrates:
1. **AI Vision Leaf Pathology Scanner**: Deep learning optical diagnostic engine that identifies crop diseases (e.g. Downy Mildew, Rust, Blight, Leaf Curl, Blast, Powdery Mildew, Pink Bollworm) from leaf photos, and prescribes exact backpack sprayer dosages (e.g., Mancozeb 2.5g/L, Imidacloprid 0.5ml/L, Streptocycline 1g/10L) with Pre-Harvest Intervals (PHI).
2. **Sentinel-2 Multi-Spectral Satellite GIS**: High-resolution Earth observation computing NDVI (vegetative health/vigor), NDWI (canopy moisture & water stress), and NDRE across farmers' geo-fenced field plots.
3. **Live ESP32 IoT Soil & Micro-climate Telemetry**: Real-time physical in-situ sensors measuring Soil Volumetric Water Content (VWC %), Soil pH, NPK levels, leaf wetness hours, ambient temperature, and humidity.
4. **Environmental Epidemic Forecaster**: Micro-climate threshold engine calculating disease outbreak risk probabilities before visual symptoms emerge.
5. **Kisan Mandi & Crop Sell Portal**: Real-time agricultural commodity prices, MSP tracking, and direct-to-buyer listing.
6. **Government Schemes & Farmer Subsidies**: Automated guidance for PM-Kisan Samman Nidhi installments, PMFBY crop insurance claim filing, PM-KUSUM solar pumps, and state DBT portals.

### STRICT DOMAIN GUARDRAILS (CRITICAL):
- You must ALWAYS keep the conversation strictly within the domain of our project and Indian agriculture.
- Permitted topics: Crops, pests, plant pathology, fungicide/pesticide dosages, soil sensors, irrigation scheduling, satellite vegetation indices, farm weather, fertilizers (NPK/Urea/DAP), mandi prices, and government agricultural schemes.
- REJECT OFF-TOPIC QUERIES: If the user asks anything outside of agriculture and this project (such as general programming, movies, gaming, celebrity gossip, unrelated history/politics), you MUST politely decline and steer them back to their farm:
  "I am Kisan AI, your agricultural assistant. I can only assist with your crops, soil sensors, diseases, weather, and farm advisories. Please ask me about your farm or crops!" (translated naturally into ${langMeta.nativeName}).

### MANDATORY RESPONSE LANGUAGE DIRECTIVE (VERY CRITICAL):
- YOU MUST GENERATE YOUR RESPONSE COMPLETELY IN ${langMeta.name} (${langMeta.nativeName}, script code: "${lang}").
- If the language is Hindi ('hi'), you MUST reply in pure Hindi script (हिन्दी). Do not reply in English!
- If the language is Marathi ('mr'), you MUST reply in pure Marathi script (मराठी). Do not reply in English!
- If the language is Tamil ('ta'), reply completely in Tamil script (தமிழ்).
- If the language is Telugu ('te'), reply completely in Telugu script (తెలుగు).
- If the language is Kannada ('kn'), reply completely in Kannada script (ಕನ್ನಡ).
- If the language is Gujarati ('gu'), reply completely in Gujarati script (ગુજરાતી).
- UNDER NO CIRCUMSTANCES should you output English text if the target language is an Indian language (${langMeta.name}).

### CONVERSATIONAL VOICE DIRECTIVE (SIRI / GEMINI LIVE STYLE):
- You are speaking aloud directly to the farmer over a live voice audio stream.
- Keep responses CONCISE, WARM, and ACTIONABLE (${isVoiceMode ? '2 to 3 sentences maximum' : '2 to 4 clear paragraphs'}).
- Do NOT output markdown tables, asterisks, bullet markers, or raw symbols (#, *, _, |) because your response is read aloud by Text-to-Speech (TTS). State chemical names and numbers clearly and simply.
- Farm telemetry context available: ${JSON.stringify(farmContext)}.`;
};

/**
 * Send query to Groq GPT-OSS / Llama 3.3 with automatic multi-model fallback & local fallback
 * @param {object} params - { query, lang, conversationHistory, farmContext, isVoiceMode }
 * @returns {Promise<{ text: string, source: string, detectedLang: string, actionButtons?: array }>}
 */
export async function generateGroqChatReply({
  query,
  lang = 'en',
  conversationHistory = [],
  farmContext = {},
  isVoiceMode = true
}) {
  const apiKey = getGroqApiKey();

  // Auto-detect Indian language from query text if lang is 'en' or mismatched
  let effectiveLang = lang;
  if (!lang || lang === 'en') {
    const textDetected = detectSpokenLanguage(query);
    if (textDetected && textDetected !== 'en') {
      effectiveLang = textDetected;
    }
  }

  // If no API key is provided, fallback cleanly to rule-based engine
  if (!apiKey || apiKey.length < 10) {
    console.warn('Groq API Key not found, using rule-based agricultural fallback');
    const intent = classifyAgriculturalIntent(query);
    const fallback = generateChotaKissanResponse({
      userQuery: query,
      detectedLang: effectiveLang,
      classifiedIntent: intent,
      farmContext
    });
    return {
      text: fallback.responseText,
      source: 'offline-engine',
      detectedLang: effectiveLang,
      actionButtons: fallback.actionButtons
    };
  }

  // Build message sequence using effective detected language
  const messages = [
    { role: 'system', content: buildSystemPrompt(effectiveLang, farmContext, isVoiceMode) }
  ];

  // Include recent conversation messages for conversational continuity
  if (Array.isArray(conversationHistory)) {
    const recent = conversationHistory
      .filter(m => m && (m.text || m.content))
      .slice(-4)
      .map(m => ({
        role: m.sender === 'user' || m.role === 'user' ? 'user' : 'assistant',
        content: m.text || m.content
      }));
    messages.push(...recent);
  }

  // Ensure current user query is the final message
  if (messages.length === 1 || messages[messages.length - 1].content !== query) {
    messages.push({ role: 'user', content: query });
  }

  // Models to attempt in order: fast Llama 3.3 70B -> Llama 3.1 8B -> GPT-OSS models
  const modelsToAttempt = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', PRIMARY_GROQ_MODEL, FALLBACK_GROQ_MODEL];

  for (const model of modelsToAttempt) {
    try {
      const response = await fetch(GROQ_CHAT_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.5,
          max_tokens: 650
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Groq model ${model} returned error status ${response.status}:`, errorText);
        continue;
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;

      if (reply && reply.trim()) {
        return {
          text: reply.trim(),
          source: model,
          detectedLang: effectiveLang,
          usage: data.usage
        };
      }
    } catch (err) {
      console.warn(`Network error when contacting Groq ${model}:`, err);
    }
  }

  // Fallback to local agronomic engine if all network requests fail
  console.warn('All Groq models failed or timed out. Falling back to local agronomy engine.');
  const intent = classifyAgriculturalIntent(query);
  const fallback = generateChotaKissanResponse({
    userQuery: query,
    detectedLang: lang,
    classifiedIntent: intent,
    farmContext
  });

  return {
    text: fallback.responseText,
    source: 'fallback-engine',
    actionButtons: fallback.actionButtons
  };
}
