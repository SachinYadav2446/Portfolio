"use client";

import React, { useEffect, useState } from "react";
import { Brain, Code2, ExternalLink, GitBranch, GitFork, RefreshCw, Server, Star } from "lucide-react";

const TRACKS = {
  "ml-dl": {
    label: "ML / Deep Learning",
    icon: Brain,
    accent: "#8AAECC",
    summary: "Model development, data pipelines, experimentation, and production-minded evaluation.",
    strengths: ["Python and data structures", "PyTorch and model experimentation", "Data preparation and evaluation", "Systems-oriented ML thinking"],
    evidence: ["Machine-learning project work", "Algorithmic problem solving", "Full-stack delivery experience"],
  },
  frontend: {
    label: "Frontend Engineering",
    icon: Code2,
    accent: "#E8A0A8",
    summary: "Polished, accessible product interfaces with thoughtful motion, responsive design, and fast feedback loops.",
    strengths: ["React and Next.js", "Responsive interface systems", "Interactive data-rich experiences", "Performance-aware UI implementation"],
    evidence: ["Multi-mode portfolio interface", "Reusable component architecture", "Production Next.js deployment"],
  },
  backend: {
    label: "Backend Engineering",
    icon: Server,
    accent: "#7BAE8A",
    summary: "Reliable application foundations: APIs, data modelling, service design, and practical deployment workflows.",
    strengths: ["API and service development", "Python, Node.js, and Go", "Database and cloud fundamentals", "Debugging and systems design"],
    evidence: ["End-to-end project delivery", "API integration experience", "AWS and Docker familiarity"],
  },
};

const formatDate = (date) => new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(date));

