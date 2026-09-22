import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  ArrowRight, 
  X, 
  Maximize2, 
  Minimize2, 
  Activity, 
  ShieldCheck, 
  HelpCircle, 
  Cpu, 
  Sprout, 
  Info,
  Sliders,
  Radio
} from 'lucide-react';
import { speakText, stopSpeech, isSpeaking } from '../../utils/speechUtils';
import { 
  generateChotaKissanResponse, 
  classifyAgriculturalIntent,
  SUPPORTED_LANGUAGES 
} from '../../services/chotaKissanEngine';

export const KisanChatBot = ({ 
  isWidget = false, 
  isOpen = true, 
  onClose, 
  onNavigate, 
  id = null, 
  embedded = false 
}) => {
  const { lang, theme, currentUser, activeTab, setActiveTab } = useApp();
  const isDark = theme === 'dark';

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [showSettings, setShowSettings] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initial welcome greeting localized
  const getGreeting = () => {
    switch (lang) {
      case 'mr':
        return "नमस्कार! मी तुमचा किसान एआय कृषी चॅटबॉट आहे. मला पिकांचे रोग, खते, फवारणी औषधे, हवामान किंवा शासकीय योजनांबद्दल विचारा. खालील ऑडिओ बटण दाबून उत्तर ऐकू शकता!";
      case 'hi':
        return "नमस्ते! मैं आपका किसान एआई कृषि चैटबॉट हूँ। मुझसे फसलों के रोग, कीटनाशक, उर्वरक, मौसम या सरकारी योजनाओं के बारे में पूछें। उत्तर सुनने के लिए नीचे दिए गए ऑडियो बटन पर क्लिक करें!";
      case 'ta':
        return "வணக்கம்! நான் உங்கள் கிசான் AI விவசாய சாட்போட். பயிர் நோய்கள், உரங்கள், பூச்சிக்கொல்லிகள், வானிலை அல்லது அரசு மானியங்கள் பற்றி என்னிடம் கேளுங்கள். பதிலை ஒலியாக கேட்க ஸ்பீக்கர் பட்டனை அழுத்தவும்!";
      case 'te':
        return "నమస్కారం! నేను మీ కిసాన్ AI వ్యవసాయ చాట్‌బాట్. పంట వ్యాధులు, మందులు, ఎరువులు మరియు వాతావరణం గురించి నన్ను అడగండి. సమాధానం వినడానికి స్పీకర్ బటన్ నొక్కండి!";
      case 'kn':
        return "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕಿಸಾನ್ AI ಕೃಷಿ ಚಾಟ್‌ಬಾಟ್. ಬೆಳೆ ರೋಗಗಳು, ಕೀಟನಾಶಕಗಳು, ರಸಗೊಬ್ಬರ ಮತ್ತು ಹವಾಮಾನದ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ. ಉತ್ತರ ಆಲಿಸಲು ಸ್ಪೀಕರ್ ಬಟನ್ ಒತ್ತಿ!";
      case 'en':
      default:
        return "Hello! I am your Kisan AI Agronomist Chatbot. Ask me about crop diseases, remedies, chemical dosages, soil sensors, or government schemes. Click the audio button on any answer to hear it read aloud with TTS!";
    }
  };

  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: getGreeting(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        { label: '🌾 Pearl Millet Downy Mildew', query: 'What fungicide cures downy mildew in pearl millet?' },
        { label: '🍅 Tomato Leaf Curl', query: 'How to control tomato leaf curl virus?' },
        { label: '💧 Irrigation & Sensor Telemetry', query: 'When should I irrigate my farm based on soil moisture sensors?' },
        { label: '🏛️ PM-Kisan Subsidy 2026', query: 'How do I check my PM-Kisan Samman Nidhi installment?' }
      ]
    }
  ]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Speech Recognition (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      const langCodes = {
        'mr': 'mr-IN',
        'hi': 'hi-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'kn': 'kn-IN',
        'en': 'en-IN'
      };
      recognition.lang = langCodes[lang] || 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage(transcript);
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is supported in Chrome, Edge, and Opera.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeech();
      setSpeakingMessageId(null);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('SpeechRecognition start error:', e);
      }
    }
  };

  // Toggle TTS for a specific message
  const handleToggleSpeak = (msgId, text) => {
    if (speakingMessageId === msgId) {
      stopSpeech();
      setSpeakingMessageId(null);
    } else {
      stopSpeech();
      setSpeakingMessageId(msgId);
      speakText(text, lang, {
        rate: speechRate,
        onStart: () => setSpeakingMessageId(msgId),
        onEnd: () => setSpeakingMessageId(null),
        onError: () => setSpeakingMessageId(null)
      });
    }
  };

  const handleCopyMessage = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    stopSpeech();
    setSpeakingMessageId(null);
    setMessages([
      {
        id: 'msg-reset-' + Date.now(),
        sender: 'bot',
        text: getGreeting(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          { label: '🌾 Pearl Millet Downy Mildew', query: 'What fungicide cures downy mildew in pearl millet?' },
          { label: '🍅 Tomato Leaf Curl', query: 'How to control tomato leaf curl virus?' },
          { label: '💧 Irrigation & Sensors', query: 'Should I irrigate today based on soil moisture?' },
          { label: '🏛️ Govt Schemes', query: 'How to apply for solar pump subsidy?' }
        ]
      }
    ]);
  };

  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    stopSpeech();
    setSpeakingMessageId(null);
    setInputMessage('');

    const userMsgId = 'user-' + Date.now();
    const newUserMsg = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    // Simulate smart agronomist thinking pause
    setTimeout(() => {
      const intent = classifyAgriculturalIntent(query);
      const botResponse = generateChotaKissanResponse({
        userQuery: query,
        detectedLang: lang,
        classifiedIntent: intent,
        farmContext: {
          crop: 'cotton',
          telemetry: {
            temp: 29.4,
            rh: 88.0,
            leafWetnessHours: 11.5,
            soilVWC: 68.0,
            soilPH: 7.4
          }
        }
      });

      const botMsgId = 'bot-' + Date.now();
      const newBotMsg = {
        id: botMsgId,
        sender: 'bot',
        text: botResponse.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButtons: botResponse.actionButtons,
        navigationTarget: botResponse.navigationTarget
      };

      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);

      // If autoSpeak toggle is enabled, read automatically
      if (autoSpeak) {
        setSpeakingMessageId(botMsgId);
        speakText(botResponse.responseText, lang, {
          rate: speechRate,
          onStart: () => setSpeakingMessageId(botMsgId),
          onEnd: () => setSpeakingMessageId(null),
          onError: () => setSpeakingMessageId(null)
        });
      }
    }, 450);
  };

  if (isWidget && !isOpen) return null;

  return (
    <div 
      id={id}
      className={`transition-all duration-300 ${
        isWidget 
          ? 'fixed bottom-5 right-5 z-50 w-full sm:w-[420px] max-w-[94vw] shadow-2xl rounded-3xl overflow-hidden border border-emerald-500/30' 
          : embedded
          ? 'w-full rounded-3xl overflow-hidden border shadow-sm ' + (isDark ? 'border-slate-800 bg-[#0a1120]' : 'border-emerald-200 bg-white')
          : 'w-full max-w-5xl mx-auto space-y-4 animate-fadeIn'
      } ${isDark ? 'bg-[#0b121e] text-slate-100' : 'bg-white text-slate-900'}`}>

      {/* HEADER BAR */}
      <div className={`p-4 flex items-center justify-between border-b ${
        isDark ? 'bg-[#0f1828] border-slate-800' : 'bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white border-emerald-700'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black tracking-tight text-white">
                {lang === 'mr' ? 'किसान एआय कृषी चॅटबॉट' : lang === 'ta' ? 'கிசான் AI வேளாண் சாட்போட்' : lang === 'hi' ? 'किसान एआई कृषि चैटबॉट' : 'Kisan AI Agronomist Chatbot'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-white">
                TTS Voice Active
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/80 font-medium">
              Multilingual Agricultural Voice & Text Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-white">
          {/* TTS Auto-Speak Toggle */}
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`px-2 py-1 rounded-xl text-[10px] font-mono font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
              autoSpeak ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white/10 hover:bg-white/20 text-white/80 border-white/20'
            }`}
            title="Toggle Auto-Speak TTS responses"
          >
            {autoSpeak ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            <span className="hidden sm:inline">Auto-TTS</span>
          </button>

          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1.5 rounded-xl hover:bg-white/20 transition-colors cursor-pointer ${
              showSettings ? 'bg-white/30 text-white' : 'text-white/80'
            }`}
            title="Chatbot TTS Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Reset Chat */}
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {isWidget && (
            <>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  stopSpeech();
                  setSpeakingMessageId(null);
                  if (onClose) onClose();
                }}
                className="p-1.5 rounded-xl hover:bg-rose-500/30 text-white hover:text-rose-200 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* TTS SETTINGS PANEL (EXPANDABLE) */}
          {showSettings && (
            <div className={`p-3 border-b text-xs space-y-2 animate-fadeIn ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>TTS Voice Playback Speed:</span>
                </span>
                <div className="flex gap-1.5">
                  {[0.8, 0.95, 1.15].map(rate => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                        speechRate === rate 
                          ? 'bg-emerald-600 text-white' 
                          : isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Active Regional Dialect: <strong>{SUPPORTED_LANGUAGES[lang]?.name || 'English'} ({SUPPORTED_LANGUAGES[lang]?.code || 'en-IN'})</strong>
                </span>
                <span className="text-[10px] text-emerald-600 font-bold font-mono">
                  Web Speech API Active
                </span>
              </div>
            </div>
          )}

          {/* CHAT MESSAGES CONTAINER */}
          <div className={`p-4 sm:p-5 overflow-y-auto space-y-3.5 ${
            isWidget 
              ? 'h-[360px] sm:h-[420px]' 
              : embedded
              ? 'h-[360px] sm:h-[400px]'
              : 'h-[520px] rounded-3xl border ' + (isDark ? 'border-slate-800 bg-[#090f1a]' : 'border-slate-200 bg-slate-50/50')
          }`}>
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              const isCurrentlySpeaking = speakingMessageId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1.5 animate-fadeIn`}
                >
                  {/* Sender & Timestamp */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 px-1">
                    <span>{isBot ? '🤖 Kisan AI' : '👨‍🌾 You'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Bubble */}
                  <div className={`p-4 rounded-3xl max-w-[90%] sm:max-w-[85%] text-xs sm:text-sm font-medium leading-relaxed shadow-sm relative group ${
                    isBot
                      ? isDark 
                        ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-sm' 
                        : 'bg-white border border-emerald-200/80 text-slate-900 rounded-tl-sm'
                      : 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white rounded-tr-sm shadow-emerald-950/20'
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Bot Message Bottom Action Strip (TTS + Copy + Action Chips) */}
                    {isBot && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                        {/* Audio TTS Button */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleSpeak(msg.id, msg.text)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 border ${
                              isCurrentlySpeaking
                                ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500 animate-pulse ring-2 ring-rose-400/40'
                                : isDark
                                ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-emerald-700/60'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                            }`}
                            title={isCurrentlySpeaking ? "Stop audio" : "Listen to answer with Text-to-Speech"}
                          >
                            {isCurrentlySpeaking ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5 text-white" />
                                <span>{lang === 'mr' ? 'थांबवा' : lang === 'ta' ? 'நிறுத்து' : 'Stop'}</span>
                                <span className="flex gap-0.5 items-end h-2.5 ml-0.5">
                                  <span className="w-1 bg-white animate-bounce h-2 rounded-full"></span>
                                  <span className="w-1 bg-white animate-bounce h-3 rounded-full" style={{ animationDelay: '0.15s' }}></span>
                                  <span className="w-1 bg-white animate-bounce h-1.5 rounded-full" style={{ animationDelay: '0.3s' }}></span>
                                </span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>{lang === 'mr' ? 'ऐका (TTS)' : lang === 'ta' ? 'கேட்க (TTS)' : 'Listen (TTS)'}</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Copy text"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Interactive Navigation Action Buttons */}
                        {msg.actionButtons && msg.actionButtons.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {msg.actionButtons.map((btn, bIdx) => (
                              <button
                                key={bIdx}
                                onClick={() => {
                                  if (btn.target && onNavigate) {
                                    onNavigate(btn.target);
                                    if (isWidget && onClose) onClose();
                                  } else if (btn.query) {
                                    handleSendMessage(btn.query);
                                  }
                                }}
                                className="px-2.5 py-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <span>{btn.label}</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pre-configured Initial Suggestion Chips */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold block">
                          Suggested Topics:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSendMessage(sug.query)}
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                                isDark 
                                  ? 'bg-slate-800 hover:bg-emerald-950 text-slate-200 border-slate-700 hover:border-emerald-500/50' 
                                  : 'bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
                              }`}
                            >
                              {sug.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 p-3.5 rounded-2xl max-w-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 animate-pulse">
                <Bot className="w-4 h-4 text-emerald-500" />
                <span>Kisan AI is analyzing agronomic knowledge...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BAR */}
          <div className={`p-3.5 border-t ${
            isDark ? 'bg-[#0f1828] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    lang === 'mr' 
                      ? 'पिके, रोग, औषध फवारणी किंवा खताबद्दल विचारा...' 
                      : lang === 'ta' 
                      ? 'பயிர்கள், நோய்கள் அல்லது மருந்துகள் பற்றி கேட்கவும்...' 
                      : lang === 'hi'
                      ? 'फसल, रोग, कीटनाशक या खाद के बारे में पूछें...'
                      : 'Ask about crop diseases, remedies, dosage, weather...'
                  }
                  className={`w-full py-2.5 pl-4 pr-10 rounded-2xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Voice Input Mic Button */}
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse ring-2 ring-rose-400/40'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border-slate-300'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Click to speak via voice input'}
              >
                {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className={`p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer shadow-md active:scale-95 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed`}
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}

    </div>
  );
};
