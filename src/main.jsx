import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./theme/tailwind.css";

/**
 * Preload critical pages during idle time for faster navigation
 * Uses requestIdleCallback for non-blocking resource loading
 */
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload high-traffic pages
    import("./pages/Services");
    import("./pages/About");
    import("./pages/Contact");
  });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(() => {
    import("./pages/Services");
    import("./pages/About");
    import("./pages/Contact");
  }, 1000);
}

/**
 * Application entry point
 * Wraps App with necessary providers:
 * - React.StrictMode: Development mode checks
 * - BrowserRouter: Client-side routing
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