export default function RecruiterMode({ audio }) {
  const [track, setTrack] = useState("ml-dl");
  const [github, setGithub] = useState(null);
  const [status, setStatus] = useState("loading");
  const current = TRACKS[track];

  const loadGithub = async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/github");
      if (!response.ok) throw new Error("GitHub unavailable");
      setGithub(await response.json());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { loadGithub(); }, []);

  return (
    <section id="recruiter" style={{ background:"var(--color-bg)", borderTop:"1px solid var(--border-subtle)", padding:"6rem 0" }}>
      <div className="container">
        <div style={{ display:"flex", gap:"1.25rem", justifyContent:"space-between", alignItems:"end", flexWrap:"wrap", marginBottom:"2rem" }}>
          <div>
            <div className="font-sans-title" style={{ color:"var(--color-wine)", marginBottom:"0.65rem" }}>RECRUITER MODE / ROLE FIT</div>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3.5rem)", margin:0 }}>Find the right <span style={{ color:"var(--color-rose)" }}>signal.</span></h2>
            <p style={{ maxWidth:640, margin:"0.85rem 0 0" }}>Choose the role you are hiring for to see the most relevant strengths and evidence.</p>
          </div>
          <a href="mailto:yadavsachin2446@gmail.com?subject=Portfolio%20opportunity" className="btn-primary" style={{ textDecoration:"none", padding:"0.7rem 1rem", fontSize:"0.72rem" }}>Start a conversation</a>
        </div>

        <div role="tablist" aria-label="Role focus" style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap", marginBottom:"1.25rem" }}>
          {Object.entries(TRACKS).map(([key, item]) => {
            const Icon = item.icon;
            const active = key === track;
            return <button key={key} role="tab" aria-selected={active} onClick={() => { setTrack(key); audio?.playClick(); }} onMouseEnter={() => audio?.playHover()}
              style={{ display:"flex", alignItems:"center", gap:"0.45rem", background:active ? "var(--color-bg-elevated)" : "transparent", color:active ? "var(--color-cream)" : "var(--color-cream-muted)", border:`1px solid ${active ? item.accent : "var(--border-subtle)"}`, borderRadius:5, padding:"0.55rem 0.8rem", cursor:"pointer", fontFamily:"var(--font-mono)", fontSize:"0.7rem" }}>
              <Icon size={14} color={active ? item.accent : "currentColor"}/>{item.label}
            </button>;
          })}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1.1fr) minmax(280px,0.9fr)", gap:"1rem" }} className="recruiter-grid">
          <article className="glass-card" style={{ padding:"1.5rem", borderTop:`2px solid ${current.accent}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.8rem" }}><current.icon size={18} color={current.accent}/><span className="font-sans-title" style={{ color:current.accent }}>{current.label}</span></div>
            <p style={{ margin:"0 0 1.25rem", fontSize:"1rem" }}>{current.summary}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }} className="recruiter-detail-grid">
              <div><div className="font-sans-title" style={{ marginBottom:"0.55rem" }}>Core strengths</div>{current.strengths.map((strength) => <div key={strength} style={{ padding:"0.42rem 0", borderTop:"1px solid var(--border-subtle)", color:"var(--color-fg-dim)", fontSize:"0.83rem" }}>{strength}</div>)}</div>
              <div><div className="font-sans-title" style={{ marginBottom:"0.55rem" }}>Relevant evidence</div>{current.evidence.map((item) => <div key={item} style={{ padding:"0.42rem 0", borderTop:"1px solid var(--border-subtle)", color:"var(--color-fg-dim)", fontSize:"0.83rem" }}>{item}</div>)}</div>
            </div>
          </article>

          <article className="glass-card" style={{ padding:"1.5rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", gap:"1rem", alignItems:"center", marginBottom:"0.9rem" }}><div style={{ display:"flex", alignItems:"center", gap:"0.45rem" }}><GitBranch size={18} color="var(--color-cream)"/><span className="font-sans-title">Live GitHub profile</span></div><button onClick={loadGithub} aria-label="Refresh GitHub data" style={{ background:"none", border:0, color:"var(--color-comment)", cursor:"pointer", display:"flex" }}><RefreshCw size={14}/></button></div>
            {status === "loading" && <p style={{ margin:0, color:"var(--color-comment)", fontFamily:"var(--font-mono)", fontSize:"0.75rem" }}>Loading public activity...</p>}
            {status === "error" && <p style={{ margin:0, color:"var(--color-cream-muted)", fontSize:"0.85rem" }}>GitHub is temporarily unavailable. <a href="https://github.com/SachinYadav2446" target="_blank" rel="noreferrer" style={{ color:"var(--color-rose)" }}>View the profile directly</a>.</p>}
            {status === "ready" && github?.profile && <>
              <div style={{ display:"flex", gap:"0.75rem", alignItems:"center" }}>
                <img src={github.profile.avatarUrl} alt="Sachin Yadav GitHub avatar" width={46} height={46} style={{ borderRadius:"50%", border:"1px solid var(--glass-border)" }}/>
                <div><a href={github.profile.url} target="_blank" rel="noreferrer" style={{ color:"var(--color-cream)", fontWeight:700, textDecoration:"none" }}>{github.profile.name || github.profile.login} <ExternalLink size={12} style={{ verticalAlign:"middle" }}/></a><div style={{ color:"var(--color-comment)", fontFamily:"var(--font-mono)", fontSize:"0.68rem", marginTop:3 }}>@{github.profile.login}</div></div>
              </div>
              <div style={{ display:"flex", gap:"1rem", marginTop:"1rem", paddingTop:"0.85rem", borderTop:"1px solid var(--border-subtle)", fontFamily:"var(--font-mono)", fontSize:"0.68rem", color:"var(--color-cream-muted)" }}><span><b style={{ color:"var(--color-cream)" }}>{github.profile.publicRepos}</b> repos</span><span><b style={{ color:"var(--color-cream)" }}>{github.profile.followers}</b> followers</span></div>
            </>}
          </article>
        </div>

        {status === "ready" && github?.repositories?.length > 0 && <div style={{ marginTop:"1rem" }}><div className="font-sans-title" style={{ margin:"0 0 0.65rem" }}>Selected public repositories / live from GitHub</div><div style={{ display:"grid", gridTemplateColumns:"repeat(3, minmax(0, 1fr))", gap:"0.75rem" }} className="repo-grid">{github.repositories.map((repository) => <a key={repository.id} href={repository.url} target="_blank" rel="noreferrer" onMouseEnter={() => audio?.playHover()} className="glass-card" style={{ padding:"1rem", textDecoration:"none", minHeight:150, display:"flex", flexDirection:"column" }}><div style={{ display:"flex", justifyContent:"space-between", gap:"0.5rem", color:"var(--color-cream)", fontFamily:"var(--font-mono)", fontSize:"0.78rem", fontWeight:700 }}><span>{repository.name}</span><ExternalLink size={13}/></div><p style={{ margin:"0.65rem 0", fontSize:"0.78rem", lineHeight:1.55, color:"var(--color-cream-muted)", flex:1 }}>{repository.description || "Public project repository"}</p><div style={{ display:"flex", gap:"0.65rem", color:"var(--color-comment)", fontFamily:"var(--font-mono)", fontSize:"0.62rem" }}><span>{repository.language || "Code"}</span><span><Star size={11} style={{ verticalAlign:"middle" }}/> {repository.stars}</span><span><GitFork size={11} style={{ verticalAlign:"middle" }}/> {repository.forks}</span><span>{formatDate(repository.updatedAt)}</span></div></a>)}</div></div>}
      </div>
    </section>
  );
}