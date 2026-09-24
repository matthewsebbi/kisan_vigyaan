import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  Calendar, 
  ChevronRight,
  Radio,
  CheckCircle2
} from 'lucide-react';

export const FarmerAlerts = () => {
  const { t, lang, setActiveTab, advisories } = useApp();

  const alertsList = [
    {
      id: "al-1",
      title: "Early Blight Spore Influx Warning",
      titleMr: "सांगली भागात करपा रोगाचा तीव्र इशारा",
      message: "Continuous 65% humidity & recent 14mm rainfall in Sangli cluster created prime conditions for Alternaria solani spore germination. Inspect your tomato fields within 24 hours.",
      time: "2 hours ago",
      type: "high",
      source: "Sangli Agri Dept & KISAN VIGYAAN"
    },
    {
      id: "al-2",
      title: "Pheromone Trap Count Notice (Fruit Borer)",
      titleMr: "कामगंध सापळा कीड संख्या सूचना",
      message: "Average trap catch reached 7 moths/trap in Miraj belt. Economic threshold is 8 moths/trap. Prepare Neem Oil or pheromone lure replacement.",
      time: "Yesterday",
      type: "medium",
      source: "District Pest Surveillance Unit"
    },
    {
      id: "al-3",
      title: "Government Bio-Fungicide Subsidy Available",
      titleMr: "जैविक बुरशीनाशक अनुदान उपलब्ध",
      message: "100% subsidized Trichoderma and Neem bio-formulations available at Kupwad Gram Panchayat Krishi Seva Kendra for registered CropShield farmers.",
      time: "2 days ago",
      type: "info",
      source: "Taluka Krishi Adhikari"
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      {/* Header */}
      <div className="px-4 py-3.5 bg-[#165a3c] flex items-center justify-between shadow-md text-white">
        <button 
          onClick={() => setActiveTab('home')}
          className="p-1.5 -ml-1 text-white hover:bg-emerald-800/60 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold tracking-tight">{t('alerts')}</h1>

        <div className="w-6"></div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {alertsList.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 rounded-2xl border shadow-xs space-y-2 ${
              alert.type === 'high' 
                ? 'bg-red-50/80 border-red-200' 
                : alert.type === 'medium'
                ? 'bg-amber-50/80 border-amber-200'
                : 'bg-emerald-50/80 border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                alert.type === 'high' 
                  ? 'bg-red-200 text-red-900' 
                  : alert.type === 'medium'
                  ? 'bg-amber-200 text-amber-900'
                  : 'bg-emerald-200 text-emerald-900'
              }`}>
                {alert.type === 'high' ? 'High Risk Alert' : alert.type === 'medium' ? 'Surveillance Alert' : 'Scheme Notice'}
              </span>
              <span className="text-[11px] text-gray-400 font-medium">{alert.time}</span>
            </div>

            <h3 className="text-sm font-extrabold text-gray-900 leading-snug">
              {lang === 'mr' ? alert.titleMr : alert.title}
            </h3>

            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              {alert.message}
            </p>

            <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-200/60">
              <span>Source: <strong>{alert.source}</strong></span>
              <button 
                onClick={() => setActiveTab('scan')}
                className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center"
              >
                Scan Field <ChevronRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
