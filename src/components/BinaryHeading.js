"use client";

import React, { useState, useEffect, useRef } from "react";

export default function BinaryHeading({ text, className, style }) {
  const [displayText, setDisplayText] = useState([]);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const containerRef = useRef(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          triggerDecrypt();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const getRandomChar = () => {
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const triggerDecrypt = () => {
    const chars = text.split("");
    const length = chars.length;
    let ticks = 0;
    const maxTicks = length * 2.5 + 20;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return chars.map((char, index) => {
          if (char === " ") return { char: " ", locked: true };

          // Calculated lock-in threshold with staggering and minor sinewave variance
          const delay = index * 1.8 + Math.sin(index * 1.5) * 2;
          
          if (ticks >= delay + 8) {
            return { char, locked: true };
          } else {
            // Rapidly fluctuating binary digits and alphabets
            return { char: getRandomChar(), locked: false };
          }
        });
      });

      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        setIsDecrypted(true);
      }
    }, 30); // Energetic 30ms scroll speed
  };

  // Pre-fill starfield headers with active binary signals before scroll triggers
  useEffect(() => {
    if (!hasTriggered.current) {
      const initial = text.split("").map(char => {
        if (char === " ") return { char: " ", locked: true };
        return { char: getRandomChar(), locked: false };
      });
      setDisplayText(initial);
    }
  }, [text]);

  if (isDecrypted) {
    return (
      <h2 ref={containerRef} className={className} style={style}>
        {text}
      </h2>
    );
  }

  return (
    <h2
      ref={containerRef}
      className={className}
      style={{
        ...style,
        display: "flex",
        flexWrap: "wrap",
        rowGap: "0.2em",
        alignItems: "center"
      }}
    >
      {displayText.map((item, index) => (
        <span
          key={index}
          style={{
            color: item.locked ? "var(--color-cream)" : "var(--color-red)",
            textShadow: item.locked
              ? "0 0 10px rgba(255, 253, 249, 0.15)"
              : "0 0 8px rgba(230, 57, 70, 0.65)",
            opacity: item.locked ? 1 : 0.7,
            transition: item.locked ? "color 0.28s ease, text-shadow 0.28s ease, opacity 0.28s ease" : "none",
            fontFamily: item.locked ? "inherit" : "monospace",
            display: "inline-block",
            whiteSpace: "pre",
            minWidth: item.char === " " ? "0.3em" : "auto",
            transform: item.locked ? "scale(1)" : "scale(1.05)"
          }}
        >
          {item.char}
        </span>
      ))}
    </h2>
  );
}
