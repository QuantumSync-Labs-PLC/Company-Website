/* eslint-disable no-unused-vars */
// src/sections/PreviousJobsSection.jsx

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import previousJobs from "../data/previousJobs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Optional: for swipe gestures (install with: npm i react-swipeable)
// import { useSwipeable } from "react-swipeable";

const cardVariants = {
  initial: { opacity: 0, y: 32, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16 } },
  exit: { opacity: 0, y: -24, scale: 0.96, transition: { duration: 0.2 } }
};

function handleImgError(e) {
  e.target.src = "https://via.placeholder.com/160x160?text=No+Image";
}

export default function PreviousJobsSection() {
  const [index, setIndex] = useState(0);
  const total = previousJobs.length;
  const carouselRef = useRef(null);

  // Uncomment to add swipe gestures:
  // const handlers = useSwipeable({
  //   onSwipedLeft: () => next(),
  //   onSwipedRight: () => prev(),
  //   trackMouse: true,
  // });

  const prev = () => setIndex(index === 0 ? total - 1 : index - 1);
  const next = () => setIndex(index === total - 1 ? 0 : index + 1);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
  };

  return (
    <section
      id="previous-jobs"
      className="relative py-20 px-4 md:px-0 bg-section scroll-mt-24"
      aria-labelledby="jobs-heading"
    >
      {/* Decorative BG */}
      <div className="pointer-events-none absolute top-0 left-0 w-56 h-56 bg-blue blur-3xl opacity-10 z-0" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 bg-cyan blur-2xl opacity-10 z-0" />

      <div className="relative max-w-7xl mx-auto section-center z-10">
        <h2
          id="jobs-heading"
          className="font-headline text-3xl md:text-4xl font-bold text-blue text-center mb-4"
        >
          Recent Projects & Success Stories
        </h2>
        <p className="font-body text-section text-lg text-center mb-12 max-w-2xl mx-auto">
          See how QuantumSync Labs helps clients accelerate digital growth and innovation.
        </p>

        <div className="flex flex-col items-center">
          <div
            className="flex gap-4 items-center w-full max-w-3xl"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            ref={carouselRef}
            aria-roledescription="carousel"
            aria-label="Previous projects"
          >
            {/* Left arrow */}
            <button
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-blue/10 hover:bg-blue/30 text-blue shadow transition focus:ring-2 focus:ring-blue focus:outline-none"
              onClick={prev}
              aria-label="Previous Project"
              tabIndex={0}
            >
              <FaChevronLeft />
            </button>
            {/* Card */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={previousJobs[index].id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, type: "spring" }}
                className="glass shadow-neon-blue flex flex-col md:flex-row items-center w-full min-w-[260px] max-w-xl mx-auto py-6 px-4 rounded-glass transition"
              >
                <img
                  src={previousJobs[index].img}
                  alt={previousJobs[index].title || "Project image"}
                  className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-xl mb-4 md:mb-0 md:mr-6 border-2 border-blue shadow"
                  loading="lazy"
                  onError={handleImgError}
                  draggable={false}
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-headline text-xl font-bold text-blue mb-2">
                    {previousJobs[index].title}
                  </h3>
                  <p className="font-body text-section mb-1">
                    {previousJobs[index].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Right arrow */}
            <button
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-blue/10 hover:bg-blue/30 text-blue shadow transition focus:ring-2 focus:ring-blue focus:outline-none"
              onClick={next}
              aria-label="Next Project"
              tabIndex={0}
            >
              <FaChevronRight />
            </button>
          </div>
          {/* Dots for carousel navigation */}
          <div className="flex gap-2 mt-4">
            {previousJobs.map((job, i) => (
              <button
                key={job.id}
                className={`w-3 h-3 rounded-full border-2 border-blue ${i === index ? "bg-blue" : "bg-blue/30"} transition`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : "false"}
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
