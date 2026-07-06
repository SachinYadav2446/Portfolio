"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Mail, Terminal, Cpu, Sparkles, Orbit, Volume2, VolumeX, Music } from "lucide-react";

// Elegant magnetic wrapper for interactive buttons and tag badges
function Magnetic({ children, distance = 0.35 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * distance;
    const y = (clientY - centerY) * distance;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}

// Bouncy spring character component
function InteractiveLetter({ char, index }) {
  return (
    <motion.span
      style={{
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: char === " " ? "pre" : "normal"
      }}
      whileHover={{
        y: -18,
        scale: 1.25,
        color: "var(--color-red)",
        textShadow: "0 0 25px var(--color-red-bright)"
      }}
      transition={{ type: "spring", stiffness: 450, damping: 9 }}
    >
      {char}
    </motion.span>
  );
}

// 3D Rotational Word Slider for sub-headlines
function RotatingSubtitle() {
  const titles = [
    "Full-Stack Developer",
    "Machine Learning Engineer",
    "Systems & Backend Architect",
    "DSA & Algorithms Specialist",
    "2nd Year CS Student"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  if (!titles[index]) return null;

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      background: "linear-gradient(135deg, rgba(230, 57, 70, 0.05), rgba(6, 6, 8, 0.4))",
      border: "1px solid rgba(230, 57, 70, 0.22)",
      borderRadius: "30px",
      padding: "0.5rem 1.1rem",
      backdropFilter: "blur(20px)",
      boxShadow: "inset 0 0 12px rgba(230, 57, 70, 0.04), 0 10px 25px rgba(0, 0, 0, 0.35)",
      height: "auto",
      minHeight: "44px",
      perspective: "1000px",
      alignSelf: "flex-start",
      margin: "0.8rem 0",
      maxWidth: "fit-content",
      flexWrap: "nowrap"
    }}>
      {/* Pulsing micro-beacon */}
      <span style={{
        display: "inline-block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "var(--color-red)",
        boxShadow: "0 0 10px var(--color-red-bright)",
        animation: "pulse-glowing 2s infinite ease-in-out",
        flexShrink: 0
      }} />

      <span style={{
        fontFamily: "monospace",
        fontSize: "0.68rem",
        fontWeight: 700,
        color: "rgba(255, 253, 249, 0.45)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        whiteSpace: "nowrap",
        flexShrink: 0
      }}>
        Specializing in
      </span>

      <span style={{
        height: "14px",
        width: "1.5px",
        background: "rgba(255, 253, 249, 0.15)",
        display: "inline-block",
        flexShrink: 0
      }} />

      <div style={{ position: "relative", height: "100%", minWidth: "200px", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ rotateX: -90, opacity: 0, y: 12 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: 90, opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              fontSize: "0.85rem",
              fontWeight: 800,
              color: "var(--color-cream)",
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.08)"
            }}
          >
            {titles[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Interactive SVG radial skill dial gauge with scroll-triggered animation
function SkillDial({ label, percentage, delay }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const color = "var(--color-red)";
  const [isVisible, setIsVisible] = useState(false);
  const dialRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (dialRef.current) observer.observe(dialRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={dialRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", flex: 1 }}>
      <div style={{ position: "relative", width: "84px", height: "84px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* HUD Decorative Outer Dashed Ring */}
        <svg width="84" height="84" style={{ position: "absolute", top: 0, left: 0 }} className="hud-outer-spin">
          <circle
            cx="42"
            cy="42"
            r="38"
            fill="transparent"
            stroke="rgba(230, 57, 70, 0.15)"
            strokeWidth="0.8"
            strokeDasharray="4, 4"
          />
        </svg>
        
        <svg width="84" height="84" style={{ transform: "rotate(-90deg)", position: "relative", zIndex: 2 }}>
          {/* Inner circle track */}
          <circle
            cx="42"
            cy="42"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.02)"
            strokeWidth="4.5"
          />
          {/* Animated active circle - triggers only when visible */}
          <motion.circle
            cx="42"
            cy="42"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="4.5"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isVisible ? strokeDashoffset : circumference }}
            transition={{ duration: 1.8, delay: isVisible ? delay : 0, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 5px var(--color-red-bright))` }}
          />
        </svg>
        {/* Percentage text */}
        <div style={{ position: "absolute", fontSize: "0.78rem", fontWeight: "800", fontFamily: "monospace", color: "var(--color-cream)", textShadow: "0 0 5px rgba(255,255,255,0.2)" }}>
          {isVisible ? `${percentage}%` : `0%`}
        </div>
      </div>
      <span style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-cream-muted)", fontWeight: "700" }}>{label}</span>
    </div>
  );
}

// System log console revealing diagnostics line-by-line
function TypewriterConsole() {
  const [lines, setLines] = useState([]);
  const logs = useMemo(() => [
    "SYS_OK: SYSTEM_CORE_ONLINE",
    "SACHIN_YADAV: FULL_STACK_&_ML_ENGINEER",
    "TECH: PYTHON_GO_JS_CPP_SQL",
    "DSA: DATA_STRUCTURES_ACTIVE",
    "SYS_STATUS: SECURE_RUNNING"
  ], []);

  useEffect(() => {
    setLines([]);
    let index = 0;
    const timer = setInterval(() => {
      if (index < logs.length) {
        setLines((prev) => [...prev, logs[index]]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 450);

    return () => clearInterval(timer);
  }, [logs]);

  return (
    <div 
      style={{ 
        background: "rgba(0,0,0,0.5)", 
        padding: "0.8rem 1.0rem", 
        borderRadius: "6px", 
        fontFamily: "monospace", 
        fontSize: "0.7rem", 
        lineHeight: 1.5, 
        color: "var(--color-cream-dim)",
        border: "1px solid rgba(255,255,255,0.04)",
        minHeight: "120px",
        maxHeight: "120px",
        overflow: "hidden"
      }}
    >
      {lines.map((line, idx) => (
        <div key={idx}>
          <span style={{ color: "var(--color-red)" }}>&gt; </span>
          {line}
        </div>
      ))}
      <div>
        <span style={{ color: "var(--color-red)" }}>&gt; </span>
        <span className="blink-cursor">_</span>
      </div>
    </div>
  );
}

export default function CreativeHero({ audio }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    setMousePos({ x, y });
    
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setLightPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const name1 = "SACHIN".split("");
  const name2 = "YADAV".split("");

  const techTags = [
    "Python",
    "Go",
    "Java",
    "Node.js",
    "Express",
    "MongoDB",
    "FastAPI",
    "SQL / DBMS",
    "DSA",
    "ML / GenAI",
    "React / Next",
    "System Design"
  ];

  return (
    <section 
      ref={sectionRef}
      id="home" 
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "6rem",
        background: "radial-gradient(circle at 75% 25%, #150608 0%, #060608 65%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="red-grid-bg"></div>
      <div className="vignette-overlay"></div>
      <div 
        className="mouse-light"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          opacity: 1
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        {/* Status indicator at top of hero */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          marginBottom: "2rem",
          padding: "0.6rem 1rem",
          background: "rgba(230, 57, 70, 0.08)",
          border: "1px solid rgba(230, 57, 70, 0.2)",
          borderRadius: "30px",
          alignSelf: "flex-start",
          width: "fit-content"
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--color-red)",
            boxShadow: "0 0 8px var(--color-red-glow)",
            animation: "pulse-glowing 2s infinite"
          }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem", alignItems: "center" }} className="hero-grid">
          
          {/* LEFT: Typographic Name Cluster */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", transformStyle: "preserve-3d" }}>
            
            {/* Holographic outline layers drifting with mouse parallax */}
            <div style={{ position: "relative", transformStyle: "preserve-3d" }}>
              {/* Back Red Outline Layer */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, -20px)`,
                  opacity: 0.16,
                  color: "transparent",
                  WebkitTextStroke: "2px var(--color-red)",
                  pointerEvents: "none",
                  fontWeight: 900,
                  lineHeight: "0.92",
                  fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap"
                }}
              >
                SACHIN <br /> YADAV
              </div>

              {/* Back Cream Outline Layer */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, -40px)`,
                  opacity: 0.08,
                  color: "transparent",
                  WebkitTextStroke: "0.8px var(--color-cream)",
                  pointerEvents: "none",
                  fontWeight: 900,
                  lineHeight: "0.92",
                  fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap"
                }}
              >
                SACHIN <br /> YADAV
              </div>

              {/* Main solid text layer with hover bounces */}
              <h1
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                  lineHeight: "0.92",
                  fontWeight: 900,
                  margin: 0,
                  position: "relative",
                  zIndex: 5,
                  transformStyle: "preserve-3d",
                  color: "var(--color-cream)"
                }}
              >
                <span style={{ display: "block" }}>
                  {name1.map((char, idx) => (
                    <InteractiveLetter key={`n1-${idx}`} char={char} index={idx} />
                  ))}
                </span>
                <span style={{ display: "block", color: "var(--color-red)", fontFamily: "var(--font-serif)" }}>
                  {name2.map((char, idx) => (
                    <InteractiveLetter key={`n2-${idx}`} char={char} index={idx + name1.length} />
                  ))}
                </span>
              </h1>
            </div>

            {/* Narrative description */}
            <p style={{ color: "var(--color-cream-muted)", fontSize: "1.02rem", maxWidth: "480px", margin: "0.5rem 0 1.0rem 0" }}>
              Designing robust backend pipelines, machine learning structures, and high-performance web environments. Merging systems engineering principles with clean architectures and interactive experiences.
            </p>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "1.0rem", flexWrap: "wrap" }}>
              <Magnetic distance={0.15}>
                <a 
                  href="#projects" 
                  className="btn-primary clickable"
                  onMouseEnter={() => audio?.playHover()}
                  onClick={() => audio?.playClick()}
                >
                  Inspect Works <ArrowRight size={16} />
                </a>
              </Magnetic>
              <Magnetic distance={0.15}>
                <a 
                  href="#contact" 
                  className="btn-secondary clickable"
                  onMouseEnter={() => audio?.playHover()}
                  onClick={() => audio?.playClick()}
                >
                  Establish Signal <Mail size={16} />
                </a>
              </Magnetic>
            </div>

          </div>

          {/* RIGHT: Interactive Cyber Dashboard Console */}
          <div 
            className="glass-card" 
            style={{ 
              padding: "2.2rem", 
              borderRadius: "16px", 
              border: "1.5px solid rgba(230, 57, 70, 0.3)", 
              borderTop: "4px solid var(--color-red)",
              background: "linear-gradient(rgba(230, 57, 70, 0.012) 1px, transparent 1px) 0 0 / 16px 16px, linear-gradient(90deg, rgba(230, 57, 70, 0.012) 1px, transparent 1px) 0 0 / 16px 16px, linear-gradient(135deg, rgba(13, 13, 17, 0.95) 0%, rgba(6, 6, 8, 0.98) 100%)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.85), 0 0 25px rgba(230, 57, 70, 0.12)",
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
              position: "relative"
            }}
          >
            {/* Header tab badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <Terminal size={14} color="var(--color-red)" />
                <span style={{ fontSize: "0.7rem", fontFamily: "monospace", letterSpacing: "0.15em", color: "var(--color-cream-dim)" }}>SACHIN_DEV: CONSOLE_DASHBOARD</span>
              </div>
              <div style={{ display: "flex", gap: "0.3rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#444" }}></span>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#444" }}></span>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-red)" }}></span>
              </div>
            </div>

            {/* Hardware Telemetry parameters */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.56rem", fontFamily: "monospace", color: "rgba(255, 253, 249, 0.38)", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "0.4rem" }}>
              <span>HW_TEMP: 39°C</span>
              <span>VOLTAGE: 1.22V</span>
              <span>CPU_LOAD: 24%</span>
            </div>

            {/* 1. Typewriter Console */}
            <TypewriterConsole />

            {/* Audio Telemetry System */}
            <div 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                gap: "0.8rem", 
                background: "rgba(0,0,0,0.5)", 
                border: "1px solid rgba(230, 57, 70, 0.2)", 
                padding: "0.5rem 0.8rem", 
                borderRadius: "6px", 
                fontFamily: "monospace", 
                fontSize: "0.65rem",
                color: "var(--color-cream-dim)"
              }}
              onMouseEnter={() => audio?.playHover()}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Music size={12} color={audio?.isActive ? "var(--color-red)" : "rgba(255,255,255,0.2)"} style={{ animation: audio?.isActive ? "pulse-glowing 2s infinite" : "none" }} />
                <span>AUDIO_SYS:</span>
                <span style={{ color: audio?.isActive ? "var(--color-red)" : "rgba(255,255,255,0.3)", fontWeight: "bold" }}>
                  {audio?.isActive ? "ACTIVE_DRIVE" : "OFFLINE"}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  {audio?.volume === 0 ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05" 
                    value={audio?.volume || 0} 
                    onChange={(e) => audio?.setVolume(parseFloat(e.target.value))}
                    disabled={!audio?.isActive}
                    style={{ 
                      width: "50px", 
                      height: "3px", 
                      accentColor: "var(--color-red)", 
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      outline: "none",
                      cursor: audio?.isActive ? "pointer" : "not-allowed"
                    }}
                    title="Volume slider"
                  />
                  <span>{Math.round((audio?.volume || 0) * 100)}%</span>
                </div>

                <button 
                  onClick={() => audio?.toggleAudio()}
                  style={{
                    background: audio?.isActive ? "rgba(230, 57, 70, 0.15)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${audio?.isActive ? "var(--color-red)" : "rgba(255,255,255,0.15)"}`,
                    color: audio?.isActive ? "var(--color-cream)" : "var(--color-cream-muted)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.55rem",
                    fontFamily: "monospace",
                    transition: "all 0.3s ease",
                    boxShadow: audio?.isActive ? "0 0 8px rgba(230, 57, 70, 0.4)" : "none"
                  }}
                  onMouseEnter={() => audio?.playHover()}
                >
                  {audio?.isActive ? "PAUSE" : "ENGAGE"}
                </button>
              </div>
            </div>

            {/* 2. SVG Skill Radial Dial Gauges */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1.0rem" }}>
              <SkillDial label="Full-Stack" percentage={92} delay={0.2} />
              <SkillDial label="ML & Data" percentage={85} delay={0.4} />
              <SkillDial label="Systems/DSA" percentage={88} delay={0.6} />
            </div>

            {/* 3. Magnetic Stack Badge tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1.2rem" }}>
              {techTags.map((tag) => (
                <Magnetic key={tag} distance={0.3}>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      background: "rgba(230, 57, 70, 0.02)",
                      border: "1px solid rgba(230, 57, 70, 0.18)",
                      color: "var(--color-cream-dim)",
                      padding: "0.35rem 0.7rem",
                      borderRadius: "4px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontFamily: "monospace",
                      cursor: "default",
                      transition: "all 0.3s ease"
                    }}
                    className="tag-badge clickable"
                  >
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-red)", boxShadow: "0 0 6px var(--color-red-bright)" }} />
                    {tag}
                  </span>
                </Magnetic>
              ))}
            </div>

          </div>

        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
        .tag-badge:hover {
          border-color: var(--color-red) !important;
          color: var(--color-cream) !important;
          box-shadow: 0 0 12px var(--color-red-glow-strong);
        }
        .blink-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to { color: transparent }
          50% { color: var(--color-red) }
        }
        @keyframes spinOuter {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hud-outer-spin {
          animation: spinOuter 12s linear infinite;
        }
        @keyframes pulse-glowing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.4); opacity: 1; filter: brightness(1.2); }
        }
      `}</style>
    </section>
  );
}
