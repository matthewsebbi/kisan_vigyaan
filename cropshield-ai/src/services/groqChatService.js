/**
 * Groq GPT-OSS Agronomist Chat Service
 * Integrates OpenAI GPT-OSS (openai/gpt-oss-120b & openai/gpt-oss-20b) hosted on Groq LPU
 * for real-time, dynamic multilingual farming intelligence and actionable advice.
 */

import { generateChotaKissanResponse, classifyAgriculturalIntent, SUPPORTED_LANGUAGES } from './chotaKissanEngine';

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
 */
const buildSystemPrompt = (lang = 'en', farmContext = {}) => {
  const langMeta = SUPPORTED_LANGUAGES[lang] || { name: 'English', nativeName: 'English' };

  return `You are "Kisan AI", an expert agricultural scientist, agronomist, and extension advisor for CropShield AI, assisting Indian farmers and agricultural officers.

Core Mission:
1. Provide accurate, practical, and highly actionable farming advice covering:
   - Crop pathology: Identification of fungal, bacterial, viral, and pest infestations (Pearl Millet, Cotton, Tomato, Rice/Paddy, Wheat, Sugarcane, Soybean, Chili, Groundnut, etc.).
   - Chemical treatments: Exact chemical active ingredients with approved backpack sprayer dosages (e.g., grams or ml per 15-liter pump, or per acre) and pre-harvest intervals (PHI).
   - Integrated pest management & organic alternatives (Neem oil, Trichoderma viride, bio-fertilizers).
   - Soil health, NPK basal/split fertilization, micro-nutrients (Zinc, Boron, Ferrous), and sensor-based irrigation timing.
   - Government schemes & subsidies (PM-Kisan Samman Nidhi, PMFBY crop insurance, PM-KUSUM solar pumps, DBT portals).

Language Directive:
- You MUST generate your response completely and fluently in ${langMeta.name} (${langMeta.nativeName}, language code: "${lang}").
- Speak directly to the farmer with respect, encouragement, and practical simplicity.
- Do not mix other languages, except for standard chemical names if commonly used (e.g., Mancozeb, Streptocycline, Imidacloprid).

Formatting & TTS Optimization:
- Format your response in 2 to 4 concise, clear paragraphs or clean bullet points.
- Do NOT output large complex markdown tables or excessive ASCII symbols, because your answer will be read aloud to the farmer using Text-to-Speech (TTS). Keep sentences natural, clear, and easy to listen to.`;
};

/**
 * Send query to Groq GPT-OSS with automatic multi-model fallback & local fallback
 * @param {object} params - { query, lang, conversationHistory, farmContext }
 * @returns {Promise<{ text: string, source: string, actionButtons?: array }>}
 */
export async function generateGroqChatReply({
  query,
  lang = 'en',
  conversationHistory = [],
  farmContext = {}
}) {
  const apiKey = getGroqApiKey();

  // If no API key is provided, fallback cleanly to rule-based engine
  if (!apiKey || apiKey.length < 10) {
    console.warn('Groq API Key not found, using rule-based agricultural fallback');
    const intent = classifyAgriculturalIntent(query);
    const fallback = generateChotaKissanResponse({
      userQuery: query,
      detectedLang: lang,
      classifiedIntent: intent,
      farmContext
    });
    return {
      text: fallback.responseText,
      source: 'offline-engine',
      actionButtons: fallback.actionButtons
    };
  }

  // Build message sequence
  const messages = [
    { role: 'system', content: buildSystemPrompt(lang, farmContext) }
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

  // Models to attempt in order: flagship GPT-OSS 120B -> compact GPT-OSS 20B -> Llama 3.3
  const modelsToAttempt = [PRIMARY_GROQ_MODEL, FALLBACK_GROQ_MODEL, 'llama-3.3-70b-versatile'];

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
          temperature: 0.6,
          max_tokens: 850
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
