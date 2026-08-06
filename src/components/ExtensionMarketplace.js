"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Star, Download, CheckCircle, Search, X } from "lucide-react";

const CATEGORIES = ["All","Languages","Frameworks","ML & Data","Cloud & DevOps","Tools"];

const EXTENSIONS = [
  {
    id:"python",          cat:"Languages",
    name:"Python",        publisher:"python-foundation",
    icon:"🐍",            tagline:"High-level, general-purpose language",
    desc:"Used for ML pipelines, FastAPI backends, data science scripts, and scripting. Primary language for all ML work.",
    version:"3.12.0",     stars:4.9,  downloads:"2.1M",  installs:"⬛⬛⬛⬛⬛",
    tags:["backend","ML","scripting"],
    color:"#C8A96E",      badge:"Verified",
  },
  {
    id:"golang",          cat:"Languages",
    name:"Golang",        publisher:"google",
    icon:"🐹",            tagline:"Fast, statically typed, compiled language",
    desc:"Used for high-performance backend services, system design implementations, and concurrent processing.",
    version:"1.22.0",     stars:4.7,  downloads:"890K",  installs:"⬛⬛⬛⬛░",
    tags:["backend","systems","concurrency"],
    color:"#8AAECC",      badge:"Verified",
  },
  {
    id:"java",            cat:"Languages",
    name:"Java",          publisher:"oracle",
    icon:"☕",            tagline:"OOP powerhouse for LLD & HLD patterns",
    desc:"Used for LLD/HLD system design, OOP patterns, DSA problem-solving, and interview preparation.",
    version:"21.0.0",     stars:4.6,  downloads:"3.2M",  installs:"⬛⬛⬛⬛░",
    tags:["OOP","DSA","system-design"],
    color:"#D4915A",      badge:"Verified",
  },
  {
    id:"typescript",      cat:"Languages",
    name:"TypeScript",    publisher:"microsoft",
    icon:"🔷",            tagline:"JavaScript with superpowers",
    desc:"Primary language for all Next.js and React projects. Strict mode enabled everywhere.",
    version:"5.4.0",      stars:4.9,  downloads:"4.8M",  installs:"⬛⬛⬛⬛⬛",
    tags:["frontend","type-safety"],
    color:"#C8506A",      badge:"Featured",
  },
  {
    id:"react-nextjs",    cat:"Frameworks",
    name:"React + Next.js", publisher:"meta + vercel",
    icon:"⚛️",            tagline:"The go-to full-stack React framework",
    desc:"Built 5+ production apps. Uses App Router, SSR, dynamic imports, and React Three Fiber integration.",
    version:"19 / 16",    stars:4.9,  downloads:"5.1M",  installs:"⬛⬛⬛⬛⬛",
    tags:["SSR","App Router","full-stack"],
    color:"#8AAECC",      badge:"Featured",
  },
  {
    id:"fastapi",         cat:"Frameworks",
    name:"FastAPI",       publisher:"tiangolo",
    icon:"⚡",            tagline:"Modern, fast Python web framework",
    desc:"Built 3 production APIs. Used for ML model serving, ARIMA forecasting endpoints, and resume ATS pipelines.",
    version:"0.111.0",    stars:4.8,  downloads:"1.2M",  installs:"⬛⬛⬛⬛░",
    tags:["async","REST","Python"],
    color:"#7BAE8A",      badge:"Verified",
  },
  {
    id:"socketio",        cat:"Frameworks",
    name:"Socket.IO",     publisher:"socketio",
    icon:"🔌",            tagline:"Real-time bidirectional communication",
    desc:"Core dependency for Bright Code IDE. Handles live code sync, cursor positions, and chat in real-time.",
    version:"4.7.0",      stars:4.7,  downloads:"980K",  installs:"⬛⬛⬛⬛░",
    tags:["real-time","websockets"],
    color:"#B09DC8",      badge:"Verified",
  },
  {
    id:"pytorch",         cat:"ML & Data",
    name:"PyTorch",       publisher:"meta-ai",
    icon:"🔥",            tagline:"Deep learning framework",
    desc:"Used for neural network experiments, supervised/unsupervised model training, and GenAI pipeline exploration.",
    version:"2.3.0",      stars:4.8,  downloads:"1.4M",  installs:"⬛⬛⬛⬛░",
    tags:["deep-learning","neural-nets","GPU"],
    color:"#D4915A",      badge:"Verified",
  },
  {
    id:"pandas-numpy",    cat:"ML & Data",
    name:"Pandas + NumPy",publisher:"pydata",
    icon:"🐼",            tagline:"Data manipulation & numerical computing",
    desc:"Daily driver for data cleaning, feature engineering, and time-series preprocessing in all ML projects.",
    version:"2.2 / 1.26", stars:4.9,  downloads:"6.3M",  installs:"⬛⬛⬛⬛⬛",
    tags:["data","arrays","preprocessing"],
    color:"#C8A96E",      badge:"Verified",
  },
  {
    id:"statsmodels",     cat:"ML & Data",
    name:"Statsmodels",   publisher:"statsmodels",
    icon:"📊",            tagline:"Statistical models & econometrics",
    desc:"Used in DemandSight and Run-Rate Forecaster for ARIMA grid search, MAE/MAPE backtesting.",
    version:"0.14.0",     stars:4.6,  downloads:"420K",  installs:"⬛⬛⬛⬛░",
    tags:["ARIMA","time-series","stats"],
    color:"#7BAE8A",      badge:null,
  },
  {
    id:"docker-aws",      cat:"Cloud & DevOps",
    name:"Docker + AWS",  publisher:"docker / amazon",
    icon:"🐳",            tagline:"Containerization + cloud deployment",
    desc:"Used for containerizing services, deploying on AWS Lambda, RDS, and Amplify. CI/CD via GitHub Actions.",
    version:"26 / current",stars:4.7, downloads:"3.8M",  installs:"⬛⬛⬛⬛░",
    tags:["containers","serverless","CI/CD"],
    color:"#8AAECC",      badge:"Verified",
  },
  {
    id:"postgresql",      cat:"Cloud & DevOps",
    name:"PostgreSQL",    publisher:"postgresql",
    icon:"🐘",            tagline:"Advanced open-source relational DB",
    desc:"Production DB in Creatify (via Neon serverless). Experience with schema design, queries, and AWS RDS.",
    version:"16.0",       stars:4.9,  downloads:"2.2M",  installs:"⬛⬛⬛⬛⬛",
    tags:["SQL","relational","serverless"],
    color:"#7BAE8A",      badge:"Verified",
  },
  {
    id:"threejs",         cat:"Tools",
    name:"Three.js / WebGL", publisher:"mrdoob",
    icon:"🌐",            tagline:"3D graphics for the browser",
    desc:"Used in this portfolio for the global particle field, interactive node map, and custom shader effects.",
    version:"0.184.0",    stars:4.8,  downloads:"1.1M",  installs:"⬛⬛⬛⬛░",
    tags:["3D","WebGL","shaders"],
    color:"#C8506A",      badge:"Featured",
  },
  {
    id:"framer-motion",   cat:"Tools",
    name:"Framer Motion", publisher:"framer",
    icon:"🎞️",           tagline:"Production-ready animation library",
    desc:"Powers all UI transitions, spring animations, and scroll-linked effects in this portfolio.",
    version:"12.40.0",    stars:4.8,  downloads:"2.4M",  installs:"⬛⬛⬛⬛⬛",
    tags:["animation","spring","gestures"],
    color:"#B09DC8",      badge:"Verified",
  },
  {
    id:"git",             cat:"Tools",
    name:"Git + GitHub",  publisher:"git-scm / github",
    icon:"🌿",            tagline:"Version control & collaboration",
    desc:"500+ commits across 10+ repositories. Uses branching strategies, PRs, and GitHub Actions for CI/CD.",
    version:"2.44.0",     stars:5.0,  downloads:"9.9M",  installs:"⬛⬛⬛⬛⬛",
    tags:["VCS","collaboration","CI"],
    color:"#7BAE8A",      badge:"Verified",
  },
];

