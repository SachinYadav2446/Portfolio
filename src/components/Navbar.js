"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        background: "rgba(6, 6, 8, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(230, 57, 70, 0.2)"
      }}
    >
      <div className="container" style={{ position: "relative" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.8rem 0",
          gap: "2rem"
        }}>
          
          {/* Left Side: Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }} className="clickable">
              <div style={{
                position: "relative",
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, var(--color-red) 0%, #8B0000 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px var(--color-red-glow)",
                flexShrink: 0
              }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.05em" }}>SY</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
                <span 
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: "var(--color-cream)",
                    textTransform: "uppercase"
                  }}
                >
                  SACHIN<span style={{ color: "var(--color-red)" }}>.</span>DEV
                </span>
                <span style={{
                  fontFamily: "monospace",
                  fontSize: "0.55rem",
                  color: "var(--color-cream-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase"
                }}>
                  Full-Stack Engineer
                </span>
              </div>
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="desktop-nav">
            {links.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: "var(--color-cream-dim)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  transition: "all 0.3s ease",
                  padding: "0.6rem 1rem",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  background: "transparent",
                  border: "1px solid transparent"
                }}
                className="nav-link clickable"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Side: Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: "none",
                background: "rgba(230, 57, 70, 0.1)",
                border: "1px solid rgba(230, 57, 70, 0.3)",
                color: "var(--color-cream)",
                cursor: "pointer",
                padding: "0.6rem",
                borderRadius: "6px",
                transition: "all 0.3s ease"
              }}
              className="mobile-toggle clickable"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div
          style={{
            background: "rgba(6, 6, 8, 0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(230, 57, 70, 0.3)"
          }}
        >
          <div className="container" style={{ padding: "1.5rem 0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {links.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    textDecoration: "none",
                    color: "var(--color-cream-dim)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "0.8rem 1rem",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid transparent"
                  }}
                  className="mobile-nav-link clickable"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary clickable"
                style={{ 
                  justifyContent: "center", 
                  marginTop: "0.5rem", 
                  padding: "0.8rem",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--color-red);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover {
          color: var(--color-cream) !important;
          background: rgba(230, 57, 70, 0.1) !important;
          border-color: rgba(230, 57, 70, 0.3) !important;
        }
        .nav-link:hover::after {
          width: 80%;
        }
        
        .mobile-nav-link:hover {
          color: var(--color-cream) !important;
          background: rgba(230, 57, 70, 0.1) !important;
          border-color: rgba(230, 57, 70, 0.3) !important;
        }
      `}</style>
    </header>
  );
}
