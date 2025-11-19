import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./theme/tailwind.css";

// Enable React.lazy preloading for critical chunks
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    import("./pages/Services");
    import("./pages/About");
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
