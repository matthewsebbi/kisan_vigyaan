import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WebLeftSidebar } from './components/layout/WebLeftSidebar';
import { WebTopHeader } from './components/layout/WebTopHeader';
import { WebBottomNav } from './components/layout/WebBottomNav';
import { KisanLiveBackground } from './components/layout/KisanLiveBackground';
import { LanguageModal } from './components/layout/LanguageModal';
import { CartCheckoutModal } from './components/market/CartCheckoutModal';
import { AccountSwitcherModal } from './components/auth/AccountSwitcherModal';
import { LoginPage } from './components/auth/LoginPage';
import { EmergencySMSToast } from './components/common/EmergencySMSToast';

// Farmer Views
import { WebFarmerHomeScreen } from './components/web/WebFarmerHomeScreen';
import { WebFarmerScanner } from './components/web/WebFarmerScanner';
import { WebFarmerAlerts } from './components/web/WebFarmerAlerts';
import { WebFarmerMarket } from './components/web/WebFarmerMarket';
import { FarmerCropSellPortal } from './components/market/FarmerCropSellPortal';
import { LiveESP32TelemetryPanel } from './components/telemetry/LiveESP32TelemetryPanel';
import { WebFarmerMoreMenu } from './components/web/WebFarmerMoreMenu';

// Agri Officer Dashboard
import { OfficerDashboard } from './components/officer/OfficerDashboard';

// Advanced GIS Satellite Mapping
import { WebGISCommandMap } from './components/satellite/WebGISCommandMap';

