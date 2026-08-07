"use client";
/* eslint-disable react-hooks/immutability -- HTMLAudioElement playback is intentionally imperative. */

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Music2, Pause, Play, Volume2, X } from "lucide-react";
import { useTheme } from "./ThemeContext";

const THEMES = [
  { id:"ide", name:"IDE / Editor", desc:"VS Code-style developer environment.", preview:["#1A1014","#C8506A","#F5ECD7","#C8A96E"], tag:"Default" },
  { id:"rpg", name:"RPG Interface", desc:"Game-inspired quest and achievement view.", preview:["#0D0D1A","#FFD700","#E8E0FF","#C084FC"], tag:"New" },
  { id:"os", name:"Interactive OS", desc:"Desktop-style workspace with windows and Dock.", preview:["#2B3A4E","#0A66C2","#F7F5EF","#A855F7"], tag:"New" },
  { id:"gallery", name:"Museum / Gallery", desc:"Editorial archive with paper and ochre palette.", preview:["#F4EFE6","#2B2417","#B08354","#6B7F4E"], tag:"New" },
];
const TRACKS = [
  { id:"healing", title:"Healing Vibes", subtitle:"Soft calm playlist", src:"/music/healing-vibes.mp3" },
  { id:"evergreen", title:"Evergreen Hindi", subtitle:"Classic Hindi collection", src:"/music/evergreen-hindi.mp3" },
];
let sharedMusicPlayer;
const formatTime = (value) => Number.isFinite(value) ? `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}` : "0:00";

