import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX,
  Check, 
  ChevronRight, 
  AlertTriangle, 
  ShieldAlert, 
  Share2, 
  Sparkles, 
  Info
} from 'lucide-react';
import { speakText, stopSpeech, isSpeaking } from '../../utils/speechUtils';

export const DiagnosisResult = () => {
  const { 
    t, 
    lang, 
    setActiveTab, 
    currentDiagnosis, 
    selectedLeafImage 
  } = useApp();

  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const d = currentDiagnosis;

  // Localized disease name & reasons
  const displayName = lang === 'mr' ? d.marathiName : lang === 'hi' ? d.hindiName : d.name;
  const reasonsList = lang === 'mr' ? d.reasonsMr : lang === 'hi' ? d.reasonsHi : d.reasons;

  // Speech summary text
  const handleListenAdvisory = () => {
    if (isSpeakingAudio) {
      stopSpeech();
      setIsSpeakingAudio(false);
      return;
    }

    let text = `Disease detected: ${d.name}. Scientific name: ${d.scientificName}. Confidence ${d.confidence} percent. Early risk score is ${d.riskScore} percent.`;
    if (lang === 'mr') {
      text = `आढळलेला रोग: ${d.marathiName}. अचूकता ${d.confidence} टक्के. पुढील ७ दिवसांत जास्त धोका असण्याची शक्यता. त्वरित शिफारस केलेले उपाय करा.`;
    } else if (lang === 'hi') {
      text = `पहचाना गया रोग: ${d.hindiName}. सटीकता ${d.confidence} प्रतिशत। उच्च जोखिम पाया गया है। तत्काल उपचार शुरू करें।`;
    } else if (lang === 'ta') {
      text = `கண்டறியப்பட்ட நோய்: ${d.name}. துல்லியம் ${d.confidence} சதவீதம். பரிந்துரைக்கப்பட்ட சிகிச்சை நடவடிக்கைகளை உடனடியாக தொடங்கவும்.`;
    }

    speakText(text, lang, {
      onStart: () => setIsSpeakingAudio(true),
      onEnd: () => setIsSpeakingAudio(false),
      onError: () => setIsSpeakingAudio(false)
    });
  };

  const isHighSeverity = d.severity === 'High';
  const isMediumSeverity = d.severity === 'Medium';

  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      {/* Top Header matching mockup */}
      <div className="px-4 py-3.5 bg-[#165a3c] flex items-center justify-between shadow-md">
        <button 
          onClick={() => setActiveTab('scan')}
          className="p-1.5 -ml-1 text-white hover:bg-emerald-800/60 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold tracking-tight text-white">{t('diagnosis')}</h1>

        <button
          onClick={handleListenAdvisory}
          className={`p-2 rounded-full transition-all flex items-center gap-1.5 text-xs cursor-pointer shadow-sm ${
            isSpeakingAudio
              ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
              : 'bg-emerald-700/80 hover:bg-emerald-600 text-white'
          }`}
          title={isSpeakingAudio ? "Stop reading" : "Listen in your language"}
        >
          {isSpeakingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="hidden sm:inline font-bold text-[11px]">
            {isSpeakingAudio ? (lang === 'mr' ? 'थांबवा' : lang === 'ta' ? 'நிறுத்து' : 'Stop') : (lang === 'mr' ? 'ऐका' : lang === 'ta' ? 'கேட்க' : 'Listen')}
          </span>
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Diagnosis Main Card matching Screen 3 Mockup */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start space-x-3.5">
            {/* Scanned Leaf Thumbnail */}
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0 bg-black">
              <img 
                src={selectedLeafImage || d.image} 
                alt="Diagnosis Leaf" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Disease Info & Confidence */}
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                {t('diseaseDetected')}
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight truncate">
                {displayName}
              </h2>
              <p className="text-xs text-gray-500 italic font-medium mt-0.5">
                ({d.scientificName})
              </p>

              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs text-gray-500 font-medium">{t('confidence')}</span>
                <span className="text-base font-extrabold text-[#165a3c]">
                  {d.confidence}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 space-y-3">
            {/* Severity Progress Bar */}
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-600">{t('severity')}</span>
              <span className={`font-bold ${
                isHighSeverity ? 'text-red-600' : isMediumSeverity ? 'text-amber-600' : 'text-emerald-700'
              }`}>
                {d.severity}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${
                  isHighSeverity ? 'bg-red-500' : isMediumSeverity ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${d.severityLevel}%` }}
              ></div>
            </div>

            {/* Affected Area */}
            <div className="flex items-center justify-between text-xs font-semibold pt-1">
              <span className="text-gray-600">{t('affectedArea')}</span>
              <span className="text-gray-900 font-bold">{d.affectedArea}</span>
            </div>
          </div>
        </div>

        {/* Early Risk Score Card (Circular Radial Gauge matching mockup) */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1 max-w-[65%]">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                {t('earlyRiskScore')}
              </span>
              <h3 className={`text-base font-extrabold ${
                d.riskScore > 60 ? 'text-red-600' : 'text-amber-600'
              }`}>
                {d.riskLevel}
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-tight">
                {t('outbreakWarning')}
              </p>
            </div>

            {/* Radial Percentage Ring */}
            <div className="relative flex items-center justify-center">
              <svg width="84" height="84" className="transform -rotate-90">
                <circle
                  cx="42"
                  cy="42"
                  r="34"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="42"
                  cy="42"
                  r="34"
                  stroke={d.riskScore > 60 ? '#ef4444' : '#f59e0b'}
                  strokeWidth="8"
                  strokeDasharray={`${(d.riskScore / 100) * 213.6} 213.6`}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-black text-gray-900">{d.riskScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* "Why High Risk?" Checklist matching mockup */}
        <div className="bg-slate-50 border border-gray-200/90 rounded-2xl p-4 shadow-sm space-y-2.5">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-700" />
            {t('whyHighRisk')}
          </h4>

          <div className="space-y-2 pt-1">
            {reasonsList.map((reason, idx) => (
              <div key={idx} className="flex items-center space-x-2.5 text-xs text-gray-700 font-medium">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Big Action Button -> Recommended Actions */}
        <button
          onClick={() => setActiveTab('actions')}
          className="w-full py-4 px-6 bg-[#165a3c] hover:bg-[#124930] active:scale-[0.98] text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center justify-center space-x-2 transition-all duration-200 mt-2"
        >
          <span>{t('recActions')}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
