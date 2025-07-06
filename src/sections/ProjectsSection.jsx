// src/sections/ProjectsSection.jsx

import reviews from "../data/reviews";

export default function ProjectsSection() {

  return (
    <section
      id="projects"
      className="relative py-20 px-4 md:px-0 bg-section scroll-mt-24"
      aria-labelledby="projects-heading"
    >
      {/* Decorative BG */}
      <div className="pointer-events-none absolute top-0 left-0 w-56 h-56 bg-blue blur-3xl opacity-10 z-0" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 bg-cyan blur-2xl opacity-10 z-0" />

      <div className="relative max-w-7xl mx-auto section-center z-10">
        <h2
          id="projects-heading"
          className="font-headline text-3xl md:text-4xl font-bold text-blue text-center mb-4"
        >
          Our Track Record
        </h2>
        <p className="font-body text-section text-lg text-center mb-10 max-w-2xl mx-auto">
          QuantumSync Labs has empowered businesses and institutions with modern, scalable solutions. Here’s what our clients say.
        </p>

        {/* Project count - emphasized */}
        <div className="flex justify-center mb-16">
          <span className="inline-block bg-gradient-to-r from-blue to-cyan text-white font-extrabold rounded-2xl px-8 py-5 text-3xl font-headline tracking-wider shadow-lg ring-2 ring-blue/20 animate-pulse select-none">
            {15}+ Completed Projects
          </span>
        </div>

        {/* Customer Reviews Section */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-headline text-2xl font-bold text-blue text-center mb-8">Customer Reviews</h3>
          <div className="grid gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="glass rounded-glass shadow p-5 border border-blue/20"
              >
                <p className="font-body text-section text-base mb-2 italic">“{review.text}”</p>
                <div className="font-headline text-blue font-semibold text-sm">
                  — {review.name}, <span className="text-section">{review.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
