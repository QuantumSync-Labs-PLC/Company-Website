// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "package.json"), "utf-8")
);

// Bundle analysis is opt-in: `ANALYZE=1 npm run build`, or `npm run analyze`.
// It used to run on every build and write dist/stats.html, which meant a full
// map of the bundle was deployed to production alongside the site.
const analyze = process.env.ANALYZE === "1";

export default defineConfig({
  plugins: [
    // splitVendorChunkPlugin was removed here: it is deprecated in Vite 5+,
    // and manualChunks below does the same job explicitly.
    react({
      babel: {
        compact: true,
      },
    }),
    tailwindcss(),
    svgr(),
    analyze &&
      visualizer({
        filename: "./.analysis/stats.html",
        title: "Bundle Analysis",
        gzipSize: true,
        open: true,
      }),
  ].filter(Boolean),

  resolve: {
    // "@/x" beats "../../../x" and survives files being moved between folders.
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
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
        // Replaces splitVendorChunkPlugin. Keeping React and the router in one
        // long-lived chunk means a content change doesn't invalidate them.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          // The trailing separator matters: without it this also matched
          // react-markdown, dragging a route-only dependency into the chunk
          // every visitor downloads first.
          if (
            /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(
              id
            )
          ) {
            return "vendor";
          }
          return undefined;
        },
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
    include: ["framer-motion", "react-router-dom"],
  },
});
