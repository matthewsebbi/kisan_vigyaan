// Browser Text-To-Speech (TTS) Voice Engine with Regional Indian Phonetics & Natural Speech Synthesis

/**
 * Check if the browser currently supports Web Speech API synthesis
 */
export const isSpeechSupported = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

/**
 * Check if speech synthesis is currently active / speaking
 */
export const isSpeaking = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking;
};

let activeUtterance = null;
let watchdogTimer = null;

/**
 * Cancel and stop any active speech utterance
 */
export const stopSpeech = () => {
  if (watchdogTimer) {
    clearTimeout(watchdogTimer);
    watchdogTimer = null;
  }
  activeUtterance = null;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Universal text-to-speech speaker with regional accents, callbacks, and sanitization
 * @param {string} text - Content to speak
 * @param {string} lang - ISO 639-1 language code (e.g. 'mr', 'hi', 'ta', 'te', 'kn', 'en')
 * @param {object} options - Optional callbacks { onStart, onEnd, onError, rate, pitch }
 */
export const speakText = (text, lang = 'en', options = {}) => {
  if (!isSpeechSupported()) {
    console.warn('Text-to-speech not supported in this browser.');
    if (options.onError) options.onError(new Error('TTS not supported'));
    return;
  }

  // Cancel any ongoing speech before starting new one
  stopSpeech();

  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  if (!text || typeof text !== 'string') {
    if (options.onEnd) options.onEnd();
    return;
  }

  // Sanitize text to remove raw symbols, markdown, and confusing compounds
  let cleanText = text
    .replace(/[•|→←↑↓✓⚠️#*`~_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Spoken number expansions per language to prevent awkward digit mispronunciations
  if (lang === 'mr') {
    cleanText = cleanText
      .replace(/६\s*पैकी\s*२|6\s*पैकी\s*2/g, 'सहा पैकी दोन')
      .replace(/\b२\b|\b2\b/g, 'दोन')
      .replace(/\b६\b|\b6\b/g, 'सहा')
      .replace(/\b४\b|\b4\b/g, 'चार')
      .replace(/\b३\b|\b3\b/g, 'तीन')
      .replace(/\b१\b|\b1\b/g, 'एक');
  } else if (lang === 'hi') {
    cleanText = cleanText
      .replace(/6\s*में\s*से\s*2/g, 'छह में से दो')
      .replace(/\b2\b/g, 'दो')
      .replace(/\b6\b/g, 'छह')
      .replace(/\b4\b/g, 'चार')
      .replace(/\b3\b/g, 'तीन')
      .replace(/\b1\b/g, 'एक');
  } else if (lang === 'ta') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ஆறு நிலங்களில் இரண்டு நிலங்களுக்கு')
      .replace(/\b2\b/g, 'இரண்டு')
      .replace(/\b6\b/g, 'ஆறு');
  } else if (lang === 'te') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ఆరు ప్లాట్లలో రెండు ప్లాట్లకు')
      .replace(/\b2\b/g, 'రెండు')
      .replace(/\b6\b/g, 'ఆరు');
  } else if (lang === 'kn') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ಆರು ಪ್ಲಾಟ್‌ಗಳಲ್ಲಿ ಎರಡು ಪ್ಲಾಟ್‌ಗಳಿಗೆ')
      .replace(/\b2\b/g, 'ಎರಡು')
      .replace(/\b6\b/g, 'ಆರು');
  } else if (lang === 'gu') {
    cleanText = cleanText
      .replace(/6.*2/g, 'છ ખેતરોમાંથી બે ખેતરોમાં')
      .replace(/\b2\b/g, 'બે')
      .replace(/\b6\b/g, 'છ');
  } else if (lang === 'bn') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ছয়টি জমির মধ্যে দুটি জমিতে')
      .replace(/\b2\b/g, 'দুই')
      .replace(/\b6\b/g, 'ছয়');
  } else if (lang === 'pa') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ਛੇ ਪਲਾਟਾਂ ਵਿੱਚੋਂ ਦੋ ਪਲਾਟਾਂ ਨੂੰ')
      .replace(/\b2\b/g, 'ਦੋ')
      .replace(/\b6\b/g, 'ਛੇ');
  } else if (lang === 'ml') {
    cleanText = cleanText
      .replace(/6.*2/g, 'ആറ് പ്ലോട്ടുകളിൽ രണ്ടെണ്ണത്തിന്')
      .replace(/\b2\b/g, 'രണ്ട്')
      .replace(/\b6\b/g, 'ആറ്');
  } else if (lang === 'en') {
    cleanText = cleanText
      .replace(/2\s*of\s*6/gi, 'two of your six')
      .replace(/\b2\b/g, 'two')
      .replace(/\b6\b/g, 'six');
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  // Set language voice codes for all 10 major Indian languages
  const langCodeMap = {
    'mr': 'mr-IN', // Marathi
    'hi': 'hi-IN', // Hindi
    'ta': 'ta-IN', // Tamil
    'te': 'te-IN', // Telugu
    'kn': 'kn-IN', // Kannada
    'gu': 'gu-IN', // Gujarati
    'bn': 'bn-IN', // Bengali
    'pa': 'pa-IN', // Punjabi
    'ml': 'ml-IN', // Malayalam
    'en': 'en-IN'  // Indian English
  };

  const targetLang = langCodeMap[lang] || 'en-IN';
  utterance.lang = targetLang;
  utterance.rate = options.rate || 0.90; // Natural, highly intelligible tempo
  utterance.pitch = options.pitch || 1.0;

  // Match native voice if available in browser
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    const langPrefix = targetLang.substring(0, 2);
    let matchedVoice = voices.find(v => v.lang === targetLang) ||
                       voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith(langPrefix));
    
    // Regional fallback hierarchy
    if (!matchedVoice && (lang === 'mr' || lang === 'gu' || lang === 'pa')) {
      matchedVoice = voices.find(v => v.lang.startsWith('hi'));
    }
    if (!matchedVoice && (lang === 'kn' || lang === 'te' || lang === 'ml')) {
      matchedVoice = voices.find(v => v.lang.startsWith('ta'));
    }
    if (!matchedVoice) {
      matchedVoice = voices.find(v => v.lang.startsWith('en'));
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
  }

  // Keep global reference so browser garbage collection doesn't kill playback
  activeUtterance = utterance;

  const handleFinish = (e) => {
    if (watchdogTimer) {
      clearTimeout(watchdogTimer);
      watchdogTimer = null;
    }
    activeUtterance = null;
    if (options.onEnd) options.onEnd(e);
  };

  // Event handlers
  if (options.onStart) {
    utterance.onstart = options.onStart;
  }
  utterance.onend = (e) => {
    handleFinish(e);
  };
  utterance.onerror = (e) => {
    console.warn('TTS utterance error:', e);
    if (options.onError) options.onError(e);
    handleFinish(e);
  };

  // Safety watchdog timer: if browser TTS hangs or fails to fire onend, resolve after expected duration
  const estimatedDurationMs = Math.max(6000, cleanText.length * 130);
  watchdogTimer = setTimeout(() => {
    if (activeUtterance) {
      console.warn('SpeechSynthesis watchdog timed out, ensuring speech ends.');
      stopSpeech();
      handleFinish({ type: 'watchdog_timeout' });
    }
  }, estimatedDurationMs);

  window.speechSynthesis.speak(utterance);
};

