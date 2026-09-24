import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Leaf, 
  ShieldCheck, 
  User, 
  Phone, 
  Lock, 
  MapPin, 
  Sprout, 
  Layers, 
  Check, 
  ArrowRight, 
  Globe, 
  Sparkles, 
  Users, 
  AlertCircle, 
  X, 
  Landmark,
  Mail,
  CreditCard,
  Building2,
  FileCheck2,
  Handshake,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginPage = () => {
  const { 
    t, 
    lang, 
    setLang, 
    accounts, 
    switchAccount, 
    login, 
    signup, 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    theme 
  } = useApp();

  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('officers'); // 'officers' | 'ngos' | 'farmers' | 'manual'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState('farmer');

  // Form State
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Sangli, Maharashtra');
  const [crop, setCrop] = useState('Cotton');
  const [acreage, setAcreage] = useState('5.0 Acres');
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isLoginModalOpen) return null;

  const officerAccounts = accounts.filter(a => a.role === 'officer');
  const ngoAccounts = accounts.filter(a => a.role === 'ngo');
  const farmerAccounts = accounts.filter(a => a.role === 'farmer');

  const handleFastLogin = (accId) => {
    switchAccount(accId);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setIsLoginModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (authMode === 'signup') {
      const res = signup({
        name,
        phoneOrEmail,
        password,
        role,
        location,
        crop,
        acreage
      });

      if (!res.success) {
        setErrorMsg(t(res.error) || res.error);
        return;
      }

      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } else {
      const res = login(phoneOrEmail, password);
      if (!res.success) {
        setErrorMsg(t(res.error) || res.error);
        return;
      }
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5 animate-fadeIn font-sans">
      {/* Backdrop */}
      <div 
        onClick={() => setIsLoginModalOpen(false)}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
      />

      {/* Main Container */}
      <div className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all my-6 max-h-[90vh] overflow-y-auto custom-scrollbar ${
        isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-[#F5FCF7] border-[#D2EBD7] text-slate-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-1.5 pb-4 border-b border-slate-200/70 dark:border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#047857] to-[#065F46] text-white flex items-center justify-center mx-auto shadow-md">
            <Landmark className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            KISAN VIGYAAN • Unified Access Portal
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Authorized portal for Government Officials, Agricultural Organisations & NGOs, and Farmers
          </p>
        </div>

        {/* Portal Role Tabs (4 Modes) */}
        <div className="mt-5 p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-900 border border-slate-300/60 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs font-black">
          <button
            type="button"
            onClick={() => { setActiveTab('officers'); setErrorMsg(null); }}
            className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'officers'
                ? 'bg-[#047857] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span className="truncate">🏛️ Govt. Officials</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('ngos'); setErrorMsg(null); }}
            className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'ngos'
                ? 'bg-[#047857] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span className="truncate">🤝 Orgs & NGOs</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('farmers'); setErrorMsg(null); }}
            className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'farmers'
                ? 'bg-[#047857] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span className="truncate">🌾 Farmers</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('manual'); setErrorMsg(null); }}
            className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'manual'
                ? 'bg-[#047857] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="truncate">🔑 Manual Login</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* TAB 1: GOVERNMENT OFFICIALS DIRECTORY LOGIN */}
        {activeTab === 'officers' && (
          <div className="mt-5 space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Verified Area Officers ({officerAccounts.length} Districts / Tehsils)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">1-Click Direct Access</span>
            </div>

            <div className="space-y-3">
              {officerAccounts.map((officer) => (
                <div
                  key={officer.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-emerald-500 shadow-xs ${
                    isDark ? 'bg-slate-900/90 border-[#182a4a]' : 'bg-white border-[#D2EBD7]'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#047857] to-[#065F46] text-white flex items-center justify-center text-2xl shadow-xs shrink-0">
                      {officer.avatar || '🧑‍🔬'}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {officer.name}
                        </strong>
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          {officer.govtId}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {officer.designation}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <strong className="text-slate-800 dark:text-slate-200">{officer.jurisdictionArea}</strong>
                        </span>
                      </div>

                      {/* Official Identifiers: Contract No, Mail ID, Aadhaar */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{officer.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <Mail className="w-2.5 h-2.5 text-emerald-600" />
                          <span className="truncate">{officer.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Aadhaar: <strong>{officer.aadharNumber || officer.aadharMasked}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleFastLogin(officer.id)}
                    className="py-2.5 px-4 rounded-xl font-black text-xs bg-[#047857] hover:bg-[#065F46] text-white shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 self-end sm:self-center"
                  >
                    <span>Login as Officer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: AGRICULTURAL ORGANISATIONS & NGOS DIRECTORY LOGIN */}
        {activeTab === 'ngos' && (
          <div className="mt-5 space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Agricultural Organisations & NGOs ({ngoAccounts.length} Clusters)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">1-Click Direct Access</span>
            </div>

            <div className="space-y-3">
              {ngoAccounts.map((ngo) => (
                <div
                  key={ngo.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-emerald-500 shadow-xs ${
                    isDark ? 'bg-slate-900/90 border-[#182a4a]' : 'bg-white border-[#D2EBD7]'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-emerald-700 text-white flex items-center justify-center text-2xl shadow-xs shrink-0">
                      {ngo.avatar || '🤝'}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {ngo.name}
                        </strong>
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase font-mono bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                          {ngo.govtId}
                        </span>
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800">
                          Reg: {ngo.orgRegId}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {ngo.designation} • Authorized Signatory: <strong className="text-slate-900 dark:text-white">{ngo.authorizedPerson}</strong>
                      </p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <strong className="text-slate-800 dark:text-slate-200">{ngo.jurisdictionArea}</strong>
                        </span>
                      </div>

                      {/* Official Identifiers: Contract No, Mail ID, Aadhaar */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{ngo.phone} {ngo.officePhone ? `(${ngo.officePhone})` : ''}</span>
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <Mail className="w-2.5 h-2.5 text-emerald-600" />
                          <span className="truncate">{ngo.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Aadhaar: <strong>{ngo.aadharNumber || ngo.aadharMasked}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleFastLogin(ngo.id)}
                    className="py-2.5 px-4 rounded-xl font-black text-xs bg-[#047857] hover:bg-[#065F46] text-white shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 self-end sm:self-center"
                  >
                    <span>Login as NGO/Org</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FARMER ACCOUNTS LOGIN */}
        {activeTab === 'farmers' && (
          <div className="mt-5 space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5" />
                <span>Registered Farmer Profiles ({farmerAccounts.length})</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">1-Click Direct Access</span>
            </div>

            <div className="space-y-3">
              {farmerAccounts.map((farmer) => (
                <div
                  key={farmer.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-emerald-500 shadow-xs ${
                    isDark ? 'bg-slate-900/90 border-[#182a4a]' : 'bg-white border-[#D2EBD7]'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center text-2xl shadow-xs shrink-0">
                      {farmer.avatar || '👨‍🌾'}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-sm font-black text-slate-900 dark:text-white">
                          {farmer.name}
                        </strong>
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {farmer.kisanCardNumber || 'PM-KISAN'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {farmer.village} • {farmer.crop} ({farmer.acreage})
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-500 pt-1">
                        <span>📞 {farmer.phone}</span>
                        <span>✉️ {farmer.email}</span>
                        <span>💳 Aadhaar: <strong>{farmer.aadharNumber || farmer.aadharMasked}</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleFastLogin(farmer.id)}
                    className="py-2.5 px-4 rounded-xl font-black text-xs bg-[#047857] hover:bg-[#065F46] text-white shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 self-end sm:self-center"
                  >
                    <span>Login as Farmer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MANUAL CREDENTIALS LOGIN */}
        {activeTab === 'manual' && (
          <form onSubmit={handleFormSubmit} className="mt-5 space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Govt/Org ID, Reg Code, Email, Phone, or Aadhaar Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. FPO-MH-SGL-01 / contact@sangliorganicfpo.in / 7742 8819 3341"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className={`w-full p-3 rounded-xl border font-bold focus:border-emerald-500 focus:outline-none ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#D2EBD7] text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="•••••••• (e.g. officer@123 or ngo@123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 rounded-xl border font-bold focus:border-emerald-500 focus:outline-none ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#D2EBD7] text-slate-900'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#047857] hover:bg-[#065F46] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 mt-2"
            >
              <span>Authenticate & Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
