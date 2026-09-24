/**
 * KISAN VIGYAAN — Whisper Transcription & Audio Recording Service
 * 
 * Records microphone audio via MediaRecorder API, sends to Groq Whisper API
 * for transcription + automatic language detection. Falls back to Web Speech API
 * if no API key is configured.
 */

import { detectSpokenLanguage } from './chotaKissanEngine';

// ─── ISO 639-1 → our internal lang codes ───
const WHISPER_LANG_MAP = {
  en: 'en', english: 'en',
  hi: 'hi', hindi: 'hi',
  mr: 'mr', marathi: 'mr',
  ta: 'ta', tamil: 'ta',
  te: 'te', telugu: 'te',
  kn: 'kn', kannada: 'kn',
  gu: 'gu', gujarati: 'gu',
  bn: 'bn', bengali: 'bn',
  pa: 'pa', punjabi: 'pa',
  ml: 'ml', malayalam: 'ml'
};

const SUPPORTED_LANG_CODES = new Set(['en', 'hi', 'mr', 'ta', 'te', 'kn', 'gu', 'bn', 'pa', 'ml']);

/**
 * Get the configured Groq API key from environment.
 * Returns null if not configured or placeholder.
 */
export function getGroqApiKey() {
  const key = import.meta.env.VITE_GROQ_API_KEY;
  if (!key || key === 'gsk_your_groq_api_key_here' || key.length < 10) return null;
  return key;
}

/**
 * Check if Whisper transcription is available (API key configured).
 */
export function isWhisperAvailable() {
  return !!getGroqApiKey();
}

// ─── Audio Recorder Class ───

export class WhisperAudioRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
    this.isRecording = false;
    this.startTime = null;
    this.audioContext = null;
    this.analyser = null;
  }

  getStream() {
    return this.stream;
  }

  getAnalyser() {
    return this.analyser;
  }

  /**
   * Start recording from the microphone.
   * @param {Function} [onSilence] - Callback triggered when silence is detected after speaking
   * @param {Function} [onVolume] - Callback receiving normalized volume level 0.0 - 1.0 for visualizers
   * @returns {Promise<boolean>} true if recording started successfully
   */
  async startRecording(onSilence, onVolume) {
    try {
      // Clean up any stale state first
      this.cancelRecording();

      this.audioChunks = [];
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Prefer webm/opus, fallback to whatever is available
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4';

      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType,
        audioBitsPerSecond: 64000
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(250); // Collect chunks every 250ms
      this.isRecording = true;
      this.startTime = Date.now();

      // Always setup AudioContext and AnalyserNode so visualizers have real-time data
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }
        const source = this.audioContext.createMediaStreamSource(this.stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.minDecibels = -75;
        this.analyser.maxDecibels = -10;
        this.analyser.smoothingTimeConstant = 0.25;
        source.connect(this.analyser);

        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        let silenceStart = null;
        let speechFrameCount = 0;
        let hasSpoken = false;

        const monitorAudio = () => {
          if (!this.isRecording || !this.analyser) return;
          
          this.analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
          const avg = sum / dataArray.length;
          const normalizedVol = Math.min(1.0, avg / 128);

          if (onVolume) {
            onVolume(normalizedVol);
          }

          if (onSilence) {
            const timeSinceStart = Date.now() - (this.startTime || Date.now());

            // Ignore first 400ms after mic opening to let hardware AGC & bias settle
            if (timeSinceStart > 400) {
              if (avg > 8.0) {
                speechFrameCount++;
                if (speechFrameCount >= 3) {
                  hasSpoken = true;
                  silenceStart = null;
                }
              } else {
                speechFrameCount = Math.max(0, speechFrameCount - 1);
              }

              if (hasSpoken) {
                // Once user has spoken, trigger auto-stop when silence (avg < 7.0) is held for 2.2s
                // and at least 2.0s of audio was recorded
                if (avg < 7.0) {
                  if (!silenceStart) silenceStart = Date.now();
                  else if (Date.now() - silenceStart > 2200 && timeSinceStart > 2000) {
                    console.log(`[VAD] Silence detected after speech (${timeSinceStart}ms total). Stopping.`);
                    onSilence();
                    return;
                  }
                } else {
                  silenceStart = null;
                }
              } else {
                // If no speech detected at all, allow up to 10 seconds before auto-closing
                if (timeSinceStart > 10000) {
                  console.log('[VAD] No speech detected within 10s timeout.');
                  onSilence();
                  return;
                }
              }
            }
          }
          
          requestAnimationFrame(monitorAudio);
        };
        
        // Start monitoring now that this.isRecording is true!
        monitorAudio();
      } catch (e) {
        console.warn('AudioContext/Analyser setup failed, fallback to basic recording', e);
      }

      return true;
    } catch (err) {
      console.error('Microphone access error:', err);
      this.isRecording = false;
      return false;
    }
  }

  /**
   * Stop recording and return the audio blob.
   * @returns {Promise<{blob: Blob, duration: number}>}
   */
  stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this.isRecording = false;
        resolve({ blob: null, duration: 0 });
        return;
      }

      this.mediaRecorder.onstop = () => {
        const duration = (Date.now() - (this.startTime || Date.now())) / 1000;
        const rawMime = this.mediaRecorder?.mimeType || 'audio/webm';
        // Clean mimeType so it doesn't pass ;codecs=opus to multipart upload
        const cleanType = rawMime.split(';')[0];
        const blob = new Blob(this.audioChunks, { type: cleanType });
        this.audioChunks = [];
        this.isRecording = false;

        if (this.audioContext) {
          this.audioContext.close().catch(() => {});
          this.audioContext = null;
        }
        this.analyser = null;

        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
          this.stream = null;
        }

        this.mediaRecorder = null;
        resolve({ blob, duration });
      };

      try {
        if (this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.requestData();
        }
        this.mediaRecorder.stop();
      } catch (e) {
        this.isRecording = false;
        resolve({ blob: null, duration: 0 });
      }
    });
  }

  /**
   * Cancel recording without returning audio.
   */
  cancelRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.audioChunks = [];
    this.isRecording = false;
    
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    this.analyser = null;

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
}

