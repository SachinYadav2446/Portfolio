"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitPullRequest, GitMerge, GitBranch, MessageSquare,
         CheckCircle, Clock, ExternalLink, ChevronDown, ChevronRight,
         Plus, Minus, FileCode, AlertCircle } from "lucide-react";

const PRS = [
  {
    id: "PR#47",
    title: "feat: real-time collaborative IDE with Monaco + Socket.IO",
    branch: "feature/bright-code",
    base: "main",
    status: "merged",
    project: "Bright Code",
    live: "https://brightcode-client.onrender.com/",
    github: "#",
    desc: "Full-stack collaborative IDE supporting live multi-user code synchronization, chat, and role-based access.",
    date: "2024-09-12",
    additions: 3847,
    deletions: 124,
    comments: 6,
    reviewers: ["socket-io-bot", "monaco-lsp"],
    labels: ["feature","real-time","frontend"],
    checks: [
      { name:"build",   status:"pass" },
      { name:"lint",    status:"pass" },
      { name:"deploy",  status:"pass" },
    ],
    files: [
      { name:"client/src/Editor.tsx",      add:312, del:0,  lines:[
        { t:"add",  v:"+ import { MonacoEditor } from '@monaco-editor/react';" },
        { t:"add",  v:"+ import { socket } from '../socket';" },
        { t:"ctx",  v:"  const [code, setCode] = useState('');" },
        { t:"add",  v:"+ socket.on('code-change', (delta) => setCode(delta));" },
        { t:"add",  v:"+ socket.emit('code-change', newCode);" },
      ]},
      { name:"server/socket.js",           add:89,  del:12, lines:[
        { t:"del",  v:"- io.on('connection', (s) => s.on('msg', cb));" },
        { t:"add",  v:"+ io.on('connection', (socket) => {" },
        { t:"add",  v:"+   socket.on('code-change', (d) => socket.broadcast.emit('code-change', d));" },
        { t:"add",  v:"+ });" },
      ]},
    ],
    review: { author:"sachin-bot", body:"LGTM! Real-time sync latency < 80ms on average. ✅" },
  },
  {
    id: "PR#31",
    title: "feat: ARIMA geospatial demand forecasting + Leaflet heatmaps",
    branch: "feature/demand-sight",
    base: "main",
    status: "merged",
    project: "DemandSight",
    live: "https://frontend.doh8i8audx0xv.amplifyapp.com/",
    github: "https://github.com/SachinYadav2446/Taxi-Demand-Forecasting-System-",
    desc: "Geospatial fleet analytics portal mapping urban transportation demand using ARIMA forecasting.",
    date: "2024-06-08",
    additions: 2103,
    deletions: 340,
    comments: 4,
    reviewers: ["ml-pipeline-ci"],
    labels: ["ML","geospatial","FastAPI"],
    checks: [
      { name:"pytest",  status:"pass" },
      { name:"build",   status:"pass" },
      { name:"model-eval", status:"warn" },
    ],
    files: [
      { name:"api/forecast.py",            add:156, del:40, lines:[
        { t:"del",  v:"- def predict(data):" },
        { t:"del",  v:"-     return simple_avg(data)" },
        { t:"add",  v:"+ def predict(data: pd.DataFrame) -> dict:" },
        { t:"add",  v:"+     model = ARIMA(data, order=best_params(data))" },
        { t:"add",  v:"+     return { 'forecast': model.fit().forecast(12) }" },
      ]},
      { name:"frontend/MapView.tsx",       add:98,  del:5,  lines:[
        { t:"add",  v:"+ const heat = L.heatLayer(hotspots, { radius: 25 });" },
        { t:"add",  v:"+ heat.addTo(map);" },
        { t:"ctx",  v:"  map.setView([12.97, 77.59], 12);" },
      ]},
    ],
    review: { author:"sachin-bot", body:"MAE: 4.2 rides/zone. Heatmap renders at 60fps. Deploying to Amplify. 🚀" },
  },
  {
    id: "PR#58",
    title: "feat: 8-in-1 browser design suite with Canvas/SVG + JWT auth",
    branch: "feature/creatify",
    base: "main",
    status: "merged",
    project: "Creatify",
    live: "https://video-editor-1-1xu2.onrender.com/",
    github: "https://github.com/SachinYadav2446/Video-editor",
    desc: "Browser-native design suite uniting 8 creative apps in a unified workspace with PostgreSQL sync.",
    date: "2024-11-20",
    additions: 6241,
    deletions: 88,
    comments: 9,
    reviewers: ["db-schema-check", "auth-guard"],
    labels: ["feature","canvas","fullstack","auth"],
    checks: [
      { name:"build",     status:"pass" },
      { name:"db-migrate",status:"pass" },
      { name:"e2e",       status:"pass" },
    ],
    files: [
      { name:"src/studios/VideoEditor.tsx", add:412, del:0, lines:[
        { t:"add",  v:"+ const timeline = useTimeline();" },
        { t:"add",  v:"+ const tracks   = useTracks(projectId);" },
        { t:"add",  v:"+ <DragDropTimeline tracks={tracks} onEdit={timeline.update} />" },
      ]},
      { name:"server/auth.js",              add:67,  del:14,lines:[
        { t:"del",  v:"- // TODO: add auth" },
        { t:"add",  v:"+ const hash = await bcrypt.hash(password, 12);" },
        { t:"add",  v:"+ const token = jwt.sign({ id: user.id }, SECRET);" },
      ]},
    ],
    review: { author:"sachin-bot", body:"8 studios, JWT auth, live PostgreSQL sync — all green. Merging. ✅" },
  },
  {
    id: "PR#64",
    title: "feat: AI resume ATS scorer with OpenAI GPT-4 + PDF parser",
    branch: "feature/resume-enhancer",
    base: "main",
    status: "open",
    project: "Resume Enhancer",
    live: "#",
    github: "https://github.com/SachinYadav2446/Resume_Enhancer",
    desc: "Intelligent ATS optimizer scanning resumes for keyword relevance and formatting criteria.",
    date: "2025-02-14",
    additions: 1893,
    deletions: 55,
    comments: 3,
    reviewers: ["openai-cost-check"],
    labels: ["AI","FastAPI","WIP"],
    checks: [
      { name:"build",   status:"pass" },
      { name:"lint",    status:"pass" },
      { name:"cost-est",status:"warn" },
    ],
    files: [
      { name:"api/ats.py",                 add:88,  del:10, lines:[
        { t:"add",  v:"+ async def score(resume: UploadFile):" },
        { t:"add",  v:"+     text = extract_pdf(await resume.read())" },
        { t:"add",  v:'+     resp = openai.chat(messages=[{"role":"user","content": PROMPT+text}])' },
        { t:"add",  v:"+     return parse_json(resp.choices[0].message.content)" },
      ]},
    ],
    review: { author:"sachin-bot", body:"⚠️ OpenAI token cost ~$0.003/request. Consider caching frequent resumes." },
  },
];

