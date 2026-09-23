/**
 * CropShield AI - Voice-Driven Page Navigation Service
 * 
 * Provides production-grade intent classification for verbal navigation requests,
 * mapping spoken commands in 10 Indian languages & English to all 18 CropShield AI routes,
 * and generating natural, localized spoken confirmations for Text-to-Speech (TTS).
 */

export const NAVIGATION_ROUTES = {
  scan: {
    id: 'scan',
    labelEn: 'AI Crop Scanner',
    labelHi: 'एआई फसल स्कैनर',
    labelMr: 'एआय पीक स्कॅनर',
    labelTa: 'AI பயிர் ஸ்கேனர்',
    labelTe: 'AI క్రాప్ స్కానర్',
    labelKn: 'AI ಕ್ರಾಪ್ ಸ್ಕ್ಯಾನರ್',
    labelGu: 'AI ક્રોપ સ્કેનર',
    labelBn: 'AI ক্রপ স্ক্যানার',
    labelPa: 'AI ਫਸਲ ਸਕੈਨਰ',
    labelMl: 'AI ക്രോപ്പ് സ്കാനർ',
    keywords: [
      'scan', 'scanner', 'camera', 'photo', 'leaf doctor', 'crop scanner', 'leaf scanner', 
      'diagnose', 'diagnosis', 'disease detection', 'plant doctor',
      // Devanagari (Hindi / Marathi)
      'स्कैन', 'स्कैनर', 'स्कॅन', 'स्कॅनर', 'कॅमेरा', 'कैमरा', 'फोटो', 'पत्ती स्कैनर', 'पाने स्कॅन', 'रोग निदान', 'दवाखाना',
      // Tamil
      'ஸ்கேன்', 'ஸ்கேனர்', 'கேமரா', 'படம்', 'இலை', 'நோய் கண்டறிதல்', 'மருத்துவர்',
      // Telugu & Kannada
      'స్కాన్', 'స్కానర్', 'కెమెరా', 'ఫోటో', 'స్ಕ್ಯಾನ್', 'ಸ್ಕ್ಯಾನರ್', 'ಕ್ಯಾಮೆರಾ',
      // Gujarati, Bengali, Punjabi, Malayalam
      'સ્કેન', 'સ્કેનર', 'ক্যামেরা', 'স্ক্যানার', 'ਸਕੈਨਰ', 'ക്യാമറ'
    ]
  },
  market: {
    id: 'market',
    labelEn: 'Kisan Mandi & Market Prices',
    labelHi: 'किसान मंडी व बाजार भाव',
    labelMr: 'बाजार समिती व किसान मंडी',
    labelTa: 'சந்தை & கிசான் மண்டி',
    labelTe: 'కిసాన్ మండి & మార్కెట్ ధరలు',
    labelKn: 'ಕಿಸಾನ್ ಮಂಡಿ ಮತ್ತು ದರಗಳು',
    labelGu: 'કિસાન મંડી અને બજાર ભાવ',
    labelBn: 'কিসান মান্ডি ও বাজার দর',
    labelPa: 'ਕਿਸਾਨ ਮੰਡੀ ਅਤੇ ਭਾਅ',
    labelMl: 'കിസാൻ മണ്ടി & വിപണി നിരക്കുകൾ',
    keywords: [
      'market', 'mandi', 'apmc', 'rate', 'rates', 'price', 'prices', 'crop rate', 'bhav',
      // Devanagari
      'मंडी', 'मण्डी', 'बाजार', 'बाजारभाव', 'भाव', 'मार्केट', 'दर', 'एपीएमसी', 'दाम', 'विक्री दर',
      // Tamil
      'சந்தை', 'மண்டி', 'விலை', 'விற்பனை விலை', 'மார்க்கெட்', 'குவிண்டால் விலை',
      // Telugu & Kannada
      'మార్కెట్', 'మండి', 'ధరలు', 'ధర', 'ಮಾರುಕಟ್ಟೆ', 'ದರಗಳು', 'ಬೆಲೆ',
      // Others
      'બજાર', 'મંડી', 'ભાવ', 'মান্ডি', 'বাজার', 'ਮੰਡੀ', 'ਭਾਅ'
    ]
  },
  cropSell: {
    id: 'cropSell',
    labelEn: 'Sell Crops Portal',
    labelHi: 'किसान फसल बिक्री केंद्र',
    labelMr: 'शेतकरी पीक विक्री केंद्र',
    labelTa: 'பயிர் நேரடி விற்பனை',
    labelTe: 'పంట అమ్మకాల పోర్టల్',
    labelKn: 'ಬೆಳೆ ಮಾರಾಟ ಕೇಂದ್ರ',
    labelGu: 'પાક વેચાણ પોર્ટલ',
    labelBn: 'ফসল বিক্রয় পোর্টাল',
    labelPa: 'ਫਸਲ ਵੇਚਣ ਦਾ ਪੋਰਟਲ',
    labelMl: 'വിള വിൽപ്പന പോർട്ടൽ',
    keywords: [
      'crop sell', 'sell crop', 'sell crops', 'sell produce', 'selling portal', 'farmer sell', 'direct sell', 'list crop',
      // Devanagari
      'फसल बिक्री', 'फसल बेचना', 'पीक विक्री', 'माल विकणे', 'धान्य विक्री', 'शेतमाल विक्री', 'बेचें', 'विका',
      // Tamil
      'பயிர் விற்பனை', 'விற்பனை செய்ய', 'பயிர் விற்க', 'விளைபொருள் விற்பனை',
      // Telugu & Kannada
      'పంట అమ్మకం', 'అమ్మకాలు', 'ಬೆಳೆ ಮಾರಾಟ', 'ಮಾರಾಟ'
    ]
  },
  govtSchemes: {
    id: 'govtSchemes',
    labelEn: 'Govt Schemes & PM-Kisan',
    labelHi: 'सरकारी योजनाएं व पीएम-किसान',
    labelMr: 'शासकीय योजना व पीएम-किसान',
    labelTa: 'அரசு திட்டங்கள் & மானியம்',
    labelTe: 'ప్రభుత్వ పథకాలు & పీఎం-కిసాన్',
    labelKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು & ಪಿಎಂ-ಕಿಸಾನ್',
    labelGu: 'સરકારી યોજનાઓ અને પીએમ-કિસાન',
    labelBn: 'সরকারি প্রকল্প ও পিএম-কিসান',
    labelPa: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਪੀਐਮ-ਕਿਸਾਨ',
    labelMl: 'സർക്കാർ പദ്ധതികൾ & പിഎം-കിസാൻ',
    keywords: [
      'scheme', 'schemes', 'subsidy', 'subsidies', 'pm kisan', 'pm-kisan', 'dbt', 'grant', 'yojana', 'insurance', 'pmfby',
      // Devanagari
      'सरकारी योजना', 'शासकीय योजना', 'योजना', 'योजनाएं', 'योजनाओं', 'योजनांवर', 'अनुदान', 'विमा', 'सब्सिडी', 'पीएम किसान', 'पिक विमा',
      // Tamil
      'திட்ட', 'திட்டம்', 'அரசு திட்டம்', 'திட்டங்கள்', 'திட்டங்களை', 'மானியம்', 'காப்பீடு', 'பிஎம் கிசான்', 'நிவாரணம்',
      // Telugu & Kannada
      'పథకాలు', 'ప్రభుత్వ పథకాలు', 'రైతు భరోసా', 'సబ్సిడీ', 'పథకం', 'ಯೋಜನೆಗಳು', 'ಸರ್ಕಾರಿ ಯೋಜನೆ', 'ಅನುದಾನ'
    ]
  },
  satelliteMapping: {
    id: 'satelliteMapping',
    labelEn: 'Sentinel-2 Satellite GIS Map',
    labelHi: 'सैटेलाइट जीआईएस मानचित्र',
    labelMr: 'उपग्रह सॅटेलाईट नकाशा',
    labelTa: 'செயற்கைக்கோள் ஜிஐஎஸ் வரைபடம்',
    labelTe: 'శాటిలైట్ జీఐఎస్ మ్యాప్',
    labelKn: 'ಉಪಗ್ರಹ ಜಿಐಎಸ್ ನಕ್ಷೆ',
    labelGu: 'સેટેલાઇટ જીઆઇએસ નકશો',
    labelBn: 'স্যাটেলাইট জিআইএস মানচিত্র',
    labelPa: 'ਸੈਟੇਲਾਈਟ ਜੀਆਈਐਸ ਨਕਸ਼ਾ',
    labelMl: 'ഉപഗ്രഹ ജിഐഎസ് ഭൂപടം',
    keywords: [
      'satellite', 'gis', 'sentinel', 'isro', 'satellite map', 'map', 'ndvi', 'earth observation', 'command map',
      // Devanagari
      'सैटेलाइट', 'सॅटेलाईट', 'उपग्रह', 'नकाशा', 'मानचित्र', 'नक्शा', 'मैप', 'जिओ मॅप',
      // Tamil
      'செயற்கைக்கோள்', 'சாட்டிலைட்', 'வரைபடம்', 'மேப்', 'ஜிஐஎஸ்',
      // Telugu & Kannada
      'ఉపగ్రహం', 'శాటిలైట్', 'పటం', 'మ్యాప్', 'ಉಪಗ್ರಹ', 'ನಕ್ಷೆ'
    ]
  },
  alerts: {
    id: 'alerts',
    labelEn: 'Field Alerts & Warnings',
    labelHi: 'रोग चेतावनी व अलर्ट',
    labelMr: 'रोग प्रादुर्भाव इशारा व अलर्ट',
    labelTa: 'நோய் எச்சரிக்கைகள் & இடர்',
    labelTe: 'వ్యాధి హెచ్చరికలు & అలర్ట్స్',
    labelKn: 'ರೋಗ ಎಚ್ಚರಿಕೆಗಳು',
    labelGu: 'રોગ ચેતવણીઓ અને એલર્ટ્સ',
    labelBn: 'রোগের সতর্কতা ও অ্যালার্ট',
    labelPa: 'ਰੋਗ ਚੇਤਾਵਨੀਆਂ ਤੇ ਅਲਰਟ',
    labelMl: 'രോഗ മുന്നറിയിപ്പുകൾ',
    keywords: [
      'alert', 'alerts', 'warning', 'warnings', 'outbreak', 'threat alert', 'danger alert',
      // Devanagari
      'अलर्ट', 'चेतावनी', 'इशारे', 'सूचना', 'धोका इशारा', 'प्रादुर्भाव', 'इशारा',
      // Tamil
      'எச்சரிக்கை', 'எச்சரிக்கைகள்', 'இடர்', 'அபாய எச்சரிக்கை', 'பாதிப்பு',
      // Telugu & Kannada
      'హెచ్చరికలు', 'హెచ్చరిక', 'అలర్ట్', 'ಎಚ್ಚರಿಕೆಗಳು', 'ಎಚ್ಚರಿಕೆ'
    ]
  },
  esp32LiveData: {
    id: 'esp32LiveData',
    labelEn: 'Zone Monitoring & Live Sensors',
    labelHi: 'ज़ोन निगरानी व लाइव सेंसर',
    labelMr: 'झोन मॉनिटरिंग व थेट सेन्सर्स',
    labelTa: 'மண்டல கண்காணிப்பு & சென்சார்கள்',
    labelTe: 'జోన్ మానిటరింగ్ & సెన్సార్లు',
    labelKn: 'ವಲಯ ಮೇಲ್ವಿಚಾರಣೆ & ಸಂವೇದಕಗಳು',
    labelGu: 'ઝોન મોનિટરિંગ અને સેન્સર્સ',
    labelBn: 'জোন মনিটরিং ও সেন্সর',
    labelPa: 'ਜ਼ੋਨ ਨਿਗਰਾਨੀ ਤੇ ਸੈਂਸਰ',
    labelMl: 'സോൺ മോണിറ്ററിംഗ് & സെൻസറുകൾ',
    keywords: [
      'zone monitoring', 'zone', 'sensor', 'sensors', 'telemetry', 'esp32', 'soil moisture', 'live telemetry', 'hardware data',
      // Devanagari
      'झोन मॉनिटरिंग', 'झोन', 'ज़ोन', 'निगरानी', 'सेंसर', 'सेन्सर', 'माती ओलावा', 'मृदा नमी', 'टेलीमेट्री', 'थेट डेटा',
      // Tamil
      'மண்டல கண்காணிப்பு', 'சென்சார்', 'சென்சார்கள்', 'மண் ஈரப்பதம்', 'தொலை அளவியல்',
      // Telugu & Kannada
      'జోన్ మానిటరింగ్', 'సెన్సార్లు', 'సెన్సార్', 'ಸಂವೇದಕಗಳು', 'ವಲಯ ಮೇಲ್ವಿಚಾರಣೆ'
    ]
  },
  environmentalPrediction: {
    id: 'environmentalPrediction',
    labelEn: 'AI Disease Prediction Engine',
    labelHi: 'एआई रोग पूर्वानुमान इंजन',
    labelMr: 'एआय रोग अंदाज व हवामान रडार',
    labelTa: 'AI நோய் முன்கணிப்பு ரேடார்',
    labelTe: 'AI వ్యాధి ముందస్తు అంచనా',
    labelKn: 'AI ರೋಗ ಮುನ್ಸೂಚನೆ',
    labelGu: 'AI રોગ આગાહી એન્જિન',
    labelBn: 'AI রোগ পূর্বাভাস ইঞ্জিন',
    labelPa: 'AI ਰੋਗ ਭਵਿੱਖਬਾਣੀ ਇੰਜਣ',
    labelMl: 'AI രോഗ പ്രവചന എഞ്ചിൻ',
    keywords: [
      'prediction', 'predict', 'radar', 'environmental prediction', 'disease forecasting', 'outbreak prediction', 'weather radar',
      // Devanagari
      'रोग अंदाज', 'अंदाज', 'पूर्वानुमान', 'रोग भविष्यवाणी', 'हवामान अंदाज', 'रडार', 'भविष्यवाणी',
      // Tamil
      'முன்கணிப்பு', 'நோய் முன்கணிப்பு', 'ரேடார்', 'கணிப்பு',
      // Telugu & Kannada
      'ముందస్తు అంచనా', 'అంచనా', 'ముನ್ಸೂಚನೆ'
    ]
  },
  roiCalculator: {
    id: 'roiCalculator',
    labelEn: 'Yield & ROI Profit Calculator',
    labelHi: 'उत्पादन व मुनाफा कैलकुलेटर',
    labelMr: 'उत्पादन व नफा कॅल्क्युलेटर',
    labelTa: 'மகசூல் & லாப கால்குலேட்டர்',
    labelTe: 'దిగుబడి & లాభ కాలిక్యులేటర్',
    labelKn: 'ಇಳುವರಿ ಮತ್ತು ಲಾಭ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    labelGu: 'ઉત્પાદન અને નફો કેલ્ક્યુલેટર',
    labelBn: 'ফলন ও লাভ ক্যালকুলেটর',
    labelPa: 'ਉਤਪਾਦਨ ਤੇ ਮੁਨਾਫਾ ਕੈਲਕੁਲੇਟਰ',
    labelMl: 'വിളവ് & ലാഭ കാൽക്കുലേറ്റർ',
    keywords: [
      'roi', 'calculator', 'yield calculator', 'profit calculator', 'yield', 'cost calculator', 'profit analysis',
      // Devanagari
      'कैलकुलेटर', 'कॅल्क्युलेटर', 'नफा', 'मुनाफा', 'उत्पादन अंदाज', 'लागत', 'हिशोब',
      // Tamil
      'கால்குலேட்டர்', 'லாபம்', 'மகசூல்', 'கணக்கீடு',
      // Telugu & Kannada
      'కాలిక్యులేటర్', 'లాభం', 'దిగుబడి', 'ಕ್ಯಾಲ್ಕುಲೇಟರ್', 'ಲಾಭ'
    ]
  },
  riskConsequences: {
    id: 'riskConsequences',
    labelEn: 'Risk & Threats Matrix',
    labelHi: 'जोखिम व खतरा परिणाम मैट्रिक्स',
    labelMr: 'धोके व परिणाम विश्लेषण',
    labelTa: 'இடர் & ஆபத்து பகுப்பாய்வு',
    labelTe: 'ప్రమాదాలు & పరిణామాల మ్యాట్రిక్స్',
    labelKn: 'ಅಪಾಯ ಮತ್ತು ಪರಿಣಾಮಗಳು',
    labelGu: 'જોખમ અને જોખમ પરિણામો',
    labelBn: 'ঝুঁকি ও হুমকি বিশ্লেষণ',
    labelPa: 'ਜੋਖਮ ਅਤੇ ਖ਼ਤਰੇ ਵਿਸ਼ਲੇਸ਼ਣ',
    labelMl: 'അപകടസാധ്യത വിശകലനം',
    keywords: [
      'risk consequences', 'threats', 'risk matrix', 'threat consequence', 'threat consequences', 'loss estimate',
      // Devanagari
      'धोके परिणाम', 'जोखिम परिणाम', 'नुकसान परिणाम', 'धोका विश्लेषण', 'खतरा विश्लेषण',
      // Tamil
      'இடர் விளைவுகள்', 'ஆபத்து பகுப்பாய்வு', 'இழப்பு மதிப்பீடு',
      // Telugu & Kannada
      'ప్రమాద పరిణామాలు', 'నష్ట అంచనా', 'ಅಪಾಯ ಪರಿಣಾಮಗಳು'
    ]
  },
  chatbot: {
    id: 'chatbot',
    labelEn: 'AI Agronomist Chatbot',
    labelHi: 'एआई कृषि चैटबॉट',
    labelMr: 'एआय कृषी चॅटबॉट',
    labelTa: 'AI வேளாண் சாட்போட்',
    labelTe: 'AI వ్యవసాయ చాట్‌బాట్',
    labelKn: 'AI ಕೃಷಿ ಚಾಟ್‌ಬಾಟ್',
    labelGu: 'AI કૃષિ ચેટબોટ',
    labelBn: 'AI কৃষি চ্যাটবট',
    labelPa: 'AI ਖੇਤੀਬਾੜੀ ਚੈਟਬੋਟ',
    labelMl: 'AI കാർഷിക ചാറ്റ്ബോട്ട്',
    keywords: [
      'chatbot', 'chat', 'agronomist chat', 'ai bot', 'ai agronomist', 'talk with bot',
      // Devanagari
      'चॅटबॉट', 'चैटबॉट', 'कृषी चॅटबॉट', 'कृषि चैटबॉट', 'गप्पा', 'बातचीत',
      // Tamil
      'சாட்போட்', 'உரையாடல்', 'வேளாண் அரட்டை',
      // Telugu & Kannada
      'చాట్‌బాట్', 'చాట్', 'ಚಾಟ್‌ಬಾಟ್'
    ]
  },
  chotaKissan: {
    id: 'chotaKissan',
    labelEn: 'Kisan One Voice AI',
    labelHi: 'किसान वन वॉयस एआई',
    labelMr: 'किसान वन व्हॉईस एआय',
    labelTa: 'கிசான் ஒன் குரல் AI',
    labelTe: 'కిసాన్ వన్ వాయిస్ AI',
    labelKn: 'ಕಿಸಾನ್ ಒನ್ ಧ್ವನಿ AI',
    labelGu: 'કિસાન વન વૉઇસ AI',
    labelBn: 'কিসান ওয়ান ভয়েস AI',
    labelPa: 'ਕਿਸਾਨ ਵਨ ਵੌਇਸ AI',
    labelMl: 'കിസാൻ വൺ വോയ്സ് AI',
    keywords: [
      'kisan one', 'chota kissan', 'voice ai', 'voice assistant', 'voice dashboard', 'speak assistant',
      // Devanagari
      'किसान वन', 'छोटा किसान', 'आवाज सहायक', 'व्हॉईस', 'बोलून सांगा',
      // Tamil
      'கிசான் ஒன்', 'குரல் உதவியாளர்', 'சோட்டா கிசான்',
      // Telugu & Kannada
      'కిసాన్ వన్', 'వాయిస్ అసిస్టెంట్', 'ಧ್ವನಿ ಸಹಾಯಕ'
    ]
  },
  proTips: {
    id: 'proTips',
    labelEn: 'Pro Agronomy Tips & Dosage',
    labelHi: 'कृषि सलाह व दवा डोज गाइड',
    labelMr: 'तज्ज्ञ शेती सल्ला व डोस मार्गदर्शक',
    labelTa: 'விவசாய குறிப்புகள் & மருந்து அளவுகள்',
    labelTe: 'వ్యవసాయ చిట్కాలు & మోతాదు',
    labelKn: 'ಕೃಷಿ ಸಲಹೆಗಳು & ಪ್ರಮಾಣ',
    labelGu: 'કૃષિ સલાહ અને માત્રા માર્ગદર્શિકા',
    labelBn: 'কৃষি টিপস ও ডোজ গাইড',
    labelPa: 'ਖੇਤੀਬਾੜੀ ਸੁਝਾਅ ਤੇ ਖੁਰਾਕ ਗਾਈਡ',
    labelMl: 'കാർഷിക ടിപ്പുകൾ & അളവ് വിവരങ്ങൾ',
    keywords: [
      'pro tips', 'protips', 'agronomy tips', 'farming tips', 'dosage guide', 'best practices', 'spray guide',
      // Devanagari
      'तज्ज्ञ सल्ला', 'शेती टिप्स', 'कृषि सलाह', 'डोस मार्गदर्शक', 'फवारणी सल्ला', 'टिप्स',
      // Tamil
      'விவசாய குறிப்புகள்', 'பரிந்துரைகள்', 'மருந்து அளவு', 'மருந்தடிக்க வழிகாட்டி',
      // Telugu & Kannada
      'చిట్కాలు', 'మోతాదు', 'సలహాలు', 'ಸಲಹೆಗಳು'
    ]
  },
  statistics: {
    id: 'statistics',
    labelEn: 'Regional Disease Surveillance & Stats',
    labelHi: 'क्षेत्रीय रोग निगरानी व आंकड़े',
    labelMr: 'प्रादेशिक रोग सांख्यिकी व ट्रेंड्स',
    labelTa: 'பிராந்திய நோய் புள்ளிவிவரங்கள்',
    labelTe: 'ప్రాంతీయ వ్యాధి గణాంకాలు',
    labelKn: 'ಪ್ರಾದೇಶಿಕ ಅಂಕಿಅಂಶಗಳು',
    labelGu: 'પ્રાદેશિક રોગ આંકડાકીય માહિતી',
    labelBn: 'আঞ্চলিক রোগ নজরদারি ও পরিসংখ্যান',
    labelPa: 'ਖੇਤਰੀ ਰੋਗ ਅੰਕੜੇ',
    labelMl: 'രോഗ സ്ഥിതിവിവരക്കണക്കുകൾ',
    keywords: [
      'statistics', 'stats', 'surveillance', 'trends', 'disease trends', 'regional surveillance', 'analytics',
      // Devanagari
      'सांख्यिकी', 'आकडेवारी', 'आंकड़े', 'ट्रेंड्स', 'रोग सांख्यिकी', 'निगरानी डेटा',
      // Tamil
      'புள்ளிவிவரம்', 'புள்ளிவிவரங்கள்', 'கண்காணிப்பு விவரம்',
      // Telugu & Kannada
      'గణాంకాలు', 'ట్రెండ్స్', 'ಅಂಕಿಅಂಶಗಳು'
    ]
  },
  farmerCommunity: {
    id: 'farmerCommunity',
    labelEn: 'Farmer Community Forum',
    labelHi: 'किसान समुदाय व चर्चा मंच',
    labelMr: 'शेतकरी समुदाय व चर्चा मंच',
    labelTa: 'விவசாயிகள் சமூகம் & கலந்துரையாடல்',
    labelTe: 'రైతు కమ్యూనిటీ ఫోరం',
    labelKn: 'ರೈತರ ಸಮುದಾಯ',
    labelGu: 'ખેડૂત સમુદાય અને મંચ',
    labelBn: 'কৃষক সম্প্রদায় ও ফোরাম',
    labelPa: 'ਕਿਸਾਨ ਭਾਈਚਾਰਾ ਫੋਰਮ',
    labelMl: 'കർഷക കൂട്ടായ്മ',
    keywords: [
      'community', 'forum', 'farmer community', 'farmer forum', 'discussion', 'qa', 'extension forum',
      // Devanagari
      'शेतकरी मंच', 'समुदाय', 'किसान समुदाय', 'चर्चा मंच', 'कम्युनिटी', 'फोरम',
      // Tamil
      'சமூகம்', 'விவசாயிகள் மன்றம்', 'கலந்துரையாடல்',
      // Telugu & Kannada
      'రైతు సంఘం', 'కమ్యూనిటీ', 'ಸಮುದಾಯ'
    ]
  },
  reports: {
    id: 'reports',
    labelEn: 'My Field Reports & Soil Cards',
    labelHi: 'मेरी फील्ड रिपोर्ट व मृदा स्वास्थ्य कार्ड',
    labelMr: 'माझे शेत अहवाल व माती पत्रिका',
    labelTa: 'எனது பண்ணை அறிக்கைகள் & மண் அட்டை',
    labelTe: 'నా ఫీల్డ్ రిపోర్ట్‌లు & నేల కార్డులు',
    labelKn: 'ನನ್ನ ವರದಿಗಳು & ಮಣ್ಣಿನ ಕಾರ್ಡ್',
    labelGu: 'મારા રિપોર્ટ્સ અને જમીન કાર્ડ',
    labelBn: 'আমার রিপোর্ট ও মৃত্তিকা কার্ড',
    labelPa: 'ਮੇਰੀਆਂ ਰਿਪੋਰਟਾਂ ਤੇ ਮਿੱਟੀ ਕਾਰਡ',
    labelMl: 'ഫീൽഡ് റിപ്പോർട്ടുകൾ & മണ്ണ് കാർഡ്',
    keywords: [
      'reports', 'report', 'soil card', 'soil health card', 'field reports', 'my reports', 'soil test report',
      // Devanagari
      'माझे अहवाल', 'अहवाल', 'रिपोर्ट', 'मेरी रिपोर्ट', 'माती आरोग्य पत्रिका', 'मृदा कार्ड', 'माती तपासणी',
      // Tamil
      'அறிக்கைகள்', 'அறிக்கை', 'மண் அட்டை', 'மண் பரிசோதனை',
      // Telugu & Kannada
      'నివేదికలు', 'సాయిల్ కార్డ్', 'ವರದಿಗಳು'
    ]
  },
  home: {
    id: 'esp32LiveData',
    labelEn: 'Farm Home Dashboard',
    labelHi: 'मुख्य फार्म डैशबोर्ड',
    labelMr: 'मुख्य शेतकरी डॅशबोर्ड',
    labelTa: 'பண்ணை முகப்பு பக்கம்',
    labelTe: 'హోమ్ డాష్‌బోర్డ్',
    labelKn: 'ಮುಖಪುಟ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    labelGu: 'હોમ ડેશબોર્ડ',
    labelBn: 'হোম ড্যাশবোর্ড',
    labelPa: 'ਹੋਮ ਡੈਸ਼ਬੋਰਡ',
    labelMl: 'ഹോം ഡാഷ്‌ബോർഡ്',
    keywords: [
      'home', 'dashboard', 'main page', 'home screen', 'overview', 'farm overview', 'main dashboard', 'start page',
      // Devanagari
      'मुख्यपृष्ठ', 'होम', 'डॅशबोर्ड', 'डैशबोर्ड', 'मुख्य पृष्ठ', 'सुरुवात', 'घर',
      // Tamil
      'முகப்பு', 'முகப்பு பக்கம்', 'டேஷ்போர்டு', 'முதன்மை பக்கம்',
      // Telugu & Kannada
      'హోమ్', 'డాష్‌బోర్డ్', 'ముఖపుట'
    ]
  },
  more: {
    id: 'more',
    labelEn: 'More Tools & Knowledge Menu',
    labelHi: 'अधिक सेवाएं व टूल्स मेनू',
    labelMr: 'अधिक साधने व मेनू',
    labelTa: 'கூடுதல் சேவைகள் மெனு',
    labelTe: 'మరిన్ని సాధనాలు & మెనూ',
    labelKn: 'ಇನ್ನಷ್ಟು ಪರಿಕರಗಳು',
    labelGu: 'વધુ સાಧનો મેનૂ',
    labelBn: 'আরও টুলস ও মেনু',
    labelPa: 'ਹੋਰ ਟੂਲਜ਼ ਤੇ ਮੇਨੂ',
    labelMl: 'കൂടുതൽ ടൂളുകൾ മെനു',
    keywords: [
      'more', 'menu', 'all tools', 'knowledge hub', 'more menu', 'more tools',
      // Devanagari
      'अधिक', 'मेनू', 'मेन्यू', 'इतर',
      // Tamil
      'மேலும்', 'மெனு', 'மற்றவை',
      // Telugu & Kannada
      'మరిన్ని', 'మెనూ', 'ಇನ್ನಷ್ಟು'
    ]
  }
};

