// src/pages/Services.jsx

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PageMeta from "@/components/seo/PageMeta";
import services from "@/data/services";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ServiceCard from "@/components/marketing/ServiceCard";
import SectionBackgroundBlur from "@/components/layout/SectionBackgroundBlur";

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
        <section className="relative py-20 sm:py-24 lg:py-32 flex flex-col items-center justify-center bg-qs-bg min-h-[45vh] sm:min-h-[50vh] px-4">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-10 left-10 w-96 h-96 bg-qs-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-qs-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <span className="eyebrow mb-4">What We Do</span>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text text-center mb-4 sm:mb-6">
              Our Services
            </h1>
            <p className="font-body text-qs-text-section text-lg sm:text-xl text-center max-w-3xl mx-auto leading-relaxed">
              Explore our full suite of modern IT solutions from cloud, AI, and app development to security, support, and user experience. We accelerate your business with technology.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-bg">
          {/* Decorative BG Blurs */}
          <SectionBackgroundBlur 
            topLeftClassName="pointer-events-none absolute top-0 left-0 w-80 h-80 bg-qs-primary blur-3xl opacity-10 z-0"
            bottomRightClassName="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-qs-accent blur-3xl opacity-10 z-0" 
          />

          <div className="relative max-w-7xl mx-auto z-10">
            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
              {services.map((service, i) => {
                const isFeatured = i === 0 || i === 1;
                const colSpan = isFeatured ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-1 lg:col-span-2";
                return (
                  <div key={service.id} className={colSpan}>
                    <ServiceCard
                      service={service}
                      index={i}
                      variants={cardVariants}
                      whileHover={{ y: -8, scale: 1.02, boxShadow: "var(--qs-shadow-neon)" }}
                      size={isFeatured ? "lg" : "md"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
