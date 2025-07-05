// src/pages/Services.jsx

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import services from "../data/services";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Button from "../components/common/Button";

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
    <div className="relative min-h-screen flex flex-col bg-section">
      <ScrollToTop showButton={true} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 flex flex-col items-center justify-center bg-navy min-h-[45vh]">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-blue text-center mb-4">
            Our Services
          </h1>
          <p className="font-body text-section text-lg text-center max-w-2xl mb-6">
            Explore our full suite of modern IT solutions—from cloud, AI, and app development to security, support, and user experience. We accelerate your business with technology.
          </p>
        </section>

        {/* Services Grid */}
        <section className="relative py-16 px-4 md:px-0 bg-section">
          {/* Decorative BG Blurs */}
          <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 bg-blue blur-3xl opacity-10 z-0" />
          <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-cyan blur-2xl opacity-15 z-0" />

          <div className="relative max-w-7xl mx-auto z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.17 }}
                    variants={cardVariants}
                    whileHover={{ y: -10, boxShadow: "0 8px 32px #0073FF45" }}
                    className="transition-transform"
                  >
                    <div className="glass shadow-neon-blue flex flex-col items-center p-8 rounded-glass h-full min-h-[370px] max-w-md mx-auto">
                      {/* Service Icon */}
                      <div className="mb-5 text-5xl text-blue flex justify-center items-center">
                        {Icon && <Icon className="text-blue text-4xl" />}
                      </div>
                      {/* Title */}
                      <h3 className="font-headline text-xl font-bold text-blue mb-3 text-center">
                        {service.title}
                      </h3>
                      {/* Excerpt */}
                      <p className="font-body text-section text-center mb-4">
                        {service.excerpt}
                      </p>
                      {/* Features */}
                      <ul className="mb-6 space-y-1 text-sm font-body text-section list-disc list-inside text-left">
                        {service.features?.slice(0, 3).map((feat) => (
                          <li key={feat}>{feat}</li>
                        ))}
                      </ul>
                      {/* Learn More Button */}
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
