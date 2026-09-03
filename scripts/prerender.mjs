/**
 * Prerenders every static route to real HTML.
 *
 * The built SPA shipped an empty <div id="root">, so search engines and the
 * Facebook / LinkedIn / WhatsApp / Slack crawlers — which do not run JavaScript
 * — saw one title and one description for every URL on the site. This renders
 * each route at build time and writes it as a static file, which Vercel serves
 * ahead of the SPA rewrite. React still hydrates it on the client.
 *
 * Run: node scripts/prerender.mjs   (runs automatically after `npm run build`)
 */
import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";
import { loadRouteData } from "./routeList.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(root, "dist");
const SSR_OUT = join(root, ".prerender-ssr");

if (!existsSync(join(DIST, "index.html"))) {
  console.error("dist/index.html not found — run `vite build` first.");
  process.exit(1);
}

// The client build's index.html is the shell every page is written into.
// Captured before anything is overwritten, since "/" writes back to this file.
const template = readFileSync(join(DIST, "index.html"), "utf8");

console.log("Building SSR bundle…");
await build({
  root,
  logLevel: "error",
  build: {
    ssr: "src/entry-prerender.jsx",
    outDir: ".prerender-ssr",
    emptyOutDir: true,
    minify: false,
    // The client build already emitted the real CSS; this pass only needs JS.
    cssCodeSplit: false,
    rollupOptions: { output: { entryFileNames: "entry-prerender.js" } },
  },
});

const { render } = await import(
  pathToFileURL(join(SSR_OUT, "entry-prerender.js")).href
);

// Same source as the sitemap, so the two can never describe different URLs.
const { allPaths: routes } = await loadRouteData();

/**
 * React hoists <title>, <meta> and <link> to the front of the SSR stream, and
 * JSON-LD renders inline. Both belong in <head> — meta tags left in <body> are
 * ignored by the social crawlers this whole exercise exists to satisfy.
 */
const HEAD_TAG = /<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>|<script type="application\/ld\+json">[\s\S]*?<\/script>/gi;

function splitHead(html) {
  const headTags = html.match(HEAD_TAG) || [];
  const body = html.replace(HEAD_TAG, "");
  return { headTags, body };
}

/** Remove the template's generic tags so the route's own ones don't duplicate. */
function stripTemplateMeta(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, "")
    .replace(/\s*<meta\s+name="description"[^>]*>/gi, "")
    .replace(/\s*<meta\s+property="og:[^"]*"[^>]*>/gi, "")
    .replace(/\s*<meta\s+name="twitter:[^"]*"[^>]*>/gi, "")
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/\s*<meta\s+name="robots"[^>]*>/gi, "");
}

function buildPage(headTags, body) {
  // Keep one viewport tag — PageMeta renders its own copy.
  const seen = new Set();
  const head = headTags
    .filter((tag) => {
      const key = tag.replace(/\s+/g, " ").trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return !/name="viewport"/i.test(tag);
    })
    .join("\n    ");

  return stripTemplateMeta(template)
    .replace("</head>", `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

/**
 * Where to write a route.
 *
 * Two filenames per route, deliberately. Static hosts disagree about how an
 * extensionless URL resolves: some map /pricing to pricing/index.html, others
 * only to pricing.html, and a host that resolves neither falls through to the
 * SPA rewrite and silently serves the empty shell — undoing the prerender
 * without any visible error. Writing both forms removes the guess. Vercel's
 * cleanUrls then serves whichever it prefers at the clean URL.
 */
function outputPaths(route) {
  if (route === "/") return [join(DIST, "index.html")];

  const rel = route.replace(/^\//, "");
  return [join(DIST, rel, "index.html"), join(DIST, `${rel}.html`)];
}

let ok = 0;
const failures = [];
const incomplete = [];

for (const route of routes) {
  try {
    const { html, pending } = await render(route);
    const { headTags, body } = splitHead(html);
    const page = buildPage(headTags, body);

    if (pending) incomplete.push(route);

    for (const file of outputPaths(route)) {
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, page, "utf8");
    }
    ok += 1;
  } catch (error) {
    failures.push({ route, message: error.message });
  }
}

rmSync(SSR_OUT, { recursive: true, force: true });

console.log(`Prerendered ${ok}/${routes.length} routes.`);

if (incomplete.length) {
  console.warn(
    `\n${incomplete.length} route(s) still contain a loading fallback — ` +
      "their content will only appear after hydration:"
  );
  for (const route of incomplete) console.warn(`  ${route}`);
}

if (failures.length) {
  console.error("\nFailed routes:");
  for (const f of failures) console.error(`  ${f.route}: ${f.message}`);
  // A route that can't be prerendered still works as an SPA page, so this is a
  // warning rather than a build failure — but it must be visible.
  process.exitCode = 0;
}
