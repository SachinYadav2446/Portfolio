"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Mail, MapPin, Link, ExternalLink, Code, Send } from "lucide-react";

const initLines = [
  { prompt: true,  text: " ssh sachin@portfolio.dev", color: "var(--color-fg)" },
  { prompt: false, text: "Connecting to portfolio.dev... done.", color: "var(--color-green)" },
  { prompt: false, text: "Welcome, Sachin Yadav. Type 'help' for commands.", color: "var(--color-cyan)" },
  { prompt: false, text: "", color: "" },
];

const commands = {
  help: [
    { text: "Available commands:", color: "var(--color-cyan)" },
    { text: "  email    – Open email client", color: "var(--color-fg-dim)" },
    { text: "  github   – Visit GitHub profile", color: "var(--color-fg-dim)" },
    { text: "  linkedin – Visit LinkedIn profile", color: "var(--color-fg-dim)" },
    { text: "  leetcode – Visit LeetCode profile", color: "var(--color-fg-dim)" },
    { text: "  about    – Show quick bio", color: "var(--color-fg-dim)" },
    { text: "  clear    – Clear terminal", color: "var(--color-fg-dim)" },
  ],
  email: [
    { text: "Opening mail client...", color: "var(--color-comment)" },
    { text: "→ yadavsachin2446@gmail.com", color: "var(--color-cyan)", link: "mailto:yadavsachin2446@gmail.com" },
  ],
  github: [
    { text: "Opening GitHub...", color: "var(--color-comment)" },
    { text: "→ github.com/SachinYadav2446", color: "var(--color-purple)", link: "https://github.com/SachinYadav2446" },
  ],
  linkedin: [
    { text: "Opening LinkedIn...", color: "var(--color-comment)" },
    { text: "→ linkedin.com/in/sachin-yadav-54646a322", color: "var(--color-cyan)", link: "https://www.linkedin.com/in/sachin-yadav-54646a322/" },
  ],
  leetcode: [
    { text: "Opening LeetCode...", color: "var(--color-comment)" },
    { text: "→ leetcode.com/u/SY_45", color: "var(--color-orange)", link: "https://leetcode.com/u/SY_45/" },
  ],
  about: [
    { text: "Name:     Sachin Yadav",         color: "var(--color-fg-dim)" },
    { text: "Role:     Full-Stack & ML Eng",  color: "var(--color-purple)" },
    { text: "Year:     2nd Year CS Student",  color: "var(--color-fg-dim)" },
    { text: "Location: Bangalore, India",      color: "var(--color-cyan)"   },
    { text: "Status:   Open to internships",  color: "var(--color-green)"  },
  ],
};

function TerminalLine({ line }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", minHeight: "1.5em" }}>
      {line.prompt && (
        <>
          <span style={{ color: "var(--color-green)", fontWeight: 700 }}>sachin@portfolio</span>
          <span style={{ color: "var(--color-purple)" }}>:</span>
          <span style={{ color: "var(--color-cyan)" }}>~</span>
          <span style={{ color: "var(--color-fg)" }}>$</span>
        </>
      )}
      {line.link ? (
        <a
          href={line.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: line.color,
            textDecoration: "underline",
            textDecorationColor: `${line.color}66`,
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
          }}
        >
          {line.text}
        </a>
      ) : (
        <span style={{ color: line.color || "var(--color-fg-dim)" }}>{line.text}</span>
      )}
    </div>
  );
}

function InteractiveTerminal({ audio }) {
  const [lines, setLines] = useState(initLines);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const userLine = { prompt: true, text: ` ${cmd}`, color: "var(--color-fg)" };

    if (cmd === "clear") {
      setLines(initLines);
      setInput("");
      return;
    }

    const response = commands[cmd] || [
      { text: `bash: ${cmd}: command not found. Type 'help'.`, color: "var(--color-red)" },
    ];

    // Auto-open links
    const linkLine = response.find(l => l.link);
    if (linkLine) window.open(linkLine.link, "_blank");

    setLines(prev => [...prev, userLine, ...response, { prompt: false, text: "", color: "" }]);
    setInput("");
    audio?.playClick();

    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div
      style={{
        background: "var(--color-bg-darker)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "6px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "360px",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal title bar */}
      <div
        style={{
          background: "var(--color-bg-elevated)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "0.5rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--color-comment)",
            flex: 1,
            textAlign: "center",
          }}
        >
          bash — sachin@portfolio — 80×24
        </span>
      </div>

      {/* Output */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.75rem 1rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          lineHeight: 1.65,
          display: "flex",
          flexDirection: "column",
          gap: "0.1rem",
        }}
      >
        {lines.map((line, i) => <TerminalLine key={i} line={line} />)}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 1rem",
            gap: "0.4rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
          }}
        >
          <span style={{ color: "var(--color-green)", fontWeight: 700, flexShrink: 0 }}>sachin@portfolio</span>
          <span style={{ color: "var(--color-purple)", flexShrink: 0 }}>:</span>
          <span style={{ color: "var(--color-cyan)", flexShrink: 0 }}>~</span>
          <span style={{ color: "var(--color-fg)", flexShrink: 0 }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => audio?.playHover()}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--color-fg)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              caretColor: "var(--color-pink)",
            }}
            autoComplete="off"
            spellCheck={false}
            placeholder="type 'help'…"
          />
        </div>
      </form>
    </div>
  );
}

