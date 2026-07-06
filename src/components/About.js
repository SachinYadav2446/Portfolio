"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Cpu, Layout, Award } from "lucide-react";
import BinaryHeading from "./BinaryHeading";
import AcademicJourney from "./AcademicJourney";

// Reusable elegant 3D tilt component for About section panels
function TiltPanel({ children, style, className, maxTilt = 8 }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [0, 1], [-maxTilt, maxTilt]);

  const springX = useSpring(rotateX, { stiffness: 120, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 22 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    x.set((e.clientX - rect.left) / width);
    y.set((e.clientY - rect.top) / height);

    // Glare effects if applicable
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d", height: "100%", width: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function About({ audio }) {
  const skills = [
    { category: "Backend & Languages", items: ["Python", "Golang", "Java", "Node.js", "Express", "FastAPI", "C++ / OOP"] },
    { category: "Machine Learning & Data", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "PyTorch", "Supervised ML", "Unsupervised ML", "GenAI"] },
    { category: "Architecture & Design", items: ["DSA", "High-Level Design (HLD)", "Low-Level Design (LLD)", "Computer Architecture", "DBMS", "REST APIs"] },
    { category: "Databases & Cloud", items: ["SQL (PostgreSQL)", "MongoDB", "AWS RDS", "Docker", "AWS Lambda", "AWS Amplify", "Vercel", "Render", "Git / GitHub"] },
    { category: "Frontend Core", items: ["React.js", "Next.js", "WebGL / Three.js", "Framer Motion", "Redux Toolkit", "CSS / Tailwind"] }
  ];

  return (
    <section id="about" style={{ background: "#0A0A0E", borderTop: "1px solid var(--glass-border)", position: "relative", zIndex: 2 }}>
      <div className="grid-bg"></div>
      <div className="container">
        
        {/* About Header */}
        <div style={{ marginBottom: "5rem" }}>
          <span className="font-sans-title" style={{ color: "var(--color-red)", fontSize: "0.85rem" }}>01 / ABOUT ME</span>
          <BinaryHeading text="The Creative Mindset" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", marginTop: "0.5rem" }} className="text-glow-cream" />
          <div className="accent-bar"></div>
        </div>

        {/* Section Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem", marginBottom: "5rem" }} className="about-grid">
          
          {/* Narrative Story */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1.8rem", fontWeight: "400" }}>
              Hey, I'm <span style={{ fontWeight: 700, color: "var(--color-red)" }}>Sachin Yadav</span>.
            </h3>
            <p>
              I am a 2nd-year Computer Science student specializing in full-stack engineering, machine learning pipelines, and backend systems design. I bridge the gap between rigorous systems architecture and high-performance interactive interfaces.
            </p>
            <p style={{ color: "var(--color-cream-muted)" }}>
              Instead of sticking to standard structures, I develop interconnected applications. I write low-latency real-time collaboration servers, build machine learning grids (supervised/unsupervised models using NumPy, Pandas, Matplotlib, and Seaborn), design database engines (SQL and MongoDB), and implement robust system schemas (LLD & HLD) in Java, Python, and Go.
            </p>

            {/* Micro Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }} className="mini-cards">
              <TiltPanel 
                className="glass-panel clickable" 
                style={{ padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--glass-border)" }} 
                maxTilt={10}
                onMouseEnter={() => audio?.playHover()}
                onClick={() => audio?.playClick()}
              >
                <Cpu size={24} color="var(--color-red)" style={{ marginBottom: "0.5rem" }} />
                <h4 style={{ fontSize: "1.05rem", fontFamily: "var(--font-sans)", marginBottom: "0.25rem" }}>100% Custom Design</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--color-cream-muted)", margin: 0 }}>Written from scratch with pure, optimized CSS styling.</p>
              </TiltPanel>
              <TiltPanel 
                className="glass-panel clickable" 
                style={{ padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--glass-border)" }} 
                maxTilt={10}
                onMouseEnter={() => audio?.playHover()}
                onClick={() => audio?.playClick()}
              >
                <Award size={24} color="var(--color-red)" style={{ marginBottom: "0.5rem" }} />
                <h4 style={{ fontSize: "1.05rem", fontFamily: "var(--font-sans)", marginBottom: "0.25rem" }}>3D Integration</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--color-cream-muted)", margin: 0 }}>Fusing GPU-accelerated WebGL directly into UI states.</p>
              </TiltPanel>
            </div>
          </div>

          {/* Skill Blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="skills-pane">
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--color-cream)" }}>
              Core Technical Stack
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {skills.map((skillGroup, index) => (
                <div key={index} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)", paddingBottom: "1.2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
                    <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "var(--color-red)", letterSpacing: "0.08em" }}>[0{index + 1}]</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "monospace", color: "var(--color-cream)" }}>
                      {skillGroup.category}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: "0.72rem",
                          background: "rgba(230, 57, 70, 0.02)",
                          border: "1px solid rgba(230, 57, 70, 0.18)",
                          color: "var(--color-cream-dim)",
                          padding: "0.28rem 0.65rem",
                          borderRadius: "4px",
                          fontFamily: "monospace",
                          transition: "all 0.3s ease"
                        }}
                        className="skill-tag clickable"
                        onMouseEnter={() => audio?.playHover()}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Academic Journey - Full Page Scroll */}
        <AcademicJourney audio={audio} />

      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 500px) {
          .mini-cards {
            grid-template-columns: 1fr !important;
          }
        }
        .skill-tag:hover {
          border-color: var(--color-red) !important;
          color: var(--color-cream) !important;
          background: rgba(230, 57, 70, 0.15) !important;
          box-shadow: 0 0 12px var(--color-red-glow-strong);
          transform: translateY(-1px);
        }
        .timeline-btn:hover h4 {
          color: var(--color-cream) !important;
        }
      `}</style>
    </section>
  );
}
