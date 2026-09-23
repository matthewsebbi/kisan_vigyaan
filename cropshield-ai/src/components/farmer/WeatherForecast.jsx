import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Sun, 
  CloudSun, 
  CloudRain, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert,
  Thermometer,
  Compass
} from 'lucide-react';

export const WeatherForecast = () => {
  const { t, lang, setActiveTab, telemetry, farmerProfile } = useApp();

  const forecastDays = [
    { day: "Today", date: "27 May", temp: "28°C / 21°C", humidity: "65%", rain: "0.0 mm", risk: "High", riskColor: "text-red-600 bg-red-50 border-red-200", icon: CloudSun, condition: "Partly Cloudy", sporeAlert: "High risk of Early Blight fungal germination." },
    { day: "Tomorrow", date: "28 May", temp: "29°C / 22°C", humidity: "70%", rain: "4.2 mm", risk: "High", riskColor: "text-red-600 bg-red-50 border-red-200", icon: CloudRain, condition: "Afternoon Showers", sporeAlert: "Post-rain leaf wetness creates optimal blight infection period." },
    { day: "Wednesday", date: "29 May", temp: "27°C / 20°C", humidity: "62%", rain: "1.0 mm", risk: "Medium", riskColor: "text-amber-600 bg-amber-50 border-amber-200", icon: CloudSun, condition: "Scattered Clouds", sporeAlert: "Moderate spore dispersion via wind." },
    { day: "Thursday", date: "30 May", temp: "31°C / 23°C", humidity: "52%", rain: "0.0 mm", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: Sun, condition: "Sunny & Warm", sporeAlert: "Aphid vector activity may increase in warm hours." },
    { day: "Friday", date: "31 May", temp: "32°C / 24°C", humidity: "48%", rain: "0.0 mm", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: Sun, condition: "Clear Sky", sporeAlert: "Safe period for foliar nutritional sprays." },
    { day: "Saturday", date: "01 Jun", temp: "30°C / 22°C", humidity: "55%", rain: "0.0 mm", risk: "Low", riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CloudSun, condition: "Pleasant", sporeAlert: "Routine crop scouting recommended." },
    { day: "Sunday", date: "02 Jun", temp: "29°C / 21°C", humidity: "60%", rain: "2.0 mm", risk: "Medium", riskColor: "text-amber-600 bg-amber-50 border-amber-200", icon: CloudRain, condition: "Light Drizzle", sporeAlert: "Check sticky traps after light shower." }
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      {/* Top Header */}
      <div className="px-4 py-3.5 bg-[#165a3c] flex items-center justify-between shadow-md text-white">
        <button 
          onClick={() => setActiveTab('esp32LiveData')}
          className="p-1.5 -ml-1 text-white hover:bg-emerald-800/60 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold tracking-tight">{t('weather')} & Risk Forecast</h1>

        <div className="w-6"></div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Current Micro-Weather Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Sangli Agri-Weather Station</span>
                <h2 className="text-3xl font-black mt-1">28.4°C</h2>
                <p className="text-xs text-emerald-200 mt-0.5">Partly Cloudy • Wind 8.5 km/h</p>
              </div>
              <CloudSun className="w-16 h-16 text-amber-300 drop-shadow-md" />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-700/60 text-center">
              <div className="bg-emerald-900/60 p-2 rounded-xl">
                <span className="text-[10px] text-emerald-300 block">Humidity</span>
                <strong className="text-sm">65%</strong>
              </div>
              <div className="bg-emerald-900/60 p-2 rounded-xl">
                <span className="text-[10px] text-emerald-300 block">Leaf Wetness</span>
                <strong className="text-sm">6.5 hrs</strong>
              </div>
              <div className="bg-emerald-900/60 p-2 rounded-xl">
                <span className="text-[10px] text-emerald-300 block">Rain (48h)</span>
                <strong className="text-sm">14.2 mm</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Disease Outbreak Predictive Timeline */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">
            7-Day Disease Risk Forecast
          </h3>

          <div className="space-y-2">
            {forecastDays.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-3 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 rounded-xl text-amber-600">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-gray-900">{item.day}</span>
                          <span className="text-[11px] text-gray-400">({item.date})</span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium">{item.condition} • {item.temp}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.riskColor}`}>
                        {item.risk} Risk
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] bg-slate-50 p-2 rounded-xl text-gray-600 border border-slate-100 flex items-start space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{item.sporeAlert}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
