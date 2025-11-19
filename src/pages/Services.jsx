// src/pages/Services.jsx

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import PageMeta from "../components/common/PageMeta";
import services from "../data/services";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ServiceCard from "../components/common/ServiceCard";
import SectionBackgroundBlur from "../components/common/SectionBackgroundBlur";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, type: "spring", stiffness: 120, damping: 18 }
  }),
};

export default function Services() {
  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="Services"
        description="Discover QuantumSync Labs services in cloud, AI, web, and mobile development tailored for your business."
        url="/services"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'IT Services',
            provider: {
              '@type': 'Organization',
              name: 'QuantumSync Labs',
            },
            areaServed: 'Worldwide',
          })}
        </script>
      </PageMeta>
      <main role="main">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 flex flex-col items-center justify-center bg-qs-bg min-h-[40vh] sm:min-h-[45vh] px-4">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-qs-primary text-center mb-3 sm:mb-4">
            Our Services
          </h1>
          <p className="font-body text-qs-text-section text-base sm:text-lg text-center max-w-2xl mb-6">
            Explore our full suite of modern IT solutions—from cloud, AI, and app development to security, support, and user experience. We accelerate your business with technology.
          </p>
        </section>

        {/* Services Grid */}
        <section className="relative py-14 sm:py-16 lg:py-20 px-4 md:px-0 bg-qs-bg">
          {/* Decorative BG Blurs */}
          <SectionBackgroundBlur bottomRightClassName="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-cyan blur-2xl opacity-15 z-0" />

          <div className="relative max-w-7xl mx-auto z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  variants={cardVariants}
                  whileHover={{ y: -10, boxShadow: "0 8px 32px #0073FF45" }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
