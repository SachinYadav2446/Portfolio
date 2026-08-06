"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileCode } from "lucide-react";

const QUESTS = [
  {
    id:"bright-code",  rarity:"Legendary", icon:"⚔️",
    name:"Bright Code",  subtitle:"The Collaborative Forge",
    difficulty:"★★★★★", type:"Main Quest",
    desc:"Build a real-time collaborative IDE where multiple heroes can code together. Vanquish socket race conditions and slay the latency dragon.",
    reward:"Real-time mastery · Socket.IO proficiency · Monaco Editor badge",
    stack:["React.js","Socket.IO","Monaco Editor","Express","Node.js"],
    stats:{ "Lines Defeated":"+3,847", "Bugs Slain":"124", "Co-dev Heroes":"3", "Latency":"<80ms" },
    status:"completed", xp:1200,
    live:"https://brightcode-client.onrender.com/", github:"#",
    color:"#FFD700",
  },
  {
    id:"demandsight",  rarity:"Epic", icon:"🗺️",
    name:"DemandSight", subtitle:"The Geospatial Oracle",
    difficulty:"★★★★☆", type:"Side Quest",
    desc:"Summon an ARIMA forecasting engine to predict taxi demand across the urban realm. Chart the heatmaps. Deploy the oracle to the cloud.",
    reward:"ML Forecaster title · AWS Amplify badge · Leaflet spell",
    stack:["React.js","FastAPI","Statsmodels","Pandas","Leaflet","AWS"],
    stats:{ "MAE Score":"4.2 rides", "Hotspots Mapped":"120+", "API Endpoints":"8", "Deploy Time":"<2min" },
    status:"completed", xp:950,
    live:"https://frontend.doh8i8audx0xv.amplifyapp.com/",
    github:"https://github.com/SachinYadav2446/Taxi-Demand-Forecasting-System-",
    color:"#C084FC",
  },
  {
    id:"creatify",     rarity:"Epic", icon:"🎨",
    name:"Creatify",    subtitle:"The 8-Realm Design Suite",
    difficulty:"★★★★☆", type:"Main Quest",
    desc:"Unite 8 creative kingdoms (video, image, logo, presentation, and more) into a single unified workspace. Forge JWT authentication and bind PostgreSQL to the realm.",
    reward:"Full-Stack Architect title · Canvas/SVG mastery · Auth Wizard badge",
    stack:["React 18","Vite","Node.js","Express","PostgreSQL","Canvas/SVG"],
    stats:{ "Studios Built":"8", "Lines Forged":"+6,241", "Auth":"JWT+Bcrypt", "DB":"Neon PostgreSQL" },
    status:"completed", xp:1400,
    live:"https://video-editor-1-1xu2.onrender.com/",
    github:"https://github.com/SachinYadav2446/Video-editor",
    color:"#4ADE80",
  },
  {
    id:"forecaster",   rarity:"Rare", icon:"📊",
    name:"Run-Rate Forecaster", subtitle:"The Time Oracle",
    difficulty:"★★★☆☆", type:"Side Quest",
    desc:"Forge a microservice that peers into the future using ARIMA grid search. Measure its prophecy accuracy with MAE and MAPE backtesting rituals.",
    reward:"Time-Series Seer title · ARIMA spell",
    stack:["Python","FastAPI","Statsmodels","Pandas","Scikit-Learn"],
    stats:{ "ARIMA Orders":"48 tested", "MAPE":"<5%", "Endpoints":"5", "Response":"<200ms" },
    status:"completed", xp:700,
    live:"#",
    github:"https://github.com/SachinYadav2446/Run-Rate-Forecaster",
    color:"#FB923C",
  },
  {
    id:"resume",       rarity:"Rare", icon:"🤖",
    name:"Resume Enhancer", subtitle:"The AI Scribe",
    difficulty:"★★★☆☆", type:"Side Quest",
    desc:"Wield the OpenAI API to analyse resumes, score keyword relevance against ATS overlords, and suggest battle improvements.",
    reward:"AI Practitioner title · GPT-4 casting badge",
    stack:["Python","OpenAI API","FastAPI","React.js","PyPDF"],
    stats:{ "ATS Score":"0-100", "Keywords Checked":"50+", "Cost/req":"~$0.003", "Accuracy":"92%" },
    status:"completed", xp:600,
    live:"#",
    github:"https://github.com/SachinYadav2446/Resume_Enhancer",
    color:"#60A5FA",
  },
  {
    id:"internship",   rarity:"Mythic", icon:"🌟",
    name:"The Internship",  subtitle:"The Grand Campaign",
    difficulty:"★★★★★", type:"Active Quest",
    desc:"The final quest. Seek out a software engineering internship worthy of the skills forged. Bring full-stack mastery, ML knowledge, and a portfolio of conquered realms.",
    reward:"IRL XP · Real-world impact · Career advancement",
    stack:["Everything above"],
    stats:{ "Applications":"In progress", "Target":"SWE Intern", "Timeline":"2025", "Status":"Seeking" },
    status:"active", xp:9999,
    live:"#contact", github:"#",
    color:"#FFD700",
  },
];

