"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Sword, AppWindow, FrameIcon, Check } from "lucide-react";
import { useTheme } from "./ThemeContext";

const THEMES = [
  {
    id:"ide",     name:"IDE / Editor",          icon:"💻",
    desc:"VS Code-style developer environment with file tabs, terminal, activity bar, and wine & cream palette.",
    preview:["#1A1014","#C8506A","#F5ECD7","#C8A96E"],
    tag:"Default",
  },
  {
    id:"rpg",     name:"RPG Interface",          icon:"⚔️",
    desc:"Video game character select screen with quest log, achievements, skill tree, and gold & purple palette.",
    preview:["#0D0D1A","#FFD700","#E8E0FF","#C084FC"],
    tag:"New",
  },
  {
    id:"os",      name:"Interactive OS",         icon:"🖥️",
    desc:"macOS-style desktop with draggable & resizable windows, Dock, menu bar, and working terminal.",
    preview:["#1C2B3A","#0071E3","#ECE9E3","#30D158"],
    tag:"New",
  },
  {
    id:"gallery", name:"Museum / Gallery",       icon:"🖼️",
    desc:"High-end editorial archive with Playfair Display typography, exhibit cards, and ink & cream palette.",
    preview:["#F8F6F1","#1A1A1A","#8B6F47","#3A5F8A"],
    tag:"New",
  },
];

export default function ThemeSettings({ onClose, audio }) {
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState(theme);

  const apply = () => {
    setTheme(selected);
    audio?.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.72)", zIndex:1000,
          display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity:0, scale:.94, y:16 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:.94, y:16 }}
          transition={{ duration:.22 }}
          onClick={e => e.stopPropagation()}
          style={{ background:"var(--color-bg-card)", border:"1px solid var(--glass-border-active)",
            borderRadius:8, width:"100%", maxWidth:600,
            boxShadow:"0 28px 80px rgba(0,0,0,0.75)", overflow:"hidden" }}
        >
          {/* Header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"1rem 1.25rem", background:"var(--color-bg-elevated)", borderBottom:"1px solid var(--border-subtle)" }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.82rem", fontWeight:700, color:"var(--color-cream)" }}>
              🎨 &nbsp;Color Theme
            </span>
            <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer",
              color:"var(--color-comment)", display:"flex", padding:"0.2rem" }}>
              <X size={15}/>
            </button>
          </div>

          {/* Theme cards */}
          <div style={{ padding:"1rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.65rem" }}>
            {THEMES.map(t => (
              <motion.div key={t.id} whileHover={{ scale:1.02 }}
                onClick={() => { setSelected(t.id); audio?.playClick(); }}
                onMouseEnter={() => audio?.playHover()}
                style={{
                  background: selected===t.id ? "var(--color-bg-elevated)" : "var(--color-bg-darker)",
                  border:`2px solid ${selected===t.id ? "var(--glass-border-active)" : "var(--border-subtle)"}`,
                  borderRadius:6, padding:"0.85rem", cursor:"pointer",
                  transition:"all .15s",
                  boxShadow: selected===t.id ? "0 0 12px var(--color-wine-glow)" : "none",
                  position:"relative",
                }}>
                {/* Swatches */}
                <div style={{ display:"flex", gap:3, marginBottom:"0.65rem" }}>
                  {t.preview.map((c,i) => (
                    <div key={i} style={{ width:16, height:16, borderRadius:3, background:c, border:"1px solid rgba(0,0,0,0.1)" }}/>
                  ))}
                  {theme===t.id && (
                    <span style={{ marginLeft:"auto", fontFamily:"var(--font-mono)", fontSize:"0.55rem", color:"var(--color-sage)",
                      display:"flex", alignItems:"center", gap:2 }}><Check size={9}/>Active</span>
                  )}
                </div>
                {/* Info */}
                <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"0.35rem" }}>
                  <span style={{ fontSize:"0.9rem" }}>{t.icon}</span>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem", fontWeight:700, color:"var(--color-cream)" }}>{t.name}</span>
                  {t.tag !== "Default" && (
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.55rem", fontWeight:700,
                      background:"var(--color-wine-dim)", border:"1px solid var(--glass-border-active)",
                      color:"var(--color-wine)", padding:"0.05rem 0.3rem", borderRadius:3, marginLeft:"auto" }}>{t.tag}</span>
                  )}
                </div>
                <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--color-cream-muted)", margin:0, lineHeight:1.5 }}>
                  {t.desc}
                </p>
                {selected===t.id && (
                  <div style={{ position:"absolute", top:8, right:8, width:16, height:16, borderRadius:"50%",
                    background:"var(--color-wine)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Check size={9} color="var(--color-bg)"/>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding:"0.75rem 1.25rem", borderTop:"1px solid var(--border-subtle)",
            display:"flex", justifyContent:"flex-end", gap:"0.6rem", background:"var(--color-bg-elevated)" }}>
            <button onClick={onClose}
              style={{ fontFamily:"var(--font-mono)", fontSize:"0.72rem", background:"none",
                border:"1px solid var(--border-subtle)", color:"var(--color-comment)",
                padding:"0.4rem 0.9rem", borderRadius:4, cursor:"pointer" }}
              onMouseEnter={() => audio?.playHover()}>
              Cancel
            </button>
            <button onClick={apply} className="btn-primary"
              style={{ padding:"0.4rem 1.1rem", fontSize:"0.72rem" }}
              onMouseEnter={() => audio?.playHover()}>
              Apply Theme
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
