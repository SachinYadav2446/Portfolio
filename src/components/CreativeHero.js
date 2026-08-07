"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronDown, Folder, FolderOpen, FileCode, FileText,
  Terminal, Music, Volume2, VolumeX, GitBranch, AlertCircle,
  CheckCircle, Info, X, Search, Bell, Settings, Maximize2,
  Copy, Check, ExternalLink, RefreshCw, Play, GitCommit
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════ */
const codeLines = (lines) => lines.map((line) => line ? [{ t: "plain", v: line }] : []);

const FILES = {
  "index.ts": { lang: "TypeScript", ext: "ts", lines: codeLines([
    "export const profile = {", '  name: "Sachin Yadav",', '  role: "Full-stack and machine learning engineer",', '  location: "Bangalore, India",', '  availability: "Open to internships",', "};", "", "export default profile;",
  ]) },
  "skills.ts": { lang: "TypeScript", ext: "ts", lines: codeLines([
    "export const skills = {",
    "  frontend: [",
    '    "JavaScript", "TypeScript", "HTML5", "CSS3",',
    '    "Tailwind CSS", "React.js", "Next.js",',
    "  ],",
    "  backend: [",
    '    "Node.js", "Spring Boot", "FastAPI", "REST APIs",',
    "  ],",
    "  databases: [",
    '    "MongoDB", "PostgreSQL", "SQL", "AWS RDS",',
    "  ],",
    "  languages: [",
    '    "Python", "Java", "JavaScript", "Golang",',
    "  ],",
    "  dataAndML: [",
    '    "NumPy", "Pandas", "Seaborn", "Matplotlib",',
    '    "Supervised Learning", "Unsupervised Learning",',
    '    "Time Series Forecasting",',
    "  ],",
    "  cloudAndTools: [",
    '    "GitHub", "AWS", "AWS RDS", "AWS Amplify",',
    '    "Netlify", "Render", "Railway", "AWS CloudShell", "EC2",',
    "  ],",
    "  computerScience: [",
    '    "Computer Architecture", "DBMS", "DSA",',
    '    "Operating Systems", "Computer Networks",',
    '    "Object-Oriented Programming", "System Design",',
    "  ],",
    "};",
    "",
    "export default skills;",
  ]) },
  "projects.ts": { lang: "TypeScript", ext: "ts", lines: codeLines([
    "export const projectCards = [", '  { name: "Run-Rate Forecaster", stack: "Python / Forecasting" },', '  { name: "DemandSight", stack: "React / FastAPI / ML" },', '  { name: "BrightCode", stack: "React / Socket.IO" },', '  { name: "Creatify", stack: "React / PostgreSQL" },', "];", "", "export default projectCards;",
  ]) },
  "contact.tsx": { lang: "TSX", ext: "tsx", lines: codeLines([
    "export function ContactForm() {", "  return (", "    <form>", '      <input name="subject" placeholder="Subject" required />', '      <textarea name="message" placeholder="Message" required />', '      <button type="submit">Open email draft</button>', "    </form>", "  );", "}",
  ]) },
};

const PROBLEMS = [
  { sev:"warn",  file:"index.ts",    line:9,  msg:"'location' could be more specific — consider adding city district" },
  { sev:"info",  file:"skills.ts",   line:1,  msg:"Skill inventory compiled successfully" },
  { sev:"warn",  file:"projects.ts", line:8,  msg:"Missing 'description' field in Project interface" },
];

const TREE = [
  { id:"src",          type:"folder", name:"src",           depth:0, open:true  },
  { id:"index.ts",     type:"file",   name:"index.ts",      depth:1, ext:"ts",   parent:"src" },
  { id:"pages",        type:"folder", name:"pages",         depth:1, open:true,  parent:"src" },
  { id:"skills.ts",    type:"file",   name:"skills.ts",     depth:2, ext:"ts",   parent:"pages" },
  { id:"projects.ts",  type:"file",   name:"projects.ts",   depth:2, ext:"ts",   parent:"pages" },
  { id:"contact.tsx",  type:"file",   name:"contact.tsx",   depth:2, ext:"tsx",  parent:"pages" },
  { id:"components",   type:"folder", name:"components",    depth:1, open:false, parent:"src" },
  { id:"public",       type:"folder", name:"public",        depth:0, open:false  },
  { id:"README.md",    type:"file",   name:"README.md",     depth:0, ext:"md"    },
  { id:"package.json", type:"file",   name:"package.json",  depth:0, ext:"json"  },
];

const EXT_COLOR = {
  ts:"#C8506A", tsx:"#E8A0A8", md:"#C8A96E", json:"#7BAE8A", default:"#6B5860",
};

/* ═══════════════════════════════════════════════════════════
   TERMINAL — fully interactive with real commands
═══════════════════════════════════════════════════════════ */
const BOOT_LINES = [
  { kind:"out", text:"Welcome to sachin-yadav/portfolio", color:"var(--color-sage)" },
  { kind:"out", text:'Type "help" to see available commands.', color:"var(--color-cream-muted)" },
  { kind:"out", text:"", color:"" },
];

