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
  LayoutDashboard,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export const WebTopNavBar = ({ activeTab, onNavigate }) => {
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
    officerTab,
    setOfficerTab,
    fieldReviewQueue
  } = useApp();

  const isDark = theme === 'dark';

  // 5 primary navigation sections for Farmer
  const navItems = [
    { id: 'home', labelKey: 'navHome', icon: Home },
    { id: 'scan', labelKey: 'navScan', icon: Camera }, // Zero 'AI' badge/text!
    { id: 'market', labelKey: 'navMarket', icon: ShoppingBag },
    { id: 'alerts', labelKey: 'navAlerts', icon: Bell, badge: '3' },
    { id: 'more', labelKey: 'navMore', icon: Layers }
  ];

  const pendingReviewsCount = fieldReviewQueue.filter(s => s.status === 'pending').length;

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

  const isMoreActive = activeTab === 'more' || ['proTips', 'govtSchemes', 'statistics', 'satelliteMapping', 'farmerCommunity', 'reports', 'deviceManagement'].includes(activeTab);

  return (
    <header className={`sticky top-0 z-40 border-b transition-all duration-300 backdrop-blur-md shadow-sm ${
      isDark 
        ? 'bg-[#080e1a]/95 border-[#16233b] text-slate-100' 
        : 'bg-white/95 border-slate-200 text-slate-900'
    }`}>
      {/* Indian National Tricolor Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-[#F59E0B] via-[#FFFFFF] to-[#138808]" role="presentation" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. Left: Brand Logo & Title */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#b45309] text-white flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform border border-emerald-400/30">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-[#1B5E20] dark:text-emerald-400">
                  {t('appName', 'KISAN VIGYAAN')}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-300 rounded-full border border-emerald-300 dark:border-emerald-500/30 font-mono">
                  {role === 'officer' ? (lang === 'ta' ? 'வேளாண் அதிகாரி மையம்' : lang === 'mr' ? 'कृषी अधिकारी कक्ष' : 'Agri Officer Hub') : t('kisanWeb', 'Kisan Web')}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-none">
                {role === 'officer' ? (lang === 'ta' ? 'அரசு விரிவாக்கம் & நோய் கண்காணிப்பு' : lang === 'mr' ? 'शासकीय विस्तार व रोग सर्वेक्षण' : 'Govt. Extension & Disease Surveillance') : t('tagline', 'Precision Agronomy & Telemetry Platform')}
              </p>
            </div>
          </div>

          {/* 2. Center: Navigation Tabs */}
          {role === 'farmer' ? (
            <nav className="hidden lg:flex items-center space-x-1.5">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = item.id === 'more' ? isMoreActive : activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-black transition-all duration-200 relative cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#1B5E20] to-[#15803d] text-white shadow-md scale-[1.02]' 
                        : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        : 'text-slate-700 hover:text-[#1B5E20] hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                    <span>{t(item.labelKey)}</span>
                    
                    {item.badge && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ml-0.5 ${
                        item.badge === '3' 
                          ? isActive ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                          : 'bg-white text-[#1B5E20]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          ) : (
            <nav className="hidden lg:flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 rounded-xl text-xs font-black border border-blue-300 dark:border-blue-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{lang === 'ta' ? 'அதிகாரி முறை செயலில் உள்ளது' : lang === 'mr' ? 'अधिकारी प्रणाली सक्रिय' : 'Officer Command Mode Active'}</span>
              </span>
            </nav>
          )}

          {/* 3. Right: Cart Button, Language Modal, Theme Toggle, Multi-Account Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Cart Trigger (Farmers Only) */}
            {role === 'farmer' && (
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 sm:px-3.5 sm:py-2 rounded-2xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-300 dark:border-slate-700 text-[#1B5E20] dark:text-emerald-400 hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                title="Open Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden md:inline-block text-xs font-black">
                  {t('myCart', 'Cart')}
                </span>
                {totalCartCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-black ml-0.5">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

            {/* Language Modal Trigger (Never Collapses Page!) */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                isDark 
                  ? 'bg-[#0e1629] border-[#1e2f4f] text-slate-200 hover:border-emerald-500/50' 
                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
              }`}
              title="Change Language"
              aria-label="Select Language"
            >
              <Globe className="w-4 h-4 text-[#1B5E20] dark:text-emerald-400 shrink-0" />
              <span className="font-black text-xs">
                {languageLabels[lang] || 'English'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                isDark 
                  ? 'bg-[#0e1629] border-[#1e2f4f] text-amber-400 hover:bg-[#15233e]' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={t('toggleTheme', 'Toggle Light/Dark Theme')}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile & Interactive Multi-Account Switcher Trigger */}
            <div 
              onClick={() => setIsAccountSwitcherOpen(true)}
              className={`flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-2xl border shadow-xs cursor-pointer group hover:border-emerald-500 transition-all ${
                isDark ? 'bg-[#0e1629] border-[#1e2f4f]' : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
              title="Click to Switch Accounts or Manage Profile"
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-black text-xs shadow-2xs">
                {currentUser.avatar || '👨‍🌾'}
              </div>
              <div className="text-left leading-none">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black block text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block mt-0.5">
                  {currentUser.role === 'officer' ? (lang === 'ta' ? 'வேளாண் அதிகாரி' : lang === 'mr' ? 'कृषी अधिकारी' : 'Agri Officer') : (currentUser.village || (lang === 'ta' ? 'விவசாயி' : lang === 'mr' ? 'शेतकरी' : 'Farmer'))}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
