"use client";

import { useEffect, useRef, useState } from "react";

export default function useAudio() {
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolumeState] = useState(0.4); // Default volume 40%

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const filterRef = useRef(null);
  const synthIntervalRef = useRef(null);
  const activeOscillatorsRef = useRef([]);

  // Chord notes (frequencies in Hz)
  // C minor, Ab major, Eb major, F major
  const chords = [
    [130.81, 155.56, 196.00, 261.63], // C3, Eb3, G3, C4 (Cm)
    [103.83, 130.81, 155.56, 207.65], // Ab2, C3, Eb3, Ab3 (Ab)
    [155.56, 196.00, 233.08, 311.13], // Eb3, G3, Bb3, Eb4 (Eb)
    [87.31, 130.81, 174.61, 220.00]   // F2, C3, F3, A3 (F)
  ];

  const currentChordIdx = useRef(0);
  const currentStep = useRef(0);

  // Initialize Web Audio Context
  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const masterGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Set filter to lowpass to make synth sound warm/underwater (sci-fi ambient)
    filter.type = "lowpass";
    filter.frequency.value = 500; // Cutoff at 500Hz
    filter.Q.value = 1.0;

    // Connect nodes: Synth note -> Filter -> Master Gain -> Output
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    masterGain.gain.setValueAtTime(volume, ctx.currentTime);

    audioCtxRef.current = ctx;
    masterGainRef.current = masterGain;
    filterRef.current = filter;
  };

  // Play a single ambient synth note
  const playSynthNote = (freq, duration = 3.5) => {
    const ctx = audioCtxRef.current;
    const filter = filterRef.current;
    if (!ctx || !filter || ctx.state === "suspended") return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Soft warm triangle wave
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Dynamic lowpass sweep for each note (soft sweep)
    const baseFilterFreq = 450 + Math.random() * 100;
    filter.frequency.setValueAtTime(baseFilterFreq, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(baseFilterFreq - 150, ctx.currentTime + duration);

    // Note Envelope: Slow attack and long release to blend sounds together
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 1.2); // 1.2s attack
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration); // decay/release

    osc.connect(gainNode);
    gainNode.connect(filter);

    osc.start(now);
    osc.stop(now + duration);

    // Keep track to clean up on unmount
    activeOscillatorsRef.current.push(osc);
    osc.onended = () => {
      activeOscillatorsRef.current = activeOscillatorsRef.current.filter(o => o !== osc);
    };
  };

  // Start the background sequencer loop
  const startSynthLoop = () => {
    if (synthIntervalRef.current) return;

    const tick = () => {
      // Play a note from the current chord
      const chord = chords[currentChordIdx.current];
      const noteFreq = chord[currentStep.current % chord.length];
      
      // Randomly offset play time slightly to sound more natural/generative
      const delay = Math.random() * 0.3;
      setTimeout(() => {
        playSynthNote(noteFreq);
      }, delay * 1000);

      currentStep.current += 1;

      // Every 8 steps (~16s), switch chord in progression
      if (currentStep.current % 8 === 0) {
        currentChordIdx.current = (currentChordIdx.current + 1) % chords.length;
      }
    };

    // Trigger first note immediately, then loop every 2.2 seconds
    tick();
    synthIntervalRef.current = setInterval(tick, 2200);
  };

  const stopSynthLoop = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  // Toggle master audio drive
  const toggleAudio = async () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    if (isActive) {
      stopSynthLoop();
      // Fade out master gain quickly before suspending
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      setTimeout(() => {
        if (ctx.state !== "closed") {
          ctx.suspend();
        }
      }, 150);
      setIsActive(false);
    } else {
      // Resume context if suspended
      await ctx.resume();
      masterGainRef.current.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.1);
      startSynthLoop();
      setIsActive(true);
      // Play a startup select sound
      setTimeout(() => playClick(), 50);
    }
  };

  // Set master volume
  const setVolume = (v) => {
    const vol = Math.max(0, Math.min(1, v));
    setVolumeState(vol);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(vol, audioCtxRef.current.currentTime);
    }
  };

  // Programmatic UI Hover Sound (Subtle high-frequency tick)
  const playHover = () => {
    if (!isActive || !audioCtxRef.current || audioCtxRef.current.state === "suspended") return;

    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    // Crisp pitch slide up
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.015, ctx.currentTime); // Low volume
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination); // Direct bypass filter for high crispness

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  };

  // Programmatic UI Click Sound (Punchy resonant decay sweep)
  const playClick = () => {
    if (!isActive || !audioCtxRef.current || audioCtxRef.current.state === "suspended") return;

    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    // Classic laser-click decay sweep
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.12);

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopSynthLoop();
      activeOscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return {
    isActive,
    volume,
    toggleAudio,
    setVolume,
    playHover,
    playClick
  };
}