// ─── Whisper Transcription ───

/**
 * Transcribe an audio blob using Groq's Whisper API.
 * 
 * @param {Blob} audioBlob - The recorded audio blob
 * @param {string} apiKey - Groq API key
 * @param {string|null} forcedLang - Optional ISO 639-1 language code to force transcription in that language
 * @returns {Promise<{text: string, detectedLang: string, confidence: number, duration: number, isSupported: boolean, rawLanguage: string}>}
 */
export async function transcribeWithWhisper(audioBlob, apiKey, forcedLang = null) {
  if (!audioBlob || audioBlob.size < 1000) {
    return {
      text: '',
      detectedLang: forcedLang || 'en',
      confidence: 0,
      duration: 0,
      isSupported: true,
      rawLanguage: '',
      error: 'no_audio'
    };
  }

  const formData = new FormData();

  // Determine file extension from MIME type
  const ext = audioBlob.type.includes('mp4') ? 'mp4' : 'webm';
  formData.append('file', audioBlob, `recording.${ext}`);
  
  // Use the full large-v3 model instead of turbo for better multilingual and accent accuracy
  formData.append('model', 'whisper-large-v3');
  
  // Provide multilingual agricultural context to improve recognition across Indian languages
  formData.append('prompt', 'कपास, पिके, रोग, औषध, खते, शेती, फसल, कीटनाशक, દવા, பயிர், పంట, ಬೆಳೆ, agriculture, farming, crops, disease, mandi, NPK, fertilizer, urea, soil.');
  
  formData.append('response_format', 'verbose_json');
  
  // Only force language if the user explicitly specified a non-English dialect
  if (forcedLang && forcedLang !== 'auto' && forcedLang !== 'en') {
    formData.append('language', forcedLang);
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Whisper API error:', response.status, errorData);
      return {
        text: '',
        detectedLang: 'en',
        confidence: 0,
        duration: 0,
        isSupported: true,
        rawLanguage: '',
        error: response.status === 429 ? 'rate_limit' : 'api_error'
      };
    }

    const data = await response.json();

    // Extract language from Whisper response
    const rawLang = (data.language || '').toLowerCase();
    const mappedLang = WHISPER_LANG_MAP[rawLang] || rawLang;
    const isSupported = SUPPORTED_LANG_CODES.has(mappedLang);
    let detectedLang = isSupported ? mappedLang : 'en';

    const text = (data.text || '').trim();

    // Secondary check: verify actual script of the transcribed text (Devanagari, Tamil, Telugu, etc.)
    if (text) {
      const textDetectedLang = detectSpokenLanguage(text);
      if (textDetectedLang && textDetectedLang !== 'en') {
        detectedLang = textDetectedLang;
      }
    }

    // Calculate confidence score from Whisper segments logprob if available
    const segmentConfidence = data.segments?.[0]?.avg_logprob != null
      ? Math.min(0.99, Math.max(0.60, Math.exp(data.segments[0].avg_logprob)))
      : 0.95;

    return {
      text,
      detectedLang,
      confidence: Math.round(segmentConfidence * 100) / 100,
      duration: data.duration || 0,
      isSupported,
      rawLanguage: rawLang,
      error: text ? null : 'no_speech'
    };
  } catch (err) {
    console.error('Whisper transcription network error:', err);
    return {
      text: '',
      detectedLang: 'en',
      confidence: 0,
      duration: 0,
      isSupported: true,
      rawLanguage: '',
      error: 'network_error'
    };
  }
}