// ─── VERBS & PHRASES INDICATING NAVIGATION INTENT ───
const NAVIGATION_VERBS = [
  // English
  'go to', 'navigate to', 'navigate', 'take me to', 'bring me to', 'switch to', 'jump to', 
  'open', 'show', 'show me', 'display', 'view', 'visit', 'load', 'launch', 'redirect to', 
  'head to', 'move to', 'take me', 'bring me', 'look at', 'switch page', 'open page', 'take us to',
  // Hindi
  'खोलो', 'खोलें', 'खोलना', 'दिखाओ', 'दिखाइए', 'दिखाना', 'ले चलो', 'चलो', 'जाना है', 'जाओ', 
  'पर जाओ', 'में जाओ', 'पेज खोलो', 'पेज दिखाओ', 'पर ले जाओ', 'स्क्रीन पर लाओ', 'ले जाओ',
  // Marathi
  'उघडा', 'उघडावे', 'उघड', 'दाखवा', 'दाखवावे', 'दाखव', 'वर जा', 'कडे जा', 'घेऊन चला', 'घेऊन जा', 
  'चला', 'जा', 'ने', 'पेज उघडा', 'स्क्रीन दाखवा', 'पहायचे आहे', 'दाखवा मला',
  // Tamil
  'திற', 'திறக்கவும்', 'காட்டு', 'காட்டுங்கள்', 'போ', 'போக வேண்டும்', 'செல்லவும்', 
  'அழைத்துச் செல்', 'பக்கத்திற்கு போ', 'பக்கம் திற', 'காண்பி',
  // Telugu
  'వెళ్ళు', 'తీసుకెళ్ళు', 'తెరువు', 'చూపించు', 'ఓపెన్ చేయి', 'పేజీకి వెళ్ళు',
  // Kannada
  'ಹೋಗು', 'ತೆರೆ', 'ತೋರಿಸು', 'ಕರೆದೊಯ್ಯು', 'ಓಪನ್ ಮಾಡು', 'ಪುಟಕ್ಕೆ ಹೋಗು',
  // Gujarati
  'ખોલો', 'બતાવો', 'લઈ જાઓ', 'જાઓ',
  // Bengali
  'खोलो', 'খুলুন', 'নিয়ে যাও', 'দেখাও', 'যান',
  // Punjabi
  'ਖੋਲ੍ਹੋ', 'ਦਿਖਾਓ', 'ਲੈ ਚੱਲੋ', 'ਜਾਓ',
  // Malayalam
  'തുറക്കൂ', 'കാണിക്കൂ', 'പോകൂ'
];

