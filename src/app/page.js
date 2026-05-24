"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SocialStrip from "@/components/SocialStrip";

// Dynamically import 3D-heavy and client-only components with ssr: false
// This completely avoids Next.js server pre-rendering of WebGL elements (avoiding document/window errors)
const GlobalCanvas = dynamic(() => import("@/components/GlobalCanvas"), {
  ssr: false
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
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

const CreativeLab = dynamic(() => import("@/components/CreativeLab"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%",
      height: "500px",
      background: "#0A0A0E",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid var(--glass-border)",
      borderRadius: "20px"
    }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        color: "var(--color-cream-muted)",
        fontSize: "0.85rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase"
      }}>
        Booting WebGL Kernel...
      </div>
    </div>
  )
});

const NetworkMap = dynamic(() => import("@/components/NetworkMap"), {
  ssr: false
});

export default function Home() {
  return (
    <>
      {/* Interactive trailing custom cursor */}
      <CustomCursor />

      {/* Global 3D dynamic particle field behind everything */}
      <GlobalCanvas />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Main layout */}
      <main style={{ position: "relative", zIndex: 10 }}>
        
        {/* Flagship Typographic Hero Layout */}
        <CreativeHero />

        {/* About & Timeline Section */}
        <About />

        {/* Selected Work Portfolio Grid */}
        <Projects />

        {/* Interactive Octopus Node Map Network */}
        <NetworkMap />

        {/* Interactive 3D WebGL Sandbox Playground */}
        <CreativeLab />

        {/* Social Links Moving Strip */}
        <SocialStrip />

        {/* Contact Signal Transmission Section */}
        <Contact />

      </main>
    </>
  );
}
