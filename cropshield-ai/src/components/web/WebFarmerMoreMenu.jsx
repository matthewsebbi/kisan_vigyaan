import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lightbulb, 
  Landmark, 
  BarChart3, 
  Satellite, 
  Users, 
  FileText, 
  ChevronRight, 
  Layers,
  ShieldAlert,
  Activity,
  Mic
} from 'lucide-react';

export const WebFarmerMoreMenu = ({ onNavigate }) => {
  const { lang, t, theme } = useApp();
  const isDark = theme === 'dark';

  const getItemLocalized = (item, field) => {
    if (!item) return '';
    const localizedField = `${field}_${lang}`;
    if (item[localizedField]) return item[localizedField];
    if (lang === 'ta' && item[`${field}Ta`]) return item[`${field}Ta`];
    if (lang === 'te' && item[`${field}Te`]) return item[`${field}Te`];
    if (lang === 'kn' && item[`${field}Kn`]) return item[`${field}Kn`];
    if (lang === 'mr' && item[`${field}Mr`]) return item[`${field}Mr`];
    if (lang === 'hi' && item[`${field}Hi`]) return item[`${field}Hi`];
    return item[`${field}En`] || item[field] || '';
  };

  const menuItems = [
    {
      id: 'chotaKissan',
      labelEn: 'Kisan One — Multilingual AI Voice Assistant',
      labelMr: 'किसान वन — बहुभाषिक एआय कृषी आवाज सहाय्यक',
      labelHi: 'किसान वन — बहुभाषी एआई कृषि वॉयस सहायक',
      labelTa: 'கிசான் ஒன் — பன்மொழி AI விவசாய குரல் உதவியாளர்',
      labelTe: 'కిసాన్ వన్ — బహుభాషా AI వాయిస్ అసిస్టెంట్',
      labelKn: 'ಕಿಸಾನ್ ಒನ್ — ಬಹುಭಾಷಾ AI ಧ್ವನಿ ಸಹಾಯಕ',
      icon: Mic,
      iconBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50',
      descEn: 'Natural voice conversations in 10 Indian languages. Connects with live farm sensors, mandi rates, and disease models.',
      descMr: '१० भारतीय भाषांमध्ये थेट बोलून शेती सल्ला मिळवा. थेट सेन्सर व बाजारभावाशी जोडलेला साथीदार.',
      descHi: '10 भारतीय भाषाओं में बोलकर खेती की सलाह पाएं। खेत के लाइव सेंसर व मंडी भाव से जुड़ा सहायक।',
      descTa: '10 இந்திய மொழிகளில் இயல்பாக பேசி விவசாய ஆலோசனை பெறுங்கள். நேரலை சென்சார்கள் & மண்டி விலையுடன் இணைக்கப்பட்டது.',
      descTe: '10 భారతీయ భాషలలో వాయిస్ ద్వారా వ్యవసాయ సలహాలు పొందండి. లైవ్ సెన్సార్లు & మార్కెట్ ధరలతో అనుసంధానించబడింది.',
      descKn: '10 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಧ್ವನಿ ಮೂಲಕ ಕೃಷಿ ಸಲಹೆ ಪಡೆಯಿರಿ.'
    },
    {
      id: 'environmentalPrediction',
      labelEn: 'AI Environmental Crop Disease Prediction Engine',
      labelMr: 'हवामान आधारित पीक रोग अंदाज प्रणाली',
      labelHi: 'एआई पर्यावरण फसल रोग पूर्वानुमान इंजन',
      labelTa: 'சுற்றுச்சூழல் பயிர் நோய் முன்கணிப்பு இயந்திரம்',
      labelTe: 'వాతావరణ ఆధారిత పంట తెగుళ్ల అంచనా వ్యవస్థ',
      labelKn: 'ಪರಿಸರ ಆಧಾರಿತ ಬೆಳೆ ರೋಗ ಮುನ್ಸೂಚನೆ ವ್ಯವಸ್ಥೆ',
      icon: Activity,
      iconBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50',
      descEn: 'Scientific multi-factor microclimate suitability, 4-stage risk levels, and 48h proactive warning',
      descMr: 'अचूक हवामान अनुकूलता निर्देशांक, ४-स्तरीय जोखीम व ४८ तास आधी पूर्वसूचना',
      descHi: 'सटीक मौसम अनुकूलता सूचकांक, 4-स्तरीय जोखिम व 48 घंटे पूर्व चेतावनी',
      descTa: 'துல்லியமான நுண்ணிய காலநிலை பகுப்பாய்வு & 48 மணிநேர முன்கூட்டிய எச்சரிக்கை',
      descTe: 'ఖచ్చితమైన వాతావరణ విశ్లేషణ & 48 గంటల ముందస్తు హెచ్చరిక',
      descKn: 'ನಿಖರವಾದ ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು 48 ಗಂಟೆಗಳ ಮುಂಚಿನ ಎಚ್ಚರಿಕೆ'
    },
    {
      id: 'riskConsequences',
      labelEn: 'Risk & Threats Consequences (Golden Window)',
      labelMr: 'जोखीम, मर्यादा काळ व पिकांवरील परिणाम',
      labelHi: 'जोखिम, समय सीमा व फसल नुकसान परिणाम',
      labelTa: 'அபாயங்கள் & பயிர் பாதிப்பு விளைவுகள் (தங்க நேரம்)',
      labelTe: 'ప్రమాదాలు & పంట నష్ట పరిణామాలు',
      labelKn: 'ಅಪಾಯಗಳು ಮತ್ತು ಬೆಳೆ ಹಾನಿ ಪರಿಣಾಮಗಳು',
      icon: ShieldAlert,
      iconBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-700/50',
      descEn: 'Threshold action periods (0–48h), minimal damage boundaries & post-threshold escalation risks',
      descMr: 'मर्यादा काळ (०-४८ तास), किमान नुकसान मर्यादा व दुर्लक्ष केल्यास होणारे तीव्र परिणाम',
      descHi: 'समय सीमा (0-48 घंटे), न्यूनतम नुकसान सीमा व देरी के गंभीर परिणाम',
      descTa: 'கால வரம்பு (0-48 மணிநேரம்), குறைந்தபட்ச இழப்பு & காலதாமதத்தின் விபரீதங்கள்',
      descTe: 'సమయ పరిమితి (0-48 గంటలు), కనిష్ట నష్టం & ఆలస్య పరిణామాలు',
      descKn: 'ಸಮಯದ ಮಿತಿ (0-48 ಗಂಟೆ), ಕನಿಷ್ಠ ಹಾನಿ ಮತ್ತು ತಡಮಾಡುವಿಕೆಯ ಪರಿಣಾಮಗಳು'
    },
    {
      id: 'satelliteMapping',
      labelEn: 'ISRO Bhuvan / Sentinel-2 Satellite GIS Map',
      labelMr: 'इस्रो भुवन / उपग्रह पीक व एनडीव्हीआय नकाशा',
      labelHi: 'इसरो भुवन / उपग्रह फसल व एनडीवीआई मानचित्र',
      labelTa: 'இஸ்ரோ புவன் / சென்டினல்-2 செயற்கைக்கோள் வரைபடம்',
      labelTe: 'ఇస్రో భువన్ / సెంటినెల్-2 ఉపగ్రహ పటం',
      labelKn: 'ಇಸ್ರೋ ಭುವನ್ / ಸೆಂchannel-2 ಉಪಗ್ರಹ ನಕ್ಷೆ',
      icon: Satellite,
      iconBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700/50',
      descEn: '36 Districts • Real-time NDVI Vegetation Index & Soil Moisture Telemetry',
      descMr: '३६ जिल्हे • थेट एनडीव्हीआय उपग्रह निर्देशांक व मातीतील ओलावा माहिती',
      descHi: '36 जिले • वास्तविक समय एनडीवीआई सूचकांक व मिट्टी नमी डेटा',
      descTa: '36 மாவட்டங்கள் • நேரடி என்.டி.வி.ஐ குறியீடு மற்றும் மண் ஈரப்பதம்',
      descTe: '36 జిల్లాలు • నిజ సమయ ఎన్.డి.వి.ఐ సూచిక & నేల తేమ వివరాలు',
      descKn: '36 ಜಿಲ್ಲೆಗಳು • ನೈಜ ಸಮಯದ ಎನ್‌ಡಿವಿಐ ಸೂಚ್ಯಂಕ ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶ'
    },
    {
      id: 'proTips',
      labelEn: 'Pro Agronomy Tips & Chemical Formulation Matrix',
      labelMr: 'तज्ज्ञ कृषी सल्ला व रासायनिक खत वेळापत्रक',
      labelHi: 'कृषि विशेषज्ञ सलाह व उर्वरक अनुसूची',
      labelTa: 'விவசாய வல்லுநர் குறிப்புகள் & மருந்தளவு அட்டவணை',
      labelTe: 'వ్యవసాయ నిపుణుల సలహాలు & రసాయన మందుల మోతాదు',
      labelKn: 'ಕೃಷಿ ತಜ್ಞರ ಸಲಹೆಗಳು & ರಾಸಾಯನಿಕ ಪ್ರಮಾಣ ಕೋಷ್ಟಕ',
      icon: Lightbulb,
      iconBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50',
      descEn: 'Denser spray dosage charts, crop calendars, and tank mixing guidelines',
      descMr: 'अचूक फवारणी वेळापत्रक, पीक दिनदर्शिका व खतांचे योग्य मिश्रण',
      descHi: 'सटीक छिड़काव खुराक चार्ट, फसल कैलेंडर व मिश्रण निर्देश',
      descTa: 'தெளிப்பு மருந்தளவு அட்டவணை, பயிர் நாட்காட்டி & கலவை வழிகாட்டுதல்',
      descTe: 'పిచికారీ మోతాదు చార్టులు, పంట క్యాలెండర్ & ట్యాంక్ మిక్సింగ్ వివరాలు',
      descKn: 'ಸಿಂಪಡಣೆ ಪ್ರಮಾಣ ಚಾರ್ಟ್, ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್ ಮತ್ತು ಮಿಶ್ರಣ ಮಾರ್ಗಸೂಚಿಗಳು'
    },
    {
      id: 'govtSchemes',
      labelEn: 'Govt. Schemes, DBT Subsidies & PM-KISAN Portal',
      labelMr: 'शासकीय योजना, थेट बँक खात्यात अनुदान व पीएम-किसान',
      labelHi: 'सरकारी योजनाएं, डीबीटी सब्सिडी व पीएम-किसान',
      labelTa: 'அரசு திட்டங்கள், டிபிடி மானியங்கள் & பிஎம்-கிசான்',
      labelTe: 'ప్రభుత్వ పథకాలు, డీబీటీ రాయితీలు & పీఎం-కిసాన్',
      labelKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಡಿಬಿಟಿ ಸಬ್ಸಿಡಿ & ಪಿಎಂ-ಕಿಸಾನ್',
      icon: Landmark,
      iconBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50',
      descEn: 'PMFBY crop insurance claims helper, Kisan credit cards & subsidy forms',
      descMr: 'पंतप्रधान पीक विमा योजना, किसान क्रेडिट कार्ड व थेट अनुदान अर्ज',
      descHi: 'पीएम फसल बीमा योजना, किसान क्रेडिट कार्ड व अनुदान फॉर्म',
      descTa: 'பயிர் காப்பீட்டு உதவி, கிசான் கிரெடிட் கார்டு & மானிய விண்ணப்பங்கள்',
      descTe: 'పంట బీమా క్లెయిమ్‌లు, కిసాన్ క్రెడిట్ కార్డులు & రాయితీ ఫారాలు',
      descKn: 'ಬೆಳೆ ವಿಮೆ ಕ್ಲೈಮ್ ಸಹಾಯ, ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ & ಸಬ್ಸಿಡಿ ಫಾರ್ಮ್‌ಗಳು'
    },
    {
      id: 'statistics',
      labelEn: 'Regional Disease Surveillance & Historical Trends',
      labelMr: 'विभागीय रोग सर्वेक्षण व मागील वर्षांचा कल',
      labelHi: 'क्षेत्रीय रोग निगरानी व ऐतिहासिक रुझान',
      labelTa: 'பிராந்திய நோய் கண்காணிப்பு & வரலாற்று போக்குகள்',
      labelTe: 'ప్రాంతీయ వ్యాధి నిఘా & చారిత్రక ధోరణులు',
      labelKn: 'ಪ್ರಾದೇಶಿಕ ರೋಗ ಕಣ್ಗಾವಲು & ಐತಿಹಾಸಿಕ ಪ್ರವೃತ್ತಿಗಳು',
      icon: BarChart3,
      iconBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300 dark:border-purple-700/50',
      descEn: 'Charts, outbreak frequency tables, and agro-climatic risk models',
      descMr: 'रोग प्रादुर्भाव तक्ते, हवामान आकडेवारी व मागील वर्षांचा कल',
      descHi: 'रोग प्रकोप तालिका, मौसम आंकड़े व जोखिम मॉडल',
      descTa: 'வரைபடங்கள், நோய் பரவல் அட்டவணைகள் & பருவநிலை அபாய மாதிரிகள்',
      descTe: 'చార్టులు, వ్యాప్తి పట్టికలు & వాతావరణ ప్రమాద నమూనాలు',
      descKn: 'ಚಾರ್ಟ್‌ಗಳು, ರೋಗ ಹರಡುವಿಕೆ ಕೋಷ್ಟಕಗಳು & ಹವಾಮಾನ ಅಪಾಯ ಮಾದರಿಗಳು'
    },
    {
      id: 'farmerCommunity',
      labelEn: 'Farmer Community Forum & Extension Officer Q&A',
      labelMr: 'शेतकरी मंच व कृषी अधिकारी प्रश्नोत्तरे',
      labelHi: 'किसान समुदाय मंच व कृषि अधिकारी प्रश्नोत्तर',
      labelTa: 'விவசாயிகள் சமூக மன்றம் & வேளாண் அதிகாரி கேள்வி-பதில்',
      labelTe: 'రైతు కమ్యూనిటీ ఫోరమ్ & వ్యవసాయ అధికారి ప్రశ్నోత్తరాలు',
      labelKn: 'ರೈತರ ಸಮುದಾಯ ವೇದಿಕೆ & ಕೃಷಿ ಅಧಿಕಾರಿ ಪ್ರಶ್ನೋತ್ತರ',
      icon: Users,
      iconBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50',
      descEn: 'Post farm queries, share photos, and receive official KVK officer advice',
      descMr: 'शेतीचे प्रश्न विचारा, फोटो शेअर करा व तज्ज्ञांचे मार्गदर्शन मिळवा',
      descHi: 'खेती के प्रश्न पूछें, फोटो साझा करें व विशेषज्ञ सलाह पाएं',
      descTa: 'கேள்விகளை பதிவிடவும், புகைப்படங்களை பகிரவும் & வேளாண் ஆலோசனைகளைப் பெறவும்',
      descTe: 'సందేహాలు అడగండి, ఫోటోలు పంచుకోండి & నిపుణుల సలహాలు పొందండి',
      descKn: 'ಕೃಷಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ, ಫೋಟೋ ಹಂಚಿಕೊಳ್ಳಿ & ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಿರಿ'
    },
    {
      id: 'reports',
      labelEn: 'My Field Inspection Reports & Soil Health Cards',
      labelMr: 'माझे शेत अहवाल व मृदा आरोग्य पत्रिका',
      labelHi: 'खेत निरीक्षण रिपोर्ट व मृदा स्वास्थ्य कार्ड',
      labelTa: 'கள ஆய்வு அறிக்கைகள் & மண் வள அட்டைகள்',
      labelTe: 'క్షేత్ర తనిఖీ నివేదికలు & నేல ఆరోగ్య కార్డులు',
      labelKn: 'ಕ್ಷೇತ್ರ ಪರಿಶೀಲನಾ ವರದಿಗಳು & ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್‌ಗಳು',
      icon: FileText,
      iconBg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700',
      descEn: 'Downloadable PDF audit reports and lab certified nutrient balances',
      descMr: 'डाउनलोड करण्यायोग्य पीडीएफ तपासणी अहवाल व प्रयोगशाळा प्रमाणपत्र',
      descHi: 'डाउनलोड करने योग्य पीडीएफ रिपोर्ट व लैब प्रमाणित मृदा कार्ड',
      descTa: 'பதிவிறக்கம் செய்யக்கூடிய PDF அறிக்கைகள் & ஆய்வக ஊட்டச்சத்து விவரங்கள்',
      descTe: 'డౌన్‌లోడ్ చేసుకోదగిన PDF నివేదికలు & ల్యాబ్ పోషక వివరాలు',
      descKn: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದಾದ PDF ವರದಿಗಳು & ಪೋಷಕಾಂಶಗಳ ಸಮತೋಲನ'
    }
  ];

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/50 text-[#1B5E20] dark:text-emerald-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <span>{t('moreHubTitle', 'Knowledge Hub & Advanced Reference Tools')}</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
            {t('moreHubSubtitle', 'GIS mapping, government DBT schemes, agronomy dosage matrix & inspection reports')}
          </p>
        </div>
      </div>

      {/* Grid of Reference Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {menuItems.map(item => {
          const Icon = item.icon;
          const label = getItemLocalized(item, 'label');
          const desc = getItemLocalized(item, 'desc');

          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#0c1626] border-[#1c2c4a] hover:border-emerald-500/50 text-white'
                  : 'bg-[#F5FCF7] border-[#D2EBD7] hover:border-emerald-500 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs ${item.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white mt-3.5 group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors leading-tight">
                  {label}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                  {desc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs font-black text-[#047857] dark:text-emerald-400">
                <span>{t('launchTool', 'Launch Tool →')}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
