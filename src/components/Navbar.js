"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, GitBranch, Bell, Settings, Circle } from "lucide-react";
import { useTheme } from "./ThemeContext";
import dynamic from "next/dynamic";

const ThemeSettings = dynamic(() => import("./ThemeSettings"), { ssr: false });

const IDE_TABS = [
  { name: "home.tsx",          href: "#home",            icon: "[H]" },
  { name: "experience-map.md", href: "#experience-map",  icon: "[M]" },
  { name: "recruiter.md",      href: "#recruiter",       icon: "[R]" },
  { name: "pull-requests.md",  href: "#pull-requests",   icon: "[P]" },
  { name: "commit-story.log",  href: "#commit-story",    icon: "[C]" },
  { name: "notes.md",          href: "#notes",           icon: "[N]" },
  { name: "contact.tsx",       href: "#contact",         icon: "[+]" },
];

const RPG_TABS = [
  { name: "character.rpg",   href: "#home",         icon: "🧙" },
  { name: "quest-log.rpg",   href: "#pull-requests",icon: "⚔️" },
  { name: "skill-tree.rpg",  href: "#experience-map",  icon: "🌳" },
  { name: "contact.rpg",     href: "#contact",      icon: "📜" },
];

const OS_TABS = [
  { name: "Desktop",         href: "#home",         icon: "🖥️" },
  { name: "Finder",          href: "#home",         icon: "📁" },
  { name: "Terminal",        href: "#home",         icon: "⬛" },
];

const GALLERY_TABS = [
  { name: "index.html",      href: "#home",         icon: "🖼️" },
  { name: "collection.html", href: "#pull-requests",icon: "📐" },
  { name: "catalogue.html",  href: "#experience-map",  icon: "📚" },
  { name: "contact.html",    href: "#contact",      icon: "✉️" },
];

const THEME_TABS = { ide:IDE_TABS, rpg:RPG_TABS, os:OS_TABS, gallery:GALLERY_TABS };

const THEME_META = {
  ide:     { bg:"#1A1014", border:"rgba(61,37,48,0.8)",    c1:"#C8506A", c2:"#E8A0A8", c3:"#8AAECC", title:"portfolio — Visual Studio Code" },
  rpg:     { bg:"#0A0818", border:"rgba(255,215,0,0.2)",   c1:"#FFD700", c2:"#C084FC", c3:"#4ADE80", title:"sachin-yadav — RPG Interface"   },
  os:      { bg:"rgba(30,40,55,0.95)", border:"rgba(255,255,255,0.08)", c1:"#FF5F57", c2:"#FEBC2E", c3:"#28C840", title:"sachin-yadav — macOS" },
  gallery: { bg:"#1A1A1A", border:"rgba(255,255,255,0.08)",c1:"#888",   c2:"#AAA",   c3:"#CCC",   title:"Sachin Yadav — Portfolio Archive" },
};

