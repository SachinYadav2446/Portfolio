"use client";

import React, { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import ThreeCanvas from "./ThreeCanvas";
import { MeshWobbleMaterial } from "@react-three/drei";
import BinaryHeading from "./BinaryHeading";
import { Sliders, RefreshCw, Terminal, Play, UserCheck, Layers, HelpCircle, Code } from "lucide-react";

// R3F Client mesh that compiles and responds to parsed code props
function MorphingMesh({ speed, scale, wireframe, geometry, color }) {
  const meshRef = useRef();
  const orbit1Ref = useRef();
  const orbit2Ref = useRef();
  const orbit3Ref = useRef();
  const orbit4Ref = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = elapsed * (speed || 1.0) * 0.3;
      meshRef.current.rotation.y = elapsed * (speed || 1.0) * 0.4;
      meshRef.current.position.y = Math.sin(elapsed * 1.5) * 0.08;
    }
    // Orbit 1: cyan dodecahedron
    if (orbit1Ref.current) {
      const angle = elapsed * 0.7;
      orbit1Ref.current.position.x = Math.cos(angle) * 2.2;
      orbit1Ref.current.position.y = Math.sin(angle * 0.6) * 0.5;
      orbit1Ref.current.position.z = Math.sin(angle) * 2.2;
      orbit1Ref.current.rotation.x += 0.02;
      orbit1Ref.current.rotation.y += 0.015;
    }
    // Orbit 2: gold octahedron
    if (orbit2Ref.current) {
      const angle = elapsed * 0.45 + Math.PI;
      orbit2Ref.current.position.x = Math.cos(angle) * 2.8;
      orbit2Ref.current.position.y = Math.sin(elapsed * 0.9) * 0.8;
      orbit2Ref.current.position.z = Math.sin(angle) * 2.8;
      orbit2Ref.current.rotation.x += 0.025;
      orbit2Ref.current.rotation.z += 0.02;
    }
    // Orbit 3: purple cone
    if (orbit3Ref.current) {
      const angle = elapsed * 0.55 + Math.PI * 0.5;
      orbit3Ref.current.position.x = Math.cos(angle) * 1.8;
      orbit3Ref.current.position.y = Math.cos(elapsed * 1.2) * 1.0;
      orbit3Ref.current.position.z = Math.sin(angle) * 1.8;
      orbit3Ref.current.rotation.y += 0.03;
    }
    // Orbit 4: green small torus
    if (orbit4Ref.current) {
      const angle = -elapsed * 0.35;
      orbit4Ref.current.position.x = Math.cos(angle) * 3.4;
      orbit4Ref.current.position.y = Math.sin(elapsed * 0.5) * 0.6;
      orbit4Ref.current.position.z = Math.sin(angle) * 3.4;
      orbit4Ref.current.rotation.x += 0.018;
      orbit4Ref.current.rotation.y += 0.022;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "torusknot":
        return <torusKnotGeometry args={[0.7, 0.22, 120, 16]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 3]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.9, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "sphere":
      default:
        return <sphereGeometry args={[0.9, 64, 64]} />;
    }
  };

  return (
    <>
      {/* Main morphing mesh */}
      <mesh ref={meshRef} scale={[scale || 1.4, scale || 1.4, scale || 1.4]}>
        {renderGeometry()}
        {wireframe ? (
          <meshBasicMaterial color={color || "#E63946"} wireframe />
        ) : (
          <MeshWobbleMaterial
            color={color || "#E63946"}
            factor={0.5}
            speed={(speed || 1.0) * 1.2}
            roughness={0.15}
            metalness={0.8}
          />
        )}
      </mesh>

      {/* Orbit 1: Cyan dodecahedron */}
      <mesh ref={orbit1Ref} scale={[0.22, 0.22, 0.22]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#00F5D4" emissive="#00F5D4" emissiveIntensity={0.5} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Orbit 2: Gold octahedron */}
      <mesh ref={orbit2Ref} scale={[0.18, 0.18, 0.18]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#FFB703" emissive="#FFB703" emissiveIntensity={0.6} roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Orbit 3: Purple cone */}
      <mesh ref={orbit3Ref} scale={[0.14, 0.14, 0.14]}>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#9B5DE5" emissive="#9B5DE5" emissiveIntensity={0.5} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Orbit 4: Green mini torus */}
      <mesh ref={orbit4Ref} scale={[0.15, 0.15, 0.15]}>
        <torusGeometry args={[1.5, 0.5, 12, 24]} />
        <meshStandardMaterial color="#06D6A0" emissive="#06D6A0" emissiveIntensity={0.4} roughness={0.25} metalness={0.85} />
      </mesh>
    </>
  );
}

export default function CreativeLab() {
  // Configured states representing active WebGL properties
  const [speed, setSpeed] = useState(1.5);
  const [scale, setScale] = useState(1.4);
  const [wireframe, setWireframe] = useState(false);
  const [geometry, setGeometry] = useState("torusknot");
  const [color, setColor] = useState("#E63946");

  // Code editor states
  const [compileStatus, setCompileStatus] = useState("SUCCESS (200 OK)");
  const [isCompiling, setIsCompiling] = useState(false);

  const initialCode = `// Bright Code Workspace v2.0
// Workspace ID: brightcode-session-45
// Edit variables below and click 'Compile & Sync' ⚡

const shape = "torusknot"; // torusknot | sphere | icosahedron | dodecahedron | octahedron
const speed = 1.5;         // 0.1 to 5.0
const color = "#E63946";   // Any hex code e.g. #00F5D4, #FFB703, #9B5DE5
const wireframe = false;   // true | false`;

  const [codeText, setCodeText] = useState(initialCode);
  const [logMessages, setLogMessages] = useState([
    "Socket connection established on port 5000.",
    "Prince joined room #45.",
    "Devesh is writing collaborative socket interfaces."
  ]);

  // Handle mock collaboration logs ticker
  useEffect(() => {
    const events = [
      "Devesh updated Monaco editor cursors.",
      "Soham commented: 'Check out the wireframe style!'",
      "Prince switched file tab to Client/App.jsx.",
      "Himkar synced JWT authentication tokens.",
      "Guest visitor compiled workspace successfully.",
      "Admin set room visibility to PUBLIC."
    ];

    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setLogMessages((prev) => {
        const nextLogs = [...prev, randomEvent];
        if (nextLogs.length > 5) nextLogs.shift();
        return nextLogs;
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  // Parse variables from code editor using Regex
  const handleCompile = () => {
    setIsCompiling(true);
    setCompileStatus("COMPILING...");

    setTimeout(() => {
      try {
        const shapeMatch = codeText.match(/(?:const|let|var)?\s*shape\s*=\s*["'](torusknot|sphere|icosahedron|dodecahedron|octahedron)["']/i);
        const speedMatch = codeText.match(/(?:const|let|var)?\s*speed\s*=\s*(\d*\.?\d+)/i);
        const colorMatch = codeText.match(/(?:const|let|var)?\s*color\s*=\s*["'](#[0-9a-fA-F]{6}|[a-zA-Z]+)["']/i);
        const wireframeMatch = codeText.match(/(?:const|let|var)?\s*wireframe\s*=\s*(true|false)/i);

        const parsedShape     = shapeMatch     ? shapeMatch[1].toLowerCase()       : null;
        const parsedSpeed     = speedMatch     ? parseFloat(speedMatch[1])          : null;
        const parsedColor     = colorMatch     ? colorMatch[1]                      : null;
        const parsedWireframe = wireframeMatch ? wireframeMatch[1] === "true"      : null;

        let hasError = false;
        let errorDetails = "";

        if (parsedSpeed !== null && (parsedSpeed < 0.1 || parsedSpeed > 5.0)) {
          hasError = true;
          errorDetails = "Range Error: speed must be between 0.1 and 5.0.";
        }
        if (parsedColor !== null && !/^#[0-9A-F]{6}$/i.test(parsedColor)) {
          const named = ["red","blue","green","gold","cyan","pink","white","purple"];
          if (!named.includes(parsedColor.toLowerCase())) {
            hasError = true;
            errorDetails = "Syntax Error: color must be a valid hex code (e.g. '#00F5D4').";
          }
        }

        if (hasError) {
          setCompileStatus(`ERROR: ${errorDetails}`);
        } else {
          if (parsedShape)           setGeometry(parsedShape);
          if (parsedSpeed !== null)  setSpeed(parsedSpeed);
          if (parsedColor)           setColor(parsedColor);
          if (parsedWireframe !== null) setWireframe(parsedWireframe);
          setCompileStatus("SUCCESS (200 OK)");
        }
      } catch (err) {
        setCompileStatus("COMPILE ERROR: Parse failure.");
      } finally {
        setIsCompiling(false);
      }
    }, 600);
  };

  // Keyboard shortcut: Ctrl+S / Cmd+S compiles
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleCompile();
    }
  };

  // Pre-configured compiler presets
  const applyPreset = (presetType) => {
    let targetCode = "";
    switch (presetType) {
      case "torus-crimson":
        targetCode = `// Bright Code Workspace v2.0\n// Workspace ID: brightcode-session-45\n// Edit variables below and click 'Compile & Sync' ⚡\n\nconst shape = "torusknot"; // torusknot | sphere | icosahedron | dodecahedron | octahedron\nconst speed = 3.5;         // 0.1 to 5.0\nconst color = "#E63946";   // Any hex code\nconst wireframe = false;   // true | false`;
        break;
      case "wire-cyan":
        targetCode = `// Bright Code Workspace v2.0\n// Workspace ID: brightcode-session-45\n// Edit variables below and click 'Compile & Sync' ⚡\n\nconst shape = "icosahedron"; // torusknot | sphere | icosahedron | dodecahedron | octahedron\nconst speed = 0.8;           // 0.1 to 5.0\nconst color = "#00F5D4";     // Any hex code\nconst wireframe = true;      // true | false`;
        break;
      case "sphere-gold":
        targetCode = `// Bright Code Workspace v2.0\n// Workspace ID: brightcode-session-45\n// Edit variables below and click 'Compile & Sync' ⚡\n\nconst shape = "sphere";    // torusknot | sphere | icosahedron | dodecahedron | octahedron\nconst speed = 2.0;         // 0.1 to 5.0\nconst color = "#FFB703";   // Any hex code\nconst wireframe = false;   // true | false`;
        break;
      case "dodeca-purple":
        targetCode = `// Bright Code Workspace v2.0\n// Workspace ID: brightcode-session-45\n// Edit variables below and click 'Compile & Sync' ⚡\n\nconst shape = "dodecahedron"; // torusknot | sphere | icosahedron | dodecahedron | octahedron\nconst speed = 1.2;            // 0.1 to 5.0\nconst color = "#9B5DE5";      // Any hex code\nconst wireframe = false;      // true | false`;
        break;
      case "octa-wire":
        targetCode = `// Bright Code Workspace v2.0\n// Workspace ID: brightcode-session-45\n// Edit variables below and click 'Compile & Sync' ⚡\n\nconst shape = "octahedron"; // torusknot | sphere | icosahedron | dodecahedron | octahedron\nconst speed = 2.5;          // 0.1 to 5.0\nconst color = "#06D6A0";    // Any hex code\nconst wireframe = true;     // true | false`;
        break;
      default:
        targetCode = initialCode;
    }
    setCodeText(targetCode);
    setCompileStatus("PENDING SYNC — click Compile & Sync");
  };

  return (
    <section id="lab" style={{ position: "relative", zIndex: 2, background: "linear-gradient(180deg, #060608 0%, #0A0A0E 100%)", borderTop: "1px solid var(--glass-border)" }}>
      <div className="grid-bg"></div>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="font-sans-title" style={{ color: "var(--color-red)", fontSize: "0.85rem" }}>03 / CREATIVE LAB</span>
          <BinaryHeading text="Bright Code Compiler" style={{ fontSize: "clamp(2.3rem, 5vw, 3.2rem)", marginTop: "0.5rem", justifyContent: "center" }} className="text-glow-cream" />
          <div className="accent-bar" style={{ margin: "1rem auto 0 auto" }}></div>
          <p style={{ maxWidth: "650px", margin: "1.5rem auto 0 auto", color: "var(--color-cream-dim)", fontSize: "0.95rem", lineHeight: "1.6" }}>
            A real-time workspace simulator based on Sachin's collaborative editor project **BrightCode**. Edit the Javascript variables inside the code editor pane to compile and morph the WebGL parameters live.
          </p>
        </div>

        {/* Workspace Panels Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.25fr 1fr",
          gap: "2.5rem",
          alignItems: "stretch"
        }} className="lab-grid">
          
          {/* LEFT PANEL: Monaco Code Editor */}
          <div 
            style={{ 
              background: "#08080c", 
              border: "1.5px solid var(--glass-border)",
              borderTop: "3.5px solid var(--color-red)",
              borderRadius: "14px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.65)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}
          >
            {/* Editor Window Header tab bar */}
            <div style={{ padding: "0.8rem 1.2rem", background: "rgba(0,0,0,0.4)", borderBottom: "1.5px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Terminal size={14} color="var(--color-red)" />
                <span style={{ fontSize: "0.72rem", fontFamily: "monospace", letterSpacing: "0.12em", color: "var(--color-cream-muted)", fontWeight: "600" }}>
                  brightcode-compiler // main.js
                </span>
              </div>
              {/* Window dots */}
              <div style={{ display: "flex", gap: "0.35rem" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
              </div>
            </div>

            {/* Presets and Compile Toolbar */}
            <div style={{ padding: "0.8rem 1.2rem", background: "rgba(255,255,255,0.01)", borderBottom: "1px solid rgba(255,255,255,0.03)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.8rem" }}>
              {/* Preset buttons */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }} className="preset-buttons">
                {[
                  { key: "torus-crimson", label: "🌀 Torus" },
                  { key: "wire-cyan",     label: "🕸️ Wireframe" },
                  { key: "sphere-gold",   label: "🟡 Sphere" },
                  { key: "dodeca-purple", label: "💜 Dodeca" },
                  { key: "octa-wire",     label: "🟢 Octahedron" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    style={{
                      fontSize: "0.68rem",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--color-cream-dim)",
                      padding: "0.32rem 0.55rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)"
                    }}
                    className="preset-btn clickable"
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Compile Button */}
              <button
                onClick={handleCompile}
                disabled={isCompiling}
                style={{
                  background: "var(--color-red)",
                  color: "var(--color-cream)",
                  border: "none",
                  padding: "0.45rem 1.1rem",
                  borderRadius: "6px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: isCompiling ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "0 0 15px var(--color-red-glow)",
                  opacity: isCompiling ? 0.7 : 1
                }}
                className="compile-btn clickable"
              >
                <Play size={12} fill="currentColor" /> Compile &amp; Sync
              </button>
            </div>

            {/* Monaco Textarea Block */}
            <div style={{ position: "relative", flex: 1, display: "flex" }}>
              
              {/* Line numbers track */}
              <div style={{
                background: "rgba(0,0,0,0.3)",
                borderRight: "1px solid rgba(255,255,255,0.03)",
                padding: "1.2rem 0.6rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "0.38rem",
                color: "rgba(255,255,255,0.12)",
                fontFamily: "monospace",
                fontSize: "0.8rem",
                userSelect: "none",
                minWidth: "36px"
              }}>
                {Array.from({ length: 11 }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              {/* Editor Textarea - fully editable, Ctrl+S compiles */}
              <textarea
                value={codeText}
                onChange={(e) => setCodeText(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  resize: "none",
                  outline: "none",
                  padding: "1.2rem 1.0rem",
                  color: "var(--color-cream)",
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  lineHeight: "1.5",
                  minHeight: "220px",
                  caretColor: "var(--color-red)",
                }}
              />
            </div>

            {/* Log / Diagnostic Terminal Output */}
            <div style={{ 
              background: "rgba(0,0,0,0.65)", 
              borderTop: "1.5px solid var(--glass-border)", 
              padding: "1rem 1.2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem"
            }}>
              {/* Terminal Titlebar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.62rem", fontFamily: "monospace", color: "var(--color-red)", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-red)", display: "inline-block" }}></span>
                  DIAGNOSTICS_LOG
                </span>
                <span style={{ fontSize: "0.62rem", fontFamily: "monospace", color: compileStatus.includes("ERROR") ? "var(--color-red)" : "rgba(255,255,255,0.3)" }}>
                  STATUS: {compileStatus}
                </span>
              </div>

              {/* Ticker logs items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {logMessages.map((msg, idx) => (
                  <div key={idx} style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "var(--color-cream-muted)", lineHeight: "1.4" }}>
                    <span style={{ color: "rgba(255,255,255,0.15)", marginRight: "0.4rem" }}>[{idx + 1}]</span>
                    {msg}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: WebGL Compiler Visualizer */}
          <div 
            style={{ 
              background: "#08080c", 
              border: "1.5px solid var(--glass-border)",
              borderRadius: "14px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Visualizer header */}
            <div style={{ padding: "0.8rem 1.2rem", background: "rgba(0,0,0,0.4)", borderBottom: "1.5px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Layers size={14} color="var(--color-red)" />
                <span style={{ fontSize: "0.72rem", fontFamily: "monospace", letterSpacing: "0.12em", color: "var(--color-cream-muted)", fontWeight: "600" }}>
                  WebGL Output Compiler
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.3rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#444" }}></span>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#444" }}></span>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-red)" }}></span>
              </div>
            </div>

            {/* Three.js R3F Canvas Container */}
            <div style={{ flex: 1, minHeight: "300px", position: "relative" }}>
              <ThreeCanvas>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.8} color="#ffffff" />
                <pointLight position={[-8, -5, 4]} intensity={0.8} color="#E63946" />
                <pointLight position={[0, 8, -8]} intensity={0.5} color="#00F5D4" />
                <directionalLight position={[-5, 5, 2]} intensity={0.8} />
                <MorphingMesh 
                  speed={speed} 
                  scale={scale} 
                  wireframe={wireframe} 
                  geometry={geometry} 
                  color={color} 
                />
              </ThreeCanvas>

              {/* Status Tags overlay */}
              <div style={{
                position: "absolute",
                bottom: "1.2rem",
                left: "1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                pointerEvents: "none"
              }}>
                <span style={{
                  fontSize: "0.62rem",
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--color-cream-muted)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontFamily: "monospace"
                }}>
                  geometry: <span style={{ color: "var(--color-red)", fontWeight: "bold" }}>{geometry}</span>
                </span>
                <span style={{
                  fontSize: "0.62rem",
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--color-cream-muted)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontFamily: "monospace"
                }}>
                  speed: <span style={{ color: "var(--color-red)", fontWeight: "bold" }}>{speed.toFixed(1)}x</span>
                </span>
                <span style={{
                  fontSize: "0.62rem",
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--color-cream-muted)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontFamily: "monospace"
                }}>
                  color: <span style={{ color: "var(--color-cream)", fontWeight: "bold" }}>{color}</span>
                </span>
                <span style={{
                  fontSize: "0.62rem",
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--color-cream-muted)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontFamily: "monospace"
                }}>
                  wireframe: <span style={{ color: "var(--color-red)", fontWeight: "bold" }}>{wireframe.toString()}</span>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .lab-grid {
            grid-template-columns: 1fr !important;
            gap: 2.0rem !important;
          }
        }
        .preset-btn:hover {
          border-color: var(--color-red) !important;
          color: var(--color-red) !important;
          background: rgba(230, 57, 70, 0.04) !important;
        }
        .compile-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.15);
        }
      `}</style>
    </section>
  );
}
