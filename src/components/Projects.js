"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileCode, X, Terminal, Link2, ChevronRight } from "lucide-react";

const projects = [
  {
    file:   "bright-code.ts",
    num:    "01",
    title:  "Bright Code",
    sub:    "Real-Time Collaboration IDE",
    lang:   "TypeScript",
    color:  "var(--color-cyan)",
    desc:   "A full-stack collaborative IDE supporting live multi-user code synchronization, chat services, and role access moderation via Monaco Editor and custom WebSockets.",
    stack:  ["React.js", "Socket.IO", "Monaco Editor", "Express", "Node.js", "CSS Grid"],
    github: "#",
    live:   "https://brightcode-client.onrender.com/",
    role:   "Lead Frontend Engineer. Structured live workspace routing, dashboard interface states, and client-side WebSocket sync gates.",
    bullets: [
      "Architected client-side room routing and dynamic user access levels.",
      "Integrated Microsoft Monaco Editor with customized editor theme.",
      "Engineered real-time cursor indicators over WebSocket frames.",
    ],
    architecture: [
      { t: "comment",  v: "// System Architecture" },
      { t: "keyword",  v: "interface" },
      { t: "plain",    v: " " },
      { t: "class",    v: "BrightCode" },
      { t: "plain",    v: " {" },
      { t: "newline" },
      { t: "plain",    v: "  " },
      { t: "variable", v: "client" },
      { t: "plain",    v: ": React + Monaco Editor" },
      { t: "newline" },
      { t: "plain",    v: "  " },
      { t: "variable", v: "transport" },
      { t: "plain",    v: ": WebSocket (Socket.IO)" },
      { t: "newline" },
      { t: "plain",    v: "  " },
      { t: "variable", v: "server" },
      { t: "plain",    v: ": Express + Node.js" },
      { t: "newline" },
      { t: "plain",    v: "  " },
      { t: "variable", v: "storage" },
      { t: "plain",    v: ": In-Memory + MongoDB" },
      { t: "newline" },
      { t: "plain",    v: "}" },
    ],
  },
  {
    file:   "demand-sight.py",
    num:    "02",
    title:  "DemandSight",
    sub:    "Geospatial Fleet Analytics",
    lang:   "Python",
    color:  "var(--color-yellow)",
    desc:   "An intelligent geographic portal mapping urban transportation statistics and forecasting high-occupancy zones for efficient fleet scheduling.",
    stack:  ["React.js", "Python", "FastAPI", "Statsmodels", "AWS Amplify", "Leaflet"],
    github: "https://github.com/SachinYadav2446/Taxi-Demand-Forecasting-System-",
    live:   "https://frontend.doh8i8audx0xv.amplifyapp.com/",
    role:   "Full Stack Engineer. Built interactive map visualizations using Leaflet, connected backend prediction APIs, deployed on AWS Amplify.",
    bullets: [
      "Developed mapping overlays showing historical ride density gradients.",
      "Optimized client state logic to parse predictive hotspot arrays.",
      "Configured AWS Amplify CI/CD workflows.",
    ],
    architecture: [
      { t: "comment",  v: "# System Architecture" },
      { t: "newline" },
      { t: "keyword",  v: "class" },
      { t: "plain",    v: " " },
      { t: "class",    v: "DemandSight" },
      { t: "plain",    v: ":" },
      { t: "newline" },
      { t: "plain",    v: "    " },
      { t: "variable", v: "client" },
      { t: "plain",    v: " = Leaflet + React.js" },
      { t: "newline" },
      { t: "plain",    v: "    " },
      { t: "variable", v: "api" },
      { t: "plain",    v: "    = FastAPI (Python)" },
      { t: "newline" },
      { t: "plain",    v: "    " },
      { t: "variable", v: "model" },
      { t: "plain",    v: "  = Statsmodels ARIMA" },
      { t: "newline" },
      { t: "plain",    v: "    " },
      { t: "variable", v: "host" },
      { t: "plain",    v: "   = AWS Amplify" },
    ],
  },
  {
    file:   "forecaster.py",
    num:    "03",
    title:  "Run-Rate Forecaster",
    sub:    "Time-Series Predictions API",
    lang:   "Python",
    color:  "var(--color-green)",
    desc:   "An analytical forecasting microservice engine predicting operations metrics with ARIMA grid search and backtesting parameters (MAE, MAPE).",
    stack:  ["Python", "FastAPI", "Statsmodels", "Pandas", "Scikit-Learn"],
    github: "https://github.com/SachinYadav2446/Run-Rate-Forecaster",
    live:   "#",
    role:   "Backend Engineer. Authored time-series model training scripts, database query normalization, and backtesting framework.",
    bullets: [
      "Implemented custom grid search for optimal ARIMA order variables.",
      "Constructed backtesting utility logging mean absolute percentage errors.",
      "Optimized Pandas routines to align missing timestamp records.",
    ],
    architecture: [
      { t: "comment",  v: "# Forecaster Pipeline" },
      { t: "newline" },
      { t: "plain",    v: "Client " },
      { t: "operator", v: "->" },
      { t: "plain",    v: " FastAPI " },
      { t: "operator", v: "->" },
      { t: "plain",    v: " ARIMA Engine" },
      { t: "newline" },
      { t: "plain",    v: "       " },
      { t: "operator", v: "->" },
      { t: "plain",    v: " Backtester (MAE/MAPE)" },
      { t: "newline" },
      { t: "plain",    v: "       " },
      { t: "operator", v: "->" },
      { t: "plain",    v: " JSON Response" },
    ],
  },
  {
    file:   "resume-enhancer.py",
    num:    "04",
    title:  "Resume Enhancer",
    sub:    "AI ATS Optimizer",
    lang:   "Python",
    color:  "var(--color-orange)",
    desc:   "An intelligent tool scanning resumes to evaluate ATS formatting criteria, calculate keyword relevance scores, and suggest target bullet edits.",
    stack:  ["Python", "OpenAI API", "FastAPI", "React.js", "CSS Modules"],
    github: "https://github.com/SachinYadav2446/Resume_Enhancer",
    live:   "#",
    role:   "Full Stack Developer. Developed OpenAI API prompt workflows, PDF text extractors, and clean card dashboards.",
    bullets: [
      "Built modular PDF text extraction layers with formatting cleanup.",
      "Crafted prompt configurations to retrieve structured JSON ATS feedback.",
      "Designed responsive dashboard cards using CSS Grid layout tokens.",
    ],
    architecture: [
      { t: "comment",  v: "# Resume Enhancer Flow" },
      { t: "newline" },
      { t: "plain",    v: "PDF Upload " },
      { t: "operator", v: "->" },
      { t: "plain",    v: " FastAPI Parser" },
      { t: "newline" },
      { t: "plain",    v: "           " },
      { t: "operator", v: "->" },
      { t: "plain",    v: " OpenAI GPT-4" },
      { t: "newline" },
      { t: "plain",    v: "           " },
      { t: "operator", v: "->" },
      { t: "plain",    v: " ATS Score JSON" },
      { t: "newline" },
      { t: "plain",    v: "           " },
      { t: "operator", v: "->" },
      { t: "plain",    v: " React Dashboard" },
    ],
  },
  {
    file:   "creatify.tsx",
    num:    "05",
    title:  "Creatify",
    sub:    "Browser-Native Design Suite",
    lang:   "TSX",
    color:  "var(--color-pink)",
    desc:   "A professional 8-in-1 browser-native design suite uniting creative applications into a unified workspace. Built with glassmorphic layouts and PostgreSQL sync.",
    stack:  ["React 18", "Vite", "Node.js", "Express", "PostgreSQL", "Canvas/SVG"],
    github: "https://github.com/SachinYadav2446/Video-editor",
    live:   "https://video-editor-1-1xu2.onrender.com/",
    role:   "Full Stack Developer. Architected unified workspace, developed 8 studio modules, implemented real-time sync with PostgreSQL.",
    bullets: [
      "Built 8-in-1 suite: video editing, image manipulation, logo generation.",
      "Engineered multi-track timeline sequencing with drag-and-drop SVG rendering.",
      "Integrated JWT auth, Bcrypt passwords, serverless PostgreSQL sync.",
    ],
    architecture: [
      { t: "comment",  v: "// Creatify Architecture" },
      { t: "newline" },
      { t: "keyword",  v: "const" },
      { t: "plain",    v: " " },
      { t: "variable", v: "studios" },
      { t: "plain",    v: " = [" },
      { t: "newline" },
      { t: "plain",    v: "  " },
      { t: "string",   v: '"Video"' },
      { t: "plain",    v: ", " },
      { t: "string",   v: '"Image"' },
      { t: "plain",    v: ", " },
      { t: "string",   v: '"Logo"' },
      { t: "plain",    v: "," },
      { t: "newline" },
      { t: "plain",    v: "  // + 5 more..." },
      { t: "newline" },
      { t: "plain",    v: "]; // syncs → PostgreSQL" },
    ],
  },
  {
    file:   "portfolio.tsx",
    num:    "06",
    title:  "This Portfolio",
    sub:    "IDE-Themed Showcase",
    lang:   "TSX",
    color:  "var(--color-purple)",
    desc:   "A highly immersive portfolio styled as a VS Code editor, featuring 3D WebGL scenes, interactive node maps, and real-time audio synthesis.",
    stack:  ["Next.js", "React.js", "Three.js", "WebGL", "Framer Motion", "AWS Amplify"],
    github: "https://github.com/SachinYadav2446/Portfolio",
    live:   "https://main.dw5hoa6sugvel.amplifyapp.com/",
    role:   "Lead Engineer & Designer. Full IDE theme, WebGL particle field, node skill graph, ambient audio synthesizer.",
    bullets: [
      "Programmed interactive SVG skill node map with hover-triggered wire animations.",
      "Designed IDE layout: file tabs, sidebar, status bar, terminal pane.",
      "Built ambient Web Audio API synthesizer with chord progression.",
    ],
    architecture: [
      { t: "comment",  v: "// Portfolio Stack" },
      { t: "newline" },
      { t: "keyword",  v: "export" },
      { t: "plain",    v: " " },
      { t: "keyword",  v: "const" },
      { t: "plain",    v: " " },
      { t: "variable", v: "stack" },
      { t: "plain",    v: " = {" },
      { t: "newline" },
      { t: "plain",    v: "  " },
      { t: "function", v: "framework" },
      { t: "plain",    v: ": " },
      { t: "string",   v: '"Next.js 16"' },
      { t: "plain",    v: "," },
      { t: "newline" },
      { t: "plain",    v: "  " },
      { t: "function", v: "3d" },
      { t: "plain",    v: ":        " },
      { t: "string",   v: '"Three.js"' },
      { t: "plain",    v: "," },
      { t: "newline" },
      { t: "plain",    v: "  " },
      { t: "function", v: "animation" },
      { t: "plain",    v: ": " },
      { t: "string",   v: '"Framer"' },
      { t: "newline" },
      { t: "plain",    v: "}" },
    ],
  },
  {
    file:   "js-basics.js",
    num:    "07",
    title:  "JS Projects Basics",
    sub:    "JavaScript Fundamentals Collection",
    lang:   "JavaScript",
    color:  "var(--color-yellow)",
    desc:   "A collection of 10-12 fundamental JavaScript projects: bill splitter, counter, expense tracker, tic-tac-toe, weather app, and more.",
    stack:  ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
    github: "https://github.com/SachinYadav2446/JS-Projects-Basics-",
    live:   "#",
    role:   "Frontend Developer. Built to master JavaScript fundamentals, DOM manipulation, event handling, and CSS styling.",
    bullets: [
      "10-12 projects covering games, tools, and utility apps.",
      "Mastered DOM manipulation, event handling, state patterns.",
      "Responsive designs with modern CSS and semantic HTML.",
    ],
    architecture: [
      { t: "comment",  v: "// Project Gallery" },
      { t: "newline" },
      { t: "keyword",  v: "const" },
      { t: "plain",    v: " " },
      { t: "variable", v: "projects" },
      { t: "plain",    v: " = [" },
      { t: "newline" },
      { t: "plain",    v: "  " },
      { t: "string",   v: '"TicTacToe"' },
      { t: "plain",    v: ", " },
      { t: "string",   v: '"Weather"' },
      { t: "plain",    v: "," },
      { t: "newline" },
      { t: "plain",    v: "  // ... 10 more" },
      { t: "newline" },
      { t: "plain",    v: "];" },
    ],
  },
];

