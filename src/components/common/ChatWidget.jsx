import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    // Only load Crisp if the script doesn't already exist
    if (typeof window.$crisp !== "undefined") {
      return;
    }

    // Get Crisp website ID from environment variables
    const crispWebsiteId = import.meta.env.VITE_CRISP_WEBSITE_ID;

    if (!crispWebsiteId) {
      // Crisp is not configured, skip initialization
      return;
    }

    // Load Crisp script
    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;

    script.onload = () => {
      // Initialize Crisp with website ID
      if (typeof window.$crisp !== "undefined") {
        window.$crisp.push(["config", "website:id", crispWebsiteId]);
        window.$crisp.push(["do", "show"]);
      }
    };

    document.head.appendChild(script);

    // Cleanup: Remove script on unmount (optional, usually kept for session persistence)
    return () => {
      // Note: We intentionally don't remove the Crisp script to maintain chat state
      // across page navigations in an SPA
    };
  }, []);

  // This component doesn't render anything visible; Crisp injects its own UI
  return null;
}
