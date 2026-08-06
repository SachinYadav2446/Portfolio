"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";


export default function NetworkMap({ audio }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const viewportRef = useRef(null);
  const [vpW, setVpW] = useState(1280); // measured viewport width

  // Measure the actual viewport element width so SVG coords match HTML coords perfectly
  useEffect(() => {
    if (!viewportRef.current) return;
    const ro = new ResizeObserver(entries => {
      setVpW(entries[0].contentRect.width);
    });
    ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const VPH = 540; // fixed height in px
  const cx = vpW / 2;  // centre x in px
  const cy = VPH / 2;  // centre y (270px)

  // ── Nodes: positions as fractions of half-width / half-height ───────────
  // fx ∈ [-1,+1], fy ∈ [-1,+1]  →  pixel x = cx + fx*(cx*0.88)
  // Using 88% of half-width keeps outermost pills 6% from the edge.
  const spread = 0.88;
  const nodesDef = [
    // ── BACKEND & DB (Top-Left) ──────────────────────────────────────────
    { id: "nodejs",   label: "Node.js",          fx: -0.28, fy: -0.20, floatX: -2, floatY: -2, dur: 6.0 },
    { id: "express",  label: "Express",           fx: -0.68, fy: -0.32, floatX: -2, floatY: -2, dur: 6.2 },
    { id: "mongodb",  label: "MongoDB",           fx: -0.92, fy: -0.63, floatX: -2, floatY: -3, dur: 7.2 },
    { id: "socketio", label: "Socket.IO",         fx: -0.62, fy: -0.58, floatX: -2, floatY: -3, dur: 5.2 },
    { id: "websocket",label: "WebSockets",        fx: -0.34, fy: -0.52, floatX:  1, floatY: -3, dur: 5.4 },
    { id: "dbms",     label: "DBMS Concepts",     fx: -0.90, fy:  0.05, floatX: -2, floatY: -1, dur: 7.8 },
    { id: "sql",      label: "SQL (PostgreSQL)",  fx: -0.62, fy:  0.09, floatX: -2, floatY:  1, dur: 7.0 },
    // ── FRONTEND (Center-Upper) ──────────────────────────────────────────
    { id: "genai",    label: "Generative AI",     fx:  0.05, fy: -0.64, floatX: -1, floatY:  2, dur: 5.6 },
    { id: "react",    label: "React / Next.js",   fx:  0.15, fy: -0.30, floatX:  2, floatY: -2, dur: 5.0 },
    { id: "redux",    label: "Redux Toolkit",     fx:  0.34, fy: -0.67, floatX:  1, floatY: -2, dur: 5.8 },
    { id: "threejs",  label: "Three.js / WebGL",  fx:  0.34, fy: -0.46, floatX:  2, floatY: -2, dur: 6.0 },
    // ── CLOUD / DEVOPS (Top-Right) ───────────────────────────────────────
    { id: "docker",      label: "Docker / AWS",   fx:  0.54, fy: -0.72, floatX:  2, floatY: -3, dur: 6.4 },
    { id: "git",         label: "Git / GitHub",   fx:  0.78, fy: -0.65, floatX: -1, floatY: -3, dur: 7.2 },
    { id: "aws-amplify", label: "AWS Amplify",    fx:  0.54, fy: -0.44, floatX:  2, floatY: -2, dur: 6.8 },
    { id: "aws-rds",     label: "AWS RDS",        fx:  0.78, fy: -0.41, floatX:  2, floatY: -2, dur: 7.5 },
    { id: "vercel",      label: "Vercel",         fx:  0.54, fy: -0.20, floatX:  1, floatY: -1, dur: 7.1 },
    { id: "aws-lambda",  label: "AWS Lambda",     fx:  0.78, fy: -0.18, floatX:  2, floatY: -1, dur: 6.6 },
    { id: "render",      label: "Render",         fx:  0.66, fy:  0.04, floatX:  2, floatY:  1, dur: 6.9 },
    // ── ML & DATA SCIENCE (Bottom-Left) ─────────────────────────────────
    { id: "python",       label: "Python",          fx: -0.36, fy:  0.30, floatX: -2, floatY:  2, dur: 6.0 },
    { id: "fastapi",      label: "FastAPI",         fx: -0.14, fy:  0.50, floatX: -2, floatY: -2, dur: 7.5 },
    { id: "numpy",        label: "NumPy",           fx: -0.70, fy:  0.24, floatX: -1, floatY:  2, dur: 6.8 },
    { id: "pandas",       label: "Pandas",          fx: -0.92, fy:  0.48, floatX: -1, floatY:  2, dur: 7.2 },
    { id: "pytorch",      label: "PyTorch",         fx: -0.62, fy:  0.52, floatX: -1, floatY:  1, dur: 6.6 },
    { id: "matplotlib",   label: "Matplotlib",      fx: -0.88, fy:  0.72, floatX: -2, floatY:  2, dur: 8.0 },
    { id: "seaborn",      label: "Seaborn",         fx: -0.60, fy:  0.76, floatX: -1, floatY:  2, dur: 9.0 },
    { id: "supervised",   label: "Supervised ML",   fx: -0.26, fy:  0.74, floatX: -2, floatY:  1, dur: 7.6 },
    { id: "unsupervised", label: "Unsupervised ML", fx:  0.00, fy:  0.60, floatX: -2, floatY: -1, dur: 8.4 },
    // ── SYSTEMS & DSA (Bottom-Right) ─────────────────────────────────────
    { id: "java",                  label: "Java",                 fx:  0.17, fy:  0.27, floatX:  2, floatY: -2, dur: 6.5 },
    { id: "golang",                label: "Golang",               fx:  0.31, fy:  0.05, floatX:  2, floatY:  1, dur: 7.0 },
    { id: "dsa",                   label: "DSA & Algorithms",     fx:  0.38, fy:  0.43, floatX:  2, floatY:  2, dur: 6.4 },
    { id: "hld",                   label: "System Design (HLD)",  fx:  0.59, fy:  0.22, floatX:  2, floatY: -1, dur: 8.2 },
    { id: "lld",                   label: "System Design (LLD)",  fx:  0.60, fy:  0.46, floatX:  2, floatY:  1, dur: 8.5 },
    { id: "computer-architecture", label: "Comp Architecture",    fx:  0.38, fy:  0.72, floatX:  1, floatY:  2, dur: 7.4 },
  ];

  // Compute actual pixel positions from fractions
  const nodes = useMemo(() => nodesDef.map(n => ({
    ...n,
    x: n.fx * cx * spread,
    y: n.fy * cy * spread,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })), [cx, cy]);

  // ── Connections ──────────────────────────────────────────────────────────
  const connections = [
    // Backend
    { from: "nodejs",   to: "express"   },
    { from: "nodejs",   to: "websocket" },
    { from: "express",  to: "mongodb"   },
    { from: "express",  to: "socketio"  },
    { from: "websocket",to: "socketio"  },
    { from: "sql",      to: "dbms"      },
    { from: "mongodb",  to: "dbms"      },
    // Frontend
    { from: "react",    to: "redux"   },
    { from: "react",    to: "threejs" },
    { from: "react",    to: "genai"   },
    // Cloud
    { from: "docker",      to: "git"        },
    { from: "docker",      to: "aws-amplify"},
    { from: "git",         to: "aws-rds"    },
    { from: "aws-amplify", to: "aws-rds"    },
    { from: "aws-amplify", to: "vercel"     },
    { from: "aws-rds",     to: "aws-lambda" },
    { from: "vercel",      to: "render"     },
    { from: "aws-lambda",  to: "render"     },
    // ML chain
    { from: "python",      to: "numpy"       },
    { from: "numpy",       to: "pandas"      },
    { from: "pandas",      to: "matplotlib"  },
    { from: "matplotlib",  to: "seaborn"     },
    { from: "pandas",      to: "pytorch"     },
    { from: "pytorch",     to: "supervised"  },
    { from: "supervised",  to: "unsupervised"},
    { from: "python",      to: "fastapi"     },
    { from: "fastapi",     to: "sql"         },
    { from: "python",      to: "genai"       },
    // Systems
    { from: "java",                  to: "dsa"   },
    { from: "computer-architecture", to: "java"  },
    { from: "golang",                to: "hld"   },
    { from: "hld",                   to: "lld"   },
    { from: "golang",                to: "dsa"   },
    // Cross-domain bridges
    { from: "python",  to: "java"    },
    { from: "java",    to: "golang"  },
    { from: "golang",  to: "nodejs"  },
    { from: "nodejs",  to: "react"   },
    { from: "react",   to: "fastapi" },
    { from: "golang",  to: "docker"  },
    { from: "nodejs",  to: "docker"  },
  ];

  const coreHubs = new Set(["react","nodejs","python","java","golang","fastapi","dsa"]);

  const nodeMap = useMemo(() => {
    const m = {};
    nodes.forEach(n => { m[n.id] = n; });
    return m;
  }, [nodes]);

  // ── Dense deterministic starfield ─────────────────────────────────────
  const stars = useMemo(() => {
    const seed = n => { const x = Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x); };
    return Array.from({ length: 110 }).map((_, i) => {
      let lv;
      if      (i%5===0) lv = seed(i*3)*14;          // far-left cluster
      else if (i%5===1) lv = 86+seed(i*7)*14;       // far-right cluster
      else              lv = seed(i*2+50)*100;
      return {
        id: i, left: `${lv.toFixed(2)}%`,
        top: `${(seed(i*4+11)*100).toFixed(2)}%`,
        size: seed(i*6+3)*2.6+0.6,
        delay: `${(seed(i*9)*5).toFixed(2)}s`,
        duration: `${(seed(i*11+1)*4+3).toFixed(2)}s`,
        opacity: seed(i*13+7)*0.55+0.12,
        driftX: `${(seed(i*15+3)*22 - 11).toFixed(1)}px`,
        driftY: `${(seed(i*17+7)*22 - 11).toFixed(1)}px`,
        driftDuration: `${(seed(i*19+5)*12 + 10).toFixed(2)}s`
      };
    });
  }, []);

  // Wire path helper: orthogonal L-bend, stagger per index
  const wirePath = (x1, y1, x2, y2, idx) => {
    const bf = 0.42 + (idx % 5) * 0.04;
    const xm = x1 + (x2-x1) * bf;
    return `M ${x1} ${y1} L ${xm} ${y1} L ${xm} ${y2} L ${x2} ${y2}`;
  };

  return (
    <section id="tech-web" style={{
      background: "#060608",
      borderTop: "1px solid var(--glass-border)",
      position: "relative",
      zIndex: 2,
      overflow: "hidden",
      padding: "6rem 0 0 0"
    }}>
      <div className="grid-bg"></div>

      {/* Section header — inside container so it gets padding */}
      <div className="container" style={{ position: "relative", zIndex: 10, paddingBottom: "2.5rem" }}>
        <span className="font-sans-title" style={{ color: "var(--color-red)", fontSize: "0.85rem" }}>03 / THE SIGNAL GRID</span>
        <BinaryHeading text="Engineering Signal Mesh" className="text-glow-cream" style={{ fontSize: "clamp(2.3rem, 5vw, 3.2rem)", marginTop: "0.5rem" }} />
        <div className="accent-bar"></div>
        <p style={{ color: "var(--color-cream-dim)", fontSize: "0.95rem", maxWidth: "750px", lineHeight: "1.6" }}>
          Live schematic of my full-stack, ML, cloud, and systems architecture skill graph. Hover any node to light up its signal paths.
        </p>
      </div>

      {/* ── FULL-WIDTH MAP VIEWPORT (outside .container) ── */}
      <div
        ref={viewportRef}
        style={{
          position: "relative",
          width: "100%",
          height: `${VPH}px`,
          background: "rgba(3,3,5,0.92)",
          borderTop: "2px solid #1a1a20",
          borderBottom: "2px solid #1a1a20",
          overflow: "hidden",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.95)",
          marginBottom: "0"
        }}
        className="network-viewport"
      >
        {/* Starfield */}
        {stars.map(star => (
          <span key={star.id} className="star-particle" style={{
            position: "absolute", left: star.left, top: star.top,
            width: `${star.size}px`, height: `${star.size}px`,
            background: "rgba(255,253,249,0.85)", borderRadius: "50%",
            boxShadow: star.size > 2.0 ? "0 0 4px rgba(255,255,255,0.7)" : "none",
            pointerEvents: "none", zIndex: 0,
            "--drift-x": star.driftX,
            "--drift-y": star.driftY,
            "--base-opacity": star.opacity,
            animation: `starTwinkle ${star.duration} ease-in-out ${star.delay} infinite alternate, floatStars ${star.driftDuration} ease-in-out ${star.delay} infinite alternate`
          }} />
        ))}

        {/* ── SVG Wire Layer — NO viewBox, coords == CSS pixels ── */}
        <svg
          width={vpW} height={VPH}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1, pointerEvents: "none" }}
        >
          <defs>
            <pattern id="grid-tech" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(230,57,70,0.012)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={vpW} height={VPH} fill="url(#grid-tech)" />

          {/* Core bus lines: center → core hub nodes */}
          {nodes.filter(n => coreHubs.has(n.id)).map(node => {
            const isHov = hoveredNode === node.id;
            const tx = cx + node.x, ty = cy + node.y;
            const xm = cx + node.x * 0.55;
            const path = `M ${cx} ${cy} L ${xm} ${cy} L ${xm} ${ty} L ${tx} ${ty}`;
            return (
              <g key={`bus-${node.id}`}>
                {isHov && <path d={path} fill="none" stroke="var(--color-red)" strokeWidth="5" opacity="0.18" style={{ filter: "blur(3px)" }} />}
                <path d={path} fill="none"
                  stroke={isHov ? "var(--color-red)" : "rgba(230,57,70,0.06)"}
                  strokeWidth={isHov ? "1.6" : "0.7"}
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
                <path d={path} fill="none" stroke="var(--color-red)" strokeWidth="0.9"
                  strokeDasharray="6,18" className="marching-pulse"
                  style={{ opacity: isHov ? 1 : 0.3 }}
                />
              </g>
            );
          })}

          {/* Cross-connection wires */}
          {connections.map((conn, idx) => {
            const nA = nodeMap[conn.from], nB = nodeMap[conn.to];
            if (!nA || !nB) return null;
            const x1 = cx+nA.x, y1 = cy+nA.y, x2 = cx+nB.x, y2 = cy+nB.y;
            const isHov = hoveredNode===nA.id || hoveredNode===nB.id;
            const path = wirePath(x1, y1, x2, y2, idx);
            return (
              <g key={`lnk-${idx}`}>
                {isHov && <path d={path} fill="none" stroke="var(--color-red)" strokeWidth="4" opacity="0.2" style={{ filter: "blur(3px)" }} />}
                <path d={path} fill="none"
                  stroke={isHov ? "var(--color-red)" : "rgba(230,57,70,0.04)"}
                  strokeWidth={isHov ? "1.4" : "0.5"}
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
                {isHov && (
                  <path d={path} fill="none" stroke="var(--color-red)" strokeWidth="1.0"
                    strokeDasharray="4,12" className="marching-pulse"
                    style={{ animationDuration: "1.6s" }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* ── HTML Node Layer ── */}
        <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 5 }}>

          {/* Center CPU */}
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem"
          }}>
            <div style={{
              width: "76px", height: "76px", borderRadius: "50%",
              background: "#060608",
              border: "2.5px solid var(--color-red)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 35px var(--color-red-glow-strong), inset 0 0 15px rgba(230,57,70,0.28)",
              position: "relative"
            }} className="center-avatar">
              <Cpu size={30} color="var(--color-red)" />
              <span style={{
                position: "absolute", top: "5px", right: "5px",
                width: "8px", height: "8px", borderRadius: "50%",
                background: "var(--color-red)", animation: "ping 1.5s infinite"
              }} />
            </div>
            <span style={{
              fontFamily: "monospace", fontSize: "0.56rem", fontWeight: 800,
              textTransform: "uppercase", letterSpacing: "0.15em",
              color: "var(--color-red)", background: "rgba(0,0,0,0.85)",
              padding: "0.2rem 0.45rem", borderRadius: "4px",
              border: "1px solid rgba(230,57,70,0.3)", whiteSpace: "nowrap"
            }}>SYSTEMS_ENG</span>
          </div>

          {/* Skill nodes */}
          {nodes.map(node => {
            const isHov = hoveredNode === node.id;
            const isLinked = hoveredNode && connections.some(
              c => (c.from===node.id && c.to===hoveredNode) || (c.from===hoveredNode && c.to===node.id)
            );
            const active = isHov || isLinked;
            return (
              <motion.div
                key={node.id}
                onMouseEnter={() => {
                  setHoveredNode(node.id);
                  audio?.playHover();
                }}
                onMouseLeave={() => setHoveredNode(null)}
                animate={{ x: [0, node.floatX, 0], y: [0, node.floatY, 0] }}
                transition={{ duration: node.dur, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  left: `${cx + node.x}px`,
                  top:  `${cy + node.y}px`,
                  transform: "translate(-50%,-50%)"
                }}
              >
                <div style={{
                  background: active
                    ? "linear-gradient(135deg,rgba(60,12,16,0.97),rgba(30,8,10,0.99))"
                    : "linear-gradient(135deg,rgba(22,10,12,0.96),rgba(6,6,8,0.98))",
                  border: `1.5px solid ${active ? "var(--color-red)" : "var(--glass-border)"}`,
                  borderRadius: "24px",
                  padding: "0.34rem 0.82rem",
                  boxShadow: active
                    ? "0 8px 22px rgba(0,0,0,0.85), 0 0 14px var(--color-red-glow)"
                    : "0 3px 10px rgba(0,0,0,0.6)",
                  display: "flex", alignItems: "center", gap: "0.42rem",
                  whiteSpace: "nowrap",
                  transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
                  transform: active ? "scale(1.07)" : "scale(1)",
                  cursor: "default"
                }} className="tech-mesh-node">
                  <Cpu size={9} color={active ? "var(--color-red)" : "var(--color-cream-muted)"} />
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.03em",
                    color: active ? "var(--color-cream)" : "var(--color-cream-dim)",
                    transition: "color 0.28s"
                  }}>{node.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .marching-pulse { animation: march 3.6s linear infinite; }
        @keyframes march { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
        @keyframes ping { 75%, 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes starTwinkle {
          0%, 100% { opacity: calc(var(--base-opacity, 0.5) * 0.4); }
          50% { opacity: var(--base-opacity, 0.5); }
        }
        @keyframes floatStars {
          0% { transform: translate(0, 0); }
          50% { transform: translate(var(--drift-x, 8px), var(--drift-y, -6px)); }
          100% { transform: translate(0, 0); }
        }
        @keyframes universePulse {
          0%, 100% { background-color: rgba(3, 3, 5, 0.93); }
          50% { background-color: rgba(1, 1, 2, 0.97); }
        }
        .network-viewport {
          animation: universePulse 20s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
        }
        @media (max-width: 900px) {
          .network-viewport { height: 420px !important; }
          .tech-mesh-node { transform: scale(0.8) !important; }
        }
        @media (max-width: 640px) {
          .network-viewport { height: 360px !important; }
        }
      `}</style>
    </section>
  );
}
