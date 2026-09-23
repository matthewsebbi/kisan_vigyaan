import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Cpu, 
  Camera, 
  Bell, 
  ShoppingBag, 
  Menu 
} from 'lucide-react';

export const MobileBottomNav = ({ activeTab, onTabChange }) => {
  const { lang, t, theme, cart } = useApp();
  const isDark = theme === 'dark';
  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  const tabs = [
    { id: 'esp32LiveData', labelEn: 'Zone', labelMr: 'झोन', labelHi: 'ज़ोन', icon: Cpu, badge: null },
    { id: 'scan', labelEn: 'Scan', labelMr: 'कॅमेरा स्कॅन', labelHi: 'स्कैन', icon: Camera, badge: 'AI', isCenter: true },
    { id: 'alerts', labelEn: 'Alerts', labelMr: 'इशारे', labelHi: 'अलर्ट', icon: Bell, badge: '3' },
    { id: 'market', labelEn: 'Market', labelMr: 'बाजार', labelHi: 'बाजार', icon: ShoppingBag, badge: cartCount > 0 ? `${cartCount}` : null },
    { id: 'more', labelEn: 'More', labelMr: 'अधिक', labelHi: 'अन्य', icon: Menu, badge: null }
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 border-t transition-colors shadow-lg ${
      isDark ? 'bg-[#090f1d] border-[#16233b]' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-1.5">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const label = lang === 'mr' ? tab.labelMr : lang === 'hi' ? tab.labelHi : tab.labelEn;

          if (tab.isCenter) {
            // Prominent Camera Scan Shutter Tab
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center -mt-5 group focus:outline-none cursor-pointer"
                aria-label="Scan Crop Leaf with AI Camera"
              >
                <div className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 border-3 ${
                  isActive 
                    ? 'bg-emerald-600 border-white text-white ring-4 ring-emerald-500/30' 
                    : 'bg-[#1B5E20] border-white text-white'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold mt-0.5 ${
                  isActive ? 'text-[#1B5E20]' : isDark ? 'text-slate-300' : 'text-slate-700'
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
              className={`flex-1 py-1 flex flex-col items-center justify-center transition-colors cursor-pointer relative min-h-[48px] ${
                isActive 
                  ? 'text-[#1B5E20] font-bold' 
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className={`absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full text-[8px] font-bold ${
                    tab.badge === '3' 
                      ? 'bg-rose-500 text-white' 
                      : tab.badge === 'AI'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#1B5E20] text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
