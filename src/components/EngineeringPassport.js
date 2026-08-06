"use client";

import React, { useState } from "react";
import { ArrowRight, Brain, Cloud, Code2, Database, Map, Server } from "lucide-react";

const PROJECTS = [
  { id:"run-rate", name:"Run-Rate Forecaster", route:"Python -> FastAPI -> Time Series", accent:"var(--color-sage)", stamps:["Python", "Pandas", "FastAPI", "Statsmodels", "Time Series"] },
  { id:"demand-sight", name:"DemandSight", route:"React -> API -> Forecast -> Map", accent:"var(--color-sky)", stamps:["React.js", "FastAPI", "Leaflet", "ARIMA", "AWS Amplify"] },
  { id:"bright-code", name:"BrightCode", route:"React -> Socket.IO -> Collaborative UI", accent:"var(--color-rose)", stamps:["React.js", "Socket.IO", "Node.js", "Monaco Editor", "MongoDB"] },
  { id:"creatify", name:"Creatify", route:"React -> API -> PostgreSQL", accent:"var(--color-gold)", stamps:["React.js", "PostgreSQL", "Node.js", "REST APIs"] },
];

const TECHNOLOGY_META = {
  "Python": { icon: Brain, note:"Data processing and forecasting workflows" },
  "Pandas": { icon: Database, note:"Time-series preparation and analysis" },
  "FastAPI": { icon: Server, note:"Typed API delivery for data products" },
  "Statsmodels": { icon: Brain, note:"Forecasting and backtesting tools" },
  "Time Series": { icon: Map, note:"Operational prediction and evaluation" },
  "React.js": { icon: Code2, note:"Interactive product interfaces" },
  "Leaflet": { icon: Map, note:"Geospatial data exploration" },
  "ARIMA": { icon: Brain, note:"Baseline forecasting model" },
  "AWS Amplify": { icon: Cloud, note:"Deployment and CI/CD workflow" },
  "Socket.IO": { icon: Server, note:"Real-time collaboration events" },
  "Node.js": { icon: Server, note:"Application services and APIs" },
  "Monaco Editor": { icon: Code2, note:"Browser-based code editing" },
  "MongoDB": { icon: Database, note:"Flexible collaborative data storage" },
  "PostgreSQL": { icon: Database, note:"Relational project data" },
  "REST APIs": { icon: Server, note:"Clear client and service boundaries" },
};

export default function EngineeringPassport({ audio }) {
  const [projectId, setProjectId] = useState(PROJECTS[0].id);
  const [stamp, setStamp] = useState(PROJECTS[0].stamps[0]);
  const project = PROJECTS.find((item) => item.id === projectId);
  const detail = TECHNOLOGY_META[stamp];
  const StampIcon = detail.icon;

  const selectProject = (id) => {
    const next = PROJECTS.find((item) => item.id === id);
    setProjectId(id);
    setStamp(next.stamps[0]);
    audio?.playClick();
  };

  return <section id="passport" style={{ background:"var(--color-bg-darker)", borderTop:"1px solid var(--border-subtle)", padding:"6rem 0" }}><div className="container"><div style={{ maxWidth:720, marginBottom:"1.75rem" }}><div className="font-sans-title" style={{ color:"var(--color-sky)", marginBottom:"0.6rem" }}>ENGINEERING PASSPORT</div><h2 style={{ margin:0, fontSize:"clamp(2rem,4vw,3.5rem)" }}>Stamps earned by <span style={{ color:"var(--color-sky)" }}>shipping.</span></h2><p style={{ margin:"0.8rem 0 0" }}>Each project leaves a trail of technologies crossed, from interface to infrastructure.</p></div><div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginBottom:"1rem" }}>{PROJECTS.map((item) => <button key={item.id} onClick={() => selectProject(item.id)} onMouseEnter={() => audio?.playHover()} style={{ background:item.id === projectId ? `${item.accent}22` : "transparent", border:`1px solid ${item.id === projectId ? item.accent : "var(--border-subtle)"}`, color:item.id === projectId ? "var(--color-cream)" : "var(--color-comment)", borderRadius:4, cursor:"pointer", padding:"0.45rem 0.65rem", fontFamily:"var(--font-mono)", fontSize:"0.68rem" }}>{item.name}</button>)}</div><div style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(260px,0.55fr)", gap:"1rem" }} className="passport-layout"><article className="glass-card" style={{ padding:"1.25rem", borderTop:`2px solid ${project.accent}` }}><div style={{ display:"flex", justifyContent:"space-between", gap:"1rem", alignItems:"start", flexWrap:"wrap" }}><div><div className="font-sans-title" style={{ color:project.accent, marginBottom:"0.45rem" }}>PROJECT ROUTE</div><h3 style={{ margin:0, fontSize:"1.35rem" }}>{project.name}</h3></div><span style={{ color:"var(--color-comment)", fontFamily:"var(--font-mono)", fontSize:"0.65rem" }}>{project.route}</span></div><div style={{ display:"flex", gap:"0.65rem", alignItems:"center", flexWrap:"wrap", marginTop:"1.4rem" }}>{project.stamps.map((item, index) => { const Icon = TECHNOLOGY_META[item].icon; const active = stamp === item; return <React.Fragment key={item}><button onClick={() => { setStamp(item); audio?.playClick(); }} onMouseEnter={() => audio?.playHover()} aria-pressed={active} style={{ width:82, minHeight:88, background:active ? `${project.accent}20` : "var(--color-bg-card)", border:`1px solid ${active ? project.accent : "var(--border-subtle)"}`, borderRadius:"50%", color:active ? project.accent : "var(--color-cream-muted)", cursor:"pointer", fontFamily:"var(--font-mono)", fontSize:"0.6rem", display:"grid", placeItems:"center", padding:"0.45rem", textAlign:"center" }}><Icon size={18}/><span>{item}</span></button>{index < project.stamps.length - 1 && <ArrowRight size={14} color="var(--color-comment)" className="passport-arrow"/>}</React.Fragment>})}</div></article><aside className="glass-card" style={{ padding:"1.25rem", alignSelf:"stretch" }}><StampIcon size={25} color={project.accent}/><div className="font-sans-title" style={{ color:project.accent, margin:"0.8rem 0 0.4rem" }}>CURRENT STAMP</div><h3 style={{ margin:"0 0 0.55rem", fontSize:"1.25rem" }}>{stamp}</h3><p style={{ margin:0, fontSize:"0.86rem", lineHeight:1.65 }}>{detail.note}</p></aside></div></div></section>;
}