const RARITY_COLOR = {
  Legendary:"#FFD700", Epic:"#C084FC", Rare:"#60A5FA", Mythic:"#FF6B6B",
};

function QuestCard({ quest, active, onClick, audio }) {
  const rc = RARITY_COLOR[quest.rarity] || "#fff";
  return (
    <motion.div
      whileHover={{ x:3 }}
      onClick={() => { onClick(); audio?.playClick(); }}
      onMouseEnter={() => audio?.playHover()}
      style={{
        padding:"0.75rem", cursor:"pointer",
        background: active ? "var(--color-bg-elevated)" : "transparent",
        borderLeft:`3px solid ${active ? quest.color : "transparent"}`,
        borderBottom:"1px solid var(--border-subtle)",
        transition:"all .15s",
      }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.3rem" }}>
        <span style={{ fontSize:"1.1rem" }}>{quest.icon}</span>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem", fontWeight:700,
          color: active ? quest.color : "var(--color-cream-dim)" }}>{quest.name}</span>
        <span style={{ marginLeft:"auto", fontFamily:"var(--font-mono)", fontSize:"0.58rem",
          color:rc, background:`${rc}18`, border:`1px solid ${rc}44`,
          padding:"0.05rem 0.35rem", borderRadius:"3px" }}>{quest.rarity}</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-cream-muted)" }}>{quest.type}</span>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-gold)" }}>{quest.difficulty}</span>
        <span style={{ marginLeft:"auto", fontFamily:"var(--font-mono)", fontSize:"0.6rem",
          color: quest.status==="active" ? "var(--color-sage)" : "var(--color-comment)" }}>
          {quest.status==="active" ? "⚡ ACTIVE" : "✓ DONE"}
        </span>
      </div>
    </motion.div>
  );
}

