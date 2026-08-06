"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ChevronRight, Hash } from "lucide-react";
import AcademicJourney from "./AcademicJourney";

const skills = [
  { category: "Backend & Languages",     color: "var(--color-pink)",   items: ["Python", "Golang", "Java", "Node.js", "Express", "FastAPI", "C++ / OOP"] },
  { category: "Machine Learning & Data", color: "var(--color-purple)", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "PyTorch", "Supervised ML", "Unsupervised ML", "GenAI"] },
  { category: "Architecture & Design",   color: "var(--color-cyan)",   items: ["DSA", "HLD", "LLD", "Computer Architecture", "DBMS", "REST APIs"] },
  { category: "Databases & Cloud",       color: "var(--color-green)",  items: ["SQL (PostgreSQL)", "MongoDB", "AWS RDS", "Docker", "AWS Lambda", "AWS Amplify", "Vercel", "Render", "Git / GitHub"] },
  { category: "Frontend Core",           color: "var(--color-orange)", items: ["React.js", "Next.js", "WebGL / Three.js", "Framer Motion", "Redux Toolkit", "CSS / Tailwind"] },
];

function MdHeading({ level = 1, children, id }) {
  const sizes = { 1: "2.2rem", 2: "1.6rem", 3: "1.2rem" };
  const colors = { 1: "var(--color-fg)", 2: "var(--color-purple)", 3: "var(--color-cyan)" };
  const prefix = "#".repeat(level);
  return (
    <div
      id={id}
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.5rem",
        marginBottom: level === 1 ? "1.5rem" : "1rem",
        marginTop: level === 1 ? 0 : "2rem",
        borderBottom: level <= 2 ? "1px solid var(--border-subtle)" : "none",
        paddingBottom: level <= 2 ? "0.5rem" : 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--color-comment)",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        {prefix}
      </span>
      <h2
        style={{
          fontSize: sizes[level] || "1rem",
          color: colors[level] || "var(--color-fg)",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function MdCodeInline({ children, color }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.82em",
        background: "var(--color-bg-elevated)",
        border: "1px solid var(--border-subtle)",
        color: color || "var(--color-cyan)",
        padding: "0.1em 0.4em",
        borderRadius: "3px",
      }}
    >
      {children}
    </code>
  );
}