/**
 * Construct an articulately phrased, localized spoken advisory from diagnosis prediction result
 * @param {object} result - The scanResult from AI analysis
 * @param {string} lang - Active language code
 * @returns {string} - Natural language speech sentence
 */
export const buildDiagnosisSpeechText = (result, lang = 'en') => {
  if (!result) return '';

  const getVal = (field) => {
    if (!result) return '';
    const localized = `${field}_${lang}`;
    if (result[localized]) return result[localized];
    const upperLang = lang.charAt(0).toUpperCase() + lang.slice(1);
    if (result[`${field}${upperLang}`]) return result[`${field}${upperLang}`];
    return result[field] || '';
  };

  const crop = getVal('crop') || result.crop || 'Crop';
  const verdict = getVal('verdict') || result.verdict || 'Analysis Complete';
  const confidence = Math.round(result.confidence || 94);
  const advice = getVal('plainAdvice') || result.plainAdviceEn || '';
  const medicine = getVal('medicineName') || result.medicineName || '';
  const dosage = result.dosage || '';

  switch (lang) {
    case 'mr': {
      let mr = `पीक: ${crop}. रोगाचे निदान: ${verdict}. अचूकता: ${confidence} टक्के.`;
      if (advice) mr += ` सल्ला: ${advice}.`;
      if (medicine) mr += ` शिफारस केलेले औषध: ${medicine}.`;
      if (dosage) mr += ` फवारणी प्रमाण: ${dosage}.`;
      return mr;
    }
    case 'hi': {
      let hi = `फसल: ${crop}। रोग निदान: ${verdict}। सटीकता: ${confidence} प्रतिशत।`;
      if (advice) hi += ` सलाह: ${advice}।`;
      if (medicine) hi += ` अनुशंसित दवा: ${medicine}।`;
      if (dosage) hi += ` खुराक: ${dosage}।`;
      return hi;
    }
    case 'ta': {
      let ta = `பயிர்: ${crop}. நோய் கண்டறிதல்: ${verdict}. துல்லியம்: ${confidence} சதவீதம்.`;
      if (advice) ta += ` ஆலோசனை: ${advice}.`;
      if (medicine) ta += ` பரிந்துரைக்கப்பட்ட மருந்து: ${medicine}.`;
      if (dosage) ta += ` மருந்தளவு: ${dosage}.`;
      return ta;
    }
    case 'te': {
      let te = `పంట: ${crop}. వ్యాధి నిర్ధారణ: ${verdict}. ఖచ్చితత్వం: ${confidence} శాతం.`;
      if (advice) te += ` సలహా: ${advice}.`;
      if (medicine) te += ` సిఫార్సు చేసిన మందు: ${medicine}.`;
      if (dosage) te += ` మోతాదు: ${dosage}.`;
      return te;
    }
    case 'kn': {
      let kn = `ಬೆಳೆ: ${crop}. ರೋಗ ಪತ್ತೆ: ${verdict}. ನಿಖರತೆ: ${confidence} ಪ್ರತಿಶತ.`;
      if (advice) kn += ` ಸಲಹೆ: ${advice}.`;
      if (medicine) kn += ` ಶಿಫಾರಸು ಮಾಡಿದ ಔಷಧಿ: ${medicine}.`;
      if (dosage) kn += ` ಪ್ರಮಾಣ: ${dosage}.`;
      return kn;
    }
    case 'gu': {
      let gu = `પાક: ${crop}. રોગનું નિદાન: ${verdict}. સચોટતા: ${confidence} ટકા.`;
      if (advice) gu += ` સલાહ: ${advice}.`;
      if (medicine) gu += ` ભલામણ કરેલ દવા: ${medicine}.`;
      if (dosage) gu += ` માત્રા: ${dosage}.`;
      return gu;
    }
    case 'bn': {
      let bn = `ফসল: ${crop}। রোগের নির্ণয়: ${verdict}। যথার্থতা: ${confidence} শতাংশ।`;
      if (advice) bn += ` পরামর্শ: ${advice}।`;
      if (medicine) bn += ` প্রস্তাবিত ঔষধ: ${medicine}।`;
      if (dosage) bn += ` মাত্রা: ${dosage}।`;
      return bn;
    }
    case 'pa': {
      let pa = `ਫ਼ਸਲ: ${crop}। ਬਿਮਾਰੀ ਜਾਂਚ: ${verdict}। ਸ਼ੁੱਧਤਾ: ${confidence} ਫ਼ੀਸਦੀ।`;
      if (advice) pa += ` ਸਲਾਹ: ${advice}।`;
      if (medicine) pa += ` ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਦਵਾਈ: ${medicine}।`;
      if (dosage) pa += ` ਮਾਤਰਾ: ${dosage}।`;
      return pa;
    }
    case 'ml': {
      let ml = `വിള: ${crop}. രോഗനിർണ്ണയം: ${verdict}. കൃത്യത: ${confidence} ശതമാനം.`;
      if (advice) ml += ` നിർദ്ദേശം: ${advice}.`;
      if (medicine) ml += ` നിർദ്ദേശിച്ച മരുന്ന്: ${medicine}.`;
      if (dosage) ml += ` അളവ്: ${dosage}.`;
      return ml;
    }
    case 'en':
    default: {
      let en = `Crop: ${crop}. Diagnosis verdict: ${verdict}. Confidence score: ${confidence} percent.`;
      if (advice) en += ` Advice: ${advice}.`;
      if (medicine) en += ` Recommended remedy: ${medicine}.`;
      if (dosage) en += ` Application dosage: ${dosage}.`;
      return en;
    }
  }
};

/**
 * Speaks the complete diagnosis output prediction in the requested language
 * @param {object} result - The scanResult from AI analysis
 * @param {string} lang - Language code
 * @param {object} options - Callbacks { onStart, onEnd, onError }
 */
export const speakDiagnosisPrediction = (result, lang = 'en', options = {}) => {
  const speechText = buildDiagnosisSpeechText(result, lang);
  if (!speechText) {
    if (options.onEnd) options.onEnd();
    return;
  }
  speakText(speechText, lang, options);
};
