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
  Sparkles
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
    role 
  } = useApp();

  const isDark = theme === 'dark';
  const totalCartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  const navTabs = [
    { id: 'home', label: 'Dashboard & Telemetry', labelMr: 'डॅशबोर्ड व टेलीमेट्री', labelHi: 'डैशबोर्ड व टेलीमेट्री', labelTa: 'முகப்பு பலகை' },
    { id: 'scan', label: 'AI Leaf Scanner', labelMr: 'एआय पान स्कॅनर', labelHi: 'एआई पत्ती स्कैनर', labelTa: 'AI இலை ஸ்கேனர்' },
    { id: 'satelliteMapping', label: 'Satellite GIS & Yield', labelMr: 'उपग्रह पीक नकाशा', labelHi: 'उपग्रह फसल मानचित्र', labelTa: 'செயற்கைக்கோள் வரைபடம்' },
    { id: 'market', label: 'Market & Schemes', labelMr: 'बाजार व योजना', labelHi: 'मंडी व योजनाएं', labelTa: 'சந்தை & மானியம்' },
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
        : 'bg-[#FFFFFF]/95 border-[#E2E8F0] text-[#0B1C30] shadow-[0_1px_4px_rgba(0,0,0,0.03)]'
    } backdrop-blur-md`}>
      
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Brand / Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-[#012D1D] dark:text-emerald-400">
              KISAN VIGYAAN
            </span>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              v2.4 Pro
            </span>
          </div>
        </div>

        {/* Center: Segmented Navigation Pills (Desktop View) */}
        {role === 'farmer' && (
          <nav className="hidden xl:flex items-center p-1 bg-slate-100 dark:bg-[#121E36] rounded-xl border border-slate-200 dark:border-slate-800">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-[#1B4332] text-[#012D1D] dark:text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#012D1D] dark:hover:text-white'
                  }`}
                >
                  {getTabLabel(tab)}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right: Telemetry Status, Language, Chota Kissan AI, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Live ESP32 Hardware Status Pill */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
            isDark 
              ? 'bg-[#121F38] border-[#1E2E4A] text-emerald-300' 
              : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tabular-nums font-mono text-[11px]">ESP32: Node 14 (Live)</span>
          </div>

          {/* Language Toggle Pill */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              isDark 
                ? 'bg-[#121F38] border-[#1E2E4A] text-slate-200 hover:border-emerald-500/50' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline font-mono uppercase text-[11px]">
              {lang}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark 
                ? 'bg-[#121F38] border-[#1E2E4A] text-amber-400 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Kisan One AI Voice Button */}
          <button
            onClick={() => setIsChotaKissanOpen(true)}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer group"
            title="Talk to Kisan One AI Voice Assistant"
          >
            <span className="hidden sm:inline">Kisan One AI</span>
            <Mic className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
          </button>

          {/* User Profile Avatar */}
          <div
            onClick={() => setIsAccountSwitcherOpen(true)}
            className="flex items-center gap-2 pl-1 cursor-pointer group"
            title="Profile & Account Switcher"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-xs border border-white/50">
              {currentUser.avatar || '👨‍🌾'}
            </div>
            <div className="hidden 2xl:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {currentUser.village || 'Farmer'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

