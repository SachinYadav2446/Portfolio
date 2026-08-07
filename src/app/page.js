"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import SocialStrip from "@/components/SocialStrip";
import useAudio from "@/components/useAudio";

const GlobalCanvas = dynamic(() => import("@/components/GlobalCanvas"), { ssr: false });

const CreativeHero = dynamic(() => import("@/components/CreativeHero"), {
  ssr: false,
  loading: () => (
    <div style={{ width:"100%", minHeight:"100vh", background:"var(--color-bg)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <span style={{ fontFamily:"var(--font-mono)", color:"var(--color-comment)", fontSize:"0.8rem", letterSpacing:"0.15em" }}>
        Loading workspace…
      </span>
    </div>
  ),
});

const PullRequests      = dynamic(() => import("@/components/PullRequests"),      { ssr: false });
const CommitStory       = dynamic(() => import("@/components/CommitStory"),       { ssr: false });
const RecruiterMode      = dynamic(() => import("@/components/RecruiterMode"),      { ssr: false });
const ExperienceMap      = dynamic(() => import("@/components/ExperienceMap"),      { ssr: false });
const EngineeringPassport = dynamic(() => import("@/components/EngineeringPassport"), { ssr: false });
const FailureMuseum      = dynamic(() => import("@/components/FailureMuseum"),      { ssr: false });
const EngineeringNotes   = dynamic(() => import("@/components/EngineeringNotes"),   { ssr: false });

export default function Home() {
  const audio = useAudio();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    let raf;
    const forceTop = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
      raf = requestAnimationFrame(forceTop);
    };
    raf = requestAnimationFrame(forceTop);
    const t = setTimeout(() => cancelAnimationFrame(raf), 400);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <GlobalCanvas />
      <Navbar audio={audio} />

      <main style={{ position:"relative", zIndex:10 }}>

        {/* 00 — IDE Hero */}
        <CreativeHero audio={audio} />

        <ExperienceMap audio={audio} />
        <RecruiterMode audio={audio} />

        <PullRequests audio={audio} />
        <CommitStory audio={audio} />
        <EngineeringPassport audio={audio} />
        <FailureMuseum audio={audio} />


        <EngineeringNotes audio={audio} />

        {/* Social strip */}
        <SocialStrip audio={audio} />

        {/* 06 — Contact Terminal */}
        <Contact audio={audio} />

      </main>
    </>
  );
}
