import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Cpu, 
  Camera, 
  Bot, 
  ShoppingBag, 
  Layers 
} from 'lucide-react';

export const WebBottomNav = ({ activeTab, onTabChange }) => {
  const { t, theme, cart } = useApp();
  const isDark = theme === 'dark';
  const cartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);

  const tabs = [
    { id: 'esp32LiveData', label: 'Zone Monitoring', labelKey: 'navZone', icon: Cpu, badge: null },
    { id: 'scan', labelKey: 'navScan', icon: Camera, isCenter: true },
    { id: 'chatbot', label: 'AI Chatbot', labelKey: 'navChatbot', icon: Bot, badge: 'TTS' },
    { id: 'market', labelKey: 'navMarket', icon: ShoppingBag, badge: cartCount > 0 ? `${cartCount}` : null },
    { id: 'more', labelKey: 'navMore', icon: Layers, badge: null }
  ];

  const isMoreActive = activeTab === 'more' || ['proTips', 'govtSchemes', 'farmerCommunity', 'roiCalculator'].includes(activeTab);

  return (
    <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t transition-all duration-300 backdrop-blur-md shadow-2xl ${
      isDark ? 'bg-[#090f1d]/95 border-[#16233b]' : 'bg-white/95 border-slate-200'
    }`}>
      <div className="max-w-md mx-auto flex items-center justify-around px-3 py-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = tab.id === 'more' ? isMoreActive : activeTab === tab.id;
          const label = t(tab.labelKey);

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center -mt-7 group focus:outline-none cursor-pointer"
                aria-label="Leaf Scanner"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all active:scale-95 border-3 ${
                  isActive 
                    ? 'bg-gradient-to-br from-emerald-600 to-amber-600 border-white dark:border-slate-900 text-white ring-4 ring-emerald-500/30 scale-105' 
                    : 'bg-gradient-to-br from-[#1B5E20] to-[#b45309] border-white dark:border-slate-900 text-white hover:scale-105 shadow-emerald-950/20'
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-[10px] font-black mt-1 ${
                  isActive ? 'text-[#1B5E20] dark:text-emerald-400' : isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center py-1 px-2 focus:outline-none relative group cursor-pointer"
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive 
                    ? 'text-[#1B5E20] dark:text-emerald-400' 
                    : isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-800'
                }`} />

                {tab.badge && (
                  <span className={`absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-black leading-none ${
                    tab.badge === '3' ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className={`text-[10px] font-black mt-0.5 tracking-tight transition-colors ${
                isActive 
                  ? 'text-[#1B5E20] dark:text-emerald-400' 
                  : isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-800'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
