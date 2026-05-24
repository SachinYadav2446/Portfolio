"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link, ExternalLink, Code, Trophy } from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: <Link size={24} />, url: "https://github.com/SachinYadav2446" },
  { name: "LeetCode", icon: <Code size={24} />, url: "https://leetcode.com/u/SY_45/" },
  { name: "CodeChef", icon: <Trophy size={24} />, url: "https://www.codechef.com/users/ms240410700001" },
  { name: "LinkedIn", icon: <ExternalLink size={24} />, url: "https://www.linkedin.com/in/sachin-yadav-54646a322/" },
];

export default function SocialStrip() {
  const stripRef = useRef(null);

  return (
    <section
      style={{
        background: "#060608",
        padding: "1rem 0",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        ref={stripRef}
        style={{
          display: "flex",
          animation: "scroll 20s linear infinite",
          width: "max-content"
        }}
      >
        {[...socialLinks, ...socialLinks, ...socialLinks].map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 2rem",
              color: "var(--color-cream)",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              cursor: "pointer"
            }}
          >
            <div style={{ color: "var(--color-red)" }}>
              {link.icon}
            </div>
            {link.name}
          </a>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </section>
  );
}
