"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export const VALID_THEMES = ["ide", "rpg", "os", "gallery"];

const ThemeContext = createContext({ theme: "ide", setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("ide");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (VALID_THEMES.includes(saved)) setThemeState(saved);
  }, []);

  const setTheme = (t) => {
    if (!VALID_THEMES.includes(t)) return;
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
