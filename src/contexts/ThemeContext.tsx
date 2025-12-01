"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Farbthemen-Typen
export type ColorTheme = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'gold';

// Hintergrund-Farben für jedes Theme
export const backgroundColors: Record<ColorTheme, { via: string; particle: string; grid: string; dark: string; darker: string }> = {
  blue: { 
    via: 'rgb(23, 37, 84)', 
    particle: 'rgba(96, 165, 250, 0.2)', 
    grid: 'rgba(59, 130, 246, 0.03)',
    dark: 'rgb(15, 23, 42)',
    darker: 'rgb(2, 6, 23)'
  },
  orange: { 
    via: 'rgb(67, 20, 7)', 
    particle: 'rgba(251, 146, 60, 0.2)', 
    grid: 'rgba(249, 115, 22, 0.03)',
    dark: 'rgb(45, 13, 5)',
    darker: 'rgb(20, 6, 2)'
  },
  green: { 
    via: 'rgba(12, 77, 27, 1)', 
    particle: 'rgba(74, 222, 128, 0.2)', 
    grid: 'rgba(34, 197, 94, 0.03)',
    dark: 'rgba(16, 60, 50, 1)',
    darker: 'rgb(1, 12, 10)'
  },
  red: { 
    via: 'rgba(110, 7, 7, 1)', 
    particle: 'rgba(248, 113, 113, 0.2)', 
    grid: 'rgba(239, 68, 68, 0.03)',
    dark: 'rgb(46, 7, 7)',
    darker: 'rgb(20, 3, 3)'
  },
  purple: { 
    via: 'rgb(46, 16, 101)', 
    particle: 'rgba(192, 132, 252, 0.2)', 
    grid: 'rgba(168, 85, 247, 0.03)',
    dark: 'rgb(31, 11, 68)',
    darker: 'rgb(13, 5, 29)'
  },
  gold: { 
    via: 'rgba(162, 137, 37, 0.68)', 
    particle: 'rgba(250, 204, 21, 0.31)', 
    grid: 'rgba(234, 179, 8, 0.03)',
    dark: 'rgba(80, 68, 20, 1)',
    darker: 'rgb(56, 48, 14)'
  },
};

// Context-Interface
interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  currentBg: { via: string; particle: string; grid: string; dark: string; darker: string };
}

// Context erstellen mit Default-Werten
const ThemeContext = createContext<ThemeContextType>({
  colorTheme: 'blue',
  setColorTheme: () => {},
  currentBg: backgroundColors['blue'],
});

// Custom Hook zum Verwenden des Theme Context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};

// Provider Component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('blue');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("colorTheme") as ColorTheme;
      if (storedTheme && backgroundColors[storedTheme]) {
        setColorThemeState(storedTheme);
      }
    }
  }, []);

  // Save theme to localStorage when it changes
  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem("colorTheme", theme);
    }
  };

  const currentBg = backgroundColors[colorTheme];

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme, currentBg }}>
      {children}
    </ThemeContext.Provider>
  );
};