const CMDS = {
  help:{
    out:[
      { color:"var(--color-rose)",         text:"Available commands:" },
      { color:"var(--color-cream-dim)",    text:"  whoami      — show who I am" },
      { color:"var(--color-cream-dim)",    text:"  skills      — list tech stack" },
      { color:"var(--color-cream-dim)",    text:"  projects    — view my work" },
      { color:"var(--color-cream-dim)",    text:"  contact     — get in touch" },
      { color:"var(--color-cream-dim)",    text:"  github      — open GitHub profile" },
      { color:"var(--color-cream-dim)",    text:"  linkedin    — open LinkedIn" },
      { color:"var(--color-cream-dim)",    text:"  resume      — download resume" },
      { color:"var(--color-cream-dim)",    text:"  git log     — show commit history" },
      { color:"var(--color-cream-dim)",    text:"  ls          — list files" },
      { color:"var(--color-cream-dim)",    text:"  cat <file>  — read a file" },
      { color:"var(--color-cream-dim)",    text:"  clear       — clear terminal" },
    ]
  },
  whoami:{
    out:[
      { color:"var(--color-wine)",         text:"Sachin Yadav" },
      { color:"var(--color-cream-dim)",    text:"3rd Year CS Student @ Bangalore" },
      { color:"var(--color-sage)",         text:"Full-Stack Engineer  |  ML Practitioner" },
      { color:"var(--color-sky)",          text:"Open to internships  |  Open to collabs" },
    ]
  },
  skills:{
    out:[
      { color:"var(--color-rose)",         text:"Languages:    Python · Golang · Java · C++ · JS/TS" },
      { color:"var(--color-gold)",         text:"Backend:      Node.js · Express · FastAPI · REST APIs" },
      { color:"var(--color-sky)",          text:"Frontend:     React · Next.js · Three.js · Framer" },
      { color:"var(--color-sage)",         text:"ML/Data:      PyTorch · NumPy · Pandas · Scikit-learn" },
      { color:"var(--color-amber)",        text:"Databases:    PostgreSQL · MongoDB · AWS RDS" },
      { color:"var(--color-lavender)",     text:"Cloud/DevOps: Docker · AWS Lambda · Amplify · Vercel" },
    ]
  },
  projects:{
    out:[
      { color:"var(--color-rose)",         text:"[01] Bright Code     — Real-time collaborative IDE" },
      { color:"var(--color-gold)",         text:"[02] DemandSight     — Geospatial fleet analytics" },
      { color:"var(--color-sky)",          text:"[03] Run-Rate API    — ARIMA forecasting service" },
      { color:"var(--color-sage)",         text:"[04] Resume Enhancer — AI ATS optimizer" },
      { color:"var(--color-amber)",        text:"[05] Creatify        — 8-in-1 design suite" },
      { color:"var(--color-lavender)",     text:"→ scroll to #projects for full details" },
    ]
  },
  contact:{
    out:[
      { color:"var(--color-cream-dim)",    text:"📧  yadavsachin2446@gmail.com" },
      { color:"var(--color-cream-dim)",    text:"📍  Bangalore, India" },
      { color:"var(--color-sage)",         text:"✓   Available for internships" },
      { color:"var(--color-sky)",          text:"→   scroll to #contact to reach out" },
    ]
  },
  github:{
    out:[{ color:"var(--color-wine)", text:"Opening github.com/SachinYadav2446 …" }],
    action:() => window.open("https://github.com/SachinYadav2446","_blank"),
  },
  linkedin:{
    out:[{ color:"var(--color-sky)", text:"Opening linkedin.com/in/sachin-yadav-54646a322 …" }],
    action:() => window.open("https://www.linkedin.com/in/sachin-yadav-54646a322/","_blank"),
  },
  resume:{
    out:[{ color:"var(--color-gold)", text:"📄  Resume available at: github.com/SachinYadav2446" }],
    action:() => window.open("https://github.com/SachinYadav2446","_blank"),
  },
  "git log":{
    out:[
      { color:"var(--color-wine)",     text:"* a1f3c9d (HEAD → main) feat: IDE-themed portfolio v3" },
      { color:"var(--color-cream-dim)",text:"* b2e4d1a feat: WebGL & 3D graphics" },
      { color:"var(--color-cream-dim)",text:"* c3d5e2b feat: FastAPI + ARIMA forecaster" },
      { color:"var(--color-cream-dim)",text:"* d4f6a3c feat: Creatify 8-in-1 suite" },
      { color:"var(--color-cream-dim)",text:"* e5a7b4d feat: real-time collab IDE" },
    ]
  },
  ls:{
    out:[
      { color:"var(--color-gold)",     text:"📁 src/     📁 public/    📄 README.md" },
      { color:"var(--color-cream-dim)",text:"📄 package.json    📄 next.config.mjs" },
    ]
  },
};

