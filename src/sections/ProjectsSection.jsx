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
      sectionClassName="relative py-20 px-4 md:px-0 bg-qs-bg text-qs-text scroll-mt-24 transition-colors duration-300"
      containerClassName="relative max-w-7xl mx-auto section-center z-10"
      titleClassName="font-headline text-3xl md:text-4xl font-bold text-qs-primary text-center mb-4"
      descriptionClassName="font-body text-qs-text-section text-lg text-center mb-10 max-w-2xl mx-auto"
    >
      {/* Decorative BG */}
      <SectionBackgroundBlur topLeftClassName="pointer-events-none absolute top-0 left-0 w-56 h-56 bg-qs-primary blur-3xl opacity-10 z-0" />

      {/* Project count - emphasized */}
      <div className="flex justify-center mb-16">
        <span className="inline-block bg-qs-gradient-primary text-white font-extrabold rounded-2xl px-8 py-5 text-3xl font-headline tracking-wider shadow-lg ring-2 ring-qs-primary/20 animate-pulse select-none">
          {15}+ Completed Projects
        </span>
      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-2xl mx-auto">
        <h3 className="font-headline text-2xl font-bold text-qs-primary text-center mb-8">Customer Reviews</h3>
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="glass rounded-glass shadow p-5 border border-qs-primary/20"
            >
              <p className="font-body text-qs-text-section text-base mb-2 italic">"{review.text}"</p>
              <div className="font-headline text-qs-primary font-semibold text-sm">
                — {review.name}, <span className="text-qs-text-section">{review.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
