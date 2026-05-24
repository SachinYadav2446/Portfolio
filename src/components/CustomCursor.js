"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Motion values for actual cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth trailing effect
  const springConfig = { damping: 30, stiffness: 250, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is touch-based
    const checkTouch = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      setIsTouchDevice(isTouch);
    };

    checkTouch();

    if (isTouchDevice) return;

    // Track mouse coordinates
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Listen to mouse click states
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hover state for links and buttons
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, .btn-primary, .btn-secondary, [role="button"], .clickable, .glass-card'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Add custom cursor class to html/body to hide default cursor
    document.documentElement.classList.add("custom-cursor-active");

    // Initialize hover listeners, and periodically re-add for dynamic content
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 2000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.classList.remove("custom-cursor-active");
      clearInterval(interval);
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  // Don't render on touch screens
  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Dynamic inline styles to hide standard cursor while CustomCursor is active */}
      <style jsx global>{`
        @media (pointer: fine) {
          .custom-cursor-active,
          .custom-cursor-active * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Inner Dot - moves instantly */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? "8px" : "6px",
          height: isHovered ? "8px" : "6px",
          backgroundColor: "var(--color-red)",
          borderRadius: "50%",
          zIndex: 9999,
          pointerEvents: "none",
        }}
        animate={{
          scale: isClicking ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      {/* Outer Ring - trails smoothly with spring physics */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: "36px",
          height: "36px",
          border: "1.5px solid var(--color-cream)",
          borderRadius: "50%",
          zIndex: 9998,
          pointerEvents: "none",
        }}
        animate={{
          scale: isHovered ? 1.5 : isClicking ? 0.85 : 1,
          borderColor: isHovered ? "var(--color-red)" : "var(--color-cream)",
          backgroundColor: isHovered ? "var(--color-red-glow)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      />
    </>
  );
}