const STATUS = {
  merged: { icon:<GitMerge size={12}/>,      color:"var(--color-lavender)", bg:"rgba(176,157,200,0.15)", label:"Merged"  },
  open:   { icon:<GitPullRequest size={12}/>, color:"var(--color-sage)",     bg:"rgba(123,174,138,0.15)", label:"Open"    },
  closed: { icon:<GitPullRequest size={12}/>, color:"var(--color-error)",    bg:"rgba(204,68,68,0.15)",   label:"Closed"  },
};

const CHECK_ICON = {
  pass: <CheckCircle size={11} color="var(--color-sage)"  />,
  warn: <AlertCircle size={11} color="var(--color-amber)" />,
  fail: <AlertCircle size={11} color="var(--color-error)" />,
};

function DiffLine({ line }) {
  const bg = line.t === "add" ? "rgba(123,174,138,0.12)"
           : line.t === "del" ? "rgba(204,68,68,0.12)"
           : "transparent";
  const color = line.t === "add" ? "var(--color-sage)"
              : line.t === "del" ? "var(--color-error)"
              : "var(--color-comment)";
  return (
    <div style={{
      fontFamily:"var(--font-mono)", fontSize:"0.72rem", lineHeight:1.6,
      padding:"0 0.75rem", background:bg, color,
      borderLeft: line.t === "add" ? "2px solid var(--color-sage)"
                : line.t === "del" ? "2px solid var(--color-error)"
                : "2px solid transparent",
      whiteSpace:"pre",
    }}>{line.v}</div>
  );
}

