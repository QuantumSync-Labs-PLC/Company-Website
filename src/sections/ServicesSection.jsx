// src/sections/ServicesSection.jsx

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import services from "../data/services";
import Button from "../components/common/Button";

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
    <section
      id="services"
      className="relative py-20 px-4 md:px-0 bg-section scroll-mt-24"
      aria-labelledby="services-heading"
    >
      {/* Decorative BG Blurs */}
      <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 bg-blue blur-3xl opacity-10 z-0" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-cyan blur-2xl opacity-15 z-0" />

      <div className="relative max-w-7xl mx-auto section-center z-10">
        <h2
          id="services-heading"
          className="font-headline text-3xl md:text-4xl font-bold text-blue text-center mb-4"
        >
          Our Services
        </h2>
        <p className="font-body text-section text-lg text-center mb-12 max-w-2xl mx-auto">
          Explore our full suite of modern IT solutions designed for security, performance, and innovation.
        </p>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: "0 6px 32px #0073FF55" }}
                className="transition-transform"
              >
                <div className="glass shadow-neon-blue flex flex-col items-center p-7 rounded-glass min-h-[370px] max-w-sm mx-auto h-full">
                  <div className="mb-4 text-5xl text-blue flex justify-center items-center">
                    {Icon && <Icon className="text-blue text-4xl" />}
                  </div>
                  <h3 className="font-headline text-xl font-bold text-blue mb-2 text-center">
                    {service.title}
                  </h3>
                  <p className="font-body text-section text-center mb-4">
                    {service.excerpt}
                  </p>
                  <ul className="mb-4 space-y-1 text-sm font-body text-section list-disc list-inside text-left w-full max-w-xs mx-auto">
                    {(service.features || []).slice(0, 3).map((feat) => (
                      <li key={feat}>{feat}</li>
                    ))}
                  </ul>
                  <Link to={service.link} aria-label={`Learn more about ${service.title}`} className="mt-auto w-full">
                    <Button className="w-full text-sm font-semibold">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Button */}
        {services.length > SERVICE_PREVIEW_COUNT && (
          <div className="flex justify-center mt-10">
            <Link to="/services">
              <Button className="px-8 text-base font-semibold">
                View All Services
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
