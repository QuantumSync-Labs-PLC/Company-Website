// src/pages/ServiceDetail.jsx

import { useParams, Link, useNavigate } from "react-router-dom";
import services from "../data/services";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import PageMeta from "../components/common/PageMeta";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);
  const navigate = useNavigate();

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-qs-bg px-4">
        <div className="glass rounded-glass shadow-neon-blue border border-qs-primary/20 p-10 sm:p-12 max-w-lg w-full text-center">
          <h2 className="font-headline text-3xl sm:text-4xl text-qs-primary font-bold mb-4">Service Not Found</h2>
          <p className="font-body text-qs-text-section mb-8 text-lg">The service you're looking for doesn't exist.</p>
          <button
            className="bg-qs-primary hover:bg-qs-primary-hover text-white font-bold px-10 py-4 rounded-glass shadow-neon-blue transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/services")}
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  // Related services: all except this one, limit to 3 random
  const related = services
    .filter((s) => s.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Prepare contact link (prefill subject)
  const contactLink = `/contact?subject=${encodeURIComponent(service.title)}`;

  const appUrl = import.meta.env.VITE_APP_URL || "https://www.quantumsynclabs.com";
  const serviceUrl = `${appUrl}/services/${service.id}`;

  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title={service.title}
        description={service.excerpt || service.description}
        url={serviceUrl}
        ogImage={service.cover}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.excerpt || service.description,
            url: serviceUrl,
            provider: {
              '@type': 'Organization',
              name: 'QuantumSync Labs',
            },
          })}
        </script>
      </PageMeta>
      <main className="flex-1 py-16 sm:py-20 md:py-28 px-4 flex flex-col items-center" role="main">
        <article className="glass rounded-glass shadow-neon-blue border border-qs-primary/10 max-w-4xl w-full mx-auto p-8 sm:p-10 md:p-14">
          {/* Service Icon and Title */}
          <div className="flex flex-col items-center mb-8">
            {Icon && (
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-qs-primary/10 border-2 border-qs-primary mb-6 shadow-lg">
                <Icon className="text-qs-primary text-5xl sm:text-6xl" />
              </div>
            )}
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold bg-qs-gradient-primary bg-clip-text text-transparent text-center mb-3">
              {service.title}
            </h1>
          </div>
          {/* Cover Image */}
          {service.cover && (
            <img
              src={service.cover}
              alt={service.title}
              className="w-full max-w-full h-64 sm:h-72 md:h-80 object-cover rounded-glass shadow-lg mb-8 border border-qs-primary/20"
              loading="lazy"
            />
          )}
          {/* Description (markdown support) */}
          <div className="font-body text-base sm:text-lg text-qs-text-section mb-8 text-center prose prose-invert max-w-none leading-relaxed">
            <ReactMarkdown>{service.description}</ReactMarkdown>
          </div>
          {/* Features List */}
          {service.features && (
            <div className="mb-10">
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-qs-primary mb-4 text-center">Key Features</h3>
              <ul className="space-y-3 text-sm sm:text-base font-body text-qs-text-section list-disc list-inside text-left max-w-2xl mx-auto">
                {service.features.map((feat) => (
                  <li key={feat} className="leading-relaxed">{feat}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              to="/services"
              className="inline-block glass text-qs-primary font-bold px-10 py-4 rounded-glass border-2 border-qs-primary hover:bg-qs-primary hover:text-white transition-all duration-300 transform hover:scale-105 text-base"
            >
              ← Back to All Services
            </Link>
            <Link
              to={contactLink}
              className="inline-block bg-qs-primary hover:bg-qs-primary-hover text-white font-bold px-10 py-4 rounded-glass shadow-neon-blue transition-all duration-300 transform hover:scale-105 text-base"
            >
              Contact Us About {service.title}
            </Link>
          </div>
        </article>

        {/* Related Services Section */}
        {related.length > 0 && (
          <section className="w-full max-w-6xl mx-auto mt-20 sm:mt-24">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold bg-qs-gradient-primary bg-clip-text text-transparent mb-10 sm:mb-14 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {related.map((rel, i) => {
                const RelIcon = rel.icon;
                return (
                  <motion.div
                    key={rel.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="glass shadow-neon-blue border border-qs-primary/10 p-7 sm:p-8 flex flex-col items-center rounded-glass min-h-[300px] sm:min-h-[330px] transition-all duration-300 hover:border-qs-primary/30"
                  >
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-qs-primary/10 border-2 border-qs-primary mb-4 shadow-md">
                      {RelIcon && <RelIcon className="text-qs-primary text-3xl sm:text-4xl" />}
                    </div>
                    <div className="font-headline text-lg sm:text-xl font-bold text-qs-primary mb-3 text-center">{rel.title}</div>
                    <div className="font-body text-qs-text-section text-sm sm:text-base text-center mb-5 line-clamp-3 leading-relaxed">{rel.excerpt}</div>
                    <Link
                      to={rel.link}
                      className="inline-block bg-qs-primary hover:bg-qs-primary-hover text-white font-bold px-8 py-3 rounded-glass shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm mt-auto"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
