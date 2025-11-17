// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    visualizer({
      filename: './dist/stats.html',
      title: 'Bundle Analysis',
      open: false, // Set to true to auto-open in browser after build
    }),
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
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  optimizeDeps: {
    include: ['framer-motion', 'react-router-dom'],
  },
});
