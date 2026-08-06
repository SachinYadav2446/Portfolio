"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, ChevronRight, ChevronDown, Play, Square,
         StepForward, RotateCcw, Circle, AlertCircle } from "lucide-react";

/* ── The inspectable object tree ─────────────────────────── */
const ROOT = {
  key: "SachinYadav",
  type: "object",
  desc: "Developer object — click ▶ to expand",
  children: [
    { key:"name",      type:"string",   value:'"Sachin Yadav"',           color:"var(--color-gold)"    },
    { key:"age",       type:"number",   value:"20",                       color:"var(--color-amber)"   },
    { key:"location",  type:"string",   value:'"Bangalore, India"',       color:"var(--color-gold)"    },
    { key:"available", type:"boolean",  value:"true",                     color:"var(--color-sage)"    },
    { key:"gpa",       type:"string",   value:'"Working on it 😅"',       color:"var(--color-gold)"    },
    {
      key:"stack",  type:"Array(9)", value:"[…]", color:"var(--color-sky)",
      children:[
        { key:"0", type:"string", value:'"Python"',       color:"var(--color-gold)" },
        { key:"1", type:"string", value:'"Golang"',       color:"var(--color-gold)" },
        { key:"2", type:"string", value:'"Java"',         color:"var(--color-gold)" },
        { key:"3", type:"string", value:'"Node.js"',      color:"var(--color-gold)" },
        { key:"4", type:"string", value:'"React/Next.js"',color:"var(--color-gold)" },
        { key:"5", type:"string", value:'"FastAPI"',      color:"var(--color-gold)" },
        { key:"6", type:"string", value:'"PyTorch"',      color:"var(--color-gold)" },
        { key:"7", type:"string", value:'"PostgreSQL"',   color:"var(--color-gold)" },
        { key:"8", type:"string", value:'"Docker/AWS"',   color:"var(--color-gold)" },
      ],
    },
    {
      key:"skills", type:"object", value:"{…}", color:"var(--color-rose)",
      children:[
        { key:"problemsSolved",   type:"number",  value:"500+",            color:"var(--color-amber)"  },
        { key:"projectsShipped",  type:"number",  value:"7",               color:"var(--color-amber)"  },
        { key:"linesWritten",     type:"string",  value:'"a lot 🤷"',      color:"var(--color-gold)"   },
        { key:"dsa",              type:"boolean", value:"true",            color:"var(--color-sage)"   },
        { key:"systemDesign",     type:"boolean", value:"true",            color:"var(--color-sage)"   },
        { key:"machineLearnin",   type:"boolean", value:"true",            color:"var(--color-sage)"   },
      ],
    },
    {
      key:"personality", type:"object", value:"{…}", color:"var(--color-rose)",
      children:[
        { key:"debugsAt",         type:"string",  value:'"3am usually"',   color:"var(--color-gold)"   },
        { key:"coffeeConsumed",   type:"string",  value:'"Infinity"',      color:"var(--color-amber)"  },
        { key:"stackOverflow",    type:"boolean", value:"true",            color:"var(--color-sage)"   },
        { key:"givesUp",          type:"boolean", value:"false",           color:"var(--color-wine)"   },
        { key:"openSourceMind",   type:"boolean", value:"true",            color:"var(--color-sage)"   },
      ],
    },
    {
      key:"contact", type:"object", value:"{…}", color:"var(--color-rose)",
      children:[
        { key:"email",    type:"string", value:'"yadavsachin2446@gmail.com"',              color:"var(--color-gold)" },
        { key:"github",   type:"string", value:'"github.com/SachinYadav2446"',             color:"var(--color-sky)"  },
        { key:"linkedin", type:"string", value:'"linkedin.com/in/sachin-yadav-54646a322"', color:"var(--color-sky)"  },
      ],
    },
  ],
};

