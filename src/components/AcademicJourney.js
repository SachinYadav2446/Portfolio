"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, GitBranch, ChevronDown, ChevronRight } from "lucide-react";

const commits = [
  {
    hash:    "a1f3c9d",
    branch:  "main",
    phase:   "Phase 1",
    msg:     "feat: Programming Fundamentals",
    detail:  "Started with C programming, learned basic algorithms, problem-solving techniques, and fundamental computer science concepts.",
    date:    "2022-08-01",
    color:   "var(--color-pink)",
  },
  {
    hash:    "b2e4d1a",
    branch:  "main",
    phase:   "Phase 2",
    msg:     "feat: OOP & Data Structures",
    detail:  "Mastered Object-Oriented Programming in C++, learned inheritance, polymorphism, and STL containers. Solved 200+ DSA problems.",
    date:    "2022-12-15",
    color:   "var(--color-pink)",
  },
  {
    hash:    "c3d5e2b",
    branch:  "main",
    phase:   "Phase 3",
    msg:     "perf: Advanced Algorithms",
    detail:  "Deepened knowledge of graphs, trees, heaps, and dynamic programming. Solved 300+ algorithmic problems on competitive platforms.",
    date:    "2023-03-20",
    color:   "var(--color-pink)",
  },
  {
    hash:    "d4f6a3c",
    branch:  "feature/web",
    phase:   "Phase 4",
    msg:     "feat: Web Development Basics",
    detail:  "Learned HTML5, CSS3, JavaScript fundamentals, and built responsive web pages with modern CSS techniques.",
    date:    "2023-06-10",
    color:   "var(--color-purple)",
  },
  {
    hash:    "e5a7b4d",
    branch:  "feature/web",
    phase:   "Phase 5",
    msg:     "feat: Backend Development",
    detail:  "Built REST APIs with Node.js and Express, learned database design with MongoDB and PostgreSQL.",
    date:    "2023-09-05",
    color:   "var(--color-purple)",
  },
  {
    hash:    "f6b8c5e",
    branch:  "feature/ml",
    phase:   "Phase 6",
    msg:     "feat: Machine Learning",
    detail:  "Studied ML algorithms, built predictive models using NumPy, Pandas, Scikit-learn, and visualized data with Matplotlib.",
    date:    "2024-01-18",
    color:   "var(--color-purple)",
  },
  {
    hash:    "g7c9d6f",
    branch:  "feature/api",
    phase:   "Phase 7",
    msg:     "feat: FastAPI & Data Pipelines",
    detail:  "Built high-performance async APIs with FastAPI, engineered data ingestion pipelines, and worked with time-series forecasting.",
    date:    "2024-04-22",
    color:   "var(--color-cyan)",
  },
  {
    hash:    "h8d0e7a",
    branch:  "feature/realtime",
    phase:   "Phase 8",
    msg:     "feat: Real-Time Systems",
    detail:  "Built real-time collaborative apps with Socket.IO, studied system design patterns, and learned distributed systems concepts.",
    date:    "2024-07-14",
    color:   "var(--color-cyan)",
  },
  {
    hash:    "i9e1f8b",
    branch:  "feature/3d",
    phase:   "Phase 9",
    msg:     "feat: WebGL & Graphics",
    detail:  "Specializing in interactive graphics with WebGL, Three.js, custom shaders, and 3D web experiences.",
    date:    "2024-11-01",
    color:   "var(--color-green)",
    current: true,
  },
  {
    hash:    "j0f2a9c",
    branch:  "feature/devops",
    phase:   "Phase 10",
    msg:     "wip: DevOps & Cloud",
    detail:  "Learning Docker containerization, AWS services (Lambda, RDS, Amplify), CI/CD pipelines, and cloud architecture.",
    date:    "2025-01-01",
    color:   "var(--color-orange)",
    wip:     true,
  },
];

