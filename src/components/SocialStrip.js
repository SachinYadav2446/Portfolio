"use client";

import React from "react";
import { Link, ExternalLink, Code, Trophy } from "lucide-react";

const socialLinks = [
  { name: "github.com/SachinYadav2446",                icon: <Link size={13} />,        url: "https://github.com/SachinYadav2446",                     color: "var(--color-purple)" },
  { name: "leetcode.com/u/SY_45",                      icon: <Code size={13} />,        url: "https://leetcode.com/u/SY_45/",                          color: "var(--color-orange)" },
  { name: "codechef.com/users/ms240410700001",          icon: <Trophy size={13} />,      url: "https://www.codechef.com/users/ms240410700001",           color: "var(--color-yellow)" },
  { name: "linkedin.com/in/sachin-yadav-54646a322",    icon: <ExternalLink size={13} />,url: "https://www.linkedin.com/in/sachin-yadav-54646a322/",    color: "var(--color-cyan)"   },
];

export default function SocialStrip({ audio }) {
  const items = [...socialLinks, ...socialLinks, ...socialLinks];

  return (
    <div
      style={{
        background: "var(--color-bg-card)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "0.6rem 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0, width: "80px",
          background: "linear-gradient(to right, var(--color-bg-card), transparent)",
          zIndex: 2, pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0, width: "80px",
          background: "linear-gradient(to left, var(--color-bg-card), transparent)",
          zIndex: 2, pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          animation: "strip-scroll 24s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => audio?.playHover()}
            onClick={() => audio?.playClick()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 1.8rem",
              color: "var(--color-fg-muted)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.02em",
              transition: "color 0.2s",
              borderRight: "1px solid var(--border-subtle)",
            }}
            className="strip-link"
          >
            <span style={{ color: link.color }}>{link.icon}</span>
            <span>{link.name}</span>
          </a>
        ))}
      </div>

      <style jsx>{`
        @keyframes strip-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
        .strip-link:hover {
          color: var(--color-fg) !important;
        }
      `}</style>
    </div>
  );
}
