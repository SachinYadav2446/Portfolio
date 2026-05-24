"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Award, Calendar, ArrowRight } from "lucide-react";

const milestones = [
  {
    id: 0,
    title: "Programming Fundamentals",
    subtitle: "Phase 1",
    desc: "Started with C programming, learned basic algorithms, problem-solving techniques, and fundamental computer science concepts.",
    color: "#e63946"
  },
  {
    id: 1,
    title: "OOP & Data Structures",
    subtitle: "Phase 2",
    desc: "Mastered Object-Oriented Programming in C++, learned inheritance, polymorphism, and STL containers. Solved 200+ DSA problems.",
    color: "#e63946"
  },
  {
    id: 2,
    title: "Advanced Algorithms",
    subtitle: "Phase 3",
    desc: "Deepened knowledge of graphs, trees, heaps, and dynamic programming. Solved 300+ algorithmic problems on competitive platforms.",
    color: "#e63946"
  },
  {
    id: 3,
    title: "Web Development Basics",
    subtitle: "Phase 4",
    desc: "Learned HTML5, CSS3, JavaScript fundamentals, and built responsive web pages with modern CSS techniques.",
    color: "#2a9d8f"
  },
  {
    id: 4,
    title: "Backend Development",
    subtitle: "Phase 5",
    desc: "Built REST APIs with Node.js and Express, learned database design with MongoDB and PostgreSQL.",
    color: "#2a9d8f"
  },
  {
    id: 5,
    title: "Machine Learning",
    subtitle: "Phase 6",
    desc: "Studied ML algorithms, built predictive models using NumPy, Pandas, Scikit-learn, and visualized data with Matplotlib.",
    color: "#2a9d8f"
  },
  {
    id: 6,
    title: "FastAPI & Data Pipelines",
    subtitle: "Phase 7",
    desc: "Built high-performance async APIs with FastAPI, engineered data ingestion pipelines, and worked with time-series forecasting.",
    color: "#e9c46a"
  },
  {
    id: 7,
    title: "Real-Time Systems",
    subtitle: "Phase 8",
    desc: "Built real-time collaborative apps with Socket.IO, studied system design patterns, and learned distributed systems concepts.",
    color: "#e9c46a"
  },
  {
    id: 8,
    title: "WebGL & Graphics",
    subtitle: "Current",
    desc: "Specializing in interactive graphics with WebGL, Three.js, custom shaders, and 3D web experiences.",
    color: "#e9c46a"
  },
  {
    id: 9,
    title: "DevOps & Cloud",
    subtitle: "In Progress",
    desc: "Learning Docker containerization, AWS services (Lambda, RDS, Amplify), CI/CD pipelines, and cloud architecture.",
    color: "#264653"
  }
];

export default function AcademicJourney() {
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
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

  return (
    <section 
      ref={sectionRef}
      id="academic-journey" 
      style={{ 
        background: "#0A0A0E", 
        borderTop: "1px solid var(--glass-border)", 
        position: "relative", 
        zIndex: 2,
        padding: "4rem 0"
      }}
    >
      <div className="red-grid-bg"></div>
      <div 
        className="mouse-light"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          opacity: 1
        }}
      />

      {/* Section Header */}
      <div className="container" style={{ marginBottom: "4rem", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Calendar size={18} color="var(--color-red)" />
          <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.05em" }}>CS Journey</h3>
        </div>
      </div>

      {/* Timeline */}
      <div className="container" style={{ position: "relative", maxWidth: "900px" }}>
        {/* Vertical Line */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "0",
          bottom: "0",
          width: "2px",
          background: "linear-gradient(180deg, var(--color-red) 0%, var(--color-red) 30%, #2a9d8f 30%, #2a9d8f 60%, #e9c46a 60%, #e9c46a 90%, #264653 90%, #264653 100%)",
          transform: "translateX(-50%)",
          zIndex: 1
        }} />

        {/* Benchmarks */}
        <div style={{
          position: "relative",
          zIndex: 2
        }}>
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "2rem",
                position: "relative",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse"
              }}
            >
              {/* Content */}
              <div style={{
                flex: 1,
                textAlign: index % 2 === 0 ? "right" : "left",
                padding: index % 2 === 0 ? "0 4rem 0 0" : "0 0 0 4rem"
              }}>
                <div style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "1.25rem",
                  backdropFilter: "blur(10px)"
                }}>
                  <div style={{
                    color: milestone.color,
                    fontSize: "0.7rem",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "0.4rem"
                  }}>
                    {milestone.subtitle}
                  </div>
                  <h4 style={{
                    fontSize: "1rem",
                    color: "var(--color-cream)",
                    marginBottom: "0.5rem",
                    fontFamily: "var(--font-sans)"
                  }}>
                    {milestone.title}
                  </h4>
                  <p style={{
                    fontSize: "0.8rem",
                    color: "var(--color-cream-dim)",
                    lineHeight: "1.5",
                    marginBottom: "0.75rem"
                  }}>
                    {milestone.desc}
                  </p>
                </div>
              </div>

              {/* Benchmark Point - centered on line */}
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: milestone.color,
                boxShadow: `0 0 15px ${milestone.color}66`,
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3
              }}>
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: `${milestone.color}33`,
                  animation: "pulse 2s infinite"
                }} />
              </div>

              {/* Empty div for spacing */}
              <div style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        /* Hide scrollbar for cleaner look */
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(230, 57, 70, 0.3);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(230, 57, 70, 0.5);
        }

        @media (max-width: 900px) {
          div[style*="display: flex"] {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          h2 {
            font-size: 1.4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
