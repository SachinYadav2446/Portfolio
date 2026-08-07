"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sword, Shield, Zap, Star, Trophy, Map, BookOpen,
         ChevronRight, Lock, CheckCircle, Clock, ExternalLink,
         Heart, Flame, Sparkles, Target, GitBranch } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const CHARACTER = {
  name:  "Sachin Yadav",
  class: "Full-Stack Mage",
  level: 20,
  xp:    18400,
  xpMax: 20000,
  hp:    95,
  mp:    88,
  title: "Code Architect of Bangalore",
  stats: [
    { label:"STR", full:"Strength",    val:72,  desc:"Raw backend power — Node, Go, Java",   icon:<Sword  size={13}/>, color:"var(--color-amber)"   },
    { label:"INT", full:"Intelligence",val:94,  desc:"ML & algorithms knowledge depth",       icon:<Zap    size={13}/>, color:"var(--color-sky)"     },
    { label:"DEX", full:"Dexterity",   val:88,  desc:"Speed of shipping clean code",          icon:<Flame  size={13}/>, color:"var(--color-wine)"    },
    { label:"WIS", full:"Wisdom",      val:85,  desc:"System design & architecture sense",    icon:<Shield size={13}/>, color:"var(--color-lavender)"},
    { label:"CHA", full:"Charisma",    val:78,  desc:"UI/UX & presentation quality",          icon:<Star   size={13}/>, color:"var(--color-rose)"    },
    { label:"LCK", full:"Luck",        val:66,  desc:"How often prod deploys first-try",      icon:<Sparkles size={13}/>,color:"var(--color-sage)"   },
  ],
};

const SKILL_TREE = [
  {
    id:"backend", name:"Backend Arts", icon:"⚔️", color:"var(--color-amber)",
    skills:[
      { name:"Python Mastery",   level:5, maxLevel:5, unlocked:true,  desc:"NumPy · Pandas · FastAPI · PyTorch" },
      { name:"Go Sorcery",       level:4, maxLevel:5, unlocked:true,  desc:"Goroutines · gRPC · high-perf APIs" },
      { name:"Node.js Craft",    level:4, maxLevel:5, unlocked:true,  desc:"Express · Socket.IO · REST" },
      { name:"Java Discipline",  level:4, maxLevel:5, unlocked:true,  desc:"OOP · Spring patterns · LLD/HLD" },
      { name:"Database Lore",    level:4, maxLevel:5, unlocked:true,  desc:"PostgreSQL · MongoDB · AWS RDS" },
      { name:"System Architect", level:3, maxLevel:5, unlocked:true,  desc:"HLD · LLD · microservices" },
    ],
  },
  {
    id:"ml", name:"Machine Learning Grimoire", icon:"🔮", color:"var(--color-lavender)",
    skills:[
      { name:"Supervised Spells",  level:4, maxLevel:5, unlocked:true,  desc:"Classification · Regression · Eval" },
      { name:"Unsupervised Magic",  level:3, maxLevel:5, unlocked:true,  desc:"Clustering · PCA · Anomaly det." },
      { name:"Deep Learning Runes", level:3, maxLevel:5, unlocked:true,  desc:"PyTorch · CNNs · training loops" },
      { name:"Data Alchemy",        level:5, maxLevel:5, unlocked:true,  desc:"Pandas · NumPy · Matplotlib" },
      { name:"GenAI Scrolls",       level:3, maxLevel:5, unlocked:true,  desc:"OpenAI API · prompt engineering" },
      { name:"Time-Series Oracle",  level:4, maxLevel:5, unlocked:true,  desc:"ARIMA · MAPE · backtesting" },
    ],
  },
  {
    id:"frontend", name:"Frontend Enchantments", icon:"✨", color:"var(--color-sky)",
    skills:[
      { name:"React Conjuring",  level:5, maxLevel:5, unlocked:true,  desc:"Hooks · Context · App Router" },
      { name:"WebGL Summoning",  level:4, maxLevel:5, unlocked:true,  desc:"Three.js · R3F · custom shaders" },
      { name:"Animation Weaving",level:4, maxLevel:5, unlocked:true,  desc:"Framer Motion · spring physics" },
      { name:"CSS Sorcery",      level:4, maxLevel:5, unlocked:true,  desc:"Custom design systems · responsive" },
      { name:"TypeScript Shield",level:4, maxLevel:5, unlocked:true,  desc:"Strict mode · generics · types" },
      { name:"Pixel Artistry",   level:2, maxLevel:5, unlocked:false, desc:"UI/UX design principles" },
    ],
  },
  {
    id:"devops", name:"Cloud & DevOps Runes", icon:"☁️", color:"var(--color-sage)",
    skills:[
      { name:"AWS Conjuration",  level:3, maxLevel:5, unlocked:true,  desc:"Lambda · RDS · Amplify · S3" },
      { name:"Docker Alchemy",   level:3, maxLevel:5, unlocked:true,  desc:"Containers · Compose · images" },
      { name:"Git Mastery",      level:5, maxLevel:5, unlocked:true,  desc:"Branching · PRs · CI/CD" },
      { name:"CI/CD Pipeline",   level:2, maxLevel:5, unlocked:false, desc:"GitHub Actions · auto-deploy" },
      { name:"Cloud Architect",  level:2, maxLevel:5, unlocked:false, desc:"Serverless · distributed systems" },
    ],
  },
];

