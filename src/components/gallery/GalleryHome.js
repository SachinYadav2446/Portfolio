"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";

const EXHIBITS = [
  {
    num:"001", year:"2024", medium:"React · Socket.IO · Node.js",
    title:"Bright Code",
    subtitle:"Real-Time Collaborative IDE",
    desc:"A full-stack collaborative development environment supporting live multi-user code synchronization. Explores the intersection of real-time systems and human-computer interaction.",
    tags:["Real-Time","Full-Stack","WebSockets"],
    live:"https://brightcode-client.onrender.com/",
    accent:"#1A1A1A",
  },
  {
    num:"002", year:"2024", medium:"FastAPI · Python · Leaflet · AWS",
    title:"DemandSight",
    subtitle:"Geospatial Fleet Analytics",
    desc:"An intelligent geographic portal mapping urban transportation demand. Forecasts high-occupancy zones using statistical time-series modelling deployed on cloud infrastructure.",
    tags:["Machine Learning","Geospatial","Cloud"],
    live:"https://frontend.doh8i8audx0xv.amplifyapp.com/",
    gh:"https://github.com/SachinYadav2446/Taxi-Demand-Forecasting-System-",
    accent:"#8B6F47",
  },
  {
    num:"003", year:"2024", medium:"React 18 · Node.js · PostgreSQL · Canvas",
    title:"Creatify",
    subtitle:"Browser-Native Design Suite",
    desc:"A unified creative workspace housing eight fully functional design applications within a single interface. Examines the boundaries of browser-native computational creativity.",
    tags:["Canvas","Auth","PostgreSQL"],
    live:"https://video-editor-1-1xu2.onrender.com/",
    gh:"https://github.com/SachinYadav2446/Video-editor",
    accent:"#3A5F8A",
  },
  {
    num:"004", year:"2024", medium:"Python · OpenAI GPT-4 · FastAPI",
    title:"Resume Enhancer",
    subtitle:"Artificial Intelligence ATS Optimizer",
    desc:"An analytical instrument employing large language models to evaluate résumé quality against applicant tracking criteria. Demonstrates applied AI in document intelligence.",
    tags:["AI","NLP","FastAPI"],
    gh:"https://github.com/SachinYadav2446/Resume_Enhancer",
    accent:"#4A7C59",
  },
  {
    num:"005", year:"2024", medium:"Python · Statsmodels · ARIMA",
    title:"Run-Rate Forecaster",
    subtitle:"Time-Series Prediction Engine",
    desc:"A microservice engine predicting operational metrics via ARIMA grid search with backtesting. An exercise in statistical rigour applied to business intelligence.",
    tags:["Forecasting","Statistics","APIs"],
    gh:"https://github.com/SachinYadav2446/Run-Rate-Forecaster",
    accent:"#7A5C8A",
  },
  {
    num:"006", year:"2025", medium:"Next.js · Three.js · Framer Motion",
    title:"This Portfolio",
    subtitle:"Interactive Multi-Theme Showcase",
    desc:"A portfolio conceived as both artifact and infrastructure — simultaneously the canvas and the exhibited work. Four distinct interface paradigms inhabit a single codebase.",
    tags:["WebGL","3D","Meta"],
    live:"#",
    gh:"https://github.com/SachinYadav2446/Portfolio",
    accent:"#C4783C",
  },
];

