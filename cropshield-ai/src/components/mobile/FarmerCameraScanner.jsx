import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { speakText } from '../../utils/speechUtils';
import { 
  Camera, 
  Upload, 
  Volume2, 
  ChevronDown, 
  ChevronUp, 
  ShoppingBag, 
  CheckCircle2, 
  AlertOctagon, 
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react';
import { PathologyLabTestWidget } from '../scanner/PathologyLabTestWidget';

export const FarmerCameraScanner = ({ onNavigate }) => {
  const { lang, t, theme, addToCart } = useApp();
  const isDark = theme === 'dark';

  const [analyzing, setAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  // Sample quick test leaves
  const sampleLeafOptions = [
    {
      id: 'cotton_blight',
      crop: 'Cotton',
      label: 'Cotton (Bacterial Blight)',
      verdictEn: 'Bacterial Blight Detected',
      verdictMr: 'कापसावर जिवाणू करपा रोग आढळला',
      plainAdviceEn: 'Bacterial infection spotted. Spray Streptocycline within 24 hours to protect cotton bolls.',
      plainAdviceMr: 'पानांवर जिवाणू करपा आढळला आहे. बोंडे वाचवण्यासाठी २४ तासांत स्ट्रेप्टोमायसीन फवारणी करावी.',
      medicineName: 'Streptocycline + Copper Oxychloride',
      price: 240,
      confidence: 95.2,
      activeCompound: 'Streptocycline 90% + Tetracycline 10%',
      dosage: '0.5g per Liter of water (7.5g for 15L tank pump)',
      severity: 'High (Critical)'
    },
    {
      id: 'tomato_early_blight',
      crop: 'Tomato',
      label: 'Tomato (Early Blight)',
      verdictEn: 'Early Blight Detected',
      verdictMr: 'टोमॅटोवर अगेती करपा रोग आढळला',
      plainAdviceEn: 'Target spot fungus detected on leaves. Spray Mancozeb fungicide to prevent fruit rotting.',
      plainAdviceMr: 'टोमॅटोच्या पानांवर करपा बुरशी आढळली आहे. मँकोझेब बुरशीनाशक फवारा.',
      medicineName: 'Mancozeb 75% WP',
      price: 320,
      confidence: 93.8,
      activeCompound: 'Mancozeb 75% WP Contact Fungicide',
      dosage: '2.0g per Liter of water (30g for 15L tank pump)',
      severity: 'Moderate (Warning)'
    },
    {
      id: 'rice_healthy',
      crop: 'Rice',
      label: 'Rice (Healthy)',
      verdictEn: 'Healthy Leaf — No Disease',
      verdictMr: 'पीक निरोगी आहे — कोणताही रोग नाही',
      plainAdviceEn: 'Your paddy crop is green and vigorous. Keep up the good work!',
      plainAdviceMr: 'भात पीक जोमदार आणि निरोगी आहे. कोणतीही रासायनिक फवारणी करू नका.',
      medicineName: null,
      price: 0,
      confidence: 98.4,
      activeCompound: 'Optimal Chlorophyll Reflectance',
      dosage: 'None needed',
      severity: 'Optimal'
    }
  ];

  const handleTriggerScan = (option = sampleLeafOptions[0]) => {
    setAnalyzing(true);
    setScanResult(null);

    // Call Python ML Backend or simulated deep model
    setTimeout(() => {
      setAnalyzing(false);
      setScanResult(option);

      // Speak verdict aloud
      const spokenMsg = lang === 'mr' 
        ? `${option.verdictMr}. ${option.plainAdviceMr}` 
        : `${option.verdictEn}. ${option.plainAdviceEn}`;
      speakText(spokenMsg, lang);
    }, 1200);
  };

  const handleBuyMedicine = () => {
    if (scanResult && scanResult.medicineName) {
      addToCart({
        id: `med-${Date.now()}`,
        name: scanResult.medicineName,
        price: scanResult.price,
        quantity: 1,
        unit: 'Pack',
        category: 'Protection'
      });
      onNavigate('market');
    }
  };

  return (
    <div className="min-h-[88vh] pb-24 max-w-lg mx-auto px-3 pt-2">
      {!scanResult ? (
        // 1. FULL-SCREEN CAMERA VIEWFINDER EXPERIENCE
        <div className="space-y-4">
          <div className="relative rounded-[20px] overflow-hidden bg-slate-950 aspect-[4/5] flex flex-col items-center justify-between p-4 border-2 border-slate-700 shadow-2xl">
            {/* Top Viewfinder Banner */}
            <div className="w-full flex items-center justify-between text-white text-xs z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'mr' ? 'एआय पान स्कॅनर' : 'AI Leaf Camera Scanner'}</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-400">EfficientNet-B0 Online</span>
            </div>

            {/* Camera Reticle / Target Box */}
            <div className="relative w-56 h-56 border-2 border-dashed border-emerald-400/80 rounded-[16px] flex flex-col items-center justify-center p-3 text-center">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-400 -mt-1 -ml-1"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-400 -mt-1 -mr-1"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-400 -mb-1 -ml-1"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-400 -mb-1 -mr-1"></div>

              {analyzing ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white font-bold text-xs animate-pulse">
                    {lang === 'mr' ? 'पानाचे विश्लेषण सुरू आहे...' : 'Analyzing leaf with AI...'}
                  </span>
                </div>
              ) : (
                <div className="space-y-1">
                  <Camera className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                  <p className="text-white text-xs font-bold leading-tight">
                    {lang === 'mr' ? 'बाधित पान चौकटीत धरा' : 'Place affected leaf in frame'}
                  </p>
                  <span className="text-[10px] text-slate-400">Clear daylight photo</span>
                </div>
              )}
            </div>

            {/* Bottom Shutter Controls */}
            <div className="w-full flex items-center justify-around z-10">
              <button
                onClick={() => handleTriggerScan(sampleLeafOptions[1])}
                className="text-white text-[11px] font-bold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md"
              >
                Tomato
              </button>

              {/* Big Camera Shutter Trigger (64px) */}
              <button
                onClick={() => handleTriggerScan(sampleLeafOptions[0])}
                disabled={analyzing}
                className="w-16 h-16 rounded-full bg-white border-4 border-emerald-500 shadow-2xl flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                aria-label="Capture Photo"
              >
                <div className="w-12 h-12 rounded-full bg-[#1B5E20] flex items-center justify-center text-white">
                  <Camera className="w-6 h-6" />
                </div>
              </button>

              <button
                onClick={() => handleTriggerScan(sampleLeafOptions[2])}
                className="text-white text-[11px] font-bold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md"
              >
                Healthy
              </button>
            </div>
          </div>

          {/* Quick Upload / Samples Bar */}
          <div className="p-3 bg-white border border-slate-200 rounded-[14px] shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              {lang === 'mr' ? 'किंवा नमुना फोटो निवडून चाचणी करा:' : 'Or tap a sample to test instantly:'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {sampleLeafOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleTriggerScan(opt)}
                  className="p-2 rounded-[8px] bg-slate-50 border border-slate-200 hover:bg-emerald-50 hover:border-[#1B5E20] text-left text-xs transition-colors cursor-pointer"
                >
                  <span className="font-bold text-slate-900 block truncate">{opt.crop}</span>
                  <span className="text-[10px] text-slate-500 truncate block">{opt.id.replace('_', ' ')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // 2. RESULT SCREEN WITH PROGRESSIVE DISCLOSURE (ONE VERDICT FIRST)
        <div className="space-y-4 animate-fadeIn">
          {/* Top Verdict Hero */}
          <div className={`p-5 rounded-[20px] border-3 shadow-md space-y-3 ${
            scanResult.medicineName 
              ? 'bg-rose-50 border-rose-500 text-rose-950' 
              : 'bg-emerald-50 border-emerald-500 text-emerald-950'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                {scanResult.medicineName ? (
                  <AlertOctagon className="w-8 h-8 text-rose-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                )}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {lang === 'mr' ? 'एआय निदान निकाल' : 'AI Diagnostic Result'}
                  </span>
                  <h2 className="text-[18px] sm:text-[20px] font-extrabold leading-tight">
                    {lang === 'mr' ? scanResult.verdictMr : scanResult.verdictEn}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => speakText(lang === 'mr' ? scanResult.plainAdviceMr : scanResult.plainAdviceEn, lang)}
                className="p-2.5 rounded-full bg-white shadow-xs border text-slate-700 active:scale-90"
                title="Listen to Result"
              >
                <Volume2 className="w-5 h-5 text-emerald-700" />
              </button>
            </div>

            <p className="text-[14px] font-medium leading-relaxed">
              {lang === 'mr' ? scanResult.plainAdviceMr : scanResult.plainAdviceEn}
            </p>

            {/* Big Action Button (If spray needed) */}
            {scanResult.medicineName && (
              <button
                onClick={handleBuyMedicine}
                className="w-full py-3.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-extrabold text-sm rounded-[12px] shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {lang === 'mr' 
                    ? `औषध खरेदी करा: ${scanResult.medicineName} (₹${scanResult.price})`
                    : `Order Medicine: ${scanResult.medicineName} (₹${scanResult.price})`
                  }
                </span>
              </button>
            )}
          </div>

          {/* Official Pathology Lab Test Requisition Widget (Shown when crop is flagged as diseased) */}
          {Boolean(
            scanResult.medicineName || 
            (scanResult.verdictEn && !scanResult.verdictEn.toLowerCase().includes('healthy') && !scanResult.verdictEn.toLowerCase().includes('optimal'))
          ) && (
            <PathologyLabTestWidget 
              cropName={scanResult.crop}
              diseaseVerdict={lang === 'mr' ? scanResult.verdictMr : scanResult.verdictEn}
              activeFormulation={scanResult.medicineName || scanResult.activeCompound}
              confidence={scanResult.confidence}
            />
          )}

          {/* Progressive Disclosure: "Tell me more" Expandable Details */}
          <div className="border border-slate-200 rounded-[14px] bg-white overflow-hidden shadow-xs">
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="w-full p-3.5 flex items-center justify-between text-left font-extrabold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <span>{lang === 'mr' ? 'अधिक तांत्रिक माहिती (Dosage & Chemical)' : 'Tell me more (Dosage & Chemicals)'}</span>
              {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showTechnicalDetails && (
              <div className="p-3.5 border-t border-slate-100 bg-slate-50/70 text-xs space-y-2.5 text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">AI Confidence:</span>
                  <strong className="font-mono text-emerald-700">{scanResult.confidence}%</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Severity:</span>
                  <strong className="font-bold">{scanResult.severity}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block">Active Chemical Formulation:</span>
                  <strong className="text-slate-900 block mt-0.5">{scanResult.activeCompound}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block">Spray Pump Dosage:</span>
                  <strong className="text-slate-900 block mt-0.5">{scanResult.dosage}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Scan Another Leaf Button */}
          <button
            onClick={() => setScanResult(null)}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{lang === 'mr' ? 'दुसऱ्या पानाचा फोटो काढा' : 'Scan Another Leaf'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
