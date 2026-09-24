import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Search, 
  Globe, 
  Sun, 
  Moon, 
  Bell, 
  ShoppingCart
} from 'lucide-react';

export const TopHeader = ({ activeView, onOpenSidebar, onNavigate }) => {
  const { lang, setLang, t, cart, theme, toggleTheme, setIsCartModalOpen } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const isDark = theme === 'dark';
  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString(lang === 'mr' ? 'mr-IN' : 'en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard': return t('farmHealthCare') || 'Farm & Crop Health Surveillance';
      case 'marketplace': return t('farmerMarketplace') || 'Farmer Marketplace & Mandi Hub';
      case 'proTips': return t('proTips') || 'Pro Agronomy Tips & Chemical Matrix';
      case 'smartScanner': return t('smartScanner') || 'Smart AI Vision Leaf Scanner';
      case 'statistics': return t('statistics') || 'Regional Pest & Crop Health Analytics';
      case 'alertCenter': return t('alertCenter') || 'Active Outbreak Alerts & Advisory Center';
      case 'disasterPrediction': return t('disasterPrediction') || 'Agro-Meteorological Disaster Forecast';
      case 'satelliteMapping': return t('satelliteMapping') || 'ISRO Bhuvan / Sentinel-2 NDVI Mapping';
      case 'farmerCommunity': return t('farmerCommunity') || 'Farmer Knowledge Exchange & Verification';
      case 'govtSchemes': return t('govtSchemes') || 'Direct Benefit Transfer & Government Welfare';
      case 'deviceManagement': return t('deviceManagement') || 'IoT Smart Trap Telemetry & Sensor Fleet';
      case 'reports': return t('reports') || 'Historical Field Reports & Digital Dossier';
      default: return 'KISAN VIGYAAN Surveillance';
    }
  };

  return (
    <header className={`px-4 py-2.5 border-b sticky top-0 z-30 shadow-xs transition-colors ${
      isDark ? 'bg-[#090f1d] border-[#16233b] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mobile Toggle + Page Title & Relative Sync Timestamp */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className={`lg:hidden p-1 rounded-[4px] transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className={`text-[18px] sm:text-[19px] font-bold tracking-tight leading-tight ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-0.5">
              <span className="flex items-center gap-1 text-[#1B5E20] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{t('liveSynced') || 'Live Synced'}</span>
              </span>
              <span>•</span>
              <span className="font-mono">{formattedTime} IST</span>
              <span>•</span>
              <span>{t('sangliKvkNode') || 'Maharashtra KVK Agro-Node'}</span>
            </div>
          </div>
        </div>

        {/* Right: Search, Language, Theme, Cart, Alerts, User Profile */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Search Box */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder={t('searchPlaceholder') || 'Search field plots, inputs, telemetry...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-48 lg:w-56 pl-8 pr-2.5 py-1 rounded-[5px] text-[12px] focus:outline-none focus:border-[#1B5E20] transition-colors ${
                isDark 
                  ? 'bg-[#0e1629] border border-[#1e2f4f] text-slate-200 placeholder-slate-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white'
              }`}
            />
          </div>

          {/* Language Selector */}
          <div className={`flex items-center space-x-1.5 px-2 py-1 rounded-[5px] border ${
            isDark ? 'bg-[#0e1629] border-[#1e2f4f] text-slate-200' : 'bg-slate-50 border border-slate-200 text-slate-700'
          }`}>
            <Globe className="w-3.5 h-3.5 text-[#1B5E20]" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className={`bg-transparent font-medium text-[11px] focus:outline-none cursor-pointer ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              <option value="en" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>English</option>
              <option value="mr" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>मराठी (Marathi)</option>
              <option value="hi" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>हिन्दी (Hindi)</option>
              <option value="te" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>తెలుగు (Telugu)</option>
              <option value="ta" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>தமிழ் (Tamil)</option>
              <option value="kn" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>ಕನ್ನಡ (Kannada)</option>
              <option value="ml" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>മലയാളം (Malayalam)</option>
              <option value="gu" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>ગુજરાતી (Gujarati)</option>
              <option value="bn" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>বাংলা (Bengali)</option>
              <option value="pa" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="or" className={isDark ? 'bg-[#090f1d] text-white' : 'bg-white text-slate-900'}>ଓଡ଼ିଆ (Odia)</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-[5px] border transition-colors cursor-pointer ${
              isDark 
                ? 'bg-[#0e1629] hover:bg-[#152038] border-[#1e2f4f] text-slate-200' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-semibold">{t('switchLight') || 'Light'}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[11px] font-semibold">{t('switchDark') || 'Dark'}</span>
              </>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={() => setIsCartModalOpen(true)}
            className={`relative p-1.5 rounded-[5px] border transition-colors cursor-pointer ${
              isDark ? 'bg-[#0e1629] hover:bg-[#152038] border-[#1e2f4f] text-slate-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Open Marketplace Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#1B5E20]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#1B5E20] text-white text-[9px] font-bold rounded-[3px]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Alert Center Button */}
          <button 
            onClick={() => onNavigate && onNavigate('alertCenter')}
            className={`relative p-1.5 rounded-[5px] border transition-colors cursor-pointer ${
              isDark ? 'bg-[#0e1629] hover:bg-[#152038] border-[#1e2f4f] text-slate-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Active Surveillance Alerts"
          >
            <Bell className="w-3.5 h-3.5 text-slate-400" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
          </button>

          {/* User Profile Pill */}
          <div className={`flex items-center space-x-2 pl-2 border-l ${isDark ? 'border-[#1e2f4f]' : 'border-slate-200'}`}>
            <div className="w-6 h-6 rounded-[4px] bg-[#1B5E20] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
              RP
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className={`font-bold text-[12px] ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {lang === 'mr' ? 'रमेश पाटील' : 'Ramesh Patil'}
              </p>
              <span className="text-[10px] text-slate-400 font-mono">Sangli, MH</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
