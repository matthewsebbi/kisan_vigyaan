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
  MapPin,
  LogOut,
  Bot
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
    setOfficerTab,
    logout
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
    },
    { 
      id: 'chatbot', 
      defaultLabel: 'AI Agronomist Chatbot',
      labelEn: 'AI Agronomist Chatbot', 
      labelTa: 'AI வேளாண் சாட்போட்', 
      labelMr: 'एआय कृषी चॅटबॉट', 
      labelHi: 'एआई कृषि चैटबॉट', 
      icon: Bot,
      badge: 'TTS'
    }
  ];

  // 2. Farmer Knowledge Hub & Advanced Tools
  const knowledgeNavItems = [
    { 
      id: 'roiCalculator', 
      labelEn: 'Yield & ROI Calculator', 
      labelTa: 'வருவாய் மற்றும் லாப கால்குலேட்டர்', 
      labelMr: 'उत्पन्न आणि नफा कॅल्क्युलेटर', 
      labelHi: 'उपज और लाभ कैलकुलेटर', 
      icon: Calculator 
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
      id: 'farmerCommunity', 
      labelEn: 'Farmer Forum & Officer Q&A', 
      labelTa: 'விவசாயிகள் சமூக மன்றம்', 
      labelMr: 'शेतकरी मंच व मार्गदर्शन', 
      labelHi: 'किसान मंच व मार्गदर्शन', 
      icon: Users
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
    },
    { 
      id: 'chatbot', 
      labelEn: 'AI Agronomist Chatbot', 
      labelTa: 'AI வேளாண் சாட்போட்',
      labelMr: 'एआय कृषी चॅटबॉट', 
      labelHi: 'एआई कृषि चैटबॉट', 
      icon: Bot,
      badge: 'TTS'
    }
  ];

  const officerToolsNavItems = [
    { 
      id: 'roiCalculator', 
      labelEn: 'Yield & ROI Calculator', 
      labelTa: 'வருவாய் மற்றும் லாப கால்குலேட்டர்', 
      labelMr: 'उत्पन्न आणि नफा कॅल्क्युलेटर', 
      labelHi: 'उपज और लाभ कैलकुलेटर', 
      icon: Calculator 
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
        onNavigate('esp32LiveData');
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
          : 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0F172A] shadow-xs'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Branding Section */}
        <div>
          {/* Subtle Indian Tricolor Accent Top Stripe */}
          <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]" role="presentation" />

          {/* Logo & Header */}
          <div className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-[#182B48]' : 'border-[#E2E8F0]'
          }`}>
            <div 
              onClick={() => handleNavClick(isPrivileged ? 'dashboard' : 'esp32LiveData')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] text-white flex items-center justify-center font-black shadow-xs group-hover:scale-105 transition-transform border border-emerald-300/40 shrink-0">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-[#0F172A] dark:text-emerald-400">
                    {t('appName', 'KISAN VIGYAAN')}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 block font-mono">
                  {role === 'ngo' ? 'AGRI ORG / NGO' : role === 'officer' ? (lang === 'ta' ? 'அதிகாரி மையம்' : lang === 'mr' ? 'अधिकारी कक्ष' : 'AGRI OFFICER COMMAND') : 'KISAN WEB'}
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {setMobileOpen && (
              <button 
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-emerald-300 dark:hover:text-white lg:hidden cursor-pointer"
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
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer group active:scale-98 ${
                          isActive
                            ? 'bg-[#E8F5ED] text-[#0F5132] dark:bg-emerald-950/60 dark:text-emerald-300 font-bold shadow-xs'
                            : isDark
                            ? 'text-slate-300 hover:bg-[#121F38] hover:text-white'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-[#0F5132] dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
                          }`} />
                          <span className="tracking-wide truncate">{label}</span>
                        </div>

                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                            isActive 
                              ? 'bg-[#0F5132] text-white dark:bg-emerald-400 dark:text-emerald-950' 
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
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
              <div className="space-y-1 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 px-3 py-1.5 flex items-center justify-between font-mono">
                  <span>{lang === 'ta' ? 'கண்காணிப்பு கருவிகள்' : lang === 'mr' ? 'पाळत व गुप्तचर साधने' : 'GIS & Surveillance'}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{officerToolsNavItems.length} Tools</span>
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
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer group active:scale-98 ${
                          isActive
                            ? 'bg-[#E8F5ED] text-[#0F5132] dark:bg-emerald-950/60 dark:text-emerald-300 font-bold shadow-xs'
                            : isDark
                            ? 'text-slate-300 hover:bg-[#121F38] hover:text-white'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-[#0F5132] dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 px-3 py-1 block font-mono">
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
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer group active:scale-98 ${
                          isActive
                            ? 'bg-[#E8F5ED] text-[#0F5132] dark:bg-emerald-950/60 dark:text-emerald-300 font-bold shadow-xs'
                            : isDark
                            ? 'text-slate-300 hover:bg-[#121F38] hover:text-white'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-[#0F5132] dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
                          }`} />
                          <span className="tracking-wide truncate">{label}</span>
                        </div>

                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                            isActive 
                              ? 'bg-[#0F5132] text-white dark:bg-emerald-400 dark:text-emerald-950' 
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
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
              <div className="space-y-1 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 px-3 py-1.5 flex items-center justify-between font-mono">
                  <span>{lang === 'ta' ? 'அறிவு மையம் & கருவிகள்' : lang === 'mr' ? 'ज्ञान केंद्र व साधने' : 'Knowledge Hub & Tools'}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{knowledgeNavItems.length} Tools</span>
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
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer group active:scale-98 ${
                          isActive
                            ? 'bg-[#E8F5ED] text-[#0F5132] dark:bg-emerald-950/60 dark:text-emerald-300 font-bold shadow-xs'
                            : isDark
                            ? 'text-slate-300 hover:bg-[#121F38] hover:text-white'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-[#0F5132] dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
                          }`} />
                          <span className="tracking-wide truncate">{label}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Cart Trigger Card (Farmer Mode) */}
              <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setIsCartModalOpen(true)}
                  className={`w-full p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    totalCartCount > 0
                      ? 'bg-emerald-50/80 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800 text-emerald-950 dark:text-white'
                      : isDark
                      ? 'bg-[#0b1424] border-[#182a4a] hover:border-emerald-500/50 text-slate-300'
                      : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#0F5132] dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center shadow-2xs">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div className="text-left leading-tight">
                      <span className="text-xs font-bold block text-slate-900 dark:text-white group-hover:text-emerald-700">
                        {t('myCart', 'Cart')}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        {totalCartCount > 0 
                          ? (lang === 'ta' ? `${totalCartCount} பொருட்கள் கூடையில்` : `${totalCartCount} items added`)
                          : (lang === 'ta' ? 'கூடை காலியாக உள்ளது' : '2 items added')}
                      </span>
                    </div>
                  </div>

                  {totalCartCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold shadow-xs">
                      {totalCartCount}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>
              </div>

              {/* Botanical Leaf Art & Motivational Slogan (Matching Reference Theme) */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#F2F8F4] to-[#E8F3EB] dark:from-slate-900/60 dark:to-emerald-950/20 border border-[#D8EADB] dark:border-slate-800/60 p-4 mt-2 select-none">
                {/* Decorative Botanical Leaf SVG Watermark */}
                <svg
                  className="absolute -right-2 -bottom-2 w-28 h-28 text-emerald-600/15 dark:text-emerald-400/10 pointer-events-none transform rotate-12"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <path d="M50 5 C50 5, 20 30, 20 60 C20 78, 33 92, 50 95 C67 92, 80 78, 80 60 C80 30, 50 5, 50 5 Z M50 95 L50 20 M35 45 C42 42, 50 48, 50 48 M65 55 C58 52, 50 58, 50 58 M35 70 C42 67, 50 72, 50 72" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  <path d="M30 40 C30 20, 60 10, 85 15 C80 40, 70 70, 50 65 C40 60, 30 50, 30 40 Z" opacity="0.3" />
                </svg>

                <div className="relative z-10 space-y-1">
                  <h4 className="font-extrabold text-sm text-[#1B3D2B] dark:text-emerald-200 tracking-tight leading-snug">
                    Smarter<br />
                    Farming.<br />
                    Healthier<br />
                    Tomorrows.
                  </h4>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Bottom Preferences & Profile Switcher */}
        <div className={`p-3 space-y-2 border-t shrink-0 ${
          isDark ? 'border-[#16233b] bg-[#060b14]' : 'border-[#E2E8F0] bg-[#FFFFFF]'
        }`}>
          
          {/* Language & Theme Controls Row */}
          <div className="grid grid-cols-2 gap-2">
            {/* Language Trigger */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className={`flex items-center justify-between px-2.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                isDark 
                  ? 'bg-[#0c1527] border-[#1c2e50] text-slate-200 hover:border-emerald-500/50' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="Change Language"
            >
              <div className="flex items-center space-x-1.5 truncate">
                <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{languageLabels[lang] || 'English'}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center space-x-1.5 px-2.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                isDark 
                  ? 'bg-[#0c1527] border-[#1c2e50] text-amber-400 hover:bg-[#121f38]' 
                  : 'bg-white border-slate-200 text-amber-600 hover:bg-slate-50'
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
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </>
              )}
            </button>
          </div>

          {/* User Account Switcher Card & Logout */}
          <div className="flex items-center gap-1.5">
            <div 
              onClick={() => setIsAccountSwitcherOpen(true)}
              className={`flex-1 p-2 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group shadow-2xs min-w-0 ${
                isDark 
                  ? 'bg-[#0c1527] border-[#1c2e50] hover:border-emerald-500/60' 
                  : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800'
              }`}
              title="Click to Switch Accounts or Manage Profile"
            >
              <div className="flex items-center space-x-2 truncate">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                  {currentUser.avatar || '👨‍🌾'}
                </div>
                <div className="truncate text-left leading-tight">
                  <span className="text-xs font-bold block text-slate-900 dark:text-white group-hover:text-emerald-700 truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block truncate">
                    {currentUser.role === 'ngo'
                      ? 'NGO Partner'
                      : currentUser.role === 'officer' 
                      ? 'Agri Officer' 
                      : (currentUser.village || 'Farmer')}
                  </span>
                </div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0 ml-1" />
            </div>

            <button
              onClick={logout}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer text-slate-400 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-500/50 shadow-2xs shrink-0 ${
                isDark 
                  ? 'bg-[#0c1527] border-[#1c2e50]' 
                  : 'bg-white border-slate-200 hover:bg-rose-50'
              }`}
              title="Log Out (Sign Out)"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Toll-free Kisan Helpline Button */}
          <a
            href="tel:18001801551"
            className={`w-full py-1.5 px-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors border ${
              isDark 
                ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/60' 
                : 'bg-emerald-50 border-emerald-200 text-[#0F5132] hover:bg-emerald-100'
            }`}
          >
            <PhoneCall className="w-3 h-3 text-[#0F5132] dark:text-emerald-400" />
            <span>Kisan Call Center: 1800-180-1551</span>
          </a>

        </div>

      </aside>
    </>
  );
};
