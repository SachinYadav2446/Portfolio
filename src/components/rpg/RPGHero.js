"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATS = [
  { label:"STR  (Systems Design)",   val:88, color:"#FF6B6B" },
  { label:"INT  (ML / Algorithms)",  val:85, color:"#C084FC" },
  { label:"DEX  (Frontend / UI)",    val:82, color:"#60A5FA" },
  { label:"WIS  (Architecture)",     val:87, color:"#4ADE80" },
  { label:"CHA  (Open Source)",      val:75, color:"#FB923C" },
  { label:"LCK  (Available now)",    val:99, color:"#FFD700" },
];

const CLASS_BUILDS = [
  {
    id:"fullstack",  name:"Full-Stack Mage",    icon:"⚡",
    desc:"Wields React & Node.js to conjure full-stack apps from the void.",
    primary:"JavaScript", secondary:"Python", level:22,
    color:"#60A5FA",
  },
  {
    id:"ml",         name:"Data Warlock",       icon:"🔮",
    desc:"Commands NumPy arrays and PyTorch tensors to bend data to his will.",
    primary:"Python",     secondary:"ML/Stats",  level:19,
    color:"#C084FC",
  },
  {
    id:"systems",    name:"Systems Architect",  icon:"🏰",
    desc:"Designs distributed fortresses with LLD, HLD & battle-tested DSA.",
    primary:"Java/Go",    secondary:"DSA",       level:20,
    color:"#4ADE80",
  },
];

const ACHIEVEMENTS = [
  { icon:"⚔️",  name:"First Blood",       desc:"Deployed first production API",      unlocked:true  },
  { icon:"🏆",  name:"500 Commits",       desc:"Reached 500+ total commits",         unlocked:true  },
  { icon:"🧙",  name:"ML Practitioner",   desc:"Trained first neural network",        unlocked:true  },
  { icon:"🌐",  name:"WebGL Sorcerer",    desc:"Shipped 3D WebGL portfolio",          unlocked:true  },
  { icon:"🤝",  name:"Real-Time Sync",    desc:"Built live collaborative IDE",        unlocked:true  },
  { icon:"☁️",  name:"Cloud Summoner",    desc:"Deployed to AWS Lambda + Amplify",   unlocked:true  },
  { icon:"🔒",  name:"Auth Shield",       desc:"Implemented JWT + Bcrypt auth",       unlocked:true  },
  { icon:"🎯",  name:"DSA Master",        desc:"Solved 500+ problems",               unlocked:true  },
  { icon:"🚀",  name:"Internship Hunter", desc:"Complete — find perfect internship",  unlocked:false },
  { icon:"🌟",  name:"10k Stars",         desc:"Get 10k GitHub stars",               unlocked:false },
];

function StatBar({ stat, delay }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(stat.val), 300 + delay); return () => clearTimeout(t); }, [stat.val, delay]);
  return (
    <div style={{ marginBottom:"0.6rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.25rem",
        fontFamily:"var(--font-mono)", fontSize:"0.68rem" }}>
        <span style={{ color:"var(--color-cream-dim)" }}>{stat.label}</span>
        <span style={{ color:stat.color, fontWeight:700 }}>{stat.val}</span>
      </div>
      <div className="rpg-hp-bar">
        <motion.div className="rpg-hp-fill"
          initial={{ width:0 }}
          animate={{ width:`${stat.val}%` }}
          transition={{ duration:1.2, delay: delay/1000, ease:"easeOut" }}
          style={{ background: `linear-gradient(90deg, ${stat.color}88, ${stat.color})`,
            boxShadow:`0 0 6px ${stat.color}66` }}
        />
      </div>
    </div>
  );
}