// Sub-modules accessible via More Menu
import { ProAgronomyTips } from './components/protips/ProAgronomyTips';
import { GovtSchemes } from './components/schemes/GovtSchemes';
import { StatisticsTrends } from './components/statistics/StatisticsTrends';
import { FarmerCommunity } from './components/community/FarmerCommunity';
import { MyReports } from './components/farmer/MyReports';
import { RiskThreatsConsequences } from './components/risk/RiskThreatsConsequences';
import { EnvironmentalPredictionDashboard } from './components/prediction/EnvironmentalPredictionDashboard';
import { YieldROICalculator } from './components/calculator/YieldROICalculator';
import { ChotaKissanModal } from './components/voice/ChotaKissanModal';
import { ChotaKissanDashboardView } from './components/voice/ChotaKissanDashboardView';
import { KisanChatBot } from './components/chat/KisanChatBot';
import { ArrowLeft, Layers, Mic, Bot } from 'lucide-react';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CropShield App Crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#080D1A', color: '#F8FAFC', padding: '2rem', fontFamily: 'sans-serif' }}>
          <div style={{ maxWidth: '600px', width: '100%', background: '#0F1A2E', border: '1px solid #E11D48', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <h2 style={{ color: '#FB7185', fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>⚠️ Application Render Error</h2>
            <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: '1rem' }}>An unexpected error occurred while rendering the view. Click the button below to reload.</p>
            <pre style={{ background: '#050B14', padding: '1rem', borderRadius: '8px', overflow: 'auto', fontSize: '0.75rem', color: '#F43F5E', border: '1px solid #334155' }}>
              {this.state.error?.message || String(this.state.error)}
            </pre>
            <button 
              onClick={() => { window.location.href = window.location.origin; }} 
              style={{ marginTop: '1.5rem', background: '#10B981', color: '#FFFFFF', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🔄 Reload CropShield
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainAppShell() {
  const { 
    theme, 
    lang, 
    role, 
    activeTab, 
    setActiveTab, 
    isChotaKissanOpen, 
    setIsChotaKissanOpen,
    isChatbotOpen,
    setIsChatbotOpen,
    isLoggedIn 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  // FIRST PAGE ENCOUNTER: If farmer/officer is not logged in, show the Login/Registration portal
  if (!isLoggedIn) {
    return <LoginPage isModal={false} />;
  }

  const isSubView = ['chatbot', 'proTips', 'govtSchemes', 'statistics', 'satelliteMapping', 'farmerCommunity', 'reports', 'riskConsequences', 'environmentalPrediction', 'chotaKissan', 'roiCalculator'].includes(activeTab);

  const getSubViewTitle = () => {
    switch (activeTab) {
      case 'chatbot': return lang === 'ta' ? 'கிசான் AI வேளாண் சாட்போட் (TTS)' : lang === 'mr' ? 'किसान एआय कृषी चॅटबॉट (TTS)' : 'Kisan AI Agronomist Chatbot (TTS Voice)';
      case 'roiCalculator': return lang === 'ta' ? 'வருவாய் மற்றும் லாப கால்குலேட்டர்' : lang === 'mr' ? 'उत्पन्न आणि नफा कॅल्क्युलेटर' : 'Dynamic Yield & ROI Calculator';
      case 'chotaKissan': return lang === 'ta' ? 'கிசான் ஒன் (AI குரல் உதவியாளர்)' : lang === 'mr' ? 'किसान वन (एआय आवाज सहाय्यक)' : 'Kisan One AI Voice Assistant';
      case 'environmentalPrediction': return lang === 'ta' ? 'சுற்றுச்சூழல் நோய் முன்கணிப்பு இயந்திரம்' : lang === 'mr' ? 'हवामान आधारित पीक रोग अंदाज प्रणाली' : 'AI Environmental Disease Prediction Engine';
      case 'riskConsequences': return lang === 'ta' ? 'அபாயங்கள் & பயிர் பாதிப்பு விளைவுகள்' : lang === 'mr' ? 'जोखीम, मर्यादा काळ व पिकांवरील परिणाम' : 'Risk & Threats Consequences Matrix';
      case 'satelliteMapping': return lang === 'ta' ? 'இஸ்ரோ செயற்கைக்கோள் வரைபடம்' : lang === 'mr' ? 'इस्रो / सेंटिनेल-२ उपग्रह पीक नकाशा' : 'Sentinel-2 GIS Satellite Command Center';
      case 'proTips': return lang === 'ta' ? 'விவசாய வல்லுநர் குறிப்புகள்' : lang === 'mr' ? 'तज्ज्ञ कृषी सल्ला व खत वेळापत्रक' : 'Pro Agronomy Tips & Dosage Matrix';
      case 'govtSchemes': return lang === 'ta' ? 'அரசு திட்டங்கள் & மானியங்கள்' : lang === 'mr' ? 'शासकीय योजना व डीबीटी अनुदान' : 'Govt. Schemes & DBT Subsidies';
      case 'statistics': return lang === 'ta' ? 'பருவநிலை புள்ளிவிவரங்கள்' : lang === 'mr' ? 'विभागीय रोग आकडेवारी व कल' : 'Regional Disease Surveillance & Trends';
      case 'farmerCommunity': return lang === 'ta' ? 'விவசாயிகள் மன்றம்' : lang === 'mr' ? 'शेतकरी मंच व कृषी अधिकारी संवाद' : 'Farmer Community & Extension Q&A';
      case 'reports': return lang === 'ta' ? 'கள ஆய்வு அறிக்கைகள்' : lang === 'mr' ? 'माझे शेत अहवाल व मृदा पत्रिका' : 'My Field Reports & Soil Health Cards';
      default: return 'Reference';
    }
  };

  return (
    <div className={`relative min-h-screen font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#080D1A] text-slate-100' : 'bg-[#F8FAF9] text-[#0B1C30]'
    }`}>
      
      {/* Live Animated Kisan Agricultural Background */}
      <KisanLiveBackground />

      {/* 1. Left Hand Side Navigation Sidebar */}
      <WebLeftSidebar 
        activeTab={activeTab} 
        onNavigate={setActiveTab} 
        mobileOpen={mobileMenuOpen} 
        setMobileOpen={setMobileMenuOpen} 
      />

      {/* Global Modals */}
      <LanguageModal />
      <CartCheckoutModal />
      <AccountSwitcherModal />
      <LoginPage isModal={true} />
      <EmergencySMSToast />

      {/* 2. Main Content Viewport (Pushed right by sidebar width on desktop) */}
      <div className="lg:pl-64 flex flex-col min-h-screen min-w-0 transition-all duration-300">
        
        {/* Top Header */}
        <WebTopHeader 
          activeTab={activeTab} 
          onNavigate={setActiveTab} 
          onOpenMobileMenu={() => setMobileMenuOpen(true)} 
        />

        {/* Sub-View Back Navigation Bar (Only for Farmer Sub-Views) */}
        {role === 'farmer' && isSubView && (
          <div className={`relative z-20 border-b transition-colors ${
            isDark ? 'bg-[#0A1324]/90 border-[#16233B] text-slate-200' : 'bg-white/90 border-slate-200 text-[#0B1C30]'
          } backdrop-blur-xs`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('more')}
                className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 hover:underline cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>{lang === 'ta' ? '← கூடுதல் மெனுவிற்கு திரும்புக' : lang === 'mr' ? 'मागे जा (अधिक मेनू)' : 'Back to More Menu'}</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
                <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{getSubViewTitle()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Viewport Container (Clean Minimalist Canvas) */}
        <main className="relative z-10 flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
            {/* If Active Role is Officer or NGO Partner, Render Command Center or Advanced Tools */}
            {(role === 'officer' || role === 'ngo') ? (
              activeTab === 'chatbot' ? (
                <KisanChatBot isWidget={false} onNavigate={setActiveTab} />
              ) : activeTab === 'chotaKissan' ? (
                <ChotaKissanDashboardView />
              ) : activeTab === 'environmentalPrediction' ? (
                <EnvironmentalPredictionDashboard />
              ) : activeTab === 'riskConsequences' ? (
                <RiskThreatsConsequences />
              ) : activeTab === 'satelliteMapping' ? (
                <WebGISCommandMap onNavigate={setActiveTab} />
              ) : activeTab === 'statistics' ? (
                <StatisticsTrends />
              ) : activeTab === 'farmerCommunity' ? (
                <FarmerCommunity />
              ) : (
                <OfficerDashboard />
              )
            ) : (
              /* Farmer Core Views & Sub-Views */
              <>
                {activeTab === 'home' && <WebFarmerHomeScreen onNavigate={setActiveTab} />}
                {activeTab === 'scan' && <WebFarmerScanner onNavigate={setActiveTab} />}
                {activeTab === 'cropSell' && <FarmerCropSellPortal onNavigate={setActiveTab} />}
                {activeTab === 'market' && <WebFarmerMarket onNavigate={setActiveTab} />}
                {activeTab === 'alerts' && <WebFarmerAlerts onNavigate={setActiveTab} />}
                {activeTab === 'more' && <WebFarmerMoreMenu onNavigate={setActiveTab} />}

                {/* Reference Sub-Views from More Menu */}
                {activeTab === 'chatbot' && <KisanChatBot isWidget={false} onNavigate={setActiveTab} />}
                {activeTab === 'esp32LiveData' && <LiveESP32TelemetryPanel />}
                {activeTab === 'chotaKissan' && <ChotaKissanDashboardView />}
                {activeTab === 'environmentalPrediction' && <EnvironmentalPredictionDashboard />}
                {activeTab === 'roiCalculator' && <YieldROICalculator />}
                {activeTab === 'riskConsequences' && <RiskThreatsConsequences />}
                {activeTab === 'satelliteMapping' && <WebGISCommandMap onNavigate={setActiveTab} />}
                {activeTab === 'proTips' && <ProAgronomyTips />}
                {activeTab === 'govtSchemes' && <GovtSchemes />}
                {activeTab === 'statistics' && <StatisticsTrends />}
                {activeTab === 'farmerCommunity' && <FarmerCommunity />}
                {activeTab === 'reports' && <MyReports />}
              </>
            )}
          </div>
        </main>

        {/* Global Floating AI Voice Bot Trigger Button (Bottom-Right) */}
        <div className="fixed bottom-20 lg:bottom-6 right-5 z-40">
          <button
            onClick={() => setIsChatbotOpen(prev => !prev)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 border border-emerald-400/40 cursor-pointer"
            aria-label="Open Kisan AI Live Voice Assistant"
          >
            {/* Ambient Pulse Ring */}
            <span className="absolute -inset-1 rounded-full bg-emerald-500/25 blur-xs animate-ping group-hover:opacity-100 opacity-60 pointer-events-none" />
            
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shadow-xs shrink-0">
              <Mic className="w-4 h-4 text-emerald-300 animate-pulse" />
            </div>
            
            <span className="text-xs font-bold tracking-tight pr-1 flex items-center gap-1.5">
              <span>Kisan AI Voice</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            </span>
          </button>
        </div>

        {/* Global Floating Kisan Chatbot Drawer / Widget */}
        <KisanChatBot 
          isWidget={true} 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)} 
          onNavigate={setActiveTab} 
        />

        {/* Global Chota Kissan Voice Assistant Modal */}
        <ChotaKissanModal 
          isOpen={isChotaKissanOpen} 
          onClose={() => setIsChotaKissanOpen(false)} 
          onNavigate={setActiveTab} 
        />

        {/* Responsive Mobile Bottom Navigation Bar (Active on Mobile < 1024px) */}
        {role === 'farmer' && (
          <div className="lg:hidden relative z-40">
            <WebBottomNav activeTab={isSubView ? 'more' : activeTab} onTabChange={setActiveTab} />
          </div>
        )}

      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <AppProvider>
        <MainAppShell />
      </AppProvider>
    </AppErrorBoundary>
  );
}
