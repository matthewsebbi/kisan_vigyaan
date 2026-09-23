import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Microscope, 
  FlaskConical, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  Building2, 
  FileText, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  Printer, 
  Truck, 
  QrCode, 
  ChevronRight, 
  User, 
  Phone, 
  Info,
  Check,
  RefreshCw,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

// State & District accredited Agricultural Research / KVK Pathology Laboratories
const ACCREDITED_PATHOLOGY_LABS = {
  "Maharashtra": {
    "Sangli": "KVK Sangli Plant Health Clinic & ICAR Pathology Laboratory",
    "Kolhapur": "Regional Sugarcane & Crop Pathology Lab, MPKV Kasaba Bawada",
    "Pune": "ICAR - National Research Centre for Grapes (NRCG) Pathology Division, Pune",
    "Nashik": "State Seed & Crop Disease Diagnostic Center, Dindori Road, Nashik",
    "Satara": "District Soil & Foliar Pathology Testing Center, KVK Karad",
    "Solapur": "ICAR - National Research Centre on Pomegranate Plant Health Clinic, Solapur",
    "default": "Mahatma Phule Krishi Vidyapeeth (MPKV) Central Diagnostic Laboratory"
  },
  "Tamil Nadu": {
    "Coimbatore": "Tamil Nadu Agricultural University (TNAU) Plant Pathology Clinic, Coimbatore",
    "Madurai": "Agricultural College & Research Institute Molecular Diagnostic Lab, Madurai",
    "Thanjavur": "ICAR-KVK Soil & Crop Health Diagnostic Center, Needamangalam",
    "default": "TNAU Directorate of Plant Protection Studies, Coimbatore"
  },
  "Karnataka": {
    "Belagavi": "ICAR-KVK Mattikopp Plant Health Clinic & Diagnostic Lab, Belagavi",
    "Dharwad": "University of Agricultural Sciences (UAS) Plant Pathology Division, Dharwad",
    "default": "UAS Bangalore Central Agricultural Diagnostic Center, GKVK"
  },
  "default": "ICAR-IARI Division of Plant Pathology & National Diagnostic Network"
};

