/**
 * Server entry used only at build time by scripts/prerender.mjs.
 *
 * Deliberately does not import main.jsx: that file kicks off idle-time route
 * preloads at module scope, which have no meaning outside a browser.
 *
 * Every route, and most sections within a route, are React.lazy components.
 * A single renderToString pass would emit their Suspense fallbacks — literally
 * "Loading section..." — instead of the page. renderToPipeableStream resolves
 * them but emits React's streaming shell: the fallback text plus the real
 * content in hidden divs and inline swap scripts, which is not what we want
 * sitting in a static file.
 *
 * So: render repeatedly. Each pass starts the dynamic imports one level deeper
 * and React.lazy caches the resolved payloads, so the next pass renders that
 * level for real. When two consecutive passes match, everything has resolved
 * and the output is clean, single-pass HTML.
 */
import { renderToString } from "react-dom/server";
// React Router 7 merged the packages: StaticRouter comes from react-router,
// not the react-router-dom/server path that v6 used.
import { StaticRouter } from "react-router";
import App from "@/App";
import "./theme/tailwind.css";

const MAX_PASSES = 12;

/** Suspense fallbacks that mean a lazy boundary hasn't resolved yet. */
const PENDING_MARKERS = ["Loading section", "Loading page"];

function renderOnce(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

/**
 * Render one route to a complete HTML string.
 * @param {string} url - route path, e.g. "/pricing"
 * @returns {Promise<{ html: string, passes: number, pending: boolean }>}
 */
export async function render(url) {
  let previous = null;
  let html = "";
  let passes = 0;

  for (let i = 0; i < MAX_PASSES; i += 1) {
    html = renderOnce(url);
    passes = i + 1;

    const settled = html === previous;
    const pending = PENDING_MARKERS.some((marker) => html.includes(marker));
    if (settled && !pending) break;

    previous = html;
    // Let the dynamic imports started by this pass actually resolve.
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  return {
    html,
    passes,
    pending: PENDING_MARKERS.some((marker) => html.includes(marker)),
  };
}
