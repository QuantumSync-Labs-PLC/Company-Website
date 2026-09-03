import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/utils/analytics";

/**
 * RouteAnalytics
 * Sends a GA4 page_view on first render and on every client-side route change.
 * Without this a single-page app only ever reports its entry page.
 *
 * Renders nothing. Must live inside the router.
 */
export default function RouteAnalytics() {
  const { pathname, search } = useLocation();
  const lastPath = useRef(null);

  useEffect(() => {
    const path = `${pathname}${search}`;

    // StrictMode re-runs effects in development; only report real changes.
    if (lastPath.current === path) return;
    lastPath.current = path;

    // React 19 hoists the page's <title> during commit, so wait a frame to
    // read the title the new page actually set rather than the previous one.
    const id = requestAnimationFrame(() => trackPageView(path, document.title));
    return () => cancelAnimationFrame(id);
  }, [pathname, search]);

  return null;
}
