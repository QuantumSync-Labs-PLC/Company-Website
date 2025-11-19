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
      <div className="flex flex-col min-h-screen items-center justify-center bg-qs-bg">
        <h2 className="font-headline text-2xl text-qs-primary font-bold mb-6">Service Not Found</h2>
        <button
          className="bg-qs-primary text-qs-text font-bold px-8 py-3 rounded-glass shadow-neon hover:bg-qs-accent transition"
          onClick={() => navigate("/services")}
        >
          Back to Services
        </button>
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
      <main className="flex-1 py-12 sm:py-16 md:py-24 px-4 flex flex-col items-center" role="main">
        <article className="glass rounded-glass shadow-neon max-w-3xl w-full mx-auto p-6 sm:p-8 md:p-12">
          {/* Service Icon and Title */}
          <div className="flex flex-col items-center mb-6">
            {Icon && (
              <div className="text-qs-primary text-4xl sm:text-5xl mb-2">
                <Icon className="text-qs-primary text-4xl sm:text-5xl" />
              </div>
            )}
            <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-qs-primary text-center mb-2">
              {service.title}
            </h1>
          </div>
          {/* Cover Image */}
          {service.cover && (
            <img
              src={service.cover}
              alt={service.title}
              className="w-full max-w-full h-52 sm:h-56 md:h-72 object-cover rounded-xl shadow mb-6"
              loading="lazy"
            />
          )}
          {/* Description (markdown support) */}
          <div className="font-body text-base sm:text-lg text-qs-text-section mb-6 text-center prose prose-invert max-w-none">
            <ReactMarkdown>{service.description}</ReactMarkdown>
          </div>
          {/* Features List */}
          {service.features && (
            <ul className="mb-8 space-y-2 text-sm sm:text-base font-body text-qs-text-section list-disc list-inside text-left sm:text-left">
              {service.features.map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
          )}
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/services"
              className="inline-block bg-qs-bg text-qs-primary font-bold px-8 py-3 rounded-glass border border-qs-primary shadow hover:bg-qs-primary hover:text-qs-text transition text-base"
            >
              ← Back to All Services
            </Link>
            <Link
              to={contactLink}
              className="inline-block bg-qs-primary text-qs-text font-bold px-8 py-3 rounded-glass shadow-neon hover:bg-qs-accent transition text-base"
            >
              Contact Us About {service.title}
            </Link>
          </div>
        </article>

        {/* Related Services Section */}
        {related.length > 0 && (
          <section className="w-full max-w-5xl mx-auto mt-16 sm:mt-20">
            <h2 className="font-headline text-2xl sm:text-3xl text-qs-primary font-bold mb-6 sm:mb-8 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {related.map((rel, i) => {
                const RelIcon = rel.icon;
                return (
                  <motion.div
                    key={rel.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ delay: i * 0.07 }}
                    className="glass shadow-neon p-6 sm:p-7 flex flex-col items-center rounded-glass min-h-[280px] sm:min-h-[310px]"
                  >
                    <div className="text-qs-primary text-3xl sm:text-4xl mb-3">
                      {RelIcon && <RelIcon className="text-qs-primary text-3xl sm:text-4xl" />}
                    </div>
                    <div className="font-headline text-base sm:text-lg font-semibold text-qs-primary mb-2 text-center">{rel.title}</div>
                    <div className="font-body text-qs-text-section text-sm sm:text-base text-center mb-4">{rel.excerpt}</div>
                    <Link
                      to={rel.link}
                      className="inline-block bg-qs-primary text-qs-text font-semibold px-6 py-2 rounded-glass shadow hover:bg-qs-accent transition text-sm mt-auto"
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