const QUESTS = [
  {
    id:"q1", status:"completed",
    title:"Bright Code — The Collaboration Dungeon",
    type:"Full-Stack Quest", difficulty:"★★★★☆",
    desc:"Build a real-time multi-user collaborative IDE with live code sync, role-based access, and Monaco Editor.",
    stack:["React.js","Socket.IO","Monaco Editor","Express","Node.js"],
    reward:"Real-Time Systems Badge · +400 XP",
    time:"6 weeks",
    live:"https://brightcode-client.onrender.com/",
    github:"#",
    icon:"⚔️",
  },
  {
    id:"q2", status:"completed",
    title:"DemandSight — The Prophecy Engine",
    type:"ML + Full-Stack Quest", difficulty:"★★★★☆",
    desc:"Forge a geospatial analytics portal that forecasts taxi demand across Bangalore using ARIMA time-series models.",
    stack:["FastAPI","Python","Statsmodels","Leaflet","AWS Amplify"],
    reward:"ML Engineer Badge · +380 XP",
    time:"5 weeks",
    live:"https://frontend.doh8i8audx0xv.amplifyapp.com/",
    github:"https://github.com/SachinYadav2446/Taxi-Demand-Forecasting-System-",
    icon:"🔮",
  },
  {
    id:"q3", status:"completed",
    title:"Run-Rate Forecaster — Oracle of Metrics",
    type:"Backend Quest", difficulty:"★★★☆☆",
    desc:"Craft a microservice API that predicts business metrics via ARIMA grid search with MAE/MAPE backtesting.",
    stack:["Python","FastAPI","Statsmodels","Pandas","Scikit-Learn"],
    reward:"Data Wizard Badge · +290 XP",
    time:"3 weeks",
    live:"#",
    github:"https://github.com/SachinYadav2446/Run-Rate-Forecaster",
    icon:"📜",
  },
  {
    id:"q4", status:"completed",
    title:"Resume Enhancer — The ATS Slayer",
    type:"AI Quest", difficulty:"★★★☆☆",
    desc:"Wield the OpenAI GPT-4 API to slay poorly-formatted resumes and optimize them for Applicant Tracking Systems.",
    stack:["Python","OpenAI API","FastAPI","React.js","PyPDF"],
    reward:"AI Mage Badge · +320 XP",
    time:"4 weeks",
    live:"#",
    github:"https://github.com/SachinYadav2446/Resume_Enhancer",
    icon:"🗡️",
  },
  {
    id:"q5", status:"completed",
    title:"Creatify — The 8-Tool Forge",
    type:"Full-Stack Quest", difficulty:"★★★★★",
    desc:"Unite 8 browser-native creative studios (video, image, logo, presentation) under one workspace with live PostgreSQL sync.",
    stack:["React 18","Vite","Node.js","Express","PostgreSQL","Canvas/SVG"],
    reward:"Master Craftsman Badge · +550 XP",
    time:"8 weeks",
    live:"https://video-editor-1-1xu2.onrender.com/",
    github:"https://github.com/SachinYadav2446/Video-editor",
    icon:"🏆",
  },
  {
    id:"q6", status:"active",
    title:"Internship — The Final Dungeon",
    type:"Career Quest", difficulty:"★★★★★",
    desc:"Seek a software engineering internship and prove mastery across backend, ML, and system design in a real team environment.",
    stack:["Everything","Collaboration","Problem Solving"],
    reward:"Professional Engineer Title · +∞ XP",
    time:"In Progress",
    live:"#contact",
    github:"#",
    icon:"🏰",
  },
];

