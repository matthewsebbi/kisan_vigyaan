import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  X, 
  Check, 
  Plus, 
  LogOut, 
  Trash2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  Phone,
  MapPin,
  Sprout,
  Landmark,
  Mail,
  CreditCard
} from 'lucide-react';

export const AccountSwitcherModal = () => {
  const {
    accounts,
    activeUserId,
    currentUser,
    switchAccount,
    removeAccount,
    logout,
    isAccountSwitcherOpen,
    setIsAccountSwitcherOpen,
    setIsLoginModalOpen,
    theme,
    lang,
    t
  } = useApp();

  const isDark = theme === 'dark';

  if (!isAccountSwitcherOpen) return null;

  const handleAddNewAccount = () => {
    setIsAccountSwitcherOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleLogoutSession = () => {
    logout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5 animate-fadeIn font-sans">
      {/* Backdrop */}
      <div 
        onClick={() => setIsAccountSwitcherOpen(false)}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-xl rounded-3xl p-6 sm:p-7 shadow-2xl border transition-all my-6 max-h-[90vh] overflow-y-auto custom-scrollbar ${
        isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-[#F5FCF7] border-[#D2EBD7] text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {t('accountSwitcher', 'Switch Account / Officer Portal')}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                {t('savedAccountsOnDevice', 'Saved Profiles on this Device')} ({accounts.length} Profiles)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountSwitcherOpen(false)}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Account Card */}
        <div className="pt-4 pb-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono block mb-2">
            ● {t('currentActiveSession', 'Current Active Session')}
          </span>
          <div className={`p-4 rounded-2xl border-2 border-emerald-500 flex items-center justify-between gap-3 shadow-md ${
            isDark ? 'bg-emerald-950/30' : 'bg-emerald-50/90'
          }`}>
            <div className="flex items-start space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#047857] to-[#065F46] text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                {currentUser.avatar || '👨‍🌾'}
              </div>
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                    {currentUser.name}
                  </h3>
                  <span className={`px-2 py-0.2 rounded-full text-[9px] font-black uppercase font-mono ${
                    currentUser.role === 'officer' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300' 
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                  }`}>
                    {currentUser.govtId || (currentUser.role === 'officer' ? 'Agri Officer' : 'Farmer')}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {currentUser.designation || currentUser.crop || 'Registered Account'}
                </p>
                <div className="flex flex-wrap items-center gap-x-2 text-[10px] font-mono text-slate-600 dark:text-slate-400 pt-0.5">
                  <span>📞 {currentUser.phone}</span>
                  <span>•</span>
                  <span>✉️ {currentUser.email}</span>
                  <span>•</span>
                  <span>💳 Aadhaar: <strong>{currentUser.aadharNumber || currentUser.aadharMasked || 'XXXX-XXXX-4891'}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <button
                onClick={() => removeAccount(currentUser.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                title="Remove Account"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Other Saved Profiles List */}
        <div className="py-3 space-y-2.5 max-h-72 overflow-y-auto custom-scrollbar pr-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 font-mono block">
            Switch to Another Profile:
          </span>

          {accounts
            .filter(a => a.id !== activeUserId)
            .map(acc => (
              <div
                key={acc.id}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-emerald-400 ${
                  isDark ? 'bg-slate-900/80 border-[#182a4a]' : 'bg-white border-[#D2EBD7]'
                }`}
              >
                <div 
                  onClick={() => switchAccount(acc.id)}
                  className="flex items-start space-x-3 cursor-pointer flex-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl shrink-0">
                    {acc.avatar || '👨‍🌾'}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <strong className="text-xs font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {acc.name}
                      </strong>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold font-mono">
                        {acc.govtId || acc.role}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">
                      {acc.designation || acc.jurisdictionArea || acc.village || acc.location}
                    </span>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-500 pt-0.5">
                      <span>📞 {acc.phone}</span>
                      <span>•</span>
                      <span>✉️ {acc.email}</span>
                      <span>•</span>
                      <span>Aadhaar: <strong>{acc.aadharNumber || acc.aadharMasked}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => switchAccount(acc.id)}
                    className="px-3.5 py-1.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-black rounded-xl shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    {t('switch', 'Switch')}
                  </button>

                  <button
                    onClick={() => removeAccount(acc.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                    title={t('removeSavedAccount', 'Remove Account')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Action Buttons: Add Account & Logout Session */}
        <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 space-y-2.5">
          <button
            onClick={handleAddNewAccount}
            className="w-full py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-dashed border-[#D2EBD7] dark:border-slate-700 hover:border-emerald-500 text-xs font-black text-emerald-800 dark:text-emerald-400 flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{t('loginAnotherAccount', 'Open Government Officials Portal & Login')}</span>
          </button>

          <button
            onClick={handleLogoutSession}
            className="w-full py-2.5 rounded-2xl text-xs font-black text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout', 'Sign Out of Active Session')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
