import { useState, useEffect, useRef } from 'react';

export function useAudioPlayer(customBgmUrl = null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  // Simple dreamy musical scale notes (C Major / A Minor pentatonic soft notes)
  const notes = [
    523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50
  ];

  const playSynthMelodyStep = (ctx, step) => {
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime;
    
    // Choose notes for sweet lullaby rhythm
    const pattern = [0, 2, 4, 7, 4, 2, 5, 3];
    const baseFreq = notes[pattern[step % pattern.length]];
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.8);
  };

  const startMusic = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      setIsPlaying(true);
      setIsMuted(false);

      let step = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        playSynthMelodyStep(audioContextRef.current, step);
        step = (step + 1) % 16;
      }, 500);
    } catch (err) {
      console.warn('Audio playback error:', err);
    }
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
    setIsPlaying(false);
    setIsMuted(true);
  };

  const toggleMusic = () => {
    if (isPlaying && !isMuted) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return {
    isPlaying: isPlaying && !isMuted,
    startMusic,
    stopMusic,
    toggleMusic
  };
}