const ACHIEVEMENTS = [
  { id:"a1",  icon:"🐍", name:"Pythonista",          desc:"Shipped 3+ Python projects in production",       unlocked:true,  rarity:"Epic"    },
  { id:"a2",  icon:"🌐", name:"WebGL Wizard",         desc:"Built real 3D WebGL experiences from scratch",   unlocked:true,  rarity:"Rare"    },
  { id:"a3",  icon:"⚡", name:"Real-Time Architect",  desc:"Built a live multi-user sync system",            unlocked:true,  rarity:"Epic"    },
  { id:"a4",  icon:"📊", name:"Data Alchemist",       desc:"Trained, evaluated & deployed ML models",        unlocked:true,  rarity:"Rare"    },
  { id:"a5",  icon:"🏗️", name:"System Designer",      desc:"Implemented LLD/HLD patterns in Java & Go",     unlocked:true,  rarity:"Uncommon"},
  { id:"a6",  icon:"🔗", name:"API Craftsman",        desc:"Designed RESTful APIs with proper auth & docs",  unlocked:true,  rarity:"Uncommon"},
  { id:"a7",  icon:"☁️", name:"Cloud Wanderer",       desc:"Deployed to AWS, Vercel, Render & Amplify",      unlocked:true,  rarity:"Rare"    },
  { id:"a8",  icon:"🎨", name:"Creative Coder",       desc:"Built an IDE-themed 3D animated portfolio",      unlocked:true,  rarity:"Legendary"},
  { id:"a9",  icon:"🤖", name:"GPT Whisperer",        desc:"Shipped an AI-powered product using GPT-4",      unlocked:true,  rarity:"Epic"    },
  { id:"a10", icon:"🌙", name:"3AM Debugger",         desc:"Fixed a prod bug between 2-4am",                 unlocked:true,  rarity:"Common"  },
  { id:"a11", icon:"🏆", name:"500+ Problems Solved", desc:"Solved 500+ DSA problems on competitive platforms", unlocked:true, rarity:"Epic"  },
  { id:"a12", icon:"🔓", name:"Internship Seeker",    desc:"Land a software engineering internship",         unlocked:false, rarity:"Legendary"},
];

const RARITY_COLORS = {
  Common:    { color:"var(--color-cream-muted)",  bg:"rgba(122,114,96,0.15)",   border:"rgba(122,114,96,0.3)"    },
  Uncommon:  { color:"var(--color-sage)",         bg:"rgba(104,211,145,0.1)",   border:"rgba(104,211,145,0.3)"   },
  Rare:      { color:"var(--color-sky)",          bg:"rgba(127,219,202,0.1)",   border:"rgba(127,219,202,0.3)"   },
  Epic:      { color:"var(--color-lavender)",     bg:"rgba(183,148,244,0.12)",  border:"rgba(183,148,244,0.35)"  },
  Legendary: { color:"var(--color-wine)",         bg:"rgba(212,175,55,0.15)",   border:"rgba(212,175,55,0.5)",   glow:true },
};

const NAV_TABS = [
  { id:"character", label:"Character",  icon:<Shield size={13}/>   },
  { id:"skills",    label:"Skill Tree", icon:<Zap size={13}/>      },
  { id:"quests",    label:"Quest Log",  icon:<BookOpen size={13}/> },
  { id:"achieve",   label:"Trophies",   icon:<Trophy size={13}/>   },
];

