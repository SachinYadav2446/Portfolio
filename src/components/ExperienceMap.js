"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Compass, FolderKanban, GraduationCap, Target } from "lucide-react";

const FILTERS = ["All", "Education", "Projects", "Achievements", "Next"];

const EVENTS = [
  { year: "2024", type: "Education", title: "JavaScript", detail: "First language", icon: BookOpen, color: "var(--color-gold)" },
  { year: "2024", type: "Education", title: "React.js", detail: "Frontend development", icon: BookOpen, color: "var(--color-rose)" },
  { year: "2024", type: "Education", title: "Backend development", detail: "APIs and server-side foundations", icon: BookOpen, color: "var(--color-sage)" },
  { year: "2024", type: "Education", title: "Java", detail: "Object-oriented programming", icon: GraduationCap, color: "var(--color-sky)" },
  { year: "2025", type: "Education", title: "Python data stack", detail: "Python, NumPy, Pandas, Seaborn, and Matplotlib", icon: BookOpen, color: "var(--color-gold)" },
  { year: "2025", type: "Projects", title: "Run-Rate Forecaster", detail: "Time-series forecasting project", icon: FolderKanban, color: "var(--color-sage)" },
  { year: "2026", type: "Education", title: "Supervised and unsupervised learning", detail: "Machine learning foundations", icon: GraduationCap, color: "var(--color-lavender)" },
  { year: "2026", type: "Projects", title: "DemandSight", detail: "Semester project", icon: FolderKanban, color: "var(--color-sky)" },
  { year: "2026", type: "Projects", title: "BrightCode", detail: "Side project", icon: Compass, color: "var(--color-rose)" },
  { year: "2026", type: "Projects", title: "Creatify", detail: "Summer holiday project", icon: Award, color: "var(--color-amber)" },
  { year: "Next", type: "Next", title: "NUMA", detail: "", icon: Target, color: "var(--color-wine-bright)", featured: true },
];

export default function ExperienceMap({ audio }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState("NUMA");
  const visible = useMemo(() => EVENTS.filter((event) => filter === "All" || event.type === filter), [filter]);
  const selected = EVENTS.find((event) => event.title === active) || visible[0];

  return (
    <section id="experience-map" style={{ background:"var(--color-bg-darker)", borderTop:"1px solid var(--border-subtle)", padding:"6rem 0" }}>
      <div className="container">
        <div style={{ display:"flex", alignItems:"end", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem", marginBottom:"1.7rem" }}>
          <div><div className="font-sans-title" style={{ color:"var(--color-sky)", marginBottom:"0.6rem" }}>INTERACTIVE EXPERIENCE MAP</div><h2 style={{ margin:0, fontSize:"clamp(2rem,4vw,3.5rem)" }}>A path built by <span style={{ color:"var(--color-sky)" }}>shipping.</span></h2><p style={{ maxWidth:650, margin:"0.8rem 0 0" }}>Explore the intersections of education, product work, achievement, and the next role I am growing toward.</p></div>
          <div style={{ display:"flex", gap:"0.45rem", flexWrap:"wrap" }} role="tablist" aria-label="Experience map filter">{FILTERS.map((item) => <button key={item} role="tab" aria-selected={filter === item} onClick={() => { setFilter(item); audio?.playClick(); }} onMouseEnter={() => audio?.playHover()} style={{ background:filter === item ? "var(--color-bg-elevated)" : "transparent", border:`1px solid ${filter === item ? "var(--color-sky)" : "var(--border-subtle)"}`, borderRadius:4, padding:"0.4rem 0.6rem", color:filter === item ? "var(--color-cream)" : "var(--color-comment)", fontFamily:"var(--font-mono)", fontSize:"0.65rem", cursor:"pointer" }}>{item}</button>)}</div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1.45fr) minmax(260px,0.55fr)", gap:"1rem" }} className="experience-layout">
          <div style={{ position:"relative", padding:"0.3rem 0" }}>
            <div style={{ position:"absolute", top:0, bottom:0, left:79, width:1, background:"var(--border-subtle)" }} />
            {visible.map((event, index) => { const Icon = event.icon; const isActive = event.title === active; return <motion.button key={event.title} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:index * 0.04 }} whileHover={{ x:6 }} onClick={() => { setActive(event.title); audio?.playClick(); }} onMouseEnter={() => audio?.playHover()} style={{ width:"100%", display:"grid", gridTemplateColumns:"64px 30px minmax(0,1fr)", gap:"0.9rem", alignItems:"start", textAlign:"left", background:isActive && !event.featured ? "var(--color-bg-card)" : "transparent", border:`1px solid ${isActive && !event.featured ? event.color : "transparent"}`, borderRadius:5, boxShadow:"none", padding:"0.75rem", cursor:"pointer", position:"relative", color:"inherit", marginBottom:"0.25rem" }}><span style={{ fontFamily:"var(--font-mono)", fontSize:"0.68rem", color:"var(--color-comment)", paddingTop:"0.25rem" }}>{event.year}</span><span style={{ width:26, height:26, borderRadius:"50%", background:"var(--color-bg)", border:`2px solid ${event.color}`, color:event.color, display:"grid", placeItems:"center", zIndex:1 }}><Icon size={12}/></span><span><span style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" }}><b style={{ color:"var(--color-cream)", fontSize:"0.92rem" }}>{event.title}</b><em style={{ fontStyle:"normal", color:event.color, fontFamily:"var(--font-mono)", fontSize:"0.58rem", border:`1px solid ${event.color}55`, padding:"0.08rem 0.28rem", borderRadius:3 }}>{event.type}</em></span>{event.detail && <span style={{ display:"block", color:"var(--color-cream-muted)", fontSize:"0.78rem", lineHeight:1.55, marginTop:"0.3rem" }}>{event.detail}</span>}</span></motion.button>})}
          </div>
          {selected.featured ? <motion.div initial={{ opacity:0, scale:0.86, y:14 }} animate={{ opacity:1, scale:1, y:0 }} transition={{ type:"spring", stiffness:300, damping:18 }} style={{ alignSelf:"center", textAlign:"center", padding:"2rem 1rem" }}><div className="font-sans-title" style={{ color:selected.color, marginBottom:"0.5rem" }}>NEXT BIG PROJECT</div><h3 style={{ margin:0, color:selected.color, fontSize:"clamp(3rem,8vw,5rem)", letterSpacing:"0.08em", textShadow:`0 0 28px ${selected.color}` }}>{selected.title}</h3></motion.div> : <aside className="glass-card" style={{ padding:"1.25rem", alignSelf:"start", position:"sticky", top:95 }}><div className="font-sans-title" style={{ color:selected.color, marginBottom:"0.65rem" }}>Selected milestone</div><selected.icon size={24} color={selected.color} style={{ marginBottom:"0.75rem" }}/><h3 style={{ margin:"0 0 0.6rem", fontSize:"1.35rem" }}>{selected.title}</h3>{selected.detail && <p style={{ margin:0, fontSize:"0.88rem" }}>{selected.detail}</p>}<div style={{ marginTop:"1rem", paddingTop:"0.75rem", borderTop:"1px solid var(--border-subtle)", color:"var(--color-comment)", fontFamily:"var(--font-mono)", fontSize:"0.65rem" }}>Timeline signal: {selected.type.toLowerCase()}</div></aside>}
        </div>
      </div>
    </section>
  );
}