function InteractiveTerminal({ audio }) {
  const [history, setHistory]     = useState(BOOT_LINES);
  const [input,   setInput]       = useState("");
  const [cmdHist, setCmdHist]     = useState([]);
  const [histIdx, setHistIdx]     = useState(-1);
  const inputRef  = useRef(null);
  const scrollerRef = useRef(null);

  const scrollBottom = useCallback(() => {
    setTimeout(() => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    }, 30);
  }, []);

  const run = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const prompt = { kind:"prompt", text: raw.trim(), color:"var(--color-cream)" };

    if (cmd === "clear") {
      setHistory(BOOT_LINES);
      setCmdHist(p => [raw.trim(), ...p]);
      setHistIdx(-1);
      return;
    }

    // cat <file>
    if (cmd.startsWith("cat ")) {
      const fname = cmd.slice(4).trim();
      const fileData = FILES[fname];
      const outLines = fileData
        ? fileData.lines.slice(0,8).map((toks,i) => ({
            kind:"out",
            color:"var(--color-cream-muted)",
            text: `${String(i+1).padStart(2," ")}  ${ toks.map(t=>t.v).join("") }`,
          }))
        : [{ kind:"out", color:"var(--color-error)", text:`cat: ${fname}: No such file` }];
      setHistory(p => [...p, prompt, ...outLines, { kind:"out",text:"",color:"" }]);
      setCmdHist(p => [raw.trim(), ...p]);
      setHistIdx(-1);
      scrollBottom();
      return;
    }

    const def = CMDS[cmd];
    if (def) {
      setHistory(p => [...p, prompt, ...def.out.map(o=>({kind:"out",...o})), { kind:"out",text:"",color:"" }]);
      if (def.action) def.action();
    } else {
      setHistory(p => [...p, prompt,
        { kind:"out", color:"var(--color-error)", text:`bash: ${cmd}: command not found. Type "help".` },
        { kind:"out", text:"", color:"" },
      ]);
    }
    setCmdHist(p => [raw.trim(), ...p]);
    setHistIdx(-1);
    audio?.playClick();
    scrollBottom();
  }, [audio, scrollBottom]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(next);
      setInput(cmdHist[next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : cmdHist[next] || "");
    }
  };

  useEffect(() => { scrollBottom(); }, [history, scrollBottom]);

  return (
    <div
      style={{ display:"flex", flexDirection:"column", height:"100%", background:"var(--color-bg-darker)" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal tab header */}
      <div style={{
        display:"flex", alignItems:"center", gap:"0.5rem",
        padding:"0.35rem 0.75rem",
        background:"var(--color-bg-card)",
        borderBottom:"1px solid var(--border-subtle)",
        fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--color-comment)",
        flexShrink:0,
      }}>
        <Terminal size={11} color="var(--color-wine)" />
        <span style={{ color:"var(--color-cream-dim)" }}>TERMINAL</span>
        <span style={{ color:"var(--color-comment)" }}>— bash</span>
        <div style={{ flex:1 }} />
        <button onClick={() => { setHistory(BOOT_LINES); setInput(""); }}
          style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-comment)", display:"flex", alignItems:"center" }}
          title="Clear terminal"
        ><RefreshCw size={10} /></button>
      </div>

      {/* Output */}
      <div ref={scrollerRef} style={{
        flex:1, overflowY:"auto", padding:"0.6rem 0.75rem",
        fontFamily:"var(--font-mono)", fontSize:"0.73rem", lineHeight:1.6,
      }}>
        {history.map((line, i) => (
          <div key={i} style={{ minHeight:"1.2em" }}>
            {line.kind === "prompt" ? (
              <span>
                <span style={{ color:"var(--color-sage)",  fontWeight:700 }}>sachin</span>
                <span style={{ color:"var(--color-wine)" }}>@portfolio</span>
                <span style={{ color:"var(--color-cream-muted)" }}>:~$ </span>
                <span style={{ color:"var(--color-cream)" }}>{line.text}</span>
              </span>
            ) : (
              <span style={{ color: line.color || "var(--color-cream-muted)" }}>{line.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Input row */}
      <div style={{
        display:"flex", alignItems:"center",
        padding:"0.4rem 0.75rem",
        borderTop:"1px solid var(--border-subtle)",
        fontFamily:"var(--font-mono)", fontSize:"0.73rem",
        flexShrink:0,
      }}>
        <span style={{ color:"var(--color-sage)",  fontWeight:700, flexShrink:0 }}>sachin</span>
        <span style={{ color:"var(--color-wine)",  flexShrink:0 }}>@portfolio</span>
        <span style={{ color:"var(--color-cream-muted)", flexShrink:0 }}>:~$ </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          style={{
            flex:1, background:"transparent", border:"none", outline:"none",
            color:"var(--color-cream)", fontFamily:"var(--font-mono)", fontSize:"0.73rem",
            caretColor:"var(--color-wine)",
          }}
          autoComplete="off" spellCheck={false}
          placeholder='type "help"…'
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CODE EDITOR — clickable lines, hover tooltip, copy button
═══════════════════════════════════════════════════════════ */
const TOOLTIPS = {
  5:  "💡 name: \"Sachin Yadav\" — the person behind the code",
  6:  "💡 role: Full-Stack & ML Engineer",
  7:  "💡 year: 3 — 3rd year CS undergrad",
  9:  "💡 available: true — actively seeking internships!",
  11: "💡 stack: 9 core technologies",
  17: "💡 interests: what drives the work",
};

function CodeEditor({ activeFile, audio }) {
  const [activeLine,  setActiveLine]  = useState(6);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [tooltip,     setTooltip]     = useState(null);
  const [copied,      setCopied]      = useState(false);
  const fileData = FILES[activeFile] || FILES["index.ts"];
  const lines    = fileData.lines;

  const copyAll = () => {
    const text = lines.map(l => l.map(t => t.v).join("")).join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
    audio?.playClick();
  };

  const tokenClass = {
    comment:"token-comment", keyword:"token-keyword", function:"token-function",
    string:"token-string",   variable:"token-variable", number:"token-number",
    plain:"token-plain",     operator:"token-operator", class:"token-class",
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:"var(--color-bg)", position:"relative" }}>
      {/* Breadcrumb + copy btn */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0.3rem 0.75rem 0.3rem 1rem",
        background:"var(--color-bg-card)", borderBottom:"1px solid var(--border-subtle)",
        fontFamily:"var(--font-mono)", fontSize:"0.68rem", color:"var(--color-comment)",
        flexShrink:0,
      }}>
        <span>
          <span style={{ color:"var(--color-cream-muted)" }}>src</span>
          <span style={{ opacity:.5 }}> › </span>
          <span style={{ color:"var(--color-cream-dim)" }}>{activeFile}</span>
          <span style={{ opacity:.4 }}> — {fileData.lang}</span>
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ color:"var(--color-comment)", opacity:.7 }}>Ln {activeLine+1}</span>
          <button onClick={copyAll} title="Copy file" style={{
            background:"none", border:"none", cursor:"pointer",
            color: copied ? "var(--color-sage)" : "var(--color-comment)",
            display:"flex", alignItems:"center", gap:"0.25rem",
            fontFamily:"var(--font-mono)", fontSize:"0.62rem", transition:"color .2s",
          }}>
            {copied ? <Check size={11}/> : <Copy size={11}/>}
            {copied ? "copied!" : "copy"}
          </button>
        </div>
      </div>

      {/* Lines */}
      <div style={{ flex:1, overflowY:"auto", padding:"0.5rem 0", position:"relative" }}>
        {lines.map((toks, i) => (
          <div key={i}
            className="code-line"
            onMouseEnter={() => { setHoveredLine(i); if(TOOLTIPS[i]) setTooltip({ line:i, text:TOOLTIPS[i] }); audio?.playHover(); }}
            onMouseLeave={() => { setHoveredLine(null); setTooltip(null); }}
            onClick={() => { setActiveLine(i); audio?.playClick(); }}
            style={{
              background: i===activeLine ? "var(--color-bg-line)" : i===hoveredLine ? "var(--color-bg-elevated)" : "transparent",
              cursor:"pointer", paddingLeft:"1rem", paddingRight:"1rem",
              transition:"background .1s", position:"relative",
              borderLeft: i===activeLine ? "2px solid var(--color-wine)" : "2px solid transparent",
            }}
          >
            <span className="line-number" style={{ color: i===activeLine ? "var(--color-cream-dim)" : undefined }}>
              {i + 1}
            </span>
            <span style={{ flex:1, whiteSpace:"pre" }}>
              {toks.map((tok, j) => (
                <span key={j} className={tokenClass[tok.t] || "token-plain"}>{tok.v}</span>
              ))}
              {i === activeLine && <span className="blink-cursor">▌</span>}
            </span>
            {/* Inline tooltip */}
            {tooltip?.line === i && (
              <motion.div
                initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }}
                style={{
                  position:"absolute", right:"0.75rem", top:"50%", transform:"translateY(-50%)",
                  background:"var(--color-bg-selection)", border:"1px solid var(--glass-border-active)",
                  borderRadius:"4px", padding:"0.2rem 0.6rem",
                  fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-cream-dim)",
                  pointerEvents:"none", zIndex:20, whiteSpace:"nowrap",
                  boxShadow:"0 4px 12px rgba(0,0,0,0.5)",
                }}
              >
                {tooltip.text}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Minimap */}
      <div style={{
        position:"absolute", right:0, top:32, bottom:0, width:"64px",
        background:"var(--color-bg-card)", borderLeft:"1px solid var(--border-subtle)",
        overflow:"hidden", opacity:0.7,
      }} className="minimap">
        {lines.map((toks, i) => (
          <div key={i} onClick={() => setActiveLine(i)}
            style={{
              height:"3px", margin:"1px 4px",
              background: i===activeLine ? "var(--color-wine)" :
                toks.length ? "rgba(245,236,215,0.08)" : "transparent",
              borderRadius:"1px", cursor:"pointer",
              transition:"background .15s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FILE EXPLORER — clickable folders + files
═══════════════════════════════════════════════════════════ */
function FileExplorer({ activeFile, onFileClick, audio }) {
  const [openFolders, setOpenFolders] = useState(new Set(["src","pages"]));

  const toggle = (id) => {
    setOpenFolders(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
    audio?.playClick();
  };

  const visible = TREE.filter(item => {
    if (!item.parent) return true;
    // find ancestor chain
    let cur = item;
    while (cur.parent) {
      const par = TREE.find(t => t.id === cur.parent);
      if (!par || !openFolders.has(par.id)) return false;
      cur = par;
    }
    return true;
  });

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"0.5rem 0" }}>
      <div style={{
        padding:"0.3rem 0.75rem 0.5rem",
        fontFamily:"var(--font-mono)", fontSize:"0.6rem",
        textTransform:"uppercase", letterSpacing:"0.1em",
        color:"var(--color-comment)", fontWeight:700,
        borderBottom:"1px solid var(--border-subtle)", marginBottom:"0.25rem",
      }}>
        Explorer — portfolio
      </div>
      {visible.map(item => (
        <div
          key={item.id}
          className={`ide-tree-item${activeFile===item.id ? " active" : ""}`}
          style={{ paddingLeft:`${0.5 + item.depth * 0.85}rem` }}
          onClick={() => item.type==="folder" ? toggle(item.id) : (onFileClick(item.id), audio?.playClick())}
          onMouseEnter={() => audio?.playHover()}
        >
          {item.type === "folder" ? (
            <>
              {openFolders.has(item.id)
                ? <ChevronDown size={10} style={{ color:"var(--color-comment)", flexShrink:0 }}/>
                : <ChevronRight size={10} style={{ color:"var(--color-comment)", flexShrink:0 }}/>}
              {openFolders.has(item.id)
                ? <FolderOpen size={12} style={{ color:"#C8A96E", flexShrink:0 }}/>
                : <Folder     size={12} style={{ color:"#C8A96E", flexShrink:0 }}/>}
              <span style={{ color:"var(--color-cream-dim)" }}>{item.name}</span>
            </>
          ) : (
            <>
              <span style={{ width:10, flexShrink:0 }}/>
              <FileCode size={12} style={{ color: EXT_COLOR[item.ext]||EXT_COLOR.default, flexShrink:0 }}/>
              <span style={{ color: activeFile===item.id ? "var(--color-cream)" : "var(--color-cream-muted)" }}>
                {item.name}
              </span>
              {/* unsaved dot for active file */}
              {activeFile === item.id && (
                <span style={{ width:5, height:5, borderRadius:"50%", background:"var(--color-wine)", marginLeft:"auto", flexShrink:0 }}/>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROBLEMS PANEL
═══════════════════════════════════════════════════════════ */
function ProblemsPanel({ audio }) {
  const icons = {
    warn: <AlertCircle size={11} color="var(--color-amber)" />,
    info: <Info        size={11} color="var(--color-sky)"   />,
    err:  <X           size={11} color="var(--color-error)" />,
  };
  return (
    <div style={{ flex:1, overflowY:"auto", fontFamily:"var(--font-mono)", fontSize:"0.7rem" }}>
      <div style={{
        padding:"0.3rem 0.75rem",
        background:"var(--color-bg-elevated)",
        borderBottom:"1px solid var(--border-subtle)",
        color:"var(--color-comment)", fontSize:"0.6rem",
        display:"flex", alignItems:"center", gap:"0.5rem",
      }}>
        <AlertCircle size={10} color="var(--color-amber)"/>
        <span>{PROBLEMS.filter(p=>p.sev==="warn").length} warnings</span>
        <span style={{ opacity:.4 }}>·</span>
        <Info size={10} color="var(--color-sky)"/>
        <span>{PROBLEMS.filter(p=>p.sev==="info").length} info</span>
      </div>
      {PROBLEMS.map((p,i) => (
        <div key={i}
          onMouseEnter={() => audio?.playHover()}
          style={{
            display:"flex", alignItems:"flex-start", gap:"0.5rem",
            padding:"0.45rem 0.75rem",
            borderBottom:"1px solid var(--border-subtle)",
            cursor:"pointer", transition:"background .12s",
          }}
          className="ide-tree-item"
        >
          {icons[p.sev]}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ color:"var(--color-cream-dim)", marginBottom:"0.1rem" }}>{p.msg}</div>
            <div style={{ color:"var(--color-comment)", fontSize:"0.62rem" }}>{p.file}:{p.line}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   OUTLINE PANEL
═══════════════════════════════════════════════════════════ */
const OUTLINES = {
  "index.ts":   [
    { kind:"const",    name:"me",        color:"var(--color-sky)"   },
    { kind:"string",   name:"name",      color:"var(--color-gold)"  },
    { kind:"string",   name:"role",      color:"var(--color-gold)"  },
    { kind:"boolean",  name:"available", color:"var(--color-rose)"  },
    { kind:"string[]", name:"stack",     color:"var(--color-sky)"   },
    { kind:"string[]", name:"interests", color:"var(--color-sky)"   },
  ],
  "skills.ts":  [
    { kind:"h1", name:"Skills",  color:"var(--color-wine)" },
    { kind:"h2", name:"Skills",    color:"var(--color-rose)" },
    { kind:"h2", name:"Contact",   color:"var(--color-rose)" },
  ],
  "projects.ts":[
    { kind:"interface", name:"Project",  color:"var(--color-lavender)" },
    { kind:"const",     name:"projects", color:"var(--color-sky)"      },
  ],
  "contact.tsx":[
    { kind:"fn", name:"Contact", color:"var(--color-rose)" },
  ],
};

function OutlinePanel({ activeFile, audio }) {
  const symbols = OUTLINES[activeFile] || [];
  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{
        padding:"0.3rem 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.6rem",
        textTransform:"uppercase", letterSpacing:"0.08em",
        color:"var(--color-comment)", borderBottom:"1px solid var(--border-subtle)",
      }}>
        Outline
      </div>
      {symbols.map((sym, i) => (
        <div key={i}
          className="ide-tree-item"
          onMouseEnter={() => audio?.playHover()}
          onClick={() => audio?.playClick()}
          style={{ paddingLeft:"1rem" }}
        >
          <span style={{
            fontSize:"0.55rem", background:sym.color, color:"var(--color-bg)",
            padding:"0 0.25rem", borderRadius:"2px", fontWeight:700,
            fontFamily:"var(--font-mono)", flexShrink:0,
          }}>{sym.kind.slice(0,4)}</span>
          <span style={{ color:"var(--color-cream-dim)" }}>{sym.name}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   AUDIO WIDGET
═══════════════════════════════════════════════════════════ */
function AudioWidget({ audio }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:"0.5rem",
      background:"var(--color-bg-elevated)", border:"1px solid var(--glass-border)",
      borderRadius:"4px", padding:"0.3rem 0.65rem",
      fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)",
    }} onMouseEnter={() => audio?.playHover()}>
      <Music size={10} color={audio?.isActive ? "var(--color-sage)" : "var(--color-comment)"}
        style={{ animation: audio?.isActive ? "ide-blink 2s infinite" : "none" }}/>
      <span style={{ color: audio?.isActive ? "var(--color-sage)" : "var(--color-comment)" }}>
        {audio?.isActive ? "ambient:on" : "ambient:off"}
      </span>
      {audio?.isActive && (
        <input type="range" min="0" max="1" step="0.05"
          value={audio?.volume || 0}
          onChange={e => audio?.setVolume(parseFloat(e.target.value))}
          style={{ width:"40px", accentColor:"var(--color-wine)", cursor:"pointer" }}
          title="Volume"
        />
      )}
      <button onClick={() => audio?.toggleAudio()}
        style={{
          background: audio?.isActive ? "var(--color-wine)" : "var(--color-bg-selection)",
          border:"none", color:"var(--color-cream)",
          padding:"0.12rem 0.45rem", borderRadius:"3px", cursor:"pointer",
          fontFamily:"var(--font-mono)", fontSize:"0.58rem", fontWeight:700,
        }}
        onMouseEnter={() => audio?.playHover()}
      >{audio?.isActive ? "⏸" : "▶"}</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SEARCH SIDEBAR — live search across file names + content
═══════════════════════════════════════════════════════════ */
function SearchSidebar({ audio, onFileClick }) {
  const [q, setQ] = useState("");
  const results = q.length > 1
    ? Object.entries(FILES).flatMap(([fname, data]) => {
        const matches = data.lines
          .map((toks, i) => ({ line: i + 1, text: toks.map(t => t.v).join("") }))
          .filter(l => l.text.toLowerCase().includes(q.toLowerCase()));
        return matches.length ? [{ file: fname, matches }] : [];
      })
    : [];

  return (
    <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.4rem",
        background:"var(--color-bg-elevated)", border:"1px solid var(--border-subtle)",
        borderRadius:"3px", padding:"0.3rem 0.5rem", margin:"0.5rem 0" }}>
        <Search size={10} color="var(--color-comment)"/>
        <input value={q} onChange={e => setQ(e.target.value)}
          placeholder="Search in files…"
          style={{ background:"transparent", border:"none", outline:"none",
            color:"var(--color-cream)", fontFamily:"var(--font-mono)", fontSize:"0.7rem", width:"100%" }}
          onMouseEnter={() => audio?.playHover()}
        />
        {q && <button onClick={() => setQ("")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-comment)", padding:0, display:"flex" }}><X size={9}/></button>}
      </div>
      {q.length > 1 && results.length === 0 && (
        <div style={{ color:"var(--color-comment)", padding:"0.5rem", fontSize:"0.65rem" }}>No results for &quot;{q}&quot;</div>
      )}
      {results.map(r => (
        <div key={r.file}>
          <div onClick={() => { onFileClick(r.file); audio?.playClick(); }}
            style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.35rem 0.25rem",
              cursor:"pointer", color:"var(--color-rose)", fontWeight:700 }}
            className="ide-tree-item">
            <FileCode size={10} style={{ color: EXT_COLOR[r.file.split(".").pop()] }}/>
            {r.file}
            <span style={{ marginLeft:"auto", background:"var(--color-wine)", color:"var(--color-cream)",
              borderRadius:"8px", padding:"0 0.3rem", fontSize:"0.6rem" }}>{r.matches.length}</span>
          </div>
          {r.matches.map((m, i) => (
            <div key={i} onClick={() => { onFileClick(r.file); audio?.playClick(); }}
              style={{ padding:"0.2rem 0.25rem 0.2rem 1.25rem", cursor:"pointer", borderBottom:"1px solid var(--border-subtle)" }}
              className="ide-tree-item">
              <span style={{ color:"var(--color-comment)", marginRight:"0.5rem", fontSize:"0.6rem" }}>{m.line}</span>
              <span style={{ color:"var(--color-cream-dim)", fontSize:"0.65rem",
                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {m.text.trim().slice(0, 28)}{m.text.trim().length > 28 ? "…" : ""}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GIT SIDEBAR — staged / unstaged changes
═══════════════════════════════════════════════════════════ */
const GIT_CHANGES = [
  { status:"M", file:"src/index.ts",      staged:true  },
  { status:"M", file:"src/pages/skills.ts",staged:true  },
  { status:"A", file:"src/components/ExtensionMarketplace.js", staged:true },
  { status:"A", file:"src/components/PullRequests.js",         staged:true },
  { status:"A", file:"src/components/DebugPanel.js",           staged:false },
  { status:"?", file:".env.local",        staged:false },
];

const STATUS_COLOR = { M:"var(--color-amber)", A:"var(--color-sage)", "?":"var(--color-comment)", D:"var(--color-error)" };

function GitSidebar({ audio }) {
  const [msg, setMsg] = useState("");
  const [committed, setCommitted] = useState(false);
  const staged   = GIT_CHANGES.filter(c => c.staged);
  const unstaged = GIT_CHANGES.filter(c => !c.staged);

  const commit = () => {
    if (!msg.trim()) return;
    setCommitted(true);
    audio?.playClick();
    setTimeout(() => setCommitted(false), 2500);
    setMsg("");
  };

  return (
    <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", padding:"0 0 0.5rem" }}>
      {/* Commit input */}
      <div style={{ padding:"0.5rem 0.5rem 0.25rem" }}>
        <input value={msg} onChange={e => setMsg(e.target.value)}
          onKeyDown={e => e.key === "Enter" && commit()}
          placeholder="Message (⏎ to commit)…"
          style={{ width:"100%", background:"var(--color-bg-elevated)", border:"1px solid var(--border-subtle)",
            borderRadius:"3px", padding:"0.3rem 0.5rem", color:"var(--color-cream)",
            fontFamily:"var(--font-mono)", fontSize:"0.68rem", outline:"none" }}
          onMouseEnter={() => audio?.playHover()}
        />
        <button onClick={commit}
          style={{ width:"100%", marginTop:"0.35rem", padding:"0.3rem", background: msg.trim() ? "var(--color-wine)" : "var(--color-bg-selection)",
            border:"none", borderRadius:"3px", color:"var(--color-cream)",
            fontFamily:"var(--font-mono)", fontSize:"0.65rem", fontWeight:700, cursor:"pointer",
            transition:"background .15s" }}
          onMouseEnter={() => audio?.playHover()}
        >{committed ? "✓ Committed!" : "Commit"}</button>
      </div>

      {/* Staged */}
      <div style={{ padding:"0.3rem 0.5rem 0.1rem", color:"var(--color-comment)", fontSize:"0.6rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span>STAGED ({staged.length})</span>
      </div>
      {staged.map((c, i) => (
        <div key={i} className="ide-tree-item" style={{ paddingLeft:"0.75rem", gap:"0.4rem" }}
          onMouseEnter={() => audio?.playHover()}>
          <span style={{ color: STATUS_COLOR[c.status], fontWeight:700, fontSize:"0.65rem", flexShrink:0 }}>{c.status}</span>
          <span style={{ color:"var(--color-cream-dim)", overflow:"hidden", textOverflow:"ellipsis" }}>{c.file}</span>
        </div>
      ))}

      {/* Unstaged */}
      <div style={{ padding:"0.4rem 0.5rem 0.1rem", color:"var(--color-comment)", fontSize:"0.6rem", marginTop:"0.25rem" }}>
        CHANGES ({unstaged.length})
      </div>
      {unstaged.map((c, i) => (
        <div key={i} className="ide-tree-item" style={{ paddingLeft:"0.75rem", gap:"0.4rem" }}
          onMouseEnter={() => audio?.playHover()}>
          <span style={{ color: STATUS_COLOR[c.status], fontWeight:700, fontSize:"0.65rem", flexShrink:0 }}>{c.status}</span>
          <span style={{ color:"var(--color-cream-muted)", overflow:"hidden", textOverflow:"ellipsis" }}>{c.file}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DEBUG SIDEBAR — launch configs
═══════════════════════════════════════════════════════════ */
function DebugSidebar({ audio }) {
  const [running, setRunning] = useState(false);
  const [log, setLog]         = useState([]);

  const launch = (cfg) => {
    setRunning(true);
    setLog([]);
    audio?.playClick();
    const msgs = [
      `Launching: ${cfg}…`,
      "Attaching debugger…",
      "Breakpoint set at SachinYadav.ts:9",
      "▶ Running — available: true",
      "✓ Session active",
    ];
    msgs.forEach((m, i) => setTimeout(() => {
      setLog(prev => [...prev, m]);
      if (i === msgs.length - 1) setRunning(false);
    }, i * 500));
  };

  return (
    <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem" }}>
      <div style={{ padding:"0.5rem 0.5rem 0.25rem", color:"var(--color-comment)", fontSize:"0.6rem" }}>LAUNCH CONFIGS</div>
      {["Node.js: index.ts", "Next.js: dev", "Python: api/main.py"].map(cfg => (
        <div key={cfg} className="ide-tree-item"
          onClick={() => launch(cfg)}
          onMouseEnter={() => audio?.playHover()}
          style={{ gap:"0.5rem", paddingLeft:"0.75rem" }}>
          <span style={{ color:"var(--color-sage)", fontSize:"0.65rem" }}>▶</span>
          <span style={{ color:"var(--color-cream-dim)" }}>{cfg}</span>
        </div>
      ))}
      {log.length > 0 && (
        <div style={{ margin:"0.5rem", background:"var(--color-bg-darker)", border:"1px solid var(--border-subtle)", borderRadius:"3px", padding:"0.4rem 0.5rem" }}>
          {log.map((l, i) => (
            <div key={i} style={{ color: l.startsWith("✓") ? "var(--color-sage)" : l.startsWith("▶") ? "var(--color-amber)" : "var(--color-comment)", marginBottom:"0.1rem", fontSize:"0.65rem" }}>{l}</div>
          ))}
          {running && <span className="blink-cursor">▌</span>}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXTENSIONS SIDEBAR — installed list
═══════════════════════════════════════════════════════════ */
const INSTALLED_EXTS = [
  { name:"ESLint",         icon:"🔴", version:"2.4.4",  enabled:true  },
  { name:"Prettier",       icon:"🟣", version:"10.4.0", enabled:true  },
  { name:"GitLens",        icon:"🟠", version:"15.1.0", enabled:true  },
  { name:"Tailwind CSS",   icon:"🔵", version:"0.12.9", enabled:true  },
  { name:"Error Lens",     icon:"🟡", version:"3.16.0", enabled:false },
  { name:"Auto Rename Tag",icon:"🟢", version:"0.1.10", enabled:true  },
];

function ExtSidebar({ audio }) {
  const [exts, setExts] = useState(INSTALLED_EXTS);
  const toggle = (name) => {
    setExts(prev => prev.map(e => e.name === name ? { ...e, enabled: !e.enabled } : e));
    audio?.playClick();
  };
  return (
    <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem" }}>
      <div style={{ padding:"0.4rem 0.5rem", color:"var(--color-comment)", fontSize:"0.6rem" }}>INSTALLED ({exts.length})</div>
      {exts.map(ext => (
        <div key={ext.name} className="ide-tree-item"
          style={{ paddingLeft:"0.5rem", gap:"0.4rem", justifyContent:"space-between" }}
          onMouseEnter={() => audio?.playHover()}>
          <span style={{ fontSize:"0.75rem", flexShrink:0 }}>{ext.icon}</span>
          <span style={{ color: ext.enabled ? "var(--color-cream-dim)" : "var(--color-comment)", flex:1,
            overflow:"hidden", textOverflow:"ellipsis" }}>{ext.name}</span>
          <span style={{ color:"var(--color-comment)", fontSize:"0.58rem" }}>v{ext.version}</span>
          <button onClick={() => toggle(ext.name)}
            style={{ background: ext.enabled ? "var(--color-sage-dim)" : "var(--color-bg-selection)",
              border:`1px solid ${ext.enabled ? "var(--color-sage)" : "var(--border-subtle)"}`,
              color: ext.enabled ? "var(--color-sage)" : "var(--color-comment)",
              borderRadius:"3px", padding:"0.05rem 0.3rem", cursor:"pointer",
              fontFamily:"var(--font-mono)", fontSize:"0.55rem", flexShrink:0 }}>
            {ext.enabled ? "on" : "off"}
          </button>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SEARCH BAR (top toolbar)
═══════════════════════════════════════════════════════════ */
function SearchBar({ audio }) {
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);
  const results = q.length > 1 ? Object.keys(FILES).filter(f => f.includes(q)) : [];

  return (
    <div style={{ position:"relative", flex:1, maxWidth:"300px" }}>
      <div style={{
        display:"flex", alignItems:"center", gap:"0.4rem",
        background:"var(--color-bg-elevated)", border:"1px solid var(--border-subtle)",
        borderRadius:"4px", padding:"0.25rem 0.6rem",
        fontFamily:"var(--font-mono)", fontSize:"0.68rem",
      }}>
        <Search size={10} color="var(--color-comment)" />
        <input value={q}
          onChange={e => { setQ(e.target.value); setShow(true); }}
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 150)}
          placeholder="Search files…"
          style={{
            background:"transparent", border:"none", outline:"none",
            color:"var(--color-cream)", fontFamily:"var(--font-mono)", fontSize:"0.68rem",
            width:"100%",
          }}
          onMouseEnter={() => audio?.playHover()}
        />
        {q && <button onClick={() => setQ("")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-comment)", padding:0, display:"flex" }}><X size={9}/></button>}
      </div>
      {show && results.length > 0 && (
        <div style={{
          position:"absolute", top:"calc(100% + 4px)", left:0, right:0,
          background:"var(--color-bg-card)", border:"1px solid var(--border-subtle)",
          borderRadius:"4px", zIndex:50, boxShadow:"0 8px 24px rgba(0,0,0,0.5)",
        }}>
          {results.map(r => (
            <div key={r} className="ide-tree-item" style={{ padding:"0.4rem 0.75rem" }}
              onClick={() => { setQ(""); setShow(false); }}
            >
              <FileCode size={11} style={{ color: EXT_COLOR[r.split(".").pop()]||EXT_COLOR.default }}/>
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN HERO
═══════════════════════════════════════════════════════════ */
export default function CreativeHero({ audio }) {
  const NAVBAR_H = 79;
  const [activeFile,   setActiveFile]  = useState("index.ts");
  const [openTabs,     setOpenTabs]    = useState(["index.ts"]);
  const [bottomPanel,  setBottomPanel] = useState("terminal");
  const [rightPanel,   setRightPanel]  = useState("outline");
  const [bottomH,      setBottomH]     = useState(42);
  const [sidebarView,  setSidebarView] = useState("explorer"); // "explorer"|"search"|"git"|"debug"|"extensions"

  const openFile = (id) => {
    if (!FILES[id]) return;
    setOpenTabs(prev => prev.includes(id) ? prev : [...prev, id]);
    setActiveFile(id);
  };

  const closeTab = (e, id) => {
    e.stopPropagation();
    const next = openTabs.filter(t => t !== id);
    setOpenTabs(next);
    if (activeFile === id) setActiveFile(next[next.length-1] || "index.ts");
    audio?.playClick();
  };

  const problemCount = PROBLEMS.filter(p => p.sev === "warn").length;

  return (
    <section id="home" style={{
      minHeight:`calc(100vh - ${NAVBAR_H}px)`,
      marginTop:`${NAVBAR_H}px`,
      display:"flex", flexDirection:"column",
      background:"var(--color-bg)", padding:0, overflow:"hidden",
    }}>

      {/* ── Top toolbar ── */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background:"var(--color-bg-card)", borderBottom:"1px solid var(--border-subtle)",
        padding:"0.35rem 0.75rem", gap:"0.75rem", flexShrink:0, flexWrap:"wrap", rowGap:"0.4rem",
      }}>
        <SearchBar audio={audio} />
        <AudioWidget audio={audio} />
      </div>

      {/* ── File tabs ── */}
      <div className="ide-tab-bar">
        {openTabs.map(tab => (
          <div key={tab}
            className={`ide-tab${activeFile===tab ? " active" : ""}`}
            onClick={() => { setActiveFile(tab); audio?.playClick(); }}
            onMouseEnter={() => audio?.playHover()}
          >
            <FileCode size={11} style={{ color: EXT_COLOR[tab.split(".").pop()]||EXT_COLOR.default }}/>
            {tab}
            <button onClick={e => closeTab(e, tab)} style={{
              background:"none", border:"none", cursor:"pointer",
              color:"var(--color-comment)", display:"flex", alignItems:"center",
              padding:"0 0.1rem", borderRadius:"2px", opacity:.6,
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.color="var(--color-wine)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity=".6"; e.currentTarget.style.color="var(--color-comment)"; }}
            ><X size={10}/></button>
          </div>
        ))}
        <div style={{ flex:1, borderBottom:"1px solid var(--border-subtle)" }}/>
      </div>

      {/* ── Main body ── */}
      <div style={{ flex:1, display:"flex", overflow:"hidden", minHeight:0 }} className="hero-editor-layout">

        {/* Activity bar */}
        <div style={{
          width:"44px", background:"#160E12",
          borderRight:"1px solid var(--border-subtle)",
          display:"flex", flexDirection:"column", alignItems:"center",
          padding:"0.75rem 0", gap:"0.25rem", flexShrink:0,
        }} className="activity-bar">
          {[
            { id:"explorer",   icon:"📂", label:"Explorer"      },
            { id:"search",     icon:"🔍", label:"Search"         },
            { id:"git",        icon:"🌿", label:"Source Control" },
            { id:"debug",      icon:"▶",  label:"Run & Debug"    },
            { id:"extensions", icon:"🧩", label:"Extensions"     },
          ].map(item => (
            <div key={item.id}
              title={item.label}
              onClick={() => { setSidebarView(v => v === item.id ? null : item.id); audio?.playClick(); }}
              onMouseEnter={() => audio?.playHover()}
              style={{
                width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", borderRadius:"4px",
                background: sidebarView === item.id ? "var(--color-bg-elevated)" : "transparent",
                borderLeft: sidebarView === item.id ? "2px solid var(--color-wine)" : "2px solid transparent",
                fontSize:"0.85rem",
                opacity: sidebarView === item.id ? 1 : 0.45,
                transition:"all .15s",
              }}
            >{item.icon}</div>
          ))}
        </div>

        {/* File sidebar — content switches per activity bar selection */}
        {sidebarView && (
        <div style={{
          width:"200px", background:"var(--color-bg-card)",
          borderRight:"1px solid var(--border-subtle)",
          display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0,
        }} className="file-sidebar">
          <AnimatePresence mode="wait">
            <motion.div key={sidebarView} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-8 }}
              transition={{ duration:.15 }} style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>

              {/* EXPLORER */}
              {sidebarView === "explorer" && (
                <FileExplorer activeFile={activeFile} onFileClick={openFile} audio={audio} />
              )}

              {/* SEARCH */}
              {sidebarView === "search" && (
                <div style={{ flex:1, overflowY:"auto" }}>
                  <div style={{ padding:"0.5rem 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--color-comment)", borderBottom:"1px solid var(--border-subtle)", fontWeight:700 }}>Search</div>
                  <div style={{ padding:"0.5rem" }}>
                    <SearchSidebar audio={audio} onFileClick={openFile} />
                  </div>
                </div>
              )}

              {/* SOURCE CONTROL */}
              {sidebarView === "git" && (
                <div style={{ flex:1, overflowY:"auto" }}>
                  <div style={{ padding:"0.5rem 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--color-comment)", borderBottom:"1px solid var(--border-subtle)", fontWeight:700 }}>Source Control</div>
                  <GitSidebar audio={audio} />
                </div>
              )}

              {/* RUN & DEBUG */}
              {sidebarView === "debug" && (
                <div style={{ flex:1, overflowY:"auto" }}>
                  <div style={{ padding:"0.5rem 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--color-comment)", borderBottom:"1px solid var(--border-subtle)", fontWeight:700 }}>Run & Debug</div>
                  <DebugSidebar audio={audio} />
                </div>
              )}

              {/* EXTENSIONS */}
              {sidebarView === "extensions" && (
                <div style={{ flex:1, overflowY:"auto" }}>
                  <div style={{ padding:"0.5rem 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--color-comment)", borderBottom:"1px solid var(--border-subtle)", fontWeight:700 }}>Extensions</div>
                  <ExtSidebar audio={audio} />
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
        )}

        {/* Editor + bottom panel split */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

          {/* Code editor */}
          <div style={{ flex:`0 0 ${100-bottomH}%`, overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <CodeEditor activeFile={activeFile} audio={audio} />
          </div>

          {/* Drag handle */}
          <div
            style={{
              height:"6px", background:"var(--color-bg-elevated)",
              borderTop:"1px solid var(--border-subtle)", borderBottom:"1px solid var(--border-subtle)",
              cursor:"row-resize", flexShrink:0,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}
            onMouseDown={e => {
              const startY = e.clientY, startH = bottomH;
              const parent = e.currentTarget.closest(".hero-editor-layout")?.parentElement;
              const move = (mv) => {
                if (!parent) return;
                const total = parent.clientHeight;
                const delta = (mv.clientY - startY) / total * 100;
                setBottomH(Math.max(20, Math.min(55, startH - delta)));
              };
              const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
              window.addEventListener("mousemove", move);
              window.addEventListener("mouseup", up);
            }}
          >
            <div style={{ width:28, height:2, background:"var(--color-comment)", borderRadius:1, opacity:.4 }}/>
          </div>

          {/* Bottom panel */}
          <div style={{ flex:`0 0 ${bottomH}%`, display:"flex", flexDirection:"column", overflow:"hidden" }}>
            {/* Panel tabs */}
            <div style={{
              display:"flex", alignItems:"center",
              background:"var(--color-bg-card)", borderBottom:"1px solid var(--border-subtle)",
              flexShrink:0,
            }}>
              {[
                { id:"terminal", label:"Terminal", icon:<Terminal size={10}/> },
                { id:"problems", label:`Problems (${problemCount})`, icon:<AlertCircle size={10}/> },
              ].map(p => (
                <button key={p.id} onClick={() => { setBottomPanel(p.id); audio?.playClick(); }}
                  style={{
                    display:"flex", alignItems:"center", gap:"0.35rem",
                    padding:"0.35rem 0.85rem", background:"none",
                    border:"none", borderBottom: bottomPanel===p.id ? "2px solid var(--color-wine)" : "2px solid transparent",
                    color: bottomPanel===p.id ? "var(--color-cream)" : "var(--color-comment)",
                    fontFamily:"var(--font-mono)", fontSize:"0.68rem", cursor:"pointer",
                    transition:"color .15s",
                  }}
                  onMouseEnter={() => audio?.playHover()}
                >{p.icon}{p.label}</button>
              ))}
            </div>
            {/* Panel content */}
            <div style={{ flex:1, overflow:"hidden" }}>
              <AnimatePresence mode="wait">
                <motion.div key={bottomPanel}
                  initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  transition={{ duration:.15 }}
                  style={{ height:"100%" }}
                >
                  {bottomPanel === "terminal" ? <InteractiveTerminal audio={audio} /> : <ProblemsPanel audio={audio} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{
          width:"220px", background:"var(--color-bg-card)",
          borderLeft:"1px solid var(--border-subtle)",
          display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0,
        }} className="right-panel">
          {/* Panel tabs */}
          <div style={{
            display:"flex", background:"var(--color-bg-elevated)",
            borderBottom:"1px solid var(--border-subtle)", flexShrink:0,
          }}>
            {[
              { id:"outline", label:"Outline" },
              { id:"nav",     label:"Nav" },
            ].map(p => (
              <button key={p.id} onClick={() => { setRightPanel(p.id); audio?.playClick(); }}
                style={{
                  flex:1, padding:"0.4rem 0", background:"none",
                  border:"none", borderBottom: rightPanel===p.id ? "2px solid var(--color-wine)" : "2px solid transparent",
                  color: rightPanel===p.id ? "var(--color-cream)" : "var(--color-comment)",
                  fontFamily:"var(--font-mono)", fontSize:"0.62rem", cursor:"pointer",
                  transition:"color .15s",
                }}
                onMouseEnter={() => audio?.playHover()}
              >{p.label}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={rightPanel}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:.15 }}
              style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}
            >
              {rightPanel === "outline"
                ? <OutlinePanel activeFile={activeFile} audio={audio} />
                : (
                  <div style={{ flex:1, padding:"0.5rem 0", overflowY:"auto" }}>
                    <div style={{ padding:"0.3rem 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-comment)", textTransform:"uppercase", letterSpacing:"0.08em", borderBottom:"1px solid var(--border-subtle)", marginBottom:"0.25rem" }}>Quick Nav</div>
                    {[
                      { href:"#projects", label:"projects.ts →", color:"var(--color-rose)" },
                      { href:"#home",     label:"skills.ts →",   color:"var(--color-gold)"  },
                      { href:"#contact",  label:"contact.tsx →", color:"var(--color-sage)"  },
                      { href:"https://github.com/SachinYadav2446", label:"github →", color:"var(--color-sky)", ext:true },
                    ].map(l => (
                      <a key={l.label} href={l.href}
                        target={l.ext ? "_blank" : undefined}
                        rel={l.ext ? "noopener noreferrer" : undefined}
                        className="ide-tree-item"
                        style={{ color:l.color, display:"flex" }}
                        onMouseEnter={() => audio?.playHover()}
                        onClick={() => audio?.playClick()}
                      >{l.ext ? <ExternalLink size={10}/> : <ChevronRight size={10}/>}{l.label}</a>
                    ))}
                  </div>
                )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className="ide-status-bar">
        <div className="ide-status-item" style={{ background:"var(--color-wine)", color:"var(--color-cream)" }}>
          <GitBranch size={10}/> main
        </div>
        <div className="ide-status-item">
          <CheckCircle size={10} color="var(--color-sage)"/> {activeFile}
        </div>
        <div className="ide-status-item">{FILES[activeFile]?.lang || "TypeScript"}</div>
        <div className="ide-status-item">UTF-8</div>
        <div style={{ flex:1 }}/>
        <div className="ide-status-item" onClick={() => setBottomPanel("problems")} style={{ cursor:"pointer" }}>
          <AlertCircle size={10} color="var(--color-amber)"/> {problemCount} warnings
        </div>
        <div className="ide-status-item">
          <div className="activity-dot" style={{ width:6, height:6 }}/>
          open to internships
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1100px) { .right-panel  { display: none !important; } }
        @media (max-width:  900px) { .file-sidebar { display: none !important; } .activity-bar { display: none !important; } }
        @media (max-width:  600px) { .minimap      { display: none !important; } }
      `}</style>
    </section>
  );
}
