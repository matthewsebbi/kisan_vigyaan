import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_STATES, getDistrictsForState, STATE_AGRI_OFFICERS } from '../../data/indiaGeographicData';
import { 
  Leaf, 
  ShieldCheck, 
  User, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  MapPin, 
  Globe, 
  Sparkles, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  LogIn, 
  UserPlus, 
  Trees, 
  Sprout,
  Landmark,
  Building2,
  FileCheck2,
  BadgeCheck,
  Send,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginPage = ({ isModal = false }) => {
  const { 
    t, 
    lang, 
    setLang, 
    accounts, 
    login, 
    signup, 
    isLoggedIn, 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    theme 
  } = useApp();

  const isDark = theme === 'dark';

  // 1. Primary Portal Mode: 'farmer' (Kisan) | 'officer' (Agri Officer)
  const [portalType, setPortalType] = useState('farmer');

  // Farmer Auth sub-mode: 'login' | 'register'
  const [farmerMode, setFarmerMode] = useState('register');

  // Farmer Registration Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regState, setRegState] = useState('Maharashtra');
  const [regDistrict, setRegDistrict] = useState('Sangli');
  const [regAadhar, setRegAadhar] = useState('');
  const [regLang, setRegLang] = useState(lang || 'en');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Farmer Login Form State
  const [farmerLoginUsername, setFarmerLoginUsername] = useState('');
  const [farmerLoginPassword, setFarmerLoginPassword] = useState('');
  const [showFarmerLoginPassword, setShowFarmerLoginPassword] = useState(false);

  // Agri Officer Login Form State
  const [officerState, setOfficerState] = useState('Maharashtra');
  const [officerUsername, setOfficerUsername] = useState('');
  const [officerPassword, setOfficerPassword] = useState('');
  const [showOfficerPassword, setShowOfficerPassword] = useState(false);

  // UI Feedback
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [dispatchedInfo, setDispatchedInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dynamic district options based on selected state for farmer
  const availableDistricts = getDistrictsForState(regState);

  // When farmer State changes, reset District to first available
  useEffect(() => {
    if (availableDistricts && availableDistricts.length > 0 && !availableDistricts.includes(regDistrict)) {
      setRegDistrict(availableDistricts[0]);
    }
  }, [regState]);

  // Handle Full Name change
  const handleNameChange = (e) => {
    setRegName(e.target.value);
  };

  // Format Aadhaar with 4-digit spacing
  const handleAadharChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 12);
    let formatted = '';
    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += digits[i];
    }
    setRegAadhar(formatted);
  };

  // Format Phone (10 digits)
  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setRegPhone(digits);
  };

  // If opened as a modal inside app and not open, don't render
  if (isModal && !isLoginModalOpen) return null;

  // Handle Farmer Registration Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setDispatchedInfo(null);

    if (!regName.trim() || regName.trim().length < 2) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }

    if (regPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (regAadhar.replace(/\D/g, '').length < 12) {
      setErrorMsg('Please enter your valid 12-digit Aadhaar number.');
      return;
    }

    if (regPassword.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    const cleanUsername = (regUsername || regPhone || regName.toLowerCase().replace(/\s+/g, '_')).trim().toLowerCase();

    const result = signup({
      name: regName.trim(),
      phone: regPhone,
      username: cleanUsername,
      state: regState,
      district: regDistrict,
      aadharNo: regAadhar,
      lang: regLang,
      password: regPassword,
      role: 'farmer',
      crop: 'Cotton & Tomato',
      acreage: '5.0 Acres'
    });

    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
    } else {
      confetti({ particleCount: 75, spread: 85, origin: { y: 0.6 } });
      const assignedOfficer = STATE_AGRI_OFFICERS[regState] || STATE_AGRI_OFFICERS["Maharashtra"];
      setDispatchedInfo({
        username: cleanUsername,
        phone: `+91 ${regPhone.slice(0, 5)} ${regPhone.slice(5)}`,
        officerName: assignedOfficer.name,
        officerState: regState
      });
      setSuccessMsg(`Welcome, ${regName}! Your farmer account was registered successfully with username: ${cleanUsername}. Your details have been dispatched to ${assignedOfficer.name} (${regState} Agri Officer).`);
      if (isModal) setIsLoginModalOpen(false);
    }
  };

  // Handle Farmer Login Submit
  const handleFarmerLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!farmerLoginUsername.trim()) {
      setErrorMsg('Please enter your registered username or mobile number.');
      return;
    }

    if (!farmerLoginPassword) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    const result = login(farmerLoginUsername.trim(), farmerLoginPassword);
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
    } else {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      setSuccessMsg(`Welcome back, ${result.user.name}! Logging you into farmland...`);
      if (isModal) setIsLoginModalOpen(false);
    }
  };

  // Handle Agri Officer Login Submit
  const handleOfficerLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!officerUsername.trim()) {
      setErrorMsg('Please enter your Agri Officer username or Govt ID.');
      return;
    }

    if (!officerPassword) {
      setErrorMsg('Please enter your officer authorization password.');
      return;
    }

    setLoading(true);
    const result = login(officerUsername.trim(), officerPassword);
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
    } else {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      setSuccessMsg(`Access Granted: ${result.user.name} (${officerState} Agriculture Command). Opening Officer Dashboard...`);
      if (isModal) setIsLoginModalOpen(false);
    }
  };

  return (
    <div className={`${
      isModal 
        ? 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto' 
        : `min-h-screen w-full flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:px-8 transition-colors ${
            isDark 
              ? 'bg-gradient-to-br from-[#060B14] via-[#0B1528] to-[#040810] text-slate-100' 
              : 'bg-gradient-to-br from-slate-100 via-emerald-50/40 to-slate-200 text-slate-800'
          }`
    }`}>
      
      {/* Background Glow Accents */}
      <div className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-emerald-500/10' : 'bg-emerald-400/15'
      }`} />
      <div className={`absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-amber-500/10' : 'bg-amber-300/20'
      }`} />

      {/* Main Container Card */}
      <div className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all ${
        isDark 
          ? 'bg-[#0B1528]/95 border-slate-800/90 shadow-black/60 text-slate-100' 
          : 'bg-white border-slate-200 shadow-slate-900/10 text-slate-900'
      }`}>

        {/* Modal Close Button if opened as overlay */}
        {isModal && (
          <button
            onClick={() => setIsLoginModalOpen(false)}
            aria-label="Close"
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer z-30 ${
              isDark 
                ? 'hover:bg-slate-800 text-slate-400 hover:text-white' 
                : 'hover:bg-black/10 text-slate-600 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* =========================================================================
            HEADER BRANDING & PRIMARY DUAL-MODE SELECTOR (FARMER vs AGRI OFFICER)
            ========================================================================= */}
        <div className={`p-6 sm:p-8 border-b relative overflow-hidden transition-colors ${
          portalType === 'officer'
            ? isDark
              ? 'bg-gradient-to-r from-[#171a27] via-[#211d12] to-[#12161f] text-white border-amber-900/40'
              : 'bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 text-white border-amber-700'
            : isDark
              ? 'bg-gradient-to-r from-emerald-950 via-[#0A2617] to-slate-950 text-white border-emerald-900/40'
              : 'bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white border-emerald-700'
        }`}>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            
            <div className="flex items-center space-x-3.5">
              <div className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg border ${
                portalType === 'officer'
                  ? 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300/40 text-slate-950'
                  : 'bg-gradient-to-br from-emerald-400 to-teal-500 border-emerald-300/40 text-white'
              }`}>
                {portalType === 'officer' ? (
                  <Landmark className="w-7 h-7 text-slate-950" />
                ) : (
                  <Sprout className="w-7 h-7 text-slate-950" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-wide text-white">
                    CropShield AI
                  </h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono border ${
                    portalType === 'officer'
                      ? 'bg-amber-400/20 text-amber-200 border-amber-400/30'
                      : 'bg-emerald-400/20 text-emerald-200 border-emerald-400/30'
                  }`}>
                    {portalType === 'officer' ? 'Agri Officer Command' : 'Farmer Portal'}
                  </span>
                </div>
                <p className="text-xs text-white/80 font-sans mt-0.5">
                  {portalType === 'officer'
                    ? 'State Department of Agriculture • Extension Officer Command Center'
                    : 'Smart Farmland Disease Diagnostics, Telemetry & Advisory'}
                </p>
              </div>
            </div>

            {/* PRIMARY DUAL-MODE PORTAL SWITCHER: FARMER vs AGRI OFFICER */}
            <div className={`p-1.5 rounded-2xl border flex items-center gap-1 self-start md:self-auto backdrop-blur-md ${
              isDark 
                ? 'bg-black/50 border-slate-700/60' 
                : 'bg-black/25 border-white/20'
            }`}>
              <button
                type="button"
                onClick={() => { setPortalType('farmer'); setErrorMsg(null); setSuccessMsg(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  portalType === 'farmer'
                    ? 'bg-white text-emerald-950 shadow-md font-black scale-102'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🌾</span>
                <span>Farmer Mode</span>
              </button>

              <button
                type="button"
                onClick={() => { setPortalType('officer'); setErrorMsg(null); setSuccessMsg(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  portalType === 'officer'
                    ? 'bg-amber-300 text-amber-950 shadow-md font-black scale-102'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Agri Officer Mode</span>
              </button>
            </div>

          </div>
        </div>

        {/* Feedback Alert Banners */}
        {errorMsg && (
          <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-600 dark:text-rose-200 flex items-center gap-3 text-xs sm:text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
            <div className="font-semibold">{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className={`mx-6 sm:mx-8 mt-6 p-4 rounded-2xl border space-y-2 text-xs sm:text-sm animate-fadeIn ${
            isDark 
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' 
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}>
            <div className={`flex items-center gap-2 font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{successMsg}</span>
            </div>
            {dispatchedInfo && (
              <div className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono ${
                isDark ? 'bg-black/40 border-emerald-700/50' : 'bg-white border-emerald-200 shadow-sm'
              }`}>
                <div>
                  <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-700'} font-bold`}>Dispatched to Officer: </span>
                  <span className={isDark ? 'text-white' : 'text-slate-800'}>{dispatchedInfo.officerName} ({dispatchedInfo.officerState})</span>
                </div>
                <div className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  Registered: <strong className={isDark ? 'text-amber-300' : 'text-emerald-700'}>@{dispatchedInfo.username}</strong> | Phone: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{dispatchedInfo.phone}</strong>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            PORTAL BODY
            ========================================================================= */}
        <div className="p-6 sm:p-8">
          
          {portalType === 'farmer' ? (
            /* =======================================================================
               A. FARMER PORTAL (REGISTER vs LOGIN)
               ======================================================================= */
            <div className="space-y-6">
              
              {/* Farmer Sub-Tabs (Register vs Log In) */}
              <div className={`flex items-center justify-between border-b pb-4 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div>
                  <h2 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {farmerMode === 'register' ? (
                      <>
                        <UserPlus className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span>Farmer Registration (Kisan Enrollment)</span>
                      </>
                    ) : (
                      <>
                        <LogIn className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span>Farmer Sign In</span>
                      </>
                    )}
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {farmerMode === 'register'
                      ? 'Register your profile. Your username & phone will be securely dispatched to your State Agri Officer.'
                      : 'Enter your registered username and password to log in.'}
                  </p>
                </div>

                <div className={`flex p-1 rounded-xl border ${
                  isDark ? 'bg-slate-950/80 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => { setFarmerMode('login'); setErrorMsg(null); }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      farmerMode === 'login'
                        ? 'bg-emerald-600 text-white font-black shadow-sm'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFarmerMode('register'); setErrorMsg(null); }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      farmerMode === 'register'
                        ? 'bg-emerald-600 text-white font-black shadow-sm'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {farmerMode === 'register' ? (
                /* FARMER REGISTRATION FORM */
                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    
                    {/* 1. Full Name */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Full Name <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>*</span>
                      </label>
                      <div className="relative">
                        <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                          isDark ? 'text-slate-400' : 'text-slate-400'
                        }`} />
                        <input
                          type="text"
                          required
                          placeholder=""
                          value={regName}
                          onChange={handleNameChange}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                            isDark 
                              ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
                              : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                          }`}
                        />
                      </div>
                    </div>

                    {/* 2. Phone Number */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Phone Number (Mobile) <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>*</span>
                      </label>
                      <div className="relative">
                        <div className={`absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-mono font-bold border-r pr-2 ${
                          isDark ? 'text-slate-400 border-slate-700' : 'text-slate-600 border-slate-300'
                        }`}>
                          <span>🇮🇳</span>
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder=""
                          value={regPhone}
                          onChange={handlePhoneChange}
                          className={`w-full pl-20 pr-3 py-2.5 rounded-xl border text-sm font-mono transition-all focus:outline-none focus:ring-2 ${
                            isDark 
                              ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
                              : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                          }`}
                        />
                      </div>
                    </div>

                    {/* 3. Username */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-between ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <span>Login Username <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>*</span></span>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-700 font-semibold'}`}>Sent to Agri Officer</span>
                      </label>
                      <div className="relative">
                        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm ${
                          isDark ? 'text-slate-500' : 'text-slate-400'
                        }`}>@</span>
                        <input
                          type="text"
                          required
                          placeholder=""
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm font-mono transition-all focus:outline-none focus:ring-2 ${
                            isDark 
                              ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
                              : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                          }`}
                        />
                      </div>
                    </div>

                    {/* 4. State Dropdown */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        State (राज्य / மாநிலம்) <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>*</span>
                      </label>
                      <div className="relative">
                        <MapPin className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`} />
                        <select
                          value={regState}
                          onChange={(e) => setRegState(e.target.value)}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm transition-all appearance-none cursor-pointer focus:outline-none focus:ring-2 ${
                            isDark 
                              ? 'border-slate-700/80 bg-slate-950/80 text-white focus:border-emerald-500 focus:ring-emerald-500/20' 
                              : 'border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                          }`}
                        >
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st} className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 5. District Dropdown */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        District (जिल्हा / மாவட்டம்) <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>*</span>
                      </label>
                      <div className="relative">
                        <MapPin className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                          isDark ? 'text-teal-400' : 'text-teal-600'
                        }`} />
                        <select
                          value={regDistrict}
                          onChange={(e) => setRegDistrict(e.target.value)}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm transition-all appearance-none cursor-pointer focus:outline-none focus:ring-2 ${
                            isDark 
                              ? 'border-slate-700/80 bg-slate-950/80 text-white focus:border-emerald-500 focus:ring-emerald-500/20' 
                              : 'border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                          }`}
                        >
                          {availableDistricts.map((dist) => (
                            <option key={dist} value={dist} className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                              {dist}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 6. Aadhaar Number */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-between ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <span>Aadhaar Number (12 Digits) <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>*</span></span>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500 font-semibold'}`}>UIDAI Masked</span>
                      </label>
                      <div className="relative">
                        <CreditCard className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                          isDark ? 'text-slate-400' : 'text-slate-400'
                        }`} />
                        <input
                          type="text"
                          required
                          placeholder=""
                          value={regAadhar}
                          onChange={handleAadharChange}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm font-mono tracking-wider transition-all focus:outline-none focus:ring-2 ${
                            isDark 
                              ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
                              : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                          }`}
                        />
                      </div>
                    </div>

                    {/* 7. Language Preference */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Language Preference <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>*</span>
                      </label>
                      <div className="relative">
                        <Globe className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`} />
                        <select
                          value={regLang}
                          onChange={(e) => setRegLang(e.target.value)}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm transition-all appearance-none cursor-pointer focus:outline-none focus:ring-2 ${
                            isDark 
                              ? 'border-slate-700/80 bg-slate-950/80 text-white focus:border-emerald-500 focus:ring-emerald-500/20' 
                              : 'border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                          }`}
                        >
                          <option value="en" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>English (English)</option>
                          <option value="mr" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>मराठी (Marathi)</option>
                          <option value="ta" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>தமிழ் (Tamil)</option>
                          <option value="hi" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>हिंदी (Hindi)</option>
                          <option value="te" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>తెలుగు (Telugu)</option>
                          <option value="kn" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>ಕನ್ನಡ (Kannada)</option>
                        </select>
                      </div>
                    </div>

                    {/* 8. Set Password */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Set Password <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>*</span>
                      </label>
                      <div className="relative">
                        <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                          isDark ? 'text-slate-400' : 'text-slate-400'
                        }`} />
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          placeholder=""
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                            isDark 
                              ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
                              : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* 9. Confirm Password */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Confirm Password <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>*</span>
                      </label>
                      <div className="relative">
                        <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                          isDark ? 'text-slate-400' : 'text-slate-400'
                        }`} />
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          placeholder=""
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                            isDark 
                              ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
                              : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                          }`}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all cursor-pointer active:scale-98"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>{loading ? 'Dispatching Registration...' : 'Register & Send Details to Agri Officer'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                /* FARMER LOGIN FORM */
                <form onSubmit={handleFarmerLoginSubmit} className="space-y-4 max-w-md mx-auto py-2">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Farmer Username / Mobile / Aadhaar
                    </label>
                    <div className="relative">
                      <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`} />
                      <input
                        type="text"
                        required
                        placeholder=""
                        value={farmerLoginUsername}
                        onChange={(e) => setFarmerLoginUsername(e.target.value)}
                        className={`w-full pl-10 pr-3 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                          isDark 
                            ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
                            : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                        isDark ? 'text-slate-400' : 'text-slate-400'
                      }`} />
                      <input
                        type={showFarmerLoginPassword ? 'text' : 'password'}
                        required
                        placeholder=""
                        value={farmerLoginPassword}
                        onChange={(e) => setFarmerLoginPassword(e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                          isDark 
                            ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20' 
                            : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-emerald-500/20 shadow-sm'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowFarmerLoginPassword(!showFarmerLoginPassword)}
                        className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${
                          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {showFarmerLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all cursor-pointer active:scale-98"
                  >
                    <LogIn className="w-5 h-5 text-white" />
                    <span>{loading ? 'Authenticating...' : 'Sign In as Farmer'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className={`pt-2 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Need an account?{' '}
                    <button
                      type="button"
                      onClick={() => setFarmerMode('register')}
                      className={`font-bold hover:underline cursor-pointer ${
                        isDark ? 'text-emerald-400' : 'text-emerald-700'
                      }`}
                    >
                      Register Now
                    </button>
                  </div>
                </form>
              )}

            </div>
          ) : (
            /* =======================================================================
               B. AGRI OFFICER PORTAL (GOVERNMENT OFFICIALS)
               ======================================================================= */
            <div className="space-y-6 max-w-xl mx-auto py-2">
              
              <div className="text-center space-y-1">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase mb-1 border ${
                  isDark 
                    ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' 
                    : 'bg-amber-100 border-amber-300 text-amber-800'
                }`}>
                  <Landmark className="w-3.5 h-3.5" />
                  <span>State Agricultural Directorate</span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-black tracking-wide ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Agri Extension Officer Login
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Government of India & State Agriculture Departments Command Portal
                </p>
              </div>

              {/* State Officer Credential Callout Box for Maharashtra */}
              <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
                isDark 
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' 
                  : 'bg-amber-50/80 border-amber-300 text-amber-900 shadow-sm'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span className={`flex items-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                    <BadgeCheck className="w-4 h-4 text-amber-500" />
                    <span>Maharashtra Agri Officer Mock Credentials:</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-mono font-bold text-[10px]">
                    READY TO TEST
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1">
                  <div>Username: <strong className={isDark ? 'text-white' : 'text-slate-900'}>officer_maharashtra</strong></div>
                  <div>Password: <strong className={isDark ? 'text-white' : 'text-slate-900'}>officer123</strong></div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOfficerState('Maharashtra');
                    setOfficerUsername('officer_maharashtra');
                    setOfficerPassword('officer123');
                  }}
                  className="w-full mt-1.5 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-sans text-xs transition-colors cursor-pointer shadow-sm"
                >
                  ⚡ Auto-Fill Maharashtra Agri Officer Credentials
                </button>
              </div>

              {/* Officer Login Form */}
              <form onSubmit={handleOfficerLoginSubmit} className="space-y-4">
                
                {/* State Selection */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Assigned State Agriculture Command
                  </label>
                  <div className="relative">
                    <Building2 className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                      isDark ? 'text-amber-400' : 'text-amber-600'
                    }`} />
                    <select
                      value={officerState}
                      onChange={(e) => setOfficerState(e.target.value)}
                      className={`w-full pl-10 pr-3 py-3 rounded-xl border text-sm transition-all appearance-none cursor-pointer focus:outline-none focus:ring-2 ${
                        isDark 
                          ? 'border-slate-700/80 bg-slate-950/80 text-white focus:border-amber-400 focus:ring-amber-400/20' 
                          : 'border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:border-amber-600 focus:ring-amber-500/20 shadow-sm'
                      }`}
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                          {st} ({STATE_AGRI_OFFICERS[st]?.name || 'State Agri Officer'})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Officer Username / Govt ID */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Officer Username / Govt ID <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>*</span>
                  </label>
                  <div className="relative">
                    <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                      isDark ? 'text-amber-400' : 'text-amber-600'
                    }`} />
                    <input
                      type="text"
                      required
                      placeholder=""
                      value={officerUsername}
                      onChange={(e) => setOfficerUsername(e.target.value)}
                      className={`w-full pl-10 pr-3 py-3 rounded-xl border text-sm font-mono transition-all focus:outline-none focus:ring-2 ${
                        isDark 
                          ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-amber-400/20' 
                          : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-600 focus:ring-amber-500/20 shadow-sm'
                      }`}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold font-mono uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Security Authorization Password <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>*</span>
                  </label>
                  <div className="relative">
                    <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                      isDark ? 'text-slate-400' : 'text-slate-400'
                    }`} />
                    <input
                      type={showOfficerPassword ? 'text' : 'password'}
                      required
                      placeholder=""
                      value={officerPassword}
                      onChange={(e) => setOfficerPassword(e.target.value)}
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        isDark 
                          ? 'border-slate-700/80 bg-slate-950/60 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-amber-400/20' 
                          : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-600 focus:ring-amber-500/20 shadow-sm'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowOfficerPassword(!showOfficerPassword)}
                      className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${
                        isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {showOfficerPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Officer Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30 transition-all cursor-pointer active:scale-98"
                >
                  <Landmark className="w-5 h-5 text-slate-950" />
                  <span>{loading ? 'Authenticating Official Access...' : `Sign In as ${officerState} Agri Officer`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

        </div>

        {/* Footer Security Badges */}
        <div className={`px-6 sm:px-8 py-3.5 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono gap-2 transition-colors ${
          isDark 
            ? 'bg-slate-950/70 border-slate-800 text-slate-400' 
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div className={`flex items-center gap-2 font-semibold ${
            isDark ? 'text-emerald-400' : 'text-emerald-700'
          }`}>
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit Encrypted Agricultural Identity</span>
          </div>
          <div className={isDark ? 'text-slate-500' : 'text-slate-500'}>
            MeitY & ICAR Digital Agriculture Framework
          </div>
        </div>

      </div>

    </div>
  );
};
