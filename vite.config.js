import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import process from 'node:process'

export default defineConfig(() => ({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    hmr: {
      overlay: true,
    },
  },
  preview: {
    port: 5000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/theme/variables.scss";`
      }
    }
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  optimizeDeps: {
    include: ['framer-motion', 'react-router-dom'],
  },
}));
