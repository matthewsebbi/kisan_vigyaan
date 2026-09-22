import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Camera, 
  ShoppingBag, 
  ChevronRight, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  Sparkles,
  MapPin,
  TrendingUp,
  Droplets,
  Activity,
  Calendar,
  CloudRain,
  Sun,
  Zap,
  ShieldCheck,
  Plane,
  Radio,
  Gauge,
  Thermometer,
  Calculator,
  Wind,
  Mic,
  Cpu,
  Bot
} from 'lucide-react';
import { PlotDrawerPanel } from './PlotDrawerPanel';
import { KisanChatBot } from '../chat/KisanChatBot';

export const WebFarmerHomeScreen = ({ onNavigate }) => {
  const { lang, t, theme, currentUser, setIsChotaKissanOpen, setIsChatbotOpen } = useApp();
  const isDark = theme === 'dark';

  // Helper to retrieve localized text for plots
  const getPlotLocalized = (plot, field) => {
    if (!plot) return '';
    const localizedField = `${field}_${lang}`;
    if (plot[localizedField]) return plot[localizedField];
    if (lang === 'mr' && plot[`${field}Mr`]) return plot[`${field}Mr`];
    if (lang === 'hi' && plot[`${field}Hi`]) return plot[`${field}Hi`];
    if (lang === 'ta' && plot[`${field}Ta`]) return plot[`${field}Ta`];
    if (lang === 'te' && plot[`${field}Te`]) return plot[`${field}Te`];
    if (lang === 'kn' && plot[`${field}Kn`]) return plot[`${field}Kn`];
    return plot[field] || '';
  };

  // Cultivated Plots Matrix State
  const [plots, setPlots] = useState([
    {
      id: 'plot-1',
      name: 'Zone 1 - Rice Field (MTU 1010)',
      nameMr: 'झोन १ - भात शेती (एमटीयू १०१०)',
      nameHi: 'जोन 1 - धान खेत (MTU 1010)',
      nameTa: 'மண்டலம் 1 - நெல் வயல் (MTU 1010)',
      nameTe: 'పొలం 1 - వరి చేను (MTU 1010)',
      nameKn: 'ಜಮೀನು 1 - ಭತ್ತದ ಗದ್ದೆ (MTU 1010)',
      cropIcon: '🌾',
      cropName: 'Rice (Paddy MTU 1010)',
      cropNameMr: 'भात (एमटीयू १०१०)',
      cropNameHi: 'धान (एमटीयू 1010)',
      cropNameTa: 'நெல் (MTU 1010)',
      cropNameTe: 'వరి (MTU 1010)',
      cropNameKn: 'ಭತ್ತ (MTU 1010)',
      acreage: '2.5 Acres',
      acreageMr: '२.५ एकर',
      acreageHi: '2.5 एकड़',
      acreageTa: '2.5 ஏக்கர்',
      acreageTe: '2.5 ఎకరాలు',
      acreageKn: '2.5 ಎಕರೆ',
      healthStatus: 'Optimal Growth',
      statusType: 'healthy',
      ndvi: 0.78,
      soilVWC: 41,
      temp: 28.4,
      color: 'green',
      dripOn: true,
      adviceEn: 'Canopy chlorophyll is optimal. Maintain 5cm water level.',
      adviceMr: 'पिकाची वाढ उत्तम आहे. ५ सेमी पाण्याची पातळी ठेवा.',
      adviceHi: 'फसल की वृद्धि उत्तम है। 5 सेमी जल स्तर बनाए रखें।',
      adviceTa: 'பயிர் வளர்ச்சி நன்றாக உள்ளது. 5 செ.மீ நீர் மட்டத்தை பராமரிக்கவும்.',
      adviceTe: 'పంట పెరుగుదల బాగుంది. 5 సెం.మీ నీటి స్థాయిని ఉంచండి.',
      adviceKn: 'ಬೆಳೆ ಬೆಳವಣಿಗೆ ಉತ್ತಮವಾಗಿದೆ. 5 ಸೆಂ.ಮೀ ನೀರಿನ ಮಟ್ಟವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ.',
      diseaseName: null,
      urgentAction: null
    },
    {
      id: 'plot-2',
      name: 'Zone 2 - Bt Cotton Field',
      nameMr: 'झोन २ - बीटी कापूस',
      nameHi: 'जोन 2 - बीटी कपास',
      nameTa: 'மண்டலம் 2 - பிடி பருத்தி நிலம்',
      nameTe: 'పొలం 2 - బీటీ పత్తి చేను',
      nameKn: 'ಜಮೀನು 2 - ಬಿಟಿ ಹತ್ತಿ ಜಮೀನು',
      cropIcon: '🌿',
      cropName: 'Cotton (Bt Hybrid)',
      cropNameMr: 'कापूस (बीटी हायब्रिड)',
      cropNameHi: 'कपास (बीटी हाइब्रिड)',
      cropNameTa: 'பருத்தி (பிடி ஹைப்ரிட்)',
      cropNameTe: 'పత్తి (బీటీ హైబ్రిడ్)',
      cropNameKn: 'ಹತ್ತಿ (ಬಿಟಿ ಹೈಬ್ರಿಡ್)',
      acreage: '3.0 Acres',
      acreageMr: '३.० एकर',
      acreageHi: '3.0 एकड़',
      acreageTa: '3.0 ஏக்கர்',
      acreageTe: '3.0 ఎకరాలు',
      acreageKn: '3.0 ಎಕರೆ',
      healthStatus: 'Bacterial Blight Active',
      statusType: 'critical',
      ndvi: 0.38,
      soilVWC: 22,
      temp: 31.2,
      color: 'red',
      dripOn: false,
      adviceEn: 'Bacterial Blight spreading in Block B. Prune affected foliage.',
      adviceMr: 'जिवाणू करपा आढळला आहे. बाधित पाने त्वरित छाटा.',
      adviceHi: 'बैक्टीरियल ब्लाइट दिखा है। प्रभावित पत्तियां काटें।',
      adviceTa: 'பாக்டீரியா கருகல் நோய் கண்டறியப்பட்டுள்ளது. பாதிக்கப்பட்ட இலைகளை கவாத்து செய்க.',
      adviceTe: 'బాక్టీరియల్ బ్లైట్ తెగులు కనిపించింది. సోకిన ఆకులను తొలగించండి.',
      adviceKn: 'ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಬ್ಲೈಟ್ ರೋಗ ಕಂಡುಬಂದಿದೆ. ಪೀಡಿತ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ.',
      diseaseName: 'Bacterial Blight (Xanthomonas)',
      diseaseNameMr: 'जिवाणू करपा (झांथोमोनास)',
      diseaseNameHi: 'बैक्टीरियल ब्लाइट (जैंथोमोनास)',
      diseaseNameTa: 'பாக்டீரியா கருகல் நோய் (சாந்தோமோனாஸ்)',
      diseaseNameTe: 'బాక్టీరియల్ బ్లైట్ (జాంతోమోనాస్)',
      diseaseNameKn: 'ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಬ್ಲೈಟ್ (ಕ್ಸಾಂಥೋಮೊನಾಸ್)',
      urgentAction: 'Spray Streptocycline (0.5g/L)'
    },
    {
      id: 'plot-3',
      name: 'Zone 3 - Sugarcane (Co 86032)',
      nameMr: 'झोन ३ - ऊस शेती (को ८६०३२)',
      nameHi: 'जोन 3 - गन्ना (Co 86032)',
      nameTa: 'மண்டலம் 3 - கரும்பு தோட்டம் (Co 86032)',
      nameTe: 'పొలం 3 - చెరకు తోట (Co 86032)',
      nameKn: 'ಜಮೀನು 3 - ಕಬ್ಬಿನ ಗದ್ದೆ (Co 86032)',
      cropIcon: '🎋',
      cropName: 'Sugarcane (Co 86032)',
      cropNameMr: 'ऊस (को ८६०३२)',
      cropNameHi: 'गन्ना (Co 86032)',
      cropNameTa: 'கரும்பு (Co 86032)',
      cropNameTe: 'చెరకు (Co 86032)',
      cropNameKn: 'ಕಬ್ಬು (Co 86032)',
      acreage: '4.0 Acres',
      acreageMr: '४.० एकर',
      acreageHi: '4.0 एकड़',
      acreageTa: '4.0 ஏக்கர்',
      acreageTe: '4.0 ఎకరాలు',
      acreageKn: '4.0 ಎಕರೆ',
      healthStatus: 'Tillering Phase Healthy',
      statusType: 'healthy',
      ndvi: 0.84,
      soilVWC: 45,
      temp: 27.8,
      color: 'green',
      dripOn: true,
      adviceEn: 'Tillering rate excellent. Apply Urea dose next week.',
      adviceMr: 'फुटवे भरपूर आले आहेत. पुढील आठवड्यात खताची मात्रा द्या.',
      adviceHi: 'कल्ले अच्छे निकले हैं। अगले सप्ताह यूरिया डालें।',
      adviceTa: 'தூர்கள் நன்றாக வந்துள்ளன. அடுத்த வாரம் உரம் இடவும்.',
      adviceTe: 'పిలకలు బాగా వచ్చాయి. వచ్చే వారం ఎరువులు వేయండి.',
      adviceKn: 'ಮೊಗ್ಗುಗಳು ಚೆನ್ನಾಗಿ ಬಂದಿವೆ. ಮುಂದಿನ ವಾರ ಯೂರಿಯಾ ಹಾಕಿ.',
      diseaseName: null,
      urgentAction: null
    },
    {
      id: 'plot-4',
      name: 'Zone 4 - Tomato Field (Abhinav)',
      nameMr: 'झोन ४ - टोमॅटो (अभिनव)',
      nameHi: 'जोन 4 - टमाटर (अभिनव)',
      nameTa: 'மண்டலம் 4 - தக்காளி தோட்டம் (அபினவ்)',
      nameTe: 'పొలం 4 - టమోటా తోట (అభినవ్)',
      nameKn: 'ಜಮೀನು 4 - ಟೊಮೆಟೊ ಜಮೀನು (ಅಭಿನವ್)',
      cropIcon: '🍅',
      cropName: 'Tomato (Abhinav)',
      cropNameMr: 'टोमॅटो (अभिनव)',
      cropNameHi: 'टमाटर (अभिनव)',
      cropNameTa: 'தக்காளி (அபினவ்)',
      cropNameTe: 'టమోటా (அபினవ్)',
      cropNameKn: 'ಟೊಮೆಟೊ (ಅಭಿನವ್)',
      acreage: '1.5 Acres',
      acreageMr: '१.५ एकर',
      acreageHi: '1.5 एकड़',
      acreageTa: '1.5 ஏக்கர்',
      acreageTe: '1.5 ఎకరాలు',
      acreageKn: '1.5 ಎಕರೆ',
      healthStatus: 'Early Blight Notice',
      statusType: 'warning',
      ndvi: 0.52,
      soilVWC: 28,
      temp: 30.1,
      color: 'amber',
      dripOn: false,
      adviceEn: 'Concentric leaf spots spotted on 4 plants. Mancozeb spray suggested.',
      adviceMr: 'पानांवर करप्याचे डाग आढळले. मँकोझेब फवारणी करा.',
      adviceHi: 'पत्तियों पर अगेती झुलसा दिखा। मैंकोजेब छिड़कें।',
      adviceTa: 'இலைகளில் கருகல் புள்ளிகள் காணப்படுகின்றன. மான்கோசெப் தெளிக்கவும்.',
      adviceTe: 'ఆకులపై మచ్చలు కనిపించాయి. మాంకోజెబ్ పిచికారీ చేయండి.',
      adviceKn: 'ಎಲೆಗಳ ಮೇಲೆ ಕಲೆಗಳು ಕಂಡುಬಂದಿವೆ. ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ.',
      diseaseName: 'Early Blight (Alternaria solani)',
      diseaseNameMr: 'अगेती करपा (अल्टरनेरिया)',
      diseaseNameHi: 'अगेती झुलसा (अल्टरनेरिया)',
      diseaseNameTa: 'முற்கால கருகல் நோய் (ஆல்டர்நேரியா)',
      diseaseNameTe: 'ముందస్తు తెగులు (ఆల్టర్నేరియా)',
      diseaseNameKn: 'ಆರಂಭಿಕ ರೋಗ (ಆಲ್ಟರ್ನೇರಿಯಾ)',
      urgentAction: 'Spray Mancozeb 75% WP'
    },
    {
      id: 'plot-5',
      name: 'Zone 5 - Pomegranate Orchard (Bhagwa)',
      nameMr: 'झोन ५ - डाळिंब बाग (भगवा)',
      nameHi: 'जोन 5 - अनार बाग (भगवा)',
      nameTa: 'மண்டலம் 5 - மாதுளை தோட்டம் (பக்வா)',
      nameTe: 'పొలం 5 - దానిమ్మ తోట (భగ్వా)',
      nameKn: 'ಜಮೀನು 5 - ದಾಳಿಂಬೆ ತೋಟ (ಭಗವಾ)',
      cropIcon: '🪴',
      cropName: 'Pomegranate (Bhagwa)',
      cropNameMr: 'डाळिंब (भगवा)',
      cropNameHi: 'अनार (भगवा)',
      cropNameTa: 'மாதுளை (பக்வா)',
      cropNameTe: 'దానిమ్మ (భగ్వా)',
      cropNameKn: 'ದಾಳಿಂಬೆ (ಭಗವಾ)',
      acreage: '2.0 Acres',
      acreageMr: '२.० एकर',
      acreageHi: '2.0 एकड़',
      acreageTa: '2.0 ஏக்கர்',
      acreageTe: '2.0 ఎకరాలు',
      acreageKn: '2.0 ಎಕರೆ',
      healthStatus: 'Fruit Setting Optimal',
      statusType: 'healthy',
      ndvi: 0.72,
      soilVWC: 34,
      temp: 29.0,
      color: 'green',
      dripOn: true,
      adviceEn: 'Fruit setting 88%. Maintain boron micronutrient spray.',
      adviceMr: 'फळधारणा उत्तम आहे. बोरॉनची हलकी फवारणी करा.',
      adviceHi: 'फल अच्छा लग रहा है। बोरॉन छिड़काव जारी रखें।',
      adviceTa: 'காய் பிடிப்பு 88% சிறப்பாக உள்ளது. போரான் தெளிப்பு தொடரவும்.',
      adviceTe: 'కాయలు బాగా కాస్తున్నాయి. బోరాన్ పిచికారీ కొనసాగించండి.',
      adviceKn: 'ಹಣ್ಣು ಬಿಡುವಿಕೆ ಉತ್ತಮವಾಗಿದೆ. ಬೋರಾನ್ ಸಿಂಪಡಣೆ ಮುಂದುವರಿಸಿ.',
      diseaseName: null,
      urgentAction: null
    },
    {
      id: 'plot-6',
      name: 'Zone 6 - Soybean (JS 335)',
      nameMr: 'झोन ६ - सोयाबीन (जेएस ३३५)',
      nameHi: 'जोन 6 - सोयाबीन (JS 335)',
      nameTa: 'மண்டலம் 6 - சோயாபீன் (JS 335)',
      nameTe: 'பொలం 6 - சோயாபீன் (JS 335)',
      nameKn: 'ಜಮೀನು 6 - ಸೋಯಾಬೀನ್ (JS 335)',
      cropIcon: '🌱',
      cropName: 'Soybean (JS 335)',
      cropNameMr: 'सोयाबीन (जेएस ३३५)',
      cropNameHi: 'सोयाबीन (JS 335)',
      cropNameTa: 'சோயாபீன் (JS 335)',
      cropNameTe: 'సోయాబీన్ (JS 335)',
      cropNameKn: 'ಸೋಯಾಬೀನ್ (JS 335)',
      acreage: '1.5 Acres',
      acreageMr: '१.५ एकर',
      acreageHi: '१.५ एकड़',
      acreageTa: '1.5 ஏக்கர்',
      acreageTe: '1.5 ఎకరాలు',
      acreageKn: '1.5 ಎಕರೆ',
      healthStatus: 'Branching Phase Healthy',
      statusType: 'healthy',
      ndvi: 0.79,
      soilVWC: 38,
      temp: 27.6,
      color: 'green',
      dripOn: true,
      adviceEn: 'Branching phase healthy. Natural root nodulation active.',
      adviceMr: 'झाडांना चांगली फूट आली आहे.',
      adviceHi: 'फसल स्वस्थ है।',
      adviceTa: 'பயிர் கிளைகள் ஆரோக்கியமாக உள்ளன. இயற்கை வேர் வளர்ச்சி சிறப்பாக உள்ளது.',
      adviceTe: 'కొమ్మల పెరుగుదల బాగుంది. వేర్లు ఆరోగ్యంగా ఉన్నాయి.',
      adviceKn: 'ರೆಂಬೆಗಳು ಚೆನ್ನಾಗಿ ಬೆಳೆದಿವೆ. ನೈಸರ್ಗಿಕ ಬೇರಿನ ಗಂಟುಗಳು ಸಕ್ರಿಯವಾಗಿವೆ.',
      diseaseName: null,
      urgentAction: null
    }
  ]);

  // Selected Plot for Slide-in Right Drawer Panel
  const [selectedPlot, setSelectedPlot] = useState(null);

  // Live Alerts Feed Data
  const alertItems = [
    {
      id: 'alt-1',
      type: 'critical',
      time: 'Just now',
      titleEn: 'Plot 2 (Cotton) Bacterial Blight Active',
      titleMr: 'प्लॉट २ (कापूस) जिवाणू करपा आढळला',
      titleHi: 'प्लॉट 2 (कपास) बैक्टीरियल ब्लाइट प्रकोप',
      titleTa: 'நிலம் 2 (பருத்தி) பாக்டீரியா கருகல் நோய் உள்ளது',
      titleTe: 'పొలం 2 (పత్తి) బాక్టీరియల్ బ్లైట్ వ్యాపించింది',
      titleKn: 'ಜಮೀನು 2 (ಹತ್ತಿ) ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಬ್ಲೈಟ್ ರೋಗವಿದೆ',
      descEn: 'Angular water-soaked spots detected on lower leaves. Immediate Streptocycline spray advised.',
      descMr: 'पानांवर करप्याचे डाग आढळले. स्ट्रेप्टोमायसीन फवारणी तातडीने करा.',
      descHi: 'पत्तियों पर धब्बे दिखे हैं। तुरंत स्ट्रेप्टोसाइक्लिन छिड़काव करें।',
      descTa: 'கீழ் இலைகளில் கருகல் புள்ளிகள் காணப்படுகின்றன. உடனடியாக ஸ்ட்ரெப்டோசைக்ளின் தெளிக்கவும்.',
      descTe: 'దిగువ ఆకులపై మచ్చలు కనిపించాయి. వెంటనే స్ట్రెప్టోసైక్లిన్ పిచికారీ చేయండి.',
      descKn: 'ಕೆಳಗಿನ ಎಲೆಗಳಲ್ಲಿ ಕಲೆಗಳು ಕಂಡುಬಂದಿವೆ. ತಕ್ಷಣ ಸ್ಟ್ರೆಪ್ಟೊಸೈಕ್ಲಿನ್ ಸಿಂಪಡಿಸಿ.',
      actionKey: 'fixPlot2',
      targetPlotId: 'plot-2'
    },
    {
      id: 'alt-2',
      type: 'warning',
      time: '2 hours ago',
      titleEn: 'Sangli Rain & Humidity Surge Forecast',
      titleMr: 'सांगली पाऊस व आर्द्रता वाढ अंदाज',
      titleHi: 'सांगली में वर्षा व आर्द्रता वृद्धि चेतावनी',
      titleTa: 'சாங்லி மழை & ஈரப்பதம் எச்சரிக்கை',
      titleTe: 'సాంగ్లీ వర్షం & తేమ హెచ్చరిక',
      titleKn: 'ಸಾಂಗ್ಲಿ ಮಳೆ ಮತ್ತು ತೇವಾಂಶ ಎಚ್ಚರಿಕೆ',
      descEn: 'Rainfall expected tomorrow evening. Spore germination conditions high.',
      descMr: 'उद्या संध्याकाळी पावसाची शक्यता. बुरशीचा प्रादुर्भाव वाढू शकतो.',
      descHi: 'कल शाम बारिश की संभावना। कवक संक्रमण का खतरा अधिक।',
      descTa: 'நாளை மாலை மழை பெய்ய வாய்ப்புள்ளது. பூஞ்சை தொற்று அதிகரிக்கும் அபாயம்.',
      descTe: 'రేపు సాయంత్రం వర్షం పడే అవకాశం. శిలీంధ్ర వ్యాప్తి ప్రమాదం ఎక్కువ.',
      descKn: 'ನಾಳೆ ಸಂಜೆ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ. ಶಿಲೀಂಧ್ರ ರೋಗ ಹೆಚ್ಚಾಗುವ ಸಾಧ್ಯತೆ.',
      actionKey: 'viewWeatherAndSat',
      targetPlotId: null
    }
  ];

  const handleTogglePlotDrip = (plotId) => {
    setPlots(prev => prev.map(p => p.id === plotId ? { ...p, dripOn: !p.dripOn } : p));
    if (selectedPlot && selectedPlot.id === plotId) {
      setSelectedPlot(prev => ({ ...prev, dripOn: !prev.dripOn }));
    }
  };

  const handleAlertAction = (alert) => {
    if (alert.targetPlotId) {
      const target = plots.find(p => p.id === alert.targetPlotId);
      if (target) setSelectedPlot(target);
    } else {
      onNavigate('satelliteMapping');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn font-sans">
      
      {/* 1. DAILY BRIEFING & MICROCLIMATE HEADER (STITCH BLUEPRINT) */}
      <div className="stitch-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex items-start space-x-4 sm:space-x-5">
            {/* Status Live Orb */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
              isDark ? 'bg-[#121F38] border-[#1E2E4A]' : 'bg-[#ECFDF5] border-[#A7F3D0]'
            }`}>
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Telemetry Live
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {currentUser.village || 'Nashik Valley'} • Parcel #4 (14.5 Ha)
                </span>
              </div>
              
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 leading-tight text-[#012D1D] dark:text-white">
                {t('welcomeFarmer', 'Good morning')}, {currentUser.name || 'Farmer'} <span className="text-slate-500 dark:text-slate-400 text-base font-normal">(नमस्ते / शुभ सकाळ)</span>
              </h1>
              
              {/* Telemetry Micro-Pills */}
              <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <strong className="text-slate-800 dark:text-slate-200">Sangli • Miraj Block</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="tabular-nums">28.4°C Clear</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span className="tabular-nums">68% RH</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-slate-500" />
                  <span className="tabular-nums">Wind 8 km/h NW</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Primary Action Buttons */}
          <div className="flex items-center space-x-2.5 self-start lg:self-center shrink-0 flex-wrap">
            <button
              onClick={() => onNavigate('scan')}
              className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-emerald-300" />
              <span>{t('scanCropDisease', 'Scan Crop Disease')}</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('core-dashboard-chatbot');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  const input = el.querySelector('input');
                  if (input) input.focus();
                } else if (setIsChatbotOpen) {
                  setIsChatbotOpen(true);
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#121F38] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>AI Chatbot (TTS)</span>
            </button>

            <button
              onClick={() => onNavigate('market')}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#121F38] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('orderMedicines', 'Market & Seeds')}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. LIVE ESP32 HARDWARE TELEMETRY GAUGES ROW (STITCH BLUEPRINT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Soil Moisture */}
        <div className="stitch-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Soil Moisture (VWC)</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold tabular-nums text-[#012D1D] dark:text-white">38.2</span>
            <span className="text-sm font-semibold text-slate-500">%</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">Optimal (30–45%)</span>
            <span>Sensor #14-A</span>
          </div>
        </div>

        {/* Card 2: Leaf Wetness & Spore Index */}
        <div className="stitch-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Leaf Wetness Duration</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Spore Risk
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold tabular-nums text-amber-700 dark:text-amber-400">11.5</span>
            <span className="text-sm font-semibold text-slate-500">hrs</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-amber-700 dark:text-amber-400">Blight Alert Window</span>
            <span>Canopy Probe B</span>
          </div>
        </div>

        {/* Card 3: Canopy Temperature */}
        <div className="stitch-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Canopy Temperature</span>
            <span className="text-xs font-mono text-slate-500">DHT22 Live</span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold tabular-nums text-[#012D1D] dark:text-white">28.4</span>
            <span className="text-sm font-semibold text-slate-500">°C</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">68% RH Microclimate</span>
            <span>Target: 22–30°C</span>
          </div>
        </div>
      </div>

      {/* 3. FOUR PROMINENT SHORTCUT TILES (MODULAR MINIMAL CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tile 1: AI Leaf Pathology */}
        <div 
          onClick={() => onNavigate('scan')}
          className="stitch-card p-4.5 cursor-pointer flex items-center space-x-3.5 group"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
            📷
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider block font-mono">
              {t('leafPathologyBadge', 'LEAF PATHOLOGY')}
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {t('scanCropDisease', 'Scan Crop Disease')}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t('instantDiagnosisSub', 'Instant diagnosis & dosage')}
            </p>
          </div>
        </div>

        {/* Tile 2: Subsidized Farm Inputs */}
        <div 
          onClick={() => onNavigate('market')}
          className="stitch-card p-4.5 cursor-pointer flex items-center space-x-3.5 group"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
            🧪
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400 tracking-wider block font-mono">
              {t('dbtSubsidiesBadge', 'DBT SUBSIDIES')}
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {t('orderFarmInputs', 'Order Farm Inputs')}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t('farmInputsSub', 'Seeds & bio-agents')}
            </p>
          </div>
        </div>

        {/* Tile 3: Satellite GIS Mapping */}
        <div 
          onClick={() => onNavigate('satelliteMapping')}
          className="stitch-card p-4.5 cursor-pointer flex items-center space-x-3.5 group"
        >
          <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
            🛰️
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-cyan-700 dark:text-cyan-400 tracking-wider block font-mono">
              ISRO SENTINEL-2
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              Satellite GIS & NDVI
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              District multi-spectral scans
            </p>
          </div>
        </div>

        {/* Tile 4: Live Mandi Rates */}
        <div 
          onClick={() => onNavigate('market')}
          className="stitch-card p-4.5 cursor-pointer flex items-center space-x-3.5 group"
        >
          <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
            📊
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-400 tracking-wider block font-mono">
              {t('liveMandiBadge', 'LIVE MANDI')}
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {t('apmcRates', 'APMC Crop Rates')}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t('buyerConnectSub', 'Real-time commodity ticker')}
            </p>
          </div>
        </div>
      </div>

      {/* 2.5 CORE DASHBOARD EMBEDDED KISAN AI CHATBOT (WITH MULTILINGUAL TTS AUDIO SERVICE) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>{lang === 'mr' ? 'किसान एआय कृषी चॅटबॉट (थेट आवाज व टीटीएस)' : lang === 'ta' ? 'கிசான் AI விவசாய சாட்போட் (TTS)' : lang === 'hi' ? 'किसान एआई कृषि चैटबॉट (ऑडियो व टीटीएस)' : 'Kisan AI Agronomist Chatbot (Interactive TTS)'}</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
              Live Core Assistant
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            Voice Typing • Audio Readout • Instant Agronomy Solutions
          </span>
        </div>

        <KisanChatBot 
          id="core-dashboard-chatbot"
          isWidget={false} 
          embedded={true} 
          onNavigate={onNavigate} 
        />
      </div>

      {/* 3. MAIN DASHBOARD CONTENT (Two-Column Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (7 cols): Cultivated Plot Matrix & Environmental Early Warning */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* AI Environmental Disease Prediction Radar Hero Banner */}
          <div 
            onClick={() => onNavigate('environmentalPrediction')}
            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-md group ${
              isDark 
                ? 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-emerald-500/50 text-white' 
                : 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border-emerald-400 text-slate-900'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#047857] to-[#065F46] text-white flex items-center justify-center text-2xl shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono">
                      AI Microclimate Intelligence
                    </span>
                    <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase font-mono bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border border-orange-300">
                      2 Plots in Alert Zone
                    </span>
                  </div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                    Environmental Disease Prediction & Early Warning
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Continuous multi-factor suitability monitoring (Temp 29°C, RH 88%, Leaf Wetness 11.5h). Detects favorable pathogen windows <strong>48 hours before</strong> visual symptoms appear.
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t('yourPlots', 'Cultivated Farm Plots')}</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium hidden sm:inline">
                ({t('clickToInspect', 'Select a plot to inspect telemetry & remedies')})
              </span>
            </h2>
            <span className="text-xs font-mono text-emerald-800 dark:text-emerald-400 font-bold bg-[#E8F5EB] dark:bg-emerald-950/40 px-2.5 py-1 rounded-xl border border-emerald-300 dark:border-emerald-900">
              {t('sixRegisteredPlots', '6 Plots Registered')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plots.map(plot => {
              const isRed = plot.color === 'red';
              const isAmber = plot.color === 'amber';
              const isGreen = plot.color === 'green';

              const plotTitle = getPlotLocalized(plot, 'name');
              const plotCropName = getPlotLocalized(plot, 'cropName');

              const badgeClass = isRed 
                ? 'badge-critical' 
                : isAmber 
                ? 'badge-advisory' 
                : 'badge-optimal';

              return (
                <div
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  className="stitch-card p-5 cursor-pointer flex flex-col justify-between min-h-[210px] group"
                >
                  <div>
                    {/* Top Row: Crop Icon + Status Pill */}
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform">
                        {plot.cropIcon}
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${badgeClass}`}>
                        {isRed ? t('sprayNeeded', 'Spray Needed') : isAmber ? t('checkLeaves', 'Check Leaves') : t('healthy', 'Optimal')}
                      </span>
                    </div>

                    {/* Plot Title */}
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-3 leading-tight">
                      {plotTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {plotCropName} • {getPlotLocalized(plot, 'acreage')}
                    </p>

                    {/* Visual Telemetry Bars */}
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono font-semibold">
                        <span className="text-slate-500 dark:text-slate-400">NDVI Canopy:</span>
                        <strong className={isRed ? 'text-rose-600 dark:text-rose-400' : isAmber ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}>
                          {plot.ndvi} / 1.0
                        </strong>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isRed ? 'bg-rose-500' : isAmber ? 'bg-amber-500' : 'bg-[#006C48]'}`}
                          style={{ width: `${plot.ndvi * 100}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-0.5">
                        <span>VWC: <strong className="text-slate-800 dark:text-slate-200">{plot.soilVWC}%</strong></span>
                        <span>Temp: <strong className="text-slate-800 dark:text-slate-200">{plot.temp}°C</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className={`font-semibold text-xs flex items-center gap-1 ${
                      isRed ? 'text-rose-600 dark:text-rose-400' : isAmber ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'
                    }`}>
                      {isRed ? t('immediateActionRequired', 'Action Required') : isAmber ? t('cautionNeeded', 'Caution Advised') : t('optimalGrowth', 'Optimal Growth')}
                    </span>

                    <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      <span>{t('inspect', 'Inspect')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* RIGHT COLUMN (5 cols): Live Advisories & GIS Radar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t('activeFieldAdvisories', 'Active Field Advisories')}</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800 font-mono">
              {t('activeAlertsCount', '2 Active Alerts')}
            </span>
          </div>

          <div className="space-y-3.5">
            {alertItems.map(alert => {
              const isCrit = alert.type === 'critical';
              const title = lang === 'ta' ? alert.titleTa : lang === 'te' ? alert.titleTe : lang === 'kn' ? alert.titleKn : lang === 'mr' ? alert.titleMr : lang === 'hi' ? alert.titleHi : alert.titleEn;
              const desc = lang === 'ta' ? alert.descTa : lang === 'te' ? alert.descTe : lang === 'kn' ? alert.descKn : lang === 'mr' ? alert.descMr : lang === 'hi' ? alert.descHi : alert.descEn;
              const timeTag = alert.time === 'Just now' ? t('justNow', 'JUST NOW') : t('twoHoursAgo', '2 HOURS AGO');

              return (
                <div
                  key={alert.id}
                  className={`p-5 rounded-3xl border transition-all space-y-3 shadow-xs ${
                    isCrit 
                      ? 'bg-[#FFF1F2] dark:bg-[#0a1324] border-2 border-rose-300 dark:border-rose-500/70' 
                      : 'bg-[#FFFBEB] dark:bg-[#0a1324] border-2 border-amber-300 dark:border-amber-500/60'
                  }`}
                >
                  <div className="flex items-start space-x-3.5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                      isCrit ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                    }`}>
                      {isCrit ? <AlertOctagon className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                        {timeTag}
                      </span>
                      <h3 className="font-black text-sm text-slate-900 dark:text-white leading-tight mt-0.5">
                        {title}
                      </h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1 leading-snug">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => handleAlertAction(alert)}
                      className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95 ${
                        isCrit 
                          ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                          : 'bg-[#047857] hover:bg-[#065F46] text-white'
                      }`}
                    >
                      <span>{t(alert.actionKey, 'Inspect & Fix Plot 2')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ISRO Sentinel-2 Satellite Card */}
          <div 
            onClick={() => onNavigate('satelliteMapping')}
            className={`p-5 rounded-3xl border transition-all flex items-center justify-between cursor-pointer hover:shadow-lg ${
              isDark 
                ? 'border-cyan-500/40 bg-gradient-to-r from-[#09152b] to-[#081b1d] text-white' 
                : 'border-emerald-300 bg-gradient-to-r from-[#DCFCE7] via-[#F0FDF4] to-[#D1FAE5] text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-200/80 dark:bg-cyan-500/20 border border-emerald-300 dark:border-cyan-500/40 flex items-center justify-center text-emerald-900 dark:text-cyan-300 shadow-md">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  {lang === 'ta' ? 'இஸ்ரோ / சென்டினல்-2 செயற்கைக்கோள் வரைபடம்' : lang === 'te' ? 'ఇస్రో / సెంటినెల్-2 ఉపగ్రహ పటం' : lang === 'kn' ? 'ಇಸ್ರೋ / ಸೆಂchannel-2 ಉಪಗ್ರಹ ನಕ್ಷೆ' : lang === 'mr' ? 'इस्रो / सेंटिनेल-२ उपग्रह पीक नकाशा' : 'Sentinel-2 Satellite GIS Map'}
                </h3>
                <p className="text-xs text-slate-700 dark:text-cyan-200 mt-0.5 font-medium">
                  {lang === 'ta' ? '36 மாவட்டங்கள் • நேரடி என்.டி.வி.ஐ குறியீடு தகவல்' : lang === 'te' ? '36 జిల్లాలు • నిజ సమయ ఎన్.డి.వి.ఐ సమాచారం' : lang === 'kn' ? '36 ಜಿಲ್ಲೆಗಳು • ನೈಜ ಸಮಯದ ಎನ್‌ಡಿವಿಐ ಮಾಹಿತಿ' : lang === 'mr' ? '३६ जिल्हे • थेट एनडीव्हीआय उपग्रह माहिती' : '36 Maharashtra Districts • Real-time NDVI telemetry'}
                </p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-emerald-800 dark:text-cyan-300" />
          </div>

        </div>

      </div>

      {/* 4. SLIDE-IN RIGHT-SIDE DRAWER */}
      {selectedPlot && (
        <PlotDrawerPanel
          plot={selectedPlot}
          onClose={() => setSelectedPlot(null)}
          onNavigate={onNavigate}
          onToggleDrip={handleTogglePlotDrip}
        />
      )}

    </div>
  );
};
