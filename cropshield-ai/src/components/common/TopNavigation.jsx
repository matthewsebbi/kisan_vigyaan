import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Leaf, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Globe, 
  Users, 
  UserCheck, 
  Activity, 
  Bell, 
  Sparkles,
  LogOut
} from 'lucide-react';

export const TopNavigation = () => {
  const { 
    role, 
    setRole, 
    lang, 
    setLang, 
    viewMode, 
    setViewMode, 
    t, 
    farmerProfile, 
    officerProfile,
    activeTab,
    setActiveTab,
    officerTab,
    setOfficerTab
  } = useApp();

  return (
    <header className="bg-[#124930] text-white sticky top-0 z-50 shadow-md border-b border-emerald-800/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Brand & App Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => role === 'farmer' ? setActiveTab('esp32LiveData') : setOfficerTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
            <Leaf className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">{t('appName')}</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-700/80 text-emerald-200 border border-emerald-500/30">
                v2.4 Live
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80 hidden sm:block">{t('tagline')}</p>
          </div>
        </div>

        {/* Global Controls & Switchers */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs">
          {/* Quick Demo Role Switcher */}
          <div className="flex items-center bg-emerald-950/60 p-1 rounded-lg border border-emerald-700/50 shadow-inner">
            <button
              onClick={() => setRole('farmer')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                role === 'farmer'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t('roleFarmer')}</span>
            </button>
            <button
              onClick={() => setRole('officer')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                role === 'officer'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t('roleOfficer')}</span>
            </button>
          </div>

          {/* Farmer Viewport Toggle (Mobile Mockup vs Full Desktop) */}
          {role === 'farmer' && (
            <div className="hidden md:flex items-center bg-emerald-950/60 p-1 rounded-lg border border-emerald-700/50">
              <button
                onClick={() => setViewMode('mobile')}
                title="View as Mobile App (As shown in mockup)"
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('desktop')}
                title="View as Full Web Dashboard"
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Multilingual Selector */}
          <div className="flex items-center space-x-1 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-700/50">
            <Globe className="w-3.5 h-3.5 text-emerald-300 mr-1" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-emerald-100 font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-emerald-900 text-white">English</option>
              <option value="mr" className="bg-emerald-900 text-white">मराठी (Marathi)</option>
              <option value="hi" className="bg-emerald-900 text-white">हिन्दी (Hindi)</option>
            </select>
          </div>

          {/* User Profile Pill */}
          <div className="hidden lg:flex items-center space-x-2 pl-2 border-l border-emerald-700/60">
            <span className="text-base">{role === 'farmer' ? farmerProfile.avatar : officerProfile.avatar}</span>
            <div className="text-left leading-tight">
              <p className="font-semibold text-white text-xs">{role === 'farmer' ? farmerProfile.name : officerProfile.name}</p>
              <p className="text-[10px] text-emerald-300/90">{role === 'farmer' ? farmerProfile.location : 'Sangli District Agri Dept'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
