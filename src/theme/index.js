// src/theme/index.js

/**
 * QuantumSync Labs Design System
 * Core theme tokens for consistent branding across the application
 */

/**
 * Brand color palette
 * Based on navy and blue tones for tech/trust aesthetic
 */
export const colors = {
  // Primary palette
  navy: "#080E3F",
  blue: "#0073FF",
  teal: "#00A3E0",
  white: "#FFFFFF",

  // Dark shades
  "navy-900": "#000022",
  "navy-800": "#000033",
  "navy-700": "#000044",
  "navy-600": "#000066",
  "navy-500": "#000080",

  // Mid tones
  "navy-400": "#003366",
  "navy-300": "#1A4D80",
  "navy-200": "#336699",
  "navy-100": "#6699CC",
  "navy-050": "#B0C4DE",
};

/**
 * Typography system
 * Font families used throughout the application
 */
export const fontFamily = {
  sans: ["Inter", "system-ui", "sans-serif"],
  mono: ["Menlo", "monospace"],
};

/**
 * Spacing scale
 * Consistent spacing values for margins, padding, and gaps
 */
export const spacing = {
  xs: "0.5rem", // 8px
  sm: "1rem", // 16px
  md: "1.5rem", // 24px
  lg: "2rem", // 32px
  xl: "4rem", // 64px
};