function SkillSection({ group, audio }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: group.color,
            fontWeight: 700,
          }}
        >
          ###
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.82rem",
            color: "var(--color-fg-dim)",
            fontWeight: 600,
          }}
        >
          {group.category}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingLeft: "1rem" }}>
        {group.items.map((skill) => (
          <span
            key={skill}
            className="skill-tag"
            onMouseEnter={() => audio?.playHover()}
            style={{ borderColor: `${group.color}44`, color: group.color }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About({ audio }) {
  return (
    <section
      id="about"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "0",
      }}
    >
      {/* Tab bar for this section */}
      <div className="ide-tab-bar">
        <div className="ide-tab active">
          <FileText size={12} />
          about.md
        </div>
        <div style={{ flex: 1, borderBottom: "1px solid var(--border-subtle)" }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          minHeight: "calc(100vh - 79px)",
        }}
        className="about-grid"
      >
        {/* Left: rendered markdown */}
        <div
          style={{
            borderRight: "1px solid var(--border-subtle)",
            padding: "3rem 3rem 4rem 3rem",
            overflowY: "auto",
          }}
        >
          <MdHeading level={1}>About Me</MdHeading>

          <p style={{ marginBottom: "1.2rem", lineHeight: 1.8, color: "var(--color-fg-dim)" }}>
            Hey, I&apos;m <MdCodeInline color="var(--color-pink)">Sachin Yadav</MdCodeInline> — a 2nd-year CS student
            specializing in <MdCodeInline color="var(--color-purple)">full-stack engineering</MdCodeInline>,{" "}
            <MdCodeInline color="var(--color-cyan)">machine learning pipelines</MdCodeInline>, and{" "}
            <MdCodeInline color="var(--color-green)">backend systems design</MdCodeInline>.
          </p>

          <p style={{ marginBottom: "1.5rem", lineHeight: 1.8, color: "var(--color-fg-dim)" }}>
            I build interconnected applications — from low-latency real-time collaboration servers to ML grids using{" "}
            <MdCodeInline>NumPy</MdCodeInline>, <MdCodeInline>Pandas</MdCodeInline>, and{" "}
            <MdCodeInline>PyTorch</MdCodeInline>. I design database engines in SQL and MongoDB and implement robust system
            schemas using LLD &amp; HLD patterns in Java, Python, and Go.
          </p>

          {/* Blockquote callout */}
          <div
            style={{
              borderLeft: "3px solid var(--color-purple)",
              paddingLeft: "1rem",
              margin: "1.5rem 0",
              background: "var(--color-purple-dim)",
              borderRadius: "0 4px 4px 0",
              padding: "0.75rem 1rem",
            }}
          >
            <p style={{ margin: 0, color: "var(--color-fg-dim)", fontStyle: "italic", fontSize: "0.92rem" }}>
              &quot;I bridge rigorous systems architecture with high-performance interactive interfaces.&quot;
            </p>
          </div>

          <MdHeading level={2}>Quick Stats</MdHeading>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              marginBottom: "2rem",
            }}
            className="stats-grid"
          >
            {[
              { label: "Focus",    value: "Full-Stack + ML",   color: "var(--color-pink)"   },
              { label: "Year",     value: "2nd Year CS",       color: "var(--color-purple)" },
              { label: "Location", value: "Bangalore, India",  color: "var(--color-cyan)"   },
              { label: "Status",   value: "Open to internships",color: "var(--color-green)" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "4px",
                  padding: "0.75rem 1rem",
                  borderLeft: `3px solid ${stat.color}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--color-comment)",
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    color: stat.color,
                    fontWeight: 700,
                  }}
                >
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>

          <MdHeading level={2}>Skills</MdHeading>
          {skills.map((group) => (
            <SkillSection key={group.category} group={group} audio={audio} />
          ))}
        </div>

        {/* Right: raw markdown source (IDE dual-pane effect) */}
        <div
          style={{
            background: "var(--color-bg-darker)",
            padding: "3rem 2.5rem",
            overflowY: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            lineHeight: 1.7,
            color: "var(--color-comment)",
          }}
        >
          {/* "Source" label */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-comment)",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "0.5rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ opacity: 0.5 }}>📄</span> Source — about.md
          </div>

          {/* Raw markdown lines */}
          {[
            { line: "# About Me",           color: "var(--color-pink)" },
            { line: "" },
            { line: "Hey, I'm **Sachin Yadav**.",     color: "var(--color-fg-dim)" },
            { line: "2nd year CS student.",           color: "var(--color-fg-dim)" },
            { line: "" },
            { line: "## Focus Areas",       color: "var(--color-purple)" },
            { line: "" },
            { line: "- Full-Stack Engineering",       color: "var(--color-green)" },
            { line: "- Machine Learning Pipelines",   color: "var(--color-green)" },
            { line: "- Backend Systems Design",       color: "var(--color-green)" },
            { line: "- Real-Time Systems",            color: "var(--color-green)" },
            { line: "" },
            { line: "## Stack",             color: "var(--color-purple)" },
            { line: "" },
            { line: "```python",            color: "var(--color-comment)" },
            { line: "stack = [",            color: "var(--color-fg-dim)" },
            { line: '  "Python", "Golang", "Java",',  color: "var(--color-orange)" },
            { line: '  "Node.js", "React", "Next.js",',color: "var(--color-orange)" },
            { line: '  "FastAPI", "PyTorch", "SQL"',  color: "var(--color-orange)" },
            { line: "]",                    color: "var(--color-fg-dim)" },
            { line: "```",                  color: "var(--color-comment)" },
            { line: "" },
            { line: "## Contact",           color: "var(--color-purple)" },
            { line: "" },
            { line: "📧 yadavsachin2446@gmail.com",   color: "var(--color-cyan)" },
            { line: "📍 Bangalore, India",            color: "var(--color-cyan)" },
            { line: "" },
            { line: "> Open to internships &",        color: "var(--color-comment)", italic: true },
            { line: "> open-source collaborations.",  color: "var(--color-comment)", italic: true },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                color: item.color || "var(--color-comment)",
                fontStyle: item.italic ? "italic" : "normal",
                minHeight: "1.4em",
                padding: "0 0.5rem",
              }}
            >
              {item.line}
            </div>
          ))}
        </div>
      </div>

      {/* Academic Journey below */}
      <AcademicJourney audio={audio} />

      <style jsx global>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
