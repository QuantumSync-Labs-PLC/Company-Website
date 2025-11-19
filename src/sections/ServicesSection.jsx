// src/sections/ServicesSection.jsx

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import services from "../data/services";
import ServiceCard from "../components/common/ServiceCard";
import SkeletonCard from "../components/common/SkeletonCard";
import SectionBackgroundBlur from "../components/common/SectionBackgroundBlur";
import SectionShell from "../components/common/SectionShell";

// Only show the first N (or featured) services on home page
const SERVICE_PREVIEW_COUNT = 6;

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, type: "spring", stiffness: 120, damping: 16 }
  }),
};

export default function ServicesSection() {
  // Use only featured or the first few services for home page
  const visibleServices = services.slice(0, SERVICE_PREVIEW_COUNT);

  return (
    <SectionShell
      id="services"
      title="Our Services"
      description="Explore our full suite of modern IT solutions designed for security, performance, and innovation."
      sectionClassName="relative py-16 sm:py-20 lg:py-24 px-4 md:px-0 bg-qs-bg text-qs-text scroll-mt-24 transition-colors duration-300"
      containerClassName="relative max-w-7xl mx-auto section-center z-10"
      titleClassName="font-headline text-3xl md:text-4xl font-bold text-qs-primary text-center mb-3 sm:mb-4"
      descriptionClassName="font-body text-qs-text-section text-base sm:text-lg text-center mb-10 sm:mb-12 max-w-2xl mx-auto"
    >
      {/* Decorative BG Blurs */}
      <SectionBackgroundBlur />

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {visibleServices.length === 0
          ? Array.from({ length: SERVICE_PREVIEW_COUNT }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : visibleServices.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: "0 6px 32px #0073FF55" }}
                containerClassName="glass shadow-neon-blue flex flex-col items-center p-7 rounded-glass min-h-[370px] max-w-sm mx-auto h-full"
              />
            ))}
      </div>
    </SectionShell>
  );
}

