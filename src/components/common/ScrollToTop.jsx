import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

/**
 * ScrollToTop
 * - Scrolls window to top on route change
 * - Optionally renders a floating "Back to Top" button
 */
export default function ScrollToTop({ showButton = true, offset = 200 }) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Scroll to top when route/path changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Show floating button after scrolling down
  useEffect(() => {
    if (!showButton) return;
    const onScroll = () => setVisible(window.scrollY > offset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showButton, offset]);

  // Handler for the floating button
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showButton && visible && (
          <motion.button
            key="scroll-top-btn"
            aria-label="Scroll to top"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            onClick={handleScrollTop}
            className="fixed bottom-7 right-7 z-50 p-4 rounded-full glass border border-qs-primary/20 shadow-neon-blue hover:bg-qs-primary hover:text-white text-qs-primary text-xl transition-all duration-300 hover:scale-110"
            style={{ boxShadow: "0 12px 32px rgb(0, 115, 255, 0.4)" }}
          >
            <ArrowUp size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

ScrollToTop.propTypes = {
  showButton: PropTypes.bool,
  offset: PropTypes.number
};
