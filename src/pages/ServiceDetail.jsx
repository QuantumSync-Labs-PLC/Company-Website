// src/pages/ServiceDetail.jsx

import { useParams, Link, useNavigate } from "react-router-dom";
import services from "../data/services";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);
  const navigate = useNavigate();

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-section">
        <h2 className="font-headline text-2xl text-blue font-bold mb-6">Service Not Found</h2>
        <button
          className="bg-blue text-white font-bold px-8 py-3 rounded-glass shadow-neon-blue hover:bg-cyan transition"
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

  return (
    <div className="relative min-h-screen flex flex-col bg-section">
      <ScrollToTop showButton={true} />
      <Header />
      <main className="flex-1 py-12 md:py-24 px-4 flex flex-col items-center">
        <article className="glass rounded-glass shadow-neon-blue max-w-3xl w-full mx-auto p-6 md:p-12">
          {/* Service Icon and Title */}
          <div className="flex flex-col items-center mb-6">
            {Icon && (
              <div className="text-blue text-5xl mb-2">
                <Icon className="text-blue text-5xl" />
              </div>
            )}
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-blue text-center mb-2">
              {service.title}
            </h1>
          </div>
          {/* Cover Image */}
          {service.cover && (
            <img
              src={service.cover}
              alt={service.title}
              className="w-full h-56 md:h-72 object-cover rounded-xl shadow mb-6"
              loading="lazy"
            />
          )}
          {/* Description (markdown support) */}
          <div className="font-body text-lg text-section mb-6 text-center prose prose-invert max-w-none">
            <ReactMarkdown>{service.description}</ReactMarkdown>
          </div>
          {/* Features List */}
          {service.features && (
            <ul className="mb-8 space-y-2 text-base font-body text-section list-disc list-inside">
              {service.features.map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
          )}
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/services"
              className="inline-block bg-navy text-blue font-bold px-8 py-3 rounded-glass border border-blue shadow hover:bg-blue hover:text-white transition text-base"
            >
              ← Back to All Services
            </Link>
            <Link
              to={contactLink}
              className="inline-block bg-blue text-white font-bold px-8 py-3 rounded-glass shadow-neon-blue hover:bg-cyan transition text-base"
            >
              Contact Us About {service.title}
            </Link>
          </div>
        </article>

        {/* Related Services Section */}
        {related.length > 0 && (
          <section className="w-full max-w-5xl mx-auto mt-20">
            <h2 className="font-headline text-2xl text-blue font-bold mb-8 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {related.map((rel, i) => {
                const RelIcon = rel.icon;
                return (
                  <motion.div
                    key={rel.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ delay: i * 0.07 }}
                    className="glass shadow-neon-blue p-7 flex flex-col items-center rounded-glass min-h-[310px]"
                  >
                    <div className="text-blue text-4xl mb-3">
                      {RelIcon && <RelIcon className="text-blue text-4xl" />}
                    </div>
                    <div className="font-headline text-lg font-semibold text-blue mb-2 text-center">{rel.title}</div>
                    <div className="font-body text-section text-center mb-4">{rel.excerpt}</div>
                    <Link
                      to={rel.link}
                      className="inline-block bg-blue text-white font-semibold px-6 py-2 rounded-glass shadow hover:bg-cyan transition text-sm mt-auto"
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