/* ─── Exhibit card ─────────────────────────────────── */
function ExhibitCard({ exhibit, index, audio }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity:0, y:40 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay: index * 0.08, ease:[0.22,1,0.36,1] }}
      onMouseEnter={() => { setHovered(true); audio?.playHover(); }}
      onMouseLeave={() => setHovered(false)}
      className="gallery-card"
      style={{ cursor:"default", position:"relative" }}
    >
      {/* Exhibit number + meta */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem" }}>
        <div>
          <div className="gallery-exhibit-num" style={{ marginBottom:"0.4rem" }}>
            Exhibit {exhibit.num} — {exhibit.year}
          </div>
          <div className="gallery-label" style={{ color:"var(--color-comment)" }}>
            {exhibit.medium}
          </div>
        </div>
        <div style={{ display:"flex", gap:"0.5rem" }}>
          {exhibit.tags.map(t => (
            <span key={t} style={{
              fontFamily:"var(--font-mono)", fontSize:"0.58rem",
              border:"1px solid rgba(26,26,26,0.2)", color:"var(--color-cream-muted)",
              padding:"0.1rem 0.5rem", borderRadius:2, textTransform:"uppercase", letterSpacing:"0.08em",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Color accent stripe */}
      <div style={{ height:2, background:exhibit.accent, marginBottom:"1.25rem", width: hovered ? "100%" : "40px", transition:"width 0.6s ease" }}/>

      {/* Title */}
      <h2 style={{
        fontSize:"clamp(1.4rem, 3vw, 2rem)", fontFamily:"'Playfair Display', Georgia, serif",
        color:"var(--color-cream)", marginBottom:"0.25rem", lineHeight:1.15,
        fontWeight:700, letterSpacing:"-0.02em",
      }}>{exhibit.title}</h2>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--color-comment)", marginBottom:"1rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>
        {exhibit.subtitle}
      </div>

      {/* Description */}
      <p style={{ fontSize:"0.88rem", color:"var(--color-cream-dim)", lineHeight:1.75, marginBottom:"1.5rem", fontFamily:"'Playfair Display', Georgia, serif" }}>
        {exhibit.desc}
      </p>

      {/* Links */}
      <div style={{ display:"flex", gap:"0.75rem", marginTop:"auto" }}>
        {exhibit.live && exhibit.live !== "#" && (
          <a href={exhibit.live} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}
            style={{ display:"flex", alignItems:"center", gap:"0.35rem",
              fontFamily:"var(--font-mono)", fontSize:"0.68rem", textTransform:"uppercase",
              letterSpacing:"0.1em", color:"var(--color-cream)", textDecoration:"none",
              borderBottom:"1px solid var(--color-cream)", paddingBottom:"0.1rem",
              transition:"opacity .2s" }}>
            View Live <ArrowUpRight size={11}/>
          </a>
        )}
        {exhibit.gh && (
          <a href={exhibit.gh} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}
            style={{ display:"flex", alignItems:"center", gap:"0.35rem",
              fontFamily:"var(--font-mono)", fontSize:"0.68rem", textTransform:"uppercase",
              letterSpacing:"0.1em", color:"var(--color-cream-muted)", textDecoration:"none",
              borderBottom:"1px solid rgba(26,26,26,0.2)", paddingBottom:"0.1rem" }}>
            Source <ArrowUpRight size={11}/>
          </a>
        )}
      </div>
    </motion.article>
  );
}

