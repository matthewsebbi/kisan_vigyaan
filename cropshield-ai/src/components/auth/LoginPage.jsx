import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_STATES, getDistrictsForState } from '../../data/indiaGeographicData';
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

  // Auth mode: 'login' | 'register'
  const [mode, setMode] = useState('register'); // Default to register or login

  // Registration Form State
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

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // UI Feedback
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dynamic district options based on selected state
  const availableDistricts = getDistrictsForState(regState);

  // When State changes, reset District to first available
  useEffect(() => {
    if (availableDistricts && availableDistricts.length > 0 && !availableDistricts.includes(regDistrict)) {
      setRegDistrict(availableDistricts[0]);
    }
  }, [regState]);

  // Auto-suggest username when typing Name or Phone
  const handleNameChange = (e) => {
    const val = e.target.value;
    setRegName(val);
    if (!regUsername || regUsername.includes('_') || regUsername === '') {
      const slug = val.trim().toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 15);
      if (slug) setRegUsername(slug);
    }
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

  // Handle Registration Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

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
      crop: 'Cotton & Vegetables',
      acreage: '5.0 Acres'
    });

    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
    } else {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      setSuccessMsg(`Welcome, ${regName}! Your account was registered successfully with username: ${cleanUsername}`);
      if (isModal) setIsLoginModalOpen(false);
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginUsername.trim()) {
      setErrorMsg('Please enter your registered username, phone, or Aadhaar number.');
      return;
    }

    if (!loginPassword) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    const result = login(loginUsername.trim(), loginPassword);
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
    } else {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      setSuccessMsg(`Welcome back, ${result.user.name}! Logging you in...`);
      if (isModal) setIsLoginModalOpen(false);
    }
  };

  // Quick 1-Click Demo Login
  const handleQuickDemo = (demoUsername, demoPass) => {
    setErrorMsg(null);
    setLoading(true);
    const result = login(demoUsername, demoPass);
    setLoading(false);
    if (result.success) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      if (isModal) setIsLoginModalOpen(false);
    } else {
      setErrorMsg(result.error);
    }
  };

  return (
    <div className={`${
      isModal 
        ? 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto' 
        : 'min-h-screen w-full flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0B1528] via-[#0E1F38] to-[#081120] text-slate-100'
    }`}>
      
      {/* Background Glow Accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all ${
        isDark 
          ? 'bg-[#0F1D33]/95 border-[#1E3355]' 
          : 'bg-[#FAF8F5]/98 border-[#D8D2C2] text-[#1E2E22]'
      }`}>

        {/* Modal Close Button if opened as overlay */}
        {isModal && (
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header Branding Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0E2F1E] via-[#143D27] to-[#0A2617] text-white border-b border-emerald-900/40 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg border border-emerald-300/30">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black font-serif-vintage tracking-wide">
                    CropShield AI
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-mono">
                    Farmer Portal
                  </span>
                </div>
                <p className="text-xs text-emerald-200/80 font-sans mt-0.5">
                  AI-Powered Agricultural Diagnosis & Precision Field Intelligence
                </p>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex p-1 bg-black/30 rounded-2xl border border-emerald-700/40 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(null); setSuccessMsg(null); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMsg(null); setSuccessMsg(null); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Alert Banners */}
        {errorMsg && (
          <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-2xl bg-rose-950/50 border border-rose-600/40 text-rose-200 flex items-center gap-3 text-xs sm:text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="font-semibold">{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 flex items-center gap-3 text-xs sm:text-sm animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="font-semibold">{successMsg}</div>
          </div>
        )}

        {/* Content Body: Register vs Login */}
        <div className="p-6 sm:p-8">
          
          {mode === 'register' ? (
            /* =========================================================================
               1. REGISTRATION FORM (NAME, PHONE, USERNAME, STATE, DISTRICT, AADHAAR, LANG, PASSWORD)
               ========================================================================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div className="border-b pb-3 border-slate-700/40 dark:border-slate-700/40">
                <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-emerald-400">
                  <UserPlus className="w-5 h-5" />
                  <span>Farmer Profile Registration</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Enter your agricultural identification details to register your farmland account.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                
                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil / రాజేష్"
                      value={regName}
                      onChange={handleNameChange}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* 2. Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    Phone Number (Mobile) <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-400 text-xs font-mono font-bold border-r border-slate-700 pr-2">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98224 55120"
                      value={regPhone}
                      onChange={handlePhoneChange}
                      className="w-full pl-20 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* 3. Username */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Login Username <span className="text-emerald-400">*</span></span>
                    <span className="text-[10px] text-emerald-400 font-mono font-normal">Used to Log In</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">@</span>
                    <input
                      type="text"
                      required
                      placeholder="ramesh_patil"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* 4. State Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    State (राज्य / மாநிலம்) <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} className="bg-slate-900 text-white">
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. District Dropdown (Cascading based on State) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    District (जिल्हा / மாவட்டம்) <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={regDistrict}
                      onChange={(e) => setRegDistrict(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
                    >
                      {availableDistricts.map((dist) => (
                        <option key={dist} value={dist} className="bg-slate-900 text-white">
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 6. Aadhaar Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Aadhaar Number (12 Digits) <span className="text-emerald-400">*</span></span>
                    <span className="text-[10px] text-slate-400 font-mono">UIDAI Masked</span>
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="8841 9023 5512"
                      value={regAadhar}
                      onChange={handleAadharChange}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white placeholder-slate-500 text-sm font-mono tracking-wider focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* 7. Language Preference */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    Language Preference <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={regLang}
                      onChange={(e) => setRegLang(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="en" className="bg-slate-900 text-white">English (English)</option>
                      <option value="mr" className="bg-slate-900 text-white">मराठी (Marathi)</option>
                      <option value="ta" className="bg-slate-900 text-white">தமிழ் (Tamil)</option>
                      <option value="hi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
                      <option value="te" className="bg-slate-900 text-white">తెలుగు (Telugu)</option>
                      <option value="kn" className="bg-slate-900 text-white">ಕನ್ನಡ (Kannada)</option>
                    </select>
                  </div>
                </div>

                {/* 8. Set Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    Set Password <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      placeholder="Create a secure password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 9. Confirm Password */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    Confirm Password <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      placeholder="Repeat your password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer active:scale-98"
                >
                  <UserPlus className="w-5 h-5 text-slate-950" />
                  <span>{loading ? 'Registering Account...' : 'Complete Registration & Enter Farmland'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-1 text-xs text-slate-400">
                Already registered with CropShield AI?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(null); setSuccessMsg(null); }}
                  className="text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  Log In with your Username
                </button>
              </div>
            </form>
          ) : (
            /* =========================================================================
               2. LOGIN FORM (USERNAME & PASSWORD)
               ========================================================================= */
            <div className="space-y-6 max-w-lg mx-auto">
              
              <div className="text-center space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5 text-emerald-400" />
                  <span>Welcome Back, Kisan!</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Enter your registered username and password to log in.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Username Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    Username / Mobile / Aadhaar
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. ramesh_patil or 9822455120"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer active:scale-98"
                >
                  <LogIn className="w-5 h-5 text-slate-950" />
                  <span>{loading ? 'Verifying Credentials...' : 'Sign In to Farmland'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* 1-Click Quick Demo Switcher */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block text-center mb-3">
                  ⚡ 1-Click Demo Accounts (Instant Test)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('ramesh_patil', 'kisan123')}
                    className="p-2.5 rounded-xl border border-slate-800 hover:border-emerald-500/60 bg-slate-900/50 hover:bg-slate-900 text-left transition-all cursor-pointer group flex items-center gap-3"
                  >
                    <span className="text-xl">👨‍🌾</span>
                    <div className="leading-tight">
                      <span className="text-xs font-bold text-white group-hover:text-emerald-400 block">
                        Ramesh Patil (Farmer)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        user: ramesh_patil
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('dr_suhas', 'officer123')}
                    className="p-2.5 rounded-xl border border-slate-800 hover:border-emerald-500/60 bg-slate-900/50 hover:bg-slate-900 text-left transition-all cursor-pointer group flex items-center gap-3"
                  >
                    <span className="text-xl">🧑‍🔬</span>
                    <div className="leading-tight">
                      <span className="text-xs font-bold text-white group-hover:text-emerald-400 block">
                        Dr. Suhas More (Agri Officer)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        user: dr_suhas
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="text-center pt-2 text-xs text-slate-400">
                New to CropShield AI?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMsg(null); setSuccessMsg(null); }}
                  className="text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  Register New Account
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Security Badges */}
        <div className="px-6 sm:px-8 py-3.5 bg-black/40 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Encrypted Agricultural Identity</span>
          </div>
          <div className="text-slate-500">
            MeitY & ICAR Digital Agriculture Framework
          </div>
        </div>

      </div>

    </div>
  );
};