const tokenClass = {
  comment: "token-comment", keyword:  "token-keyword",
  function:"token-function", string:  "token-string",
  variable:"token-variable", number:  "token-number",
  plain:   "token-plain",   operator:"token-operator",
  class:   "token-class",
};

function ArchSnippet({ tokens }) {
  const lines = [];
  let current = [];
  tokens.forEach((tok) => {
    if (tok.t === "newline") { lines.push(current); current = []; }
    else current.push(tok);
  });
  if (current.length) lines.push(current);
  return (
    <div className="code-block" style={{ padding: "1rem 1.2rem", fontSize: "0.72rem" }}>
      {lines.map((line, i) => (
        <div key={i} className="code-line" style={{ minHeight: "1.5em" }}>
          <span className="line-number">{i + 1}</span>
          <span style={{ whiteSpace: "pre" }}>
            {line.map((tok, j) => (
              <span key={j} className={tokenClass[tok.t] || "token-plain"}>{tok.v}</span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Projects({ audio }) {
  const [activeFile, setActiveFile] = useState(projects[0].file);
  const [openTabs, setOpenTabs]     = useState([projects[0].file]);

  const activeProject = projects.find(p => p.file === activeFile) || projects[0];

  const openTab = (file) => {
    if (!openTabs.includes(file)) setOpenTabs(prev => [...prev, file]);
    setActiveFile(file);
    audio?.playClick();
  };

  const closeTab = (e, file) => {
    e.stopPropagation();
    const next = openTabs.filter(f => f !== file);
    setOpenTabs(next);
    if (activeFile === file) setActiveFile(next[next.length - 1] || projects[0].file);
    audio?.playClick();
  };

  return (
    <section
      id="projects"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--border-subtle)",
        padding: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Open file tabs */}
      <div className="ide-tab-bar">
        {openTabs.map((file) => {
          const proj = projects.find(p => p.file === file);
          return (
            <div
              key={file}
              className={`ide-tab${activeFile === file ? " active" : ""}`}
              onClick={() => { setActiveFile(file); audio?.playClick(); }}
              onMouseEnter={() => audio?.playHover()}
            >
              <FileCode size={11} style={{ color: proj?.color }} />
              {file}
              <button
                onClick={(e) => closeTab(e, file)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--color-comment)", padding: "0 0.1rem",
                  display: "flex", alignItems: "center",
                  opacity: 0.6, borderRadius: "2px",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = "var(--color-red)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.color = "var(--color-comment)"; }}
              >
                <X size={10} />
              </button>
            </div>
          );
        })}
        <div style={{ flex: 1, borderBottom: "1px solid var(--border-subtle)" }} />
      </div>

      {/* Main layout: sidebar + editor */}
      <div
        style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: "600px" }}
        className="projects-layout"
      >
        {/* File tree sidebar */}
        <div
          style={{
            width: "220px",
            background: "var(--color-bg-card)",
            borderRight: "1px solid var(--border-subtle)",
            overflowY: "auto",
            flexShrink: 0,
          }}
          className="proj-sidebar"
        >
          <div
            style={{
              padding: "0.6rem 0.75rem 0.4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-comment)",
              fontWeight: 700,
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            Projects /
          </div>
          {projects.map((proj) => (
            <div
              key={proj.file}
              className={`ide-tree-item${activeFile === proj.file ? " active" : ""}`}
              onClick={() => openTab(proj.file)}
              onMouseEnter={() => audio?.playHover()}
              style={{ paddingLeft: "0.75rem" }}
            >
              <ChevronRight size={10} style={{ color: "var(--color-comment)", flexShrink: 0 }} />
              <FileCode size={12} style={{ color: proj.color, flexShrink: 0 }} />
              <span>{proj.file}</span>
            </div>
          ))}
        </div>

        {/* Editor area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Breadcrumb */}
          <div className="ide-breadcrumb">
            <span>projects</span>
            <span className="sep"> › </span>
            <span className="current">{activeProject.file}</span>
            <span className="sep" style={{ marginLeft: "auto" }} />
            <span style={{ color: "var(--color-comment)" }}>{activeProject.lang}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.file}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "2rem 2.5rem",
                background: "var(--color-bg)",
              }}
            >
              {/* File header comment block */}
              <div className="code-block" style={{ marginBottom: "2rem" }}>
                <div className="code-line">
                  <span className="line-number">1</span>
                  <span className="token-comment">{"/*" + "*"}</span>
                </div>
                <div className="code-line">
                  <span className="line-number">2</span>
                  <span className="token-comment"> * @file    {activeProject.file}</span>
                </div>
                <div className="code-line">
                  <span className="line-number">3</span>
                  <span className="token-comment"> * @project {activeProject.title}</span>
                </div>
                <div className="code-line">
                  <span className="line-number">4</span>
                  <span className="token-comment"> * @desc    {activeProject.sub}</span>
                </div>
                <div className="code-line">
                  <span className="line-number">5</span>
                  <span className="token-comment"> */</span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                  marginBottom: "2rem",
                }}
                className="proj-detail-grid"
              >
                {/* Description */}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--color-comment)",
                      marginBottom: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <Terminal size={11} />
                    <span>{"// Description"}</span>
                  </div>
                  <p
                    style={{
                      color: "var(--color-fg-dim)",
                      fontSize: "0.88rem",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {activeProject.desc}
                  </p>

                  {/* Role */}
                  <div
                    style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--border-subtle)",
                      borderLeft: `3px solid ${activeProject.color}`,
                      borderRadius: "0 4px 4px 0",
                      padding: "0.75rem 1rem",
                      marginBottom: "1.25rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-fg-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "var(--color-comment)", marginRight: "0.4rem" }}>@role</span>
                    {activeProject.role}
                  </div>

                  {/* Bullets */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {activeProject.bullets.map((b, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "var(--color-fg-muted)",
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: activeProject.color, flexShrink: 0, marginTop: "0.1rem" }}>✓</span>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack + Architecture */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {/* Stack */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--color-comment)",
                        marginBottom: "0.6rem",
                      }}
                    >
                      // Stack
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {activeProject.stack.map((tag) => (
                        <span
                          key={tag}
                          className="skill-tag"
                          style={{
                            color: activeProject.color,
                            borderColor: `${activeProject.color}44`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architecture */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--color-comment)",
                        marginBottom: "0.6rem",
                      }}
                    >
                      // Architecture
                    </div>
                    <ArchSnippet tokens={activeProject.architecture} />
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    {activeProject.github !== "#" && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ padding: "0.5rem 1rem", fontSize: "0.72rem" }}
                        onMouseEnter={() => audio?.playHover()}
                        onClick={() => audio?.playClick()}
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                        Source
                      </a>
                    )}
                    {activeProject.live !== "#" && (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ padding: "0.5rem 1rem", fontSize: "0.72rem" }}
                        onMouseEnter={() => audio?.playHover()}
                        onClick={() => audio?.playClick()}
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .proj-sidebar { display: none !important; }
          .proj-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
