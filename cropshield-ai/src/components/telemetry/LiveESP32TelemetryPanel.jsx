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
      />

      {/* 3. LIVE HARDWARE SENSOR PANELS */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#1D3D2C] dark:text-[#A7D8B4] font-mono flex items-center gap-2">
            <Radio className="w-4 h-4 animate-pulse text-[#1D3D2C] dark:text-[#4ADE80]" />
            <span>Live Hardware Sensor Telemetry</span>
          </h2>
          <span className="text-[10px] text-[#7A7569] dark:text-[#8E8B81] font-mono">Updated: {telemetry.lastUpdated}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Panel 1: DHT22 Environment Data */}
          <div className={`p-5 rounded-3xl border shadow-vintage transition-all hover:shadow-vintage-md ${
            isDark ? 'bg-[#151D18] border-[#293A2E] text-[#F3F5F1]' : 'bg-[#FAF8F2] border-[#D8D1BE] text-[#1F2E22]'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-[#E5DFCF] dark:border-[#293A2E]">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E8F0F2] dark:bg-[#1B292D] text-[#1E4D56] dark:text-[#67E8F9] flex items-center justify-center font-black border border-[#CCDCE0] dark:border-[#2C4148]">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1F2E22] dark:text-[#F3F5F1]">Environment Climate (DHT22)</h3>
                  <span className="text-[10px] text-[#7A7569] dark:text-[#8E8B81] font-mono">GPIO Pin 4</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F0F2] text-[#1E4D56] dark:bg-[#1B292D] dark:text-[#67E8F9] font-mono border border-[#CCDCE0] dark:border-[#2C4148]">
                Live Stream
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-[#F4EFE6] dark:bg-[#1B241E] border border-[#E2DAC8] dark:border-[#2A392F]">
                <span className="text-[10px] font-bold uppercase text-[#7A7569] dark:text-[#8E8B81] font-mono block">Environment Temp</span>
                <span className="text-xl font-bold font-serif-vintage text-[#1D3D2C] dark:text-[#E8F0EA] mt-1 block">
                  {environmentTemperature.toFixed(2)} °C
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F4EFE6] dark:bg-[#1B241E] border border-[#E2DAC8] dark:border-[#2A392F]">
                <span className="text-[10px] font-bold uppercase text-[#7A7569] dark:text-[#8E8B81] font-mono block">Environment Humidity</span>
                <span className="text-xl font-bold font-serif-vintage text-[#1E4D56] dark:text-[#67E8F9] mt-1 block">
                  {environmentHumidity.toFixed(2)} %
                </span>
              </div>
            </div>
          </div>

          {/* Panel 2: DS18B20 & Soil Moisture Sensor Data */}
          <div className={`p-5 rounded-3xl border shadow-vintage transition-all hover:shadow-vintage-md ${
            isDark ? 'bg-[#151D18] border-[#293A2E] text-[#F3F5F1]' : 'bg-[#FAF8F2] border-[#D8D1BE] text-[#1F2E22]'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-[#E5DFCF] dark:border-[#293A2E]">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F7EFE1] dark:bg-[#2D2418] text-[#8A5A18] dark:text-[#FCD34D] flex items-center justify-center font-black border border-[#E8D9C0] dark:border-[#453724]">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1F2E22] dark:text-[#F3F5F1]">Soil & Irrigation Data</h3>
                  <span className="text-[10px] text-[#7A7569] dark:text-[#8E8B81] font-mono">DS18B20 (Pin 5) & Moisture (Pin 34)</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border bg-[#E8F0EA] text-[#1D3D2C] border-[#C6D8CA] dark:bg-[#1E2E23] dark:text-[#A7D8B4] dark:border-[#2E4836]">
                NORMAL
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-[#F4EFE6] dark:bg-[#1B241E] border border-[#E2DAC8] dark:border-[#2A392F]">
                <span className="text-[10px] font-bold uppercase text-[#7A7569] dark:text-[#8E8B81] font-mono block">Soil Temperature</span>
                <span className="text-lg font-bold font-serif-vintage text-[#1F2E22] dark:text-[#F3F5F1] mt-1 block">
                  {soilTemperature.toFixed(2)} °C
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F4EFE6] dark:bg-[#1B241E] border border-[#E2DAC8] dark:border-[#2A392F]">
                <span className="text-[10px] font-bold uppercase text-[#7A7569] dark:text-[#8E8B81] font-mono block">Soil Moisture %</span>
                <span className="text-lg font-bold font-serif-vintage text-[#1D3D2C] dark:text-[#86EFAC] mt-1 block">
                  38 %
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F4EFE6] dark:bg-[#1B241E] border border-[#E2DAC8] dark:border-[#2A392F]">
                <span className="text-[10px] font-bold uppercase text-[#7A7569] dark:text-[#8E8B81] font-mono block">Moisture Raw ADC</span>
                <span className="text-sm font-bold font-mono text-[#1F2E22] dark:text-[#F3F5F1] mt-1 block">
                  2580
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F4EFE6] dark:bg-[#1B241E] border border-[#E2DAC8] dark:border-[#2A392F]">
                <span className="text-[10px] font-bold uppercase text-[#7A7569] dark:text-[#8E8B81] font-mono block">Irrigation Required</span>
                <span className="text-sm font-bold text-[#1D3D2C] dark:text-[#86EFAC] mt-1 block">
                  NO (Sufficient)
                </span>
              </div>
            </div>
          </div>

          {/* Panel 3: pH Sensor Data (Stable 6.70 pH) */}
          <div className={`p-5 rounded-3xl border shadow-vintage transition-all hover:shadow-vintage-md ${
            isDark ? 'bg-[#151D18] border-[#293A2E] text-[#F3F5F1]' : 'bg-[#FAF8F2] border-[#D8D1BE] text-[#1F2E22]'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-[#E5DFCF] dark:border-[#293A2E]">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F0EBF5] dark:bg-[#271E2D] text-[#552A6E] dark:text-[#D8B4FE] flex items-center justify-center font-black border border-[#D9CEE2] dark:border-[#40304C]">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1F2E22] dark:text-[#F3F5F1]">Soil pH Sensor</h3>
                  <span className="text-[10px] text-[#7A7569] dark:text-[#8E8B81] font-mono">Analog Pin 35 (ADC_11db)</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F0EA] text-[#1D3D2C] dark:bg-[#1E2E23] dark:text-[#A7D8B4] font-mono border border-[#C6D8CA] dark:border-[#2E4836]">
                NORMAL (6.70)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-3">
              <div className="p-3 rounded-2xl bg-[#F4EFE6] dark:bg-[#1B241E] border border-[#E2DAC8] dark:border-[#2A392F]">
                <span className="text-[9px] font-bold uppercase text-[#7A7569] dark:text-[#8E8B81] font-mono block">pH Raw ADC</span>
                <span className="text-sm font-bold font-mono text-[#1F2E22] dark:text-[#F3F5F1] mt-1 block">
                  2568
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F4EFE6] dark:bg-[#1B241E] border border-[#E2DAC8] dark:border-[#2A392F]">
                <span className="text-[9px] font-bold uppercase text-[#7A7569] dark:text-[#8E8B81] font-mono block">Voltage</span>
                <span className="text-sm font-bold font-mono text-[#552A6E] dark:text-[#D8B4FE] mt-1 block">
                  2.568 V
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F4EFE6] dark:bg-[#1B241E] border border-[#E2DAC8] dark:border-[#2A392F]">
                <span className="text-[9px] font-bold uppercase text-[#7A7569] dark:text-[#8E8B81] font-mono block">Calculated pH</span>
                <span className="text-sm font-bold font-serif-vintage text-[#1D3D2C] dark:text-[#86EFAC] mt-1 block">
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