function StarRating({ n }) {
  return (
    <span style={{ display:"flex", alignItems:"center", gap:"0.15rem" }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={9}
          fill={i <= Math.round(n) ? "var(--color-gold)" : "none"}
          color={i <= Math.round(n) ? "var(--color-gold)" : "var(--color-comment)"}/>
      ))}
      <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-gold)", marginLeft:"0.15rem" }}>{n}</span>
    </span>
  );
}

function InstallButton({ id, audio }) {
  const [state, setState] = useState("idle"); // idle | installing | installed
  const click = () => {
    if (state !== "idle") return;
    setState("installing");
    audio?.playClick();
    setTimeout(() => setState("installed"), 1400);
  };
  return (
    <button onClick={click}
      onMouseEnter={() => audio?.playHover()}
      style={{
        background: state==="installed" ? "rgba(123,174,138,0.15)"
                  : state==="installing" ? "var(--color-bg-selection)"
                  : "var(--color-wine)",
        border: state==="installed" ? "1px solid var(--color-sage)"
              : state==="installing" ? "1px solid var(--border-subtle)"
              : "none",
        color: state==="installed" ? "var(--color-sage)"
             : "var(--color-cream)",
        padding:"0.35rem 0.85rem", borderRadius:"4px", cursor: state==="idle" ? "pointer" : "default",
        fontFamily:"var(--font-mono)", fontSize:"0.68rem", fontWeight:700,
        display:"flex", alignItems:"center", gap:"0.35rem",
        minWidth:"90px", justifyContent:"center",
        transition:"all .25s",
      }}
    >
      {state === "idle"       && <><Package size={11}/> Install</>}
      {state === "installing" && <><span style={{ animation:"spin .8s linear infinite", display:"inline-block" }}>◌</span> Installing…</>}
      {state === "installed"  && <><CheckCircle size={11}/> Installed</>}
    </button>
  );
}

