import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Scan, 
  BarChart3, 
  Bell, 
  AlertTriangle, 
  Satellite, 
  Landmark, 
  Users, 
  Radio, 
  FileText, 
  X, 
  Wheat, 
  ShoppingBag, 
  Lightbulb,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const DarkSidebar = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const { lang, t, cart, theme } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const isDark = theme === 'dark';
  const cartCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  const navigationItems = [
    { id: 'dashboard', label: t('dashboard') || 'Surveillance Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'marketplace', label: t('farmerMarketplace') || 'Farmer Marketplace', icon: ShoppingBag, badge: cartCount > 0 ? `${cartCount}` : null },
    { id: 'proTips', label: t('proTips') || 'Pro Agronomy Tips', icon: Lightbulb, badge: null },
    { id: 'smartScanner', label: t('smartScanner') || 'Smart AI Leaf Scanner', icon: Scan, badge: 'Beta' },
    { id: 'statistics', label: t('statistics') || 'Statistics & Trends', icon: BarChart3, badge: null },
    { id: 'alertCenter', label: t('alertCenter') || 'Alert Center', icon: Bell, badge: '3' },
    { id: 'disasterPrediction', label: t('disasterPrediction') || 'Disaster Forecast', icon: AlertTriangle, badge: null },
    { id: 'satelliteMapping', label: t('satelliteMapping') || 'Satellite GIS Mapping', icon: Satellite, badge: null },
    { id: 'farmerCommunity', label: t('farmerCommunity') || 'Farmer Community', icon: Users, badge: null },
    { id: 'govtSchemes', label: t('govtSchemes') || 'Govt. Schemes & DBT', icon: Landmark, badge: null },
    { id: 'deviceManagement', label: t('deviceManagement') || 'IoT Device & Sensors', icon: Radio, badge: null },
    { id: 'reports', label: t('reports') || 'Reports & History', icon: FileText, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between transition-all duration-200 ease-in-out lg:static lg:translate-x-0
        border-r
        ${isDark ? 'bg-[#090f1d] border-[#16233b] text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'}
        ${collapsed ? 'w-16' : 'w-60'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Brand Header */}
          <div className={`px-3.5 py-3 border-b flex items-center justify-between ${
            isDark ? 'border-[#16233b]' : 'border-slate-100'
          }`}>
            <div 
              className="flex items-center space-x-2.5 cursor-pointer overflow-hidden" 
              onClick={() => setActiveView('dashboard')}
            >
              <div className="w-8 h-8 rounded-[6px] bg-[#1B5E20] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Wheat className="w-4 h-4 text-emerald-200" />
              </div>
              {!collapsed && (
                <div className="truncate leading-tight">
                  <h1 className={`font-bold text-[14px] tracking-tight flex items-center gap-1 ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {t('appName') || 'KISAN VIGYAAN'}
                  </h1>
                  <p className={`text-[10px] font-medium tracking-wide ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {lang === 'mr' ? 'महा कृषी देखरेख पोर्टल' : 'Maharashtra Agri-Surveillance'}
                  </p>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className={`lg:hidden p-1 rounded ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
              aria-label="Close Sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-130px)] text-[13px]">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsOpen(false);
                  }}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[5px] text-[13px] transition-colors cursor-pointer group ${
                    isActive
                      ? isDark 
                        ? 'border-l-[3px] border-emerald-500 bg-[#121d33] text-emerald-300 font-semibold pl-[7px]'
                        : 'border-l-[3px] border-[#1B5E20] bg-emerald-50 text-[#1B5E20] font-semibold pl-[7px]'
                      : isDark
                        ? 'border-l-[3px] border-transparent text-slate-400 hover:bg-[#0f172a] hover:text-slate-200'
                        : 'border-l-[3px] border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-center truncate">
                    <Icon className={`w-4 h-4 mr-2.5 shrink-0 transition-colors ${
                      isActive ? (isDark ? 'text-emerald-400' : 'text-[#1B5E20]') : (isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-400 group-hover:text-slate-600')
                    }`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!collapsed && item.badge && (
                    <span className={`px-1.5 py-0.2 text-[10px] font-mono rounded-[3px] tracking-wider uppercase ${
                      item.badge === '3' 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold' 
                        : item.badge === 'Beta'
                        ? (isDark ? 'bg-slate-800 text-slate-400 border border-slate-700 text-[9px]' : 'bg-slate-100 text-slate-600 border border-slate-200 text-[9px]')
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer: User Profile + Collapse Toggle */}
        <div className={`p-2 border-t space-y-1.5 ${isDark ? 'border-[#16233b] bg-[#070c18]' : 'border-slate-100 bg-slate-50/70'}`}>
          <div className={`flex items-center justify-between p-1.5 rounded-[5px] border ${
            isDark ? 'bg-[#0d1629] border-[#16233b]' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center space-x-2 truncate">
              <div className="w-6 h-6 rounded-[4px] bg-[#1B5E20] text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs">
                RP
              </div>
              {!collapsed && (
                <div className="truncate leading-tight text-left">
                  <p className={`font-semibold text-[12px] truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {lang === 'mr' ? 'रमेश पाटील' : 'Ramesh Patil'}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {lang === 'mr' ? 'सांगली • विभाग ४' : 'Sangli • Zone 4'}
                  </span>
                </div>
              )}
            </div>
            {!collapsed && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex items-center justify-between w-full px-2 py-1 text-[11px] rounded-[4px] transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {!collapsed && <span>{lang === 'mr' ? 'साइडबार बंद करा' : 'Collapse Sidebar'}</span>}
            {collapsed ? <ChevronRight className="w-3.5 h-3.5 mx-auto" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>
      </aside>
    </>
  );
};
