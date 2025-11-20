// src/sections/ProjectsSection.jsx

import reviews from "../data/reviews";
import SectionBackgroundBlur from "../components/common/SectionBackgroundBlur";
import SectionShell from "../components/common/SectionShell";

export default function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      title="Our Track Record"
      description="QuantumSync Labs has empowered businesses and institutions with modern, scalable solutions. Here’s what our clients say."
      sectionClassName="relative py-20 sm:py-24 lg:py-28 px-4 md:px-6 bg-qs-bg text-qs-text scroll-mt-24 transition-colors duration-300"
      containerClassName="relative max-w-7xl mx-auto section-center z-10"
      titleClassName="font-headline text-4xl md:text-5xl font-bold bg-qs-gradient-primary bg-clip-text text-transparent text-center mb-4 sm:mb-5"
      descriptionClassName="font-body text-qs-text-section text-lg sm:text-xl text-center mb-12 sm:mb-14 max-w-3xl mx-auto leading-relaxed"
    >
      {/* Decorative BG */}
      <SectionBackgroundBlur topLeftClassName="pointer-events-none absolute top-0 left-0 w-56 h-56 bg-qs-primary blur-3xl opacity-10 z-0" />

      {/* Project count - emphasized */}
      <div className="flex justify-center mb-16 sm:mb-20">
        <span className="inline-block bg-qs-gradient-primary text-white font-extrabold rounded-2xl px-10 py-6 text-3xl sm:text-4xl font-headline tracking-wider shadow-neon-blue animate-pulse select-none border border-qs-primary/30">
          {15}+ Completed Projects
        </span>
      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-3xl mx-auto">
        <h3 className="font-headline text-3xl md:text-4xl font-bold text-qs-primary text-center mb-10 sm:mb-12">Customer Reviews</h3>
        <div className="grid gap-6 sm:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="glass rounded-glass shadow-neon-blue p-6 sm:p-8 border border-qs-primary/20 hover:border-qs-primary/40 transition-all duration-300 hover:shadow-xl"
            >
              <p className="font-body text-qs-text-section text-base sm:text-lg mb-4 italic leading-relaxed">"{review.text}"</p>
              <div className="font-headline text-qs-primary font-semibold text-sm sm:text-base">
                — {review.name}, <span className="text-qs-text-section">{review.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
