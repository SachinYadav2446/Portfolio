"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { ExternalLink, Minus, Maximize2, X, Folder, FileText, Globe, Mail, Terminal as TermIcon, Github } from "lucide-react";

/* ── Window data ─────────────────────────────────────── */
const WIN_DEFS = {
  about: {
    id:"about",   title:"About Sachin.txt",  icon:"📝",  w:560, h:420,
    initialPos:{ x:80,  y:90 },
  },
  projects: {
    id:"projects", title:"Projects",          icon:"💼",  w:680, h:500,
    initialPos:{ x:200, y:60 },
  },
  skills: {
    id:"skills",  title:"Skills.app",         icon:"⚙️",  w:460, h:480,
    initialPos:{ x:480, y:110 },
  },
  contact: {
    id:"contact", title:"Contact Info",       icon:"📬",  w:420, h:340,
    initialPos:{ x:120, y:200 },
  },
  terminal: {
    id:"terminal",title:"Terminal",           icon:"🖥️",  w:560, h:360,
    initialPos:{ x:340, y:150 },
  },
};

const PROJECTS = [
  { name:"Bright Code",        icon:"⚔️", stack:"React · Socket.IO · Node.js", live:"https://brightcode-client.onrender.com/" },
  { name:"DemandSight",        icon:"🗺️", stack:"FastAPI · Python · Leaflet · AWS", live:"https://frontend.doh8i8audx0xv.amplifyapp.com/", gh:"https://github.com/SachinYadav2446/Taxi-Demand-Forecasting-System-" },
  { name:"Creatify",           icon:"🎨", stack:"React 18 · Node.js · PostgreSQL", live:"https://video-editor-1-1xu2.onrender.com/", gh:"https://github.com/SachinYadav2446/Video-editor" },
  { name:"Resume Enhancer",    icon:"🤖", stack:"Python · OpenAI API · FastAPI", gh:"https://github.com/SachinYadav2446/Resume_Enhancer" },
  { name:"Run-Rate Forecaster", icon:"📊", stack:"Python · FastAPI · ARIMA", gh:"https://github.com/SachinYadav2446/Run-Rate-Forecaster" },
];

const SKILLS_GROUPS = [
  { label:"Languages",      items:["Python","Golang","Java","TypeScript","C++"], color:"#0071E3" },
  { label:"Backend",        items:["Node.js","Express","FastAPI","REST APIs"],   color:"#30D158" },
  { label:"Frontend",       items:["React","Next.js","Three.js","Framer Motion"],color:"#BF5AF2" },
  { label:"ML & Data",      items:["PyTorch","NumPy","Pandas","Scikit-learn"],   color:"#FF9F0A" },
  { label:"Cloud & DevOps", items:["AWS","Docker","PostgreSQL","MongoDB"],       color:"#FF375F" },
];

