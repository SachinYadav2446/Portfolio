"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Mail, MapPin, Send, MessageSquare, Link, ExternalLink, Code } from "lucide-react";
import BinaryHeading from "./BinaryHeading";

// Elegant magnetic wrapper for buttons
function Magnetic({ children, distance = 0.25 }) {
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
      transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}

// Reusable 3D tilt container
function TiltPanel({ children, style, className, maxTilt = 5 }) {
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
      <div style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d", height: "100%", width: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Contact({ audio }) {

  return (
    <section id="contact" style={{ background: "#060608", borderTop: "1px solid var(--glass-border)", position: "relative", zIndex: 2 }}>
      <div className="grid-bg"></div>
      <div className="container">
        
        {/* Contact Header */}
        <div style={{ marginBottom: "5rem" }}>
          <span className="font-sans-title" style={{ color: "var(--color-red)", fontSize: "0.85rem" }}>04 / REACH OUT</span>
          <BinaryHeading text="Let's Build Something Cool" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", marginTop: "0.5rem" }} className="text-glow-cream" />
          <div className="accent-bar"></div>
        </div>

        {/* Section Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem" }} className="contact-grid">
          
          {/* Info Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1.75rem", fontWeight: "400", marginBottom: "1rem" }}>
                Ready to collaborate?
              </h3>
              <p style={{ color: "var(--color-cream-muted)", lineHeight: "1.6" }}>
                I'm actively seeking software engineering internships and open-source collaborations. Whether it's full-stack web apps, ML pipelines, or system design — if you have an exciting idea, let's connect and build something impactful.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  background: "var(--color-black-elevated)",
                  border: "1px solid var(--glass-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Mail size={18} color="var(--color-red)" />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-cream-muted)", marginBottom: "0.45rem" }}>Email Direct</span>
                  <Magnetic distance={0.35}>
                    <a 
                      href="mailto:yadavsachin2446@gmail.com" 
                      style={{ display: "block", color: "var(--color-cream)", textDecoration: "none", fontSize: "1.05rem", fontWeight: "600", transition: "var(--transition-smooth)" }} 
                      className="info-link clickable"
                      onMouseEnter={() => audio?.playHover()}
                      onClick={() => audio?.playClick()}
                    >
                      yadavsachin2446@gmail.com
                    </a>
                  </Magnetic>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  background: "var(--color-black-elevated)",
                  border: "1px solid var(--glass-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <MapPin size={18} color="var(--color-red)" />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-cream-muted)", marginBottom: "0.45rem" }}>Current Location</span>
                  <span style={{ display: "block", color: "var(--color-cream)", fontSize: "1.05rem", fontWeight: "600" }}>
                    Bangalore, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Connect Card */}
          <TiltPanel className="glass-card clickable" maxTilt={3}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
              <Mail size={18} color="var(--color-red)" />
              <h3 style={{ fontSize: "1.25rem", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Let's Connect</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <p style={{ color: "var(--color-cream-dim)", lineHeight: "1.6" }}>
                  Have a project in mind or want to collaborate? I'm always open to discussing new opportunities and ideas. Reach out directly via email or connect with me on social platforms.
                </p>
              </div>

              <div style={{
                padding: "1.5rem",
                background: "rgba(230, 57, 70, 0.05)",
                border: "1px solid rgba(230, 57, 70, 0.1)",
                borderRadius: "12px"
              }}>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-cream-muted)", marginBottom: "1rem", fontWeight: 600 }}>
                  Quick Links
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a
                    href="https://github.com/SachinYadav2446"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-cream)", textDecoration: "none", fontSize: "0.95rem", transition: "var(--transition-smooth)" }}
                    className="info-link clickable"
                    onMouseEnter={() => audio?.playHover()}
                    onClick={() => audio?.playClick()}
                  >
                    <Link size={16} color="var(--color-red)" />
                    GitHub Profile
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sachin-yadav-54646a322/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-cream)", textDecoration: "none", fontSize: "0.95rem", transition: "var(--transition-smooth)" }}
                    className="info-link clickable"
                    onMouseEnter={() => audio?.playHover()}
                    onClick={() => audio?.playClick()}
                  >
                    <ExternalLink size={16} color="var(--color-red)" />
                    LinkedIn Profile
                  </a>
                  <a
                    href="https://leetcode.com/u/SY_45/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-cream)", textDecoration: "none", fontSize: "0.95rem", transition: "var(--transition-smooth)" }}
                    className="info-link clickable"
                    onMouseEnter={() => audio?.playHover()}
                    onClick={() => audio?.playClick()}
                  >
                    <Code size={16} color="var(--color-red)" />
                    LeetCode Profile
                  </a>
                </div>
              </div>
            </div>
          </TiltPanel>

        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .footer-copyright {
            margin-top: 3rem !important;
          }
        }
        .form-input:focus {
          border-color: var(--color-red) !important;
          box-shadow: 0 0 12px var(--color-red-glow);
          background-color: var(--color-black) !important;
        }
        .info-link:hover {
          color: var(--color-red) !important;
          filter: drop-shadow(0 0 5px var(--color-red-glow-strong));
        }
      `}</style>
    </section>
  );
}
