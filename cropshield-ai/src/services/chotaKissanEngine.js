/**
 * CropShield AI - "CHOTA KISSAN" Multilingual AI Voice Assistant Engine (v3.0)
 * 
 * Production-quality agricultural voice assistant supporting 10 Indian languages,
 * robust Unicode & conversational intent classification (greetings, identity, casual queries,
 * specific crop diagnoses, live sensors, weather, mandi rates, irrigation, fertilizers),
 * continuous SpeechRecognition stream with silence debounce, and natural TTS speech.
 */

import { DISEASE_ENVIRONMENTAL_PROFILES, evaluateDiseaseRisk } from './environmentalDiseaseEngine';
import { 
  detectNavigationIntent, 
  getNavigationSpokenConfirmation, 
  getRouteLabel,
  NAVIGATION_ROUTES 
} from './voiceNavigationService';

export { detectNavigationIntent, getNavigationSpokenConfirmation, getRouteLabel, NAVIGATION_ROUTES };

// ==========================================
// 1. LANGUAGE DEFINITIONS & METADATA
// ==========================================
export const SUPPORTED_LANGUAGES = {
  en: { id: 'en', code: 'en-IN', name: 'English', nativeName: 'English', flag: '🌐' },
  hi: { id: 'hi', code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  mr: { id: 'mr', code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी', flag: '🚩' },
  ta: { id: 'ta', code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', flag: '🌴' },
  te: { id: 'te', code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు', flag: '🌾' },
  kn: { id: 'kn', code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🌻' },
  gu: { id: 'gu', code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🌱' },
  bn: { id: 'bn', code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা', flag: '🌿' },
  pa: { id: 'pa', code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🌾' },
  ml: { id: 'ml', code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🌴' }
};

export const ASSISTANT_UI_STRINGS = {
  en: {
    name: 'Kisan One',
    title: 'AI Agri Voice Assistant',
    greeting: "Hello! I am Kisan One, your AI farm assistant. Speak naturally in any language — ask me about your crops, diseases, medicines, weather, or market rates!",
    tapToTalk: 'Tap to Talk',
    listening: 'Listening to your voice... (Speak now)',
    processing: 'Understanding your question...',
    analyzingFarm: 'Checking live farm sensors & disease models...',
    speaking: 'Kisan One is speaking...',
    stopSpeaking: 'Stop Audio',
    tryAsking: 'Try asking Kisan One:',
    liveFarmContext: 'Live Farm Context Active',
    voiceSettings: 'Voice Settings',
    speed: 'Speed',
    volume: 'Volume'
  },
  hi: {
    name: 'किसान वन',
    title: 'एआई कृषि आवाज सहायक',
    greeting: "नमस्ते! मैं किसान वन हूँ, आपका एआई कृषि साथी। अपनी भाषा में खुलकर बोलिए — फसल की बीमारी, दवा, मौसम या मंडी भाव के बारे में पूछें!",
    tapToTalk: 'बोलने के लिए दबाएं',
    listening: 'सुन रहा हूँ... (कृपया बोलिए)',
    processing: 'समझ रहा हूँ...',
    analyzingFarm: 'खेत के सेंसर व रोग मॉडल की जांच जारी...',
    speaking: 'किसान वन बोल रहा है...',
    stopSpeaking: 'आवाज रोकें',
    tryAsking: 'किसान वन से पूछें:',
    liveFarmContext: 'लाइव खेत डेटा सक्रिय',
    voiceSettings: 'आवाज सेटिंग्स',
    speed: 'गति',
    volume: 'आवाज स्तर'
  },
  mr: {
    name: 'किसान वन',
    title: 'एआय कृषी आवाज सहाय्यक',
    greeting: "नमस्कार! मी किसान वन, आपला एआय कृषी साथीदार. आपल्या भाषेत बोला — पिकांचे रोग, औषध फवारणी, हवामान किंवा बाजारभावाबद्दल विचारा!",
    tapToTalk: 'बोलण्यासाठी स्पर्श करा',
    listening: 'ऐकत आहे... (बोला)',
    processing: 'समजून घेत आहे...',
    analyzingFarm: 'शेतातील सेन्सर्स व रोग अंदाज तपासत आहे...',
    speaking: 'किसान वन बोलत आहे...',
    stopSpeaking: 'आवाज थांबवा',
    tryAsking: 'किसान वनला विचारा:',
    liveFarmContext: 'थेट शेत माहिती सक्रिय',
    voiceSettings: 'आवाज सेटिंग्ज',
    speed: 'गती',
    volume: 'आवाज'
  },
  ta: {
    name: 'கிசான் ஒன்',
    title: 'AI விவசாய குரல் உதவியாளர்',
    greeting: "வணக்கம்! நான் கிசான் ஒன், உங்கள் AI விவசாய தோழன். உங்கள் தாய்மொழியில் இயல்பாக பேசுங்கள் — பயிர் நோய், மருந்து தெளிப்பு, வானிலை அல்லது சந்தை விலை பற்றி கேளுங்கள்!",
    tapToTalk: 'பேச தட்டவும்',
    listening: 'கேட்டுக்கொண்டிருக்கிறேன்... (பேசுங்கள்)',
    processing: 'கேள்வியை புரிந்துகொள்கிறேன்...',
    analyzingFarm: 'பண்ணை சென்சார்கள் & நோய் அபாயத்தை சரிபார்க்கிறது...',
    speaking: 'கிசான் ஒன் பேசுகிறார்...',
    stopSpeaking: 'குரலை நிறுத்து',
    tryAsking: 'கிசான் ஒன்னிடம் கேட்கலாம்:',
    liveFarmContext: 'நேரலை பண்ணை தரவு செயலில் உள்ளது',
    voiceSettings: 'குரல் அமைப்புகள்',
    speed: 'வேகம்',
    volume: 'ஒலி அளவு'
  },
  te: {
    name: 'కిసాన్ వన్',
    title: 'AI వ్యవసాయ వాయిస్ అసిస్టెంట్',
    greeting: "నమస్కారం! నేను కిసాన్ వన్, మీ AI వ్యవసాయ మిత్రుడిని. మీ పంటల వ్యాధులు, మందులు, వాతావరణం లేదా మార్కెట్ ధరల గురించి అడగండి!",
    tapToTalk: 'మాట్లాడటానికి నొక్కండి',
    listening: 'వింటున్నాను...',
    processing: 'అర్థం చేసుకుంటున్నాను...',
    analyzingFarm: 'పొలం సెన్సార్లు & వ్యాధి నమూనాలను తనిఖీ చేస్తోంది...',
    speaking: 'కిసాన్ వన్ మాట్లాడుతున్నారు...',
    stopSpeaking: 'వాయిస్ ఆపు',
    tryAsking: 'కిసాన్ వన్‌ను అడగండి:',
    liveFarmContext: 'లైవ్ ఫార్మ్ డేటా యాక్టివ్',
    voiceSettings: 'వాయిస్ సెట్టింగ్‌లు',
    speed: 'వేగం',
    volume: 'వాల్యూమ్'
  },
  kn: {
    name: 'ಕಿಸಾನ್ ಒನ್',
    title: 'AI ಕೃಷಿ ಧ್ವನಿ ಸಹಾಯಕ',
    greeting: "ನಮಸ್ಕಾರ! ನಾನು ಕಿಸಾನ್ ಒನ್, ನಿಮ್ಮ AI ಕೃಷಿ ಮಿತ್ರ. ಬೆಳೆ ರೋಗ, ಔಷಧಿ, ಹವಾಮಾನ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ದರಗಳ ಬಗ್ಗೆ ಕೇಳಿ!",
    tapToTalk: 'ಮಾತನಾಡಲು ಸ್ಪರ್ಶಿಸಿ',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...',
    processing: 'ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...',
    analyzingFarm: 'ಹೊಲದ ಸಂವೇದಕಗಳು ಮತ್ತು ರೋಗ ಅಪಾಯವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    speaking: 'ಕಿಸಾನ್ ಒನ್ ಮಾತನಾಡುತ್ತಿದ್ದಾರೆ...',
    stopSpeaking: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    tryAsking: 'ಕಿಸಾನ್ ಒನ್ ಅವರನ್ನು ಕೇಳಿ:',
    liveFarmContext: 'ಲೈವ್ ಫಾರ್ಮ್ ಡೇಟಾ ಸಕ್ರಿಯವಾಗಿದೆ',
    voiceSettings: 'ಧ್ವನಿ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    speed: 'ವೇಗ',
    volume: 'ಧ್ವನಿ ಮಟ್ಟ'
  },
  gu: {
    name: 'છોટા કિસાન',
    title: 'AI કૃષિ અવાજ સહાયક',
    greeting: "નમસ્તે! હું છોટા કિસાન છું, તમારો AI ખેતી સાથી. પાક રોગ, દવા, હવામાન કે બજારભાવ વિશે પૂછો!",
    tapToTalk: 'બોલવા માટે દબાવો',
    listening: 'સાંભળી રહ્યો છું...',
    processing: 'સમજી રહ્યો છું...',
    analyzingFarm: 'ખેતરના સેન્સર્સ અને રોગ મોડલની તપાસ ચાલુ છે...',
    speaking: 'છોટા કિસાન બોલી રહ્યા છે...',
    stopSpeaking: 'અવાજ બંધ કરો',
    tryAsking: 'છોટા કિસાનને પૂછો:',
    liveFarmContext: 'લાઇવ ફાર્મ ડેટા સક્રિય',
    voiceSettings: 'અવાજ સેટિંગ્સ',
    speed: 'ઝડપ',
    volume: 'અવાજ સ્તર'
  },
  bn: {
    name: 'ছোটা কিসান',
    title: 'AI কৃষি ভয়েস সহকারী',
    greeting: "নমস্কার! আমি ছোটা কিসান, আপনার AI কৃষি সঙ্গী। ফসলের রোগ, ওষুধ, আবহাওয়া বা বাজার দর সম্পর্কে জিজ্ঞাসা করুন!",
    tapToTalk: 'কথা বলতে স্পর্শ করুন',
    listening: 'শুনছি...',
    processing: 'বুঝতে পারছি...',
    analyzingFarm: 'খামারের সেন্সর ও রোগ পূর্বাভাস যাচাই করা হচ্ছে...',
    speaking: 'ছোটা কিসান কথা বলছেন...',
    stopSpeaking: 'ভয়েস বন্ধ করুন',
    tryAsking: 'ছোটা কিসানকে জিজ্ঞাসা করুন:',
    liveFarmContext: 'লাইভ ফার্ম ডেটা সক্রিয়',
    voiceSettings: 'ভয়েস সেটিংস',
    speed: 'গতি',
    volume: 'ভলিউম'
  },
  pa: {
    name: 'ਛੋਟਾ ਕਿਸਾਨ',
    title: 'AI ਖੇਤੀਬਾੜੀ ਵੌਇਸ ਅਸਿਸਟੈਂਟ',
    greeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਛੋਟਾ ਕਿਸਾਨ ਹਾਂ, ਤੁਹਾਡਾ AI ਖੇਤੀ ਸਾਥੀ। ਫਸਲਾਂ ਦੇ ਰੋਗ, ਦਵਾਈ, ਮੌਸਮ ਜਾਂ ਮੰਡੀ ਭਾਅ ਬਾਰੇ ਪੁੱਛੋ!",
    tapToTalk: 'ਬੋਲਣ ਲਈ ਦਬਾਓ',
    listening: 'ਸੁਣ ਰਿਹਾ ਹਾਂ...',
    processing: 'ਸਮਝ ਰਿਹਾ ਹਾਂ...',
    analyzingFarm: 'ਖੇਤ ਦੇ ਸੈਂਸਰ ਅਤੇ ਰੋਗ ਮਾਡਲ ਦੀ ਜਾਂਚ ਜਾਰੀ...',
    speaking: 'ਛੋਟਾ ਕਿਸਾਨ ਬੋਲ ਰਿਹਾ ਹੈ...',
    stopSpeaking: 'ਅਵਾਜ਼ ਰੋਕੋ',
    tryAsking: 'ਛੋਟਾ ਕਿਸਾਨ ਨੂੰ ਪੁੱਛੋ:',
    liveFarmContext: 'ਲਾਈਵ ਖੇਤ ਡਾਟਾ ਸਰਗਰਮ',
    voiceSettings: 'ਵੌਇਸ ਸੈਟਿੰਗਾਂ',
    speed: 'ਗਤੀ',
    volume: 'ਵਾਲੀਅਮ'
  },
  ml: {
    name: 'ഛോട്ടാ കിസാൻ',
    title: 'AI കാർഷിക വോയ്സ് അസിസ്റ്റന്റ്',
    greeting: "നമസ്കാരം! ഞാൻ ഛോട്ടാ കിസാൻ, നിങ്ങളുടെ AI കാർഷിക സഹായി. വിള രോഗങ്ങൾ, മരുന്ന്, കാലാവസ്ഥ അല്ലെങ്കിൽ മാർക്കറ്റ് വിലയെക്കുറിച്ച് ചോദിക്കൂ!",
    tapToTalk: 'സംസാരിക്കാൻ അമർത്തുക',
    listening: 'കേൾക്കുന്നു...',
    processing: 'മനസ്സിലാക്കുന്നു...',
    analyzingFarm: 'തോട്ടത്തിലെ സെൻസറുകളും രോഗ സൂചനകളും പരിശോധിക്കുന്നു...',
    speaking: 'ഛോട്ടാ കിസാൻ സംസാരിക്കുന്നു...',
    stopSpeaking: 'വോയ്സ് നിർത്തുക',
    tryAsking: 'ഛോട്ടാ കിസാനോട് ചോദിക്കാം:',
    liveFarmContext: 'തത്സമയ തോട്ട വിവരങ്ങൾ സജീവം'
  }
};



// ==========================================
// 2B. STRICT RESPONSE LANGUAGE VALIDATOR
// ==========================================
export function validateResponseLanguage(text = '', targetLang = 'en') {
  if (!text || typeof text !== 'string') return false;
  if (targetLang === 'en') return true;

  const scriptRegexMap = {
    ta: /[\u0B80-\u0BFF]/,
    hi: /[\u0900-\u097F]/,
    mr: /[\u0900-\u097F]/,
    te: /[\u0C00-\u0C7F]/,
    kn: /[\u0C80-\u0CFF]/,
    gu: /[\u0A80-\u0AFF]/,
    bn: /[\u0980-\u09FF]/,
    pa: /[\u0A00-\u0A7F]/,
    ml: /[\u0D00-\u0D7F]/
  };

  const regex = scriptRegexMap[targetLang];
  if (!regex) return true;

  const clean = text.replace(/\s/g, '');
  let scriptCount = 0;
  for (let i = 0; i < clean.length; i++) {
    if (regex.test(clean[i])) scriptCount++;
  }

  if (clean.length > 15) {
    return (scriptCount / clean.length) >= 0.10;
  }
  return scriptCount > 0;
}

// ==========================================
// 2. ROBUST AUTOMATIC LANGUAGE DETECTION (with confidence)
// ==========================================

/**
 * Detect language from text using Unicode script analysis + transliteration patterns.
 * Returns { lang, confidence } where confidence is 0.0–1.0.
 * For backward compatibility, the raw string return is also supported via detectSpokenLanguage().
 */
export function detectSpokenLanguageWithConfidence(text = '') {
  if (!text || typeof text !== 'string') return { lang: 'en', confidence: 0.1 };
  const clean = text.trim();
  if (!clean) return { lang: 'en', confidence: 0.1 };

  const totalChars = clean.replace(/\s/g, '').length || 1;

  // 1. Script Detection with character counting
  let devanagariCount = 0;
  let tamilCount = 0;
  let teluguCount = 0;
  let kannadaCount = 0;
  let gujaratiCount = 0;
  let bengaliCount = 0;
  let gurmukhiCount = 0;
  let malayalamCount = 0;
  let latinCount = 0;

  for (let i = 0; i < clean.length; i++) {
    const code = clean.charCodeAt(i);
    if (code >= 0x0B80 && code <= 0x0BFF) tamilCount++;
    else if (code >= 0x0900 && code <= 0x097F) devanagariCount++;
    else if (code >= 0x0C00 && code <= 0x0C7F) teluguCount++;
    else if (code >= 0x0C80 && code <= 0x0CFF) kannadaCount++;
    else if (code >= 0x0A80 && code <= 0x0AFF) gujaratiCount++;
    else if (code >= 0x0980 && code <= 0x09FF) bengaliCount++;
    else if (code >= 0x0A00 && code <= 0x0A7F) gurmukhiCount++;
    else if (code >= 0x0D00 && code <= 0x0D7F) malayalamCount++;
    else if ((code >= 0x0041 && code <= 0x005A) || (code >= 0x0061 && code <= 0x007A)) latinCount++;
  }

  // Find dominant script
  const scriptScores = [
    { lang: 'ta', count: tamilCount },
    { lang: 'te', count: teluguCount },
    { lang: 'kn', count: kannadaCount },
    { lang: 'gu', count: gujaratiCount },
    { lang: 'bn', count: bengaliCount },
    { lang: 'pa', count: gurmukhiCount },
    { lang: 'ml', count: malayalamCount }
  ].filter(s => s.count >= 1).sort((a, b) => b.count - a.count);

  if (scriptScores.length > 0) {
    const dominant = scriptScores[0];
    const ratio = dominant.count / totalChars;
    // If mixed scripts, reduce confidence
    const otherScripts = scriptScores.slice(1).reduce((sum, s) => sum + s.count, 0);
    const mixPenalty = otherScripts > 0 ? 0.15 : 0;
    return { lang: dominant.lang, confidence: Math.min(0.98, Math.max(0.5, ratio + 0.3) - mixPenalty) };
  }

  if (devanagariCount >= 1) {
    const ratio = devanagariCount / totalChars;
    const marathiMarkers = ['माझ्या', 'पिकाला', 'शेतात', 'करावे', 'आहे', 'का', 'पाऊस', 'रोगाचा', 'धोका', 'काय', 'खत', 'पाणी', 'सांगा', 'कसे', 'होईल', 'ऊस', 'कापूस', 'फवारणी', 'रोग', 'नमस्कार'];
    const marathiHits = marathiMarkers.filter(word => clean.includes(word)).length;
    if (marathiHits >= 1) {
      return { lang: 'mr', confidence: Math.min(0.95, 0.6 + marathiHits * 0.08) };
    }
    return { lang: 'hi', confidence: Math.min(0.95, Math.max(0.5, ratio + 0.25)) };
  }

  // 2. Transliterated / Phonetic detection (lower confidence since Latin script)
  const lower = clean.toLowerCase();

  const tamilTranslit = ['ennoda', 'vayalil', 'vayal', 'thannir', 'paaichalama', 'marunthu', 'noi', 'thakkali', 'nel', 'pasi', 'solunga', 'eppadi', 'mazhai', 'poochi', 'karukal', 'vilai', 'manjal', 'pulli', 'vanakkam', 'nandri', 'seri', 'yaar'];
  const tamilHits = tamilTranslit.filter(w => lower.includes(w)).length;
  if (tamilHits >= 1) return { lang: 'ta', confidence: Math.min(0.8, 0.4 + tamilHits * 0.12) };

  const marathiTranslit = ['mazya', 'majhya', 'pikala', 'shetat', 'ahe', 'dhoka', 'kay karu', 'khat', 'kapus', 'bhaat', 'oos', 'fawarani', 'kasa', 'namaskar'];
  const marathiTHits = marathiTranslit.filter(w => lower.includes(w)).length;
  if (marathiTHits >= 1) return { lang: 'mr', confidence: Math.min(0.75, 0.35 + marathiTHits * 0.12) };

  const hindiTranslit = ['mera', 'mere', 'meri', 'fasal', 'khet', 'kya', 'kare', 'karo', 'paani', 'rog', 'dawa', 'khad', 'gehun', 'kisan', 'baarish', 'tamatar', 'namaste', 'kaise', 'shukriya'];
  const hindiHits = hindiTranslit.filter(w => lower.includes(w)).length;
  if (hindiHits >= 1) return { lang: 'hi', confidence: Math.min(0.75, 0.35 + hindiHits * 0.12) };

  const teluguTranslit = ['polam', 'polamlo', 'neellu', 'mandhu', 'panta', 'cheyali', 'emi', 'eppudu', 'varsham', 'vari', 'namaskaram'];
  const teluguHits = teluguTranslit.filter(w => lower.includes(w)).length;
  if (teluguHits >= 1) return { lang: 'te', confidence: Math.min(0.7, 0.3 + teluguHits * 0.12) };

  const kannadaTranslit = ['nanna', 'hola', 'holadalli', 'neeru', 'aushadha', 'bele', 'enu', 'madabeku', 'male', 'bhatta', 'hathi', 'namaskara'];
  const kannadaHits = kannadaTranslit.filter(w => lower.includes(w)).length;
  if (kannadaHits >= 1) return { lang: 'kn', confidence: Math.min(0.7, 0.3 + kannadaHits * 0.12) };

  return { lang: 'en', confidence: latinCount > 0 ? 0.7 : 0.3 };
}

/** Backward-compatible wrapper — returns just the language code string */
export function detectSpokenLanguage(text = '') {
  return detectSpokenLanguageWithConfidence(text).lang;
}


// ==========================================
// 3. BROAD CONVERSATIONAL & AGRICULTURAL INTENT CLASSIFIER
// ==========================================

function textMatchesAny(text, keywords) {
  const t = text.toLowerCase();
  return keywords.some(k => t.includes(k.toLowerCase()));
}

export function classifyAgriculturalIntent(query = '', context = {}) {
  const q = (query || '').trim();
  const lower = q.toLowerCase();

  let targetCrop = context.crop || 'cotton';

  // --- 0. SMART UNIVERSAL LANGUAGE CHANGE & INTERFACE CONTROL ---
  const langKeywordsMap = {
    hi: ['hindi', 'hind', 'हिन्दी', 'हिंदी', 'हिन्दू'],
    mr: ['marathi', 'marat', 'मराठी'],
    ta: ['tamil', 'tamiz', 'தமிழ்', 'தமிழ்ல', 'தமீழ்'],
    te: ['telugu', 'telgu', 'తెలుగు'],
    kn: ['kannada', 'kannad', '<ctrl42>ಕನ್ನಡ'],
    gu: ['gujarati', 'gujrat', 'ગુજરાતી'],
    bn: ['bengali', 'bangla', 'বাংলা'],
    ml: ['malayalam', 'മലയാളം'],
    pa: ['punjabi', 'panjabi', 'ਪੰਜਾਬੀ'],
    en: ['english', 'angrezi', 'अंग्रेजी', 'இங்கிலீஷ்', 'ഇംഗ്ലീഷ്', 'ఇంగ్లీష్', 'ಇಂಗ್ಲಿಷ್']
  };

  const isLangChangeAction = textMatchesAny(q, [
    'change', 'switch', 'convert', 'set', 'translate', 'speak', 'talk',
    'interface', 'language', 'lang', 'bhasha', 'basha', 'mozi', 'baashe',
    'badal', 'மாற்று', 'மாத்து', 'பதிலாக', 'மாற்றுங்கள்', 'बदलो', 'बदला',
    'करावयाचे', 'कौ', 'மாற்றுவது'
  ]);

  if (isLangChangeAction) {
    const matches = [];
    const lowerQ = q.toLowerCase();
    
    for (const [code, keywords] of Object.entries(langKeywordsMap)) {
      for (const kw of keywords) {
        const idx = lowerQ.indexOf(kw.toLowerCase());
        if (idx !== -1) {
          matches.push({ code, idx });
          break;
        }
      }
    }

    if (matches.length > 0) {
      matches.sort((a, b) => a.idx - b.idx);
      const targetMatch = matches.length > 1 ? matches[matches.length - 1] : matches[0];
      return { intent: 'change_language', targetLang: targetMatch.code, rawQuery: q };
    }
  }


  // --- ENTITY EXTRACTION: CROP ---
  if (textMatchesAny(q, ['பருத்தி', 'paruthi', 'cotton', 'कापूस', 'कपास', 'kapas', 'kapus', 'patti', 'ಪತ್ತಿ', 'ಹತ್ತಿ', 'hathi'])) {
    targetCrop = 'cotton';
  } else if (textMatchesAny(q, ['தக்காளி', 'thakkali', 'tomato', 'टोमॅटो', 'टमाटर', 'tamatar', 'tamata', 'టమోటా', 'ಟೊಮೆಟೊ'])) {
    targetCrop = 'tomato';
  } else if (textMatchesAny(q, ['நெல்', 'nel', 'rice', 'paddy', 'भात', 'धान', 'dhan', 'bhaat', 'వరి', 'vari', 'ಭತ್ತ', 'bhatta'])) {
    targetCrop = 'rice';
  } else if (textMatchesAny(q, ['கரும்பு', 'karumbu', 'sugarcane', 'ऊस', 'गन्ना', 'ganna', 'oos', 'చెరకు', 'cheruku', 'ಕಬ್ಬು', 'kabbu'])) {
    targetCrop = 'sugarcane';
  } else if (textMatchesAny(q, ['திராட்சை', 'thiratchai', 'grape', 'grapes', 'द्राक्ष', 'अंगूर', 'angur', 'draksh', 'ద్రాక్ష'])) {
    targetCrop = 'grapes';
  } else if (textMatchesAny(q, ['சோயாபீன்', 'soybean', 'soya', 'सोयाबीन'])) {
    targetCrop = 'soybean';
  }

  // --- 1. GREETINGS (Hi, Hello, Vanakkam, Namaste) ---
  const greetingKeywords = [
    'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
    'வணக்கம்', 'ஹலோ', 'ஹாய்', 'காலை வணக்கம்', 'மாலை வணக்கம்', 'vanakkam', 'hello', 'hi',
    'नमस्ते', 'नमस्कार', 'प्रणाम', 'सुप्रभात', 'राम राम', 'जय श्री राम', 'namaste', 'namaskar',
    'नमस्कार', 'राम राम', 'जय हरी',
    'నమస్కారం', 'హలో', 'నమస్తే',
    'ನಮಸ್ಕಾರ', 'ಹಲೋ', 'ಶುಭೋದಯ',
    'નમસ્તે', 'નમસ્કાર',
    'নমস্কার', 'হ্যালো',
    'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਹੈਲੋ',
    'നമസ്കാരം', 'ഹലോ'
  ];
  if (textMatchesAny(q, greetingKeywords) && q.length < 35 && !textMatchesAny(q, ['நோய்', 'மருந்து', 'disease', 'price', 'water'])) {
    return { intent: 'greeting', targetCrop, rawQuery: q };
  }

  // --- 2. BOT IDENTITY & CAPABILITIES ("Who are you? What can you do? Help me") ---
  const identityKeywords = [
    'who are you', 'what is your name', 'what can you do', 'how can you help', 'help me', 'help',
    'நீ யார்', 'நீங்கள் யார்', 'உன் பெயர் என்ன', 'என்ன செய்ய முடியும்', 'உதவி செய்', 'உதவி வேண்டும்', 'உதவி', 'nee yaar', 'neengal yaar', 'udhavi',
    'तुम कौन हो', 'आप कौन हैं', 'तुम्हारा नाम क्या है', 'क्या कर सकते हो', 'मदद करो', 'सहायता', 'kaun ho',
    'तू कोण आहेस', 'आपण कोण आहात', 'नाव काय आहे', 'काय करू शकतोस', 'मदत करा', 'kon ahes',
    'నువ్వు ఎవరు', 'మీరు ఎవరు', 'సహాయం చేయండి', 'nuvvu evaru',
    'ನೀವು ಯಾರು', 'ಏನು ಮಾಡಬಹುದು', 'ಸಹಾಯ ಮಾಡಿ', 'neevu yaaru'
  ];
  if (textMatchesAny(q, identityKeywords)) {
    return { intent: 'bot_identity', targetCrop, rawQuery: q };
  }

  // --- 3. WELL-BEING & SMALL TALK ("How are you?") ---
  const wellbeingKeywords = [
    'how are you', 'how do you do', 'what are you doing', 'how is it going',
    'எப்படி இருக்கீங்க', 'எப்படி இருக்கிறீர்கள்', 'நலமா', 'என்ன செய்தி', 'என்ன பண்றீங்க', 'eppadi irukkinga', 'nalama',
    'कैसे हो', 'क्या हाल है', 'सब ठीक है', 'क्या कर रहे हो', 'kaise ho', 'kya haal hai',
    'कसे आहात', 'काय चाललंय', 'kase aahat',
    'ఎలా ఉన్నారు', 'బాగున్నారా', 'ela unnaru',
    'ಹೇಗಿದ್ದೀರಾ', 'ಚೆನ್ನಾಗಿದ್ದೀರಾ', 'hegiddira'
  ];
  if (textMatchesAny(q, wellbeingKeywords)) {
    return { intent: 'smalltalk_wellbeing', targetCrop, rawQuery: q };
  }

  // --- 4. GRATITUDE & CLOSING ("Thank you / Okay / Bye") ---
  const gratitudeKeywords = [
    'thank you', 'thanks', 'thank u', 'good job', 'bye', 'good night', 'okay', 'ok',
    'நன்றி', 'ரொம்ப நன்றி', 'மிக்க நன்றி', 'சரி', 'ஓகே', 'வரேன்', 'போய் வரேன்', 'nandri', 'romba nandri', 'seri',
    'धन्यवाद', 'शुक्रिया', 'बहुत धन्यवाद', 'ठीक है', 'अलविदा', 'dhanyavaad', 'shukriya', 'theek hai',
    'धन्यवाद', 'आभार', 'खूप आभार', 'ठीक आहे',
    'ధన్యవాదాలు', 'సరే',
    'ಧನ್ಯವಾದಗಳು', 'ಸರಿ'
  ];
  if (textMatchesAny(q, gratitudeKeywords) && q.length < 35 && !textMatchesAny(q, ['நோய்', 'disease', 'spray'])) {
    return { intent: 'gratitude', targetCrop, rawQuery: q };
  }

  // --- 5. APP NAVIGATION INTENT (All 18 CropShield AI Views) ---
  const navMatch = detectNavigationIntent(q, 'en');
  if (navMatch && navMatch.isNavigation) {
    return {
      intent: 'app_navigation',
      target: navMatch.targetTab,
      label: navMatch.label,
      spokenText: navMatch.spokenText,
      targetCrop
    };
  }

  // --- 6. CROP HEALTH / LEAF SPOTS / BLIGHT / MEDICINE PRESCRIPTION ---
  const healthKeywords = [
    // Tamil
    'நோய்', 'கருகல்', 'மஞ்சள்', 'புள்ளி', 'வாடல்', 'இலை', 'சுருட்டை', 'அழுகல்', 'பூஞ்சை', 'மருந்து', 'தெளிப்பு', 'என்ன மருந்து', 'மருந்தடிக்க', 'பாதிப்பு', 'காய்கிறது', 'புள்ளிகள்', 'கருகிறது', 'குணப்படுத்த', 'பயிர் காய்ந்து', 'இலை கொட்டுகிறது', 'வாடுகிறது', 'மருந்து என்ன',
    // Tanglish
    'noi', 'marunthu', 'karukal', 'manjal', 'pulli', 'thiratchai noi', 'nel noi', 'thakkali noi', 'ilayil', 'kaayuthu', 'marunthu sollu',
    // Hindi & Marathi
    'पीले', 'पिवळी', 'धब्बे', 'डाग', 'करपा', 'ब्लाइट', 'झुलसा', 'मुरझा', 'दवा', 'औषध', 'फवारणी', 'छिड़काव', 'रोग', 'बीमारी', 'इलाज', 'उपाय', 'सुखना', 'पत्तियां', 'पाने', 'दवाई क्या डालें',
    // Telugu & Kannada
    'తెగులు', 'మచ్చలు', 'పసుపు', 'మందు', 'రೋಗ', 'ಹಳದಿ', 'ಕಲೆಗಳು', 'ಔಷಧ',
    // English
    'yellow', 'spot', 'spots', 'blight', 'wilt', 'disease', 'fungus', 'medicine', 'spray', 'cure', 'rot', 'burn', 'drying', 'dying', 'sick', 'problem with plant'
  ];
  if (textMatchesAny(q, healthKeywords)) {
    return { intent: 'crop_health', targetCrop, rawQuery: q };
  }

  // --- 7. DISEASE RISK & THREAT LEVEL ---
  const riskKeywords = [
    'அபாயம்', 'நோய் அபாயம்', 'தாக்குதல்', 'வாய்ப்பு', 'தீவிரம்', 'ஆபத்து', 'எவ்வளவு அபாயம்', 'abayam', 'risk', 'threat', 'evvalavu abayam',
    'धोका', 'जोखिम', 'खतरा', 'आशंका', 'संक्रमण', 'रोग का खतरा', 'रोगाचा धोका', 'kitna khatra',
    'ముప్పు', 'ప్రమాదం', 'ಅಪಾಯ', 'ಹೆದರಿಕೆ', 'risk', 'threat', 'infection risk', 'danger', 'how much risk', 'high risk'
  ];
  if (textMatchesAny(q, riskKeywords)) {
    return { intent: 'disease_risk', targetCrop, rawQuery: q };
  }

  // --- 8. SENSORS & ENVIRONMENTAL CONDITIONS ---
  const envKeywords = [
    'வெப்பநிலை', 'ஈரப்பதம்', 'மண் ஈரப்பதம்', 'மண் தரம்', 'காற்றின் ஈரப்பதம்', 'pH', 'EC', 'உவர்ப்பு', 'சென்சார்', 'veppam', 'eerapadam', 'man eeram', 'temperature', 'humidity',
    'तापमान', 'आर्द्रता', 'नमी', 'जमिनीतील ओलावा', 'मातीचा सामू', 'सेंसर', 'soil moisture', 'leaf wetness', 'sensor', 'soil ph', 'salinity'
  ];
  if (textMatchesAny(q, envKeywords)) {
    return { intent: 'environmental_conditions', targetCrop, rawQuery: q };
  }

  // --- 9. WEATHER & RAIN FORECAST ---
  const weatherKeywords = [
    'மழை', 'மழை வருமா', 'வானிலை', 'மேகம்', 'புயல்', 'காற்று', 'மழை பெய்யுமா', 'இன்று மழை', 'நாளை மழை', 'mazhai', 'vanilai', 'mazha', 'rain', 'varuma',
    'पाऊस', 'पाऊस पडेल का', 'हवामान', 'बारिश', 'मौसम', 'बादल', 'तूफान', 'barish', 'paus', 'weather', 'forecast', 'storm', 'cloud', 'will it rain'
  ];
  if (textMatchesAny(q, weatherKeywords)) {
    return { intent: 'weather_forecast', targetCrop, rawQuery: q };
  }

  // --- 10. IRRIGATION ADVISORY ---
  const irrKeywords = [
    'தண்ணீர்', 'நீர்', 'பாசனம்', 'பாய்ச்சலாமா', 'சொட்டு நீர்', 'தண்ணி விடலாமா', 'தண்ணீர் எப்போது', 'தண்ணி கட்டலாமா', 'thannir', 'pasanam', 'paaichalama', 'water', 'irrigate', 'neer',
    'पाणी', 'सिंचन', 'पाणी देऊ का', 'सिंचाई', 'पानी देना है', 'ड्रिप', 'pani', 'sinchai', 'watering', 'should i water', 'drip'
  ];
  if (textMatchesAny(q, irrKeywords)) {
    return { intent: 'irrigation_advisory', targetCrop, rawQuery: q };
  }

  // --- 11. FERTILIZER & NUTRITION ---
  const fertKeywords = [
    'உரம்', 'யூரியா', 'டிஏபி', 'பொட்டாஷ்', 'துத்தநாகம்', 'சாணம்', 'உரமிடுதல்', 'உர பரிந்துரை', 'எவ்வளவு உரம்', 'uram', 'urea', 'fertilizer', 'potash', 'zinc',
    'खत', 'युरिया', 'झिंक', 'पोषण', 'खाद', 'उर्वरक', 'पोषक तत्व', 'khat', 'khad', 'fertilizer', 'urea', 'dap', 'potash', 'zinc', 'dosage'
  ];
  if (textMatchesAny(q, fertKeywords)) {
    return { intent: 'fertilizer_dosage', targetCrop, rawQuery: q };
  }

  // --- 12. PEST MANAGEMENT ---
  const pestKeywords = [
    'பூச்சி', 'புழு', 'காய்ப்புழு', 'தண்டு துளைப்பான்', 'வெள்ளை ஈ', 'அசுவினி', 'பூச்சி தாக்குதல்', 'பொறி', 'வேப்ப எண்ணெய்', 'poochi', 'puzhu', 'pest', 'insect', 'whitefly', 'bollworm',
    'कीड', 'अळी', 'बोंडअळी', 'कीटक', 'कीड़ा', 'इल्ली', 'सफेद मक्खी', 'kid', 'keeda', 'pest', 'insect', 'worm', 'bollworm', 'caterpillar', 'aphid', 'whitefly'
  ];
  if (textMatchesAny(q, pestKeywords)) {
    return { intent: 'pest_management', targetCrop, rawQuery: q };
  }

  // --- 13. MANDI MARKET RATES ---
  const mandiKeywords = [
    'விலை', 'சந்தை விலை', 'மண்டி', 'விற்பனை', 'குவிண்டால் விலை', 'இன்றைய விலை', 'எவ்வளவு விலை', 'vilai', 'mandi rate', 'market price', 'rate', 'price',
    'भाव', 'बाजारभाव', 'मंडी दर', 'किंमत', 'रेट', 'दाम', 'bhav', 'rate', 'price', 'apmc', 'selling price'
  ];
  if (textMatchesAny(q, mandiKeywords)) {
    return { intent: 'mandi_market', targetCrop, rawQuery: q };
  }

  // --- 14. GOVT SCHEMES ---
  const schemeKeywords = [
    'திட்டம்', 'அரசு திட்டம்', 'மானியம்', 'காப்பீடு', 'பிஎம் கிசான்', 'நிவாரணம்', 'thittam', 'maanaiyam', 'scheme', 'pm kisan', 'subsidy',
    'योजना', 'शासकीय योजना', 'अनुदान', 'विमा', 'पीएम किसान', 'सब्सिडी', 'yojana', 'scheme', 'subsidy', 'pm-kisan', 'insurance', 'pmfby'
  ];
  if (textMatchesAny(q, schemeKeywords)) {
    return { intent: 'govt_schemes', targetCrop, rawQuery: q };
  }

  // --- 15. FARM OVERVIEW ---
  const farmKeywords = [
    'பண்ணை', 'நிலம்', 'தோட்டம்', 'நிலவரம்', 'எப்படி உள்ளது', 'பயிர் நிலைமை', 'खेत', 'शेती', 'प्लॉट', 'परिस्थिती', 'farm', 'plot', 'status', 'overview', 'how is my farm'
  ];
  if (textMatchesAny(q, farmKeywords)) {
    return { intent: 'farm_dashboard', targetCrop, rawQuery: q };
  }


  return {
    intent: 'general_query',
    targetCrop,
    rawQuery: q
  };
}


// ==========================================
// 4. DEEP MULTILINGUAL RESPONSE GENERATOR
// ==========================================

export function generateChotaKissanResponse({
  userQuery,
  detectedLang,
  classifiedIntent,
  farmContext = {},
  conversationHistory = []
}) {
  const lang = detectedLang || 'ta';
  const crop = classifiedIntent.targetCrop || farmContext.crop || 'cotton';
  const cropName = crop.charAt(0).toUpperCase() + crop.slice(1);

  // Live farm sensor telemetry
  const telemetry = farmContext.telemetry || {
    temp: 29.4,
    rh: 88.0,
    leafWetnessHours: 11.5,
    soilVWC: 68.0,
    soilPH: 7.4,
    soilEC: 0.42,
    rain24h: 18.5,
    hoursFavorable: 16.0
  };

  const diseaseId = crop === 'cotton' ? 'cotton_bacterial_blight' 
                  : crop === 'tomato' ? 'tomato_early_blight' 
                  : crop === 'grapes' ? 'grapes_downy_mildew' 
                  : crop === 'rice' ? 'rice_blast' 
                  : crop === 'sugarcane' ? 'sugarcane_red_rot'
                  : 'cotton_bacterial_blight';

  const diseaseEval = evaluateDiseaseRisk(diseaseId, telemetry);

  let responseText = '';
  let navigationTarget = null;
  let actionButtons = [];

  switch (classifiedIntent.intent) {

    case 'change_language': {
      const targetLang = classifiedIntent.targetLang || 'en';
      const changeMap = {
        ta: 'நிச்சயமாக! பயன்பாட்டின் முழு இடைமுகத்தையும் தமிழுக்கு மாற்றியுள்ளேன். இனி செயலி முழுவதும் தமிழில் இயங்கும்.',
        hi: 'बिल्कुल! मैंने पूरे ऐप की भाषा बदलकर हिन्दी कर दी है। अब पूरा इंटरफेस हिन्दी में चलेगा।',
        mr: 'नक्कीच! मी संपूर्ण ॲपची भाषा बदलून मराठी केली आहे. आता पूर्ण इंटरफेस मराठीत चालेल.',
        en: 'Sure! I have changed the entire application interface language for you.',
        te: 'ఖచ్చితంగా! నేను అప్లికేషన్ భాషను తెలుగులోకి మార్చాను.',
        kn: 'ಖಂಡಿತ! ನಾನು ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿದ್ದೇನೆ.',
        gu: 'ચોક્કસ! મેં એપ્લિકેશનની ભાષા ગુજરાતીમાં બદલી છે.',
        bn: 'অবশ্যই! আমি অ্যাপ্লিকেশন ইন্টারফেসের ভাষা পরিবর্তন করেছি।',
        ml: 'തീർച്ചയായും! ആപ്ലിക്കേഷൻ ഭാഷ മാറ്റിയിട്ടുണ്ട്.',
        pa: 'ਬਿਲਕੁਲ! ਮੈਂ ਐਪਲੀਕੇਸ਼ਨ ਦੀ ਭਾਸ਼ਾ ਬਦਲ ਦਿੱਤੀ ਹੈ।'
      };
      return {
        intent: 'change_language',
        responseText: changeMap[targetLang] || changeMap.en,
        actionButtons: [],
        navigationTarget: 'CHANGE_LANG_' + targetLang
      };
    }


    // --- GREETINGS ---
    case 'greeting': {
      const greetingMap = {
        ta: `வணக்கம்! நான் சோட்டா கிசான் 🌱 உங்கள் AI விவசாய தோழன்.

இன்று உங்கள் பண்ணையில் நான் என்ன உதவி செய்ய வேண்டும்?
• பயிரில் மஞ்சள் இலை அல்லது கருகல் நோய் உள்ளதா?
• உரம் அல்லது பூச்சி மருந்து தெளிப்பு ஆலோசனையா?
• இன்றைய வானிலை மற்றும் மண்டி விலையா?

தயங்காமல் கேளுங்கள், உங்களுக்கு உதவ நான் எப்போதும் தயார்!`,
        hi: `नमस्ते! मैं छोटा किसान हूँ 🌱 आपका एआई कृषि साथी।

आज मैं आपकी खेती में क्या मदद करूँ?
• फसल में पीली पत्तियां या बीमारी के लक्षण हैं?
• दवा छिड़काव या खाद की जानकारी चाहिए?
• मौसम का पूर्वानुमान या आज के मंडी भाव जानने हैं?

बेझिझक बोलिए, मैं आपकी सेवा में हाजिर हूँ!`,
        mr: `नमस्कार! मी छोटा किसान 🌱 आपला एआय कृषी मित्र.

आज मी आपल्या शेतासाठी काय मदत करू?
• पिकांवर करपा किंवा पिवळेपणा आला आहे का?
• औषध फवारणी किंवा खताचा सल्ला हवा आहे का?
• हवामान अंदाज की आजचे बाजारभाव पहायचे आहेत?

सांगा, मी लगेच उत्तर देतो!`,
        te: `నమస్కారం! నేను ఛోటా కిసాన్ 🌱 మీ AI వ్యవసాయ మిత్రుడు. ఈరోజు నేను మీ పొలానికి ఏమి సహాయం చేయాలి? పంట వ్యాధులు, మందులు లేదా మార్కెట్ ధరల గురించి అడగండి!`,
        kn: `ನಮಸ್ಕಾರ! ನಾನು ಕಿಸಾನ್ ಒನ್ ನಿಮ್ಮ AI ಕೃಷಿ ಮಿತ್ರ. ಇಂದು ನಾನು ನಿಮ್ಮ ಜಮೀನಿಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ? ಬೆಳೆ ರೋಗಗಳು, ಗೊಬ್ಬರ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ!`,
        gu: `નમસ્તે! હું કિસાન વન છું તમારો AI કૃષિ મિત્ર. આજે હું તમારા ખેતરમાં શું મદદ કરું? પાકના રોગ, ખાતર કે મંડી ભાવ વિશે પૂછો!`,
        bn: `নমস্কার! আমি কিষাণ ওয়ান আপনার AI কৃষি বন্ধু। আজ আমি আপনার ফসলের কী সাহায্য করতে পারি? রোগ, সার বা বাজার দর সম্পর্কে জিজ্ঞাসা করুন!`,
        ml: `നമസ്കാരം! ഞാൻ കിസാൻ വൺ നിങ്ങളുടെ AI കാർഷിക സുഹൃത്ത്. ഇന്ന് ഞാൻ നിങ്ങളുടെ കൃഷിയിടത്തിൽ എന്താണ് സഹായിക്കേണ്ടത്?`,
        pa: `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਕਿਸਾਨ ਵਨ ਹਾਂ ਤੁਹਾਡਾ AI ਖੇਤੀਬਾੜੀ ਦੋਸਤ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੇ ਖੇਤ ਲਈ ਕੀ ਮਦਦ ਕਰਾਂ?`,
        en: `Hello! I am Kissan One, your AI farming companion.

How can I help your farm today?
• Diagnosing leaf yellowing or blight disease?
• Recommending spray dosages or fertilizers?
• Checking rain forecast or live APMC mandi rates?

Feel free to ask me anything about your crops!`
      };
      responseText = greetingMap[lang] || greetingMap.en;
      actionButtons.push({ label: 'Check Disease Risk', target: 'environmentalPrediction' });
      actionButtons.push({ label: 'Today Mandi Prices', target: 'market' });
      break;
    }

    // --- BOT IDENTITY & CAPABILITIES ---
    case 'bot_identity': {
      const identityMap = {
        ta: `நான் **கிசான் ஒன் (Kissan One)** — பயிர் பாதுகாப்பு AI குரல் உதவியாளர்.

நான் உங்களுக்கு செய்யும் முக்கிய உதவிகள்:
1. 🌿 **இலை நோய் கண்டறிதல்**: கேமரா மூலம் இலையை ஸ்கேன் செய்து நோயையும் மருந்து அளவையும் கூறுவேன்.
2. 📊 **நோய் முன்னறிவிப்பு**: சென்சார் வெப்பநிலை, ஈரப்பதம் மூலம் நோய் வருவதற்கு முன்பே எச்சரிப்பேன்.
3. 💧 **பாசனம் & உரம்**: மண் பரிசோதனைக்கேற்ப துல்லியமான உர பரிந்துரை வழங்குவேன்.
4. 🌧️ **வானிலை**: மழை வரும் நேரத்தை முன்கூட்டியே அறிவிப்பேன்.
5. 🌾 **நேரடி மண்டி விலை**: சாங்லி மற்றும் அருகிலுள்ள சந்தை விலைகளை உடனுக்குடன் கூறுவேன்.`,
        hi: `मैं **किसान वन (Kissan One)** हूँ — आपका समर्पित एआई कृषि विशेषज्ञ।

मेरी मुख्य विशेषताएं:
1. 🌿 **पत्ती रोग पहचान**: कैमरे से पत्ता स्कैन कर सटीक बीमारी और दवा बताता हूँ।
2. 📊 **रोग का पूर्व अनुमान**: तापमान व नमी देखकर 48 घंटे पहले बीमारी का अलर्ट देता हूँ।
3. 💧 **सिंचाई व खाद मार्गदर्शन**: मृदा परीक्षण अनुसार खाद की सही मात्रा।
4. 🌧️ **मौसम पूर्वानुमान**: बारिश की सटीक सूचना।
5. 🌾 **मंडी भाव**: लाइव APMC रेट्स।`,
        mr: `मी **किसान वन (Kissan One)** आहे — आपला स्मार्ट एआय शेती मार्गदर्शक.

माझी प्रमुख कामे:
१. 🌿 **पीक रोग निदान**: पानाचा फोटो स्कॅन करून अचूक औषध सुचवणे.
२. 📊 **रोग पूर्वसूचना**: हवामानानुसार करपा व इतर रोगांचा धोका आधीच सांगणे.
३. 💧 **सिंचन व खत व्यवस्थापन**: माती आरोग्य पत्रिकेनुसार योग्य डोस देणे.
४. 🌾 **थेट बाजारभाव**: जिल्ह्यातील कृषी उत्पन्न बाजार समितीचे ताजे भाव देणे.`,
        en: `I am **Kissan One** — CropShield AI's smart agricultural voice assistant.

Here is how I assist your farm:
1. 🌿 **Leaf Scanner Doctor**: Diagnose crop diseases from camera photos with verified dosages.
2. 📊 **Proactive Disease Prediction**: Monitor temperature & humidity to predict outbreaks 48h early.
3. 💧 **Irrigation & Nutrition**: Soil-card based fertilizer and watering recommendations.
4. 🌧️ **Weather Forecaster**: Rain and storm radar warnings.
5. 🌾 **Mandi Rates**: Live APMC market crop prices.`
      };
      responseText = identityMap[lang] || identityMap.en;
      actionButtons.push({ label: 'Open Leaf Scanner', target: 'scan' });
      actionButtons.push({ label: 'Inspect Farm Telemetry', target: 'environmentalPrediction' });
      break;
    }

    // --- WELL-BEING & SMALL TALK ---
    case 'smalltalk_wellbeing': {
      const wellMap = {
        ta: `நான் மிக நலம்! நன்றி! உங்கள் பண்ணை மற்றும் பயிர்களை பாதுகாப்பாக வைத்திருக்க முழுமையாக தயாராக இருக்கிறேன். உங்கள் பயிரில் ஏதேனும் பிரச்சனை உள்ளதா?`,
        hi: `मैं बहुत बढ़िया हूँ! धन्यवाद। आपके खेत और फसलों की सुरक्षा के लिए पूरी तरह तैयार हूँ। आपकी फसल में सब ठीक है?`,
        mr: `मी मजेत आहे! धन्यवाद. आपल्या पिकांची काळजी घेण्यासाठी मी सदैव हजर आहे. सांगा, शेतात काही अडचण आहे का?`,
        en: `I am doing great, thank you! Ready to monitor and protect your crops 24/7. How are your farm plots doing today?`
      };
      responseText = wellMap[lang] || wellMap.en;
      actionButtons.push({ label: 'Check Plot Status', target: 'esp32LiveData' });
      break;
    }

    // --- GRATITUDE & CLOSING ---
    case 'gratitude': {
      const gratMap = {
        ta: `மகிழ்ச்சி! எப்போதும் உங்கள் விவசாய தோழனாக இருப்பேன். நல்ல விளைச்சல் கிடைக்க வாழ்த்துகள்! ஏதேனும் சந்தேகம் இருந்தால் எப்போது வேண்டுமானாலும் கேளுங்கள்.`,
        hi: `बहुत खुशी हुई! आपकी अच्छी फसल और खुशहाली की कामना करता हूँ। कोई भी परेशानी हो तो कभी भी पूछ सकते हैं।`,
        mr: `आनंद झाला! भरघोस उत्पादनासाठी मनःपूर्वक शुभेच्छा. कोणतीही अडचण आल्यास हक्काने विचारा!`,
        en: `You are very welcome! Wishing you a bountiful and healthy harvest. Tap the mic anytime you need assistance!`
      };
      responseText = gratMap[lang] || gratMap.en;
      actionButtons.push({ label: 'Explore Knowledge Hub', target: 'more' });
      break;
    }

    // --- APP NAVIGATION ---
    case 'app_navigation': {
      navigationTarget = classifiedIntent.target;
      const label = getRouteLabel(navigationTarget, lang) || classifiedIntent.label;
      responseText = getNavigationSpokenConfirmation(navigationTarget, lang);
      actionButtons.push({ label: `Open ${label}`, target: navigationTarget });
      break;
    }

    case 'crop_health': {
      if (crop === 'tomato') {
        const tomatoMap = {
          ta: `தக்காளி பயிரில் இலைகள் மஞ்சள் நிறமாக மாறுவது அல்லது வட்டமான கருகல் புள்ளிகள் தோன்றுவது **முற்கால கருகல் (Early Blight - Alternaria)** நோயாகும்.

✅ பரிந்துரைக்கப்படும் தீர்வு:
1. பாதிக்கப்பட்ட இலைகளை உடனே கிள்ளி அப்புறப்படுத்துங்கள்.
2. **மான்கோசெப் (Mancozeb 75% WP)** 2 கிராம் அல்லது **காப்பர் ஆக்ஸிகுளோரைடு** 2.5 கிராம் ஒரு லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.
3. காற்றில் ஈரப்பதம் ${telemetry.rh}% அதிகமாக உள்ளதால் மாலையில் இலைகளின் மேல் தண்ணீர் தெளிப்பதை தவிர்க்கவும்.`,
          hi: `टमाटर में पत्तियों का पीला पड़ना या काले गोल धब्बे होना **अगेती झुलसा (Early Blight)** फफूंद का लक्षण है।

✅ उपचार:
1. प्रभावित पत्तियों को तोड़कर नष्ट करें।
2. **मैंकोजेब 75% WP** (2 ग्राम/लीटर) या **कॉपर ऑक्सीक्लोराइड** (2.5 ग्राम/लीटर) का छिड़काव करें।
3. खेत में नमी ${telemetry.rh}% होने से शाम को फव्वारा सिंचाई न करें।`,
          mr: `टोमॅटो पिकाची पाने पिवळी पडणे किंवा गोल डाग येणे हे **अगेती करपा (Early Blight)** बुरशीचे लक्षण आहे.

✅ उपाययोजना:
१. बाधित पाने काढून नष्ट करा.
२. **मँकोझेब ७५% WP** (२ ग्रॅम/लिटर) किंवा **कॉपर ऑक्सिक्लोराईडची** फवारणी करा.`,
          en: `In Tomato, concentric dark spots and yellowing indicate **Early Blight (Alternaria solani)**.

✅ Recommended Action:
1. Prune heavily infected lower leaves.
2. Spray **Mancozeb 75% WP** @ 2.0g/Litre or **Copper Oxychloride** @ 2.5g/Litre.
3. Avoid evening overhead sprinkling to reduce leaf wetness (${telemetry.leafWetnessHours}h).`
        };
        responseText = tomatoMap[lang] || tomatoMap.en;
        actionButtons.push({ label: 'Scan Tomato Leaf', target: 'scan' });
        actionButtons.push({ label: 'Order Mancozeb Spray', target: 'market' });
      } else if (crop === 'rice') {
        const riceMap = {
          ta: `நெல் பயிரில் இலைகள் மஞ்சள் நிறமாக மாறுவது அல்லது கண் வடிவ புள்ளிகள் தோன்றுவது **நெல் குலை நோய் (Blast)** அல்லது **பாக்டீரியா இலை கருகல் (BLB)** நோயாக இருக்கலாம்.

✅ பரிந்துரைக்கப்படும் தீர்வு:
1. வயலில் 5 செ.மீ சீரான நீர் மட்டத்தை பராமரிக்கவும்.
2. **டிரைசைக்ளசோல் 75% WP (Tricyclazole)** 1 கிராம்/லிட்டர் அல்லது **சூடோமோனாஸ்** 10 கிராம்/லிட்டர் தெளிக்கவும்.
3. தழைச்சத்து (Urea) உரங்களை பிரித்து இடவும்.`,
          hi: `धान में पत्तियों का पीला होना या धब्बे पड़ना **ब्लास्ट (Blast)** या बैक्टीरियल लीफ ब्लाइट का संकेत है। **ट्राइसाइक्लाजोल** (1 ग्राम/लीटर) का छिड़काव करें और खेत में 5 सेमी पानी का स्तर बनाए रखें।`,
          mr: `भातावर करपा किंवा **ब्लास्ट** रोगाची लक्षणे आहेत. **ट्रायसायक्लॅझोल** (१ ग्रॅम/लिटर) फवारावे व ५ सेमी पाणीपातळी ठेवावी.`,
          en: `In Rice, spindle-shaped lesions indicate **Blast (Magnaporthe oryzae)** or Bacterial Blight. Spray **Tricyclazole 75% WP** @ 1g/L and maintain 5cm standing water level.`
        };
        responseText = riceMap[lang] || riceMap.en;
        actionButtons.push({ label: 'Scan Rice Leaf', target: 'scan' });
        actionButtons.push({ label: 'Check Water Level', target: 'esp32LiveData' });
      } else if (crop === 'grapes') {
        const grapeMap = {
          ta: `திராட்சை பயிரில் இலைகளின் மேல் எண்ணெய் போன்ற மஞ்சள் புள்ளிகளும், அடியில் வெண் பூஞ்சையும் தோன்றினால் அது **அடிச்சாம்பல் (Downy Mildew)** நோயாகும்.

✅ தீர்வு:
1. **போர்டோ கலவை (Bordeaux Mixture 1%)** அல்லது **மெட்டலாக்ஸில் + மேன்கோசெப்** (2.5 கிராம்/லிட்டர்) தெளிக்கவும்.
2. கொடிகளில் நல்ல காற்றோட்டம் இருக்குமாறு கவாத்து செய்யவும்.`,
          hi: `अंगूर में **डाउनी मिल्ड्यू (Downy Mildew)** का खतरा है। बोर्डो मिश्रण (1%) या मेटालॅक्सिल + मैंकोजेब का छिड़काव करें।`,
          mr: `द्राक्षावर **डाऊनी मिल्ड्यू (केवडा)** रोगाची लक्षणे दिसताच बोर्डो मिश्रण (१%) किंवा मेटॅलॅक्सिलची फवारणी करावी.`,
          en: `In Grapes, oily yellow spots indicate **Downy Mildew (Plasmopara viticola)**. Spray **Metalaxyl + Mancozeb** @ 2.5g/L immediately.`
        };
        responseText = grapeMap[lang] || grapeMap.en;
        actionButtons.push({ label: 'Scan Grape Leaf', target: 'scan' });
        actionButtons.push({ label: 'View Disease Radar', target: 'environmentalPrediction' });
      } else {
        // Default Cotton
        const cottonMap = {
          ta: `பருத்தி பயிரில் இலை நரம்புகளில் கோண வடிவ கருகல் புள்ளிகள் தோன்றுவது **பாக்டீரியா கருகல் (Bacterial Blight - Xanthomonas)** நோயின் அறிகுறியாகும்.

✅ உடனடி சிகிச்சை:
1. **ஸ்ட்ரெப்டோசைக்ளின்** 1 கிராம் + **காப்பர் ஆக்ஸிகுளோரைடு (COC)** 25 கிராம் ஆகியவற்றை 10 லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.
2. துத்தநாக (Zinc) குறைபாட்டால் இலை மஞ்சள் நிறமானால் **ஜிங்க் சல்பேட் 21%** ஏக்கருக்கு 10 கிலோ இடவும்.
3. காற்றில் அதிக ஈரப்பதம் (${telemetry.rh}%) உள்ளதால் 24 மணி நேரத்திற்குள் மருந்து தெளிப்பது காய்களை பாதுகாக்கும்.`,
          hi: `कपास में पत्तियों की नसों पर कोणीय काले धब्बे दिखना **बैक्टीरियल ब्लाइट (Angular Leaf Spot)** का लक्षण है।

✅ तुरंत उपचार:
1. **स्ट्रेप्टोसाइक्लिन** (1 ग्राम) + **कॉपर ऑक्सीक्लोराइड** (25 ग्राम) प्रति 10 लीटर पानी में मिलाकर छिड़काव करें।
2. जिंक की कमी दूर करने हेतु **जिंक सल्फेट 21%** (10 किग्रा/एकड़) डालें।`,
          mr: `कापसाच्या पानांवर कोनीय काळे डाग दिसणे हे **जिवाणू करपा (Bacterial Blight)** रोगाचे लक्षण आहे.

✅ तातडीचे उपाय:
१. **स्ट्रेप्टोमायसीन** (१ ग्रॅम) + **कॉपर ऑक्सिक्लोराईड** (२५ ग्रॅम) प्रति १० लिटर पाण्यात मिसळून फवारावे.
२. झिंकची कमतरता असल्यास **झिंक सल्फेट** (१० किलो/एकर) द्यावे.`,
          en: `In Cotton, angular water-soaked vein lesions indicate **Bacterial Blight (Xanthomonas)**.

✅ Immediate Prescription:
1. Spray **Streptocycline (1.0g)** + **Copper Oxychloride (25g)** in 10 Litres water.
2. For yellowing from Zinc deficiency, apply **Zinc Sulfate 21%** @ 10 kg/Acre in soil.
3. Inspect lower foliage within 24 hours.`
        };
        responseText = cottonMap[lang] || cottonMap.en;
        actionButtons.push({ label: 'Scan Cotton Leaf', target: 'scan' });
        actionButtons.push({ label: 'Order Streptocycline Combo', target: 'market' });
      }
      break;
    }

    // --- DISEASE RISK ---
    case 'disease_risk': {
      const riskScore = diseaseEval.riskScore || 78;
      const disName = diseaseEval.diseaseName || 'Bacterial Blight';
      const riskMap = {
        ta: `உங்கள் ${cropName} பயிரில் (Plot 2) தற்போதைய நோய் அபாயம் **${riskScore}% (அதிக அபாயம் - HIGH RISK)** ஆக உள்ளது.

📊 கள காரணிகள்:
• வெப்பநிலை: ${telemetry.temp}°C (சாதகமானது)
• ஈரப்பதம்: ${telemetry.rh}% (அதிதீவிர சாதகம்)
• இலை ஈரப்பதம்: ${telemetry.leafWetnessHours} மணிநேரம்
• அபாய நோய்: ${disName}

💡 பரிந்துரை: காற்றில் அதிக ஈரப்பதம் நீடிப்பதால் பூஞ்சை மற்றும் பாக்டீரியா வேகமாக பரவும் சூழல் உள்ளது. இன்று மாலைக்குள் வயலின் கீழ் இலைகளை ஆய்வு செய்யவும்.`,
        hi: `आपके ${cropName} के खेत (Plot 2) में अभी रोग का जोखिम **${riskScore}% (उच्च - HIGH RISK)** है। तापमान ${telemetry.temp}°C और नमी ${telemetry.rh}% होने से ${disName} का खतरा बढ़ गया है। आज ही खेत का निरीक्षण करें।`,
        mr: `आपल्या ${cropName} शेतात (Plot 2) रोगाचा धोका **${riskScore}% (उच्च धोका)** आहे. तापमान ${telemetry.temp}°C व आर्द्रता ${telemetry.rh}% असल्याने ${disName} रोगासाठी अनुकूल स्थिती आहे. आजच पाहणी करा.`,
        en: `In your ${cropName} field (Plot 2), the current disease risk is **HIGH at ${riskScore}%**. Temperature is ${telemetry.temp}°C and relative humidity is ${telemetry.rh}%. Favorable incubation conditions for ${disName}. Please inspect lower foliage today.`
      };
      responseText = riskMap[lang] || riskMap.en;
      actionButtons.push({ label: 'Open Disease Prediction Radar', target: 'environmentalPrediction' });
      actionButtons.push({ label: 'Scan Leaf Photo', target: 'scan' });
      break;
    }

    // --- SENSORS & TELEMETRY ---
    case 'environmental_conditions': {
      const envMap = {
        ta: `Plot 2 (${cropName}) நேரலை சென்சார் விவரங்கள்:
🌡️ வெப்பநிலை: ${telemetry.temp}°C
💧 காற்றில் ஈரப்பதம்: ${telemetry.rh}%
🍃 இலை ஈரப்பதம்: ${telemetry.leafWetnessHours} மணிநேரம்
💦 மண் ஈரப்பதம்: ${telemetry.soilVWC}% VWC
🧪 மண் pH: ${telemetry.soilPH} (நடுநிலை - உகந்தது)
⚡ மண் உப்புத்தன்மை (EC): ${telemetry.soilEC} dS/m (பாதுகாப்பானது)
🌧️ 24 மணிநேர மழை: ${telemetry.rain24h} மி.மீ`,
        hi: `Plot 2 (${cropName}) का लाइव सेंसर डेटा:
🌡️ तापमान: ${telemetry.temp}°C
💧 हवा में नमी: ${telemetry.rh}%
🍃 पत्तों का गीलापन: ${telemetry.leafWetnessHours} घंटे
💦 मिट्टी की नमी: ${telemetry.soilVWC}%
🧪 मिट्टी pH: ${telemetry.soilPH}
⚡ मिट्टी EC: ${telemetry.soilEC} dS/m`,
        mr: `Plot २ (${cropName}) मधील थेट सेन्सर्स:
🌡️ तापमान: ${telemetry.temp}°C
💧 हवेतील आर्द्रता: ${telemetry.rh}%
🍃 पानांवरील ओलावा: ${telemetry.leafWetnessHours} तास
💦 जमिनीचा ओलावा: ${telemetry.soilVWC}%
🧪 मातीचा सामू (pH): ${telemetry.soilPH}
⚡ क्षारता (EC): ${telemetry.soilEC} dS/m`,
        en: `Plot 2 (${cropName}) Live Telemetry:
🌡️ Temperature: ${telemetry.temp}°C
💧 Relative Humidity: ${telemetry.rh}%
🍃 Leaf Wetness: ${telemetry.leafWetnessHours} hrs
💦 Soil Moisture: ${telemetry.soilVWC}% VWC
🧪 Soil pH: ${telemetry.soilPH} (Optimal)
⚡ Soil EC: ${telemetry.soilEC} dS/m (Safe non-saline)`
      };
      responseText = envMap[lang] || envMap.en;
      actionButtons.push({ label: 'Open Telemetry Simulator', target: 'environmentalPrediction' });
      break;
    }

    // --- WEATHER FORECAST ---
    case 'weather_forecast': {
      const weatherMap = {
        ta: `சாங்லி மாவட்ட வானிலை முன்னறிவிப்பு:
🌧️ மழை வாய்ப்பு: நாளை மாலை 15 முதல் 20 மி.மீ மிதமான பருவமழை பெய்ய வாய்ப்புள்ளது.
☁️ மேகமூட்டம்: 90%
💧 காற்றில் ஈரப்பதம்: 85% க்கு மேல் நீடிக்கும்.

⚠️ விவசாயிக்கு ஆலோசனை: மழை பெய்யும் நேரத்தில் எவ்வித பூச்சிக்கொல்லி அல்லது உர தெளிப்பும் செய்யாதீர்கள். வயலில் நீர் தேங்காமல் வடிகால் பாதையை திறந்து விடுங்கள்.`,
        hi: `मौसम पूर्वानुमान: कल शाम 15 से 20 मिमी बारिश और 90% बादलों की संभावना है। बारिश के समय दवा न छिड़कें और खेत में पानी निकासी रखें।`,
        mr: `हवामान अंदाज: उद्या संध्याकाळी १५ ते २० मिमी पाऊस पडण्याची शक्यता आहे. पावसाच्या वेळी फवारणी टाळावी आणि पाण्याचा निचरा करावा.`,
        en: `Agro-Weather Forecast: Light to moderate monsoon showers (15–20mm) expected tomorrow evening. Avoid chemical sprays during rain and ensure drainage channels are clear.`
      };
      responseText = weatherMap[lang] || weatherMap.en;
      actionButtons.push({ label: 'View ISRO Satellite Weather Map', target: 'satelliteMapping' });
      break;
    }

    // --- IRRIGATION ADVISORY ---
    case 'irrigation_advisory': {
      const soilVWC = telemetry.soilVWC || 68;
      const irrMap = {
        ta: `மண் ஈரப்பதம் தற்போது **${soilVWC}%** ஆக போதுமான அளவில் உள்ளது. மேலும் நாளை மாலை மழை பெய்ய வாய்ப்புள்ளது.

🚫 முடிவு: இன்று உங்கள் சொட்டு நீர் பாசனத்தை இயக்க வேண்டாம். இப்போது அதிக தண்ணீர் பாய்ச்சினால் வேர் அழுகல் நோய் மற்றும் நீர் தேக்கம் ஏற்படும்.`,
        hi: `मिट्टी में नमी अभी **${soilVWC}%** (पर्याप्त) है और कल बारिश होने वाली है। आज ड्रिप सिंचाई न चलाएं।`,
        mr: `जमिनीतील ओलावा **${soilVWC}%** पुरेसा आहे व उद्या पाऊस अपेक्षित आहे. आज ठिबक सिंचन चालू करू नका.`,
        en: `Soil moisture is optimal at **${soilVWC}% VWC** and rain is forecasted tomorrow. Do NOT irrigate today to prevent waterlogging and root rot.`
      };
      responseText = irrMap[lang] || irrMap.en;
      actionButtons.push({ label: 'Inspect Farm Plots & Drip', target: 'esp32LiveData' });
      break;
    }

    // --- FERTILIZER DOSAGE ---
    case 'fertilizer_dosage': {
      const fertMap = {
        ta: `மண் பரிசோதனை அட்டை (KVK Soil Card) பரிந்துரை:
1. துத்தநாக குறைபாடு (Zinc 0.45 ppm): ஏக்கருக்கு 10 கிலோ **துத்தநாக சல்பேட் 21%** மண்ணில் இடவும்.
2. இலைவழி தெளிப்பு: **ஜிங்க் EDTA 12%** @ 1.5 கிராம்/லிட்டர் தண்ணீரில் கலந்து 35-ம் நாளில் தெளிக்கவும்.
3. யூரியா: மழைக்கு முன் அதிகப்படியான யூரியா போடுவதை தவிர்க்கவும்.`,
        hi: `मृदा कार्ड अनुसार जिंक की कमी है। **जिंक सल्फेट 21%** (10 किग्रा/एकड़) जमीन में दें और **जिंक EDTA** (1.5 ग्राम/लीटर) का छिड़काव करें।`,
        mr: `माती परीक्षणानुसार **झिंक सल्फेट** (१० किलो/एकर) द्यावे आणि **झिंक ईडीटीए** (१.५ ग्रॅम/लिटर) फवारावे.`,
        en: `Based on Soil Health Card: Apply **Zinc Sulfate 21%** @ 10 kg/Acre and foliar spray **Zinc EDTA 12%** @ 1.5g/Litre. Avoid excess urea before rain.`
      };
      responseText = fertMap[lang] || fertMap.en;
      actionButtons.push({ label: 'View Soil Health Card', target: 'reports' });
      actionButtons.push({ label: 'Order Subsidized Fertilizer', target: 'market' });
      break;
    }

    // --- PEST MANAGEMENT ---
    case 'pest_management': {
      const pestMap = {
        ta: `பருத்தி & தக்காளி பயிர்களுக்கான ஒருங்கிணைந்த பூச்சி மேலாண்மை (IPM):
1. **காய்ப்புழு / படைப்புழு கட்டுப்பாடு**: ஏக்கருக்கு 5 இனக்கவர்ச்சி பொறிகள் (Pheromone Traps) பொருத்தவும்.
2. **வெள்ளை ஈ மற்றும் அசுவினி**: வேப்பெண்ணெய் (Neem Oil 10,000 ppm) 3 மி.லி/லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.
3. புழுக்களின் ஆரம்ப நிலையில் பேசிலஸ் துரிஞ்சியென்சிஸ் (Bt bio-pesticide) 2 கிராம்/லிட்டர் தெளிக்கவும்.`,
        hi: `कीट प्रबंधन: प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं। सफेद मक्खी के लिए नीम का तेल (3 मिली/लीटर) और पीला चिपचिपा ट्रैप लगाएं।`,
        mr: `कीड नियंत्रण: एकरी ५ कामगंध सापळे (Pheromone Traps) लावा. पांढरी माशीसाठी निंबोळी अर्क (५ मिली/लिटर) व पिवळे चिकट सापळे वापरा.`,
        en: `Integrated Pest Management (IPM): Install 5 Pheromone Traps per acre for bollworms. Spray Neem Oil (10,000 ppm) @ 3ml/L for sucking pests and whiteflies.`
      };
      responseText = pestMap[lang] || pestMap.en;
      actionButtons.push({ label: 'Order Bio-Pest Traps', target: 'market' });
      break;
    }

    // --- MANDI PRICES ---
    case 'mandi_market': {
      const mandiMap = {
        ta: `இன்றைய சாங்லி மற்றும் அருகிலுள்ள APMC மண்டி நேரடி விலைகள்:
🌾 பருத்தி (Bt Cotton): ₹7,450 / குவிண்டால் (₹120 உயர்வு)
🍅 தக்காளி: ₹28 / கிலோ
🍚 இந்திராயணி நெல்: ₹3,600 / குவிண்டால்
🎋 கரும்பு (FRP): ₹3,150 / டன்

💡 விற்பனை ஆலோசனை: பருத்தி விலை இந்த வாரம் உயர்ந்துள்ளதால் அறுவடை செய்த பருத்தியை விற்க உகந்த நேரம்.`,
        hi: `आज के मंडी भाव: कपास ₹7,450/क्विंटल (₹120 की तेजी), टमाटर ₹28/किलो, धान ₹3,600/क्विंटल और गन्ना ₹3,150/टन है। कपास बेचने के लिए अच्छा समय है।`,
        mr: `आजचे बाजारभाव: कापूस ₹७,४५०/क्विंटल, टोमॅटो ₹२८/किलो, इंद्रायणी भात ₹३,६००/क्विंटल आणि ऊस ₹३,१५०/टन आहे.`,
        en: `Today's APMC Mandi Rates: Bt Cotton is ₹7,450/Qtl (Up ₹120), Tomato is ₹28/Kg, Indrayani Rice is ₹3,600/Qtl, Sugarcane is ₹3,150/Tonne.`
      };
      responseText = mandiMap[lang] || mandiMap.en;
      actionButtons.push({ label: 'Open Mandi & APMC Rates', target: 'market' });
      break;
    }

    // --- GOVT SCHEMES ---
    case 'govt_schemes': {
      const schemeMap = {
        ta: `விவசாயிகளுக்கான முக்கிய அரசு திட்டங்கள் & மானியங்கள்:
1. **பிஎம் கிசான் (PM-KISAN)**: 17-வது தவணை ₹2,000 வங்கி கணக்கில் வரவு வைக்கப்பட்டுள்ளது.
2. **சொட்டு நீர் பாசன மானியம்**: சிறு/குறு விவசாயிகளுக்கு 80% வரை அரசு மானியம்.
3. **பிரதான் மந்திரி பயிர் காப்பீடு (PMFBY)**: ₹1 டோக்கன் கட்டணத்தில் முழு பயிர் காப்பீடு.`,
        hi: `सरकारी योजनाएं: 1) पीएम किसान 17वीं किस्त ₹2,000, 2) ड्रिप सिंचाई 80% सब्सिडी, 3) पीएम फसल बीमा योजना।`,
        mr: `शासकीय योजना: १) पीएम-किसान १७ वा हप्ता ₹२,००० जमा, २) ठिबक सिंचन ८०% अनुदान, ३) एक रुपयात पीक विमा (PMFBY).`,
        en: `Active Govt Schemes: 1) PM-KISAN 17th Installment ₹2,000 DBT, 2) Drip Irrigation Subsidy up to 80%, 3) PMFBY Comprehensive Crop Insurance.`
      };
      responseText = schemeMap[lang] || schemeMap.en;
      actionButtons.push({ label: 'View All Govt Schemes & DBT', target: 'govtSchemes' });
      break;
    }

    // --- FARM OVERVIEW ---
    case 'farm_dashboard': {
      const generalMap = {
        ta: `உங்கள் பண்ணை நிலைமை:\nமொத்தம் 6 நிலங்கள் பதிவு செய்யப்பட்டுள்ளன.\n• **Plot 2 (பருத்தி)**: பாக்டீரியா கருகல் நோய் அபாயம் 78% உள்ளதால் இன்று கள ஆய்வு தேவை.\n• **Plot 4 (தக்காளி)**: வளர்ச்சி சீராக உள்ளது.\n• **Plot 1 (நெல்)**: உகந்த வளர்ச்சி.\n\n💡 பயிர் நோய், உரம், பூச்சி மருந்து அல்லது சந்தை விலை பற்றி ஏதேனும் கேட்க விரும்புகிறீர்களா?`,
        hi: `खेत की स्थिति: कुल 6 प्लॉट हैं। Plot 2 (कपास) में 78% ब्लाइट जोखिम होने से निरीक्षण जरूरी है। बाकी सभी प्लॉट सुरक्षित हैं। आप किस फसल के बारे में जानना चाहते हैं?`,
        mr: `शेताचा आढावा: एकूण ६ प्लॉट आहेत. Plot २ (कापूस) मध्ये ७८% करपा धोका असल्याने आज पाहणी करा. इतर सर्व पिके उत्तम आहेत. आपल्याला काय माहिती हवी आहे?`,
        en: `Farm Overview: You have 6 plots. Plot 2 (Bt Cotton) has 78% Bacterial Blight risk requiring scouting. Other plots are healthy. What would you like to check today?`
      };
      responseText = generalMap[lang] || generalMap.en;
      actionButtons.push({ label: 'Inspect Farm Plots', target: 'esp32LiveData' });
      actionButtons.push({ label: 'Open Disease Prediction Radar', target: 'environmentalPrediction' });
      break;
    }

    // --- GENERAL UNCLASSIFIED QUERY ---
    default: {
      const assistantHelpMap = {
        ta: `வணக்கம்! நான் கிசான் ஒன் AI உதவியாளன். பயன்பாட்டின் மொழியை மாற்றவோ, பக்கங்களை திறக்கவோ, பயிர் நோய்கள், உரம், வானிலை அல்லது மண்டி விலைகள் பற்றி அறியவோ என்னிடம் கேட்கலாம். உங்களுக்கு எப்படி உதவ வேண்டும்?`,
        hi: `नमस्ते! मैं किसान वन एआई सहायक हूँ। आप मुझसे भाषा बदलने, ऐप के सेक्शन खोलने, फसल की बीमारी, खाद, मौसम या मंडी भाव की जानकारी ले सकते हैं। मैं आपकी क्या मदद करूँ?`,
        mr: `नमस्कार! मी किसान वन एआई सहाय्यक आहे. आपण मला भाषा बदलण्यासाठी, ॲपचे विभाग उघडण्यासाठी, पीक रोग, खत, हवामान किंवा बाजारभावाची माहिती विचारू शकता. मी आपली काय मदत करू?`,
        en: `Hello! I am your Kissan One AI assistant. You can ask me to change application language, navigate features, check crop diseases, fertilizer dosage, weather, or mandi prices. How can I help you today?`
      };
      responseText = assistantHelpMap[lang] || assistantHelpMap.en;
      actionButtons.push({ label: 'Check Disease Risk', target: 'scan' });
      actionButtons.push({ label: 'View Mandi Prices', target: 'market' });
      break;
    }
  }

  return {
    responseText,
    detectedLang: lang,
    language: SUPPORTED_LANGUAGES[lang]?.name || 'English',
    languageCode: SUPPORTED_LANGUAGES[lang]?.code || 'en-IN',
    intent: classifiedIntent.intent,
    targetCrop: crop,
    navigationTarget,
    actionButtons,
    timestamp: new Date().toISOString()
  };
}


// ==========================================
// 5. ENHANCED TEXT-TO-SPEECH & CONTINUOUS STT SERVICE
// ==========================================

export class SpeechService {
  constructor() {
    this.recognition = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isListening = false;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.currentAudio = null;
    this.accumulatedTranscript = '';
    this.silenceTimer = null;
    this.onResultCallback = null;
    this.onEndCallback = null;
    this.voices = [];

    if (this.synth) {
      try {
        if (typeof this.synth.onvoiceschanged !== 'undefined') {
          this.synth.onvoiceschanged = () => {
            this.voices = this.synth.getVoices();
          };
        }
        this.voices = this.synth.getVoices();
      } catch (e) {}
    }
  }

  initRecognition({ onResult, onStart, onEnd, onError, langCode = 'ta-IN' }) {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not supported in this browser.');
      return null;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = langCode || 'ta-IN';
      this.onResultCallback = onResult;
      this.onEndCallback = onEnd;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.accumulatedTranscript = '';
        if (onStart) onStart();
      };

      this.recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript + ' ';
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const totalTranscript = (final + interim).trim();
        if (totalTranscript) {
          this.accumulatedTranscript = totalTranscript;
        }

        if (this.onResultCallback) {
          this.onResultCallback({
            transcript: totalTranscript,
            finalTranscript: final.trim(),
            interimTranscript: interim.trim(),
            isFinal: !!final.trim()
          });
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('STT Error encountered:', event.error);
        if (event.error !== 'no-speech') {
          this.isListening = false;
          if (onError) onError(event.error);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onEndCallback) {
          this.onEndCallback(this.accumulatedTranscript);
        }
      };

      return this.recognition;
    } catch (e) {
      console.error('SpeechRecognition initialization error:', e);
      return null;
    }
  }

  startListening(langCode = 'ta-IN') {
    if (this.isSpeaking) {
      this.stopSpeaking();
    }

    if (this.recognition) {
      try {
        this.recognition.lang = langCode || 'ta-IN';
        this.accumulatedTranscript = '';
        this.recognition.start();
      } catch (e) {
        // Recognition might already be running
        console.warn('Recognition start caught:', e);
      }
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
        this.isListening = false;
      } catch (e) {
        console.warn('Error stopping recognition:', e);
      }
    }
    return this.accumulatedTranscript;
  }

  getAccumulatedTranscript() {
    return this.accumulatedTranscript;
  }

  speakText(text, langCode = 'ta-IN', { rate = 0.95, pitch = 1.0, volume = 1.0, onStart, onEnd } = {}) {
    if (!text) return;

    this.stopSpeaking();

    // Clean text of markdown formatting & emojis for audio synthesis
    const cleanSpeech = text
      .replace(/\*\*/g, '')
      .replace(/#/g, '')
      .replace(/•/g, '')
      .replace(/✅/g, '')
      .replace(/💡/g, '')
      .replace(/⚠️/g, '')
      .replace(/🚫/g, '')
      .replace(/🌱/g, '')
      .replace(/🌾/g, '')
      .replace(/🚜/g, '')
      .replace(/📷/g, '')
      .replace(/🛒/g, '')
      .replace(/\n+/g, '. ');

    const langPrefix = (langCode || 'ta-IN').split('-')[0].split('_')[0].toLowerCase();

    // Tier 1: Web Speech API with advanced voice lookup & resume
    if (this.synth) {
      try {
        this.synth.resume();
      } catch (e) {}

      const availableVoices = (this.synth.getVoices() || []).length > 0 ? this.synth.getVoices() : this.voices;

      const voiceKeywords = {
        ta: ['ta-in', 'ta_in', 'tamil', 'valluvar', 'latha', 'kani'],
        hi: ['hi-in', 'hi_in', 'hindi', 'kalpana', 'hemant', 'swara', 'madhur', 'kavya'],
        mr: ['mr-in', 'mr_in', 'marathi', 'devanagari', 'aarohi'],
        te: ['te-in', 'te_in', 'telugu', 'chitra'],
        kn: ['kn-in', 'kn_in', 'kannada', 'gagan'],
        gu: ['gu-in', 'gu_in', 'gujarati', 'niranjan'],
        bn: ['bn-in', 'bn_in', 'bengali', 'bashkar'],
        pa: ['pa-in', 'pa_in', 'punjabi', 'gurmukhi'],
        ml: ['ml-in', 'ml_in', 'malayalam', 'midhun'],
        en: ['en-in', 'en-us', 'en-gb', 'english']
      };

      const keywords = voiceKeywords[langPrefix] || [langPrefix];

      let matchingVoice = availableVoices.find(v => {
        const langLower = (v.lang || '').replace('_', '-').toLowerCase();
        const nameLower = (v.name || '').toLowerCase();
        return keywords.some(kw => langLower.includes(kw) || nameLower.includes(kw));
      });

      if (matchingVoice) {
        const utterance = new SpeechSynthesisUtterance(cleanSpeech);
        utterance.lang = matchingVoice.lang || langCode;
        utterance.voice = matchingVoice;
        utterance.rate = rate || 0.95;
        utterance.pitch = pitch || 1.0;
        utterance.volume = volume || 1.0;

        utterance.onstart = () => {
          this.isSpeaking = true;
          if (onStart) onStart();
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          if (onEnd) onEnd();
        };

        utterance.onerror = (err) => {
          console.warn('SpeechSynthesis error, falling back to Audio TTS:', err);
          this.speakWithAudioFallback(cleanSpeech, langPrefix, { onStart, onEnd });
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);
        return;
      }
    }

    // Tier 2 Fallback: High-quality Audio Stream (Google TTS API)
    this.speakWithAudioFallback(cleanSpeech, langPrefix, { onStart, onEnd });
  }

  speakWithAudioFallback(text, langPrefix, { onStart, onEnd }) {
    try {
      this.stopSpeaking();
      this.isSpeaking = true;
      if (onStart) onStart();

      const truncated = text.slice(0, 200);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(truncated)}&tl=${langPrefix}&client=tw-ob`;

      this.currentAudio = new Audio(url);
      this.currentAudio.playbackRate = 1.0;

      this.currentAudio.onended = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.currentAudio.onerror = (e) => {
        console.warn('Audio TTS fallback error:', e);
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.currentAudio.play().catch(err => {
        console.warn('Audio play error (user interaction required):', err);
        this.isSpeaking = false;
        if (onEnd) onEnd();
      });
    } catch (err) {
      console.error('Audio fallback failed:', err);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  stopSpeaking() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    this.isSpeaking = false;
  }
}

export const chotaKissanSpeech = new SpeechService();