/* ── Console log messages ─────────────────────────────────── */
const LOGS = [
  { type:"log",   text:'console.log(SachinYadav)',                                       ts:"00:00:001" },
  { type:"log",   text:'▶ SachinYadav { name: "Sachin Yadav", available: true, … }',    ts:"00:00:002" },
  { type:"info",  text:"[INFO] Stack loaded: 9 technologies",                            ts:"00:00:003" },
  { type:"info",  text:"[INFO] problemsSolved: 500+ and counting",                       ts:"00:00:004" },
  { type:"warn",  text:"[WARN] coffeeConsumed approaching Infinity — hydrate",           ts:"00:00:005" },
  { type:"log",   text:'console.log(SachinYadav.available) → true',                     ts:"00:00:006" },
  { type:"info",  text:"[INFO] available: true — open to internships",                   ts:"00:00:007" },
  { type:"warn",  text:"[WARN] debugsAt: '3am' — sleep schedule undefined",             ts:"00:00:008" },
  { type:"info",  text:"[INFO] givesUp: false ✓",                                        ts:"00:00:009" },
  { type:"log",   text:'console.log("Ready to ship. Hire me? → #contact")',             ts:"00:00:010" },
];

const BREAKPOINTS = [3, 7, 9];

const CALL_STACK = [
  "evaluate  · SachinYadav.ts:24",
  "loadDev   · runtime.ts:8",
  "bootstrap · next.js:1",
];

const WATCH = [
  { expr:"SachinYadav.available",      val:"true",       color:"var(--color-sage)"  },
  { expr:"SachinYadav.stack.length",   val:"9",          color:"var(--color-amber)" },
  { expr:"SachinYadav.givesUp",        val:"false",      color:"var(--color-wine)"  },
  { expr:"typeof SachinYadav",         val:'"object"',   color:"var(--color-sky)"   },
];

/* ── Object tree node ────────────────────────────────────── */
function TreeNode({ node, depth = 0, audio }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children?.length > 0;

  return (
    <div>
      <div
        onClick={() => { if (hasChildren) { setOpen(o => !o); audio?.playClick(); } }}
        onMouseEnter={() => audio?.playHover()}
        style={{
          display:"flex", alignItems:"center", gap:"0.3rem",
          paddingLeft:`${0.5 + depth * 1.1}rem`,
          paddingTop:"0.18rem", paddingBottom:"0.18rem",
          paddingRight:"0.5rem",
          cursor: hasChildren ? "pointer" : "default",
          fontFamily:"var(--font-mono)", fontSize:"0.73rem",
          transition:"background .1s",
          borderRadius:"2px",
        }}
        className="dbg-row"
      >
        {hasChildren
          ? (open
              ? <ChevronDown  size={10} style={{ color:"var(--color-comment)", flexShrink:0 }}/>
              : <ChevronRight size={10} style={{ color:"var(--color-comment)", flexShrink:0 }}/>)
          : <span style={{ width:10, flexShrink:0 }}/>
        }
        {/* Key */}
        <span style={{ color:"var(--color-rose)" }}>{node.key}</span>
        <span style={{ color:"var(--color-comment)", margin:"0 0.15rem" }}>:</span>
        {/* Type badge */}
        <span style={{
          fontSize:"0.55rem", background:"var(--color-bg-elevated)",
          border:"1px solid var(--border-subtle)", color:"var(--color-comment)",
          padding:"0 0.25rem", borderRadius:"2px", flexShrink:0,
        }}>{node.type}</span>
        {/* Value */}
        <span style={{ color: node.color || "var(--color-cream)", marginLeft:"0.25rem" }}>
          {node.value || (open ? "{" : "{…}")}
        </span>
        {/* Description hint */}
        {node.desc && !open && (
          <span style={{ color:"var(--color-comment)", fontSize:"0.62rem", fontStyle:"italic", marginLeft:"0.5rem" }}> // {node.desc}</span>
        )}
      </div>

      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:.18 }}
            style={{ overflow:"hidden" }}
          >
            {node.children.map((child, i) => (
              <TreeNode key={i} node={child} depth={depth + 1} audio={audio}/>
            ))}
            {/* closing bracket */}
            <div style={{
              paddingLeft:`${0.5 + depth * 1.1 + 1.1}rem`,
              fontFamily:"var(--font-mono)", fontSize:"0.73rem",
              color:"var(--color-comment)",
            }}>{"}"}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Console row ─────────────────────────────────────────── */
