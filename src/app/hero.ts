import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    // ========================================================================
    // ☀️ LIGHT THEME (GREEN)
    // ========================================================================
    light: {
      colors: {
        background: "#f5fffd", // Light minty-white background
        foreground: "#1a1f1d", // Main text color (dark green-charcoal)

        content1: "#ffffff", // Card, Modal background (pure white for contrast)
        content2: "#f0f7f5", // Lighter content background
        content3: "#e9f0ee", // Even lighter
        content4: "#e2e9e7", // Lightest
        divider: "#e0e5e3", // Border color with a green tint

        primary: {
          50: "#f0fafa",
          100: "#d9f2f2",
          200: "#bce7e7",
          300: "#92d7d7",
          400: "#63c3c3",
          500: "#3fadad", // A sophisticated teal
          600: "#328c8c",
          700: "#2a7373",
          800: "#255c5c",
          900: "#214e4e",
          DEFAULT: "#3fadad",
          foreground: "#ffffff",
        },
        secondary: {
          50: "#f5f5f4",
          100: "#e7e5e4",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#555555",
          700: "#444444",
          800: "#353535",
          900: "#2b2b2b",
          DEFAULT: "#6d6d6d",
          foreground: "#ffffff",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          DEFAULT: "#22c55e",
          foreground: "#ffffff",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
      },
    },
    dark: {
      colors: {
        background: "#0e1210", // Deep green-charcoal background
        foreground: "#e3fffa", // Light mint text color

        content1: "#1a1f1d", // Card, Modal background
        content2: "#232826", // Slightly lighter
        content3: "#2a2e2c", // Even lighter
        content4: "#313634", // Lightest
        divider: "#2a2e2c", // Border colors

        primary: {
          50: "#f0fafa",
          100: "#d9f2f2",
          200: "#bce7e7",
          300: "#92d7d7",
          400: "#63c3c3",
          500: "#3fadad", // Teal stands out nicely on the dark background
          600: "#328c8c",
          700: "#2a7373",
          800: "#255c5c",
          900: "#214e4e",
          DEFAULT: "#3fadad",
          foreground: "#ffffff",
        },
        secondary: {
          50: "#f5f5f4",
          100: "#e7e5e4",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#555555",
          700: "#444444",
          800: "#353535",
          900: "#2b2b2b",
          DEFAULT: "#6d6d6d",
          foreground: "#ffffff",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          DEFAULT: "#22c55e",
          foreground: "#ffffff",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
      },
    },
  },
});
