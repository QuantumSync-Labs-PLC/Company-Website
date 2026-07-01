import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Award } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import PageMeta from "../components/common/PageMeta";
import JsonLd, { createCaseStudySchema } from "../components/common/JsonLd";
import caseStudies from "../data/caseStudies";
import StatCounter from "../components/common/StatCounter";
import Button from "../components/common/Button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function WorkDetail() {
  const { id } = useParams();
  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    return (
      <div className="relative min-h-screen flex flex-col bg-qs-bg">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold text-qs-text mb-4">
              Case Study Not Found
            </h1>
            <p className="text-qs-text-section mb-8">
              The case study you're looking for doesn't exist.
            </p>
            <Link to="/work">
              <Button variant="primary">Back to Case Studies</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title={study.title}
        description={study.summary}
        url={`/work/${study.id}`}
      >
        <JsonLd schema={createCaseStudySchema(study)} />
      </PageMeta>

      <main role="main" className="flex-grow">
        {/* Back Link */}
        <section className="py-6 px-4 md:px-6 bg-qs-bg border-b border-qs-primary/10">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-qs-primary hover:text-qs-accent transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Case Studies
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 md:px-6 bg-qs-bg">
          <div className="max-w-4xl mx-auto">
            {/* Industry Badge */}
            <div className="inline-flex mb-6">
              <span className="text-sm font-bold text-qs-accent bg-qs-accent/10 px-4 py-2 rounded-full">
                {study.industry}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text mb-6">
              {study.title}
            </h1>

            {/* Client */}
            <p className="font-body text-lg sm:text-xl text-qs-text-section mb-8">
              <span className="font-semibold text-qs-text">Client:</span> {study.client}
            </p>

            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full rounded-qs-lg overflow-hidden shadow-neon border border-qs-primary/10 mb-16"
            >
              <img
                src={study.cover}
                alt={study.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>

        {/* Key Metrics */}
        {study.metrics && study.metrics.length > 0 && (
          <section className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-surface/30 border-y border-qs-primary/10">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-4">
                <span className="eyebrow">By the Numbers</span>
              </div>
              <h2 className="font-headline text-3xl font-bold holo-text mb-12 sm:mb-16 text-center">
                Key Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                {study.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <StatCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      label={metric.label}
                      duration={2}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenge, Solution, Results */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-bg">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="glass rounded-qs-lg shadow-neon border border-qs-primary/10 p-6 sm:p-8"
              >
                <h3 className="font-headline text-xl font-bold text-qs-primary mb-4">
                  The Challenge
                </h3>
                <p className="font-body text-qs-text-section leading-relaxed">
                  {study.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="glass rounded-qs-lg shadow-neon border border-qs-accent/10 p-6 sm:p-8"
              >
                <h3 className="font-headline text-xl font-bold text-qs-accent mb-4">
                  Our Solution
                </h3>
                <p className="font-body text-qs-text-section leading-relaxed">
                  {study.solution}
                </p>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="glass rounded-qs-lg shadow-neon border border-qs-signal/10 p-6 sm:p-8"
              >
                <h3 className="font-headline text-xl font-bold text-qs-signal mb-4">
                  The Results
                </h3>
                <p className="font-body text-qs-text-section leading-relaxed">
                  {study.results}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {study.testimonial && (
          <section className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-surface/30 border-y border-qs-primary/10">
            <div className="max-w-3xl mx-auto">
              <div className="glass rounded-qs-lg shadow-neon border border-qs-primary/10 p-8 sm:p-10 text-center">
                <Award className="mx-auto mb-6 text-qs-signal" size={40} />
                <p className="font-body text-lg sm:text-xl text-qs-text italic mb-8 leading-relaxed">
                  "{study.testimonial.quote}"
                </p>
                <div>
                  <p className="font-headline font-bold text-qs-text mb-1">
                    {study.testimonial.author}
                  </p>
                  <p className="font-body text-sm text-qs-text-section">
                    {study.testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {study.gallery && study.gallery.length > 0 && (
          <section className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-bg">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-4">
                <span className="eyebrow">Gallery</span>
              </div>
              <h2 className="font-headline text-3xl font-bold holo-text mb-12 sm:mb-16 text-center">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {study.gallery.map((image, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className="rounded-qs-lg overflow-hidden shadow-neon border border-qs-primary/10"
                  >
                    <img
                      src={image}
                      alt={`Project gallery ${i + 1}`}
                      className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative py-16 sm:py-20 px-4 md:px-6 bg-qs-surface/50 border-t border-qs-primary/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-qs-text mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="font-body text-qs-text-section text-lg mb-10">
              Let's discuss how QuantumSync Labs can help you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" size="md">
                  Start a Project
                </Button>
              </Link>
              <Link to="/work">
                <Button variant="outline" size="md">
                  View More Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
