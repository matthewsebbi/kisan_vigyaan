import React, { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  CloudSun,
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Umbrella,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Layers,
  MapPin,
  ExternalLink,
  Info,
  ShieldCheck,
  ShieldAlert,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeatherClimateGraphWidget = ({
  lat = 19.7515,
  lon = 75.7139,
  locationName = 'Maharashtra Agricultural Zone',
  onClose
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState('7day'); // '7day' | '24hour' | 'rain' | 'advisory'
  const [climateData, setClimateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('Agricultural Environment API');

  // Fetch from Agricultural Environment API (https://github.com/matthewsebbi/agricultural-environment-API)
  // with seamless Open-Meteo fallback
  const fetchClimateData = async () => {
    setIsLoading(true);
    setError(null);

    const AGRI_ENV_URL = import.meta.env.VITE_AGRI_ENV_API_URL || 'http://127.0.0.1:8001';

    // 1. Try Agricultural Environment API service
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(
        `${AGRI_ENV_URL.replace(/\/$/, '')}/v1/climate?lat=${lat}&lon=${lon}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.daily || json.current) {
          setClimateData(json);
          setDataSource('Agri Environment API (v1.1)');
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Agri API local server not active, proceed to direct Open-Meteo provider
    }

    // 2. Direct Open-Meteo provider (Architecture provider used by agricultural-environment-API)
    try {
      const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,uv_index_max,wind_speed_10m_max&timezone=auto&forecast_days=7`;
      
      const res = await fetch(openMeteoUrl);
      if (!res.ok) throw new Error(`Weather service returned ${res.status}`);
      const json = await res.json();
      setClimateData(json);
      setDataSource('Agri Environment API (Open-Meteo Provider)');
    } catch (err) {
      console.warn('Weather fetch error:', err);
      setError('Unable to load real-time meteorological data. Please check connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClimateData();
  }, [lat, lon]);

  // Format 7-Day Chart Data
  const sevenDayChartData = useMemo(() => {
    if (!climateData?.daily?.time) return [];
    return climateData.daily.time.map((dateStr, idx) => {
      const d = new Date(dateStr);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const maxT = Math.round(climateData.daily.temperature_2m_max?.[idx] ?? 30);
      const minT = Math.round(climateData.daily.temperature_2m_min?.[idx] ?? 20);
      const rain = Number((climateData.daily.precipitation_sum?.[idx] ?? 0).toFixed(1));
      const uv = Math.round(climateData.daily.uv_index_max?.[idx] ?? 5);

      return {
        date: dayName,
        fullDate: dateStr,
        dayMax: maxT,
        nightMin: minT,
        avgTemp: Math.round((maxT + minT) / 2),
        rainMm: rain,
        uvIndex: uv
      };
    });
  }, [climateData]);

  // Format 24-Hour Hourly Chart Data
  const hourlyChartData = useMemo(() => {
    if (!climateData?.hourly?.time) return [];
    // Slice next 24 hours
    const times = climateData.hourly.time.slice(0, 24);
    return times.map((tStr, idx) => {
      const hour = new Date(tStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const temp = Math.round(climateData.hourly.temperature_2m?.[idx] ?? 25);
      const rh = Math.round(climateData.hourly.relative_humidity_2m?.[idx] ?? 60);
      const rainProb = Math.round(climateData.hourly.precipitation_probability?.[idx] ?? 0);
      const wind = Math.round(climateData.hourly.wind_speed_10m?.[idx] ?? 5);

      return {
        time: hour,
        temp,
        rh,
        rainProb,
        wind
      };
    });
  }, [climateData]);

  // Current conditions
  const current = climateData?.current || {};
  const currentTemp = Math.round(current.temperature_2m ?? 27.5);
  const currentRH = Math.round(current.relative_humidity_2m ?? 65);
  const currentPrecip = (current.precipitation ?? 0).toFixed(1);
  const currentWind = Math.round(current.wind_speed_10m ?? 8);

  // Agronomic disease & spray risk analysis
  const fungalRisk = useMemo(() => {
    if (currentRH > 75 && currentTemp >= 20 && currentTemp <= 29) return 'HIGH';
    if (currentRH > 65 && currentTemp >= 18 && currentTemp <= 32) return 'MODERATE';
    return 'LOW';
  }, [currentTemp, currentRH]);

  const sprayWindow = useMemo(() => {
    if (currentWind < 12 && Number(currentPrecip) === 0) return 'FAVORABLE';
    if (currentWind <= 18 && Number(currentPrecip) < 1.0) return 'CAUTION (MARGINAL)';
    return 'UNFAVORABLE (HIGH DRIFT / RAIN)';
  }, [currentWind, currentPrecip]);

  return (
    <div
      className={`mt-4 rounded-3xl border shadow-lg transition-all duration-300 overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* 1. WIDGET TOP HEADER */}
      <div
        className={`px-4 py-3.5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#006C48] text-white flex items-center justify-center shadow-md shrink-0">
            <CloudSun className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Agro-Climatic Weather Station & Forecast</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#006C48] dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 font-mono">
                {dataSource}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#006C48] dark:text-emerald-400" />
              <span>{locationName}</span>
              <span className="font-mono text-[10px] opacity-80">({lat.toFixed(4)}°N, {lon.toFixed(4)}°E)</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Close */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={fetchClimateData}
            disabled={isLoading}
            className="p-1.5 rounded-xl border border-[#D5CEBC] dark:border-[#2E3C32] hover:bg-[#EFE9DA] dark:hover:bg-[#25332A] text-[#1D3D2C] dark:text-emerald-300 cursor-pointer transition-all active:scale-95"
            title="Refresh Meteorological Forecast"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-[#D5CEBC] dark:border-[#2E3C32] hover:bg-[#EFE9DA] dark:hover:bg-[#25332A] text-[#7A7569] hover:text-[#9F4D35] cursor-pointer transition-all active:scale-95"
              title="Hide Climate Widget"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. REAL-TIME TELEMETRY METRIC STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 border-b border-slate-100 dark:border-slate-800">
        {/* Temp */}
        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Temperature</span>
            <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-mono">
              {currentTemp}°C
            </span>
          </div>
        </div>

        {/* Humidity */}
        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Rel. Humidity</span>
            <span className="text-sm sm:text-base font-extrabold text-cyan-700 dark:text-cyan-400 font-mono">
              {currentRH}%
            </span>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Wind Velocity</span>
            <span className="text-sm sm:text-base font-extrabold text-[#006C48] dark:text-emerald-400 font-mono">
              {currentWind} km/h
            </span>
          </div>
        </div>

        {/* Rain / Leaf Wetness */}
        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Rainfall (24h)</span>
            <span className="text-sm sm:text-base font-extrabold text-blue-700 dark:text-blue-400 font-mono">
              {currentPrecip} mm
            </span>
          </div>
        </div>
      </div>

      {/* 3. TABS SELECTOR */}
      <div className="px-4 pt-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center p-1 rounded-2xl bg-[#EBE5D6] dark:bg-[#1C261F] border border-[#D5CEBC] dark:border-[#2E3C32] text-xs">
          <button
            onClick={() => setActiveTab('7day')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === '7day'
                ? 'bg-[#1D3D2C] text-white shadow-xs font-extrabold'
                : 'text-[#4F4B41] dark:text-[#C5C2B8] hover:text-[#1D3D2C] dark:hover:text-white'
            }`}
          >
            📈 7-Day Temp Trend
          </button>
          <button
            onClick={() => setActiveTab('24hour')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === '24hour'
                ? 'bg-[#1D3D2C] text-white shadow-xs font-extrabold'
                : 'text-[#4F4B41] dark:text-[#C5C2B8] hover:text-[#1D3D2C] dark:hover:text-white'
            }`}
          >
            ⏱️ 24h Hourly Cycle
          </button>
          <button
            onClick={() => setActiveTab('rain')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'rain'
                ? 'bg-[#1D3D2C] text-white shadow-xs font-extrabold'
                : 'text-[#4F4B41] dark:text-[#C5C2B8] hover:text-[#1D3D2C] dark:hover:text-white'
            }`}
          >
            🌧️ Rain Forecast (mm)
          </button>
          <button
            onClick={() => setActiveTab('advisory')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'advisory'
                ? 'bg-[#1D3D2C] text-white shadow-xs font-extrabold'
                : 'text-[#4F4B41] dark:text-[#C5C2B8] hover:text-[#1D3D2C] dark:hover:text-white'
            }`}
          >
            🌾 Agro-Advisory
          </button>
        </div>

        {/* Micro Summary Badge */}
        <div className="text-[11px] text-[#635E52] dark:text-slate-400 font-mono hidden md:flex items-center gap-2">
          <span>Fungal Pathogen Risk:</span>
          <span
            className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
              fungalRisk === 'HIGH'
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                : fungalRisk === 'MODERATE'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
            }`}
          >
            {fungalRisk}
          </span>
        </div>
      </div>

      {/* 4. MAIN GRAPH CONTENT AREA */}
      <div className="p-4">
        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-[#1D3D2C] dark:text-emerald-400 animate-spin" />
            <p className="text-xs text-[#635E52] dark:text-slate-400 font-mono">
              Connecting to Agricultural Environment API...
            </p>
          </div>
        ) : error ? (
          <div className="h-48 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <p className="text-xs text-[#635E52] dark:text-slate-300 max-w-md">{error}</p>
            <button
              onClick={fetchClimateData}
              className="mt-2 px-3 py-1.5 rounded-xl bg-[#1D3D2C] text-white text-xs font-bold cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            {/* VIEW 1: 7-DAY TEMPERATURE TREND */}
            {activeTab === '7day' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-bold text-[#1D3D2C] dark:text-[#A7D8B4]">
                    Weekly High & Low Temperature Range (°C)
                  </span>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Max Day
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Min Night
                    </span>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sevenDayChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="dayGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="nightGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#26382C' : '#E5DFCF'} />
                      <XAxis
                        dataKey="date"
                        stroke={isDark ? '#8E9C91' : '#6B6557'}
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis
                        unit="°"
                        stroke={isDark ? '#8E9C91' : '#6B6557'}
                        fontSize={11}
                        domain={['dataMin - 3', 'dataMax + 3']}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div
                                className={`p-2.5 rounded-xl border text-xs shadow-lg font-mono ${
                                  isDark ? 'bg-[#151D18] border-[#2E3C32] text-white' : 'bg-white border-[#DDD6C5] text-[#1F2E22]'
                                }`}
                              >
                                <p className="font-bold mb-1">{data.fullDate} ({data.date})</p>
                                <p className="text-amber-500">Day High: {data.dayMax}°C</p>
                                <p className="text-emerald-500">Night Low: {data.nightMin}°C</p>
                                <p className="text-cyan-500">Rainfall: {data.rainMm} mm</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="dayMax"
                        stroke="#F59E0B"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#dayGrad)"
                        name="Day High"
                      />
                      <Area
                        type="monotone"
                        dataKey="nightMin"
                        stroke="#10B981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#nightGrad)"
                        name="Night Low"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* VIEW 2: 24-HOUR HOURLY CYCLE */}
            {activeTab === '24hour' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-bold text-[#1D3D2C] dark:text-[#A7D8B4]">
                    24-Hour Temperature & Relative Humidity Cycle
                  </span>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Temp (°C)
                    </span>
                    <span className="flex items-center gap-1 text-cyan-500 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Humidity (%)
                    </span>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#26382C' : '#E5DFCF'} />
                      <XAxis
                        dataKey="time"
                        stroke={isDark ? '#8E9C91' : '#6B6557'}
                        fontSize={10}
                        interval={3}
                        tickLine={false}
                      />
                      <YAxis
                        yAxisId="left"
                        stroke={isDark ? '#8E9C91' : '#6B6557'}
                        fontSize={11}
                        domain={[15, 42]}
                        unit="°"
                        tickLine={false}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke={isDark ? '#8E9C91' : '#6B6557'}
                        fontSize={11}
                        domain={[20, 100]}
                        unit="%"
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div
                                className={`p-2.5 rounded-xl border text-xs shadow-lg font-mono ${
                                  isDark ? 'bg-[#151D18] border-[#2E3C32] text-white' : 'bg-white border-[#DDD6C5] text-[#1F2E22]'
                                }`}
                              >
                                <p className="font-bold mb-1">Time: {data.time}</p>
                                <p className="text-amber-500">Temperature: {data.temp}°C</p>
                                <p className="text-cyan-500">Rel. Humidity: {data.rh}%</p>
                                <p className="text-emerald-500">Wind: {data.wind} km/h</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="temp"
                        stroke="#F59E0B"
                        strokeWidth={2.5}
                        dot={false}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="rh"
                        stroke="#06B6D4"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="4 4"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* VIEW 3: PRECIPITATION & RAINFALL (mm) */}
            {activeTab === 'rain' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-bold text-[#1D3D2C] dark:text-[#A7D8B4]">
                    7-Day Projected Precipitation (mm)
                  </span>
                  <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                    Total: {sevenDayChartData.reduce((acc, curr) => acc + curr.rainMm, 0).toFixed(1)} mm
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sevenDayChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#26382C' : '#E5DFCF'} />
                      <XAxis
                        dataKey="date"
                        stroke={isDark ? '#8E9C91' : '#6B6557'}
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis
                        unit="mm"
                        stroke={isDark ? '#8E9C91' : '#6B6557'}
                        fontSize={11}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div
                                className={`p-2.5 rounded-xl border text-xs shadow-lg font-mono ${
                                  isDark ? 'bg-[#151D18] border-[#2E3C32] text-white' : 'bg-white border-[#DDD6C5] text-[#1F2E22]'
                                }`}
                              >
                                <p className="font-bold mb-1">{data.fullDate} ({data.date})</p>
                                <p className="text-cyan-500 font-bold">Precipitation: {data.rainMm} mm</p>
                                <p className="text-slate-400 text-[10px]">
                                  {data.rainMm > 5 ? 'Significant rain expected.' : 'Light / no rain.'}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="rainMm" fill="#0284C7" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* VIEW 4: AGRO-ADVISORY & SPRAY WINDOW */}
            {activeTab === 'advisory' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-1">
                {/* 1. Fungal Spore Germination Risk Card */}
                <div
                  className={`p-3.5 rounded-2xl border ${
                    fungalRisk === 'HIGH'
                      ? 'bg-rose-50/80 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                      : fungalRisk === 'MODERATE'
                      ? 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                      : 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs flex items-center gap-1.5 text-[#1F2E22] dark:text-white">
                      <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Fungal Pathology Forecast</span>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        fungalRisk === 'HIGH'
                          ? 'bg-rose-500 text-white'
                          : fungalRisk === 'MODERATE'
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {fungalRisk} RISK
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#554E41] dark:text-slate-300">
                    {fungalRisk === 'HIGH'
                      ? 'High humidity (>75%) coupled with 20-28°C canopy temperature creates optimal incubation for Rust urediniospores and Blast fungal conidia. Monitor lower leaves closely.'
                      : fungalRisk === 'MODERATE'
                      ? 'Moderate leaf moisture detected. Preventive bio-fungicide (Trichoderma viride or Pseudomonas fluorescens) recommended before rain events.'
                      : 'Atmospheric conditions are dry and warm. Fungal infection window is currently closed. Standard crop maintenance applies.'}
                  </p>
                </div>

                {/* 2. Spray Drift Window Card */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs flex items-center gap-1.5 text-slate-800 dark:text-white">
                      <Wind className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>Foliar Spray & Drift Window</span>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        sprayWindow.includes('FAVORABLE')
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {sprayWindow}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#554E41] dark:text-slate-300">
                    Wind is currently <strong>{currentWind} km/h</strong> with <strong>{currentPrecip} mm</strong> rain.
                    {currentWind < 12 && Number(currentPrecip) === 0
                      ? ' Optimal weather for spray operations: low chemical drift, maximum droplet adhesion on foliar cuticle.'
                      : ' Exercise caution: higher wind speed increases off-target drift to adjacent plots.'}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherClimateGraphWidget;
