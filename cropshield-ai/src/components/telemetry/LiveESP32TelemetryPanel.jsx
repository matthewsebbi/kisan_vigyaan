import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SoilZone3DGlobe } from './SoilZone3DGlobe';
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Radio
} from 'lucide-react';

export const LiveESP32TelemetryPanel = () => {
  const { lang, t, theme } = useApp();
  const isDark = theme === 'dark';

  // Live telemetry state matching ESP32 firmware loop with stable pH 6.70 & Normal risk
  const [telemetry, setTelemetry] = useState({
    environmentTemperature: 26.4,
    environmentHumidity: 58.0,
    soilTemperature: 24.8,
    soilMoistureRaw: 2580,
    phRaw: 2568, // Yields stable 6.70 pH
    highHumidityMinutes: 0,
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [isLiveConnected, setIsLiveConnected] = useState(true);
  const [selectedDistrictId, setSelectedDistrictId] = useState('sangli');

  // Compute calculated values
  const environmentTemperature = telemetry.environmentTemperature;
  const environmentHumidity = telemetry.environmentHumidity;
  const soilTemperature = telemetry.soilTemperature;

  // 10-Second Telemetry Loop Simulation (#define READ_INTERVAL 10000UL)
  useEffect(() => {
    if (!isLiveConnected) return;

    const interval = setInterval(() => {
      const tempVar = (Math.random() * 0.4 - 0.2);
      const humVar = (Math.random() * 0.6 - 0.3);

      setTelemetry(prev => {
        const nextTemp = Math.round((prev.environmentTemperature + tempVar) * 100) / 100;
        const nextHum = Math.min(65, Math.max(50, Math.round((prev.environmentHumidity + humVar) * 100) / 100));

        const timeStr = new Date().toLocaleTimeString();

        return {
          ...prev,
          environmentTemperature: nextTemp,
          environmentHumidity: nextHum,
          lastUpdated: timeStr
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isLiveConnected]);

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12">
      


      {/* 2. MAHARASHTRA SATELLITE FARMLAND & FIELD LEVEL HERO SECTION */}
      <SoilZone3DGlobe 
        selectedDistrictId={selectedDistrictId}
        onSelectDistrict={setSelectedDistrictId}
        telemetry={{
          temp: environmentTemperature,
          rh: environmentHumidity,
          soilMoisture: 38,
          soilPH: 6.70
        }}
      />

      {/* 3. LIVE HARDWARE SENSOR PANELS */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-400 font-mono flex items-center gap-2">
            <Radio className="w-4 h-4 animate-pulse text-[#006C48] dark:text-emerald-400" />
            <span>Live Hardware Sensor Telemetry</span>
          </h2>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Updated: {telemetry.lastUpdated}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Panel 1: DHT22 Environment Data */}
          <div className={`p-5 rounded-3xl border shadow-sm transition-all hover:shadow-md ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-black border border-cyan-100 dark:border-cyan-800/40">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Environment Climate (DHT22)</h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">GPIO Pin 4</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400 font-mono border border-cyan-100 dark:border-cyan-800/40">
                Live Stream
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono block">Environment Temp</span>
                <span className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1 block">
                  {environmentTemperature.toFixed(2)} °C
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono block">Environment Humidity</span>
                <span className="text-xl font-bold font-mono text-cyan-700 dark:text-cyan-400 mt-1 block">
                  {environmentHumidity.toFixed(2)} %
                </span>
              </div>
            </div>
          </div>

          {/* Panel 2: DS18B20 & Soil Moisture Sensor Data */}
          <div className={`p-5 rounded-3xl border shadow-sm transition-all hover:shadow-md ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black border border-amber-100 dark:border-amber-800/40">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Soil & Irrigation Data</h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">DS18B20 (Pin 5) & Moisture (Pin 34)</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border bg-emerald-50 text-[#006C48] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/40">
                NORMAL
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono block">Soil Temperature</span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 block">
                  {soilTemperature.toFixed(2)} °C
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono block">Soil Moisture %</span>
                <span className="text-lg font-bold font-mono text-[#006C48] dark:text-emerald-400 mt-1 block">
                  38 %
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono block">Moisture Raw ADC</span>
                <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-1 block">
                  2580
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono block">Irrigation Required</span>
                <span className="text-sm font-bold text-[#006C48] dark:text-emerald-400 mt-1 block">
                  NO (Sufficient)
                </span>
              </div>
            </div>
          </div>

          {/* Panel 3: pH Sensor Data (Stable 6.70 pH) */}
          <div className={`p-5 rounded-3xl border shadow-sm transition-all hover:shadow-md ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 flex items-center justify-center font-black border border-purple-100 dark:border-purple-800/40">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Soil pH Sensor</h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Analog Pin 35 (ADC_11db)</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#006C48] dark:bg-emerald-950/60 dark:text-emerald-400 font-mono border border-emerald-200 dark:border-emerald-800/40">
                NORMAL (6.70)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono block">pH Raw ADC</span>
                <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-1 block">
                  2568
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono block">Voltage</span>
                <span className="text-sm font-bold font-mono text-purple-700 dark:text-purple-400 mt-1 block">
                  2.568 V
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono block">Calculated pH</span>
                <span className="text-sm font-bold font-mono text-[#006C48] dark:text-emerald-400 mt-1 block">
                  6.70
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
