import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  ShoppingBag, 
  Globe, 
  Sun, 
  Moon, 
  Sprout, 
  CloudSun,
  ShieldCheck, 
  ChevronDown,
  Mic,
  Activity,
  Radio,
  Sparkles,
  LogOut
} from 'lucide-react';

export const WebTopHeader = ({ activeTab, onNavigate, onOpenMobileMenu }) => {
  const { 
    lang, 
    t, 
    theme, 
    toggleTheme, 
    cart, 
    setIsCartModalOpen, 
    setIsLanguageModalOpen,
    setIsAccountSwitcherOpen,
    setIsChotaKissanOpen,
    currentUser,
    role,
    logout
  } = useApp();

  const isDark = theme === 'dark';
  const totalCartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  const navTabs = [
    { id: 'esp32LiveData', label: 'Zone Monitoring', labelMr: 'झोन मॉनिटरिंग', labelHi: 'ज़ोन निगरानी', labelTa: 'மண்டல கண்காணிப்பு' },
    { id: 'scan', label: 'AI Leaf Scanner', labelMr: 'एआय पान स्कॅनर', labelHi: 'एआई पत्ती स्कैनर', labelTa: 'AI இலை ஸ்கேனர்' },
    { id: 'market', label: 'Mandi & Market', labelMr: 'बाजार व मण्डी', labelHi: 'मंडी व बाजार', labelTa: 'சந்தை & மண்டி' },
  ];

  const getTabLabel = (tab) => {
    if (lang === 'mr' && tab.labelMr) return tab.labelMr;
    if (lang === 'hi' && tab.labelHi) return tab.labelHi;
    if (lang === 'ta' && tab.labelTa) return tab.labelTa;
    return tab.label;
  };

  return (
    <header className={`sticky top-0 z-30 border-b transition-colors ${
      isDark 
        ? 'bg-[#0B1426]/95 border-[#182B48] text-slate-100 shadow-sm' 
        : 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0B1C30] shadow-xs'
    } backdrop-blur-md`}>
      
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Segmented Navigation Pills */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Segmented Navigation Pills */}
          {role === 'farmer' && (
            <nav className="hidden lg:flex items-center gap-1">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onNavigate(tab.id)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#E8F5ED] text-[#0F5132] dark:bg-emerald-950/60 dark:text-emerald-300 border border-[#C2E7D0] dark:border-emerald-800/50 shadow-2xs font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {getTabLabel(tab)}
                  </button>
                );
              })}
            </nav>
          )}

          <div className="lg:hidden flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-[#0F172A] dark:text-emerald-400">
              CropShield AI
            </span>
          </div>
        </div>

        {/* Right: Language, Theme, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Language Toggle Pill */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              isDark 
                ? 'bg-[#121F38] border-[#1E2E4A] text-slate-200 hover:border-emerald-500/50' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-emerald-400" />
            <span className="font-mono uppercase text-[11px]">
              {lang.toUpperCase()}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark 
                ? 'bg-[#121F38] border-[#1E2E4A] text-amber-400 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-amber-600 hover:bg-slate-50'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* User Profile Avatar with Name & Village Badge (Matching Reference) */}
          <div
            onClick={() => setIsAccountSwitcherOpen(true)}
            className="flex items-center gap-2 pl-1 cursor-pointer group"
            title="Profile & Account Switcher"
          >
            <div className="w-8 h-8 rounded-full bg-[#006C48] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {(currentUser.name || 'R').charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {currentUser.village || 'Kupwad Shivar'}
              </span>
            </div>
          </div>

          {/* Logout Action Button */}
          <button
            onClick={logout}
            className={`p-2 rounded-xl border transition-colors cursor-pointer text-slate-400 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-500/50 ${
              isDark ? 'bg-[#121F38] border-[#1E2E4A]' : 'bg-white border-slate-200 hover:bg-rose-50'
            }`}
            title="Log Out (Sign Out of Farmland)"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
};