export default function Navbar({ audio }) {
  const { theme } = useTheme();
  const [activeTab,      setActiveTab]      = useState(theme === "rpg" ? "character.rpg" : "home.tsx");
  const [isOpen,         setIsOpen]         = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [settingsOpen,   setSettingsOpen]   = useState(false);

  const tabs = theme === "rpg" ? RPG_TABS : IDE_TABS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = tabs
      .map((tab) => ({ tab, element: document.getElementById(tab.href.slice(1)) }))
      .filter(({ element }) => element);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      const match = sections.find(({ element }) => element === visible.target);
      if (match) setActiveTab(match.tab.name);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });

    sections.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, [tabs]);

  // Title bar background adapts per theme
  const titleBg   = theme === "rpg" ? "#0A0818"           : "#1A1014";
  const titleBorder = theme === "rpg" ? "rgba(255,215,0,0.2)" : "rgba(61,37,48,0.8)";
  const logo1 = theme === "rpg" ? "#FFD700" : "#C8506A";
  const logo2 = theme === "rpg" ? "#C084FC" : "#E8A0A8";
  const logo3 = theme === "rpg" ? "#4ADE80" : "#8AAECC";
  const centerTitle = theme === "rpg" ? "sachin-yadav — RPG Interface" : "portfolio — Visual Studio Code";

  return (
    <>
      <header style={{
        position:"fixed", top:0, left:0, width:"100%", zIndex:200,
        display:"flex", flexDirection:"column",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.6)" : "none",
      }}>
        {/* ── Title Bar ── */}
        <div style={{
          background:titleBg, borderBottom:`1px solid ${titleBorder}`,
          height:"44px", display:"flex", alignItems:"center",
          justifyContent:"space-between", padding:"0 1rem", gap:"1rem",
        }}>
          {/* Left */}
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", flexShrink:0 }}>
            <a href="#home" onMouseEnter={() => audio?.playHover()}
              onClick={() => { audio?.playClick(); setActiveTab(tabs[0].name); }}
              style={{ display:"flex", alignItems:"center", gap:"0.5rem", textDecoration:"none" }}>
              <div style={{ display:"flex", gap:"2px", flexShrink:0 }}>
                <div style={{ width:10, height:10, background:logo1, borderRadius:"2px" }}/>
                <div style={{ width:10, height:10, background:logo2, borderRadius:"2px" }}/>
                <div style={{ width:10, height:10, background:logo3, borderRadius:"2px" }}/>
              </div>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.78rem", fontWeight:700,
                color:"var(--color-fg)", letterSpacing:"0.04em" }}>
                sachin-yadav
              </span>
            </a>
            <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", color:"var(--color-comment)",
              fontFamily:"var(--font-mono)", fontSize:"0.68rem" }} className="desktop-nav">
              <GitBranch size={11}/>
              <span>main</span>
            </div>
          </div>

          {/* Center */}
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--color-fg-muted)",
            letterSpacing:"0.02em", userSelect:"none" }} className="desktop-nav">
            {centerTitle}
          </div>

          {/* Right */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }} className="desktop-nav">
              <Bell size={14} color="var(--color-comment)" style={{ cursor:"pointer", opacity:0.7 }}/>
              {/* Settings — opens theme picker */}
              <button onClick={() => { setSettingsOpen(true); audio?.playClick(); }}
                onMouseEnter={() => audio?.playHover()}
                title="Color Theme"
                style={{ background:"none", border:"none", cursor:"pointer", display:"flex",
                  padding:"0.2rem", borderRadius:"3px", transition:"background .15s",
                  color:"var(--color-comment)" }}
                className="settings-btn">
                <Settings size={14}/>
              </button>
            </div>
            {/* Window dots */}
            <div style={{ display:"flex", gap:"5px" }} className="desktop-nav">
              <div style={{ width:12, height:12, borderRadius:"50%", background:"#FF5F57" }}/>
              <div style={{ width:12, height:12, borderRadius:"50%", background:"#FEBC2E" }}/>
              <div style={{ width:12, height:12, borderRadius:"50%", background:"#28C840" }}/>
            </div>
            {/* Mobile */}
            <button onClick={() => { setIsOpen(!isOpen); audio?.playClick(); }}
              onMouseEnter={() => audio?.playHover()}
              style={{ display:"none", background:"var(--color-wine-dim)", border:"1px solid var(--glass-border)",
                color:"var(--color-fg)", cursor:"pointer", padding:"0.4rem", borderRadius:"4px" }}
              className="mobile-toggle">
              {isOpen ? <X size={16}/> : <Menu size={16}/>}
            </button>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="ide-tab-bar">
          {tabs.map(tab => (
            <a key={tab.name} href={tab.href}
              className={`ide-tab${activeTab===tab.name ? " active" : ""}`}
              onMouseEnter={() => audio?.playHover()}
              onClick={() => { audio?.playClick(); setActiveTab(tab.name); }}>
              <span style={{ fontSize:"0.6rem", opacity:0.75 }}>{tab.icon}</span>
              {tab.name}
              {tab.name === tabs[0].name && (
                <Circle size={6} fill="var(--color-fg-muted)" color="var(--color-fg-muted)"/>
              )}
            </a>
          ))}
          <div style={{ flex:1, borderBottom:"1px solid var(--border-subtle)" }}/>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div style={{ background:"var(--color-bg-card)", borderBottom:"1px solid var(--border-subtle)" }}>
            <div style={{ padding:"0.75rem 0" }}>
              {tabs.map(tab => (
                <a key={tab.name} href={tab.href}
                  onClick={() => { setIsOpen(false); setActiveTab(tab.name); audio?.playClick(); }}
                  onMouseEnter={() => audio?.playHover()}
                  className="ide-tree-item" style={{ display:"flex", padding:"0.6rem 1.5rem" }}>
                  <span style={{ marginRight:"0.5rem" }}>{tab.icon}</span>
                  {tab.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Theme Settings Modal */}
      {settingsOpen && (
        <ThemeSettings onClose={() => setSettingsOpen(false)} audio={audio}/>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav   { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        .settings-btn:hover { background: var(--color-bg-elevated) !important; color: var(--color-wine) !important; }
      `}</style>
    </>
  );
}