function CommitRow({ commit, audio }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <motion.div
        onClick={() => { setOpen(!open); audio?.playClick(); }}
        onMouseEnter={() => audio?.playHover()}
        whileHover={{ backgroundColor: "var(--color-bg-elevated)" }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.55rem 1rem",
          cursor: "pointer",
          borderBottom: "1px solid var(--border-subtle)",
          userSelect: "none",
          transition: "background 0.15s",
        }}
      >
        {/* Expand arrow */}
        <span style={{ width: 14, flexShrink: 0, color: "var(--color-comment)" }}>
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </span>

        {/* Commit icon */}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: `2px solid ${commit.color}`,
            background: commit.current ? commit.color : "var(--color-bg-card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: commit.current ? `0 0 8px ${commit.color}` : "none",
          }}
        >
          <GitCommit size={9} color={commit.current ? "var(--color-bg)" : commit.color} />
        </div>

        {/* Hash */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-comment)",
            minWidth: "54px",
            flexShrink: 0,
          }}
        >
          {commit.hash}
        </span>

        {/* Branch badge */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            background: `${commit.color}22`,
            border: `1px solid ${commit.color}55`,
            color: commit.color,
            padding: "0.1rem 0.45rem",
            borderRadius: "10px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <GitBranch size={8} />
          {commit.branch}
        </span>

        {/* Message */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: commit.wip ? "var(--color-orange)" : "var(--color-fg-dim)",
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {commit.wip && (
            <span
              style={{
                background: "var(--color-orange)",
                color: "var(--color-bg)",
                fontSize: "0.58rem",
                padding: "0.05rem 0.3rem",
                borderRadius: "3px",
                marginRight: "0.4rem",
                fontWeight: 700,
              }}
            >
              WIP
            </span>
          )}
          {commit.current && (
            <span
              style={{
                background: "var(--color-green)",
                color: "var(--color-bg)",
                fontSize: "0.58rem",
                padding: "0.05rem 0.3rem",
                borderRadius: "3px",
                marginRight: "0.4rem",
                fontWeight: 700,
              }}
            >
              HEAD
            </span>
          )}
          {commit.msg}
        </span>

        {/* Date */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-comment)",
            flexShrink: 0,
          }}
        >
          {commit.date}
        </span>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0.75rem 1rem 0.75rem 3.6rem",
                background: "var(--color-bg-darker)",
                borderBottom: "1px solid var(--border-subtle)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-fg-muted)",
                lineHeight: 1.6,
                borderLeft: `3px solid ${commit.color}`,
                marginLeft: "1rem",
              }}
            >
              <span style={{ color: "var(--color-comment)" }}>{"// "}</span>
              {commit.detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AcademicJourney({ audio }) {
  return (
    <section
      id="academic-journey"
      style={{
        background: "var(--color-bg-card)",
        borderTop: "1px solid var(--border-subtle)",
        padding: 0,
      }}
    >
      {/* Tab header */}
      <div className="ide-tab-bar">
        <div className="ide-tab active">
          <GitBranch size={12} />
          git-log.md
        </div>
        <div style={{ flex: 1, borderBottom: "1px solid var(--border-subtle)" }} />
      </div>

      {/* git log header bar */}
      <div
        style={{
          background: "var(--color-bg-elevated)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "0.5rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--color-comment)",
          overflowX: "auto",
        }}
      >
        <span style={{ color: "var(--color-green)", fontWeight: 700 }}>$ git log --oneline --graph --all</span>
        <span>10 commits</span>
        <span style={{ color: "var(--color-cyan)" }}>HEAD → feature/3d</span>
        <span style={{ marginLeft: "auto", color: "var(--color-purple)" }}>cs-journey.git</span>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.4rem 1rem",
          background: "var(--color-bg-elevated)",
          borderBottom: "1px solid var(--border-subtle)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          color: "var(--color-comment)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        <span style={{ width: 14, flexShrink: 0 }} />
        <span style={{ width: 20, flexShrink: 0 }} />
        <span style={{ minWidth: 54, flexShrink: 0 }}>Hash</span>
        <span style={{ width: 100, flexShrink: 0 }}>Branch</span>
        <span style={{ flex: 1 }}>Message</span>
        <span>Date</span>
      </div>

      {/* Commit rows */}
      <div>
        {[...commits].reverse().map((commit) => (
          <CommitRow key={commit.hash} commit={commit} audio={audio} />
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .commit-date { display: none !important; }
          .commit-branch { display: none !important; }
        }
      `}</style>
    </section>
  );
}