function ConsoleRow({ log, visible }) {
  const icon = log.type === "warn"
    ? <AlertCircle size={10} color="var(--color-amber)"/>
    : log.type === "info"
    ? <Circle size={10} color="var(--color-sky)" fill="var(--color-sky)"/>
    : <span style={{ width:10 }}/>;

  const color = log.type === "warn" ? "var(--color-amber)"
              : log.type === "info" ? "var(--color-sky)"
              : "var(--color-cream-dim)";

  const bg = log.type === "warn" ? "rgba(212,145,90,0.06)" : "transparent";

  return (
    <motion.div
      initial={{ opacity:0, x:-6 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -6 }}
      transition={{ duration:.2 }}
      style={{
        display:"flex", alignItems:"flex-start", gap:"0.5rem",
        padding:"0.25rem 0.75rem", background:bg,
        borderBottom:"1px solid rgba(255,255,255,0.03)",
        fontFamily:"var(--font-mono)", fontSize:"0.7rem",
      }}
    >
      <span style={{ color:"var(--color-comment)", fontSize:"0.6rem", flexShrink:0, marginTop:"0.15rem" }}>{log.ts}</span>
      <span style={{ flexShrink:0, marginTop:"0.1rem" }}>{icon}</span>
      <span style={{ color, flex:1 }}>{log.text}</span>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export default function DebugPanel({ audio }) {
  const [running,     setRunning]     = useState(false);
  const [logIndex,    setLogIndex]    = useState(0);
  const [activeBreak, setActiveBreak] = useState(null);
  const [rightTab,    setRightTab]    = useState("watch");  // watch | callstack
  const [bottomTab,   setBottomTab]   = useState("console");
  const intervalRef = useRef(null);

  const startSession = () => {
    setRunning(true);
    setLogIndex(0);
    setActiveBreak(null);
    audio?.playClick();
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setLogIndex(i);
      if (BREAKPOINTS.includes(i)) {
        setActiveBreak(i);
        clearInterval(intervalRef.current);
        setRunning(false);
      }
      if (i >= LOGS.length) {
        clearInterval(intervalRef.current);
        setRunning(false);
      }
    }, 500);
  };

  const step = () => {
    if (logIndex >= LOGS.length) return;
    const next = logIndex + 1;
    setLogIndex(next);
    setActiveBreak(null);
    if (BREAKPOINTS.includes(next)) setActiveBreak(next);
    audio?.playClick();
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setLogIndex(0);
    setActiveBreak(null);
    audio?.playClick();
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <section id="debug" style={{ background:"var(--color-bg)", borderTop:"1px solid var(--border-subtle)", padding:0, minHeight:"85vh", display:"flex", flexDirection:"column" }}>
      {/* Tab */}
      <div className="ide-tab-bar">
        <div className="ide-tab active"><Bug size={12} color="var(--color-wine)"/>debug-session.ts</div>
        <div style={{ flex:1, borderBottom:"1px solid var(--border-subtle)" }}/>
        <div style={{ padding:"0 1rem", display:"flex", alignItems:"center", fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)" }}>
          {activeBreak ? <span style={{ color:"var(--color-amber)" }}>⏸ paused at breakpoint {activeBreak}</span>
            : running  ? <span style={{ color:"var(--color-sage)"  }}>▶ running…</span>
            : logIndex >= LOGS.length ? <span style={{ color:"var(--color-sage)" }}>✓ session complete</span>
            : <span>idle</span>}
        </div>
      </div>

      {/* Debug toolbar */}
      <div style={{
        background:"var(--color-bg-elevated)", borderBottom:"1px solid var(--border-subtle)",
        padding:"0.4rem 1rem", display:"flex", alignItems:"center", gap:"0.35rem", flexShrink:0,
      }}>
        {[
          { icon:<Play size={13}/>,        label:"Start",    action:startSession, disabled: running,             color:"var(--color-sage)"  },
          { icon:<StepForward size={13}/>, label:"Step",     action:step,         disabled: running || logIndex>=LOGS.length, color:"var(--color-sky)"   },
          { icon:<Square size={13}/>,      label:"Stop",     action:stop,         disabled: !running && logIndex===0,         color:"var(--color-wine)"  },
          { icon:<RotateCcw size={13}/>,   label:"Restart",  action:stop,         disabled: false,               color:"var(--color-amber)" },
        ].map(b => (
          <button key={b.label} onClick={b.action}
            disabled={b.disabled}
            title={b.label}
            onMouseEnter={() => !b.disabled && audio?.playHover()}
            style={{
              display:"flex", alignItems:"center", gap:"0.3rem",
              background:"none", border:"1px solid transparent", cursor: b.disabled ? "not-allowed" : "pointer",
              color: b.disabled ? "var(--color-comment)" : b.color,
              padding:"0.3rem 0.65rem", borderRadius:"3px",
              fontFamily:"var(--font-mono)", fontSize:"0.65rem",
              opacity: b.disabled ? 0.4 : 1, transition:"all .15s",
            }}
            className="dbg-btn"
          >{b.icon}{b.label}</button>
        ))}
        <div style={{ flex:1 }}/>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)" }}>
          {logIndex}/{LOGS.length} lines
        </span>
      </div>

      {/* Main layout */}
      <div style={{ flex:1, display:"flex", overflow:"hidden", minHeight:0 }} className="debug-layout">

        {/* Left: source view with breakpoints */}
        <div style={{ width:"300px", background:"var(--color-bg-card)", borderRight:"1px solid var(--border-subtle)", overflowY:"auto", flexShrink:0 }} className="debug-source">
          <div style={{ padding:"0.35rem 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--color-comment)", borderBottom:"1px solid var(--border-subtle)" }}>
            SachinYadav.ts
          </div>
          {LOGS.map((log, i) => (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:"0.4rem",
              padding:"0.22rem 0.5rem",
              background: activeBreak === i+1 ? "var(--color-bg-line)"
                        : logIndex > i ? "rgba(123,174,138,0.04)" : "transparent",
              borderLeft: activeBreak === i+1 ? "2px solid var(--color-wine)" : "2px solid transparent",
              fontFamily:"var(--font-mono)", fontSize:"0.68rem",
            }}>
              {/* Line number */}
              <span style={{ minWidth:"1.4rem", color:"var(--color-comment)", textAlign:"right", fontSize:"0.62rem" }}>{i+1}</span>
              {/* Breakpoint dot */}
              <span style={{
                width:8, height:8, borderRadius:"50%", flexShrink:0,
                background: BREAKPOINTS.includes(i+1) ? "var(--color-wine)" : "transparent",
                border: BREAKPOINTS.includes(i+1) ? "none" : "1px solid transparent",
                boxShadow: BREAKPOINTS.includes(i+1) ? "0 0 5px var(--color-wine-glow)" : "none",
              }}/>
              {/* Statement */}
              <span style={{ color: logIndex > i ? "var(--color-cream-dim)" : "var(--color-comment)", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {log.text.slice(0, 38)}{log.text.length > 38 ? "…" : ""}
              </span>
              {/* Current arrow */}
              {logIndex === i + 1 && (
                <span style={{ color:"var(--color-wine)", fontSize:"0.65rem", flexShrink:0 }}>▶</span>
              )}
            </div>
          ))}
        </div>

        {/* Center: object inspector */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
          <div style={{ padding:"0.35rem 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--color-comment)", borderBottom:"1px solid var(--border-subtle)", flexShrink:0, background:"var(--color-bg-card)" }}>
            Variables — inspect SachinYadav
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"0.5rem 0", background:"var(--color-bg)" }}>
            <TreeNode node={ROOT} depth={0} audio={audio}/>
          </div>
          {/* Console bottom */}
          <div style={{ borderTop:"1px solid var(--border-subtle)", flexShrink:0 }}>
            <div style={{ display:"flex", background:"var(--color-bg-card)", borderBottom:"1px solid var(--border-subtle)" }}>
              {["console","output"].map(t => (
                <button key={t} onClick={() => { setBottomTab(t); audio?.playClick(); }}
                  style={{
                    padding:"0.3rem 0.85rem", background:"none", border:"none",
                    borderBottom: bottomTab===t ? "2px solid var(--color-wine)" : "2px solid transparent",
                    color: bottomTab===t ? "var(--color-cream)" : "var(--color-comment)",
                    fontFamily:"var(--font-mono)", fontSize:"0.65rem", cursor:"pointer",
                    textTransform:"capitalize",
                  }}
                  onMouseEnter={() => audio?.playHover()}
                >{t}</button>
              ))}
            </div>
            <div style={{ height:"160px", overflowY:"auto", background:"var(--color-bg-darker)" }}>
              {LOGS.map((log, i) => (
                <ConsoleRow key={i} log={log} visible={logIndex > i}/>
              ))}
              {logIndex === 0 && (
                <div style={{ padding:"0.6rem 0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--color-comment)" }}>
                  Click <span style={{ color:"var(--color-sage)", fontWeight:700 }}>▶ Start</span> to run the debug session…
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: watch + call stack */}
        <div style={{ width:"220px", background:"var(--color-bg-card)", borderLeft:"1px solid var(--border-subtle)", display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0 }} className="debug-right">
          <div style={{ display:"flex", background:"var(--color-bg-elevated)", borderBottom:"1px solid var(--border-subtle)", flexShrink:0 }}>
            {[{ id:"watch", label:"Watch" },{ id:"callstack", label:"Call Stack" }].map(t => (
              <button key={t.id} onClick={() => { setRightTab(t.id); audio?.playClick(); }}
                style={{
                  flex:1, padding:"0.38rem 0", background:"none", border:"none",
                  borderBottom: rightTab===t.id ? "2px solid var(--color-wine)" : "2px solid transparent",
                  color: rightTab===t.id ? "var(--color-cream)" : "var(--color-comment)",
                  fontFamily:"var(--font-mono)", fontSize:"0.62rem", cursor:"pointer",
                }}
                onMouseEnter={() => audio?.playHover()}
              >{t.label}</button>
            ))}
          </div>

          <div style={{ flex:1, overflowY:"auto" }}>
            {rightTab === "watch" ? (
              <div>
                {WATCH.map((w,i) => (
                  <div key={i} style={{
                    padding:"0.4rem 0.75rem", borderBottom:"1px solid var(--border-subtle)",
                    fontFamily:"var(--font-mono)", fontSize:"0.68rem",
                  }}>
                    <div style={{ color:"var(--color-rose)", marginBottom:"0.1rem" }}>{w.expr}</div>
                    <div style={{ color: w.color }}>{w.val}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {CALL_STACK.map((frame, i) => (
                  <div key={i}
                    onMouseEnter={() => audio?.playHover()}
                    style={{
                      padding:"0.38rem 0.75rem", borderBottom:"1px solid var(--border-subtle)",
                      fontFamily:"var(--font-mono)", fontSize:"0.67rem",
                      color: i===0 ? "var(--color-cream)" : "var(--color-comment)",
                      cursor:"pointer",
                    }}
                    className="dbg-row"
                  >
                    {i===0 && <span style={{ color:"var(--color-wine)", marginRight:"0.3rem" }}>▶</span>}
                    {frame}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .dbg-row:hover { background: var(--color-bg-elevated) !important; }
        .dbg-btn:not(:disabled):hover { background: var(--color-bg-elevated) !important; border-color: var(--border-subtle) !important; }
        @media (max-width: 900px) {
          .debug-layout { flex-direction: column !important; }
          .debug-source { width: 100% !important; max-height: 160px; }
          .debug-right  { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