export default function RPGHero({ audio }) {
  const [selectedClass, setSelectedClass] = useState("fullstack");
  const [hoveredAch,    setHoveredAch]    = useState(null);
  const cls = CLASS_BUILDS.find(c => c.id === selectedClass);
  const NAVBAR_H = 79;

  return (
    <section id="home" style={{
      minHeight:`calc(100vh - ${NAVBAR_H}px)`, marginTop:`${NAVBAR_H}px`,
      background:"var(--color-bg)", padding:"2rem 1.5rem",
      display:"flex", flexDirection:"column", gap:"1.5rem", position:"relative", overflow:"hidden",
    }}>
      {/* Starfield bg */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        {[...Array(60)].map((_,i) => (
          <div key={i} style={{
            position:"absolute",
            left:`${(Math.sin(i*127.1)*43758.5453 % 1 + 1) % 1 * 100}%`,
            top:`${(Math.sin(i*311.7)*12345.678 % 1 + 1) % 1 * 100}%`,
            width:`${1 + (i%3)*0.5}px`, height:`${1 + (i%3)*0.5}px`,
            borderRadius:"50%",
            background: i%5===0 ? "var(--color-gold)" : "rgba(232,224,255,0.3)",
            animation:`ide-blink ${3 + i%4}s ease-in-out ${i%3}s infinite`,
          }}/>
        ))}
      </div>

      <div style={{ position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"1fr 1.2fr 1fr", gap:"1.5rem", flex:1, minHeight:0 }} className="rpg-hero-grid">

        {/* LEFT — Character Sheet */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {/* Name plate */}
          <div className="rpg-border" style={{ padding:"1.25rem", textAlign:"center", background:"var(--color-bg-card)", position:"relative" }}>
            <div style={{ position:"absolute", top:-1, left:-1, width:12, height:12, borderTop:"2px solid var(--color-gold)", borderLeft:"2px solid var(--color-gold)" }}/>
            <div style={{ position:"absolute", top:-1, right:-1, width:12, height:12, borderTop:"2px solid var(--color-gold)", borderRight:"2px solid var(--color-gold)" }}/>
            <div style={{ position:"absolute", bottom:-1, left:-1, width:12, height:12, borderBottom:"2px solid var(--color-gold)", borderLeft:"2px solid var(--color-gold)" }}/>
            <div style={{ position:"absolute", bottom:-1, right:-1, width:12, height:12, borderBottom:"2px solid var(--color-gold)", borderRight:"2px solid var(--color-gold)" }}/>

            {/* Avatar */}
            <div style={{ width:72, height:72, margin:"0 auto 0.75rem", borderRadius:"50%",
              background:"linear-gradient(135deg, var(--color-bg-elevated), var(--color-bg-selection))",
              border:"2px solid var(--color-gold)", display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"2rem", boxShadow:"0 0 20px rgba(255,215,0,0.3)" }}>
              {cls?.icon}
            </div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"1rem", fontWeight:700, color:"var(--color-gold)", letterSpacing:"0.05em", marginBottom:"0.2rem" }}>
              SACHIN YADAV
            </div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:cls?.color, marginBottom:"0.5rem" }}>{cls?.name}</div>
            <div className="rpg-badge" style={{ margin:"0 auto" }}>LVL {cls?.level} · CS Undergrad</div>

            {/* XP bar */}
            <div style={{ marginTop:"0.75rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-cream-muted)", marginBottom:"0.2rem" }}>
                <span>XP</span><span>7,240 / 10,000</span>
              </div>
              <div className="rpg-xp-bar"><div className="rpg-xp-fill" style={{ width:"72%" }}/></div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ background:"var(--color-bg-card)", border:"1px solid var(--glass-border)", borderRadius:"4px", padding:"1rem" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--color-gold)", marginBottom:"0.75rem", display:"flex", alignItems:"center", gap:"0.4rem" }}>
              ⚔ Base Stats
            </div>
            {STATS.map((s,i) => <StatBar key={s.label} stat={s} delay={i*120}/>)}
          </div>
        </div>

        {/* CENTER — Class Select */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:"0.12em", color:"var(--color-gold)", textAlign:"center" }}>
            ◈ Choose Your Build ◈
          </div>

          {CLASS_BUILDS.map(c => (
            <motion.div key={c.id}
              whileHover={{ scale:1.02 }}
              onClick={() => { setSelectedClass(c.id); audio?.playClick(); }}
              onMouseEnter={() => audio?.playHover()}
              style={{
                background: selectedClass===c.id ? "var(--color-bg-elevated)" : "var(--color-bg-card)",
                border:`2px solid ${selectedClass===c.id ? c.color : "rgba(255,215,0,0.15)"}`,
                borderRadius:"4px", padding:"1rem", cursor:"pointer",
                boxShadow: selectedClass===c.id ? `0 0 16px ${c.color}44` : "none",
                transition:"all .2s",
              }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.5rem" }}>
                <span style={{ fontSize:"1.5rem" }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily:"var(--font-mono)", fontWeight:700, color: selectedClass===c.id ? c.color : "var(--color-cream)", fontSize:"0.85rem" }}>{c.name}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-cream-muted)" }}>
                    {c.primary} · {c.secondary} · Lv.{c.level}
                  </div>
                </div>
                {selectedClass===c.id && (
                  <div style={{ marginLeft:"auto", color:c.color, fontSize:"0.7rem" }}>▶ SELECTED</div>
                )}
              </div>
              <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--color-cream-muted)", margin:0, lineHeight:1.5 }}>{c.desc}</p>
            </motion.div>
          ))}

          {/* Quick actions */}
          <div style={{ display:"flex", gap:"0.75rem", marginTop:"auto" }}>
            <a href="#pull-requests" className="btn-primary" style={{ flex:1, justifyContent:"center", padding:"0.65rem" }}
              onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
              ⚔ View Quests
            </a>
            <a href="#contact" className="btn-secondary" style={{ flex:1, justifyContent:"center", padding:"0.65rem" }}
              onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
              📜 Hire Me
            </a>
          </div>
        </div>

        {/* RIGHT — Achievements */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--color-gold)" }}>
            🏆 Achievements ({ACHIEVEMENTS.filter(a=>a.unlocked).length}/{ACHIEVEMENTS.length})
          </div>

          {/* Progress */}
          <div>
            <div className="rpg-xp-bar">
              <div className="rpg-xp-fill" style={{ width:`${ACHIEVEMENTS.filter(a=>a.unlocked).length/ACHIEVEMENTS.length*100}%` }}/>
            </div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.58rem", color:"var(--color-cream-muted)", marginTop:"0.2rem", textAlign:"right" }}>
              {ACHIEVEMENTS.filter(a=>a.unlocked).length}/{ACHIEVEMENTS.length} unlocked
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem", overflowY:"auto" }}>
            {ACHIEVEMENTS.map((ach, i) => (
              <motion.div key={i}
                whileHover={{ scale:1.04 }}
                onMouseEnter={() => { setHoveredAch(i); audio?.playHover(); }}
                onMouseLeave={() => setHoveredAch(null)}
                onClick={() => audio?.playClick()}
                style={{
                  background: ach.unlocked ? "var(--color-bg-elevated)" : "var(--color-bg-card)",
                  border:`1px solid ${ach.unlocked ? "rgba(255,215,0,0.35)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius:"4px", padding:"0.6rem 0.5rem", cursor:"default",
                  opacity: ach.unlocked ? 1 : 0.4,
                  position:"relative", overflow:"hidden",
                  boxShadow: ach.unlocked ? "0 0 8px rgba(255,215,0,0.1)" : "none",
                  transition:"all .2s",
                }}
              >
                <div style={{ fontSize:"1.3rem", marginBottom:"0.2rem", filter: ach.unlocked ? "none" : "grayscale(1)" }}>{ach.icon}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", fontWeight:700, color: ach.unlocked ? "var(--color-gold)" : "var(--color-comment)", lineHeight:1.3 }}>{ach.name}</div>

                {/* Tooltip on hover */}
                {hoveredAch === i && (
                  <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
                    style={{ position:"absolute", bottom:"calc(100% + 4px)", left:"50%", transform:"translateX(-50%)",
                      background:"var(--color-bg-selection)", border:"1px solid var(--glass-border-active)",
                      borderRadius:"4px", padding:"0.3rem 0.6rem", fontFamily:"var(--font-mono)", fontSize:"0.6rem",
                      color:"var(--color-cream-dim)", whiteSpace:"nowrap", zIndex:10,
                      boxShadow:"0 4px 12px rgba(0,0,0,0.6)" }}>
                    {ach.desc}
                  </motion.div>
                )}

                {!ach.unlocked && (
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
                    background:"rgba(0,0,0,0.3)", fontSize:"1rem" }}>🔒</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1100px) { .rpg-hero-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 700px)  { .rpg-hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
