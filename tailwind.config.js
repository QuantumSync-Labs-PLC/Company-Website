// tailwind.config.js

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        headline: ["Space Grotesk", "Orbitron", "sans-serif"],
        body: ["Inter", "DM Sans", "sans-serif"],
      },
      colors: {
        qs: {
          bg: "var(--qs-bg)",
          surface: "var(--qs-surface)",
          "surface-elevated": "var(--qs-surface-elevated)",
          border: "var(--qs-border)",

          text: "var(--qs-text)",
          "text-muted": "var(--qs-text-muted)",
          "text-section": "var(--qs-text-section)",

          primary: "var(--qs-primary)",
          "primary-hover": "var(--qs-primary-hover)",
          "primary-soft": "var(--qs-primary-soft)",
          accent: "var(--qs-accent)",
          "accent-hover": "var(--qs-accent-hover)",
          "accent-soft": "var(--qs-accent-soft)",

          danger: "var(--qs-danger)",
          success: "var(--qs-success)",
          warning: "var(--qs-warning)",
          info: "var(--qs-info)",
        },
        // Legacy colors for backwards compatibility
        navy: {
          DEFAULT: "#080E3F",
          900: "#000022",
          800: "#000033",
          700: "#000044",
          600: "#000066",
          500: "#000080",
        },
        blue: {
          DEFAULT: "#0073FF",
          100: "#B0C4DE",
          200: "#6699CC",
          300: "#336699",
          400: "#1A4D80",
          500: "#003366",
        },
        cyan: "#00A3ED",
        white: "#FFFFFF",
        glass: "rgba(0, 18, 61, 0.55)",
      },
      backgroundImage: {
        "qs-gradient-primary": "var(--qs-gradient-primary)",
        "qs-gradient-accent": "var(--qs-gradient-accent)",
        "main-gradient": "var(--qs-gradient-primary)",
      },
      boxShadow: {
        "qs-soft": "var(--qs-shadow-soft)",
        "qs-medium": "var(--qs-shadow-medium)",
        "qs-neon": "var(--qs-shadow-neon)",
        "neon-blue": "var(--qs-shadow-neon)",
      },
      borderRadius: {
        "qs-lg": "var(--qs-radius-lg)",
        glass: "1.25rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
