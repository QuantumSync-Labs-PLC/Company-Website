// src/constants/themeTokens.js

/**
 * QuantumSync Labs Theme Tokens
 * Core color constants used throughout the application
 * These values should match the CSS variables in tailwind.css ("Deep-Space Holographic")
 */

/**
 * Primary color palette
 */
export const COLORS = {
  bg: "#060810",
  bgAlt: "#0a0d18",
  cyan: "#22d3ee",
  violet: "#8b5cf6",
  lime: "#c5ff4a",
  white: "#FFFFFF",

  // Backgrounds
  background: "#060810",
  sectionBg: "#0a0d18",
  glassBg: "rgba(13, 17, 31, 0.5)",
  hairline: "rgba(255, 255, 255, 0.08)",

  // Gradients
  gradientMain: "linear-gradient(120deg, #22d3ee 0%, #8b5cf6 55%, #f65fb5 100%)",
};

/**
 * Semantic color aliases for specific use cases
 */
export const SEMANTIC_COLORS = {
  primary: COLORS.cyan,
  secondary: COLORS.violet,
  background: COLORS.bg,
  surface: COLORS.sectionBg,
  border: COLORS.hairline,
  text: "#e7ecf5",
};