export default function Contact({ audio }) {
  const quickLinks = [
    { label: "yadavsachin2446@gmail.com", href: "mailto:yadavsachin2446@gmail.com", icon: <Mail size={14} />, color: "var(--color-pink)"   },
    { label: "github.com/SachinYadav2446",href: "https://github.com/SachinYadav2446", icon: <Link size={14} />,color: "var(--color-purple)" },
    { label: "LinkedIn Profile",          href: "https://www.linkedin.com/in/sachin-yadav-54646a322/", icon: <ExternalLink size={14} />, color: "var(--color-cyan)" },
    { label: "LeetCode / SY_45",         href: "https://leetcode.com/u/SY_45/", icon: <Code size={14} />, color: "var(--color-orange)" },
  ];

  return (
    <section
      id="contact"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--border-subtle)",
        padding: 0,
      }}
    >
      {/* Tab bar */}
      <div className="ide-tab-bar">
        <div className="ide-tab active">
          <Terminal size={12} />
          contact.tsx
        </div>
        <div style={{ flex: 1, borderBottom: "1px solid var(--border-subtle)" }} />
      </div>

      {/* Main content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 0,
          minHeight: "500px",
        }}
        className="contact-grid"
      >
        {/* Left: info */}
        <div
          style={{
            borderRight: "1px solid var(--border-subtle)",
            padding: "3rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Heading */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-comment)",
                marginBottom: "0.5rem",
              }}
            >
              04 / CONTACT
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "var(--color-fg)",
                marginBottom: "1rem",
              }}
            >
              Let&apos;s{" "}
              <span style={{ color: "var(--color-pink)" }}>Build</span>{" "}
              Something Cool
            </h2>
            <div className="accent-bar" />
            <p style={{ color: "var(--color-fg-muted)", lineHeight: 1.7, fontSize: "0.9rem" }}>
              I&apos;m actively seeking software engineering internships and open-source collaborations.
              Whether it&apos;s full-stack web apps, ML pipelines, or system design —
              if you have an exciting idea, let&apos;s connect.
            </p>
          </div>

          {/* Quick links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {quickLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                onMouseEnter={() => audio?.playHover()}
                onClick={() => audio?.playClick()}
                whileHover={{ x: 4 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.65rem 1rem",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderLeft: `3px solid ${link.color}`,
                  borderRadius: "0 4px 4px 0",
                  textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  color: "var(--color-fg-muted)",
                }}
                className="contact-link"
              >
                <span style={{ color: link.color, flexShrink: 0 }}>{link.icon}</span>
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-comment)",
            }}
          >
            <MapPin size={13} color="var(--color-green)" />
            <span>Bangalore, India</span>
            <span style={{ marginLeft: "1rem", color: "var(--color-green)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <div className="activity-dot" style={{ width: 6, height: 6 }} />
              Available
            </span>
          </div>
        </div>

        {/* Right: interactive terminal */}
        <div
          style={{
            padding: "3rem 2.5rem",
            background: "var(--color-bg-card)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--color-comment)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Terminal size={11} />
            Interactive terminal — try typing <code style={{ color: "var(--color-green)", padding: "0 0.3rem" }}>help</code>
          </div>
          <InteractiveTerminal audio={audio} />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: "var(--color-bg-darker)",
          borderTop: "1px solid var(--border-subtle)",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          color: "var(--color-comment)",
        }}
      >
        <span>© 2026 Sachin Yadav. All rights reserved.</span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          Built with <span style={{ color: "var(--color-pink)" }}>♥</span> using Next.js + Three.js
        </span>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        .contact-link:hover {
          background: var(--color-bg-elevated) !important;
        }
      `}</style>
    </section>
  );
}