export const PathologyLabTestWidget = ({ cropName, diseaseVerdict, activeFormulation, confidence }) => {
  const { lang, t, theme, currentUser } = useApp();
  const isDark = theme === 'dark';

  const userState = currentUser?.state || 'Maharashtra';
  const userDistrict = currentUser?.district || 'Sangli';
  const userName = currentUser?.name || 'Farmer';
  const userPhone = currentUser?.phone || '98224 55120';

  const assignedLab = ACCREDITED_PATHOLOGY_LABS[userState]?.[userDistrict] || 
                      ACCREDITED_PATHOLOGY_LABS[userState]?.default || 
                      ACCREDITED_PATHOLOGY_LABS.default;

  // Form State
  const [isApplying, setIsApplying] = useState(false);
  const [collectionMethod, setCollectionMethod] = useState('officer_pickup'); // 'officer_pickup' | 'kvk_drop' | 'express_courier'
  const [testType, setTestType] = useState('pcr_culture'); // 'pcr_culture' | 'fungal_microscopy' | 'full_pathology_panel'
  const [collectionDate, setCollectionDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('morning'); // 'morning' | 'afternoon'
  const [affectedArea, setAffectedArea] = useState('1.5 Acres');
  const [fieldNotes, setFieldNotes] = useState('');
  const [specimenSampleCount, setSpecimenSampleCount] = useState('4-6 Leaves');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submitted Booking State
  const [activeBooking, setActiveBooking] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);

  // Load bookings for current user on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`cs_lab_bookings_${currentUser?.id || 'guest'}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentBookings(parsed);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trackingId = `PATH-${userState.slice(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: trackingId,
      timestamp: new Date().toISOString(),
      crop: cropName || 'Cotton',
      suspectedDisease: diseaseVerdict || 'Bacterial Blight',
      confidence: confidence || 95,
      activeFormulation: activeFormulation || 'Streptocycline + Copper Oxychloride',
      farmerName: userName,
      farmerPhone: userPhone,
      farmerState: userState,
      farmerDistrict: userDistrict,
      assignedLab,
      collectionMethod,
      testType,
      collectionDate,
      timeSlot,
      affectedArea,
      specimenSampleCount,
      fieldNotes: fieldNotes || 'Visible foliar lesions and leaf spotting observed in field.',
      status: 'Officer Assigned for Sample Pickup',
      statusStep: 1, // 1: Requested, 2: Sample In-Transit, 3: Molecular Assay, 4: Report Ready
      officerName: 'Agri Extension Assistant (KVK Field Agent)',
      estimatedTurnaround: '24-48 Hours'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setActiveBooking(newBooking);
      setIsApplying(false);

      const updated = [newBooking, ...recentBookings];
      setRecentBookings(updated);
      try {
        localStorage.setItem(`cs_lab_bookings_${currentUser?.id || 'guest'}`, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  return (
    <div className={`rounded-3xl border-2 shadow-xl overflow-hidden transition-all ${
      isDark 
        ? 'bg-gradient-to-br from-[#0c182c] via-[#091222] to-[#060b14] border-cyan-500/50 text-slate-100 shadow-cyan-950/20' 
        : 'bg-gradient-to-br from-cyan-50/70 via-white to-emerald-50/50 border-cyan-400 text-slate-900 shadow-cyan-900/10'
    }`}>
      
      {/* Widget Header Banner */}
      <div className={`p-5 sm:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDark 
          ? 'bg-cyan-950/40 border-cyan-800/40 text-white' 
          : 'bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-700 text-white'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
            <FlaskConical className="w-6 h-6 text-cyan-200" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                {lang === 'ta' 
                  ? 'அரசு அங்கீகரிக்கப்பட்ட ஆய்வக பரிசோதனை' 
                  : lang === 'mr' 
                  ? 'शासकीय पीक रोग निदान प्रयोगशाळा चाचणी' 
                  : 'Official Plant Pathology Lab Verification Test'}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                isDark 
                  ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30' 
                  : 'bg-white/20 text-white border-white/30'
              }`}>
                ICAR-KVK Certified
              </span>
            </div>
            <p className="text-xs text-white/80 mt-0.5 font-medium">
              {lang === 'ta'
                ? 'நோய்க்கிருமியை உறுதிப்படுத்த மாதிரி சேகரிப்பு அல்லது கூரியர் சேவைக்கு விண்ணப்பிக்கவும்.'
                : lang === 'mr'
                ? 'संशयित रोगाची अचूक पुष्टी करण्यासाठी नमुना तपासणी व पीसीआर चाचणी अर्ज.'
                : 'Confirm AI visual diagnosis with molecular PCR assay & university diagnostic certificate.'}
            </p>
          </div>
        </div>

        {/* CTA Button to open application */}
        {!isApplying && !activeBooking && (
          <button
            type="button"
            onClick={() => setIsApplying(true)}
            className="px-5 py-2.5 rounded-xl bg-white text-cyan-900 hover:bg-cyan-50 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Microscope className="w-4 h-4 text-cyan-700" />
            <span>
              {lang === 'ta' ? 'ஆய்வக சோதனைக்கு விண்ணப்பிக்கவும்' : lang === 'mr' ? 'प्रयोगशाळा चाचणी अर्ज करा' : 'Apply for Lab Test'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        
        {/* =========================================================================
            CASE 1: ACTIVE / CONFIRMED BOOKING RECEIPT SLIP
            ========================================================================= */}
        {activeBooking ? (
          <div className="space-y-4 animate-fadeIn">
            <div className={`p-4 sm:p-5 rounded-2xl border-2 space-y-3 ${
              isDark 
                ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-100' 
                : 'bg-cyan-50/80 border-cyan-400 text-cyan-950'
            }`}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-300/40 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block">
                      ICAR-KVK Pathometry Dispatch Slip
                    </span>
                    <h4 className="text-base font-black">
                      Sample Request Registered: <span className="font-mono text-cyan-700 dark:text-cyan-300">#{activeBooking.id}</span>
                    </h4>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500 text-slate-950 self-start sm:self-auto shadow-sm">
                  {activeBooking.status}
                </span>
              </div>

              {/* Booking Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-0.5">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] block">Specimen Target</span>
                  <strong className="text-slate-900 dark:text-white block font-sans">{activeBooking.crop}</strong>
                  <span className="text-rose-600 dark:text-rose-400 text-[11px] block">{activeBooking.suspectedDisease}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-0.5">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] block">Collection Mode & Slot</span>
                  <strong className="text-slate-900 dark:text-white block font-sans">
                    {activeBooking.collectionMethod === 'officer_pickup' ? '🚜 Doorstep Extension Pickup' : '📦 KVK Drop Box'}
                  </strong>
                  <span className="text-cyan-700 dark:text-cyan-400 text-[11px] block font-mono">
                    {activeBooking.collectionDate} ({activeBooking.timeSlot === 'morning' ? '9:00 AM - 1:00 PM' : '2:00 PM - 6:00 PM'})
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-0.5 sm:col-span-2 lg:col-span-1">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] block">Accredited Diagnostic Lab</span>
                  <strong className="text-slate-900 dark:text-white block font-sans truncate">{activeBooking.assignedLab}</strong>
                  <span className="text-emerald-700 dark:text-emerald-400 text-[11px] block">Free Govt Extension Test (Zero Fee)</span>
                </div>
              </div>

              {/* Specimen Collection & Preservation Protocol */}
              <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-cyan-300/30 text-xs space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-cyan-800 dark:text-cyan-300">
                  <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>How to prepare your {activeBooking.crop} leaf sample for collection:</span>
                </span>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 text-[11px] space-y-0.5 pl-1">
                  <li>Pluck <strong>4 to 6 leaves</strong> displaying early and moderate lesion spots with leaf petioles intact.</li>
                  <li>Place them flat between <strong>2 dry newspaper sheets</strong>. Avoid airtight plastic bags to prevent mold.</li>
                  <li>Keep specimen in cool shade until the assigned extension officer arrives on {activeBooking.collectionDate}.</li>
                </ul>
              </div>

              {/* Progress Tracking Stepper */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                  <span>Tracking Progress:</span>
                  <span className="font-bold text-cyan-700 dark:text-cyan-300">Stage 1 of 4 • In-Progress</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
                  <div className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold">1. Applied ✓</div>
                  <div className="p-1.5 rounded-lg bg-cyan-400/20 text-cyan-700 dark:text-cyan-300 border border-cyan-400/40 animate-pulse">2. Pickup</div>
                  <div className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500">3. PCR Assay</div>
                  <div className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500">4. Report</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-cyan-300/40">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Official SMS updates will be dispatched to: <strong>+91 {activeBooking.farmerPhone}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => { setActiveBooking(null); setIsApplying(true); }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another Lab Test</span>
                </button>
              </div>

            </div>
          </div>
        ) : isApplying ? (
          /* =========================================================================
              CASE 2: INTERACTIVE APPLICATION FORM
              ========================================================================= */
          <form onSubmit={handleSubmitApplication} className="space-y-4 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Microscope className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {lang === 'ta' 
                    ? 'விவசாய மாதிரி பரிசோதனை படிவம்' 
                    : lang === 'mr' 
                    ? 'नमुना तपासणी व पीसीआर चाचणी अर्ज' 
                    : 'Foliar Specimen Diagnostic Requisition Form'}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setIsApplying(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Suspected Pathogen Auto-Detected Alert Box */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
              isDark 
                ? 'bg-rose-950/30 border-rose-600/40 text-rose-200' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] uppercase font-bold text-rose-500 block">
                  Identified by CropShield Pathometry Engine:
                </span>
                <strong className="text-sm font-black font-sans block">
                  {cropName || 'Target Crop'} • {diseaseVerdict || 'Active Disease Specimen'}
                </strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                  Confidence: {confidence || 95}% • Recommended Chemical: {activeFormulation || 'Standard Bio-Formulation'}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-mono font-bold text-[10px] shrink-0">
                LAB CONFIRMATION PENDING
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* 1. Farmer Name & Phone */}
              <div className="space-y-1">
                <label className="font-bold font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400">
                  Applicant Farmer & Contact
                </label>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                  isDark ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}>
                  <User className="w-4 h-4 text-cyan-600" />
                  <span className="font-semibold">{userName}</span>
                  <span className="text-slate-400 font-mono">({userPhone})</span>
                </div>
              </div>

              {/* 2. Destination Laboratory */}
              <div className="space-y-1">
                <label className="font-bold font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400">
                  Assigned KVK / University Lab
                </label>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 truncate ${
                  isDark ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`} title={assignedLab}>
                  <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate font-semibold">{assignedLab}</span>
                </div>
              </div>

              {/* 3. Sample Collection Method */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400">
                  Sample Handover Method <span className="text-emerald-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'officer_pickup', title: '🚜 Doorstep Extension Pickup', sub: 'Field officer visits plot within 24-48 hrs' },
                    { id: 'kvk_drop', title: '📦 Nearest KVK Center Drop', sub: 'Self-drop at district agricultural station' },
                    { id: 'express_courier', title: '⚡ Priority Molecular PCR', sub: 'Courier kit dispatch for 24h rapid assay' }
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setCollectionMethod(method.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        collectionMethod === method.id
                          ? 'bg-cyan-500/15 border-cyan-500 ring-2 ring-cyan-500/20 text-slate-900 dark:text-white font-bold'
                          : isDark
                          ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold leading-snug">{method.title}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5 leading-snug">{method.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Preferred Collection Date */}
              <div className="space-y-1">
                <label className="font-bold font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400">
                  Sample Pickup Date <span className="text-emerald-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-cyan-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={collectionDate}
                    onChange={(e) => setCollectionDate(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-cyan-600 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
              </div>

              {/* 5. Preferred Time Slot */}
              <div className="space-y-1">
                <label className="font-bold font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400">
                  Time Slot Window <span className="text-emerald-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-cyan-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs transition-all appearance-none cursor-pointer focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-cyan-600 focus:ring-cyan-500/20'
                    }`}
                  >
                    <option value="morning">Morning (9:00 AM - 1:00 PM)</option>
                    <option value="afternoon">Afternoon (2:00 PM - 6:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* 6. Affected Farmland Acreage */}
              <div className="space-y-1">
                <label className="font-bold font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400">
                  Approx. Affected Area
                </label>
                <select
                  value={affectedArea}
                  onChange={(e) => setAffectedArea(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs transition-all appearance-none cursor-pointer focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-cyan-600 focus:ring-cyan-500/20'
                  }`}
                >
                  <option value="0.5 Acres">0.5 Acres (Isolated patches)</option>
                  <option value="1.5 Acres">1.5 Acres (Moderate spreading)</option>
                  <option value="3.0+ Acres">3.0+ Acres (Severe block outbreak)</option>
                  <option value="Entire Farm">Entire Field / Plot</option>
                </select>
              </div>

              {/* 7. Specimen Leaf Count */}
              <div className="space-y-1">
                <label className="font-bold font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400">
                  Specimen Leaves Sample
                </label>
                <select
                  value={specimenSampleCount}
                  onChange={(e) => setSpecimenSampleCount(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs transition-all appearance-none cursor-pointer focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-cyan-600 focus:ring-cyan-500/20'
                  }`}
                >
                  <option value="4-6 Leaves">4 to 6 Infected Leaves (Recommended)</option>
                  <option value="8-10 Leaves">8 to 10 Leaves (Multi-zone composite)</option>
                  <option value="Leaf + Soil Specimen">Foliar Leaves + Root/Soil Core</option>
                </select>
              </div>

              {/* 8. Field Notes */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400">
                  Additional Field Observations / Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Leaves drying rapidly from lower canopy; noticed after heavy morning fog."
                  value={fieldNotes}
                  onChange={(e) => setFieldNotes(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 resize-none ${
                    isDark 
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-cyan-500/20'
                  }`}
                />
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsApplying(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-900/30 transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{isSubmitting ? 'Registering Lab Test...' : 'Submit Lab Requisition'}</span>
              </button>
            </div>

          </form>
        ) : (
          /* =========================================================================
              CASE 3: DEFAULT COLLAPSED VIEW (HIGHLIGHTS BENEFITS & PAST BOOKINGS)
              ========================================================================= */
          <div className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className={`p-3.5 rounded-2xl border flex items-start space-x-3 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/80 border-slate-200'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Microscope className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Molecular PCR Assay</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    DNA & spore verification to pinpoint exact pathogen species and sub-strains.
                  </p>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-start space-x-3 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/80 border-slate-200'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Govt Subsidized Remediation</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Certified pathology reports qualify for state disaster & pest relief grants.
                  </p>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-start space-x-3 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/80 border-slate-200'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Doorstep Field Pickup</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Trained KVK extension agents collect fresh leaf specimens directly from your farm.
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Summary of Recent Requisitions if any exist */}
            {recentBookings && recentBookings.length > 0 && (
              <div className={`p-3.5 rounded-2xl border space-y-2 ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600 dark:text-slate-300">Previous Lab Requisitions ({recentBookings.length}):</span>
                  <span className="text-cyan-600 dark:text-cyan-400">Live Status Active</span>
                </div>
                <div className="space-y-1.5">
                  {recentBookings.slice(0, 2).map(b => (
                    <div 
                      key={b.id} 
                      onClick={() => setActiveBooking(b)}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs cursor-pointer hover:border-cyan-500 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">#{b.id}</span>
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">{b.crop}</span>
                        <span className="text-slate-400 text-[11px]">({b.suspectedDisease})</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Open Form Action */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsApplying(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20 transition-all cursor-pointer active:scale-98"
              >
                <Microscope className="w-4 h-4 text-white" />
                <span>Apply for Physical Lab Test Now</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