function ExtCard({ ext, onClick, audio }) {
  return (
    <motion.div
      whileHover={{ y:-2, boxShadow:"0 8px 24px rgba(0,0,0,0.45)" }}
      onClick={() => { onClick(ext); audio?.playClick(); }}
      onMouseEnter={() => audio?.playHover()}
      style={{
        background:"var(--color-bg-card)", border:"1px solid var(--border-subtle)",
        borderRadius:"6px", padding:"1rem", cursor:"pointer",
        transition:"border-color .2s",
        display:"flex", flexDirection:"column", gap:"0.5rem",
        borderTop:`2px solid ${ext.color}`,
      }}
      className="ext-card"
    >
      <div style={{ display:"flex", alignItems:"flex-start", gap:"0.65rem" }}>
        <span style={{ fontSize:"1.6rem", lineHeight:1, flexShrink:0 }}>{ext.icon}</span>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", flexWrap:"wrap" }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.82rem", fontWeight:700, color:"var(--color-cream)" }}>{ext.name}</span>
            {ext.badge && (
              <span style={{
                fontFamily:"var(--font-mono)", fontSize:"0.55rem",
                background: ext.badge==="Featured" ? "rgba(200,80,106,0.2)" : "rgba(123,174,138,0.15)",
                border: `1px solid ${ext.badge==="Featured" ? "var(--color-wine)" : "var(--color-sage)"}55`,
                color: ext.badge==="Featured" ? "var(--color-wine)" : "var(--color-sage)",
                padding:"0.05rem 0.35rem", borderRadius:"3px",
              }}>{ext.badge}</span>
            )}
          </div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)" }}>{ext.publisher}</div>
        </div>
      </div>
      <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--color-cream-muted)", margin:0, lineHeight:1.5 }}>{ext.tagline}</p>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.2rem" }}>
          <StarRating n={ext.stars}/>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.58rem", color:"var(--color-comment)", display:"flex", alignItems:"center", gap:"0.2rem" }}>
            <Download size={8}/> {ext.downloads}
          </span>
        </div>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-comment)", background:"var(--color-bg-elevated)", padding:"0.1rem 0.4rem", borderRadius:"3px" }}>v{ext.version}</span>
      </div>
    </motion.div>
  );
}