function FileDiff({ file, audio }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border:"1px solid var(--border-subtle)", borderRadius:"4px", overflow:"hidden", marginBottom:"0.5rem" }}>
      <div
        onClick={() => { setOpen(o => !o); audio?.playClick(); }}
        onMouseEnter={() => audio?.playHover()}
        style={{
          display:"flex", alignItems:"center", gap:"0.5rem",
          padding:"0.45rem 0.75rem", cursor:"pointer",
          background:"var(--color-bg-elevated)",
          fontFamily:"var(--font-mono)", fontSize:"0.72rem",
          transition:"background .15s",
        }}
      >
        {open ? <ChevronDown size={11} color="var(--color-comment)"/> : <ChevronRight size={11} color="var(--color-comment)"/>}
        <FileCode size={11} color="var(--color-wine)"/>
        <span style={{ color:"var(--color-cream-dim)", flex:1 }}>{file.name}</span>
        <span style={{ color:"var(--color-sage)",  marginLeft:"0.5rem" }}>+{file.add}</span>
        <span style={{ color:"var(--color-error)", marginLeft:"0.35rem" }}>−{file.del}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0 }} animate={{ height:"auto" }} exit={{ height:0 }}
            transition={{ duration:.2 }} style={{ overflow:"hidden" }}>
            <div style={{ background:"var(--color-bg-darker)", padding:"0.35rem 0", borderTop:"1px solid var(--border-subtle)" }}>
              {file.lines.map((l,i) => <DiffLine key={i} line={l}/>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PRCard({ pr, active, onClick, audio }) {
  const s = STATUS[pr.status];
  return (
    <motion.div
      onClick={() => { onClick(); audio?.playClick(); }}
      onMouseEnter={() => audio?.playHover()}
      whileHover={{ x: 2 }}
      style={{
        padding:"0.75rem 1rem", cursor:"pointer",
        background: active ? "var(--color-bg-selection)" : "transparent",
        borderLeft: active ? "2px solid var(--color-wine)" : "2px solid transparent",
        borderBottom:"1px solid var(--border-subtle)",
        transition:"background .15s",
      }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"0.25rem" }}>
        <span style={{ color:s.color }}>{s.icon}</span>
        <span style={{
          fontFamily:"var(--font-mono)", fontSize:"0.6rem",
          background:s.bg, color:s.color,
          padding:"0.05rem 0.35rem", borderRadius:"10px", border:`1px solid ${s.color}55`,
        }}>{s.label}</span>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)", marginLeft:"auto" }}>{pr.id}</span>
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.73rem", color:"var(--color-cream-dim)", marginBottom:"0.2rem",
        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{pr.title}</div>
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-comment)", display:"flex", alignItems:"center", gap:"0.2rem" }}>
          <GitBranch size={9}/> {pr.branch}
        </span>
        {pr.labels.map(l => (
          <span key={l} style={{
            fontFamily:"var(--font-mono)", fontSize:"0.58rem",
            background:"var(--color-bg-elevated)", border:"1px solid var(--glass-border)",
            color:"var(--color-cream-muted)", padding:"0 0.3rem", borderRadius:"3px",
          }}>{l}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function PullRequests({ audio }) {
  const [activePR, setActivePR] = useState(0);
  const pr = PRS[activePR];
  const s  = STATUS[pr.status];

  return (
    <section id="pull-requests" style={{ background:"var(--color-bg)", borderTop:"1px solid var(--border-subtle)", padding:0, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      {/* Tab */}
      <div className="ide-tab-bar">
        <div className="ide-tab active">
          <GitPullRequest size={12} color="var(--color-wine)"/>
          pull-requests.md
        </div>
        <div style={{ flex:1, borderBottom:"1px solid var(--border-subtle)" }}/>
        <div style={{ padding:"0 1rem", display:"flex", alignItems:"center", gap:"0.4rem",
          fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)" }}>
          <span style={{ color:"var(--color-lavender)" }}>{PRS.filter(p=>p.status==="merged").length} merged</span>
          <span style={{ opacity:.4 }}>·</span>
          <span style={{ color:"var(--color-sage)" }}>{PRS.filter(p=>p.status==="open").length} open</span>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", flex:1, minHeight:0 }} className="pr-layout">
        {/* PR list */}
        <div style={{ background:"var(--color-bg-card)", borderRight:"1px solid var(--border-subtle)", overflowY:"auto" }}>
          <div style={{ padding:"0.5rem 1rem", background:"var(--color-bg-elevated)",
            borderBottom:"1px solid var(--border-subtle)", fontFamily:"var(--font-mono)",
            fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--color-comment)" }}>
            02 / Projects as Pull Requests
          </div>
          {PRS.map((p,i) => (
            <PRCard key={p.id} pr={p} active={activePR===i} onClick={() => setActivePR(i)} audio={audio}/>
          ))}
        </div>

        {/* PR detail */}
        <AnimatePresence mode="wait">
          <motion.div key={pr.id}
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            transition={{ duration:.18 }}
            style={{ overflowY:"auto", padding:"2rem 2.5rem", background:"var(--color-bg)" }}
          >
            {/* Header */}
            <div style={{ marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.75rem", flexWrap:"wrap" }}>
                <span style={{
                  display:"flex", alignItems:"center", gap:"0.35rem",
                  background:s.bg, color:s.color, border:`1px solid ${s.color}55`,
                  padding:"0.25rem 0.7rem", borderRadius:"12px",
                  fontFamily:"var(--font-mono)", fontSize:"0.72rem", fontWeight:700,
                }}>{s.icon}{s.label}</span>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.72rem", color:"var(--color-comment)" }}>{pr.id} · {pr.date}</span>
                <div style={{ marginLeft:"auto", display:"flex", gap:"0.5rem" }}>
                  {pr.github !== "#" && (
                    <a href={pr.github} target="_blank" rel="noopener noreferrer" className="btn-secondary"
                      style={{ padding:"0.3rem 0.75rem", fontSize:"0.68rem" }}
                      onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
                      <FileCode size={11}/> Code
                    </a>
                  )}
                  {pr.live !== "#" && (
                    <a href={pr.live} target="_blank" rel="noopener noreferrer" className="btn-primary"
                      style={{ padding:"0.3rem 0.75rem", fontSize:"0.68rem" }}
                      onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
                      <ExternalLink size={11}/> Live
                    </a>
                  )}
                </div>
              </div>
              <h2 style={{ fontSize:"1.15rem", color:"var(--color-cream)", marginBottom:"0.5rem", fontFamily:"var(--font-mono)", fontWeight:700, lineHeight:1.4 }}>{pr.title}</h2>
              <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontFamily:"var(--font-mono)", fontSize:"0.68rem", color:"var(--color-comment)" }}>
                <GitBranch size={11}/> <span style={{ color:"var(--color-rose)" }}>{pr.branch}</span>
                <span style={{ opacity:.4 }}>→</span>
                <span style={{ color:"var(--color-cream-muted)" }}>{pr.base}</span>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display:"flex", gap:"1rem", marginBottom:"1.5rem", flexWrap:"wrap" }}>
              {[
                { label:"Additions", val:`+${pr.additions.toLocaleString()}`, color:"var(--color-sage)"  },
                { label:"Deletions", val:`−${pr.deletions.toLocaleString()}`, color:"var(--color-error)" },
                { label:"Comments",  val:pr.comments,                         color:"var(--color-sky)"   },
              ].map(s => (
                <div key={s.label} style={{
                  background:"var(--color-bg-card)", border:"1px solid var(--border-subtle)",
                  borderRadius:"4px", padding:"0.5rem 1rem", textAlign:"center",
                }}>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"1rem", fontWeight:700, color:s.color }}>{s.val}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-comment)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.label}</div>
                </div>
              ))}
              {/* CI checks */}
              <div style={{ background:"var(--color-bg-card)", border:"1px solid var(--border-subtle)", borderRadius:"4px", padding:"0.5rem 1rem" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--color-comment)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.4rem" }}>CI Checks</div>
                <div style={{ display:"flex", gap:"0.5rem" }}>
                  {pr.checks.map(c => (
                    <span key={c.name} style={{ display:"flex", alignItems:"center", gap:"0.2rem", fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-cream-muted)" }}>
                      {CHECK_ICON[c.status]} {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ background:"var(--color-bg-card)", border:"1px solid var(--border-subtle)", borderLeft:"3px solid var(--color-wine)", borderRadius:"0 4px 4px 0", padding:"0.85rem 1.1rem", marginBottom:"1.5rem" }}>
              <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.78rem", color:"var(--color-cream-dim)", margin:0, lineHeight:1.7 }}>{pr.desc}</p>
            </div>

            {/* Changed files */}
            <div style={{ marginBottom:"1.5rem" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--color-comment)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.6rem" }}>
                Changed Files ({pr.files.length})
              </div>
              {pr.files.map((f,i) => <FileDiff key={i} file={f} audio={audio}/>)}
            </div>

            {/* Review comment */}
            <div style={{ background:"var(--color-bg-card)", border:"1px solid var(--border-subtle)", borderRadius:"6px", overflow:"hidden" }}>
              <div style={{ background:"var(--color-bg-elevated)", padding:"0.5rem 0.85rem",
                display:"flex", alignItems:"center", gap:"0.5rem",
                fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--color-comment)",
                borderBottom:"1px solid var(--border-subtle)" }}>
                <MessageSquare size={11} color="var(--color-rose)"/>
                <span style={{ color:"var(--color-rose)" }}>{pr.review.author}</span> left a review
              </div>
              <div style={{ padding:"0.85rem", fontFamily:"var(--font-mono)", fontSize:"0.75rem", color:"var(--color-cream-dim)", lineHeight:1.6 }}>
                {pr.review.body}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .pr-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