/* ── Draggable macOS-style window ──────────────────────── */
function OSWindow({ def, zIndex, onFocus, onClose, onMinimize, audio, children }) {
  const [pos,  setPos]  = useState(def.initialPos);
  const [size, setSize] = useState({ w: def.w, h: def.h });
  const [maximized, setMaximized] = useState(false);
  const dragRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart  = useRef({ mx:0, my:0, wx:0, wy:0 });

  const onTitleMouseDown = (e) => {
    if (maximized) return;
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = { mx:e.clientX, my:e.clientY, wx:pos.x, wy:pos.y };
    onFocus();
    const move = (mv) => {
      if (!isDragging.current) return;
      setPos({ x: dragStart.current.wx + mv.clientX - dragStart.current.mx,
               y: Math.max(26, dragStart.current.wy + mv.clientY - dragStart.current.my) });
    };
    const up = () => { isDragging.current = false; window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const windowStyle = maximized
    ? { position:"fixed", top:26, left:0, right:0, bottom:64, width:"auto", height:"auto", borderRadius:0, zIndex }
    : { position:"fixed", top:pos.y, left:pos.x, width:size.w, height:size.h, zIndex };

  return (
    <motion.div
      initial={{ opacity:0, scale:.92, y:20 }}
      animate={{ opacity:1, scale:1, y:0 }}
      exit={{ opacity:0, scale:.88, y:20 }}
      transition={{ duration:.2, ease:[0.22,1,0.36,1] }}
      className="os-window"
      style={windowStyle}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div className="os-titlebar" onMouseDown={onTitleMouseDown} style={{ cursor: maximized ? "default" : "move" }}>
        <div className="os-dot os-dot-red"   onClick={() => { onClose();    audio?.playClick(); }} title="Close"   style={{ cursor:"pointer" }}/>
        <div className="os-dot os-dot-yellow"onClick={() => { onMinimize(); audio?.playClick(); }} title="Minimise"style={{ cursor:"pointer" }}/>
        <div className="os-dot os-dot-green" onClick={() => { setMaximized(m => !m); audio?.playClick(); }} title="Maximise" style={{ cursor:"pointer" }}/>
        <span className="os-titlebar-label">{def.icon} {def.title}</span>
      </div>
      {/* Content */}
      <div style={{ flex:1, overflow:"auto", padding:0 }}>
        {children}
      </div>
      {/* Resize handle — bottom-right */}
      {!maximized && (
        <div
          style={{ position:"absolute", bottom:0, right:0, width:16, height:16, cursor:"se-resize", zIndex:10 }}
          onMouseDown={e => {
            e.preventDefault(); e.stopPropagation();
            const sx = e.clientX, sy = e.clientY, sw = size.w, sh = size.h;
            const move = mv => setSize({ w: Math.max(300, sw + mv.clientX - sx), h: Math.max(200, sh + mv.clientY - sy) });
            const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", up);
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" style={{ position:"absolute", bottom:3, right:3, opacity:.3 }}>
            <path d="M9 1L1 9M9 5L5 9M9 9" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
}

/* ── Window content components ─────────────────────────── */
function AboutContent() {
  return (
    <div style={{ padding:"1.5rem", fontFamily:"-apple-system, sans-serif", fontSize:"0.85rem", lineHeight:1.7, color:"#1D1D1F" }}>
      <div style={{ fontFamily:"monospace", fontSize:"0.72rem", color:"#8E8E93", marginBottom:"1rem" }}>
        Last modified: Aug 2026 &nbsp;·&nbsp; Plain Text &nbsp;·&nbsp; UTF-8
      </div>
      <h2 style={{ fontSize:"1.3rem", fontWeight:700, marginBottom:"0.75rem", color:"#1D1D1F" }}>Sachin Yadav</h2>
      <p style={{ marginBottom:"0.75rem", color:"#3D3D3F" }}>
        2nd-year Computer Science student at Bangalore. I build full-stack applications, ML pipelines, and real-time systems from the ground up.
      </p>
      <p style={{ marginBottom:"0.75rem", color:"#3D3D3F" }}>
        I write low-latency WebSocket servers, train neural networks with PyTorch and Pandas, design database schemas (SQL + MongoDB), and implement LLD/HLD system patterns in Java, Python, and Go.
      </p>
      <div style={{ background:"rgba(0,113,227,0.06)", border:"1px solid rgba(0,113,227,0.2)", borderRadius:8, padding:"0.85rem 1rem", marginTop:"1rem" }}>
        <div style={{ fontSize:"0.72rem", fontWeight:700, color:"#0071E3", marginBottom:"0.35rem" }}>Status</div>
        <div style={{ color:"#3D3D3F" }}>✅ &nbsp;Available for software engineering internships</div>
        <div style={{ color:"#3D3D3F" }}>📍 &nbsp;Bangalore, India</div>
        <div style={{ color:"#3D3D3F" }}>📧 &nbsp;yadavsachin2446@gmail.com</div>
      </div>
    </div>
  );
}

function ProjectsContent({ audio }) {
  const [selected, setSelected] = useState(0);
  const proj = PROJECTS[selected];
  return (
    <div style={{ display:"flex", height:"100%" }}>
      {/* Sidebar */}
      <div style={{ width:190, borderRight:"1px solid rgba(0,0,0,0.08)", background:"rgba(0,0,0,0.02)", overflowY:"auto" }}>
        {PROJECTS.map((p, i) => (
          <div key={i} onClick={() => { setSelected(i); audio?.playClick(); }}
            onMouseEnter={() => audio?.playHover()}
            style={{ padding:"0.65rem 1rem", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.5rem",
              background: selected===i ? "rgba(0,113,227,0.12)" : "transparent",
              borderLeft: selected===i ? "3px solid #0071E3" : "3px solid transparent",
              transition:"all .12s" }}>
            <span style={{ fontSize:"1.1rem" }}>{p.icon}</span>
            <span style={{ fontSize:"0.72rem", fontWeight: selected===i ? 600 : 400, color: selected===i ? "#0071E3" : "#3D3D3F" }}>{p.name}</span>
          </div>
        ))}
      </div>
      {/* Detail */}
      <div style={{ flex:1, padding:"1.5rem", overflowY:"auto" }}>
        <div style={{ fontSize:"1.2rem", marginBottom:"0.3rem" }}>{proj.icon}</div>
        <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#1D1D1F", marginBottom:"0.35rem" }}>{proj.name}</h3>
        <div style={{ fontFamily:"monospace", fontSize:"0.68rem", color:"#8E8E93", marginBottom:"1rem" }}>{proj.stack}</div>
        <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
          {proj.live && proj.live !== "#" && (
            <a href={proj.live} target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", gap:"0.3rem", background:"#0071E3", color:"#fff",
                padding:"0.35rem 0.85rem", borderRadius:20, fontSize:"0.72rem", fontWeight:600, textDecoration:"none" }}
              onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
              <Globe size={11}/> Open
            </a>
          )}
          {proj.gh && (
            <a href={proj.gh} target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", gap:"0.3rem", background:"rgba(0,0,0,0.08)", color:"#1D1D1F",
                padding:"0.35rem 0.85rem", borderRadius:20, fontSize:"0.72rem", fontWeight:600, textDecoration:"none" }}
              onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
              <Github size={11}/> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillsContent() {
  return (
    <div style={{ padding:"1.25rem", overflowY:"auto" }}>
      {SKILLS_GROUPS.map(g => (
        <div key={g.label} style={{ marginBottom:"1.1rem" }}>
          <div style={{ fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em",
            color:g.color, marginBottom:"0.45rem" }}>{g.label}</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
            {g.items.map(s => (
              <span key={s} style={{ background:`${g.color}15`, border:`1px solid ${g.color}44`,
                color: g.color === "#0071E3" ? "#0071E3" : "#3D3D3F",
                padding:"0.2rem 0.65rem", borderRadius:20, fontSize:"0.72rem", fontWeight:500 }}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactContent({ audio }) {
  const links = [
    { label:"Email",    value:"yadavsachin2446@gmail.com", href:"mailto:yadavsachin2446@gmail.com", icon:"✉️" },
    { label:"GitHub",   value:"SachinYadav2446",           href:"https://github.com/SachinYadav2446", icon:"🐙" },
    { label:"LinkedIn", value:"sachin-yadav-54646a322",    href:"https://www.linkedin.com/in/sachin-yadav-54646a322/", icon:"💼" },
    { label:"LeetCode", value:"SY_45",                     href:"https://leetcode.com/u/SY_45/", icon:"🏆" },
  ];
  return (
    <div style={{ padding:"1.5rem" }}>
      <p style={{ fontSize:"0.82rem", color:"#3D3D3F", marginBottom:"1.25rem", lineHeight:1.6 }}>
        Open to software engineering internships and open-source collaborations. Let&apos;s build something together.
      </p>
      {links.map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}
          style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.7rem 0",
            borderBottom:"1px solid rgba(0,0,0,0.06)", textDecoration:"none", transition:"background .12s" }}>
          <span style={{ fontSize:"1.1rem", width:28 }}>{l.icon}</span>
          <div>
            <div style={{ fontSize:"0.65rem", color:"#8E8E93", textTransform:"uppercase", letterSpacing:"0.06em" }}>{l.label}</div>
            <div style={{ fontSize:"0.8rem", color:"#0071E3", fontWeight:500 }}>{l.value}</div>
          </div>
          <ExternalLink size={12} color="#8E8E93" style={{ marginLeft:"auto" }}/>
        </a>
      ))}
    </div>
  );
}

function TerminalContent({ audio }) {
  const [lines, setLines] = useState([
    { kind:"out", text:"Last login: Sat Aug  6 10:24:11 on ttys000", color:"#8E8E93" },
    { kind:"out", text:"sachin-macbook ~ % ", color:"#30D158" },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef(null);
  const scrollerRef = useRef(null);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const prompt = { kind:"prompt", text:raw.trim() };
    const CMDS = {
      whoami:  [{ color:"#1D1D1F", text:"sachin_yadav — full-stack & ml engineer" }],
      pwd:     [{ color:"#1D1D1F", text:"/Users/sachin/portfolio" }],
      ls:      [{ color:"#0071E3", text:"about.txt  projects/  skills.app  contact.txt  README.md" }],
      skills:  [{ color:"#30D158", text:"Python · Golang · Java · React · Next.js · FastAPI · PyTorch · Docker · AWS" }],
      clear:   null,
      help:    [
        { color:"#8E8E93", text:"Available: whoami, pwd, ls, skills, github, clear, help" },
      ],
      github:  [{ color:"#0071E3", text:"Opening github.com/SachinYadav2446 …" }],
    };
    if (cmd === "clear") { setLines([]); setHist(p => [raw, ...p]); setHi(-1); return; }
    if (cmd === "github") { window.open("https://github.com/SachinYadav2446","_blank"); }
    const out = CMDS[cmd] ?? [{ color:"#FF3B30", text:`-bash: ${cmd}: command not found` }];
    setLines(p => [...p, prompt, ...out.map(o => ({ kind:"out", ...o })),
      { kind:"out", text:"sachin-macbook ~ % ", color:"#30D158" }]);
    setHist(p => [raw, ...p]); setHi(-1);
    audio?.playClick();
    setTimeout(() => {
      const el = scrollerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 30);
  };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:"rgba(30,30,30,0.97)", cursor:"text" }}
      onClick={() => inputRef.current?.focus()}>
      <div ref={scrollerRef} style={{ flex:1, overflowY:"auto", padding:"0.75rem 1rem", fontFamily:"monospace", fontSize:"0.78rem", lineHeight:1.6, color:"#e8e8e8" }}>
        {lines.map((l, i) => (
          <div key={i}>
            {l.kind === "prompt"
              ? <span><span style={{ color:"#30D158" }}>sachin-macbook ~ % </span><span style={{ color:"#e8e8e8" }}>{l.text}</span></span>
              : <span style={{ color: l.color || "#e8e8e8" }}>{l.text}</span>}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", padding:"0.5rem 1rem", borderTop:"1px solid rgba(255,255,255,0.08)", fontFamily:"monospace", fontSize:"0.78rem" }}>
        <span style={{ color:"#30D158", flexShrink:0 }}>sachin-macbook ~ % </span>
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key==="Enter") { run(input); setInput(""); }
            else if (e.key==="ArrowUp") { e.preventDefault(); const n = Math.min(hi+1,hist.length-1); setHi(n); setInput(hist[n]||""); }
            else if (e.key==="ArrowDown") { e.preventDefault(); const n = Math.max(hi-1,-1); setHi(n); setInput(n===-1?"":hist[n]||""); }
          }}
          style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"#e8e8e8", fontFamily:"monospace", fontSize:"0.78rem", caretColor:"#30D158" }}
          autoComplete="off" spellCheck={false}
          onMouseEnter={() => audio?.playHover()}
        />
      </div>
    </div>
  );
}

/* ── Main desktop export ─────────────────────────────── */
export default function OSDesktop({ audio }) {
  const [windows, setWindows]   = useState(["about","projects"]);
  const [minimized,setMinimized]= useState([]);
  const [zOrders, setZOrders]   = useState({ about:2, projects:1, skills:1, contact:1, terminal:1 });
  const [maxZ, setMaxZ]         = useState(3);
  const NAVBAR_H = 79;

  const openWindow = (id) => {
    if (!windows.includes(id)) setWindows(p => [...p, id]);
    setMinimized(p => p.filter(m => m !== id));
    focus(id);
    audio?.playClick();
  };
  const closeWindow = (id) => { setWindows(p => p.filter(w => w !== id)); audio?.playClick(); };
  const minimizeWindow = (id) => { setMinimized(p => [...p, id]); audio?.playClick(); };
  const focus = (id) => {
    const z = maxZ + 1;
    setMaxZ(z);
    setZOrders(p => ({ ...p, [id]: z }));
  };

  const DOCK_ITEMS = [
    { id:"about",    icon:"📝", label:"About" },
    { id:"projects", icon:"💼", label:"Projects" },
    { id:"skills",   icon:"⚙️", label:"Skills" },
    { id:"terminal", icon:"🖥️", label:"Terminal" },
    { id:"contact",  icon:"📬", label:"Contact" },
  ];

  const WINDOW_CONTENT = {
    about:    <AboutContent />,
    projects: <ProjectsContent audio={audio} />,
    skills:   <SkillsContent />,
    contact:  <ContactContent audio={audio} />,
    terminal: <TerminalContent audio={audio} />,
  };

  return (
    <div id="home" style={{ minHeight:`calc(100vh - ${NAVBAR_H}px)`, marginTop:NAVBAR_H,
      position:"relative", overflow:"hidden", userSelect:"none" }}>
      {/* macOS menu bar */}
      <div className="os-menubar" style={{ top:NAVBAR_H }}>
        <span style={{ fontWeight:700 }}>🍎</span>
        {["File","Edit","View","Window","Help"].map(m => (
          <span key={m} className="os-menubar-item">{m}</span>
        ))}
        <div style={{ flex:1 }}/>
        <span style={{ fontSize:"0.7rem", opacity:.8 }}>🔋 100%</span>
        <span style={{ fontSize:"0.7rem", opacity:.8 }}>📶</span>
        <span style={{ fontSize:"0.7rem", opacity:.8 }}>Thu Aug 6</span>
      </div>

      {/* Desktop background */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, #1C2B3A 0%, #2D1F3D 50%, #1A2E3D 100%)", zIndex:0 }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at 25% 40%, rgba(0,113,227,0.15) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(191,90,242,0.1) 0%, transparent 45%)" }}/>
      </div>

      {/* Desktop icons */}
      <div style={{ position:"absolute", top:56+NAVBAR_H, right:16, display:"flex", flexDirection:"column", gap:8, zIndex:5 }}>
        {DOCK_ITEMS.map(item => (
          <div key={item.id} className="os-desktop-icon" onDoubleClick={() => openWindow(item.id)} onMouseEnter={() => audio?.playHover()}>
            <span>{item.icon}</span>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.filter(id => !minimized.includes(id)).map(id => (
          <OSWindow key={id} def={WIN_DEFS[id]} zIndex={zOrders[id] || 1}
            onFocus={() => focus(id)} onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)} audio={audio}>
            {WINDOW_CONTENT[id]}
          </OSWindow>
        ))}
      </AnimatePresence>

      {/* Dock */}
      <div className="os-dock" style={{ bottom:16 }}>
        {DOCK_ITEMS.map(item => {
          const isOpen   = windows.includes(item.id) && !minimized.includes(item.id);
          const isMinimized = minimized.includes(item.id);
          return (
            <div key={item.id} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div className="os-dock-icon"
                style={{ background: isOpen ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)" }}
                onClick={() => isMinimized ? openWindow(item.id) : isOpen ? minimizeWindow(item.id) : openWindow(item.id)}
                onMouseEnter={() => audio?.playHover()}
                title={item.label}>
                {item.icon}
              </div>
              {isOpen && <div className="os-dock-dot"/>}
            </div>
          );
        })}
      </div>

      {/* Minimized strip */}
      {minimized.length > 0 && (
        <div style={{ position:"fixed", bottom:90, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8, zIndex:140 }}>
          {minimized.map(id => (
            <motion.div key={id} initial={{ scale:0, y:20 }} animate={{ scale:1, y:0 }}
              whileHover={{ scale:1.05 }}
              onClick={() => openWindow(id)} onMouseEnter={() => audio?.playHover()}
              style={{ background:"rgba(255,255,255,0.15)", backdropFilter:"blur(20px)",
                border:"1px solid rgba(255,255,255,0.25)", borderRadius:12, padding:"0.4rem 0.75rem",
                display:"flex", alignItems:"center", gap:"0.4rem", cursor:"pointer",
                fontSize:"0.72rem", color:"rgba(255,255,255,0.9)" }}>
              <span>{WIN_DEFS[id]?.icon}</span> {WIN_DEFS[id]?.title}
            </motion.div>
          ))}
        </div>
      )}

      <style jsx global>{`
        [data-theme="os"] .os-window { position: fixed !important; }
        [data-theme="os"] section#home { padding: 0 !important; }
      `}</style>
    </div>
  );
}
