"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
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

const NetworkMap        = dynamic(() => import("@/components/NetworkMap"),        { ssr: false });
const PullRequests      = dynamic(() => import("@/components/PullRequests"),      { ssr: false });
const ExtensionMarketplace = dynamic(() => import("@/components/ExtensionMarketplace"), { ssr: false });
const DebugPanel        = dynamic(() => import("@/components/DebugPanel"),        { ssr: false });

export default function Home() {
  const audio = useAudio();

  return (
    <>
      <GlobalCanvas />
      <Navbar audio={audio} />

      <main style={{ position:"relative", zIndex:10 }}>

        {/* 00 — IDE Hero */}
        <CreativeHero audio={audio} />

        {/* 01 — About + Git Timeline */}
        <About audio={audio} />

        {/* 02 — Projects as Pull Requests */}
        <PullRequests audio={audio} />

        {/* 03 — Skill Node Dependency Map */}
        <NetworkMap audio={audio} />

        {/* 04 — console.log() Debug Session */}
        <DebugPanel audio={audio} />

        {/* 05 — Extension Marketplace */}
        <ExtensionMarketplace audio={audio} />

        {/* Social strip */}
        <SocialStrip audio={audio} />

        {/* 06 — Contact Terminal */}
        <Contact audio={audio} />

      </main>
    </>
  );
}
