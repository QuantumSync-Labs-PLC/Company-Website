// tailwind.config.js

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        headline: ["Space Grotesk", "Orbitron", "sans-serif"],
        body: ["Inter", "DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "Space Mono", "monospace"],
      },
      colors: {
        qs: {
          bg: "var(--qs-bg)",
          "bg-alt": "var(--qs-bg-alt)",
          surface: "var(--qs-surface)",
          "surface-elevated": "var(--qs-surface-elevated)",
          border: "var(--qs-border)",
          hairline: "var(--qs-hairline)",

          text: "var(--qs-text)",
          "text-muted": "var(--qs-text-muted)",
          "text-section": "var(--qs-text-section)",

          primary: "var(--qs-primary)",
          "primary-hover": "var(--qs-primary-hover)",
          "primary-soft": "var(--qs-primary-soft)",
          violet: "var(--qs-violet)",
          "violet-hover": "var(--qs-violet-hover)",
          "violet-soft": "var(--qs-violet-soft)",
          accent: "var(--qs-accent)",
          "accent-hover": "var(--qs-accent-hover)",
          "accent-soft": "var(--qs-accent-soft)",

          signal: "var(--qs-signal)",
          "signal-soft": "var(--qs-signal-soft)",

          danger: "var(--qs-danger)",
          success: "var(--qs-success)",
          warning: "var(--qs-warning)",
          info: "var(--qs-info)",
        },
        white: "#FFFFFF",
      },
      backgroundImage: {
        "qs-gradient-primary": "var(--qs-gradient-primary)",
        "qs-gradient-signal": "var(--qs-gradient-signal)",
        "main-gradient": "var(--qs-gradient-primary)",
      },
      boxShadow: {
        "qs-soft": "var(--qs-shadow-soft)",
        "qs-medium": "var(--qs-shadow-medium)",
        "qs-neon": "var(--qs-shadow-neon)",
        "qs-neon-accent": "var(--qs-shadow-neon-accent)",
        "neon-blue": "var(--qs-shadow-neon)",
      },
      borderRadius: {
        "qs-sm": "var(--qs-radius-sm)",
        "qs-md": "var(--qs-radius-md)",
        "qs-lg": "var(--qs-radius-lg)",
        "qs-xl": "var(--qs-radius-xl)",
        "qs-2xl": "var(--qs-radius-2xl)",
        glass: "1.25rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