// ─── LLM Translation Service (for non-template languages) ───

const translationCache = new Map();

/**
 * Translate text to a target language using Groq LLM.
 * Used when we have a response in English but need it in te/kn/gu/bn/pa/ml.
 * 
 * @param {string} text - English response text to translate
 * @param {string} targetLang - Target language code (e.g., 'te', 'kn')
 * @param {string} apiKey - Groq API key
 * @returns {Promise<string>} Translated text
 */
export async function translateWithLLM(text, targetLang, apiKey) {
  if (!text || !apiKey || targetLang === 'en') return text;

  const cacheKey = `${targetLang}:${text.slice(0, 100)}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const langNames = {
    te: 'Telugu', kn: 'Kannada', gu: 'Gujarati',
    bn: 'Bengali', pa: 'Punjabi', ml: 'Malayalam',
    ta: 'Tamil', hi: 'Hindi', mr: 'Marathi'
  };

  const targetName = langNames[targetLang] || 'English';

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b',
        messages: [
          {
            role: 'system',
            content: `You are an expert agricultural AI assistant for Indian farmers. Respond ONLY in ${targetName} (${targetLang}).
Rules:
1. MANDATORY: You MUST write the ENTIRE response in native ${targetName} script. Do NOT respond in English or any other language.
2. USER LANGUAGE = ASSISTANT RESPONSE LANGUAGE. The user asked in ${targetName}, so reply completely in ${targetName}.
3. Keep crop names, chemical names, pesticide names, disease scientific names, and dosage numbers accurate — do not translate technical brand names literally.
4. Use natural, conversational ${targetName} that a farmer would understand easily.
5. Preserve formatting (bullet points, bold markers **, numbers, emoji).
6. Output ONLY the response in native ${targetName} script, nothing else.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      console.warn('LLM translation API error:', response.status);
      return text; // Return original on failure
    }

    const data = await response.json();
    const translated = data.choices?.[0]?.message?.content?.trim();

    if (translated) {
      translationCache.set(cacheKey, translated);
      // Keep cache size bounded
      if (translationCache.size > 200) {
        const firstKey = translationCache.keys().next().value;
        translationCache.delete(firstKey);
      }
      return translated;
    }

    return text;
  } catch (err) {
    console.error('LLM translation error:', err);
    return text; // Return original on failure
  }
}

// ─── Singleton Recorder Instance ───

export const whisperRecorder = new WhisperAudioRecorder();
