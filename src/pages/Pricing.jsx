import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Check, AlertCircle, ArrowRight, CalendarClock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { createFaqSchema } from "@/components/seo/JsonLd";
import SectionBackgroundBlur from "@/components/layout/SectionBackgroundBlur";
import { bookingEnabled } from "@/components/integrations/BookingEmbed";
import engagementModels from "@/data/engagementModels";
import { trackClick } from "@/utils/analytics";

const faqs = [
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope, and we won't guess before we understand it. Discovery is a short paid engagement that ends with a written scope and a fixed quote — so you get a real number before committing to a build, and you keep the scope document either way.",
  },
  {
    question: "Do you charge for the first conversation?",
    answer:
      "No. The first call is free, usually 30 minutes, and its only purpose is to work out whether we're a fit. Paid work starts at discovery.",
  },
  {
    question: "What if we're not happy partway through?",
    answer:
      "Every engagement has exit points. Fixed-scope projects are invoiced per milestone, so you can stop between them. Retainers and team extension end on 30 days' notice. You keep everything produced up to that point.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. Source, documentation, and infrastructure access transfer to you on handover, and we don't hold deployment keys hostage.",
  },
  {
    question: "Do you work with clients outside Sri Lanka?",
    answer:
      "Yes. We work remotely across time zones and keep overlapping hours with your team. Most of our communication is asynchronous, with scheduled calls at the boundaries of each sprint.",
  },
];

export default function Pricing() {
  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="Pricing & Engagement Models"
        description="How QuantumSync Labs is engaged and paid: fixed-scope projects, monthly retainers, and team extension — plus how we scope and quote work."
        url="/pricing"
      >
        <JsonLd schema={createFaqSchema(faqs)} />
      </PageMeta>

      <main role="main" className="grow">
        {/* Hero */}
        <section className="relative py-20 sm:py-24 lg:py-28 px-4 flex flex-col items-center">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="eyebrow mb-4">Working together</span>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text mb-6">
              Pricing &amp; Engagement Models
            </h1>
            <p className="font-body text-lg sm:text-xl text-qs-text-section leading-relaxed">
              Three ways to work with us, and how each one is scoped and billed.
              We don&apos;t publish rate cards, because a number without a scope
              is a guess — but we will give you a fixed quote before you commit
              to a build.
            </p>
          </div>
        </section>

        {/* Engagement models */}
        <section className="relative py-8 sm:py-12 px-4 md:px-6">
          <SectionBackgroundBlur />
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {engagementModels.map((model, i) => {
              const Icon = model.icon;
              return (
                <motion.article
                  key={model.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass rounded-glass border border-qs-primary/10 shadow-neon p-7 sm:p-8 flex flex-col gap-5"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-qs-primary/10 border border-qs-primary/40">
                      <Icon className="text-qs-primary" size={22} />
                    </span>
                    <div>
                      <h2 className="font-headline text-xl font-bold text-qs-text">
                        {model.name}
                      </h2>
                      <p className="font-body text-sm text-qs-primary">{model.tagline}</p>
                    </div>
                  </div>

                  {model.startingAt && (
                    <p className="font-mono text-sm text-qs-signal">
                      From {model.startingAt}
                    </p>
                  )}

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-qs-text-muted mb-2">
                      Best for
                    </h3>
                    <p className="font-body text-sm text-qs-text-section leading-relaxed">
                      {model.bestFor}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-qs-text-muted mb-2">
                      How it works
                    </h3>
                    <p className="font-body text-sm text-qs-text-section leading-relaxed">
                      {model.howItWorks}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-qs-text-muted mb-3">
                      What you get
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {model.youGet.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="text-qs-primary shrink-0 mt-0.5" size={16} />
                          <span className="font-body text-sm text-qs-text-section">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4 border-t border-qs-hairline flex items-start gap-2">
                    <AlertCircle className="text-qs-accent shrink-0 mt-0.5" size={16} />
                    <p className="font-body text-xs text-qs-text-muted leading-relaxed">
                      {model.watchOut}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <span className="eyebrow">Common questions</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold holo-text text-center mb-12">
              Before You Ask
            </h2>
            <dl className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="glass rounded-qs-lg border border-qs-hairline p-6 sm:p-7"
                >
                  <dt className="font-headline text-base sm:text-lg font-bold text-qs-text mb-3">
                    {faq.question}
                  </dt>
                  <dd className="font-body text-sm sm:text-base text-qs-text-section leading-relaxed">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 sm:py-20 px-4 md:px-6 bg-qs-surface/50 border-t border-qs-primary/10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-qs-text mb-4">
              Not sure which fits?
            </h2>
            <p className="font-body text-qs-text-section mb-9">
              Tell us what you&apos;re trying to build. We&apos;ll tell you
              honestly which model suits it — including when the answer is that
              you don&apos;t need us yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {bookingEnabled && (
                <Link
                  to="/contact#book"
                  onClick={() => trackClick("Book a call", "pricing")}
                  className="inline-flex items-center justify-center gap-2 bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary font-bold px-8 py-3.5 rounded-glass shadow-qs-neon transition-all duration-300 transform hover:scale-105"
                >
                  <CalendarClock size={18} /> Book a free call
                </Link>
              )}
              <Link
                to="/process"
                onClick={() => trackClick("See how we work", "pricing")}
                className="inline-flex items-center justify-center gap-2 glass text-qs-primary border border-qs-primary font-bold px-8 py-3.5 rounded-glass hover:bg-qs-primary hover:text-qs-on-primary transition-all duration-300 transform hover:scale-105"
              >
                See how we work <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
