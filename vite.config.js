// vite.config.js
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "package.json"), "utf-8")
);

export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    react({
      babel: {
        compact: true,
      },
    }),
    tailwindcss(),
    svgr(),
    visualizer({
      filename: "./dist/stats.html",
      title: "Bundle Analysis",
      open: false,
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
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").pop();
          if (ext === "css") return "css/[name]-[hash].css";
          if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) {
            return "images/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: [
      "framer-motion",
      "react-router-dom",
      "classnames",
    ],
    exclude: ["fsevents"],
  },
});