export default function ThemeSettings({ onClose, audio }) {
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState(theme);
  const [trackId, setTrackId] = useState("healing");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const defaultTrack = TRACKS[0];

  useEffect(() => {
    if (!sharedMusicPlayer) sharedMusicPlayer = new Audio();
    const player = sharedMusicPlayer;
    if (!player.dataset.track) {
      player.src = defaultTrack.src;
      player.dataset.track = defaultTrack.src;
      player.volume = volume;
      player.loop = true;
    }
    const sync = () => {
      setIsPlaying(!player.paused);
      setProgress(player.currentTime || 0);
      setDuration(player.duration || 0);
      setTrackId(TRACKS.find((track) => track.src === player.dataset.track)?.id || null);
    };
    const attemptAutoplay = () => {
      if (!player.dataset.track || player.paused) {
        player.src = defaultTrack.src;
        player.dataset.track = defaultTrack.src;
        player.volume = volume;
        player.loop = true;
        player.play().then(() => { setTrackId(defaultTrack.id); setIsPlaying(true); }).catch(() => {});
      }
      window.removeEventListener("click", attemptAutoplay, { capture: true, once: true });
      window.removeEventListener("keydown", attemptAutoplay, { capture: true, once: true });
      window.removeEventListener("touchstart", attemptAutoplay, { capture: true, once: true });
    };
    setTimeout(() => {
      window.addEventListener("click", attemptAutoplay, { capture: true, once: true, passive: true });
      window.addEventListener("keydown", attemptAutoplay, { capture: true, once: true, passive: true });
      window.addEventListener("touchstart", attemptAutoplay, { capture: true, once: true, passive: true });
    }, 0);
    ["play", "pause", "timeupdate", "loadedmetadata", "ended"].forEach((event) => player.addEventListener(event, sync));
    sync();
    return () => {
      ["play", "pause", "timeupdate", "loadedmetadata", "ended"].forEach((event) => player.removeEventListener(event, sync));
      window.removeEventListener("click", attemptAutoplay, { capture: true });
      window.removeEventListener("keydown", attemptAutoplay, { capture: true });
      window.removeEventListener("touchstart", attemptAutoplay, { capture: true });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectTrack = (track) => {
    const player = sharedMusicPlayer;
    if (!player) return;
    if (player.dataset.track !== track.src) { player.src = track.src; player.dataset.track = track.src; player.currentTime = 0; }
    player.volume = volume;
    player.play().then(() => { setTrackId(track.id); setIsPlaying(true); }).catch(() => setIsPlaying(false));
    audio?.playClick();
  };
  const togglePlayback = () => {
    const player = sharedMusicPlayer;
    if (!player) return;
    if (!player.dataset.track) { selectTrack(TRACKS[0]); return; }
    if (player.paused) player.play().then(() => setIsPlaying(true)).catch(() => {}); else player.pause();
    audio?.playClick();
  };
  const updateVolume = (value) => { const next = Number(value); setVolume(next); if (sharedMusicPlayer) sharedMusicPlayer.volume = next; };
  const seek = (value) => { const next = Number(value); if (sharedMusicPlayer) sharedMusicPlayer.currentTime = next; setProgress(next); };
  const apply = () => { setTheme(selected); audio?.playClick(); onClose(); };

  return <AnimatePresence><motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.72)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}><motion.div initial={{ opacity:0, scale:.94, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:.94, y:16 }} transition={{ duration:.22 }} onClick={(event) => event.stopPropagation()} style={{ background:"var(--color-bg-card)", border:"1px solid var(--glass-border-active)", borderRadius:8, width:"min(600px, 100%)", maxHeight:"90vh", overflow:"auto", boxShadow:"0 28px 80px rgba(0,0,0,0.75)" }}>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1rem 1.25rem", background:"var(--color-bg-elevated)", borderBottom:"1px solid var(--border-subtle)" }}><span style={{ fontFamily:"var(--font-mono)", fontSize:"0.82rem", fontWeight:700, color:"var(--color-cream)" }}>Theme & Music Settings</span><button aria-label="Close settings" onClick={onClose} style={{ background:"none", border:0, cursor:"pointer", color:"var(--color-comment)", display:"flex", padding:"0.2rem" }}><X size={15}/></button></div>
    <div style={{ padding:"1rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.65rem" }} className="theme-grid">{THEMES.map((item) => <motion.button key={item.id} whileHover={{ scale:1.02 }} onClick={() => { setSelected(item.id); audio?.playClick(); }} onMouseEnter={() => audio?.playHover()} style={{ textAlign:"left", background:selected === item.id ? "var(--color-bg-elevated)" : "var(--color-bg-darker)", border:`2px solid ${selected === item.id ? "var(--glass-border-active)" : "var(--border-subtle)"}`, borderRadius:6, padding:"0.85rem", cursor:"pointer", position:"relative" }}><div style={{ display:"flex", gap:3, marginBottom:"0.65rem" }}>{item.preview.map((color) => <span key={color} style={{ width:16, height:16, borderRadius:3, background:color }}/>)}</div><span style={{ display:"block", fontFamily:"var(--font-mono)", fontSize:"0.75rem", fontWeight:700, color:"var(--color-cream)" }}>{item.name}</span><span style={{ display:"block", marginTop:"0.35rem", fontFamily:"var(--font-mono)", fontSize:"0.63rem", color:"var(--color-cream-muted)", lineHeight:1.45 }}>{item.desc}</span>{selected === item.id && <span style={{ position:"absolute", top:8, right:8, color:"var(--color-wine)" }}><Check size={14}/></span>}</motion.button>)}</div>
    <div style={{ margin:"0 1rem 1rem", padding:"1rem", background:"var(--color-bg-darker)", border:"1px solid var(--border-subtle)", borderRadius:6 }}><div style={{ display:"flex", alignItems:"center", gap:"0.45rem", marginBottom:"0.35rem" }}><Music2 size={15} color="var(--color-rose)"/><span style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem", fontWeight:700, color:"var(--color-cream)" }}>Drive Radio</span><span style={{ marginLeft:"auto", fontFamily:"var(--font-mono)", fontSize:"0.56rem", color:"var(--color-comment)" }}>OFF BY DEFAULT</span></div><p style={{ margin:"0 0 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.63rem", color:"var(--color-cream-muted)", lineHeight:1.5 }}>Select a song only if you want background music. It continues while you explore.</p><div style={{ display:"grid", gap:"0.4rem" }}>{TRACKS.map((track) => <button key={track.id} onClick={() => selectTrack(track)} onMouseEnter={() => audio?.playHover()} style={{ textAlign:"left", display:"flex", alignItems:"center", gap:"0.55rem", cursor:"pointer", padding:"0.55rem 0.65rem", border:`1px solid ${trackId === track.id ? "var(--glass-border-active)" : "var(--border-subtle)"}`, borderRadius:4, background:trackId === track.id ? "var(--color-bg-elevated)" : "transparent", color:"var(--color-cream)" }}><Music2 size={14} color={trackId === track.id ? "var(--color-rose)" : "var(--color-comment)"}/><span style={{ minWidth:0, flex:1 }}><span style={{ display:"block", fontFamily:"var(--font-mono)", fontSize:"0.68rem", fontWeight:700 }}>{track.title}</span><span style={{ display:"block", fontFamily:"var(--font-mono)", fontSize:"0.58rem", color:"var(--color-comment)", marginTop:2 }}>{track.subtitle}</span></span>{trackId === track.id && (isPlaying ? <Pause size={13} color="var(--color-rose)"/> : <Play size={13} color="var(--color-rose)"/>)}</button>)}</div>{trackId && <div style={{ marginTop:"0.75rem", paddingTop:"0.7rem", borderTop:"1px solid var(--border-subtle)" }}><div style={{ display:"flex", alignItems:"center", gap:"0.55rem" }}><button onClick={togglePlayback} aria-label={isPlaying ? "Pause song" : "Play song"} style={{ border:"1px solid var(--glass-border-active)", borderRadius:4, padding:"0.38rem", background:"var(--color-wine-dim)", color:"var(--color-cream)", cursor:"pointer", display:"grid", placeItems:"center" }}>{isPlaying ? <Pause size={14}/> : <Play size={14}/>}</button><input aria-label="Song progress" type="range" min="0" max={duration || 0} step="1" value={Math.min(progress, duration || 0)} onChange={(event) => seek(event.target.value)} style={{ flex:1, accentColor:"var(--color-wine)" }}/><span style={{ width:68, textAlign:"right", fontFamily:"var(--font-mono)", fontSize:"0.57rem", color:"var(--color-comment)" }}>{formatTime(progress)} / {formatTime(duration)}</span></div><div style={{ display:"flex", alignItems:"center", gap:"0.55rem", marginTop:"0.55rem" }}><Volume2 size={13} color="var(--color-comment)"/><input aria-label="Music volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => updateVolume(event.target.value)} style={{ flex:1, accentColor:"var(--color-rose)" }}/><span style={{ width:30, fontFamily:"var(--font-mono)", fontSize:"0.57rem", color:"var(--color-comment)" }}>{Math.round(volume * 100)}%</span></div></div>}</div>
    <div style={{ padding:"0.75rem 1.25rem", borderTop:"1px solid var(--border-subtle)", display:"flex", justifyContent:"flex-end", gap:"0.6rem", background:"var(--color-bg-elevated)" }}><button onClick={onClose} style={{ fontFamily:"var(--font-mono)", fontSize:"0.72rem", background:"none", border:"1px solid var(--border-subtle)", color:"var(--color-comment)", padding:"0.4rem 0.9rem", borderRadius:4, cursor:"pointer" }}>Cancel</button><button onClick={apply} className="btn-primary" style={{ padding:"0.4rem 1.1rem", fontSize:"0.72rem" }}>Apply Theme</button></div>
  </motion.div></motion.div></AnimatePresence>;
}