import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  Send, 
  RotateCcw, 
  Globe, 
  Layers, 
  Activity, 
  ArrowRight, 
  Radio, 
  Sprout, 
  Check, 
  Copy, 
  Sliders, 
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  RefreshCw,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, 
  ASSISTANT_UI_STRINGS, 
  validateResponseLanguage, 
  detectSpokenLanguage,
  detectSpokenLanguageWithConfidence,
  classifyAgriculturalIntent, 
  generateChotaKissanResponse, 
  chotaKissanSpeech 
} from '../../services/chotaKissanEngine';
import {
  isWhisperAvailable,
  getGroqApiKey,
  whisperRecorder,
  transcribeWithWhisper,
  translateWithLLM
} from '../../services/whisperService';

export const ChotaKissanModal = ({ isOpen, onClose, onNavigate }) => {
  const { lang, setLang, t, theme, toggleTheme, setIsCartModalOpen, currentUser } = useApp();
  const isDark = theme === 'dark';

  // Assistant State: 'idle' | 'recording' | 'transcribing' | 'listening' | 'processing' | 'analyzing_farm' | 'translating' | 'speaking'
  const [assistantState, setAssistantState] = useState('idle');
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [activeLang, setActiveLang] = useState(() => {
    return localStorage.getItem('chotaKissanManualLang') || lang || 'hi';
  });
  const [speechRate, setSpeechRate] = useState(0.95);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Whisper-specific state
  const useWhisper = isWhisperAvailable();
  const [detectionConfidence, setDetectionConfidence] = useState(null);  // 0.0–1.0
  const [detectionSource, setDetectionSource] = useState('');           // 'whisper' | 'text-analysis' | ''
  const [lockLanguage, setLockLanguage] = useState(() => {
    return !!localStorage.getItem('chotaKissanManualLang');
  });              // Manual override: skip auto-detection
  const [whisperError, setWhisperError] = useState(null);               // Error message to show

  const handleLanguageSelect = (selectedId) => {
    if (selectedId === 'auto') {
      setLockLanguage(false);
      localStorage.removeItem('chotaKissanManualLang');
    } else {
      setActiveLang(selectedId);
      setLockLanguage(true);
      localStorage.setItem('chotaKissanManualLang', selectedId);
    }
  };
  const [textInputDetectedLang, setTextInputDetectedLang] = useState(null); // Live detection for typed text

  // Conversational History Thread
  const [conversation, setConversation] = useState([
    {
      sender: 'assistant',
      text: (ASSISTANT_UI_STRINGS[lang] || ASSISTANT_UI_STRINGS.hi).greeting,
      lang: lang || 'hi',
      actionButtons: [
        { label: 'Check Disease Risk', query: 'What is my disease risk today?' },
        { label: 'Should I Irrigate?', query: 'Should I water my crop today?' },
        { label: 'Mandi Prices', query: 'What is today mandi rate for cotton?' }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, assistantState, currentTranscript]);

  const silenceTimerRef = useRef(null);
  const currentTranscriptRef = useRef('');

  // Sample Multilingual Voice Prompts for instant 1-tap testing
  const samplePrompts = [
    { text: "வணக்கம்! நீங்கள் யார்? எனக்கு என்ன உதவி செய்ய முடியும்?", lang: "ta", label: "🌴 Tamil: அறிமுகம் & உதவி" },
    { text: "என் தக்காளி பயிரில் இலை கருகல் நோய்க்கு என்ன மருந்து தெளிக்க வேண்டும்?", lang: "ta", label: "🌴 Tamil: தக்காளி கருகல் மருந்து" },
    { text: "என் நெல் பயிருக்கு இப்போ தண்ணீர் விடலாமா?", lang: "ta", label: "🌴 Tamil: நெல் பாசன ஆலோசனை" },
    { text: "பருத்தி இன்றைய சந்தை விலை என்ன?", lang: "ta", label: "🌴 Tamil: பருத்தி சந்தை விலை" },
    { text: "नमस्ते! आप कौन हैं और क्या मदद कर सकते हैं?", lang: "hi", label: "🇮🇳 Hindi: परिचय व सहायता" },
    { text: "मेरे खेत में बीमारी का जोखिम कितना है?", lang: "hi", label: "🇮🇳 Hindi: बीमारी का जोखिम" },
    { text: "माझ्या कापसाला रोगाचा धोका का वाढला आहे?", lang: "mr", label: "🚩 Marathi: कापूस रोग धोका" },
    { text: "Hello! Who are you and how can you help my farm?", lang: "en", label: "🌐 English: Intro & Help" },
    { text: "What is the temperature and humidity on my farm?", lang: "en", label: "🌐 English: Farm Telemetry" }
  ];

  // Initialize Speech Recognition (fallback mode when no Whisper API key)
  useEffect(() => {
    if (isOpen && !useWhisper) {
      chotaKissanSpeech.initRecognition({
        langCode: SUPPORTED_LANGUAGES[activeLang]?.code || (lang === 'ta' ? 'ta-IN' : 'hi-IN'),
        onStart: () => {
          setAssistantState('listening');
          setCurrentTranscript('');
          currentTranscriptRef.current = '';
        },
        onResult: ({ transcript, finalTranscript }) => {
          const textToUse = transcript || finalTranscript;
          if (textToUse) {
            setCurrentTranscript(textToUse);
            currentTranscriptRef.current = textToUse;

            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
            }

            silenceTimerRef.current = setTimeout(() => {
              if (currentTranscriptRef.current && currentTranscriptRef.current.trim()) {
                chotaKissanSpeech.stopListening();
                handleProcessFarmerQuery(currentTranscriptRef.current, 'text-analysis');
              }
            }, 1300);
          }
        },
        onEnd: () => {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }
          if (currentTranscriptRef.current && currentTranscriptRef.current.trim() && assistantState === 'listening') {
            handleProcessFarmerQuery(currentTranscriptRef.current, 'text-analysis');
          } else if (assistantState === 'listening') {
            setAssistantState('idle');
          }
        },
        onError: (err) => {
          console.warn('STT Error:', err);
          if (assistantState === 'listening') {
            setAssistantState('idle');
          }
        }
      });
    }

    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      chotaKissanSpeech.stopSpeaking();
      chotaKissanSpeech.stopListening();
    };
  }, [isOpen, activeLang]);

  // ─── Main Query Processing Pipeline ───
  const handleProcessFarmerQuery = async (queryText, source = 'text-analysis', preDetectedLang = null, preConfidence = null) => {
    if (!queryText || !queryText.trim()) return;
    const cleanQuery = queryText.trim();

    // 1. Instantly Stop any active speech (Barge-in / Interruption)
    chotaKissanSpeech.stopSpeaking();
    chotaKissanSpeech.stopListening();
    setWhisperError(null);

    // 2. Strict Multilingual Language Pipeline (USER LANGUAGE = ASSISTANT RESPONSE LANGUAGE)
    let detectedLanguage;
    let confidence;

    if (lockLanguage) {
      detectedLanguage = activeLang;
      confidence = 1.0;
    } else if (preDetectedLang) {
      detectedLanguage = preDetectedLang;
      confidence = preConfidence || 0.9;
    } else {
      const detection = detectSpokenLanguageWithConfidence(cleanQuery);
      if (detection && detection.lang) {
        // Preserve previous active language if this is a short ASCII follow-up (e.g. "what to do?", "kaise kare?")
        const isShortAsciiFollowUp = cleanQuery.length < 30 && !/[\u0900-\u0D7F]/.test(cleanQuery);
        if (isShortAsciiFollowUp && activeLang && activeLang !== 'en' && detection.lang === 'en') {
          detectedLanguage = activeLang;
          confidence = 0.85;
        } else {
          detectedLanguage = detection.lang;
          confidence = detection.confidence;
        }
      } else {
        detectedLanguage = activeLang || lang || 'en';
        confidence = 0.9;
      }
    }

    setActiveLang(detectedLanguage);
    setDetectionConfidence(confidence);
    setDetectionSource(source);

    // 3. Append Farmer's Spoken Message to Conversation Thread
    const farmerMessage = {
      sender: 'user',
      text: cleanQuery,
      lang: detectedLanguage,
      language: SUPPORTED_LANGUAGES[detectedLanguage]?.name || 'English',
      languageCode: SUPPORTED_LANGUAGES[detectedLanguage]?.code || 'en-IN',
      detectionSource: source,
      confidence: confidence,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation(prev => [...prev, farmerMessage]);
    setCurrentTranscript('');
    setAssistantState('processing');

    // 4. Intent Classification
    const classified = classifyAgriculturalIntent(cleanQuery, { crop: 'cotton' });

    // 5. Analyze farm sensors
    setAssistantState('analyzing_farm');
    await new Promise(r => setTimeout(r, 500));

    // 6. Generate Response
    const response = generateChotaKissanResponse({
      userQuery: cleanQuery,
      detectedLang: detectedLanguage,
      classifiedIntent: classified,
      farmContext: {
        crop: 'cotton',
        plotName: 'Plot 2 (Bt Cotton)',
        telemetry: {
          temp: 29.4,
          rh: 88.0,
          leafWetnessHours: 11.5,
          soilVWC: 68.0,
          soilPH: 7.4,
          soilEC: 0.42,
          rain24h: 18.5,
          hoursFavorable: 16.0
        }
      },
      conversationHistory: conversation
    });

    // 7. Strict Language Validation & Dynamic Multilingual Response Generator
    let finalResponseText = response.responseText;
    const apiKey = getGroqApiKey();
    const isTargetLangValid = validateResponseLanguage(finalResponseText, detectedLanguage);

    if (!isTargetLangValid || (detectedLanguage !== 'en' && apiKey && (response.detectedLang === 'en' || !['ta', 'hi', 'mr'].includes(detectedLanguage)))) {
      setAssistantState('translating');
      try {
        const englishResponse = generateChotaKissanResponse({
          userQuery: cleanQuery,
          detectedLang: 'en',
          classifiedIntent: classified,
          farmContext: {
            crop: 'cotton',
            plotName: 'Zone 2 (Bt Cotton)',
            telemetry: { temp: 29.4, rh: 88.0, leafWetnessHours: 11.5, soilVWC: 68.0, soilPH: 7.4, soilEC: 0.42, rain24h: 18.5, hoursFavorable: 16.0 }
          },
          conversationHistory: conversation
        });
        const translated = await translateWithLLM(englishResponse.responseText, detectedLanguage, apiKey);
        if (translated && validateResponseLanguage(translated, detectedLanguage)) {
          finalResponseText = translated;
        }
      } catch (err) {
        console.error('LLM Translation error:', err);
      }
    }

    let actualLang = preDetectedLang || detectSpokenLanguageWithConfidence(cleanQuery).lang;
    const overrideNote = (lockLanguage && actualLang !== detectedLanguage) 
      ? `Replying in ${SUPPORTED_LANGUAGES[detectedLanguage]?.nativeName || detectedLanguage} (your selected language)`
      : null;

    const assistantMessage = {
      sender: 'assistant',
      text: finalResponseText,
      lang: detectedLanguage,
      language: SUPPORTED_LANGUAGES[detectedLanguage]?.name || 'English',
      languageCode: SUPPORTED_LANGUAGES[detectedLanguage]?.code || 'en-IN',
      intent: response.intent,
      navigationTarget: response.navigationTarget,
      actionButtons: response.actionButtons,
      detectionSource: source,
      overrideNote: overrideNote,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation(prev => [...prev, assistantMessage]);
    setAssistantState('speaking');

    // Handle App-Wide Control Actions triggered by Chota Kissan AI
    if (response.navigationTarget) {
      if (response.navigationTarget.startsWith('CHANGE_LANG_')) {
        const targetLang = response.navigationTarget.replace('CHANGE_LANG_', '');
        setLang(targetLang);
        setActiveLang(targetLang);
        setLockLanguage(true);
        localStorage.setItem('chotaKissanManualLang', targetLang);
      } else if (response.navigationTarget === 'TOGGLE_THEME') {
        if (toggleTheme) toggleTheme();
      } else if (response.navigationTarget === 'OPEN_CART') {
        if (setIsCartModalOpen) setIsCartModalOpen(true);
      } else if (onNavigate) {
        setTimeout(() => {
          onNavigate(response.navigationTarget);
          if (onClose) onClose();
        }, 1500);
      }
    }

    // 8. Text-to-Speech Audio Playback
    if (!isMuted) {
      const targetLangCode = SUPPORTED_LANGUAGES[detectedLanguage]?.code || 'hi-IN';
      chotaKissanSpeech.speakText(finalResponseText, targetLangCode, {
        rate: speechRate,
        onStart: () => setAssistantState('speaking'),
        onEnd: () => setAssistantState('idle')
      });
    } else {
      setAssistantState('idle');
    }
  };

  // ─── Toggle Microphone (Whisper or Web Speech API) ───
  const handleToggleMic = async () => {
    if (assistantState === 'speaking') {
      chotaKissanSpeech.stopSpeaking();
      setAssistantState('idle');
      return;
    }

    // ── WHISPER MODE ──
    if (useWhisper) {
      if (assistantState === 'recording') {
        // Stop recording → transcribe with Whisper
        setAssistantState('transcribing');
        setCurrentTranscript('');

        const { blob, duration } = await whisperRecorder.stopRecording();

        if (!blob || blob.size < 1000 || duration < 0.5) {
          setWhisperError('Could not hear clearly. Please try speaking again.');
          setAssistantState('idle');
          setTimeout(() => setWhisperError(null), 4000);
          return;
        }

        // Send to Groq Whisper API
        const apiKey = getGroqApiKey();
        const forcedLang = lockLanguage ? activeLang : null;
        const result = await transcribeWithWhisper(blob, apiKey, forcedLang);

        if (result.error) {
          const errorMessages = {
            no_audio: '🔇 No audio detected. Please try again.',
            no_speech: '🔇 Could not hear any speech. Please speak clearly.',
            rate_limit: '⏳ Too many requests. Please wait a moment and try again.',
            api_error: '⚠️ Transcription service error. Retrying...',
            network_error: '🌐 Network error. Please check your connection.'
          };
          setWhisperError(errorMessages[result.error] || '⚠️ Transcription failed. Please try again.');
          setAssistantState('idle');
          setTimeout(() => setWhisperError(null), 4000);
          return;
        }

        if (!result.text || !result.text.trim()) {
          setWhisperError('🔇 Could not understand. Please try speaking again.');
          setAssistantState('idle');
          setTimeout(() => setWhisperError(null), 4000);
          return;
        }

        // Low confidence check
        if (result.confidence < 0.4 && !result.isSupported) {
          setWhisperError(`⚠️ Language "${result.rawLanguage}" is not supported. Replying in English.`);
          setTimeout(() => setWhisperError(null), 5000);
        } else if (result.confidence < 0.4) {
          setWhisperError(`🤔 Low confidence detection (${Math.round(result.confidence * 100)}%). Tap the language tag to correct.`);
          setTimeout(() => setWhisperError(null), 5000);
        }

        // Show the transcription
        setCurrentTranscript(result.text);

        // Process the query with Whisper's language detection
        await handleProcessFarmerQuery(
          result.text,
          'whisper',
          lockLanguage ? activeLang : result.detectedLang,
          result.confidence
        );

      } else if (assistantState === 'idle' || assistantState === 'transcribing') {
        // Start recording
        setWhisperError(null);
        setCurrentTranscript('');
        
        // Pass a callback to stop recording automatically when silence is detected
        const started = await whisperRecorder.startRecording(() => {
          handleToggleMic();
        });
        
        if (started) {
          setAssistantState('recording');
        } else {
          setWhisperError('🎙️ Microphone access denied. Please allow microphone permission.');
          setTimeout(() => setWhisperError(null), 4000);
        }
      }
      return;
    }

    // ── WEB SPEECH API FALLBACK MODE ──
    if (assistantState === 'listening') {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      const recorded = currentTranscriptRef.current || currentTranscript;
      chotaKissanSpeech.stopListening();
      if (recorded && recorded.trim()) {
        handleProcessFarmerQuery(recorded, 'text-analysis');
      } else {
        setAssistantState('idle');
      }
    } else {
      const targetLangCode = SUPPORTED_LANGUAGES[activeLang]?.code || (lang === 'ta' ? 'ta-IN' : 'hi-IN');
      chotaKissanSpeech.startListening(targetLangCode);
    }
  };

  // Replay message audio
  const handleReplayAudio = (text, msgLang) => {
    chotaKissanSpeech.stopSpeaking();
    const targetLangCode = SUPPORTED_LANGUAGES[msgLang]?.code || 'hi-IN';
    chotaKissanSpeech.speakText(text, targetLangCode, {
      rate: speechRate,
      onStart: () => setAssistantState('speaking'),
      onEnd: () => setAssistantState('idle')
    });
  };

  // Copy text to clipboard
  const handleCopyText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // Handle Action Button Navigation
  const handleActionClick = (btn) => {
    if (btn.target && onNavigate) {
      onNavigate(btn.target);
      onClose();
    } else if (btn.query) {
      handleProcessFarmerQuery(btn.query);
    }
  };

  const ui = ASSISTANT_UI_STRINGS[activeLang] || ASSISTANT_UI_STRINGS.hi;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fadeIn">
      
      {/* Main Assistant Modal Card */}
      <div className={`w-full max-w-2xl h-[90vh] max-h-[780px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden relative ${
        isDark ? 'bg-[#0a1220] border-[#1a2b48] text-white' : 'bg-[#EEF9F1] border-[#B8E2C2] text-slate-900'
      }`}>
        
        {/* 1. TOP HEADER BAR */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-3 shrink-0 ${
          isDark ? 'bg-[#060c18] border-slate-800' : 'bg-[#063B2A] text-white border-[#0A4D37]'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center text-xl shadow-md border border-emerald-300/40 shrink-0">
              🌱
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
                <span>{ui.name}</span>
                <span className="text-xs text-emerald-300 font-mono font-bold">(Kisan One)</span>
              </h2>
              <p className="text-[10px] text-emerald-100/80 font-medium pb-1.5">
                {ui.title} • Google Assistant + Siri for Indian Farmers
              </p>
              
              <div className="flex bg-black/20 rounded-lg shadow-inner overflow-hidden border border-white/10 w-fit">
                {[
                  { id: 'auto', label: 'Auto' },
                  { id: 'en', label: 'English' },
                  { id: 'hi', label: 'Hindi' },
                  { id: 'ta', label: 'Tamil' },
                  { id: 'te', label: 'Telugu' },
                  { id: 'mr', label: 'Marathi' }
                ].map(l => (
                  <button
                    key={l.id}
                    onClick={() => handleLanguageSelect(l.id)}
                    className={`px-2 py-1 text-[9px] font-bold transition-all cursor-pointer border-r last:border-r-0 border-white/5 ${
                      (l.id === 'auto' && !lockLanguage) || (l.id === activeLang && lockLanguage)
                        ? 'bg-emerald-500 text-white shadow-xs' 
                        : 'text-emerald-100/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-start">
            {/* Audio Settings Toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-xl text-emerald-200 hover:bg-white/10 transition-colors cursor-pointer"
              title="Voice Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Mute Toggle */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted) chotaKissanSpeech.stopSpeaking();
              }}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isMuted ? 'bg-rose-500/20 text-rose-300' : 'text-emerald-200 hover:bg-white/10'
              }`}
              title={isMuted ? "Unmute Voice" : "Mute Voice"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                chotaKissanSpeech.stopSpeaking();
                chotaKissanSpeech.stopListening();
                onClose();
              }}
              className="p-2 rounded-xl text-emerald-200 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings Sub-Drawer */}
        {showSettings && (
          <div className={`p-4 border-b text-xs space-y-3 shrink-0 animate-fadeIn ${
            isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-emerald-200'
          }`}>
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Audio Settings</span>
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                useWhisper ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {useWhisper ? '🧠 Whisper AI Active' : '🎙️ Browser STT'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-600 dark:text-slate-400">Speech Rate: {speechRate}x</span>
              <div className="flex gap-2">
                {[0.85, 0.95, 1.1].map(r => (
                  <button
                    key={r}
                    onClick={() => setSpeechRate(r)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold ${
                      speechRate === r ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  >
                    {r}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. CHAT CONVERSATION THREAD */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans">
          
          {/* Live Farm Context Pill */}
          <div className="flex items-center justify-center">
            <div className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-xs border ${
              isDark ? 'bg-slate-900 border-slate-800 text-emerald-400' : 'bg-emerald-100/90 border-emerald-300 text-emerald-900'
            }`}>
              <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Plot 2 (Bt Cotton) • 29.4°C • 88% RH • High Disease Risk</span>
            </div>
          </div>

          {conversation.map((msg, idx) => {
            const isAssistant = msg.sender === 'assistant';
            const langMeta = SUPPORTED_LANGUAGES[msg.lang] || SUPPORTED_LANGUAGES.en;

            return (
              <div
                key={idx}
                className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'} space-y-1.5 animate-fadeIn`}
              >
                {/* Language / Sender Badge */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono px-2 flex-wrap">
                  <span>{isAssistant ? 'Kisan One' : '👨‍🌾 You'}</span>
                  <span>•</span>
                  <span className={`inline-flex items-center gap-1 ${
                    msg.detectionSource === 'whisper' ? 'text-violet-500' : ''
                  }`}>
                    {langMeta.flag} {langMeta.name}
                    {msg.detectionSource === 'whisper' && <span className="text-violet-400 text-[9px]">(Whisper AI)</span>}
                    {msg.detectionSource === 'text-analysis' && !isAssistant && <span className="text-slate-400 text-[9px]">(Text)</span>}
                    {msg.confidence && !isAssistant && <span className="text-slate-400 text-[9px]">({Math.round(msg.confidence * 100)}%)</span>}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-3xl max-w-[88%] text-xs sm:text-sm font-medium leading-relaxed shadow-sm relative group ${
                  isAssistant
                    ? isDark 
                      ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-sm' 
                      : 'bg-white border border-[#D2EBD7] text-slate-900 rounded-tl-sm'
                    : 'bg-[#047857] text-white rounded-tr-sm shadow-emerald-950/20'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Assistant Actions Bar */}
                  {isAssistant && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleReplayAudio(msg.text, msg.lang)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                          title="Replay Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopyText(msg.text, idx)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                          title="Copy text"
                        >
                          {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Interactive Action Chips */}
                      {msg.actionButtons && msg.actionButtons.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {msg.actionButtons.map((btn, bIdx) => (
                            <button
                              key={bIdx}
                              onClick={() => handleActionClick(btn)}
                              className="px-2.5 py-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-300 text-[10px] font-mono font-black flex items-center gap-1 transition-all cursor-pointer"
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

          {/* Real-time Streaming Transcript Pill */}
          {currentTranscript && (
            <div className="flex flex-col items-end space-y-1 animate-pulse">
              <span className="text-[10px] text-emerald-600 font-mono font-bold">🎙️ Listening in real-time...</span>
              <div className="p-3.5 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-medium">
                "{currentTranscript}"
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 3. QUICK 1-TAP PROMPT CHIPS */}
        <div className={`p-2.5 border-t overflow-x-auto flex gap-2 shrink-0 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-emerald-200/70'
        }`}>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 font-mono shrink-0 flex items-center px-1">
            <Sparkles className="w-3 h-3 text-amber-500 mr-1" />
            {ui.tryAsking}
          </span>
          {samplePrompts.map((sp, sIdx) => (
            <button
              key={sIdx}
              onClick={() => handleProcessFarmerQuery(sp.text)}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 hover:text-emerald-900 text-[11px] font-medium shrink-0 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* 4. LARGE VOICE-FIRST MICROPHONE BUTTON & STATE BAR */}
        <div className={`p-4 sm:p-5 border-t shrink-0 flex flex-col items-center justify-center space-y-3 ${
          isDark ? 'bg-[#060c18] border-slate-800' : 'bg-[#F5FCF7] border-[#D2EBD7]'
        }`}>
          
          {/* Status Label & Errors */}
          <div className="text-center min-h-[1.5rem]">
            {whisperError ? (
              <span className="text-xs font-mono font-black text-rose-500 flex items-center justify-center gap-1.5 animate-fadeIn">
                <AlertTriangle className="w-3.5 h-3.5" />
                {whisperError}
              </span>
            ) : assistantState === 'listening' || assistantState === 'recording' ? (
              <span className="text-xs font-mono font-black text-rose-600 animate-pulse flex items-center justify-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                {ui.listening}
              </span>
            ) : assistantState === 'transcribing' ? (
              <span className="text-xs font-mono font-black text-violet-600 dark:text-violet-400 animate-pulse flex items-center justify-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Transcribing with Whisper AI...
              </span>
            ) : assistantState === 'processing' || assistantState === 'analyzing_farm' ? (
              <span className="text-xs font-mono font-black text-amber-600 animate-pulse flex items-center justify-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                {assistantState === 'analyzing_farm' ? ui.analyzingFarm : ui.processing}
              </span>
            ) : assistantState === 'translating' ? (
              <span className="text-xs font-mono font-black text-sky-600 dark:text-sky-400 animate-pulse flex items-center justify-center gap-1.5">
                <Globe className="w-3.5 h-3.5 animate-spin" />
                Translating to regional language...
              </span>
            ) : assistantState === 'speaking' ? (
              <span className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 animate-bounce text-emerald-600" />
                {ui.speaking}
              </span>
            ) : (
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                {ui.tapToTalk} (Speak in Hindi, Marathi, Tamil, Telugu, Kannada, etc.)
              </span>
            )}
          </div>

          {/* Large Circular Voice Button with Ripple Rings */}
          <div className="relative flex items-center justify-center">
            {/* Animated Waveform Rings */}
            {(assistantState === 'listening' || assistantState === 'recording') && (
              <>
                <div className="absolute w-24 h-24 rounded-full bg-rose-500/20 animate-ping" />
                <div className="absolute w-20 h-20 rounded-full bg-rose-500/30 animate-pulse" />
              </>
            )}
            
            {assistantState === 'transcribing' && (
              <div className="absolute w-20 h-20 rounded-full border-4 border-violet-500/30 border-t-violet-500 animate-spin" />
            )}

            {assistantState === 'speaking' && (
              <div className="absolute w-22 h-22 rounded-full bg-emerald-500/20 animate-ping" />
            )}

            <button
              onClick={handleToggleMic}
              disabled={assistantState === 'transcribing' || assistantState === 'translating' || assistantState === 'processing' || assistantState === 'analyzing_farm'}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-all active:scale-95 relative z-10 ${
                (assistantState === 'listening' || assistantState === 'recording')
                  ? 'bg-rose-600 hover:bg-rose-700 ring-4 ring-rose-400/40 scale-105 cursor-pointer'
                  : assistantState === 'transcribing'
                  ? 'bg-violet-600 ring-4 ring-violet-400/40 opacity-80 cursor-wait'
                  : assistantState === 'speaking'
                  ? 'bg-emerald-600 hover:bg-rose-600 ring-4 ring-emerald-400/40 cursor-pointer'
                  : (assistantState === 'processing' || assistantState === 'analyzing_farm' || assistantState === 'translating')
                  ? 'bg-amber-600 opacity-80 cursor-wait'
                  : 'bg-gradient-to-tr from-[#047857] to-[#065F46] hover:scale-105 ring-4 ring-emerald-500/20 cursor-pointer'
              }`}
              title={assistantState === 'speaking' ? "Stop Audio" : "Speak to Kisan One"}
            >
              {(assistantState === 'listening' || assistantState === 'recording') ? (
                <MicOff className="w-7 h-7 animate-pulse" />
              ) : assistantState === 'speaking' ? (
                <VolumeX className="w-7 h-7" />
              ) : assistantState === 'transcribing' || assistantState === 'translating' ? (
                <Loader2 className="w-7 h-7 animate-spin" />
              ) : (
                <Mic className="w-7 h-7" />
              )}
            </button>
          </div>

          {/* Fallback Text Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (textInput.trim()) {
                handleProcessFarmerQuery(textInput);
                setTextInput('');
                setTextInputDetectedLang(null);
              }
            }}
            className="w-full flex flex-col gap-1 max-w-lg"
          >
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => {
                    setTextInput(e.target.value);
                    if (e.target.value.trim().length > 2) {
                      const detected = detectSpokenLanguageWithConfidence(e.target.value).lang;
                      setTextInputDetectedLang(SUPPORTED_LANGUAGES[detected] || SUPPORTED_LANGUAGES.en);
                    } else {
                      setTextInputDetectedLang(null);
                    }
                  }}
                  placeholder={ui.tapToTalk + " or type..."}
                  className={`w-full pl-4 pr-10 py-2.5 rounded-2xl text-xs border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
                {textInputDetectedLang && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-slate-400 font-mono pointer-events-none">
                    <span>{textInputDetectedLang.flag}</span>
                    <span className="hidden sm:inline">{textInputDetectedLang.nativeName}</span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={!textInput.trim()}
                className="p-2.5 rounded-2xl bg-[#047857] hover:bg-[#065F46] disabled:opacity-40 text-white transition-all cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
};
