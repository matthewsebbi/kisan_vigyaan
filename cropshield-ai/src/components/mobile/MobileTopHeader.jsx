import React from 'react';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speechUtils';
import { 
  Wheat, 
  Globe, 
  Sun, 
  Moon, 
  Volume2, 
  ShoppingCart,
  ShieldCheck
} from 'lucide-react';

export const MobileTopHeader = ({ onNavigate }) => {
  const { lang, setLang, t, theme, toggleTheme, cart, setIsCartModalOpen } = useApp();
  const isDark = theme === 'dark';
  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  const handleVoiceHelp = () => {
    const welcomeMsg = lang === 'mr' 
      ? 'किसान विज्ञान (KISAN VIGYAAN) शेतकरी पोर्टलवर आपले स्वागत आहे. तुमच्या ६ पैकी २ शेतांवर आज तातडीने लक्ष देण्याची गरज आहे.'
      : lang === 'hi'
      ? 'किसान विज्ञान (KISAN VIGYAAN) में आपका स्वागत है। आपके 6 में से 2 खेतों में आज ध्यान देने की जरूरत है।'
      : 'Welcome to KISAN VIGYAAN. 2 of your 6 plots need attention today.';
    speakText(welcomeMsg, lang);
  };

  return (
    <header className={`px-3 py-2.5 border-b sticky top-0 z-30 shadow-xs transition-colors ${
      isDark ? 'bg-[#090f1d] border-[#16233b] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        {/* Brand & App Name */}
        <div 
          onClick={() => onNavigate('esp32LiveData')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-[8px] bg-[#1B5E20] text-white flex items-center justify-center font-bold shadow-xs">
            <Wheat className="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <h1 className="font-extrabold text-[15px] tracking-tight leading-none text-[#1B5E20] flex items-center gap-1">
              KISAN VIGYAAN
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              {lang === 'mr' ? 'शेतकरी मित्र' : lang === 'hi' ? 'किसान साथी' : 'Farmer Portal'}
            </p>
          </div>
        </div>

        {/* Right Controls: Audio Speaker, Language Picker, Theme, Profile */}
        <div className="flex items-center gap-2">
            
            {/* Cart Button */}
            <button 
              onClick={() => setIsCartModalOpen(true)}
              className="relative p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#1B5E20] border border-emerald-200 transition-colors shadow-xs"
              title="Open Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-[#1B5E20] text-white text-[9px] font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Read Aloud Button */}
            <button
              onClick={handleVoiceHelp}
            className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#1B5E20] border border-emerald-200 transition-colors shadow-xs"
            title="Read Aloud in Your Language"
            aria-label="Audio Reader"
          >
            <Volume2 className="w-4 h-4 animate-pulse" />
          </button>

          {/* Language Selector */}
          <div className={`flex items-center px-2 py-1 rounded-[6px] border ${
            isDark ? 'bg-[#0e1629] border-[#1e2f4f] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <Globe className="w-3.5 h-3.5 text-[#1B5E20] mr-1" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent font-bold text-[11px] focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="mr">मराठी</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="gu">ગુજરાતી</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-[6px] border ${
              isDark ? 'bg-[#0e1629] border-[#1e2f4f] text-amber-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* User Profile Avatar */}
          <div className="w-7 h-7 rounded-full bg-[#1B5E20] text-white flex items-center justify-center font-bold text-[10px] shadow-xs shrink-0">
            RP
          </div>
        </div>
      </div>
    </header>
  );
};
