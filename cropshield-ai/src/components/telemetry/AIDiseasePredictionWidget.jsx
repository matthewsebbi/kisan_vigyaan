import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  SUPPORTED_CROPS, 
  predictPlotDiseases 
} from '../../services/AIDiseasePredictionService';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Droplets, 
  Thermometer, 
  Sprout, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Info, 
  RefreshCw, 
  Pill, 
  Activity, 
  Beaker, 
  Clock, 
  Layers
} from 'lucide-react';

export const AIDiseasePredictionWidget = ({
  activeLand,
  mapCenter,
  telemetry = {},
  onUpdateLandCrop
}) => {
  const { lang, theme } = useApp();
  const isDark = theme === 'dark';

  // 1. Resolve Initial Inputs
  const initialCrop = useMemo(() => {
    if (activeLand?.crop) {
      const lower = activeLand.crop.toLowerCase();
      const match = SUPPORTED_CROPS.find(c => lower.includes(c.id) || lower.includes(c.name.toLowerCase()));
      if (match) return match.id;
    }
    return 'cotton';
  }, [activeLand]);

  const [selectedCropId, setSelectedCropId] = useState(initialCrop);
  const [predictionDate, setPredictionDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');
  const [activeTabByDisease, setActiveTabByDisease] = useState({}); // diseaseId -> 'precautions' | 'cure'
  const [expandedDiseases, setExpandedDiseases] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync selected crop when activeLand changes
  useEffect(() => {
    if (activeLand?.crop) {
      const lower = activeLand.crop.toLowerCase();
      const match = SUPPORTED_CROPS.find(c => lower.includes(c.id) || lower.includes(c.name.toLowerCase()));
      if (match && match.id !== selectedCropId) {
        setSelectedCropId(match.id);
      }
    }
  }, [activeLand?.id, activeLand?.crop]);

  // Coordinates from activeLand or mapCenter
  const lat = activeLand?.centroid?.[0] || mapCenter?.[0] || 16.8524;
  const lng = activeLand?.centroid?.[1] || mapCenter?.[1] || 74.5815;

  // Run prediction engine whenever crop, date, coordinates, or telemetry change
  const runPrediction = async (cropToPredict = selectedCropId, dateToPredict = predictionDate) => {
    setIsAnalyzing(true);
    try {
      const result = await predictPlotDiseases({
        cropId: cropToPredict,
        date: dateToPredict,
        lat,
        lng,
        telemetry,
        lang
      });
      setPredictionResult(result);
      
      // Auto expand top 2 diseases
      if (result.diseases && result.diseases.length > 0) {
        const initialExpand = {};
        const initialTabs = {};
        result.diseases.forEach((d, idx) => {
          initialExpand[d.id] = idx < 2; // Expand top 2 by default
          initialTabs[d.id] = 'cure'; // Default to cure view
        });
        setExpandedDiseases(initialExpand);
        setActiveTabByDisease(initialTabs);
      }
    } catch (err) {
      console.error('Failed to run AI disease prediction:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run prediction on mount and when key inputs change
  useEffect(() => {
    runPrediction(selectedCropId, predictionDate);
  }, [selectedCropId, predictionDate, activeLand?.id, lat, lng, lang]);

  // Handle Crop Change from Dropdown
  const handleCropChange = (e) => {
    const newCropId = e.target.value;
    setSelectedCropId(newCropId);
    const cropObj = SUPPORTED_CROPS.find(c => c.id === newCropId);
    if (cropObj && onUpdateLandCrop && activeLand) {
      onUpdateLandCrop(activeLand.id, cropObj.name);
    }
  };

  // Toggle disease card expansion
  const toggleExpand = (diseaseId) => {
    setExpandedDiseases(prev => ({
      ...prev,
      [diseaseId]: !prev[diseaseId]
    }));
  };

  // Switch tabs between Precaution and Cure for a specific disease
  const setDiseaseTab = (diseaseId, tabName) => {
    setActiveTabByDisease(prev => ({
      ...prev,
      [diseaseId]: tabName
    }));
  };

  // Voice TTS for Advisory
  const handleSpeakAdvisory = () => {
    if (!('speechSynthesis' in window)) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const narrative = predictionResult?.summaryNarrative || '';
    if (!narrative) return;

    const utterance = new SpeechSynthesisUtterance(narrative);
    utterance.lang = lang === 'mr' ? 'mr-IN' : lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech if unmounted
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Filtered diseases based on risk level
  const displayedDiseases = useMemo(() => {
    if (!predictionResult?.diseases) return [];
    if (selectedRiskFilter === 'ALL') return predictionResult.diseases;
    return predictionResult.diseases.filter(d => d.riskLevel === selectedRiskFilter);
  }, [predictionResult, selectedRiskFilter]);

  // Selected crop object
  const currentCropObj = SUPPORTED_CROPS.find(c => c.id === selectedCropId) || SUPPORTED_CROPS[0];

  return (
    <div className={`mt-4 rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
      isDark 
        ? 'bg-slate-900 border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* 1. HEADER & INTERACTIVE SELECTION BAR */}
      <div className={`p-4 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/80 border-slate-200'
      }`}>
        
        {/* Title & Plot Coordinates Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#006C48] dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>AI Crop Disease Prediction & Treatment Engine</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-[#006C48] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-mono">
                Plot Forecaster
              </span>
            </div>
            
            {/* Active Land & Lat/Long Chip */}
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400 flex-wrap font-mono">
              <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                <Sprout className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{activeLand?.name || 'Farmland Plot'}</span>
                {activeLand?.area?.acres && <span className="text-emerald-600 dark:text-emerald-400">({activeLand.area.acres} Ac)</span>}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>{lat.toFixed(4)}°N, {lng.toFixed(4)}°E</span>
              </span>
              <span>•</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {predictionResult?.queryContext?.agroZone || 'Deccan Basin'}
              </span>
            </div>
          </div>
        </div>

        {/* INPUT CONTROLS: Crop Selector Dropdown + Date Picker + Analyze Button */}
        <div className="flex items-center flex-wrap gap-2.5">
          
          {/* Crop Dropdown */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <span className="text-xs">{currentCropObj.icon}</span>
            <label htmlFor="crop-select" className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
              Crop:
            </label>
            <select
              id="crop-select"
              value={selectedCropId}
              onChange={handleCropChange}
              className="text-xs font-bold bg-transparent text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
            >
              {SUPPORTED_CROPS.map(crop => (
                <option key={crop.id} value={crop.id} className="text-slate-900 dark:bg-slate-800 dark:text-white">
                  {crop.name} {lang === 'mr' ? `(${crop.nameMr})` : lang === 'ta' ? `(${crop.nameTa})` : lang === 'hi' ? `(${crop.nameHi})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <label htmlFor="date-select" className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
              Date:
            </label>
            <input
              id="date-select"
              type="date"
              value={predictionDate}
              onChange={(e) => setPredictionDate(e.target.value)}
              className="text-xs font-bold font-mono bg-transparent text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
            />
          </div>

          {/* Quick Date Shortcuts */}
          <button
            onClick={() => setPredictionDate(new Date().toISOString().split('T')[0])}
            className="px-2 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#006C48] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
            title="Set date to Today"
          >
            Today
          </button>

          {/* Re-analyze Action Button */}
          <button
            onClick={() => runPrediction()}
            disabled={isAnalyzing}
            className="px-3 py-1.5 rounded-xl font-bold bg-[#006C48] hover:bg-[#005538] text-white shadow-2xs flex items-center gap-1.5 cursor-pointer border border-[#005538] text-xs transition-all active:scale-95 disabled:opacity-50"
            title="Re-run AI disease risk assessment"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing...' : 'Predict'}</span>
          </button>

        </div>

      </div>

      {/* 2. SUMMARY INSIGHTS BAR */}
      {predictionResult && (
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 space-y-3">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Metric 1: Top Vulnerability */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Top Disease Threat
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate block">
                  {predictionResult.highestRiskDisease}
                </span>
                <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                  {predictionResult.highestRiskScore}% Outbreak Probability
                </span>
              </div>
            </div>

            {/* Metric 2: Season & Microclimate Norm */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Season & Microclimate
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate block">
                  {predictionResult.queryContext.season}
                </span>
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-300">
                  Temp: {predictionResult.queryContext.telemetry.temp}°C • RH: {predictionResult.queryContext.telemetry.rh}%
                </span>
              </div>
            </div>

            {/* Metric 3: Total Diseases Monitored */}
            <div className={`p-3 rounded-xl border flex items-center gap-3 ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-[#006C48] dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Pathology Dossiers
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block">
                  {predictionResult.totalDiseasesEvaluated} Identified for {predictionResult.queryContext.cropName}
                </span>
                <span className="text-[10px] font-mono text-[#006C48] dark:text-emerald-400 font-bold">
                  Includes Precaution & 15L Dosage
                </span>
              </div>
            </div>

          </div>

          {/* Agronomist Synthesis Box with Voice TTS */}
          {predictionResult.summaryNarrative && (
            <div className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
              isDark 
                ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200' 
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
            }`}>
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {predictionResult.summaryNarrative}
                </p>
              </div>
              <button
                onClick={handleSpeakAdvisory}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[#006C48] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold text-[11px] shadow-2xs hover:bg-emerald-50 transition-all cursor-pointer"
                title="Listen to advisory via TTS"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                    <span>Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      )}

      {/* 3. RISK FILTER TABS */}
      <div className="px-4 pt-3 flex items-center justify-between gap-2 flex-wrap border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
            Filter Threats:
          </span>
          {['ALL', 'VERY_HIGH', 'HIGH', 'MODERATE', 'LOW'].map(risk => (
            <button
              key={risk}
              onClick={() => setSelectedRiskFilter(risk)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                selectedRiskFilter === risk
                  ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-900 shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {risk === 'ALL' ? 'All Threats' : risk.replace('_', ' ')}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Showing {displayedDiseases.length} disease{displayedDiseases.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* 4. DISEASE DOSSIERS LIST */}
      <div className="p-4 space-y-4">
        {displayedDiseases.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            No diseases match the "{selectedRiskFilter}" filter for this crop.
          </div>
        ) : (
          displayedDiseases.map((disease) => {
            const isExpanded = Boolean(expandedDiseases[disease.id]);
            const activeTab = activeTabByDisease[disease.id] || 'cure';

            return (
              <div 
                key={disease.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isDark ? 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600' : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                
                {/* CARD HEADER: Clickable to expand/collapse */}
                <div 
                  onClick={() => toggleExpand(disease.id)}
                  className="p-3.5 sm:p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                >
                  
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                      disease.riskLevel === 'VERY_HIGH'
                        ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-900'
                        : disease.riskLevel === 'HIGH'
                        ? 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/60 dark:text-orange-400 dark:border-orange-900'
                        : 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-900'
                    }`}>
                      <AlertTriangle className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                          {disease.localizedTitle}
                        </h4>
                        {disease.name !== disease.localizedTitle && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                            ({disease.name})
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono flex-wrap">
                        <span className="italic font-sans text-slate-600 dark:text-slate-300">
                          {disease.pathogen}
                        </span>
                        <span>•</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                          {disease.pathogenType}
                        </span>
                        <span>•</span>
                        <span>Favorable: {disease.favorableTempStr}</span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Badge & Expand Icon */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    
                    {/* Probability Progress Bar */}
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">Risk</span>
                        <span className="text-xs font-mono font-black text-slate-900 dark:text-white">
                          {disease.riskScore}%
                        </span>
                      </div>
                      <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-0.5">
                        <div 
                          className={`h-full rounded-full ${
                            disease.riskLevel === 'VERY_HIGH' ? 'bg-rose-500' : disease.riskLevel === 'HIGH' ? 'bg-orange-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${disease.riskScore}%` }}
                        />
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold font-mono border ${disease.badgeBg}`}>
                      {disease.riskLabel}
                    </span>

                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                  </div>

                </div>

                {/* EXPANDABLE BODY: Symptoms + Precaution / Cure Tabs */}
                {isExpanded && (
                  <div className={`p-4 border-t transition-colors ${
                    isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-white border-slate-200'
                  }`}>
                    
                    {/* Symptoms description */}
                    <div className="mb-3.5 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300 mr-1.5">
                        🔍 Field Diagnostic Symptoms:
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {disease.symptoms}
                      </span>
                    </div>

                    {/* Precaution vs Cure Tab Switcher */}
                    <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 mb-3">
                      <button
                        onClick={() => setDiseaseTab(disease.id, 'cure')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeTab === 'cure'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Pill className="w-3.5 h-3.5" />
                        <span>💊 Cure & Chemical Dosages</span>
                      </button>

                      <button
                        onClick={() => setDiseaseTab(disease.id, 'precautions')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeTab === 'precautions'
                            ? 'bg-[#006C48] text-white shadow-2xs'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>🛡️ Precautionary & Preventive Methods</span>
                      </button>
                    </div>

                    {/* TAB 1: CURE & CHEMICAL / BIOLOGICAL DOSAGE */}
                    {activeTab === 'cure' && (
                      <div className="space-y-3 animate-fadeIn text-xs">
                        
                        {/* Primary Recommended Spray Formulation */}
                        <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                              <Beaker className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Primary Prescription Formulation</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white dark:bg-slate-800 text-[#006C48] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
                              {disease.cure.waitingPeriod}
                            </span>
                          </div>

                          <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                            {disease.cure.chemicalName}
                          </div>

                          <div className="text-[11px] text-slate-600 dark:text-slate-300">
                            <strong>Trade / Commercial Brands:</strong> {disease.cure.commercialBrands}
                          </div>

                          {/* EXACT 15L PUMP DOSAGE HIGHLIGHT BOX (CRUCIAL FOR FARMERS) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700">
                              <span className="text-[10px] font-bold uppercase text-slate-500 font-mono block">
                                Backpack Sprayer (15L Pump)
                              </span>
                              <span className="text-sm font-black font-mono text-[#006C48] dark:text-emerald-400 mt-0.5 block">
                                {disease.cure.dosagePer15LPump}
                              </span>
                            </div>

                            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                              <span className="text-[10px] font-bold uppercase text-slate-500 font-mono block">
                                Per Liter Concentration
                              </span>
                              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                                {disease.cure.dosagePerLiter}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-600 dark:text-slate-300 italic pt-1">
                            <strong>Application Note:</strong> {disease.cure.applicationMethod} ({disease.cure.treatmentSchedule})
                          </p>
                        </div>

                        {/* Alternative Cure */}
                        {disease.alternativeCure && (
                          <div className="p-2.5 rounded-lg bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-[11px]">
                            <strong className="text-slate-800 dark:text-slate-200">Alternative Formulation / Rotation:</strong>{' '}
                            <span className="text-slate-600 dark:text-slate-400">{disease.alternativeCure.chemicalName}</span>
                          </div>
                        )}

                      </div>
                    )}

                    {/* TAB 2: PRECAUTIONARY & PREVENTIVE METHODS */}
                    {activeTab === 'precautions' && (
                      <div className="space-y-2.5 animate-fadeIn text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                            Integrated Pest & Disease Management (IPM) Precautionary Protocols:
                          </span>
                          <ul className="space-y-2">
                            {disease.precautions.map((precaution, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                <span>{precaution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default AIDiseasePredictionWidget;
