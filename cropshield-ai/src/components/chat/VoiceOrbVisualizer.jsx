import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Mic, Volume2, Cpu, Loader2 } from 'lucide-react';

/**
 * VoiceOrbVisualizer
 * High-performance Gemini Live / Siri-style dynamic voice orb and audio visualizer.
 * 
 * @param {object} props
 * @param {'idle' | 'listening' | 'thinking' | 'speaking' | 'paused'} props.state
 * @param {AnalyserNode | null} props.analyserNode - Web Audio API AnalyserNode from mic
 * @param {boolean} props.isDark - Theme mode
 * @param {Function} props.onOrbClick - Click/tap handler on the orb
 * @param {string} props.statusText - Text prompt under the orb
 * @param {number} props.size - Pixel diameter (default 280)
 */
export const VoiceOrbVisualizer = ({
  state = 'idle',
  analyserNode = null,
  isDark = true,
  onOrbClick,
  statusText = '',
  size = 280
}) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const center = size / 2;
    const baseRadius = size * 0.28;
    let angleOffset = 0;
    let phase = 0;

    // Allocate frequency buffer for Web Audio Analyser
    const bufferLength = analyserNode ? analyserNode.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Extract frequency data if available
      let avgVolume = 0;
      if (analyserNode && state === 'listening') {
        try {
          analyserNode.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < 32; i++) {
            sum += dataArray[i];
          }
          avgVolume = sum / 32 / 255; // 0.0 to 1.0
        } catch {
          avgVolume = 0.15;
        }
      }

      angleOffset += state === 'thinking' ? 0.04 : 0.015;
      phase += 0.03;

      // Dynamic expansion factor based on state and live volume
      let expansion = 0;
      if (state === 'listening') {
        expansion = avgVolume * 28 + Math.sin(phase * 4) * 3;
      } else if (state === 'speaking') {
        expansion = Math.sin(phase * 5) * 8 + Math.cos(phase * 2) * 5;
      } else if (state === 'thinking') {
        expansion = Math.sin(phase * 6) * 4;
      } else {
        // Idle breathing
        expansion = Math.sin(phase) * 3;
      }

      const currentRadius = Math.max(20, baseRadius + expansion);

      // ─── 1. AMBIENT GLOW LAYER ───
      const outerGlow = ctx.createRadialGradient(
        center, center, currentRadius * 0.6,
        center, center, currentRadius * 1.85
      );

      if (state === 'listening') {
        outerGlow.addColorStop(0, 'rgba(16, 185, 129, 0.45)');  // Emerald
        outerGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.25)'); // Cyan
        outerGlow.addColorStop(1, 'rgba(6, 182, 212, 0)');
      } else if (state === 'thinking') {
        outerGlow.addColorStop(0, 'rgba(168, 85, 247, 0.45)'); // Purple
        outerGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.3)');  // Amber
        outerGlow.addColorStop(1, 'rgba(236, 72, 153, 0)');  // Pink
      } else if (state === 'speaking') {
        outerGlow.addColorStop(0, 'rgba(14, 165, 233, 0.5)');  // Sky Blue
        outerGlow.addColorStop(0.5, 'rgba(16, 185, 129, 0.3)'); // Emerald
        outerGlow.addColorStop(1, 'rgba(16, 185, 129, 0)');
      } else {
        // Idle
        outerGlow.addColorStop(0, isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(5, 150, 105, 0.2)');
        outerGlow.addColorStop(0.6, isDark ? 'rgba(20, 184, 166, 0.1)' : 'rgba(13, 148, 136, 0.08)');
        outerGlow.addColorStop(1, 'rgba(0,0,0,0)');
      }

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(center, center, currentRadius * 1.85, 0, Math.PI * 2);
      ctx.fill();

      // ─── 2. FREQUENCY RIPPLE WAVES (When Listening or Speaking) ───
      if (state === 'listening' || state === 'speaking') {
        const ringCount = state === 'listening' ? 3 : 2;
        for (let r = 1; r <= ringCount; r++) {
          const ringRadius = currentRadius + r * 14 + (Math.sin(phase * 3 + r) * 6);
          const ringAlpha = Math.max(0, 0.4 - r * 0.12 + (state === 'listening' ? avgVolume * 0.3 : 0.1));
          
          ctx.beginPath();
          ctx.arc(center, center, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = state === 'listening' 
            ? `rgba(52, 211, 153, ${ringAlpha})` 
            : `rgba(56, 189, 248, ${ringAlpha})`;
          ctx.lineWidth = 1.8;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // ─── 3. CHROMATIC ORBITAL ROTATING RINGS (Siri / Gemini Live Style) ───
      if (state === 'thinking' || state === 'listening') {
        const ringSpans = [
          { radius: currentRadius + 8, speed: angleOffset * 1.5, color: '#34d399', width: 2 },
          { radius: currentRadius + 16, speed: -angleOffset * 1.2, color: '#38bdf8', width: 2.2 },
          { radius: currentRadius + 24, speed: angleOffset * 0.9, color: '#a855f7', width: 1.6 }
        ];

        ringSpans.forEach((ring) => {
          ctx.save();
          ctx.translate(center, center);
          ctx.rotate(ring.speed);
          ctx.beginPath();
          ctx.arc(0, 0, ring.radius, 0, Math.PI * 1.35);
          ctx.strokeStyle = ring.color;
          ctx.lineWidth = ring.width;
          ctx.lineCap = 'round';
          ctx.stroke();
          ctx.restore();
        });
      }

      // ─── 4. RADIAL FREQUENCY AUDIO BARS (Real-time Mic Audio) ───
      if (state === 'listening' && analyserNode) {
        const numBars = 36;
        const angleStep = (Math.PI * 2) / numBars;
        ctx.save();
        ctx.translate(center, center);

        for (let i = 0; i < numBars; i++) {
          const val = dataArray[i % 32] || 0;
          const barHeight = Math.max(4, (val / 255) * 36);
          const rad = currentRadius + 4;

          const barGrad = ctx.createLinearGradient(0, -rad, 0, -(rad + barHeight));
          barGrad.addColorStop(0, '#10b981');
          barGrad.addColorStop(1, '#06b6d4');

          ctx.rotate(angleStep);
          ctx.beginPath();
          ctx.moveTo(0, -rad);
          ctx.lineTo(0, -(rad + barHeight));
          ctx.strokeStyle = barGrad;
          ctx.lineWidth = 2.4;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
        ctx.restore();
      }

      // ─── 5. CORE LUMINOUS ORB (Multi-layer gradient) ───
      const coreGrad = ctx.createRadialGradient(
        center - currentRadius * 0.25,
        center - currentRadius * 0.25,
        currentRadius * 0.1,
        center,
        center,
        currentRadius
      );

      if (state === 'listening') {
        coreGrad.addColorStop(0, '#ecfdf5');
        coreGrad.addColorStop(0.35, '#34d399');
        coreGrad.addColorStop(0.7, '#059669');
        coreGrad.addColorStop(1, '#064e3b');
      } else if (state === 'thinking') {
        coreGrad.addColorStop(0, '#faf5ff');
        coreGrad.addColorStop(0.35, '#c084fc');
        coreGrad.addColorStop(0.7, '#7c3aed');
        coreGrad.addColorStop(1, '#4c1d95');
      } else if (state === 'speaking') {
        coreGrad.addColorStop(0, '#f0fdf4');
        coreGrad.addColorStop(0.35, '#38bdf8');
        coreGrad.addColorStop(0.7, '#0284c7');
        coreGrad.addColorStop(1, '#0369a1');
      } else {
        // Idle
        coreGrad.addColorStop(0, '#f0fdf4');
        coreGrad.addColorStop(0.35, '#10b981');
        coreGrad.addColorStop(0.7, '#047857');
        coreGrad.addColorStop(1, '#064e3b');
      }

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(center, center, currentRadius, 0, Math.PI * 2);
      ctx.shadowColor = state === 'thinking' ? '#c084fc' : '#34d399';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // ─── 6. SPECULAR REFLECTION HIGHLIGHT ───
      const specGrad = ctx.createLinearGradient(
        center - currentRadius * 0.5,
        center - currentRadius * 0.6,
        center + currentRadius * 0.2,
        center + currentRadius * 0.1
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      specGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.ellipse(
        center - currentRadius * 0.22,
        center - currentRadius * 0.28,
        currentRadius * 0.42,
        currentRadius * 0.24,
        Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [state, analyserNode, isDark, size]);

  // Status badge config
  const getStateBadge = () => {
    switch (state) {
      case 'listening':
        return {
          icon: <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />,
          label: 'Listening to your voice... (Speak now)',
          color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300'
        };
      case 'thinking':
        return {
          icon: <Cpu className="w-4 h-4 text-purple-400 animate-spin" />,
          label: 'Groq Whisper & LPU Agronomist reasoning...',
          color: 'from-purple-500/20 to-amber-500/20 border-purple-500/40 text-purple-300'
        };
      case 'speaking':
        return {
          icon: <Volume2 className="w-4 h-4 text-sky-400 animate-bounce" />,
          label: 'Kisan AI is speaking... (Tap orb to interrupt)',
          color: 'from-sky-500/20 to-emerald-500/20 border-sky-500/40 text-sky-300'
        };
      default:
        return {
          icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
          label: 'Tap Orb or Mic to talk with Kisan AI',
          color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-300'
        };
    }
  };

  const badge = getStateBadge();

  return (
    <div className="flex flex-col items-center justify-center select-none py-3">
      {/* Interactive Orb Canvas Container */}
      <div 
        onClick={onOrbClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative flex items-center justify-center cursor-pointer transition-transform duration-300 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        style={{ width: size, height: size }}
        title="Tap Voice Orb to talk or interrupt"
      >
        <canvas
          ref={canvasRef}
          style={{ width: size, height: size }}
          className="rounded-full"
        />

        {/* Center overlay icon on idle or tap prompt */}
        {state === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-white drop-shadow-md">
            <Mic className="w-9 h-9 text-white/95 drop-shadow-lg mb-1 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-white/90 drop-shadow">
              Tap To Talk
            </span>
          </div>
        )}
      </div>

      {/* State Status Pill */}
      <div className="mt-3 flex items-center justify-center max-w-sm text-center">
        <div className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border shadow-lg backdrop-blur-md bg-gradient-to-r ${badge.color}`}>
          {badge.icon}
          <span>{statusText || badge.label}</span>
        </div>
      </div>
    </div>
  );
};
