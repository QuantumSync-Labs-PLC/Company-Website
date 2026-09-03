/**
 * Application routes configuration.
 *
 * This is the single source of truth for navigation. Header and Footer both
 * read from it — they previously kept their own hardcoded lists, which had
 * already drifted (this file was missing /work while the header had it).
 *
 * Order is deliberate: Services and Work carry the most buying intent, so they
 * sit ahead of Blog and Careers.
 *
 * @typedef {Object} Route
 * @property {string} name - Display name in navigation
 * @property {string} path - URL path
 * @property {boolean} [primary] - Highlighted as the main call to action
 */

const routes = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Work", path: "/work" },
  { name: "How We Work", path: "/process" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact", primary: true },
];

/**
 * Dynamic routes (not shown in navigation)
 */
export const dynamicRoutes = [
  { name: "Service Detail", path: "/services/:id", hidden: true },
  { name: "Case Study Detail", path: "/work/:id", hidden: true },
  { name: "Blog Post", path: "/blog/:id", hidden: true },
];

/** Static, indexable paths — used to build the sitemap. */
export const staticPaths = routes.map((route) => route.path);

export default routes;