/* ─── Gallery home page ────────────────────────────── */
export default function GalleryHome({ audio }) {
  const NAVBAR_H = 79;

  return (
    <div style={{ marginTop:NAVBAR_H, background:"var(--color-bg)", minHeight:`calc(100vh - ${NAVBAR_H}px)` }}>

      {/* ── Hero / Title wall ── */}
      <section id="home" style={{ padding:"6rem 4rem 4rem", borderBottom:"1px solid rgba(26,26,26,0.1)", background:"var(--color-bg-card)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div className="gallery-label" style={{ marginBottom:"1.5rem" }}>
            Portfolio Archive &nbsp;·&nbsp; Sachin Yadav &nbsp;·&nbsp; Est. 2022
          </div>
          <h1 style={{
            fontSize:"clamp(3rem, 8vw, 6rem)",
            fontFamily:"'Playfair Display', Georgia, serif",
            fontWeight:900, letterSpacing:"-0.04em", lineHeight:0.95,
            color:"var(--color-cream)", marginBottom:"2rem",
          }}>
            Works in<br/>
            <em style={{ fontStyle:"italic", fontWeight:400 }}>Engineering</em>
          </h1>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", maxWidth:720 }} className="gallery-hero-stats">
            {[
              { label:"Total Exhibits",   value:"06" },
              { label:"Years Active",     value:"03" },
              { label:"Technologies",     value:"30+" },
              { label:"Lines Committed",  value:"∞" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize:"clamp(2rem, 5vw, 3.5rem)", fontFamily:"'Playfair Display', serif", fontWeight:700, color:"var(--color-cream)", lineHeight:1 }}>{s.value}</div>
                <div className="gallery-label" style={{ marginTop:"0.4rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curator's note ── */}
      <section id="about" style={{ padding:"4rem", borderBottom:"1px solid rgba(26,26,26,0.08)" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 2fr", gap:"4rem", alignItems:"start" }} className="gallery-about-grid">
          <div>
            <div className="gallery-label" style={{ marginBottom:"1rem" }}>Curator's Note</div>
            <div style={{ width:40, height:2, background:"var(--color-cream)", marginBottom:"1.5rem" }}/>
            <div className="gallery-exhibit-num">Sachin Yadav<br/>2nd Year CS · Bangalore<br/>yadavsachin2446@gmail.com</div>
          </div>
          <div>
            <p style={{ fontSize:"1.05rem", fontFamily:"'Playfair Display', Georgia, serif", lineHeight:1.8, color:"var(--color-cream-dim)", marginBottom:"1.25rem" }}>
              The works presented in this collection emerge from an ongoing inquiry into the relationship between rigorous systems thinking and expressive interface construction.
            </p>
            <p style={{ fontSize:"0.92rem", lineHeight:1.75, color:"var(--color-cream-muted)", fontFamily:"'Playfair Display', serif" }}>
              Each exhibit represents a distinct computational problem — approached not merely as an engineering exercise, but as an opportunity to discover what becomes possible when architecture, performance, and aesthetics converge.
            </p>
            <div style={{ marginTop:"2rem", display:"flex", gap:"1rem" }}>
              <a href="#contact" className="btn-primary"
                onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}
                style={{ fontSize:"0.72rem" }}>
                Commission Work <ArrowRight size={13}/>
              </a>
              <a href="https://github.com/SachinYadav2446" target="_blank" rel="noopener noreferrer"
                className="btn-secondary"
                onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}
                style={{ fontSize:"0.72rem" }}>
                View Archive <ArrowUpRight size={13}/>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Exhibition grid ── */}
      <section id="pull-requests" style={{ padding:"4rem" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"3rem" }}>
            <div>
              <div className="gallery-label" style={{ marginBottom:"0.5rem" }}>Selected Works</div>
              <h2 style={{ fontSize:"clamp(1.5rem, 3vw, 2.2rem)", fontFamily:"'Playfair Display', serif", fontWeight:700, color:"var(--color-cream)" }}>
                Collection 2022 — 2025
              </h2>
            </div>
            <div className="gallery-exhibit-num">{EXHIBITS.length} exhibits</div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(340px,1fr))", gap:"2px" }} className="gallery-grid">
            {EXHIBITS.map((ex, i) => <ExhibitCard key={ex.num} exhibit={ex} index={i} audio={audio}/>)}
          </div>
        </div>
      </section>

      {/* ── Skills as catalogue ── */}
      <section id="marketplace" style={{ padding:"4rem", borderTop:"1px solid rgba(26,26,26,0.08)", background:"var(--color-bg-card)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div className="gallery-label" style={{ marginBottom:"0.5rem" }}>Technical Catalogue</div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:"clamp(1.5rem,3vw,2rem)", marginBottom:"3rem", color:"var(--color-cream)" }}>
            Media & Methods
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px,1fr))", gap:"2rem" }}>
            {[
              { cat:"Languages",        items:["Python","Golang","Java","TypeScript","C++"] },
              { cat:"Backend Systems",  items:["Node.js","Express","FastAPI","REST APIs"] },
              { cat:"Frontend",         items:["React","Next.js","Three.js","Framer Motion"] },
              { cat:"ML & Analytics",   items:["PyTorch","Pandas","NumPy","Scikit-learn","ARIMA"] },
              { cat:"Data Stores",      items:["PostgreSQL","MongoDB","AWS RDS"] },
              { cat:"Infrastructure",   items:["Docker","AWS Lambda","Amplify","Vercel","Git"] },
            ].map(g => (
              <div key={g.cat}>
                <div className="gallery-label" style={{ marginBottom:"0.75rem" }}>{g.cat}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.35rem" }}>
                  {g.items.map(s => (
                    <div key={s} style={{ fontSize:"0.88rem", color:"var(--color-cream-dim)", fontFamily:"'Playfair Display', serif" }}>
                      — {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ padding:"6rem 4rem", borderTop:"2px solid var(--color-cream)" }}>
        <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div className="gallery-label" style={{ marginBottom:"1rem" }}>Open to Commissions</div>
          <h2 style={{ fontSize:"clamp(2rem,5vw,4rem)", fontFamily:"'Playfair Display', serif", fontWeight:900, letterSpacing:"-0.03em", color:"var(--color-cream)", marginBottom:"1.5rem", lineHeight:1.1 }}>
            Let's Build<br/><em style={{ fontStyle:"italic", fontWeight:400 }}>Something Real</em>
          </h2>
          <p style={{ fontSize:"0.95rem", color:"var(--color-cream-muted)", fontFamily:"'Playfair Display', serif", lineHeight:1.75, marginBottom:"2.5rem" }}>
            Seeking software engineering internships and collaborative projects in full-stack engineering, ML systems, or creative technology. Bangalore-based, globally curious.
          </p>
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <a href="mailto:yadavsachin2446@gmail.com" className="btn-primary"
              onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
              Reach Out →
            </a>
            <a href="https://github.com/SachinYadav2446" target="_blank" rel="noopener noreferrer"
              className="btn-secondary" onMouseEnter={() => audio?.playHover()} onClick={() => audio?.playClick()}>
              GitHub Archive
            </a>
          </div>
          <div style={{ marginTop:"3rem", paddingTop:"2rem", borderTop:"1px solid rgba(26,26,26,0.1)",
            fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--color-comment)", textAlign:"center" }}>
            © 2026 Sachin Yadav. All exhibits reserved. &nbsp;·&nbsp; Bangalore, India
          </div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
        @media (max-width: 768px) {
          .gallery-hero-stats { grid-template-columns: 1fr 1fr !important; }
          .gallery-about-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
