import { useCallback } from 'react';

// Singleton audio context to prevent creating many contexts
let audioCtx: AudioContext | null = null;
const getAudioCtx = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    } catch (e) {
      console.warn('AudioContext initialization failed:', e);
    }
  }
  return audioCtx;
};

export const useSFX = () => {
  // Call this once on any user interaction to unlock the audio context on mobile
  const initAudio = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    } catch {
      // Ignore audio unlock errors
    }
  }, []);

  const playClick = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx || ctx.state === 'closed') return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio playback errors should never crash the React render tree
    }
  }, []);

  const playSwoosh = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx || ctx.state === 'closed') return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      
      const bufferSize = Math.floor(ctx.sampleRate * 0.35); // 350ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      const now = ctx.currentTime;
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(3000, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.35);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.15);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      noise.start(now);
    } catch {
      // Audio errors should never crash the UI
    }
  }, []);

  const playTyping = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx || ctx.state === 'closed') return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      
      const now = ctx.currentTime;
      
      // Mechanical key "thud" (triangle pitch drop)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      const pitch = 220 + Math.random() * 80;
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);
      
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      
      osc.start(now);
      osc.stop(now + 0.04);

      // Mechanical key "tick" transient (high pitch snap)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1500 + Math.random() * 400, now);
      osc2.frequency.exponentialRampToValueAtTime(800, now + 0.015);
      
      gain2.gain.setValueAtTime(0.15, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
      
      osc2.start(now);
      osc2.stop(now + 0.015);
    } catch {
      // Audio playback errors should never crash the React render tree
    }
  }, []);

  return { initAudio, playClick, playSwoosh, playTyping };
};