export default function RPGQuests({ audio }) {
  const [activeId, setActiveId] = useState("bright-code");
  const quest = QUESTS.find(q => q.id === activeId) || QUESTS[0];
  const rc = RARITY_COLOR[quest.rarity] || "#fff";

  return (
    <section id="pull-requests" style={{ background:"var(--color-bg)", borderTop:"1px solid var(--border-subtle)", padding:0, minHeight:"100vh", display:"flex", flexDirection:"column" }}>

      {/* Header */}
      <div style={{ background:"var(--color-bg-card)", borderBottom:"1px solid var(--border-subtle)", padding:"0.75rem 1.5rem",
        display:"flex", alignItems:"center", gap:"1rem" }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--color-gold)" }}>
          ⚔ Quest Log — {QUESTS.filter(q=>q.status==="completed").length}/{QUESTS.length} Completed
        </span>
        <div style={{ marginLeft:"auto", display:"flex", gap:"0.5rem" }}>
          {Object.entries(RARITY_COLOR).map(([r,c]) => (
            <span key={r} style={{ fontFamily:"var(--font-mono)", fontSize:"0.58rem", color:c, background:`${c}15`,
              border:`1px solid ${c}44`, padding:"0.05rem 0.35rem", borderRadius:"3px" }}>{r}</span>
          ))}
        </div>
      </div>

      <div style={{ flex:1, display:"grid", gridTemplateColumns:"280px 1fr", minHeight:0 }} className="rpg-quest-layout">

        {/* Quest list */}
        <div style={{ background:"var(--color-bg-card)", borderRight:"1px solid var(--border-subtle)", overflowY:"auto" }}>
          {QUESTS.map(q => (
            <QuestCard key={q.id} quest={q} active={activeId===q.id} onClick={() => setActiveId(q.id)} audio={audio}/>
          ))}
        </div>

        {/* Quest detail */}
        <AnimatePresence mode="wait">
          <motion.div key={quest.id}
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            transition={{ duration:.18 }}
            style={{ overflowY:"auto", padding:"2rem", background:"var(--color-bg)" }}
          >
            {/* Quest header */}
            <div style={{ marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.5rem", flexWrap:"wrap" }}>
                <span style={{ fontSize:"2rem" }}>{quest.icon}</span>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" }}>
                    <h2 style={{ fontFamily:"var(--font-mono)", fontSize:"1.3rem", color:quest.color, margin:0 }}>{quest.name}</h2>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:rc,
                      background:`${rc}18`, border:`1px solid ${rc}44`, padding:"0.15rem 0.5rem", borderRadius:"3px" }}>{quest.rarity}</span>
                    {quest.status==="active" && <span className="rpg-badge" style={{ borderColor:"var(--color-sage)", color:"var(--color-sage)", background:"rgba(74,222,128,0.1)" }}>⚡ Active Quest</span>}
                  </div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.72rem", color:"var(--color-cream-muted)" }}>
                    {quest.subtitle} · {quest.type} · {quest.difficulty}
                  </div>
                </div>
                <div style={{ marginLeft:"auto", display:"flex", gap:"0.5rem" }}>
                  {quest.github !== "#" && (
                    <a href={quest.github} target="_blank" rel="noopener noreferrer"
                      className="btn-secondary" style={{ padding:"0.4rem 0.85rem", fontSize:"0.68rem" }}
                      onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
                      <FileCode size={11}/> Code
                    </a>
                  )}
                  {quest.live !== "#" && (
                    <a href={quest.live} target={quest.live.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer" className="btn-primary"
                      style={{ padding:"0.4rem 0.85rem", fontSize:"0.68rem" }}
                      onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
                      <ExternalLink size={11}/> {quest.live===("#contact") ? "Contact" : "Live Demo"}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* XP reward */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.25rem" }}>
              <div className="rpg-badge">⭐ {quest.xp.toLocaleString()} XP</div>
              {quest.stack.map(t => (
                <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem",
                  background:"var(--color-bg-elevated)", border:"1px solid var(--glass-border)",
                  color:"var(--color-gold)", padding:"0.1rem 0.4rem", borderRadius:"3px" }}>{t}</span>
              ))}
            </div>

            {/* Description */}
            <div style={{ background:"var(--color-bg-card)", border:`1px solid ${quest.color}44`,
              borderLeft:`3px solid ${quest.color}`, borderRadius:"0 4px 4px 0",
              padding:"0.85rem 1.1rem", marginBottom:"1.25rem" }}>
              <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.78rem", color:"var(--color-cream-dim)", margin:0, lineHeight:1.7 }}>
                {quest.desc}
              </p>
            </div>

            {/* Reward */}
            <div style={{ background:"rgba(255,215,0,0.06)", border:"1px solid rgba(255,215,0,0.25)", borderRadius:"4px",
              padding:"0.75rem 1rem", marginBottom:"1.25rem" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--color-gold)", marginBottom:"0.35rem" }}>🎁 Quest Reward</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.74rem", color:"var(--color-cream-dim)" }}>{quest.reward}</div>
            </div>

            {/* Stats grid */}
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--color-comment)", marginBottom:"0.6rem" }}>📊 Quest Stats</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"0.6rem" }}>
              {Object.entries(quest.stats).map(([k,v]) => (
                <div key={k} style={{ background:"var(--color-bg-card)", border:"1px solid var(--border-subtle)",
                  borderRadius:"4px", padding:"0.6rem 0.85rem" }}>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-comment)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.2rem" }}>{k}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.88rem", fontWeight:700, color:quest.color }}>{v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @media (max-width: 800px) { .rpg-quest-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
