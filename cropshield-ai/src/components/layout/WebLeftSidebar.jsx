import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Camera, 
  Bell, 
  ShoppingBag, 
  Layers, 
  Globe, 
  Moon, 
  Sun, 
  Sprout, 
  User, 
  ChevronDown, 
  ChevronRight, 
  ShieldCheck, 
  ShieldAlert,
  Activity,
  Mic,
  Cpu,
  Calculator,
  PhoneCall, 
  X, 
  Sparkles, 
  ArrowRight, 
  Satellite, 
  Lightbulb, 
  Landmark, 
  BarChart3, 
  Users, 
  FileText,
  LayoutDashboard,
  FileSpreadsheet,
  Compass,
  MapPin
} from 'lucide-react';

export const WebLeftSidebar = ({ activeTab, onNavigate, mobileOpen, setMobileOpen }) => {
  const { 
    lang, 
    t, 
    theme, 
    toggleTheme, 
    cart, 
    setIsCartModalOpen, 
    setIsLanguageModalOpen,
    setIsAccountSwitcherOpen,
    currentUser,
    role,
    fieldReviewQueue,
    officerTab,
    setOfficerTab
  } = useApp();

  const isDark = theme === 'dark';
  const pendingOfficerCount = (fieldReviewQueue || []).filter(s => s.status === 'pending').length;

  // 1. Farmer Primary Navigation Sections (Core Dashboard)
  const primaryNavItems = [
    { 
      id: 'esp32LiveData', 
      labelEn: 'Zone Monitoring', 
      labelTa: 'மண்டல கண்காணிப்பு (Zone Monitoring)', 
      labelMr: 'झोन मॉनिटरिंग (Zone Monitoring)', 
      labelHi: 'ज़ोन निगरानी (Zone Monitoring)', 
      icon: Cpu 
    },
    { 
      id: 'scan', 
      defaultLabel: 'AI Crop Scanner',
      labelEn: 'AI Crop Scanner', 
      labelTa: 'AI பயிர் ஸ்கேனர்', 
      labelMr: 'एआय पीक स्कॅनर', 
      labelHi: 'एआय फसल स्कैनर', 
      icon: Camera 
    },
    { 
      id: 'market', 
      defaultLabel: 'Kisan Mandi',
      labelEn: 'Kisan Mandi', 
      labelTa: 'சந்தை & கிசான் மண்டி', 
      labelMr: 'बाजार समिती व किसान मंडी', 
      labelHi: 'किसान मंडी व भाव', 
      icon: ShoppingBag 
    },
    { 
      id: 'govtSchemes', 
      defaultLabel: 'Govt Schemes',
      labelEn: 'Govt Schemes', 
      labelTa: 'அரசு திட்டங்கள் & மானியம்', 
      labelMr: 'शासकीय योजना व पीएम-किसान', 
      labelHi: 'सरकारी योजनाएं व पीएम-किसान', 
      icon: Landmark 
    }
  ];

  // 2. Farmer Knowledge Hub & Advanced Tools
  const knowledgeNavItems = [
    { id: 'home', labelKey: 'navHome', defaultLabel: 'Home Dashboard', labelTa: 'முகப்பு பக்கம்', labelMr: 'मुख्य मुख्यपृष्ठ', labelHi: 'मुख्य डैशबोर्ड', icon: Home },
    { id: 'cropSell', labelEn: 'Sell Crops & Products', defaultLabel: 'Sell Crops & Products', labelTa: 'பயிர் விற்பனை சந்தை', labelMr: 'शेतकरी पीक विक्री केंद्र', labelHi: 'किसान फसल बिक्री', icon: Sprout },
    { id: 'alerts', labelKey: 'navAlerts', defaultLabel: 'Outbreak Alerts', labelTa: 'எச்சரிக்கைகள்', labelMr: 'रोग प्रादुर्भाव इशारा', labelHi: 'रोग चेतावनी', icon: Bell, badge: '3' },
    { 
      id: 'chotaKissan', 
      labelEn: 'Kisan One (Voice AI)', 
      labelTa: 'கிசான் ஒன் (குரல் AI)', 
      labelMr: 'किसान वन (आवाज AI)', 
      labelHi: 'किसान वन (वॉयस AI)', 
      icon: Mic
    },
    { 
      id: 'roiCalculator', 
      labelEn: 'Yield & ROI Calculator', 
      labelTa: 'வருவாய் மற்றும் லாப கால்குலேட்டர்', 
      labelMr: 'उत्पन्न आणि नफा कॅल्क्युलेटर', 
      labelHi: 'उपज और लाभ कैलकुलेटर', 
      icon: Calculator 
    },
    { 
      id: 'environmentalPrediction', 
      labelEn: 'AI Disease Prediction Engine', 
      labelTa: 'சுற்றுச்சூழல் நோய் முன்கணிப்பு', 
      labelMr: 'हवामान पीक रोग अंदाज प्रणाली', 
      labelHi: 'एआई फसल रोग पूर्वानुमान इंजन', 
      icon: Activity
    },
    { 
      id: 'riskConsequences', 
      labelEn: 'Risk & Threats Consequences', 
      labelTa: 'அபாயங்கள் & பாதிப்பு விளைவுகள்', 
      labelMr: 'जोखीम, मर्यादा काळ व परिणाम', 
      labelHi: 'जोखिम, समय सीमा व परिणाम', 
      icon: ShieldAlert
    },
    { 
      id: 'satelliteMapping', 
      labelEn: 'Satellite GIS Map', 
      labelTa: 'செயற்கைக்கோள் வரைபடம்', 
      labelMr: 'उपग्रह पीक नकाशा', 
      labelHi: 'उपग्रह फसल मानचित्र', 
      icon: Satellite
    },
    { 
      id: 'proTips', 
      labelEn: 'Agronomy Tips & Dosage', 
      labelTa: 'மருந்தளவு அட்டவணை', 
      labelMr: 'खत व फवारणी वेळापत्रक', 
      labelHi: 'उर्वरक व छिड़काव अनुसूची', 
      icon: Lightbulb
    },
    { 
      id: 'statistics', 
      labelEn: 'Disease Surveillance & Trends', 
      labelTa: 'நோய் கண்காணிப்பு & போக்குகள்', 
      labelMr: 'रोग पाळत व ऐतिहासिक कल', 
      labelHi: 'रोग निगरानी व ऐतिहासिक रुझान', 
      icon: BarChart3
    },
    { 
      id: 'farmerCommunity', 
      labelEn: 'Farmer Forum & Officer Q&A', 
      labelTa: 'விவசாயிகள் சமூக மன்றம்', 
      labelMr: 'शेतकरी मंच व मार्गदर्शन', 
      labelHi: 'किसान मंच व मार्गदर्शन', 
      icon: Users
    },
    { 
      id: 'reports', 
      labelEn: 'Field Reports & Soil Health', 
      labelTa: 'ஆய்வு அறிக்கைகள் & மண் அட்டை', 
      labelMr: 'शेत अहवाल व मृदा पत्रिका', 
      labelHi: 'खेत रिपोर्ट व मृदा स्वास्थ्य कार्ड', 
      icon: FileText
    }
  ];

  // 3. Officer Dedicated Navigation Sections
  const officerPrimaryNavItems = [
    { 
      id: 'dashboard', 
      labelEn: 'Analytics Dashboard', 
      labelTa: 'பகுப்பாய்வு பலகை',
      labelMr: 'विश्लेषण डॅशबोर्ड', 
      labelHi: 'एनालिटिक्स डैशबोर्ड', 
      icon: LayoutDashboard 
    },
    { 
      id: 'reviewQueue', 
      labelEn: 'Field Review Queue', 
      labelTa: 'ஆய்வு வரிசை',
      labelMr: 'तपासणी रांग', 
      labelHi: 'निरीक्षण कतार', 
      icon: FileSpreadsheet, 
      badge: pendingOfficerCount > 0 ? `${pendingOfficerCount}` : null 
    },
    { 
      id: 'riskMap', 
      labelEn: 'GIS Risk Radar', 
      labelTa: 'GIS இடர் ரேடார்',
      labelMr: 'जीआयएस जोखीम रडार', 
      labelHi: 'जीआईएस जोखिम रडार', 
      icon: Compass 
    },
    { 
      id: 'advisories', 
      labelEn: 'Broadcast Alerts', 
      labelTa: 'எச்சரிக்கை அறிவிப்பு',
      labelMr: 'इशारे व सूचना जारी करा', 
      labelHi: 'अलर्ट व सलाह जारी करें', 
      icon: Bell 
    },
    { 
      id: 'farmers', 
      labelEn: 'Farmer Registry', 
      labelTa: 'விவசாயிகள் பட்டியல்',
      labelMr: 'शेतकरी नोंदणी', 
      labelHi: 'किसान रजिस्ट्री', 
      icon: Users 
    }
  ];

  const officerToolsNavItems = [
    { 
      id: 'chotaKissan', 
      labelEn: 'Kisan One (Voice AI)', 
      labelTa: 'கிசான் ஒன் (குரல் AI)', 
      labelMr: 'किसान वन (आवाज AI)', 
      labelHi: 'किसान वन (वॉयस AI)', 
      icon: Mic 
    },
    { 
      id: 'roiCalculator', 
      labelEn: 'Yield & ROI Calculator', 
      labelTa: 'வருவாய் மற்றும் லாப கால்குலேட்டர்', 
      labelMr: 'उत्पन्न आणि नफा कॅल्क्युलेटर', 
      labelHi: 'उपज और लाभ कैलकुलेटर', 
      icon: Calculator 
    },
    { 
      id: 'environmentalPrediction', 
      labelEn: 'AI Disease Prediction Engine', 
      labelTa: 'சுற்றுச்சூழல் நோய் முன்கணிப்பு', 
      labelMr: 'हवामान पीक रोग अंदाज प्रणाली', 
      labelHi: 'एआई फसल रोग पूर्वानुमान इंजन', 
      icon: Activity 
    },
    { 
      id: 'riskConsequences', 
      labelEn: 'Risk & Threats Consequences', 
      labelTa: 'அபாயங்கள் & பாதிப்பு விளைவுகள்', 
      labelMr: 'जोखीम, मर्यादा काळ व परिणाम', 
      labelHi: 'जोखिम, समय सीमा व परिणाम', 
      icon: ShieldAlert 
    },
    { 
      id: 'satelliteMapping', 
      labelEn: 'Satellite GIS Map', 
      labelTa: 'செயற்கைக்கோள் வரைபடம்', 
      labelMr: 'उपग्रह पीक नकाशा', 
      labelHi: 'उपग्रह फसल मानचित्र', 
      icon: Satellite 
    },
    { 
      id: 'statistics', 
      labelEn: 'Disease Surveillance & Trends', 
      labelTa: 'நோய் கண்காணிப்பு & போக்குகள்', 
      labelMr: 'रोग पाळत व ऐतिहासिक कल', 
      labelHi: 'रोग निगरानी व ऐतिहासिक रुझान', 
      icon: BarChart3 
    },
    { 
      id: 'farmerCommunity', 
      labelEn: 'Farmer Forum & Q&A', 
      labelTa: 'விவசாயிகள் மன்றம்', 
      labelMr: 'शेतकरी मंच व मार्गदर्शन', 
      labelHi: 'किसान मंच व मार्गदर्शन', 
      icon: Users 
    }
  ];

  const totalCartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  const languageLabels = {
    en: 'English',
    mr: 'मराठी',
    hi: 'हिन्दी',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    kn: 'ಕನ್ನಡ',
    gu: 'ગુજરાતી',
    bn: 'বাংলা',
    pa: 'ਪੰਜਾਬੀ',
    ml: 'മലയാളം'
  };

  const isPrivileged = role === 'officer' || role === 'ngo';

  const getItemLabel = (item) => {
    if (lang === 'ta' && item.labelTa) return item.labelTa;
    if (lang === 'mr' && item.labelMr) return item.labelMr;
    if (lang === 'hi' && item.labelHi) return item.labelHi;
    return item.labelEn || item.defaultLabel || t(item.labelKey, item.defaultLabel);
  };

  const handleNavClick = (id) => {
    if (isPrivileged) {
      if (['dashboard', 'reviewQueue', 'riskMap', 'advisories', 'farmers'].includes(id)) {
        if (setOfficerTab) setOfficerTab(id);
        onNavigate('home');
      } else {
        onNavigate(id);
      }
    } else {
      onNavigate(id);
    }
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden animate-fadeIn"
        />
      )}

      {/* Main Left Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out
        w-64 border-r
        ${isDark 
          ? 'bg-[#0B1426] border-[#182B48] text-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.6)]' 
          : 'bg-[#063B2A] border-[#0A4D37] text-white shadow-2xl'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Branding Section */}
        <div>
          {/* Indian Tricolor Accent Top Stripe */}
          <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]" role="presentation" />

          {/* Logo & Header */}
          <div className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-[#182B48]' : 'border-[#0A4D37]'
          }`}>
            <div 
              onClick={() => handleNavClick(isPrivileged ? 'dashboard' : 'home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] text-white flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform border border-emerald-300/40 shrink-0">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-tight text-white dark:text-emerald-400">
                    {t('appName', 'CropShield AI')}
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 dark:text-slate-400 block font-mono">
                  {role === 'ngo' ? 'Agri Org / NGO' : role === 'officer' ? (lang === 'ta' ? 'அதிகாரி மையம்' : lang === 'mr' ? 'अधिकारी कक्ष' : 'Agri Officer Command') : t('kisanWeb', 'Kisan Web')}
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {setMobileOpen && (
              <button 
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-xl text-emerald-300 hover:text-white dark:hover:text-white lg:hidden cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 custom-scrollbar">
          
          {/* Officer & NGO Navigation Mode */}
          {isPrivileged ? (
            <>
              {/* Section 1: Command Operations */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300/80 dark:text-slate-400 px-3 py-1 block font-mono">
                  {role === 'ngo' ? 'Organization Operations' : (lang === 'ta' ? 'அதிகாரி செயல்பாடுகள்' : lang === 'mr' ? 'अधिकारी कार्यकक्षा' : 'Officer Operations')}
                </span>

                <nav className="space-y-1">
                  {officerPrimaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const isOfficerSubView = !['satelliteMapping', 'statistics', 'farmerCommunity'].includes(activeTab);
                    const isActive = isOfficerSubView && officerTab === item.id;
                    const label = getItemLabel(item);

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer group active:scale-98 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg shadow-black/20'
                            : isDark
                            ? 'text-slate-300 hover:bg-[#121F38] hover:text-white'
                            : 'text-emerald-100 hover:bg-[#0B4A35] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-emerald-300 dark:text-emerald-400'
                          }`} />
                          <span className="tracking-wide truncate">{label}</span>
                        </div>

                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black shrink-0 ${
                            isActive 
                              ? 'bg-white text-emerald-950' 
                              : 'bg-rose-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Section 2: Regional Intelligence & Surveillance */}
              <div className="space-y-1 pt-1 border-t border-[#0A4D37]/80 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300/80 dark:text-slate-400 px-3 py-1.5 flex items-center justify-between font-mono">
                  <span>{lang === 'ta' ? 'கண்காணிப்பு கருவிகள்' : lang === 'mr' ? 'पाळत व गुप्तचर साधने' : 'GIS & Surveillance'}</span>
                  <span className="text-[9px] text-emerald-400/70 font-mono">3 Tools</span>
                </span>

                <nav className="space-y-1">
                  {officerToolsNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const label = getItemLabel(item);

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer group active:scale-98 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg shadow-black/20'
                            : isDark
                            ? 'text-slate-300 hover:bg-[#121F38] hover:text-white'
                            : 'text-emerald-100 hover:bg-[#0B4A35] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-emerald-300 dark:text-emerald-400'
                          }`} />
                          <span className="tracking-wide truncate">{label}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </>
          ) : (
            /* Farmer Navigation Mode */
            <>
              {/* Section 1: Core Navigation */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300/80 dark:text-slate-400 px-3 py-1 block font-mono">
                  {lang === 'ta' ? 'முதன்மை மெனு' : lang === 'mr' ? 'मुख्य मेनू' : lang === 'hi' ? 'मुख्य मेनू' : 'Core Dashboard'}
                </span>

                <nav className="space-y-1">
                  {primaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const label = getItemLabel(item);

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer group active:scale-98 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg shadow-black/20'
                            : isDark
                            ? 'text-slate-300 hover:bg-[#121F38] hover:text-white'
                            : 'text-emerald-100 hover:bg-[#0B4A35] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-emerald-300 dark:text-emerald-400'
                          }`} />
                          <span className="tracking-wide truncate">{label}</span>
                        </div>

                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black shrink-0 ${
                            isActive 
                              ? 'bg-white text-emerald-950' 
                              : 'bg-rose-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Section 2: Knowledge Hub & Advanced Tools */}
              <div className="space-y-1 pt-1 border-t border-[#0A4D37]/80 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300/80 dark:text-slate-400 px-3 py-1.5 flex items-center justify-between font-mono">
                  <span>{lang === 'ta' ? 'அறிவு மையம் & கருவிகள்' : lang === 'mr' ? 'ज्ञान केंद्र व साधने' : 'Knowledge Hub & Tools'}</span>
                  <span className="text-[9px] text-emerald-400/70 font-mono">{knowledgeNavItems.length} Tools</span>
                </span>

                <nav className="space-y-1">
                  {knowledgeNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const label = getItemLabel(item);

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer group active:scale-98 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg shadow-black/20'
                            : isDark
                            ? 'text-slate-300 hover:bg-[#121F38] hover:text-white'
                            : 'text-emerald-100 hover:bg-[#0B4A35] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-emerald-300 dark:text-emerald-400'
                          }`} />
                          <span className="tracking-wide truncate">{label}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Cart Trigger Card (Farmer Mode) */}
              <div className="pt-1 border-t border-[#0A4D37]/80 dark:border-slate-800">
                <button
                  onClick={() => setIsCartModalOpen(true)}
                  className={`w-full p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    totalCartCount > 0
                      ? 'bg-emerald-600/30 border-emerald-400/60 dark:bg-emerald-950/30 dark:border-emerald-800 text-white'
                      : isDark
                      ? 'bg-[#0b1424] border-[#182a4a] hover:border-emerald-500/50'
                      : 'bg-[#0B4A35] border-[#0E5B42] hover:border-emerald-400 text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div className="text-left leading-tight">
                      <span className="text-xs font-black block text-white group-hover:text-emerald-300">
                        {t('myCart', 'Cart')}
                      </span>
                      <span className="text-[10px] text-emerald-200 dark:text-slate-400 font-bold">
                        {totalCartCount > 0 
                          ? (lang === 'ta' ? `${totalCartCount} பொருட்கள் கூடையில்` : `${totalCartCount} items added`)
                          : (lang === 'ta' ? 'கூடை காலியாக உள்ளது' : 'Cart is empty')}
                      </span>
                    </div>
                  </div>

                  {totalCartCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-mono font-black shadow-xs">
                      {totalCartCount}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>
              </div>
            </>
          )}

        </div>

        {/* Bottom Preferences & Profile Switcher */}
        <div className={`p-3 space-y-2 border-t shrink-0 ${
          isDark ? 'border-[#16233b] bg-[#060b14]' : 'border-[#0A4D37] bg-[#042E21]'
        }`}>
          
          {/* Language & Theme Controls Row */}
          <div className="grid grid-cols-2 gap-2">
            {/* Language Trigger */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className={`flex items-center justify-between px-2.5 py-2 rounded-xl border text-xs font-black transition-all cursor-pointer shadow-2xs ${
                isDark 
                  ? 'bg-[#0c1527] border-[#1c2e50] text-slate-200 hover:border-emerald-500/50' 
                  : 'bg-[#0B4A35] border-[#0E5B42] text-white hover:bg-[#0F5A40]'
              }`}
              title="Change Language"
            >
              <div className="flex items-center space-x-1.5 truncate">
                <Globe className="w-3.5 h-3.5 text-emerald-300 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{languageLabels[lang] || 'English'}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-emerald-300 shrink-0 ml-1" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center space-x-1.5 px-2.5 py-2 rounded-xl border text-xs font-black transition-all cursor-pointer shadow-2xs ${
                isDark 
                  ? 'bg-[#0c1527] border-[#1c2e50] text-amber-400 hover:bg-[#121f38]' 
                  : 'bg-[#0B4A35] border-[#0E5B42] text-amber-300 hover:bg-[#0F5A40]'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-300" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          {/* User Account Switcher Card */}
          <div 
            onClick={() => setIsAccountSwitcherOpen(true)}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group shadow-2xs ${
              isDark 
                ? 'bg-[#0c1527] border-[#1c2e50] hover:border-emerald-500/60' 
                : 'bg-[#0B4A35] border-[#0E5B42] hover:border-emerald-400 text-white'
            }`}
            title="Click to Switch Accounts or Manage Profile"
          >
            <div className="flex items-center space-x-2.5 truncate">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                {currentUser.avatar || '👨‍🌾'}
              </div>
              <div className="truncate text-left leading-tight">
                <span className="text-xs font-black block text-white group-hover:text-emerald-300 truncate">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-emerald-200 dark:text-slate-400 font-bold block truncate">
                  {currentUser.role === 'ngo'
                    ? 'Agri Org / NGO Partner'
                    : currentUser.role === 'officer' 
                    ? (lang === 'ta' ? 'வேளாண் அதிகாரி' : 'Agri Officer') 
                    : (currentUser.village || 'Farmer')}
                </span>
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-emerald-300 group-hover:text-white shrink-0 ml-1" />
          </div>

          {/* Toll-free Kisan Helpline Button */}
          <a
            href="tel:18001801551"
            className={`w-full py-1.5 px-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 transition-colors border ${
              isDark 
                ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/60' 
                : 'bg-[#0B4A35] border-[#0E5B42] text-emerald-200 hover:bg-[#0F5A40]'
            }`}
          >
            <PhoneCall className="w-3 h-3 text-emerald-300 dark:text-emerald-400" />
            <span>Kisan Call Center: 1800-180-1551</span>
          </a>

        </div>

      </aside>
    </>
  );
};