/**
 * Checks if a given text contains any token from candidate list
 */
function containsAny(text, candidates) {
  const norm = text.toLowerCase();
  return candidates.some(cand => {
    const c = cand.toLowerCase();
    // Regex word boundary for ASCII / substring match for Indic scripts
    if (/^[a-z0-9\s]+$/.test(c)) {
      const reg = new RegExp(`(^|\\s)${c.replace(/\s+/g, '\\s+')}(\\s|$)`, 'i');
      return reg.test(norm);
    }
    return norm.includes(c);
  });
}

/**
 * Determine localized label for a route
 */
export function getRouteLabel(routeId, lang = 'en') {
  const route = NAVIGATION_ROUTES[routeId];
  if (!route) return routeId;

  const key = 'label' + lang.charAt(0).toUpperCase() + lang.slice(1);
  return route[key] || route.labelEn;
}

/**
 * Generate natural spoken audio confirmation for navigation in all 10 languages
 */
export function getNavigationSpokenConfirmation(routeId, lang = 'en') {
  const label = getRouteLabel(routeId, lang);

  switch (lang) {
    case 'hi':
      return `मैं आपको ${label} अभी खोलकर दिखा रहा हूँ।`;
    case 'mr':
      return `मी आपल्यासाठी ${label} लगेच स्क्रीनवर उघडत आहे.`;
    case 'ta':
      return `உங்களுக்காக ${label} பக்கத்தை உடனே திரையில் காட்டுகிறேன்.`;
    case 'te':
      return `మీ కోసం ${label} పేజీని ఇప్పుడే తెరుస్తున్నాను.`;
    case 'kn':
      return `ನಿಮಗಾಗಿ ${label} ಪುಟವನ್ನು ಈಗ ತೆರೆಯುತ್ತಿದ್ದೇನೆ.`;
    case 'gu':
      return `હું તમારા માટે ${label} હમણાં જ ખોલી રહ્યો છું.`;
    case 'bn':
      return `আপনার জন্য ${label} পৃষ্ঠাটি এখনই খুলছি।`;
    case 'pa':
      return `ਮੈਂ ਤੁਹਾਡੇ ਲਈ ${label} ਪੇਜ ਹੁਣੇ ਖੋਲ੍ਹ ਰਿਹਾ ਹਾਂ।`;
    case 'ml':
      return `നിങ്ങൾക്കായി ${label} പേജ് ഇപ്പോൾ തുറക്കുന്നു.`;
    case 'en':
    default:
      return `Opening ${label} for you right away.`;
  }
}