function ExtDetail({ ext, onClose, audio }) {
  return (
    <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}
      transition={{ duration:.2 }}
      style={{
        position:"fixed", right:0, top:0, bottom:0, width:"380px", zIndex:300,
        background:"var(--color-bg-card)", borderLeft:"1px solid var(--glass-border-active)",
        display:"flex", flexDirection:"column", overflow:"hidden",
        boxShadow:"-8px 0 32px rgba(0,0,0,0.6)",
      }}
    >
      {/* Header */}
      <div style={{ background:"var(--color-bg-elevated)", borderBottom:"1px solid var(--border-subtle)", padding:"0.75rem 1rem", display:"flex", alignItems:"center", gap:"0.5rem", flexShrink:0 }}>
        <span style={{ fontSize:"1.4rem" }}>{ext.icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.82rem", fontWeight:700, color:"var(--color-cream)" }}>{ext.name}</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)" }}>{ext.publisher} · v{ext.version}</div>
        </div>
        <button onClick={() => { onClose(); audio?.playClick(); }}
          style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-comment)", display:"flex", padding:"0.25rem" }}>
          <X size={14}/>
        </button>
      </div>
      {/* Body */}
      <div style={{ flex:1, overflowY:"auto", padding:"1.25rem" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
          <StarRating n={ext.stars}/>
          <InstallButton id={ext.id} audio={audio}/>
        </div>
        <div style={{ background:"var(--color-bg-darker)", border:"1px solid var(--border-subtle)", borderLeft:`3px solid ${ext.color}`, borderRadius:"0 4px 4px 0", padding:"0.75rem 1rem", marginBottom:"1rem" }}>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.74rem", color:"var(--color-cream-dim)", margin:0, lineHeight:1.7 }}>{ext.desc}</p>
        </div>
        <div style={{ marginBottom:"1rem" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-comment)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.5rem" }}>Tags</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
            {ext.tags.map(t => (
              <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", background:"var(--color-bg-elevated)", border:"1px solid var(--glass-border)", color:`${ext.color}`, padding:"0.15rem 0.5rem", borderRadius:"3px" }}>#{t}</span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:"1rem" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-comment)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.5rem" }}>Usage Bar</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.78rem", letterSpacing:"0.2em", color:ext.color }}>{ext.installs}</div>
        </div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-comment)", display:"flex", gap:"1.5rem" }}>
          <span><Download size={9}/> {ext.downloads} installs</span>
          <span style={{ display:"flex", alignItems:"center", gap:"0.2rem" }}><Star size={9} fill="var(--color-gold)" color="var(--color-gold)"/> {ext.stars} rating</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExtensionMarketplace({ audio }) {
  const [category,    setCategory]    = useState("All");
  const [query,       setQuery]       = useState("");
  const [selected,    setSelected]    = useState(null);

  const filtered = EXTENSIONS.filter(e =>
    (category === "All" || e.cat === category) &&
    (query === "" || e.name.toLowerCase().includes(query.toLowerCase()) || e.tags.some(t => t.includes(query.toLowerCase())))
  );

  return (
    <section id="marketplace" style={{ background:"var(--color-bg)", borderTop:"1px solid var(--border-subtle)", padding:0, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      {/* Tab */}
      <div className="ide-tab-bar">
        <div className="ide-tab active"><Package size={12} color="var(--color-wine)"/>extensions.marketplace</div>
        <div style={{ flex:1, borderBottom:"1px solid var(--border-subtle)" }}/>
        <div style={{ padding:"0 1rem", display:"flex", alignItems:"center", fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)" }}>
          {EXTENSIONS.length} extensions · {EXTENSIONS.filter(e=>e.badge==="Verified").length} verified
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ background:"var(--color-bg-card)", borderBottom:"1px solid var(--border-subtle)", padding:"0.6rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", background:"var(--color-bg-elevated)", border:"1px solid var(--border-subtle)", borderRadius:"4px", padding:"0.3rem 0.7rem", flex:1, maxWidth:"280px" }}>
          <Search size={11} color="var(--color-comment)"/>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search extensions…"
            style={{ background:"transparent", border:"none", outline:"none", color:"var(--color-cream)", fontFamily:"var(--font-mono)", fontSize:"0.72rem", width:"100%" }}
            onMouseEnter={() => audio?.playHover()}/>
          {query && <button onClick={() => setQuery("")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-comment)", display:"flex" }}><X size={9}/></button>}
        </div>
        <div style={{ display:"flex", gap:"0.35rem", flexWrap:"wrap" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => { setCategory(c); audio?.playClick(); }}
              onMouseEnter={() => audio?.playHover()}
              style={{
                fontFamily:"var(--font-mono)", fontSize:"0.65rem", cursor:"pointer",
                background: category===c ? "var(--color-wine)" : "var(--color-bg-elevated)",
                border: `1px solid ${category===c ? "var(--color-wine)" : "var(--border-subtle)"}`,
                color: category===c ? "var(--color-cream)" : "var(--color-cream-muted)",
                padding:"0.25rem 0.65rem", borderRadius:"3px", transition:"all .15s",
              }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Section label */}
      <div style={{ padding:"1.25rem 1.5rem 0.5rem", fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)", textTransform:"uppercase", letterSpacing:"0.08em" }}>
        05 / SKILLS AS EXTENSIONS &nbsp;—&nbsp; <span style={{ color:"var(--color-cream-muted)" }}>{filtered.length} results</span>
      </div>

      {/* Grid */}
      <div style={{ flex:1, overflowY:"auto", padding:"0.75rem 1.5rem 2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:"0.75rem" }}>
          <AnimatePresence>
            {filtered.map(ext => (
              <motion.div key={ext.id} layout initial={{ opacity:0, scale:.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:.96 }} transition={{ duration:.18 }}>
                <ExtCard ext={ext} onClick={setSelected} audio={audio}/>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"4rem", fontFamily:"var(--font-mono)", fontSize:"0.8rem", color:"var(--color-comment)" }}>
            No extensions match "{query}"
          </div>
        )}
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:299 }}
              onClick={() => setSelected(null)}/>
            <ExtDetail ext={selected} onClose={() => setSelected(null)} audio={audio}/>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .ext-card:hover { border-color: var(--glass-border-active) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
