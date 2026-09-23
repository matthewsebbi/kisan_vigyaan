import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lightbulb, 
  Landmark, 
  Users, 
  ChevronRight, 
  Layers
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
            {t('moreHubSubtitle', 'Agronomy dosage matrix, government DBT schemes & farmer community forum')}
          </p>
        </div>
        
        <span className="px-3 py-1 rounded-full text-xs font-black font-mono bg-emerald-50 text-[#1B5E20] dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
          {menuItems.length} {t('activeModules', 'ACTIVE MODULES')}
        </span>
      </div>

      {/* Grid of Knowledge Hub Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const label = getItemLocalized(item, 'label');
          const desc = getItemLocalized(item, 'desc');

          return (
            <div
              key={item.id}
              onClick={() => onNavigate && onNavigate(item.id)}
              className={`p-5 rounded-3xl border transition-all duration-200 hover:shadow-lg cursor-pointer group flex flex-col justify-between ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850' 
                  : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-emerald-900/5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${item.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {label}
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                  {desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                <span>{t('openModule', 'Open Module')}</span>
                <span className="font-mono">→</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default WebFarmerMoreMenu;