/**
 * Primary intent detection function:
 * Analyzes the user's transcript to determine if it is a navigation instruction,
 * and if so, returns the target route ID, label, and spoken confirmation.
 * 
 * @param {string} query - Spoken user query text
 * @param {string} lang - Active language code (e.g. 'en', 'hi', 'mr', 'ta')
 * @returns {object|null} - Navigation intent payload or null
 */
export function detectNavigationIntent(query, lang = 'en') {
  if (!query || typeof query !== 'string') return null;
  const q = query.trim().toLowerCase();
  if (q.length < 2) return null;

  // 1. Guard against non-navigation informational questions
  // e.g. "what is the market price of tomato?" or "why is leaf turning yellow?"
  const informationalQueryMarkers = [
    'what is', 'what are', 'how much', 'how to', 'when to', 'why is', 'why are', 'should i',
    'कमी कसे', 'काय आहे', 'कसे करावे', 'किती भाव', 'काय करू',
    'क्या है', 'कैसे करें', 'कितना भाव', 'कब करें', 'क्या दवा',
    'என்ன விலை', 'எப்படி கட்டுப்படுத்துவது', 'மருந்து என்ன', 'எப்போது தெளிக்க',
    'ఎలా', 'ఏమిటి', 'ధర ఎంత', 'ಹೇಗೆ', 'ಯಾವಾಗ'
  ];

  const hasInfoQuestion = containsAny(q, informationalQueryMarkers);

  // 2. Check if query contains navigation verbs
  const hasNavVerb = containsAny(q, NAVIGATION_VERBS);

  // 3. Score all routes based on keywords matched in query
  let bestMatch = null;
  let highestScore = 0;

  for (const [routeId, routeData] of Object.entries(NAVIGATION_ROUTES)) {
    let score = 0;
    for (const kw of routeData.keywords) {
      const kwLower = kw.toLowerCase();
      if (/^[a-z0-9\s]+$/.test(kwLower)) {
        const regex = new RegExp(`(^|\\s)${kwLower.replace(/\s+/g, '\\s+')}(\\s|$)`, 'i');
        if (regex.test(q)) {
          // Longer match = higher weight
          score += kwLower.split(' ').length * 3;
        }
      } else if (q.includes(kwLower)) {
        score += kwLower.length >= 3 ? 3 : 1;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = routeId;
    }
  }

  // 4. Decision Rule:
  // - If query clearly has a navigation verb AND matches a route keyword -> POSITIVE
  // - If query is short (< 35 chars) without informational question markers AND has strong route match -> POSITIVE
  //   (e.g. "leaf scanner", "open market", "दवाखाना स्कॅनर", "शासकीय योजना दाखवा", "go to home")
  if (bestMatch && highestScore > 0) {
    if (hasNavVerb) {
      // Strong explicit navigation
      const label = getRouteLabel(bestMatch, lang);
      const spokenText = getNavigationSpokenConfirmation(bestMatch, lang);

      return {
        isNavigation: true,
        targetTab: bestMatch,
        label,
        spokenText,
        confidence: 0.95
      };
    }

    if (!hasInfoQuestion && q.length <= 40 && highestScore >= 2) {
      // Direct destination request (e.g. "AI Crop Scanner", "mandi rates page", "satellite map")
      const label = getRouteLabel(bestMatch, lang);
      const spokenText = getNavigationSpokenConfirmation(bestMatch, lang);

      return {
        isNavigation: true,
        targetTab: bestMatch,
        label,
        spokenText,
        confidence: 0.85
      };
    }
  }

  return null;
}
