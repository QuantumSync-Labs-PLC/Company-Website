/**
 * Reads the app's real route data for build-time tooling.
 *
 * Shared by generate-sitemap.mjs and prerender.mjs so the sitemap and the
 * prerendered pages can never describe different sets of URLs.
 *
 * The data modules import image assets and lucide-react icons, neither of which
 * Node can load directly, so they're bundled with those imports stubbed out.
 */
import { build } from "esbuild";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const ASSET_RE = /\.(webp|png|jpe?g|svg|gif|css)$/;

const stubAssets = {
  name: "stub-assets",
  setup(b) {
    // The app resolves "@/x" through Vite's alias; esbuild needs to be told.
    // Assets are checked first: returning a real path here would put them back
    // in the default namespace, where esbuild has no loader for .webp.
    b.onResolve({ filter: /^@\// }, (args) =>
      ASSET_RE.test(args.path)
        ? { path: args.path, namespace: "stub" }
        : { path: join(root, "src", args.path.slice(2)) }
    );
    b.onResolve({ filter: ASSET_RE }, (args) => ({
      path: args.path,
      namespace: "stub",
    }));
    b.onResolve({ filter: /^lucide-react$/ }, (args) => ({
      path: args.path,
      namespace: "icon-stub",
    }));
    b.onLoad({ filter: /.*/, namespace: "stub" }, (args) => ({
      contents: `export default ${JSON.stringify(args.path)};`,
      loader: "js",
    }));
    b.onLoad({ filter: /.*/, namespace: "icon-stub" }, () => ({
      // CommonJS so esbuild allows any named import (Cog, Cloud, …) to resolve
      // through interop rather than failing on a missing export.
      contents: "module.exports = new Proxy({}, { get: () => null });",
      loader: "js",
    }));
  },
};

async function loadModule(relativePath) {
  const result = await build({
    entryPoints: [join(root, relativePath)],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    plugins: [stubAssets],
  });

  const code = result.outputFiles[0].text;
  return import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
}

/**
 * @returns {Promise<{
 *   navRoutes: {name: string, path: string}[],
 *   services: {id: string}[],
 *   caseStudies: {id: string}[],
 *   blogPosts: {id: string, date: string}[],
 *   allPaths: string[]
 * }>}
 */
export async function loadRouteData() {
  const [servicesMod, caseStudiesMod, blogMod, routesMod] = await Promise.all([
    loadModule("src/data/services.js"),
    loadModule("src/data/caseStudies.js"),
    loadModule("src/data/blogPosts.js"),
    loadModule("src/constants/routes.js"),
  ]);

  const services = servicesMod.default;
  const caseStudies = caseStudiesMod.default;
  const blogPosts = blogMod.default;
  const navRoutes = routesMod.default;

  const allPaths = [
    ...navRoutes.map((r) => r.path),
    ...services.map((s) => `/services/${s.id}`),
    ...caseStudies.map((c) => `/work/${c.id}`),
    ...blogPosts.map((p) => `/blog/${p.id}`),
  ];

  return { navRoutes, services, caseStudies, blogPosts, allPaths };
}
