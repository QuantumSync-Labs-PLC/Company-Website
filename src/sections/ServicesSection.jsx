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
      eyebrow="01 — Services"
      title="Our Services"
      description="Explore our full suite of modern IT solutions designed for security, performance, and innovation."
    >
      {/* Decorative BG Blurs */}
      <SectionBackgroundBlur />

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
        {visibleServices.length === 0
          ? Array.from({ length: SERVICE_PREVIEW_COUNT }).map((_, idx) => (
              <div key={idx} className={idx < 2 ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-1 lg:col-span-2"}>
                <SkeletonCard />
              </div>
            ))
          : visibleServices.map((service, i) => {
              const isFeatured = i === 0 || i === 1;
              const colSpan = isFeatured ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-1 lg:col-span-2";
              return (
                <div key={service.id} className={colSpan}>
                  <ServiceCard
                    service={service}
                    index={i}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 60px #22d3ee40" }}
                    size={isFeatured ? "lg" : "md"}
                  />
                </div>
              );
            })}
      </div>
    </SectionShell>
  );
}

