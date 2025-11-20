/**
 * Application routes configuration
 * Used for navigation menus and route generation
 * @typedef {Object} Route
 * @property {string} name - Display name in navigation
 * @property {string} path - URL path
 * @property {boolean} [hidden] - Whether to hide from navigation menus
 * @property {string} [icon] - Optional icon name
 */

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

/**
 * Dynamic routes (not shown in main navigation)
 */
export const dynamicRoutes = [
  {
    name: "Service Detail",
    path: "/services/:id",
    hidden: true,
  },
  {
    name: "Blog Post",
    path: "/blog/:id",
    hidden: true,
  },
];

export default routes;
