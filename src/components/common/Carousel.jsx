import { useState, useRef, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    position: "absolute",
  }),
  center: { x: 0, opacity: 1, position: "relative" },
  exit: (direction) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    position: "absolute",
  }),
};

export default function Carousel({
  slides = [],
  autoPlay = true,
  interval = 6000,
  className = "",
  dotColor = "bg-blue",
  arrowColor = "text-blue",
  ...props
}) {
  const slideCount = slides.length;
  const [[page, direction], setPage] = useState([0, 0]);
  const autoPlayRef = useRef();

  // Go to the next or previous slide
  const paginate = useCallback((newDirection) => {
    setPage(([prev]) => [
      (prev + newDirection + slideCount) % slideCount,
      newDirection,
    ]);
  }, [slideCount]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || !slideCount) return;
    autoPlayRef.current = setInterval(() => paginate(1), interval);
    return () => clearInterval(autoPlayRef.current);
  }, [page, autoPlay, interval, slideCount, paginate]);

  // Defensive: do not render if empty
  if (!slideCount) return null;

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto glass shadow-neon-blue px-4 py-8 overflow-hidden flex flex-col items-center ${className}`}
      {...props}
    >
      {/* Slides */}
      <div className="relative w-full h-full min-h-[140px] flex items-center justify-center">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 350, damping: 38, duration: 0.7 }}
            className="w-full h-full flex items-center justify-center"
          >
            {slides[page]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <button
        aria-label="Previous"
        className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy/80 hover:bg-blue/70 border border-blue shadow-lg ${arrowColor}`}
        onClick={() => paginate(-1)}
        tabIndex={0}
        type="button"
        style={{ zIndex: 5 }}
      >
        <FaChevronLeft size={22} />
      </button>
      <button
        aria-label="Next"
        className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy/80 hover:bg-blue/70 border border-blue shadow-lg ${arrowColor}`}
        onClick={() => paginate(1)}
        tabIndex={0}
        type="button"
        style={{ zIndex: 5 }}
      >
        <FaChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="flex gap-2 justify-center mt-5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full border border-blue transition-all duration-200 ${
              idx === page ? `${dotColor}` : "bg-navy"
            }`}
            onClick={() => setPage([idx, idx > page ? 1 : -1])}
            tabIndex={0}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node),
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  className: PropTypes.string,
  dotColor: PropTypes.string,
  arrowColor: PropTypes.string,
};
