// tailwind.config.js
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Space Grotesk', 'Orbitron', 'sans-serif'],
        body: ['Inter', 'DM Sans', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#080E3F',
          900: '#000022',
          800: '#000033',
          700: '#000044',
          600: '#000066',
          500: '#000080',
        },
        blue: {
          DEFAULT: '#0073FF',
          100: '#B0C4DE',
          200: '#6699CC',
          300: '#336699',
          400: '#1A4D80',
          500: '#003366',
        },
        cyan: '#00A3ED',
        white: '#FFFFFF',
        glass: 'rgba(0, 18, 61, 0.55)', // slightly lower opacity for more glass effect
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(90deg, #0073FF 0%, #00A3ED 100%)',
        // If you want to add a circuit background SVG, you can add here:
        // 'circuit': "url('/src/assets/images/circuit-bg.svg')",
      },
      boxShadow: {
        'neon-blue': '0 0 18px 2px #0073FF88, 0 2px 8px #00004422',
      },
      borderRadius: {
        glass: '1.25rem',
      },
    },
  },
  plugins: [
    forms,
    typography,
  ],
}
