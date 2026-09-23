import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Zap, 
  ZapOff, 
  Image as ImageIcon, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  Info,
  Scan,
  Camera
} from 'lucide-react';
import { diseasesDatabase, sampleLeafImages } from '../../data/mockData';

export const CropScanner = () => {
  const { 
    t, 
    lang, 
    setActiveTab, 
    setCurrentDiagnosis, 
    selectedLeafImage, 
    setSelectedLeafImage 
  } = useApp();

  const [flash, setFlash] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDiseaseKey, setSelectedDiseaseKey] = useState('earlyBlight');
  const [useCamera, setUseCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize webcam if toggled
  useEffect(() => {
    let stream = null;
    if (useCamera) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.warn("Camera access not available or blocked:", err);
          setCameraError("Camera access unavailable. You can use preset samples or upload a photo.");
          setUseCamera(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [useCamera]);

  // Handle preset sample selection
  const handleSelectPreset = (key) => {
    setSelectedDiseaseKey(key);
    setSelectedLeafImage(sampleLeafImages[key]);
    setUseCamera(false);
  };

  // Handle user uploaded photo
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedLeafImage(event.target.result);
        setSelectedDiseaseKey('earlyBlight'); // default to early blight for custom upload
        setUseCamera(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Perform AI Leaf Diagnosis
  const handleCaptureAndAnalyze = () => {
    setIsScanning(true);
    
    // Simulate AI inference pipeline (900ms)
    setTimeout(() => {
      const targetDisease = diseasesDatabase[selectedDiseaseKey] || diseasesDatabase.earlyBlight;
      setCurrentDiagnosis(targetDisease);
      setIsScanning(false);
      setActiveTab('diagnosis');
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#1b261e] text-white">
      {/* Top Header matching mockup */}
      <div className="px-4 py-3.5 bg-[#165a3c] flex items-center justify-between shadow-md">
        <button 
          onClick={() => setActiveTab('esp32LiveData')}
          className="p-1.5 -ml-1 text-white hover:bg-emerald-800/60 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold tracking-tight text-white">{t('scanCrop')}</h1>

        <button 
          onClick={() => setFlash(!flash)}
          className={`p-2 rounded-full transition-colors ${
            flash ? 'bg-amber-400 text-gray-900 shadow-md' : 'text-white hover:bg-emerald-800/60'
          }`}
          title="Toggle Flash"
        >
          {flash ? <Zap className="w-5 h-5 fill-current" /> : <ZapOff className="w-5 h-5" />}
        </button>
      </div>

      {/* Instruction Subtitle */}
      <div className="py-3 px-4 text-center bg-[#182a20] border-b border-emerald-950">
        <p className="text-sm font-semibold text-emerald-100">{t('takeClearPhoto')}</p>
        <p className="text-[11px] text-emerald-300/80 mt-0.5">{t('cameraTip')}</p>
      </div>

      {/* Camera / Leaf Viewfinder Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-4 min-h-[360px] overflow-hidden">
        {/* Viewfinder Container */}
        <div className="relative w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 bg-black flex items-center justify-center">
          {/* Live Video feed or Sample Image */}
          {useCamera ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={selectedLeafImage || sampleLeafImages.earlyBlight} 
              alt="Leaf Sample" 
              className="w-full h-full object-cover"
            />
          )}

          {/* Flashlight overlay */}
          {flash && (
            <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-screen animate-pulse" />
          )}

          {/* Framing Corner Brackets (Mockup UI) */}
          <div className="absolute inset-4 pointer-events-none">
            {/* Top-Left */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/90 rounded-tl-xl shadow-sm"></div>
            {/* Top-Right */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/90 rounded-tr-xl shadow-sm"></div>
            {/* Bottom-Left */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/90 rounded-bl-xl shadow-sm"></div>
            {/* Bottom-Right */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/90 rounded-br-xl shadow-sm"></div>
          </div>

          {/* AI Scanning Ray / Laser Animation */}
          {isScanning && (
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none bg-emerald-950/40 backdrop-blur-xs">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-bounce"></div>
              <div className="p-3 text-center">
                <div className="inline-flex items-center space-x-2 bg-black/80 text-emerald-300 px-4 py-2 rounded-full border border-emerald-500/50 shadow-xl">
                  <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
                  <span className="text-xs font-bold">{t('analyzing')}</span>
                </div>
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-bounce"></div>
            </div>
          )}
        </div>

        {/* Preset Sample Selector Pill Bar for Instant Testing */}
        <div className="w-full max-w-sm mt-3 px-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Quick Leaf Sample Presets:
            </span>
            <button
              onClick={() => setUseCamera(!useCamera)}
              className="text-[11px] text-emerald-300 hover:text-white underline font-semibold"
            >
              {useCamera ? "Use Preset Image" : "Use Real Camera"}
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { key: 'earlyBlight', label: 'Early Blight', icon: '🍂' },
              { key: 'leafSpot', label: 'Leaf Spot', icon: '🟤' },
              { key: 'aphids', label: 'Aphids', icon: '🐛' },
              { key: 'powderyMildew', label: 'Powdery', icon: '⚪' },
              { key: 'healthy', label: 'Healthy', icon: '🌿' }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => handleSelectPreset(item.key)}
                className={`py-1.5 px-1 rounded-xl text-[10px] font-bold text-center border transition-all ${
                  selectedDiseaseKey === item.key && !useCamera
                    ? 'bg-emerald-600 border-emerald-300 text-white shadow-md ring-2 ring-emerald-400/50'
                    : 'bg-emerald-950/70 border-emerald-800/60 text-emerald-200 hover:bg-emerald-900/60'
                }`}
              >
                <div className="text-sm">{item.icon}</div>
                <div className="truncate mt-0.5">{item.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls matching mockup */}
      <div className="px-6 py-5 bg-[#122016] border-t border-emerald-900/50 flex items-center justify-around">
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Gallery / File Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isScanning}
          className="p-3.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 hover:text-white rounded-2xl shadow-md transition-all active:scale-95 flex flex-col items-center"
          title="Upload leaf photo from gallery"
        >
          <ImageIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Gallery</span>
        </button>

        {/* Large Concentric Capture Button (Screen 2 Mockup) */}
        <button
          onClick={handleCaptureAndAnalyze}
          disabled={isScanning}
          className="relative group p-1 active:scale-90 transition-transform duration-150"
          title="Capture and Diagnose"
        >
          {/* Outer circle */}
          <div className="w-20 h-20 rounded-full border-4 border-white/90 group-hover:border-emerald-400 flex items-center justify-center transition-colors shadow-2xl">
            {/* Inner solid circle */}
            <div className="w-16 h-16 rounded-full bg-white group-hover:bg-emerald-400 flex items-center justify-center transition-colors shadow-inner">
              <Camera className="w-7 h-7 text-emerald-950" />
            </div>
          </div>
        </button>

        {/* Toggle Real Camera / Sample Button */}
        <button
          onClick={() => setUseCamera(!useCamera)}
          disabled={isScanning}
          className="p-3.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 hover:text-white rounded-2xl shadow-md transition-all active:scale-95 flex flex-col items-center"
          title="Switch Camera / Presets"
        >
          <RefreshCw className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Switch</span>
        </button>
      </div>
    </div>
  );
};
