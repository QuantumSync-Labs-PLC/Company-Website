// src/sections/ProjectsSection.jsx

import reviews from "../data/reviews";
import SectionBackgroundBlur from "../components/common/SectionBackgroundBlur";
import SectionShell from "../components/common/SectionShell";
import TestimonialCarousel from "../components/common/TestimonialCarousel";
import StatCounter from "../components/common/StatCounter";

export default function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      eyebrow="04 — Track Record"
      title="Our Track Record"
      description="QuantumSync Labs has empowered businesses and institutions with modern, scalable solutions. Here’s what our clients say."
    >
      {/* Decorative BG */}
      <SectionBackgroundBlur topLeftClassName="pointer-events-none absolute top-0 left-0 w-56 h-56 bg-qs-primary blur-3xl opacity-10 z-0" />

      {/* Project count */}
      <div className="flex justify-center mb-16 sm:mb-20">
        <StatCounter
          value={15}
          suffix="+"
          label="Completed Projects"
          duration={2.5}
        />
      </div>

      {/* Testimonial Carousel */}
      <div className="max-w-3xl mx-auto">
        <TestimonialCarousel
          testimonials={reviews.map((review) => ({
            quote: review.text,
            author: review.name,
            company: review.position,
            rating: 5,
          }))}
        />
      </div>
    </SectionShell>
  );
}
