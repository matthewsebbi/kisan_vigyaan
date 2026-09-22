import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Map as MapIcon, 
  Users, 
  Bell, 
  Settings, 
  TrendingUp, 
  AlertOctagon, 
  ShieldAlert, 
  Activity, 
  Calendar, 
  ChevronDown, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Radio, 
  Download, 
  Send,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Phone,
  BadgeCheck,
  UserCheck,
  Sprout,
  BarChart3,
  Percent,
  Timer,
  Zap,
  Globe,
  Layers
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';
import { ReportsReviewQueue } from './ReportsReviewQueue';
import { AdvisoryBroadcaster } from './AdvisoryBroadcaster';
import { FarmerDirectory } from './FarmerDirectory';
import { RiskMapLeaflet } from './RiskMapLeaflet';

export const OfficerDashboard = () => {
  const { 
    officerTab, 
    setOfficerTab, 
    officerProfile,
    fieldReviewQueue,
    modelAccuracy,
    theme,
    lang,
    t,
    registeredFarmersRegistry = []
  } = useApp();

  const isDark = theme === 'dark';

  const officerState = officerProfile?.state || 'Maharashtra';
  const stateEnrolledFarmers = registeredFarmersRegistry.filter(f => 
    !f.state || f.state.toLowerCase() === officerState.toLowerCase()
  );

  // Filters State
  const [selectedRegion, setSelectedRegion] = useState('all'); // 'all' | 'miraj' | 'kupwad' | 'tasgaon' | 'walwa' | 'jath'
  const [selectedCrop, setSelectedCrop] = useState('all'); // 'all' | 'cotton' | 'tomato' | 'rice' | 'sugarcane' | 'soybean'
  const [dateRange, setDateRange] = useState('Current Season (Aug 2026)');

  const pendingCount = fieldReviewQueue.filter(s => s.status === 'pending').length;

  // 1. Earlier Detection Trend Data (Lag in Days vs Traditional Scouting)
  const timeToDetectionData = [
    { week: 'W1 (Jul)', manualDays: 7.5, cropshieldDays: 2.1, timeSavedHours: 129 },
    { week: 'W2 (Jul)', manualDays: 8.0, cropshieldDays: 1.8, timeSavedHours: 148 },
    { week: 'W3 (Aug)', manualDays: 7.2, cropshieldDays: 1.5, timeSavedHours: 136 },
    { week: 'W4 (Aug)', manualDays: 6.8, cropshieldDays: 1.2, timeSavedHours: 134 }
  ];

  // 2. Crop Loss Avoided & Salvaged Hectares
  const cropLossAvoidedData = [
    { month: 'May', lossAvoidedLakhs: 8.2, hectaresProtected: 65 },
    { month: 'Jun', lossAvoidedLakhs: 14.5, hectaresProtected: 112 },
    { month: 'Jul', lossAvoidedLakhs: 19.8, hectaresProtected: 148 },
    { month: 'Aug', lossAvoidedLakhs: 24.8, hectaresProtected: 184 }
  ];

  // 3. Targeted Chemical Use Reductions (by Crop)
  const pesticideReductionData = [
    { crop: 'Cotton', standardSprayKg: 12.4, targetedSprayKg: 7.8, reductionPct: 37 },
    { crop: 'Tomato', standardSprayKg: 9.8, targetedSprayKg: 6.2, reductionPct: 36 },
    { crop: 'Rice', standardSprayKg: 6.5, targetedSprayKg: 4.8, reductionPct: 26 },
    { crop: 'Sugarcane', standardSprayKg: 14.0, targetedSprayKg: 9.5, reductionPct: 32 },
    { crop: 'Soybean', standardSprayKg: 8.2, targetedSprayKg: 5.1, reductionPct: 38 }
  ];

  // 4. Extension Response SLA Tracking Data (Hours to Resolution)
  const slaResponseData = [
    { day: 'Mon', avgResponseHours: 2.4, slaTarget: 4.0, compliancePct: 92 },
    { day: 'Tue', avgResponseHours: 1.9, slaTarget: 4.0, compliancePct: 96 },
    { day: 'Wed', avgResponseHours: 1.8, slaTarget: 4.0, compliancePct: 95 },
    { day: 'Thu', avgResponseHours: 1.5, slaTarget: 4.0, compliancePct: 98 },
    { day: 'Fri', avgResponseHours: 1.7, slaTarget: 4.0, compliancePct: 94 }
  ];

  // 5. Surveillance Coverage by Tehsil Block
  const coverageData = [
    { block: 'Kupwad Shivar', coveragePct: 92, scannedPlots: 340, totalPlots: 370 },
    { block: 'Miraj North', coveragePct: 88, scannedPlots: 410, totalPlots: 465 },
    { block: 'Tasgaon South', coveragePct: 74, scannedPlots: 260, totalPlots: 350 },
    { block: 'Walwa Block', coveragePct: 81, scannedPlots: 310, totalPlots: 380 },
    { block: 'Jath Sector', coveragePct: 62, scannedPlots: 195, totalPlots: 315 }
  ];

  // 6. 7-Day Preventive Risk Matrix by Region
  const preventiveRiskMatrix = [
    { region: 'Miraj Block', crop: 'Cotton', vectorRisk: 'High (Spore Spread)', humidity: '85%', forecast: 'Early Blight Outbreak Likely', action: 'Broadcast Streptocycline advisory' },
    { region: 'Kupwad Shivar', crop: 'Tomato', vectorRisk: 'Moderate (Canker)', humidity: '72%', forecast: 'Alternaria Ring Stage', action: 'Recommend Mancozeb foliar spray' },
    { region: 'Tasgaon', crop: 'Grapes', vectorRisk: 'Low (Downy Mildew)', humidity: '58%', forecast: 'Normal vegetative phase', action: 'Standard micro-drip schedule' },
    { region: 'Walwa', crop: 'Sugarcane', vectorRisk: 'Low (Early Shoot Borer)', humidity: '64%', forecast: 'Optimal chlorophyll index', action: 'Soil moisture top-up' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Officer Header & Official Credentials */}
      <div className={`p-6 rounded-3xl border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 ${
        isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-[#F5FCF7] border-[#D2EBD7] text-slate-900'
      }`}>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#047857] to-[#065F46] text-white flex items-center justify-center text-3xl shadow-md shrink-0 border border-emerald-300/40">
            {officerProfile.avatar || '🧑‍🔬'}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {officerProfile.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-mono">
                {officerProfile.govtId || 'GOV-MH-OFFICER'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-700 font-mono">
                {officerProfile.badge || 'Verified Class-I'}
              </span>
            </div>
            
            <p className="text-xs text-slate-700 dark:text-slate-300 font-bold">
              {officerProfile.designation || 'District Agriculture Extension Officer'} • {officerProfile.department || 'Govt of Maharashtra'}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 dark:text-slate-400 font-mono pt-1">
              <span>📍 <strong>{officerProfile.jurisdictionArea || 'Sangli HQ'}</strong></span>
              <span>•</span>
              <span>📞 {officerProfile.phone} {officerProfile.officePhone ? `(${officerProfile.officePhone})` : ''}</span>
              <span>•</span>
              <span>✉️ {officerProfile.email}</span>
              <span>•</span>
              <span>💳 Aadhaar: <strong className="text-emerald-700 dark:text-emerald-400">{officerProfile.aadharNumber || officerProfile.aadharMasked || 'XXXX-XXXX-4891'}</strong></span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className={`flex flex-wrap items-center gap-1.5 p-1 rounded-2xl border text-xs font-black self-start lg:self-center ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white/80 border-[#D2EBD7]'
        }`}>
          {[
            { id: 'dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
            { id: 'reviewQueue', label: `Review Queue (${pendingCount})`, icon: FileSpreadsheet, badge: pendingCount > 0 ? `${pendingCount}` : null },
            { id: 'riskMap', label: 'GIS Risk Radar', icon: MapIcon },
            { id: 'advisories', label: 'Broadcast Alerts', icon: Bell },
            { id: 'farmers', label: 'Farmer Registry', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            const isSel = officerTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setOfficerTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSel
                    ? 'bg-[#047857] text-white shadow-md'
                    : isDark 
                    ? 'text-slate-400 hover:text-white' 
                    : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: OUTCOME ANALYTICS DASHBOARD (6 Targeted Visible Metrics) */}
      {officerTab === 'dashboard' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* State Farmer Enrolments & Portal Registrations Live Feed */}
          <div className={`p-5 sm:p-6 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#0a1120] border-slate-800' : 'bg-gradient-to-r from-emerald-50/70 via-white to-teal-50/50 border-emerald-200'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {officerState} State Farmer Enrolment Dispatches
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                      {stateEnrolledFarmers.length} Enrolled
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Farmer registrations automatically transmitted to the {officerState} State Agricultural Office upon portal signup.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live State Sync Active</span>
              </div>
            </div>

            {stateEnrolledFarmers.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No newly registered farmers for {officerState} yet. When a farmer signs up with state {officerState}, their username and phone number will immediately appear here.
                </p>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                {stateEnrolledFarmers.map((farmer) => (
                  <div 
                    key={farmer.id}
                    className={`p-4 rounded-2xl border transition-all hover:shadow-md ${
                      isDark 
                        ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-600/50' 
                        : 'bg-white border-slate-200/90 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {farmer.name}
                          </span>
                          <span className="px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                            Registered
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          <span>User ID:</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800">
                            @{farmer.username}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Phone:</span>
                        <a 
                          href={`tel:${farmer.phone}`}
                          className="font-mono text-emerald-700 dark:text-emerald-400 hover:underline"
                        >
                          {farmer.phone || 'Not provided'}
                        </a>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{farmer.district}, {farmer.state}</span>
                        </span>
                        <span className="font-mono text-[10px]">
                          {farmer.maskedAadhaar || 'Aadhaar Verified'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <BadgeCheck className="w-3 h-3" />
                          <span>Dispatched to Agri Office</span>
                        </span>
                        <span>{farmer.registeredAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Filters Bar (Region, Crop, Date Range) */}
          <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm ${
            isDark ? 'bg-[#0a1120] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Filters:</span>
              </span>

              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className={`p-2 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="all">All Tehsil Blocks (Sangli)</option>
                <option value="miraj">Miraj Block</option>
                <option value="kupwad">Kupwad Shivar</option>
                <option value="tasgaon">Tasgaon Block</option>
                <option value="walwa">Walwa Sector</option>
                <option value="jath">Jath Drought Zone</option>
              </select>

              {/* Crop Filter */}
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className={`p-2 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="all">All Crops (Cotton, Tomato, Rice, Cane)</option>
                <option value="cotton">Cotton (Bt Hybrid)</option>
                <option value="tomato">Tomato (Abhinav)</option>
                <option value="rice">Rice / Paddy</option>
                <option value="sugarcane">Sugarcane (Co 86032)</option>
                <option value="soybean">Soybean (JS 335)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{dateRange}</span>
            </div>
          </div>

          {/* 6 KEY VISIBLE OUTCOME METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Metric 1: Earlier Detection */}
            <div className={`p-5 rounded-3xl border shadow-sm space-y-2 hover:-translate-y-0.5 transition-transform ${
              isDark ? 'bg-[#0c1424] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                  1. Early Outbreak Detection
                </span>
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                3.2 Days Earlier
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Time-to-detection reduced by <strong>68%</strong> vs manual field scouting
              </p>
            </div>

            {/* Metric 2: Reduced Crop Loss */}
            <div className={`p-5 rounded-3xl border shadow-sm space-y-2 hover:-translate-y-0.5 transition-transform ${
              isDark ? 'bg-[#0c1424] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                  2. Reduced Crop Loss
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                ₹24.8 Lakhs Saved
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                184+ Hectares protected with <strong>88.4%</strong> crop salvage rate
              </p>
            </div>

            {/* Metric 3: Targeted Chemical Recommendations */}
            <div className={`p-5 rounded-3xl border shadow-sm space-y-2 hover:-translate-y-0.5 transition-transform ${
              isDark ? 'bg-[#0c1424] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-mono">
                  3. Precision Pesticide Use
                </span>
                <Percent className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                -34% Chemical Load
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Reduced blanket spraying via precision spot dosage prescriptions
              </p>
            </div>

            {/* Metric 4: Extension Response SLA */}
            <div className={`p-5 rounded-3xl border shadow-sm space-y-2 hover:-translate-y-0.5 transition-transform ${
              isDark ? 'bg-[#0c1424] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
                  4. Officer Response SLA
                </span>
                <Timer className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                1.8 Hours Avg SLA
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                <strong>94.8%</strong> of farmer query scans resolved within 4-hour SLA
              </p>
            </div>

            {/* Metric 5: Surveillance Coverage */}
            <div className={`p-5 rounded-3xl border shadow-sm space-y-2 hover:-translate-y-0.5 transition-transform ${
              isDark ? 'bg-[#0c1424] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-mono">
                  5. Surveillance Coverage
                </span>
                <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                82.4% District Covered
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                1,515 scanned plots across 5 tehsils in Sangli district
              </p>
            </div>

            {/* Metric 6: Preventive Intervention Planning */}
            <div className={`p-5 rounded-3xl border shadow-sm space-y-2 hover:-translate-y-0.5 transition-transform ${
              isDark ? 'bg-[#0c1424] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 font-mono">
                  6. Preventive Risk Planning
                </span>
                <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
                High Blight Risk (Miraj)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                7-day moisture radar indicates imminent spore germination
              </p>
            </div>

          </div>

          {/* TWO ANALYTICS CHARTS (Earlier Detection Graph + Chemical Reduction Bar Chart) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Chart 1: Time-to-Detection Trend Graph (6 cols) */}
            <div className={`lg:col-span-6 p-6 rounded-3xl border shadow-sm space-y-4 ${
              isDark ? 'bg-[#0a1120] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    Earlier Disease Detection Trend (Days Lag)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">CropShield AI detection vs manual physical field scouting</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">-68% Lag</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeToDetectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} />
                    <XAxis dataKey="week" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                    <YAxis unit=" d" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
                    <Legend />
                    <Line type="monotone" dataKey="manualDays" name="Manual Scouting (Days)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="cropshieldDays" name="CropShield AI (Days)" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Targeted Chemical Use Reductions by Crop (6 cols) */}
            <div className={`lg:col-span-6 p-6 rounded-3xl border shadow-sm space-y-4 ${
              isDark ? 'bg-[#0a1120] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    Targeted Chemical Load Reductions (Kg/Ha)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Precision targeted prescription vs unguided blanket application</p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-600">-34% Avg Runoff</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pesticideReductionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} />
                    <XAxis dataKey="crop" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                    <YAxis unit=" kg" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
                    <Legend />
                    <Bar dataKey="standardSprayKg" name="Standard Spray (Kg/Ha)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="targetedSprayKg" name="Targeted Dose (Kg/Ha)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* 7-Day Preventive Risk Matrix & Surveillance Coverage List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 7-Day Preventive Risk Matrix Table (7 cols) */}
            <div className={`lg:col-span-7 p-6 rounded-3xl border shadow-sm space-y-4 ${
              isDark ? 'bg-[#0a1120] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    7-Day Preventive Intervention Risk Matrix
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Microclimate radar forecast with preventative chemical recommendations</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  Live IMD Sync
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 font-black text-slate-500 font-mono">
                      <th className="py-2.5 px-2">Tehsil Block</th>
                      <th className="py-2.5 px-2">Crop</th>
                      <th className="py-2.5 px-2">Vector Risk</th>
                      <th className="py-2.5 px-2">Preventive Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {preventiveRiskMatrix.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                        <td className="py-3 px-2">
                          <strong className="text-slate-900 dark:text-white block font-bold">{item.region}</strong>
                          <span className="text-[10px] text-slate-500">{item.humidity} RH</span>
                        </td>
                        <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{item.crop}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black ${
                            item.vectorRisk.includes('High') 
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {item.vectorRisk}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                          {item.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Regional Surveillance Coverage by Block (5 cols) */}
            <div className={`lg:col-span-5 p-6 rounded-3xl border shadow-sm space-y-4 ${
              isDark ? 'bg-[#0a1120] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    Surveillance Coverage by Block
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Scanned plots vs registered field blocks</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {coverageData.map((cov, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-900 dark:text-white">{cov.block}</span>
                      <span className="text-emerald-700 dark:text-emerald-400">{cov.coveragePct}% ({cov.scannedPlots}/{cov.totalPlots})</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          cov.coveragePct > 80 ? 'bg-emerald-500' : cov.coveragePct > 70 ? 'bg-amber-500' : 'bg-indigo-500'
                        }`} 
                        style={{ width: `${cov.coveragePct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setOfficerTab('riskMap')}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>View Full GIS Outbreak Radar</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: REPORTS & FIELD REVIEW QUEUE */}
      {officerTab === 'reviewQueue' && (
        <ReportsReviewQueue />
      )}

      {/* VIEW 3: GIS RISK MAP RADAR */}
      {officerTab === 'riskMap' && (
        <RiskMapLeaflet />
      )}

      {/* VIEW 4: BROADCAST EMERGENCY ADVISORIES */}
      {officerTab === 'advisories' && (
        <AdvisoryBroadcaster />
      )}

      {/* VIEW 5: FARMER DIRECTORY */}
      {officerTab === 'farmers' && (
        <FarmerDirectory />
      )}

    </div>
  );
};
