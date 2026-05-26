"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Info, Layers, CheckCircle } from "lucide-react";
import BinaryHeading from "./BinaryHeading";

function ProjectCard({ proj, idx, onInspect }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        border: "none",
        background: "transparent",
        boxSizing: "border-box"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
        
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.0rem" }}>
            <span 
              style={{
                fontSize: "1.6rem",
                fontWeight: "800",
                fontFamily: "monospace",
                color: "rgba(255, 253, 249, 0.04)",
                lineHeight: "1",
                display: "block"
              }} 
            >
              {proj.num}
            </span>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              {proj.github !== "#" && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-cream-muted)", transition: "var(--transition-smooth)" }}
                  className="proj-icon-link"
                  title="GitHub Repository"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              )}
              {proj.live !== "#" && (
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-cream-muted)", transition: "var(--transition-smooth)" }}
                  className="proj-icon-link"
                  title="Live Preview"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <span 
            style={{ 
              fontSize: "0.68rem", 
              textTransform: "uppercase", 
              letterSpacing: "0.15em", 
              color: "var(--color-red)", 
              display: "block", 
              marginBottom: "0.35rem", 
              fontWeight: "700",
              fontFamily: "monospace"
            }}
          >
            {proj.sub}
          </span>
          <h3 
            style={{ 
              fontSize: "1.35rem", 
              color: "var(--color-cream)", 
              fontFamily: "var(--font-sans)", 
              fontWeight: 700,
              marginBottom: "0.75rem",
              textShadow: "0 0 4px rgba(255, 253, 249, 0.2)"
            }}
          >
            {proj.title}
          </h3>
          
          <p 
            style={{ 
              fontSize: "0.85rem", 
              color: "var(--color-cream-dim)", 
              lineHeight: "1.45", 
              marginBottom: "1.0rem"
            }}
          >
            {proj.desc}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {proj.stack.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.65rem",
                  background: "rgba(255,255,255,0.02)",
                  color: "var(--color-cream-dim)",
                  border: "1px solid var(--glass-border)",
                  padding: "0.18rem 0.45rem",
                  borderRadius: "4px",
                  fontFamily: "monospace"
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => onInspect(proj)}
            style={{
              width: "100%",
              background: "rgba(230, 57, 70, 0.04)",
              border: "1px solid rgba(230, 57, 70, 0.15)",
              color: "var(--color-cream)",
              fontFamily: "monospace",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.5rem 0",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              transition: "all 0.3s ease"
            }}
            className="inspect-btn clickable"
          >
            <Info size={11} color="var(--color-red)" /> Inspect Details
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const projectList = [
    {
      num: "01",
      title: "Bright Code",
      sub: "Real-Time Collaboration",
      desc: "A full-stack collaborative IDE supporting live multi-user code synchronization, chat services, and role access moderation via Monaco Editor and custom WebSockets.",
      stack: ["React.js", "Socket.IO", "Monaco Editor", "Express", "Node.js", "CSS Grid"],
      github: "#",
      live: "https://brightcode-client.onrender.com/",
      role: "Lead Frontend Engineer. Structured the live workspace routing, dashboard interface states, customized login/signup components, and client-side web socket sync gates.",
      architecture: `
┌─────────────────────────┐           ┌────────────────────────┐
│     Client Browser      │ <=======> │    Express Backend     │
│   (React + Monaco)      │ WebSocket │   (Socket.IO Server)   │
└─────────────────────────┘           └────────────────────────┘
            │                                      │
            ▼                                      ▼
┌─────────────────────────┐           ┌────────────────────────┐
│   Role-based Routing    │           │    In-Memory Cache &   │
│ (Admin/Editor/Comment)  │           │    MongoDB Registry    │
└─────────────────────────┘           └────────────────────────┘
      `,
      bullets: [
        "Architected client-side room routing and dynamic user access levels.",
        "Integrated Microsoft Monaco Editor with customized editor theme parameters.",
        "Engineered real-time cursor indicators and state changes over WebSocket frames."
      ]
    },
    {
      num: "02",
      title: "DemandSight",
      sub: "Geospatial Fleet Analytics",
      desc: "An intelligent geographic portal mapping urban transportation statistics and forecasting high-occupancy zones for efficient fleet scheduling.",
      stack: ["React.js", "Python", "FastAPI", "Statsmodels", "AWS Amplify", "Leaflet"],
      github: "https://github.com/SachinYadav2446/Taxi-Demand-Forecasting-System-",
      live: "https://frontend.doh8i8audx0xv.amplifyapp.com/",
      role: "Full Stack Engineer. Built the interactive map visualizations using Leaflet, connected backend prediction APIs, and deployed frontends on AWS Amplify.",
      architecture: `
┌─────────────────────────┐           ┌────────────────────────┐
│    Interactive Map      │  API GET  │    FastAPI Server      │
│  (Leaflet + React.js)   │  Hotspots │  (Python Prediction)   │
└─────────────────────────┘ <=========> └────────────────────────┘
            │                                      │
            ▼                                      ▼
┌─────────────────────────┐           ┌────────────────────────┐
│   AWS Amplify Hosting   │           │   Statsmodels ARIMA    │
│  (Production Client)    │           │   Ingestion Pipeline   │
└─────────────────────────┘           └────────────────────────┘
      `,
      bullets: [
        "Developed mapping overlays showing historical ride density gradients.",
        "Optimized client state logic to parse predictive hotspot arrays on viewport change.",
        "Configured AWS Amplify continuous deployment workflows for fast loading."
      ]
    },
    {
      num: "03",
      title: "Run-Rate Forecaster API",
      sub: "Time-Series Predictions",
      desc: "An analytical forecasting microservice engine predicting operations metrics (sales/traffic) with backtesting parameters (MAE, MAPE) and ARIMA grid search.",
      stack: ["Python", "FastAPI", "Statsmodels", "Pandas", "Scikit-Learn"],
      github: "https://github.com/SachinYadav2446/Run-Rate-Forecaster",
      live: "#",
      role: "Backend Engineer. Authored the time-series model training scripts, database query normalization, and backtesting framework.",
      architecture: `
┌─────────────────────────┐           ┌────────────────────────┐
│      REST Client        │ HTTP POST │   FastAPI Ingestor     │
│    (Analytics Dash)     │  Metrics  │    (Time-Series API)   │
└─────────────────────────┘ <=========> └────────────────────────┘
                                                   │
                                                   ▼
                                      ┌────────────────────────┐
                                      │   Statsmodels Engine   │
                                      │ (Grid Search MAE/MAPE) │
                                      └────────────────────────┘
      `,
      bullets: [
        "Implemented custom grid search to identify optimal ARIMA order variables.",
        "Constructed backtesting utility log scripts to record mean absolute percentage errors.",
        "Optimized Pandas routines to automatically align missing timestamp records."
      ]
    },
    {
      num: "04",
      title: "Resume Enhancer",
      sub: "AI Profile Optimizer",
      desc: "An intelligent profile analytics tool scanning resumes to evaluate ATS formatting criteria, calculate keyword relevance scores, and suggest target bullet edits.",
      stack: ["Python", "OpenAI API", "FastAPI", "React.js", "CSS Modules"],
      github: "https://github.com/SachinYadav2446/Resume_Enhancer",
      live: "#",
      role: "Full Stack Developer. Developed OpenAI API prompt workflows, PDF text extractors, and clean card dashboards.",
      architecture: `
┌─────────────────────────┐           ┌────────────────────────┐
│     Resume Uploader     │  PDF File │    FastAPI Parser      │
│  (React.js Dashboard)   │  Stream   │   (PyPDF Ingest Core)  │
└─────────────────────────┘ =========> └────────────────────────┘
            │                                      │
            ▼                                      ▼
┌─────────────────────────┐           ┌────────────────────────┐
│     Score Dashboard     │           │   OpenAI GPT Engine    │
│  (ATS Keyword Grading)  │ <======== │  (Prompt Context API)  │
└─────────────────────────┘ JSON Resp └────────────────────────┘
      `,
      bullets: [
        "Built modular PDF text extraction layers with secure formatting cleanup.",
        "Crafted optimized prompt configurations to retrieve structured JSON ATS feedback.",
        "Designed responsive dashboard cards using CSS Grid and clean layout tokens."
      ]
    },
    {
      num: "05",
      title: "JS Projects Basics",
      sub: "JavaScript Fundamentals",
      desc: "A collection of 10-12 fundamental JavaScript projects including bill splitter, coffee project, counter app, expense tracker, focus on today, guess the number, tic tac toe, todo list, weather app, and calculator.",
      stack: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
      github: "https://github.com/SachinYadav2446/JS-Projects-Basics-",
      live: "#",
      role: "Frontend Developer. Built these projects to master JavaScript fundamentals, DOM manipulation, event handling, and CSS styling.",
      architecture: `
┌─────────────────────────┐           ┌────────────────────────┐
│     Project Gallery     │           │   Individual Projects  │
│   (Index Dashboard)     │  Select   │  (Standalone Apps)     │
└─────────────────────────┘ =========> └────────────────────────┘
            │                                      │
            ▼                                      ▼
┌─────────────────────────┐           ┌────────────────────────┐
│   Project Categories    │           │   Core JS Concepts     │
│ (Games, Tools, Utils)   │           │ (DOM, Events, State)   │
└─────────────────────────┘           └────────────────────────┘
      `,
      bullets: [
        "Developed 10-12 fundamental projects covering games, tools, and utilities.",
        "Mastered DOM manipulation, event handling, and state management patterns.",
        "Implemented responsive designs with modern CSS and semantic HTML."
      ]
    },
    {
      num: "06",
      title: "Interactive Portfolio",
      sub: "3D Cyberpunk Showcase",
      desc: "A highly immersive, interactive portfolio featuring a cyberpunk aesthetic, 3D WebGL scenes, interactive node mapping, and real-time terminal emulation.",
      stack: ["Next.js", "React.js", "Three.js", "WebGL", "Framer Motion", "AWS Amplify"],
      github: "https://github.com/SachinYadav2446/Portfolio",
      live: "https://main.dw5hoa6sugvel.amplifyapp.com/",
      role: "Lead Engineer & Designer. Architected custom WebGL starfields, node connection graphs, and complex Framer Motion animations to simulate a high-tech OS terminal.",
      architecture: `
┌─────────────────────────┐           ┌────────────────────────┐
│    Interactive View     │  3D Maps  │     WebGL Engine       │
│  (Next.js App Router)   │ ========= │ (Three.js / R3F Core)  │
└─────────────────────────┘           └────────────────────────┘
            │                                      │
            ▼                                      ▼
┌─────────────────────────┐           ┌────────────────────────┐
│   Continuous Delivery   │           │   Animation Pipeline   │
│  (AWS Amplify Hosting)  │ <======== │  (Framer Motion API)   │
└─────────────────────────┘           └────────────────────────┘
      `,
      bullets: [
        "Programmed a custom interactive SVG node map to display technical skills as a connected graph.",
        "Designed and implemented a retro-futuristic CRT monitor terminal emulator for displaying projects.",
        "Engineered scroll-linked binary decoding animations for section headings."
      ]
    }
  ];

  React.useEffect(() => {
    const handleSelectProject = (e) => {
      const projId = e.detail;
      const indexMap = {
        "code-crux": 0,
        "demandsight": 1,
        "forecaster": 2,
        "enhancer": 3,
        "js-basics": 4,
        "portfolio": 5
      };
      
      const idx = indexMap[projId];
      if (idx !== undefined) {
        setIndex(idx);
        setActiveProject(projectList[idx]);
        
        const el = document.getElementById("projects");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    
    window.addEventListener("select-project", handleSelectProject);
    return () => window.removeEventListener("select-project", handleSelectProject);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % projectList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + projectList.length) % projectList.length);
  };

  const goToIndex = (targetIdx) => {
    if (targetIdx === index) return;
    setDirection(targetIdx > index ? 1 : -1);
    setIndex(targetIdx);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 28 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 28 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <section id="projects" style={{ background: "linear-gradient(180deg, #0A0A0E 0%, #060608 100%)", borderTop: "1px solid var(--glass-border)", position: "relative", zIndex: 2 }}>
      <div className="grid-bg"></div>
      <div className="container">
        
        <div style={{ marginBottom: "4rem" }}>
          <span className="font-sans-title" style={{ color: "var(--color-red)", fontSize: "0.85rem" }}>02 / SELECTED WORK</span>
          <BinaryHeading text="Creative Engineering" className="text-glow-cream" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", marginTop: "0.5rem" }} />
          <div className="accent-bar"></div>
        </div>

        {/* Expanded Carousel Wrapper */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2.0rem",
          maxWidth: "920px",
          margin: "0 auto 2.5rem auto",
          position: "relative"
        }} className="carousel-wrapper">
          
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--glass-border)",
              color: "var(--color-cream)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              flexShrink: 0
            }}
            className="carousel-arrow clickable"
            title="Previous Project"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Computer Monitor Bezel Chassis wrapping card */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, position: "relative" }}>
            
            {/* Monitor Cabinet Box */}
            <div 
              style={{
                background: "#08080a",
                border: "12px solid #1a1a20",
                borderRadius: "20px 20px 6px 6px",
                boxShadow: "0 30px 70px rgba(0,0,0,0.85), inset 0 0 15px rgba(0,0,0,0.9)",
                position: "relative",
                overflow: "hidden",
                padding: "0.4rem",
                width: "100%"
              }}
              className="monitor-chassis"
            >
              {/* Bezel inner glare rim */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, border: "2px solid rgba(255,255,255,0.03)", borderRadius: "8px", pointerEvents: "none", zIndex: 12 }} />
              
              {/* Screen Reflection Overlay */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0) 45%)",
                pointerEvents: "none",
                zIndex: 10
              }} />

              {/* Viewport content screen */}
              <div 
                style={{ 
                  display: "flex", 
                  overflow: "hidden", 
                  position: "relative", 
                  zIndex: 2, 
                  background: "#040406", 
                  borderRadius: "10px", 
                  border: "1px solid rgba(255,255,255,0.02)",
                  boxShadow: "inset 0 0 35px rgba(0,0,0,0.95), 0 0 15px rgba(230, 57, 70, 0.05)"
                }}
                className="monitor-viewport crt-flicker"
              >
                {/* CRT Scanline and Glare Overlay effects */}
                <div className="crt-scanlines" />
                <div className="crt-glare" />

                {/* Corner Bracket decorations inside the CRT display */}
                <div style={{ position: "absolute", top: "12px", left: "12px", width: "12px", height: "12px", borderTop: "2.5px solid rgba(230, 57, 70, 0.3)", borderLeft: "2.5px solid rgba(230, 57, 70, 0.3)", pointerEvents: "none", zIndex: 15 }} />
                <div style={{ position: "absolute", top: "12px", right: "12px", width: "12px", height: "12px", borderTop: "2.5px solid rgba(230, 57, 70, 0.3)", borderRight: "2.5px solid rgba(230, 57, 70, 0.3)", pointerEvents: "none", zIndex: 15 }} />
                <div style={{ position: "absolute", bottom: "12px", left: "12px", width: "12px", height: "12px", borderBottom: "2.5px solid rgba(230, 57, 70, 0.3)", borderLeft: "2.5px solid rgba(230, 57, 70, 0.3)", pointerEvents: "none", zIndex: 15 }} />
                <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "12px", height: "12px", borderBottom: "2.5px solid rgba(230, 57, 70, 0.3)", borderRight: "2.5px solid rgba(230, 57, 70, 0.3)", pointerEvents: "none", zIndex: 15 }} />

                {/* Terminal status bar at the top */}
                <div style={{
                  position: "absolute",
                  top: "14px",
                  left: "30px",
                  fontFamily: "monospace",
                  fontSize: "0.62rem",
                  color: "rgba(255, 253, 249, 0.15)",
                  letterSpacing: "0.1em",
                  pointerEvents: "none",
                  zIndex: 15,
                  display: "flex",
                  gap: "1rem"
                }}>
                  <span>S-OS WORKSPACE // PORT_0{index + 1}</span>
                  <span>{activeProject ? "INSPECT_MODE: ACTIVE" : "STATUS: SECURE"}</span>
                </div>

                <AnimatePresence initial={false} mode="wait">
                  {!activeProject ? (
                    <motion.div
                      key={`carousel-${index}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        padding: "2.2rem 2.0rem 1.6rem 2.0rem", 
                        boxSizing: "border-box" 
                      }}
                    >
                      <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                          key={index}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <ProjectCard proj={projectList[index]} idx={index} onInspect={setActiveProject} />
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`details-${activeProject.num}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        padding: "2.5rem 2.0rem 1.2rem 2.0rem", 
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}
                    >
                      {/* Scrollable details logs */}
                      <div 
                        style={{
                          flex: 1,
                          overflowY: "auto",
                          paddingRight: "0.5rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "1.0rem",
                          textAlign: "left"
                        }}
                        className="terminal-scroll"
                      >
                        {/* Title and Tech Tag summary */}
                        <div>
                          <span style={{ fontSize: "0.6rem", color: "var(--color-red)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            {activeProject.sub}
                          </span>
                          <h4 style={{ fontSize: "1.15rem", margin: "0.1rem 0 0.4rem 0", color: "var(--color-cream)", fontWeight: 700 }}>
                            {activeProject.title}
                          </h4>
                          <p style={{ fontSize: "0.78rem", color: "var(--color-cream-dim)", lineHeight: "1.4", margin: 0 }}>
                            {activeProject.desc}
                          </p>
                        </div>

                        {/* Tech Stack list */}
                        <div>
                          <span style={{ fontSize: "0.6rem", color: "var(--color-cream-muted)", fontFamily: "monospace", display: "block", marginBottom: "0.25rem" }}>
                            [STACK_INTEGRATION]
                          </span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                            {activeProject.stack.map((tag) => (
                              <span key={tag} style={{ fontSize: "0.58rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", padding: "0.12rem 0.35rem", borderRadius: "3px", color: "var(--color-cream-dim)", fontFamily: "monospace" }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Contributions */}
                        <div>
                          <span style={{ fontSize: "0.6rem", color: "var(--color-cream-muted)", fontFamily: "monospace", display: "block", marginBottom: "0.25rem" }}>
                            [ROLE_CONTRIBUTIONS]
                          </span>
                          <p style={{ fontSize: "0.78rem", color: "var(--color-cream-dim)", margin: "0 0 0.35rem 0", lineHeight: "1.4" }}>
                            {activeProject.role}
                          </p>
                          <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.74rem", color: "var(--color-cream-muted)", lineHeight: "1.4" }}>
                            {activeProject.bullets.map((b, bIdx) => (
                              <li key={bIdx} style={{ listStyleType: "square", marginBottom: "0.2rem" }}>{b}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Architecture Pipeline */}
                        <div>
                          <span style={{ fontSize: "0.6rem", color: "var(--color-cream-muted)", fontFamily: "monospace", display: "block", marginBottom: "0.25rem" }}>
                            [SYSTEM_ARCHITECTURE]
                          </span>
                          <pre style={{
                            background: "rgba(0,0,0,0.4)",
                            border: "1px solid rgba(255,255,255,0.03)",
                            borderRadius: "6px",
                            padding: "0.6rem",
                            fontFamily: "monospace",
                            fontSize: "0.6rem",
                            lineHeight: "1.25",
                            color: "var(--color-cream-dim)",
                            overflowX: "auto",
                            margin: 0,
                            whiteSpace: "pre"
                          }}>
                            {activeProject.architecture}
                          </pre>
                        </div>
                      </div>

                      {/* Footer controls inside screen: back button & links */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "0.6rem",
                        borderTop: "1px solid rgba(255,255,255,0.04)",
                        marginTop: "0.4rem"
                      }}>
                        {/* Terminate Session Button (Back) */}
                        <button
                          onClick={() => setActiveProject(null)}
                          style={{
                            background: "rgba(230, 57, 70, 0.08)",
                            border: "1px solid rgba(230, 57, 70, 0.3)",
                            color: "var(--color-cream)",
                            fontFamily: "monospace",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            padding: "0.35rem 0.7rem",
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            transition: "all 0.3s ease"
                          }}
                          className="exit-terminal-btn clickable"
                        >
                          [ESC] EXIT_TERMINAL
                        </button>

                        {/* Link buttons */}
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          {activeProject.github !== "#" && (
                            <a
                              href={activeProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid var(--glass-border)",
                                color: "var(--color-cream)",
                                fontFamily: "monospace",
                                fontSize: "0.65rem",
                                padding: "0.35rem 0.7rem",
                                borderRadius: "4px",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                transition: "all 0.3s"
                              }}
                              className="terminal-link clickable"
                            >
                              CODE
                            </a>
                          )}
                          {activeProject.live !== "#" && (
                            <a
                              href={activeProject.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: "var(--color-red)",
                                border: "none",
                                color: "var(--color-cream)",
                                fontFamily: "monospace",
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                padding: "0.35rem 0.7rem",
                                borderRadius: "4px",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                transition: "all 0.3s",
                                boxShadow: "0 0 8px var(--color-red-glow)"
                              }}
                              className="terminal-link clickable"
                            >
                              DEMO
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Bezel Controls Toolbar */}
              <div style={{
                marginTop: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.2rem 0.8rem 0 0.8rem",
                borderTop: "1px solid rgba(255,255,255,0.02)"
              }}>
                <span style={{ fontSize: "0.55rem", fontFamily: "monospace", color: "rgba(255,255,255,0.12)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  S-OS v2.0 // TERMINAL_DISPLAY
                </span>
                
                {/* Right edge LED & Indicators */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#333" }}></span>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#333" }}></span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span style={{ fontSize: "0.5rem", fontFamily: "monospace", color: "rgba(255,255,255,0.18)" }}>ACTIVE</span>
                    <span className="blink-led" style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--color-red)",
                      boxShadow: "0 0 8px var(--color-red-glow-strong)"
                    }} />
                  </div>
                </div>
              </div>

            </div>

            {/* Monitor neck stand */}
            <div style={{
              width: "90px",
              height: "35px",
              background: "linear-gradient(90deg, #0e0e12 0%, #202028 50%, #0e0e12 100%)",
              margin: "0 auto",
              boxShadow: "0 10px 15px rgba(0,0,0,0.5), inset 0 0 8px rgba(0,0,0,0.8)",
              borderLeft: "1px solid rgba(255,255,255,0.03)",
              borderRight: "1px solid rgba(255,255,255,0.03)",
              position: "relative",
              zIndex: 1
            }} />

            {/* Monitor base support plate */}
            <div style={{
              width: "280px",
              height: "12px",
              background: "linear-gradient(90deg, #050507 0%, #1c1c24 50%, #050507 100%)",
              borderRadius: "6px 6px 0 0",
              margin: "0 auto",
              boxShadow: "0 15px 30px rgba(0,0,0,0.7), 0 0 20px rgba(230, 57, 70, 0.2)",
              borderBottom: "3px solid var(--color-red)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              position: "relative",
              zIndex: 1
            }} />

          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--glass-border)",
              color: "var(--color-cream)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              flexShrink: 0
            }}
            className="carousel-arrow clickable"
            title="Next Project"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

        </div>

        {/* Carousel Indicators Track */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}>
          
          <span style={{ fontSize: "0.8rem", fontFamily: "monospace", letterSpacing: "0.15em", color: "var(--color-cream-muted)", fontWeight: 700 }}>
            0{index + 1} <span style={{ color: "var(--color-red)" }}>/</span> 0{projectList.length}
          </span>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            {projectList.map((_, dIdx) => (
              <button
                key={dIdx}
                onClick={() => goToIndex(dIdx)}
                style={{
                  width: index === dIdx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: index === dIdx ? "var(--color-red)" : "rgba(255,255,255,0.1)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: index === dIdx ? "0 0 10px var(--color-red-glow)" : "none"
                }}
                className="carousel-dot clickable"
              />
            ))}
          </div>

        </div>

      </div>

      <style jsx global>{`
        .proj-icon-link:hover {
          color: var(--color-red) !important;
          transform: translateY(-2px);
          filter: drop-shadow(0 0 5px var(--color-red-glow-strong));
        }
        .inspect-btn:hover {
          background: var(--color-red) !important;
          border-color: var(--color-red) !important;
          color: var(--color-cream) !important;
          box-shadow: 0 0 12px var(--color-red-glow);
        }
        .carousel-arrow:hover {
          border-color: var(--color-red) !important;
          color: var(--color-red) !important;
          box-shadow: 0 0 10px var(--color-red-glow);
        }
        .blink-led {
          animation: ledBlink 1.4s infinite alternate;
        }
        @keyframes ledBlink {
          from { opacity: 0.35; filter: brightness(0.6); }
          to { opacity: 1; filter: brightness(1.2) drop-shadow(0 0 4px var(--color-red)); }
        }
        .monitor-viewport {
          height: 440px;
        }
        .crt-scanlines {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                      linear-gradient(90deg, rgba(230, 57, 70, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04));
          background-size: 100% 4px, 6px 100%;
          z-index: 10;
          pointer-events: none;
          opacity: 0.7;
        }
        .crt-glare {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 50% 0%, rgba(255, 253, 249, 0.08) 0%, rgba(255, 253, 249, 0) 70%),
                      radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 40%);
          z-index: 11;
          pointer-events: none;
        }
        .crt-flicker {
          animation: crtFlicker 0.15s infinite;
        }
        @keyframes crtFlicker {
          0% { opacity: 0.99; filter: contrast(1) brightness(1); }
          50% { opacity: 1; filter: contrast(1.015) brightness(1.005); }
          100% { opacity: 0.99; filter: contrast(1) brightness(1); }
        }
        .terminal-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: var(--color-red);
          border-radius: 2px;
        }
        .exit-terminal-btn:hover {
          background: var(--color-red) !important;
          border-color: var(--color-red) !important;
          color: var(--color-cream) !important;
          box-shadow: 0 0 10px var(--color-red-glow-strong);
        }
        .terminal-link:hover {
          border-color: var(--color-red) !important;
          color: var(--color-red) !important;
          box-shadow: 0 0 10px var(--color-red-glow);
        }
        @media (max-width: 900px) {
          .carousel-wrapper {
            gap: 1.0rem !important;
          }
          .monitor-chassis {
            border: 8px solid #1a1a20 !important;
          }
        }
        @media (max-width: 640px) {
          .monitor-viewport {
            height: 480px !important;
          }
        }
        @media (max-width: 580px) {
          .carousel-wrapper {
            gap: 0.5rem !important;
          }
          .carousel-arrow {
            width: 36px !important;
            height: 36px !important;
          }
          .monitor-chassis {
            border: 6px solid #1a1a20 !important;
            padding: 0.2rem !important;
          }
        }
        @media (max-width: 480px) {
          .monitor-viewport {
            height: 520px !important;
          }
        }
      `}</style>
    </section>
  );
}
