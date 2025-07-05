// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import previousJobs from "../data/previousJobs";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.11, type: "spring", stiffness: 130, damping: 18 }
  }),
};

export default function PreviousJobsSection() {
  // Simple custom carousel state
  const [index, setIndex] = useState(0);
  const total = previousJobs.length;

  const prev = () => setIndex(index === 0 ? total - 1 : index - 1);
  const next = () => setIndex(index === total - 1 ? 0 : index + 1);

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

        {/* Carousel for desktop, stacked for mobile */}
        <div className="flex flex-col items-center">
          <div className="flex gap-4 items-center w-full max-w-3xl">
            {/* Left arrow */}
            <button
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-blue/10 hover:bg-blue/30 text-blue shadow transition"
              onClick={prev}
              aria-label="Previous Project"
            >
              <FaChevronLeft />
            </button>
            {/* Card */}
            <motion.div
              key={previousJobs[index].id}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              custom={index}
              className="glass shadow-neon-blue flex flex-col md:flex-row items-center w-full min-w-[260px] max-w-xl mx-auto py-6 px-4 rounded-glass transition"
            >
              <img
                src={previousJobs[index].img}
                alt={previousJobs[index].title}
                className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-xl mb-4 md:mb-0 md:mr-6 border-2 border-blue shadow"
                loading="lazy"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-headline text-xl font-bold text-blue mb-2">{previousJobs[index].title}</h3>
                <p className="font-body text-section mb-1">{previousJobs[index].description}</p>
              </div>
            </motion.div>
            {/* Right arrow */}
            <button
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-blue/10 hover:bg-blue/30 text-blue shadow transition"
              onClick={next}
              aria-label="Next Project"
            >
              <FaChevronRight />
            </button>
          </div>
          {/* Dots for carousel navigation */}
          <div className="flex gap-2 mt-4">
            {previousJobs.map((job, i) => (
              <button
                key={job.id}
                className={`w-3 h-3 rounded-full ${i === index ? "bg-blue" : "bg-blue/30"} transition`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
