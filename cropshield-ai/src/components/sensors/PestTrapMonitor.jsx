import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  Droplets, 
  Thermometer, 
  Activity, 
  RefreshCw, 
  Zap,
  Sliders,
  Bell
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PestTrapMonitor = () => {
  const { t, lang, setActiveTab, telemetry, setTelemetry, farmerProfile, setFarmerProfile } = useApp();

  const [traps, setTraps] = useState([
    {
      id: "trap-01",
      type: "Pheromone Trap (Helicoverpa / Fruit Borer)",
      targetCrop: "Tomato (Flowering/Fruiting)",
      count: 7,
      etlLimit: 8,
      status: "Near Warning Level",
      lureDaysLeft: 12,
      lastInspected: "Today, 08:00 AM"
    },
    {
      id: "trap-02",
      type: "Yellow Sticky Trap (Whiteflies & Aphids)",
      targetCrop: "Tomato / Capsicum",
      count: 26,
      etlLimit: 15,
      status: "Threshold Exceeded (High Risk)",
      lureDaysLeft: 4,
      lastInspected: "Today, 07:30 AM"
    },
    {
      id: "trap-03",
      type: "Solar Light Trap (Spodoptera Leaf Worm)",
      targetCrop: "Vegetable Field Boundary",
      count: 3,
      etlLimit: 10,
      status: "Safe (Low Level)",
      lureDaysLeft: 20,
      lastInspected: "Yesterday"
    }
  ]);

  const [soilMoisture, setSoilMoisture] = useState(44);
  const [canopyTemp, setCanopyTemp] = useState(28.4);
  const [leafWetness, setLeafWetness] = useState(6.5);

  const handleUpdateTrapCount = (id, delta) => {
    setTraps(prev => prev.map(trap => {
      if (trap.id === id) {
        const newCount = Math.max(0, trap.count + delta);
        const isExceeded = newCount >= trap.etlLimit;
        const isNear = newCount >= trap.etlLimit * 0.75;
        return {
          ...trap,
          count: newCount,
          status: isExceeded ? "Threshold Exceeded (High Risk)" : isNear ? "Near Warning Level" : "Safe (Low Level)"
        };
      }
      return trap;
    }));
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      {/* Header */}
      <div className="px-4 py-3.5 bg-[#165a3c] flex items-center justify-between shadow-md text-white">
        <button 
          onClick={() => setActiveTab('esp32LiveData')}
          className="p-1.5 -ml-1 text-white hover:bg-emerald-800/60 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold tracking-tight">{t('sensorTraps')} Monitor</h1>

        <div className="w-6"></div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Real-time Field IoT Sensors Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-700" />
              Live Farm IoT Telemetry (Sangli Station)
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Live Sensor Feed
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <span className="text-[10px] text-blue-900 font-bold block">Soil Moisture</span>
              <strong className="text-base text-blue-950 font-black">{soilMoisture}%</strong>
              <span className="text-[9px] text-blue-700 block mt-0.5">Optimal Range</span>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <Thermometer className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <span className="text-[10px] text-amber-900 font-bold block">Canopy Temp</span>
              <strong className="text-base text-amber-950 font-black">{canopyTemp}°C</strong>
              <span className="text-[9px] text-amber-700 block mt-0.5">Warm Spore Zone</span>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <Radio className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-[10px] text-emerald-900 font-bold block">Leaf Wetness</span>
              <strong className="text-base text-emerald-950 font-black">{leafWetness} hrs</strong>
              <span className="text-[9px] text-red-600 font-bold block mt-0.5">High Infection Risk</span>
            </div>
          </div>
        </div>

        {/* Pest Traps & Economic Threshold Levels (ETL) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">
              Field Pest Traps (ETL Monitoring)
            </h3>
            <span className="text-[10px] text-gray-500 font-medium">Click + / - to test threshold triggers</span>
          </div>

          {traps.map((trap) => {
            const isExceeded = trap.count >= trap.etlLimit;
            const isNear = trap.count >= trap.etlLimit * 0.75 && !isExceeded;

            return (
              <div 
                key={trap.id}
                className={`bg-white rounded-2xl border p-4 shadow-xs space-y-2.5 transition-all ${
                  isExceeded ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{trap.targetCrop}</span>
                    <h4 className="text-sm font-extrabold text-gray-900 leading-tight">{trap.type}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Last checked: {trap.lastInspected}</p>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isExceeded ? 'bg-red-100 text-red-800 border border-red-200' : isNear ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {trap.status}
                  </span>
                </div>

                {/* Count and ETL Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-600">Pest Catch: <strong className="text-gray-900 text-sm">{trap.count}</strong> / {trap.etlLimit} (ETL Limit)</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleUpdateTrapCount(trap.id, -1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-black text-xs flex items-center justify-center"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleUpdateTrapCount(trap.id, 1)}
                        className="w-6 h-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs flex items-center justify-center shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isExceeded ? 'bg-red-500' : isNear ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (trap.count / trap.etlLimit) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Advisory Trigger */}
                {isExceeded && (
                  <div className="p-2.5 bg-red-100/90 text-red-900 border border-red-300 rounded-xl text-xs flex items-start space-x-2 font-medium">
                    <AlertTriangle className="w-4 h-4 text-red-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Automated Action:</strong> Economic Threshold Exceeded! Spray Neem Oil (3 ml/L) or install mass trapping lures within 48h.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