/* ═══════════════════════════════════════════════════════════
   REUSABLE: XP / stat bar
═══════════════════════════════════════════════════════════ */
function Bar({ value, max = 100, color = "var(--color-wine)", height = 8, animated = true }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background:"var(--color-bg-elevated)", borderRadius:"4px", overflow:"hidden", height, position:"relative" }}>
      <motion.div
        initial={{ width: animated ? 0 : `${pct}%` }}
        animate={{ width:`${pct}%` }}
        transition={{ duration:1.2, ease:"easeOut", delay:0.2 }}
        style={{ height:"100%", background:color, borderRadius:"4px",
          boxShadow:`0 0 8px ${color}66` }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CHARACTER SCREEN
═══════════════════════════════════════════════════════════ */
function CharacterScreen({ audio }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:"1.5rem", padding:"1.5rem" }}
      className="rpg-char-grid">

      {/* Left: avatar card */}
      <div>
        {/* Avatar */}
        <div style={{ background:"var(--color-bg-card)", border:"1px solid var(--glass-border)",
          borderRadius:"8px", padding:"1.5rem", marginBottom:"1rem", textAlign:"center",
          position:"relative", overflow:"hidden" }}>
          {/* Glow bg */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 70%)", pointerEvents:"none" }}/>
          {/* Avatar ring */}
          <div style={{ position:"relative", width:96, height:96, margin:"0 auto 1rem",
            borderRadius:"50%", background:"var(--color-bg-elevated)",
            border:"3px solid var(--color-wine)",
            boxShadow:"0 0 24px var(--color-wine-glow), inset 0 0 12px rgba(212,175,55,0.08)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.5rem" }}>
            🧙
            <div style={{ position:"absolute", bottom:2, right:2, width:16, height:16,
              borderRadius:"50%", background:"var(--color-sage)",
              border:"2px solid var(--color-bg-card)",
              boxShadow:"0 0 6px var(--color-sage)" }}/>
          </div>
          <h2 style={{ fontSize:"1.1rem", color:"var(--color-wine)", fontFamily:"var(--font-mono)",
            fontWeight:900, letterSpacing:"0.04em", marginBottom:"0.2rem" }}>{CHARACTER.name}</h2>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--color-cream-muted)",
            marginBottom:"0.75rem" }}>{CHARACTER.title}</div>
          <div style={{ display:"flex", gap:"0.5rem", justifyContent:"center", marginBottom:"1rem" }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem",
              background:"var(--color-wine-dim)", border:"1px solid var(--color-wine)",
              color:"var(--color-wine)", padding:"0.15rem 0.55rem", borderRadius:"10px", fontWeight:700 }}>
              {CHARACTER.class}
            </span>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem",
              background:"rgba(104,211,145,0.12)", border:"1px solid var(--color-sage)55",
              color:"var(--color-sage)", padding:"0.15rem 0.55rem", borderRadius:"10px" }}>
              LVL {CHARACTER.level}
            </span>
          </div>
          {/* XP bar */}
          <div style={{ marginBottom:"0.3rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between",
              fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-cream-muted)", marginBottom:"0.3rem" }}>
              <span>XP</span><span>{CHARACTER.xp.toLocaleString()} / {CHARACTER.xpMax.toLocaleString()}</span>
            </div>
            <Bar value={CHARACTER.xp} max={CHARACTER.xpMax} color="var(--color-wine)" height={6}/>
          </div>
        </div>

        {/* HP / MP */}
        <div style={{ background:"var(--color-bg-card)", border:"1px solid var(--glass-border)",
          borderRadius:"8px", padding:"1rem", marginBottom:"1rem" }}>
          {[
            { label:"HP", val:CHARACTER.hp, color:"var(--color-error)",  icon:<Heart size={12}/> },
            { label:"MP", val:CHARACTER.mp, color:"var(--color-sky)",    icon:<Zap size={12}/>   },
          ].map(s => (
            <div key={s.label} style={{ marginBottom:"0.75rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--color-cream-muted)", marginBottom:"0.3rem" }}>
                <span style={{ display:"flex", alignItems:"center", gap:"0.3rem", color:s.color }}>{s.icon}{s.label}</span>
                <span>{s.val}/100</span>
              </div>
              <Bar value={s.val} color={s.color} height={7}/>
            </div>
          ))}
        </div>

        {/* Equipped gear */}
        <div style={{ background:"var(--color-bg-card)", border:"1px solid var(--glass-border)", borderRadius:"8px", padding:"1rem" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.1em",
            color:"var(--color-comment)", marginBottom:"0.6rem" }}>Equipment</div>
          {[
            { slot:"Weapon",  item:"Next.js 16",      rarity:"Legendary", icon:"⚔️" },
            { slot:"Armor",   item:"TypeScript",       rarity:"Epic",      icon:"🛡️" },
            { slot:"Ring L",  item:"PyTorch",          rarity:"Rare",      icon:"💍" },
            { slot:"Ring R",  item:"PostgreSQL",       rarity:"Uncommon",  icon:"💍" },
            { slot:"Trinket", item:"AWS Amplify",      rarity:"Rare",      icon:"🔮" },
          ].map(g => {
            const r = RARITY_COLORS[g.rarity];
            return (
              <div key={g.slot} onMouseEnter={() => audio?.playHover()}
                style={{ display:"flex", alignItems:"center", gap:"0.5rem",
                  padding:"0.35rem 0.5rem", borderRadius:"4px", marginBottom:"0.2rem",
                  background:"var(--color-bg-elevated)", border:`1px solid ${r.border}`,
                  cursor:"default", transition:"all .15s" }}
                className="rpg-gear-row">
                <span style={{ fontSize:"0.9rem" }}>{g.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)" }}>{g.slot}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:r.color, fontWeight:700 }}>{g.item}</div>
                </div>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.55rem",
                  background:r.bg, color:r.color, border:`1px solid ${r.border}`,
                  padding:"0.05rem 0.35rem", borderRadius:"3px" }}>{g.rarity}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: stats */}
      <div>
        <div style={{ background:"var(--color-bg-card)", border:"1px solid var(--glass-border)",
          borderRadius:"8px", padding:"1.25rem", marginBottom:"1rem" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", textTransform:"uppercase",
            letterSpacing:"0.1em", color:"var(--color-comment)", marginBottom:"1rem" }}>Base Stats</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }} className="rpg-stats-grid">
            {CHARACTER.stats.map(stat => (
              <div key={stat.label} onMouseEnter={() => audio?.playHover()}
                style={{ background:"var(--color-bg-elevated)", border:"1px solid var(--border-subtle)",
                  borderRadius:"6px", padding:"0.85rem", cursor:"default",
                  borderLeft:`3px solid ${stat.color}`, transition:"all .2s" }}
                className="rpg-stat-card">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.5rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                    <span style={{ color:stat.color }}>{stat.icon}</span>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem",
                      color:"var(--color-cream-muted)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{stat.full}</span>
                  </div>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"1rem",
                    fontWeight:900, color:stat.color }}>{stat.val}</span>
                </div>
                <Bar value={stat.val} color={stat.color} height={5}/>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem",
                  color:"var(--color-comment)", marginTop:"0.4rem", fontStyle:"italic" }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio lore */}
        <div style={{ background:"var(--color-bg-card)", border:"1px solid var(--glass-border)",
          borderRadius:"8px", padding:"1.25rem" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", textTransform:"uppercase",
            letterSpacing:"0.1em", color:"var(--color-comment)", marginBottom:"0.75rem" }}>
            📜 Character Lore
          </div>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.78rem", color:"var(--color-cream-dim)",
            lineHeight:1.75, margin:0 }}>
            <span style={{ color:"var(--color-wine)" }}>Sachin Yadav</span> is a 3rd-year Computer Science student
            based in <span style={{ color:"var(--color-sage)" }}>Bangalore</span>, specializing in the arcane arts of{" "}
            <span style={{ color:"var(--color-sky)" }}>full-stack engineering</span>,{" "}
            <span style={{ color:"var(--color-lavender)" }}>machine learning pipelines</span>, and{" "}
            <span style={{ color:"var(--color-amber)" }}>backend systems design</span>.
          </p>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.78rem", color:"var(--color-cream-muted)",
            lineHeight:1.75, marginTop:"0.75rem", marginBottom:0 }}>
            Currently seeking an <span style={{ color:"var(--color-wine)", fontWeight:700 }}>internship quest</span> to
            apply skills in a real dungeon environment. Open to
            <span style={{ color:"var(--color-sage)" }}> open-source guilds</span> and
            <span style={{ color:"var(--color-sky)" }}> collaborative raids</span>.
          </p>
          <div style={{ marginTop:"1rem", display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
            <a href="#contact" className="btn-primary" style={{ padding:"0.45rem 1rem", fontSize:"0.7rem" }}
              onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
              ⚔️ Recruit Me
            </a>
            <a href="https://github.com/SachinYadav2446" target="_blank" rel="noopener noreferrer"
              className="btn-secondary" style={{ padding:"0.45rem 1rem", fontSize:"0.7rem" }}
              onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
              📜 View Scrolls (GitHub)
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) { .rpg-char-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .rpg-stats-grid { grid-template-columns: 1fr !important; } }
        .rpg-gear-row:hover { border-color: var(--color-wine) !important; }
        .rpg-stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
      `}</style>
    </div>
  );
}
