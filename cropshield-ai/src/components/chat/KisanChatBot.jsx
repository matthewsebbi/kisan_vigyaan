import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Radio,
  Sliders,
  MessageSquare,
  Layers,
  Globe,
  RefreshCw,
  Cpu,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { speakText, stopSpeech, isSpeaking } from '../../utils/speechUtils';
import { 
  SUPPORTED_LANGUAGES 
} from '../../services/chotaKissanEngine';
import { 
  generateGroqChatReply, 
  PRIMARY_GROQ_MODEL 
} from '../../services/groqChatService';
import { 
  whisperRecorder, 
  transcribeWithWhisper, 
  getGroqApiKey, 
  isWhisperAvailable 
} from '../../services/whisperService';
import { VoiceOrbVisualizer } from './VoiceOrbVisualizer';

export const KisanChatBot = ({ 
  isWidget = false, 
  isOpen = true, 
  onClose, 
  onNavigate, 
  id = null, 
  embedded = false 
}) => {
  const { lang, setLang, theme, currentUser, activeTab, setActiveTab } = useApp();
  const isDark = theme === 'dark';

  // UI Modes: 'liveVoice' (Gemini Live / Siri Orb) | 'transcript' (Full chat history)
  const [viewMode, setViewMode] = useState('liveVoice');
  
  // Voice Assistant State: 'idle' | 'listening' | 'thinking' | 'speaking'
  const [voiceState, setVoiceState] = useState('idle');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [liveBotReply, setLiveBotReply] = useState('');
  const [statusPrompt, setStatusPrompt] = useState('');
  const [handsFreeLoop, setHandsFreeLoop] = useState(true);
  
  // Standard chat states
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [showSettings, setShowSettings] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeVoiceLang, setActiveVoiceLang] = useState(lang || 'en');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const isMountedRef = useRef(true);

  // Sync activeVoiceLang with global AppContext lang
  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES[lang]) {
      setActiveVoiceLang(lang);
    }
  }, [lang]);

  // Initial welcome greeting localized
  const getGreeting = useCallback(() => {
    switch (activeVoiceLang) {
      case 'mr':
        return "नमस्कार! मी तुमचा किसान एआय व्हॉईस असिस्टंट आहे. पिकांचे रोग, खतांचे प्रमाण, हवामान किंवा शासकीय योजनांबद्दल मला थेट बोलून विचारा!";
      case 'hi':
        return "नमस्ते! मैं आपका किसान एआई वॉइस असिस्टेंट हूँ। फसलों के रोग, कीटनाशक, मौसम या सरकारी योजनाओं के बारे में मुझसे बोलकर पूछें!";
      case 'ta':
        return "வணக்கம்! நான் உங்கள் கிசான் AI குரல் உதவியாளர். பயிர் நோய்கள், உரங்கள், பூச்சிக்கொல்லிகள் அல்லது வானிலை பற்றி என்னிடம் பேசுங்கள்!";
      case 'te':
        return "నమస్కారం! నేను మీ కిసాన్ AI వాయిస్ అసిస్టెంట్. పంటల వ్యాధులు, మందులు మరియు ఎరువుల గురించి నాతో మాట్లాడండి!";
      case 'kn':
        return "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕಿಸಾನ್ AI ವಾಯ್ಸ್ ಸಹಾಯಕ. ಬೆಳೆ ರೋಗಗಳು ಮತ್ತು ರಸಗೊಬ್ಬರಗಳ ಬಗ್ಗೆ ನನ್ನೊಂದಿಗೆ ಮಾತನಾಡಿ!";
      case 'en':
      default:
        return "Hello! I am Kisan AI, your live agronomist voice assistant. Tap the Voice Orb or speak naturally to ask about crop diseases, remedies, soil sensors, or government schemes.";
    }
  }, [activeVoiceLang]);

  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: getGreeting(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        { label: '🌾 Pearl Millet Downy Mildew', query: 'What fungicide cures downy mildew in pearl millet?' },
        { label: '🍅 Tomato Leaf Curl', query: 'How to control tomato leaf curl virus?' },
        { label: '💧 Irrigation & Sensors', query: 'When should I irrigate my farm based on soil moisture sensors?' },
        { label: '🏛️ PM-Kisan Installment', query: 'How do I check my PM-Kisan Samman Nidhi installment?' }
      ]
    }
  ]);

  // Cleanup audio & speech on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      stopSpeech();
      if (whisperRecorder && whisperRecorder.isRecording) {
        whisperRecorder.cancelRecording();
      }
    };
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (viewMode === 'transcript') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, viewMode]);

  // ─── Browser Web Speech API fallback setup ───
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
        'gu': 'gu-IN',
        'bn': 'bn-IN',
        'pa': 'pa-IN',
        'ml': 'ml-IN',
        'en': 'en-IN'
      };
      recognition.lang = langCodes[activeVoiceLang] || 'en-IN';

      recognition.onstart = () => {
        setVoiceState('listening');
        setStatusPrompt('Listening to your voice... (Speak now)');
      };
      recognition.onend = () => {
        if (voiceState === 'listening') {
          setVoiceState('idle');
          setStatusPrompt('');
        }
      };
      recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e);
        setVoiceState('idle');
        setStatusPrompt('');
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setLiveTranscript(transcript);
          handleExecuteVoiceQuery(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [activeVoiceLang]);

  // ─── EXECUTE AGRONOMIST QUERY (Groq LPU + Context) ───
  const handleExecuteVoiceQuery = async (queryText) => {
    if (!queryText || !queryText.trim()) {
      setVoiceState('idle');
      return;
    }

    const cleanQuery = queryText.trim();
    setLiveTranscript(cleanQuery);
    setVoiceState('thinking');
    setStatusPrompt('Groq Whisper & LPU Agronomist reasoning...');
    setIsTyping(true);

    const userMsgId = 'user-' + Date.now();
    const newUserMsg = {
      id: userMsgId,
      sender: 'user',
      text: cleanQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);

    try {
      // Dynamic agronomic reply powered by Groq GPT-OSS / Llama 3.3
      const botResponse = await generateGroqChatReply({
        query: cleanQuery,
        lang: activeVoiceLang,
        conversationHistory: [...messages, newUserMsg],
        farmContext: {
          platform: 'CropShield AI (Kisan Vigyaan)',
          crop: 'cotton',
          telemetry: {
            temp: 29.4,
            rh: 88.0,
            leafWetnessHours: 11.5,
            soilVWC: 68.0,
            soilPH: 7.4
          }
        },
        isVoiceMode: true
      });

      if (!isMountedRef.current) return;

      const botMsgId = 'bot-' + Date.now();
      const newBotMsg = {
        id: botMsgId,
        sender: 'bot',
        text: botResponse.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButtons: botResponse.actionButtons,
        source: botResponse.source || PRIMARY_GROQ_MODEL
      };

      setMessages(prev => [...prev, newBotMsg]);
      setLiveBotReply(botResponse.text);
      setIsTyping(false);

      // Playback response via TTS
      setVoiceState('speaking');
      setStatusPrompt('Kisan AI is speaking... (Tap orb to interrupt)');
      setSpeakingMessageId(botMsgId);

      speakText(botResponse.text, activeVoiceLang, {
        rate: speechRate,
        onStart: () => {
          if (isMountedRef.current) {
            setVoiceState('speaking');
          }
        },
        onEnd: () => {
          if (!isMountedRef.current) return;
          setSpeakingMessageId(null);
          setVoiceState('idle');
          setStatusPrompt('');

          // Hands-free turn-taking loop: automatically listen again if enabled
          if (handsFreeLoop && viewMode === 'liveVoice') {
            setTimeout(() => {
              if (isMountedRef.current && voiceState !== 'speaking') {
                handleStartListening();
              }
            }, 750);
          }
        },
        onError: () => {
          if (isMountedRef.current) {
            setSpeakingMessageId(null);
            setVoiceState('idle');
            setStatusPrompt('');
          }
        }
      });
    } catch (err) {
      console.error('Error generating voice response:', err);
      if (isMountedRef.current) {
        setIsTyping(false);
        setVoiceState('idle');
        setStatusPrompt('Error generating advisory. Please tap to try again.');
      }
    }
  };

  // ─── START VOICE LISTENING (Groq Whisper with Web Speech Fallback) ───
  const handleStartListening = async () => {
    stopSpeech();
    setSpeakingMessageId(null);

    const apiKey = getGroqApiKey();

    // Prefer high-accuracy Groq Whisper Large-v3 with MediaRecorder
    if (apiKey && isWhisperAvailable() && navigator.mediaDevices?.getUserMedia) {
      try {
        setVoiceState('listening');
        setStatusPrompt('Listening to your voice... (Speak now)');
        setLiveTranscript('');

        const started = await whisperRecorder.startRecording(
          // On silence detected (VAD):
          async () => {
            if (!isMountedRef.current) return;
            await handleStopWhisperAndProcess();
          },
          // Volume level callback for visualizer:
          null
        );

        if (!started) {
          throw new Error('Could not access microphone');
        }
        return;
      } catch (err) {
        console.warn('Whisper recorder error, falling back to Web Speech API:', err);
      }
    }

    // Fallback to Web Speech API
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setVoiceState('listening');
      } catch (e) {
        console.warn('SpeechRecognition start error:', e);
      }
    } else {
      alert("Microphone speech recognition is not supported on this browser. Please use Chrome, Edge, or Opera.");
      setVoiceState('idle');
    }
  };

  // ─── STOP WHISPER & TRANSCRIBE ───
  const handleStopWhisperAndProcess = async () => {
    setVoiceState('thinking');
    setStatusPrompt('Transcribing with Groq Whisper Large-v3...');

    const { blob } = await whisperRecorder.stopRecording();
    const apiKey = getGroqApiKey();

    if (!blob || blob.size < 1000) {
      setVoiceState('idle');
      setStatusPrompt('No audio detected. Tap orb to try again.');
      return;
    }

    try {
      const transcription = await transcribeWithWhisper(blob, apiKey, activeVoiceLang);

      if (transcription && transcription.text && transcription.text.trim()) {
        const spokenText = transcription.text.trim();
        setLiveTranscript(spokenText);
        
        // Auto-switch dialect if Whisper detected another supported language
        if (transcription.detectedLang && SUPPORTED_LANGUAGES[transcription.detectedLang]) {
          setActiveVoiceLang(transcription.detectedLang);
        }

        await handleExecuteVoiceQuery(spokenText);
      } else {
        setVoiceState('idle');
        setStatusPrompt('Could not clearly understand speech. Please try again.');
      }
    } catch (e) {
      console.error('Whisper transcription error:', e);
      setVoiceState('idle');
      setStatusPrompt('Transcription failed. Tap to try again.');
    }
  };

  // ─── ORB CLICK INTERACTION (TAP TO TALK / INTERRUPT) ───
  const handleOrbClick = () => {
    if (voiceState === 'speaking') {
      // Tap to interrupt: immediately cancel bot speech and listen to farmer
      stopSpeech();
      setSpeakingMessageId(null);
      handleStartListening();
    } else if (voiceState === 'listening') {
      // Tap to finish speaking: trigger immediate transcription
      if (whisperRecorder && whisperRecorder.isRecording) {
        handleStopWhisperAndProcess();
      } else if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else if (voiceState === 'thinking') {
      // Tap while thinking: cancel
      stopSpeech();
      if (whisperRecorder && whisperRecorder.isRecording) {
        whisperRecorder.cancelRecording();
      }
      setVoiceState('idle');
      setStatusPrompt('');
    } else {
      // Idle: start listening
      handleStartListening();
    }
  };

  // ─── MANUAL TEXT SEND HANDLER ───
  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    stopSpeech();
    setSpeakingMessageId(null);
    setInputMessage('');
    await handleExecuteVoiceQuery(query);
  };

  // Toggle TTS for a specific message in transcript
  const handleToggleSpeak = (msgId, text) => {
    if (speakingMessageId === msgId) {
      stopSpeech();
      setSpeakingMessageId(null);
      setVoiceState('idle');
    } else {
      stopSpeech();
      setSpeakingMessageId(msgId);
      setVoiceState('speaking');
      speakText(text, activeVoiceLang, {
        rate: speechRate,
        onStart: () => setSpeakingMessageId(msgId),
        onEnd: () => {
          setSpeakingMessageId(null);
          setVoiceState('idle');
        },
        onError: () => {
          setSpeakingMessageId(null);
          setVoiceState('idle');
        }
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
    if (whisperRecorder && whisperRecorder.isRecording) {
      whisperRecorder.cancelRecording();
    }
    setSpeakingMessageId(null);
    setVoiceState('idle');
    setLiveTranscript('');
    setLiveBotReply('');
    setStatusPrompt('');
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

  if (isWidget && !isOpen) return null;

  return (
    <div 
      id={id}
      className={`transition-all duration-300 ${
        isWidget 
          ? 'fixed bottom-5 right-5 z-50 w-full sm:w-[460px] max-w-[95vw] shadow-2xl rounded-3xl overflow-hidden border border-emerald-500/30' 
          : embedded
          ? 'w-full rounded-3xl overflow-hidden border shadow-sm ' + (isDark ? 'border-slate-800 bg-[#0a1120]' : 'border-emerald-200 bg-white')
          : 'w-full max-w-5xl mx-auto space-y-4 animate-fadeIn'
      } ${isDark ? 'bg-[#0b121e] text-slate-100' : 'bg-white text-slate-900'}`}>

      {/* ─── HEADER BAR ─── */}
      <div className={`p-4 flex items-center justify-between border-b ${
        isDark ? 'bg-[#0f1828] border-slate-800' : 'bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white border-emerald-700'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5 text-emerald-400 animate-pulse" />
            {voiceState === 'listening' && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                <span>Kisan AI Live</span>
                <span className="text-[10px] text-emerald-300 font-mono font-semibold bg-emerald-500/20 px-1.5 py-0.5 rounded-full border border-emerald-400/30">
                  Voice Mode
                </span>
              </h2>
            </div>
            <p className="text-[11px] text-emerald-100/80 font-medium flex items-center gap-1.5">
              <span>Groq Whisper</span>
              <span>•</span>
              <span>LPU Fast Agronomist</span>
            </p>
          </div>
        </div>

        {/* Top Controls: Mode Switcher, Language & Actions */}
        <div className="flex items-center gap-1.5 text-white">
          {/* Dual View Toggle: Voice Orb vs Transcript */}
          <div className="flex items-center bg-black/20 p-0.5 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('liveVoice')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'liveVoice'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Switch to Live Voice Orb Mode"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              <span className="text-[11px]">Live</span>
            </button>
            <button
              onClick={() => setViewMode('transcript')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'transcript'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
              title="Switch to Chat Transcript & History"
            >
              <MessageSquare className="w-3 h-3" />
              <span className="text-[11px]">Log</span>
            </button>
          </div>

          {/* Regional Dialect Selector */}
          <div className="relative">
            <select
              value={activeVoiceLang}
              onChange={(e) => {
                const newLang = e.target.value;
                setActiveVoiceLang(newLang);
                if (setLang) setLang(newLang);
              }}
              className="px-2 py-1 rounded-xl text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 cursor-pointer focus:outline-none"
              title="Select spoken Indian regional language"
            >
              <option value="en" className="text-slate-900">🌐 English</option>
              <option value="hi" className="text-slate-900">🇮🇳 हिन्दी (Hindi)</option>
              <option value="mr" className="text-slate-900">🚩 मराठी (Marathi)</option>
              <option value="ta" className="text-slate-900">🌴 தமிழ் (Tamil)</option>
              <option value="te" className="text-slate-900">🌾 తెలుగు (Telugu)</option>
              <option value="kn" className="text-slate-900">🌻 ಕನ್ನಡ (Kannada)</option>
              <option value="gu" className="text-slate-900">🌱 ગુજરાતી (Gujarati)</option>
            </select>
          </div>

          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1.5 rounded-xl hover:bg-white/20 transition-colors cursor-pointer ${
              showSettings ? 'bg-white/30 text-white' : 'text-white/80'
            }`}
            title="Voice & Audio Settings"
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
                title="Close Voice Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* ─── SETTINGS PANEL (EXPANDABLE) ─── */}
          {showSettings && (
            <div className={`p-3.5 border-b text-xs space-y-2.5 animate-fadeIn ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                  <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hands-Free Auto-Listen Loop:</span>
                </span>
                <button
                  onClick={() => setHandsFreeLoop(!handsFreeLoop)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold cursor-pointer transition-all border ${
                    handsFreeLoop 
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs' 
                      : isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  {handsFreeLoop ? 'Continuous (Hands-Free)' : 'Push-to-Talk'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>TTS Voice Playback Speed:</span>
                </span>
                <div className="flex gap-1.5">
                  {[0.85, 0.95, 1.15].map(rate => (
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

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span>Active Voice Engine: <strong>Groq Whisper Large v3 + LPU</strong></span>
                <span className="text-[10px] text-emerald-500 font-mono font-bold">Domain Guarded</span>
              </div>
            </div>
          )}

          {/* ─── VIEW MODE A: GEMINI LIVE / SIRI VOICE ORB SCREEN ─── */}
          {viewMode === 'liveVoice' && (
            <div className={`p-4 sm:p-6 flex flex-col items-center justify-between overflow-y-auto ${
              isWidget 
                ? 'min-h-[460px] sm:min-h-[480px]' 
                : embedded
                ? 'min-h-[420px]'
                : 'min-h-[540px]'
            }`}>
              {/* TOP PROMPT / STATUS BANNER */}
              <div className="w-full text-center space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  {SUPPORTED_LANGUAGES[activeVoiceLang]?.nativeName || 'English'} Speech Mode Active
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Ask freely about crop diseases, remedies, soil telemetry, or government subsidies.
                </p>
              </div>

              {/* CENTER STAGE: VOICE ORB & REAL-TIME AUDIO VISUALIZER */}
              <div className="my-auto py-2">
                <VoiceOrbVisualizer
                  state={voiceState}
                  analyserNode={whisperRecorder.getAnalyser()}
                  isDark={isDark}
                  onOrbClick={handleOrbClick}
                  statusText={statusPrompt}
                  size={isWidget ? 240 : 270}
                />
              </div>

              {/* LIVE CONVERSATION SUBTITLES CARD */}
              <div className="w-full space-y-2.5 mt-2">
                {/* User spoken transcription */}
                {liveTranscript && (
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto animate-fadeIn flex items-start gap-2">
                    <span className="text-sm">👨‍🌾</span>
                    <p className="font-medium italic">"{liveTranscript}"</p>
                  </div>
                )}

                {/* Assistant Spoken Response Preview */}
                {liveBotReply && (
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 max-w-md mx-auto shadow-sm animate-fadeIn space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Kisan AI Advisory</span>
                      </span>
                      <button
                        onClick={() => handleToggleSpeak('live-bot', liveBotReply)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 cursor-pointer flex items-center gap-1"
                      >
                        {speakingMessageId === 'live-bot' || voiceState === 'speaking' ? (
                          <>
                            <VolumeX className="w-3 h-3" /> Stop
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" /> Replay
                          </>
                        )}
                      </button>
                    </div>
                    <p className="leading-relaxed whitespace-pre-line">{liveBotReply}</p>
                  </div>
                )}

                {/* Quick Voice Prompt Suggestions */}
                <div className="pt-2 max-w-md mx-auto w-full">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {[
                      { label: '🌾 Downy Mildew in Bajra', query: 'What fungicide cures downy mildew in pearl millet?' },
                      { label: '💧 Check Soil Moisture', query: 'Should I irrigate today based on my soil moisture sensors?' },
                      { label: '🏛️ PM-Kisan Installment', query: 'How do I check my PM-Kisan Samman Nidhi installment?' },
                      { label: '🍅 Tomato Leaf Curl', query: 'How to control tomato leaf curl virus?' }
                    ].map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleExecuteVoiceQuery(sug.query)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer border ${
                          isDark
                            ? 'bg-slate-900 hover:bg-emerald-950 text-slate-300 border-slate-800 hover:border-emerald-500/50'
                            : 'bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
                        }`}
                      >
                        {sug.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── VIEW MODE B: FULL CHAT TRANSCRIPT & ACTION LOG ─── */}
          {viewMode === 'transcript' && (
            <div className={`p-4 sm:p-5 overflow-y-auto space-y-3.5 ${
              isWidget 
                ? 'h-[400px] sm:h-[440px]' 
                : embedded
                ? 'h-[400px]'
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
                      {isBot && msg.source && (
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-sans font-semibold text-[9px] flex items-center gap-1 border border-emerald-500/20">
                          <Sparkles className="w-2.5 h-2.5" />
                          {msg.source}
                        </span>
                      )}
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

                      {/* Bot Message Bottom Action Strip (TTS + Copy + Navigation Chips) */}
                      {isBot && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
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
                                  <span>Stop</span>
                                  <span className="flex gap-0.5 items-end h-2.5 ml-0.5">
                                    <span className="w-1 bg-white animate-bounce h-2 rounded-full"></span>
                                    <span className="w-1 bg-white animate-bounce h-3 rounded-full" style={{ animationDelay: '0.15s' }}></span>
                                    <span className="w-1 bg-white animate-bounce h-1.5 rounded-full" style={{ animationDelay: '0.3s' }}></span>
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  <span>Listen</span>
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
                                      handleExecuteVoiceQuery(btn.query);
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
          )}

          {/* ─── BOTTOM CONTROL & INPUT BAR ─── */}
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
              {/* Voice Orb Tap Trigger / Mic Status Button */}
              <button
                type="button"
                onClick={handleOrbClick}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer shadow-md active:scale-95 shrink-0 flex items-center gap-1.5 ${
                  voiceState === 'listening'
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse ring-2 ring-rose-400/40'
                    : voiceState === 'speaking'
                    ? 'bg-sky-600 text-white border-sky-500 animate-bounce'
                    : voiceState === 'thinking'
                    ? 'bg-purple-600 text-white border-purple-500 animate-pulse'
                    : isDark
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                }`}
                title={
                  voiceState === 'listening'
                    ? 'Listening... click to send'
                    : voiceState === 'speaking'
                    ? 'Bot is speaking... click to interrupt'
                    : 'Click to speak via Groq Whisper'
                }
              >
                {voiceState === 'listening' ? (
                  <>
                    <MicOff className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold font-mono hidden sm:inline">Stop</span>
                  </>
                ) : voiceState === 'speaking' ? (
                  <>
                    <VolumeX className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold font-mono hidden sm:inline">Interrupt</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold font-mono hidden sm:inline">Speak</span>
                  </>
                )}
              </button>

              {/* Text Input fallback */}
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    activeVoiceLang === 'mr' 
                      ? 'किंवा येथे प्रश्न टाईप करा...' 
                      : activeVoiceLang === 'ta' 
                      ? 'அல்லது கேள்வியை தட்டச்சு செய்யவும்...' 
                      : activeVoiceLang === 'hi'
                      ? 'या यहाँ प्रश्न टाइप करें...'
                      : 'Or type farm question here...'
                  }
                  className={`w-full py-2.5 pl-4 pr-10 rounded-2xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

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
