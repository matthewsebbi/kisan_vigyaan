import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  Thermometer, 
  Droplets, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Calendar, 
  Sparkles,
  ArrowUpRight,
  Download,
  Info,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Search,
  Filter,
  Microscope,
  Cpu,
  Layers,
  MapPin,
  Clock,
  CheckCircle2,
  Wind
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
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

export const StatisticsTrends = () => {
  const { lang, t, theme } = useApp();
  const isDark = theme === 'dark';

  // Active Sub-Tab: 'surveillance' | 'historical' | 'riskModel' | 'microclimate'
  const [activeTab, setActiveTab] = useState('surveillance');
  const [selectedSeason, setSelectedSeason] = useState('kharif2026');
  const [districtSearch, setDistrictSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  // 1. Historical Multi-Year Disease Outbreak Trend Data (2024 vs 2025 vs 2026 with AI Intervention)
  const historicalOutbreakTrends = [
    { month: 'Jan', year2024: 42, year2025: 31, year2026: 14, blightSpike: 12, rustSpike: 6 },
    { month: 'Feb', year2024: 38, year2025: 28, year2026: 11, blightSpike: 9, rustSpike: 5 },
    { month: 'Mar', year2024: 45, year2025: 34, year2026: 16, blightSpike: 15, rustSpike: 8 },
    { month: 'Apr', year2024: 52, year2025: 39, year2026: 18, blightSpike: 19, rustSpike: 10 },
    { month: 'May', year2024: 68, year2025: 49, year2026: 22, blightSpike: 24, rustSpike: 14 },
    { month: 'Jun', year2024: 88, year2025: 64, year2026: 28, blightSpike: 32, rustSpike: 21 },
    { month: 'Jul', year2024: 94, year2025: 71, year2026: 31, blightSpike: 36, rustSpike: 24 },
    { month: 'Aug', year2024: 91, year2025: 68, year2026: 29, blightSpike: 34, rustSpike: 22 },
    { month: 'Sep', year2024: 82, year2025: 59, year2026: 25, blightSpike: 29, rustSpike: 18 },
    { month: 'Oct', year2024: 64, year2025: 45, year2026: 19, blightSpike: 21, rustSpike: 12 },
    { month: 'Nov', year2024: 48, year2025: 33, year2026: 13, blightSpike: 14, rustSpike: 7 },
    { month: 'Dec', year2024: 39, year2025: 27, year2026: 10, blightSpike: 10, rustSpike: 4 }
  ];

  // 2. Pathogen-Specific Prevalence Breakdown Data
  const pathogenPrevalenceData = [
    { name: 'Bacterial Blight', nameMr: 'जिवाणू करपा', count2025: 420, count2026: 110, crop: 'Cotton / Rice', severity: 'High' },
    { name: 'Early/Late Blight', nameMr: 'अगेती/पछेती करपा', count2025: 380, count2026: 95, crop: 'Tomato / Potato', severity: 'Medium' },
    { name: 'Powdery Mildew', nameMr: 'भुरी रोग', count2025: 290, count2026: 72, crop: 'Grapes / Mango', severity: 'Medium' },
    { name: 'Paddy Blast', nameMr: 'भात करपा / ब्लास्ट', count2025: 340, count2026: 80, crop: 'Paddy (Rice)', severity: 'High' },
    { name: 'Sugarcane Red Rot', nameMr: 'ऊस तांबेरा / लाल कुज', count2025: 210, count2026: 48, crop: 'Sugarcane', severity: 'Critical' },
    { name: 'Soybean Rust', nameMr: 'सोयाबीन तांबेरा', count2025: 260, count2026: 58, crop: 'Soybean', severity: 'Medium' }
  ];

  // 3. Regional Agro-Surveillance Matrix Across Maharashtra Districts
  const districtSurveillanceList = [
    {
      id: 'dist-sangli',
      district: 'Sangli',
      districtMr: 'सांगली',
      districtTa: 'சாங்லி',
      division: 'Western Maharashtra',
      crops: 'Sugarcane, Bt Cotton, Grapes, Rice',
      primaryPathogen: 'Bacterial Blight (Xanthomonas)',
      primaryPathogenMr: 'जिवाणू करपा (कापूस)',
      riskIndex: 71,
      severity: 'critical',
      trend: '-62% vs 2025',
      coverageHa: '4,85,000 Ha',
      activeNodes: 24,
      actionTaken: 'Streptocycline + Copper Oxychloride spray targeted in Miraj block.'
    },
    {
      id: 'dist-kolhapur',
      district: 'Kolhapur',
      districtMr: 'कोल्हापूर',
      districtTa: 'கோலாப்பூர்',
      division: 'Western Maharashtra',
      crops: 'Sugarcane (Co 86032), Paddy',
      primaryPathogen: 'Sugarcane Smut & Red Rot',
      primaryPathogenMr: 'ऊस काणी व तांबेरा',
      riskIndex: 22,
      severity: 'healthy',
      trend: '-78% vs 2025',
      coverageHa: '4,20,000 Ha',
      activeNodes: 32,
      actionTaken: 'Trichoderma viride bio-fungicide preventative soil application.'
    },
    {
      id: 'dist-yavatmal',
      district: 'Yavatmal',
      districtMr: 'यवतमाळ',
      districtTa: 'யவத்மால்',
      division: 'Vidarbha',
      crops: 'Bt Cotton, Soybean, Pigeon Pea',
      primaryPathogen: 'Pink Bollworm & Bacterial Blight',
      primaryPathogenMr: 'गुलाबी बोंडअळी व करपा',
      riskIndex: 68,
      severity: 'warning',
      trend: '-54% vs 2025',
      coverageHa: '8,90,000 Ha',
      activeNodes: 48,
      actionTaken: 'Pheromone mass-trapping solar units deployed across 4,200 acres.'
    },
    {
      id: 'dist-nashik',
      district: 'Nashik',
      districtMr: 'नाशिक',
      districtTa: 'நாசிக்',
      division: 'North Maharashtra',
      crops: 'Grapes (Thompson Seedless), Onion',
      primaryPathogen: 'Downy Mildew (Plasmopara)',
      primaryPathogenMr: 'द्राक्ष डाऊनी मिल्ड्यू (केवडा)',
      riskIndex: 38,
      severity: 'healthy',
      trend: '-81% vs 2025',
      coverageHa: '6,10,000 Ha',
      activeNodes: 42,
      actionTaken: 'Prophylactic potassium phosphonate spraying before rainfall front.'
    },
    {
      id: 'dist-aurangabad',
      district: 'Chhatrapati Sambhajinagar',
      districtMr: 'छत्रपती संभाजीनगर',
      districtTa: 'சம்பாஜிநகர்',
      division: 'Marathwada',
      crops: 'Cotton, Maize, Sweet Orange (Mosambi)',
      primaryPathogen: 'Fall Armyworm & Citrus Dieback',
      primaryPathogenMr: 'लष्करी अळी व सिट्रस डायबॅक',
      riskIndex: 52,
      severity: 'warning',
      trend: '-49% vs 2025',
      coverageHa: '7,30,000 Ha',
      activeNodes: 36,
      actionTaken: 'Emamectin benzoate bio-spray & soil microbial enrichment.'
    },
    {
      id: 'dist-satara',
      district: 'Satara',
      districtMr: 'सातारा',
      districtTa: 'சதாரா',
      division: 'Western Maharashtra',
      crops: 'Strawberry, Ginger, Sugarcane',
      primaryPathogen: 'Ginger Rhizome Rot (Pythium)',
      primaryPathogenMr: 'आले कंदकुज (मऊ कुज)',
      riskIndex: 30,
      severity: 'healthy',
      trend: '-74% vs 2025',
      coverageHa: '3,90,000 Ha',
      activeNodes: 28,
      actionTaken: 'Metalaxyl rhizome dip treatment and raised-bed drainage.'
    },
    {
      id: 'dist-nagpur',
      district: 'Nagpur',
      districtMr: 'नागपूर',
      districtTa: 'நாக்பூர்',
      division: 'Vidarbha',
      crops: 'Nagpur Orange, Paddy, Soybean',
      primaryPathogen: 'Citrus Canker & Gummosis',
      primaryPathogenMr: 'संत्रा डिंक्या व कॅन्कर',
      riskIndex: 44,
      severity: 'healthy',
      trend: '-69% vs 2025',
      coverageHa: '5,40,000 Ha',
      activeNodes: 30,
      actionTaken: 'Bordeaux paste trunk application on mandarin orchards.'
    },
    {
      id: 'dist-solapur',
      district: 'Solapur',
      districtMr: 'सोलापूर',
      districtTa: 'சோலாப்பூர்',
      division: 'Western Maharashtra',
      crops: 'Pomegranate (Bhagwa), Sugarcane',
      primaryPathogen: 'Bacterial Oily Spot (Telya)',
      primaryPathogenMr: 'डाळिंब तेल्या रोग (झांथोमोनास)',
      riskIndex: 58,
      severity: 'warning',
      trend: '-58% vs 2025',
      coverageHa: '4,60,000 Ha',
      activeNodes: 34,
      actionTaken: 'Streptomycin + 2-Bromo-2-nitropropane spray cycle.'
    }
  ];

  // 4. 24-Hour IoT Micro-Climate Telemetry Data
  const hourlyClimateTrends = [
    { time: '00:00', ambientTemp: 22.4, canopyTemp: 21.8, humidity: 82, leafWetness: 90, vpd: 0.4 },
    { time: '03:00', ambientTemp: 20.8, canopyTemp: 20.2, humidity: 88, leafWetness: 95, vpd: 0.2 },
    { time: '06:00', ambientTemp: 21.2, canopyTemp: 20.9, humidity: 86, leafWetness: 88, vpd: 0.3 },
    { time: '09:00', ambientTemp: 26.5, canopyTemp: 25.8, humidity: 71, leafWetness: 40, vpd: 0.9 },
    { time: '12:00', ambientTemp: 31.8, canopyTemp: 29.4, humidity: 54, leafWetness: 10, vpd: 1.8 },
    { time: '15:00', ambientTemp: 33.2, canopyTemp: 30.1, humidity: 48, leafWetness: 5, vpd: 2.2 },
    { time: '18:00', ambientTemp: 28.6, canopyTemp: 27.2, humidity: 62, leafWetness: 20, vpd: 1.2 },
    { time: '21:00', ambientTemp: 24.5, canopyTemp: 23.9, humidity: 74, leafWetness: 65, vpd: 0.7 }
  ];

  // Filter districts
  const filteredDistricts = districtSurveillanceList.filter(d => {
    const matchesSearch = d.district.toLowerCase().includes(districtSearch.toLowerCase()) ||
                          d.crops.toLowerCase().includes(districtSearch.toLowerCase()) ||
                          d.primaryPathogen.toLowerCase().includes(districtSearch.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || d.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans">
      
      {/* 1. TOP HEADER & TELEMETRY SUMMARY */}
      <div className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark ? 'bg-[#091222] border-[#182a4a] text-white' : 'bg-[#F5FCF7] border-[#D2EBD7] text-slate-900'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#047857] to-[#0D9488] text-white flex items-center justify-center shadow-md shrink-0">
            <BarChart3 className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                {lang === 'ta' ? 'பிராந்திய நோய் கண்காணிப்பு & வரலாற்றுப் போக்குகள்' : lang === 'mr' ? 'प्रादेशिक पीक रोग पाळत व ऐतिहासिक कल' : lang === 'hi' ? 'क्षेत्रीय फसल रोग निगरानी व ऐतिहासिक रुझान' : 'Regional Disease Surveillance & Historical Trends'}
              </h1>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-mono">
                ICAR / KVK Verified
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
              {lang === 'ta' ? '36 மாவட்ட தொற்று வரைபடம், நோய்க்கிருமி குறைப்பு வளைவுகள் மற்றும் மைக்ரோ-க்ளைமேட் முன்னறிவிப்பு' : lang === 'mr' ? '३६ जिल्ह्यांचे रोग प्रादुर्भाव विश्लेषण, बुरशी वाढ मॉडेल व ऐतिहासिक कल' : '36 Maharashtra districts surveillance matrix, multi-year pathogen reduction curves, and AI spore prediction models'}
            </p>
          </div>
        </div>

        <button 
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-2xl bg-[#047857] hover:bg-[#065F46] text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{lang === 'ta' ? 'அறிக்கையை ஏற்றுமதி செய்க' : lang === 'mr' ? 'अहवाल डाउनलोड करा' : 'Export Surveillance PDF'}</span>
        </button>
      </div>

      {/* 2. SUB-TAB SWITCHER */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'surveillance', label: lang === 'ta' ? '🛡️ மாவட்ட கண்காணிப்பு மேட்ரிக்ஸ்' : lang === 'mr' ? '🛡️ प्रादेशिक रोग पाळत तक्ता' : '🛡️ Regional Surveillance Matrix', icon: ShieldAlert },
          { id: 'historical', label: lang === 'ta' ? '📈 வரலாற்று தொற்று குறைப்பு வளைவு' : lang === 'mr' ? '📈 ऐतिहासिक रोग कल (2024-26)' : '📈 Historical Outbreak Trends (2024-26)', icon: TrendingUp },
          { id: 'riskModel', label: lang === 'ta' ? '🔬 முன்னறிவிப்பு நோய் மாதிரி' : lang === 'mr' ? '🔬 हवामान रोग जोखीम मॉडेल' : '🔬 AI Spore Infection Risk Model', icon: Microscope },
          { id: 'microclimate', label: lang === 'ta' ? '🌡️ மைக்ரோ-க்ளைமேட் சென்சார் வளைவு' : lang === 'mr' ? '🌡️ २४ तास तापमान व आर्द्रता आलेख' : '🌡️ 24h Farm Micro-Climate Telemetry', icon: Activity }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer active:scale-95 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#047857] to-[#059669] text-white shadow-md shadow-emerald-950/20'
                : isDark 
                ? 'bg-[#0a1324] border border-[#182a4a] text-slate-300 hover:text-white' 
                : 'bg-[#F5FCF7] border border-[#D2EBD7] text-slate-700 hover:text-[#047857] hover:border-emerald-400 shadow-2xs'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. FOUR KEY STATISTICAL KPI TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tile 1: State Outbreak Control Rate */}
        <div className={`p-5 rounded-3xl border shadow-xs ${
          isDark ? 'bg-[#0a1426] border-[#1a2d4f]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-mono">
            <span>Crop Loss Reduction</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800 dark:text-emerald-400 mt-2 font-mono">
            -68.4%
          </div>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1 mt-1">
            <span>vs 2024 Pre-CropShield baseline</span>
          </span>
        </div>

        {/* Tile 2: Active Monitored Acreage */}
        <div className={`p-5 rounded-3xl border shadow-xs ${
          isDark ? 'bg-[#0a1426] border-[#1a2d4f]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-mono">
            <span>Monitored Farmland</span>
            <Layers className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            44.2 Lakh Ha
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 mt-1">
            <span>Across 36 Maharashtra districts</span>
          </span>
        </div>

        {/* Tile 3: High Risk Zones */}
        <div className={`p-5 rounded-3xl border shadow-xs ${
          isDark ? 'bg-[#0a1426] border-[#1a2d4f]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-mono">
            <span>High Pathogen Zones</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-400 mt-2 font-mono">
            2 Districts
          </div>
          <span className="text-[11px] text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1 mt-1">
            <span>Sangli (Cotton) & Yavatmal</span>
          </span>
        </div>

        {/* Tile 4: Weather Telemetry Nodes */}
        <div className={`p-5 rounded-3xl border shadow-xs ${
          isDark ? 'bg-[#0a1426] border-[#1a2d4f]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-mono">
            <span>Active Farm Telemetry</span>
            <Cpu className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            274 Nodes
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 mt-1">
            <span>Live telemetry every 15 min</span>
          </span>
        </div>

      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 1: REGIONAL SURVEILLANCE MATRIX TABLE                     */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'surveillance' && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300">Filter Status:</span>
              {[
                { id: 'all', label: 'All Districts (8)' },
                { id: 'critical', label: '🔴 Critical Outbreak (1)' },
                { id: 'warning', label: '🟡 Spore Warning (3)' },
                { id: 'healthy', label: '🟢 Optimal Protected (4)' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSeverityFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    severityFilter === f.id
                      ? 'bg-[#047857] text-white shadow-xs'
                      : 'bg-[#F5FCF7] dark:bg-[#0a1324] border border-[#D2EBD7] dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search district, crop, pathogen..."
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500 border ${
                  isDark ? 'bg-[#0a1324] border-slate-800 text-white' : 'bg-[#F5FCF7] border-[#D2EBD7] text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Surveillance Table Card */}
          <div className={`rounded-3xl border overflow-hidden shadow-sm ${
            isDark ? 'bg-[#0a1324] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`border-b text-[11px] font-mono font-black uppercase tracking-wider ${
                  isDark ? 'bg-[#0f1d38] border-slate-800 text-slate-400' : 'bg-[#EAF6ED] border-[#D2EBD7] text-slate-700'
                }`}>
                  <tr>
                    <th className="p-4">District & Region</th>
                    <th className="p-4">Major Crops</th>
                    <th className="p-4">Dominant Pathogen Alert</th>
                    <th className="p-4 text-center">Pathogen Risk Index</th>
                    <th className="p-4">Surveillance Status</th>
                    <th className="p-4">Targeted Biocontrol Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                  {filteredDistricts.map(d => {
                    const isCrit = d.severity === 'critical';
                    const isWarn = d.severity === 'warning';
                    const isHealth = d.severity === 'healthy';

                    return (
                      <tr key={d.id} className="hover:bg-emerald-50/50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="p-4 font-black text-slate-900 dark:text-white">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{d.district}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-medium block pl-5 font-mono">{d.division} • {d.coverageHa}</span>
                        </td>
                        <td className="p-4 text-slate-700 dark:text-slate-300 font-bold">
                          {d.crops}
                        </td>
                        <td className="p-4">
                          <strong className={isCrit ? 'text-rose-600 dark:text-rose-400' : isWarn ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-800 dark:text-emerald-300'}>
                            {d.primaryPathogen}
                          </strong>
                          <span className="text-[10px] text-slate-500 block font-mono">Trend: {d.trend}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-black ${
                            isCrit 
                              ? 'bg-rose-100 text-rose-900 border border-rose-300' 
                              : isWarn 
                              ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}>
                            {d.riskIndex} / 100
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase font-mono tracking-wider ${
                            isCrit 
                              ? 'bg-rose-600 text-white' 
                              : isWarn 
                              ? 'bg-amber-600 text-white' 
                              : 'bg-[#047857] text-white'
                          }`}>
                            {isCrit ? 'Critical Outbreak' : isWarn ? 'Moderate Warning' : 'Optimal Protected'}
                          </span>
                        </td>
                        <td className="p-4 text-[11px] text-slate-600 dark:text-slate-300 font-medium max-w-xs">
                          {d.actionTaken}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 2: HISTORICAL MULTI-YEAR OUTBREAK REDUCTION TRENDS        */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'historical' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Main Multi-Year Comparison Line Chart */}
          <div className={`p-6 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#0a1426] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Multi-Year Pathogen Incidence Reduction Curve (2024 vs 2025 vs 2026)</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                  Demonstrates 68.4% reduction in peak monsoon spore spikes after autonomous satellite & drone AI intervention.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-bold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> 2024 (Pre-AI)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> 2025</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span> 2026 (AI Managed)</span>
              </div>
            </div>

            <div className="h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalOutbreakTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} fontWeight={700} />
                  <YAxis stroke="#64748B" fontSize={11} fontWeight={700} unit=" outbreaks" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#0B1426' : '#FFFFFF', 
                      borderRadius: '16px', 
                      border: '1px solid #D2EBD7',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }} 
                  />
                  <Line type="monotone" dataKey="year2024" stroke="#F43F5E" strokeWidth={2.5} strokeDasharray="5 5" name="2024 (Uncontrolled Baseline)" />
                  <Line type="monotone" dataKey="year2025" stroke="#F59E0B" strokeWidth={2.5} name="2025 (Partial Monitoring)" />
                  <Line type="monotone" dataKey="year2026" stroke="#047857" strokeWidth={4} dot={{ r: 4 }} name="2026 (KISAN VIGYAAN Autonomous)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pathogen-Specific Breakdown Bar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className={`p-6 rounded-3xl border shadow-sm ${
              isDark ? 'bg-[#0a1426] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
            }`}>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Pathogen Cases: 2025 vs 2026 Comparison
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 mb-4">
                Total reported cases per 10,000 hectares across major Maharashtra crops.
              </p>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pathogenPrevalenceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" opacity={0.3} />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={10} angle={-15} textAnchor="end" height={45} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: isDark ? '#0B1426' : '#FFFFFF', 
                        borderRadius: '14px', 
                        border: '1px solid #D2EBD7' 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="count2025" fill="#F59E0B" name="2025 Cases" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="count2026" fill="#047857" name="2026 Cases (Active AI)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scientific Epidemiological Insights */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
              isDark ? 'bg-[#0a1426] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
            }`}>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Microscope className="w-5 h-5 text-emerald-700" />
                <span>Epidemiological Key Findings</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900 border border-[#D2EBD7] dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block font-black">1. Early Inoculum Suppression</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    AI diagnostic leaf imaging detected primary lesions <strong>4.8 days earlier</strong> than visual scouting, preventing secondary foliar cycle outbreaks in 89% of monitored plots.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900 border border-[#D2EBD7] dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block font-black">2. Chemical Input Reduction</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Targeted micro-dosing and drone foliar precision spray reduced synthetic fungicide volume by <strong>42.6%</strong> across Sangli and Kolhapur cane/cotton tracts.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900 border border-[#D2EBD7] dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block font-black">3. Weather-Triggered Prophylaxis</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Integrating 48-hour rainfall alerts prevented wash-off losses and ensured bio-agents (Trichoderma / Bacillus subtilis) colonized plant cuticle effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 3: AI SPORE INFECTION RISK MODEL                          */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'riskModel' && (
        <div className="space-y-6 animate-fadeIn">
          <div className={`p-6 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#0a1426] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
          }`}>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <span>5-Day Agro-Climatic Spore Germination Forecast (Miraj Block)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 mb-6">
              Neural network calculating pathogen infection probability based on canopy leaf wetness duration (LWD) + temperature co-occurrence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
              {[
                { day: 'Today (Day 1)', temp: '29.4°C', rh: '68%', riskScore: 71, level: 'High Risk', pathogen: 'Bacterial Blight', alertColor: 'border-rose-400 bg-rose-50/70 text-rose-950' },
                { day: 'Tomorrow (Day 2)', temp: '28.1°C', rh: '76%', riskScore: 78, level: 'Critical Spore Window', pathogen: 'Spore Germination', alertColor: 'border-rose-500 bg-rose-100/70 text-rose-950' },
                { day: 'Friday (Day 3)', temp: '27.5°C', rh: '84%', riskScore: 82, level: 'Rainfall Event', pathogen: 'Fungal Sporulation', alertColor: 'border-rose-500 bg-rose-100 text-rose-950' },
                { day: 'Saturday (Day 4)', temp: '30.2°C', rh: '62%', riskScore: 45, level: 'Moderate Risk', pathogen: 'Dry Canopy', alertColor: 'border-amber-400 bg-amber-50/70 text-amber-950' },
                { day: 'Sunday (Day 5)', temp: '31.8°C', rh: '55%', riskScore: 28, level: 'Low Inoculum Risk', pathogen: 'Safe Window', alertColor: 'border-emerald-300 bg-emerald-50/70 text-emerald-950' }
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border-2 space-y-2 ${item.alertColor}`}>
                  <div className="flex items-center justify-between font-mono font-black text-xs">
                    <span>{item.day}</span>
                    <span>{item.riskScore}%</span>
                  </div>
                  <strong className="text-sm font-black block leading-tight">{item.level}</strong>
                  <div className="text-[11px] font-mono space-y-0.5 pt-1 border-t border-black/10">
                    <div>Temp: <strong>{item.temp}</strong></div>
                    <div>Humidity: <strong>{item.rh}</strong></div>
                    <div className="text-[10px] font-bold">Threat: {item.pathogen}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TAB 4: 24-HOUR MICRO-CLIMATE & HUMIDITY TELEMETRY             */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'microclimate' && (
        <div className="space-y-6 animate-fadeIn">
          <div className={`p-6 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#0a1426] border-[#182a4a]' : 'bg-[#F5FCF7] border-[#D2EBD7]'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  24-Hour Canopy vs Ambient Temperature & Leaf Wetness
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Sangli Miraj agricultural telemetry nodes tracking canopy differential.
                </p>
              </div>
            </div>

            <div className="h-72 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyClimateTrends}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="humGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" opacity={0.3} />
                  <XAxis dataKey="time" stroke="#64748B" fontSize={11} fontWeight={700} />
                  <YAxis stroke="#64748B" fontSize={11} fontWeight={700} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#0B1426' : '#FFFFFF', 
                      borderRadius: '16px', 
                      border: '1px solid #D2EBD7' 
                    }} 
                  />
                  <Legend />
                  <Area type="monotone" dataKey="canopyTemp" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#tempGradient)" name="Canopy Temp (°C)" />
                  <Area type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#humGradient)" name="Relative Humidity (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
