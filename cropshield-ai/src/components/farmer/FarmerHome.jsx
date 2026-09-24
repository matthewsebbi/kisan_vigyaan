import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Bell, 
  Sun, 
  CloudSun, 
  Droplets, 
  CloudRain, 
  Camera, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight, 
  Users, 
  Radio, 
  Sparkles,
  MapPin,
  TrendingDown
} from 'lucide-react';

export const FarmerHome = () => {
  const { 
    t, 
    lang,
    farmerProfile, 
    setActiveTab, 
    currentDiagnosis,
    advisories,
    telemetry
  } = useApp();

  // Semi-circle gauge calculation for Early Risk Index
  const riskValue = farmerProfile.earlyRiskIndex; // e.g. 18%
  // Semi-circle path calculation: angle from -180 to 0 (or 0 to 180)
  const radius = 45;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (riskValue / 100) * circumference;

  const isHighRisk = riskValue >= 60;
  const isMediumRisk = riskValue >= 35 && riskValue < 60;

  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Top Mobile App Header */}
      <div className="px-5 pt-3 pb-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setActiveTab('profile')}
            className="p-1.5 -ml-1.5 text-gray-700 hover:text-emerald-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">KISAN VIGYAAN</h1>
            <p className="text-[11px] text-gray-500 font-medium">{t('tagline')}</p>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('alerts')}
          className="relative p-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Farmer Greeting & Location */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-1.5">
              {t('welcome')} <span className="text-xl">🌾</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 inline" />
              {farmerProfile.location}
            </p>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Live Sync
            </span>
          </div>
        </div>

        {/* Weather Card */}
        <div 
          onClick={() => setActiveTab('weather')}
          className="bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-slate-50 border border-emerald-100/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-amber-100/80 text-amber-600 rounded-xl">
                <CloudSun className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-3xl font-extrabold text-gray-900">28°C</span>
                  <span className="text-xs font-medium text-gray-600">{t('partlyCloudy')}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Sangli Substation Weather</p>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 text-right text-xs">
              <div className="flex items-center justify-end space-x-1 text-gray-600 font-medium">
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
                <span>{t('humidity')}: <strong className="text-gray-900 font-bold">65%</strong></span>
              </div>
              <div className="flex items-center justify-end space-x-1 text-gray-600 font-medium">
                <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t('rainfall')}: <strong className="text-gray-900 font-bold">0.0 mm</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Crop Card */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:border-emerald-200 transition-colors">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('currentCrop')}</span>
            <div className="text-xl font-bold text-gray-900">{farmerProfile.crop}</div>
            <p className="text-xs text-gray-600 font-medium">
              {t('growthStage')}: <span className="font-semibold text-emerald-700">{farmerProfile.growthStage}</span>
            </p>
          </div>
          {/* Realistic Tomato Thumbnail */}
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shadow-inner overflow-hidden relative">
            <span className="text-4xl transform hover:scale-110 transition-transform">🍅</span>
            <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/60 rounded text-[9px] text-white font-bold">
              {farmerProfile.variety}
            </div>
          </div>
        </div>

        {/* Crop Health Status */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{t('cropHealthStatus')}</h3>
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            farmerProfile.earlyRiskIndex < 35 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
              : farmerProfile.earlyRiskIndex < 60
              ? 'bg-amber-50/80 border-amber-200 text-amber-900'
              : 'bg-red-50/80 border-red-200 text-red-900'
          }`}>
            <div>
              <div className="text-base font-bold flex items-center gap-1.5">
                <ShieldCheck className={`w-5 h-5 ${
                  farmerProfile.earlyRiskIndex < 35 ? 'text-emerald-600' : 'text-amber-600'
                }`} />
                {farmerProfile.earlyRiskIndex < 35 ? t('healthGood') : t('mediumRisk')}
              </div>
              <p className="text-xs mt-0.5 font-medium opacity-90">
                {farmerProfile.earlyRiskIndex < 35 ? t('noMajorIssues') : 'Minor spore buildup detected in cluster'}
              </p>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white/80 border shadow-xs">
              Updated Today
            </span>
          </div>
        </div>

        {/* Early Risk Index Semi-Circular Gauge */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{t('earlyRiskIndex')}</h3>
              <p className={`text-base font-bold mt-0.5 ${
                isHighRisk ? 'text-red-600' : isMediumRisk ? 'text-amber-600' : 'text-emerald-700'
              }`}>
                {isHighRisk ? t('highRisk') : isMediumRisk ? t('mediumRisk') : t('lowRisk')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-gray-900">{riskValue}%</span>
              <p className="text-[10px] text-gray-400 font-medium">Risk Probability</p>
            </div>
          </div>

          {/* SVG Semi-Circle Gauge matching mockup */}
          <div className="relative flex flex-col items-center justify-center pt-2 pb-1">
            <svg width="220" height="110" viewBox="0 0 220 110" className="overflow-visible">
              {/* Background Arc */}
              <path
                d="M 20 100 A 90 90 0 0 1 200 100"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Colored Gauge Indicator Arc */}
              <path
                d="M 20 100 A 90 90 0 0 1 200 100"
                fill="none"
                stroke={isHighRisk ? '#ef4444' : isMediumRisk ? '#f59e0b' : '#22c55e'}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${(riskValue / 100) * 283} 283`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="w-full flex justify-between px-6 -mt-2 text-xs font-bold text-gray-500">
              <span>0</span>
              <span className="text-gray-900 font-extrabold text-sm">{riskValue}%</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Prominent Primary CTA: Scan Crop Button */}
        <button
          onClick={() => setActiveTab('scan')}
          className="w-full py-4 px-6 bg-[#165a3c] hover:bg-[#124930] active:scale-[0.98] text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center justify-center space-x-2.5 transition-all duration-200"
        >
          <Camera className="w-6 h-6 text-emerald-300" />
          <span>{t('scanCrop')}</span>
        </button>

        {/* Secondary Buttons: My Reports & Alerts */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveTab('reports')}
            className="py-3 px-4 bg-white hover:bg-emerald-50/50 border border-gray-200/90 rounded-2xl shadow-xs font-semibold text-gray-800 text-xs flex items-center justify-center space-x-2 transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>{t('myReports')}</span>
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className="py-3 px-4 bg-white hover:bg-emerald-50/50 border border-gray-200/90 rounded-2xl shadow-xs font-semibold text-gray-800 text-xs flex items-center justify-center space-x-2 transition-all"
          >
            <Bell className="w-4 h-4 text-emerald-700" />
            <span>{t('alerts')}</span>
          </button>
        </div>

        {/* Quick Links to Community & Trap Sensor */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => setActiveTab('community')}
            className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200/80 rounded-2xl text-left flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-600 text-white rounded-xl">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">{t('community')}</p>
                <p className="text-[10px] text-gray-500 font-medium">Farmer & Officer Q&A</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={() => setActiveTab('sensors')}
            className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200/80 rounded-2xl text-left flex items-center justify-between transition-all"
          >
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-amber-600 text-white rounded-xl">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">{t('sensorTraps')}</p>
                <p className="text-[10px] text-gray-500 font-medium">Pheromone & IoT</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Early Warning Alert Banner (Pink/Red Container with Bell) */}
        <div className="bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 border border-red-200/90 rounded-2xl p-4 shadow-sm flex items-start space-x-3.5">
          <div className="p-2.5 bg-emerald-800 text-emerald-100 rounded-2xl shadow-xs flex-shrink-0">
            <Bell className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-red-900 uppercase tracking-wide">
                {t('earlyWarningAlert')}
              </h4>
              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                Sangli District
              </span>
            </div>
            <p className="text-xs text-red-800/90 mt-1 font-medium leading-relaxed">
              {t('earlyWarningDesc')}
            </p>
            <button
              onClick={() => setActiveTab('alerts')}
              className="inline-flex items-center text-xs font-bold text-emerald-800 hover:text-emerald-950 mt-2 group"
            >
              <span>{t('viewDetails')}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
