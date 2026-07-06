"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SocialStrip from "@/components/SocialStrip";
import useAudio from "@/components/useAudio";

// Dynamically import 3D-heavy and client-only components with ssr: false
// This completely avoids Next.js server pre-rendering of WebGL elements (avoiding document/window errors)
const GlobalCanvas = dynamic(() => import("@/components/GlobalCanvas"), {
  ssr: false
});
const CreativeHero = dynamic(() => import("@/components/CreativeHero"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "#060608",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        color: "var(--color-cream-muted)",
        fontSize: "0.9rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase"
      }}>
        Initializing Space Portal...
      </div>
    </div>
  )
});
const NetworkMap = dynamic(() => import("@/components/NetworkMap"), {
  ssr: false
});

export default function Home() {
  const audio = useAudio();

  return (
    <>
      {/* Global 3D dynamic particle field behind everything */}
      <GlobalCanvas />

      {/* Sticky Navbar */}
      <Navbar audio={audio} />

      {/* Main layout */}
      <main style={{ position: "relative", zIndex: 10 }}>
        
        {/* Flagship Typographic Hero Layout */}
        <CreativeHero audio={audio} />

        {/* About & Timeline Section */}
        <About audio={audio} />

        {/* Selected Work Portfolio Grid */}
        <Projects audio={audio} />

        {/* Interactive Octopus Node Map Network */}
        <NetworkMap audio={audio} />

        {/* Social Links Moving Strip */}
        <SocialStrip audio={audio} />

        {/* Contact Signal Transmission Section */}
        <Contact audio={audio} />

      </main>
    </>
  );
}
