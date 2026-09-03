import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, FileText } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PageMeta from "@/components/seo/PageMeta";
import SectionBackgroundBlur from "@/components/layout/SectionBackgroundBlur";
import { bookingEnabled } from "@/components/integrations/BookingEmbed";
import processSteps from "@/data/processSteps";
import { trackClick } from "@/utils/analytics";

export default function Process() {
  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="How We Work"
        description="Discovery, design, build, launch, aftercare — the process QuantumSync Labs runs on every engagement, with what you get at each step."
        url="/process"
      />

      <main role="main" className="grow">
        {/* Hero */}
        <section className="relative py-20 sm:py-24 lg:py-28 px-4 flex flex-col items-center">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="eyebrow mb-4">Our process</span>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text mb-6">
              How We Work
            </h1>
            <p className="font-body text-lg sm:text-xl text-qs-text-section leading-relaxed">
              Five steps, in this order, on every engagement. You see working
              software every two weeks — never a single reveal at the end — and
              you can stop at any milestone boundary.
            </p>
          </div>
        </section>

        {/* Steps — a real sequence, so the numbering carries meaning */}
        <section className="relative py-8 sm:py-12 px-4 md:px-6">
          <SectionBackgroundBlur />
          <ol className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="glass rounded-glass border border-qs-primary/10 shadow-neon p-7 sm:p-9 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 sm:gap-8"
              >
                <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-qs-primary/40 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-qs-text-muted whitespace-nowrap">
                    {step.duration}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="font-headline text-xl sm:text-2xl font-bold text-qs-text mb-2">
                      {step.name}
                    </h2>
                    <p className="font-body text-sm sm:text-base text-qs-text-section leading-relaxed">
                      {step.summary}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {step.activities.map((activity) => (
                      <li
                        key={activity}
                        className="font-body text-sm text-qs-text-section flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-qs-primary shrink-0 mt-2" />
                        {activity}
                      </li>
                    ))}
                  </ul>

                  <p className="flex items-start gap-2.5 pt-3 border-t border-qs-hairline font-body text-sm text-qs-text">
                    <FileText className="text-qs-signal shrink-0 mt-0.5" size={16} />
                    <span>
                      <span className="font-mono text-xs uppercase tracking-widest text-qs-text-muted mr-2">
                        You get
                      </span>
                      {step.deliverable}
                    </span>
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="relative py-16 sm:py-20 mt-8 px-4 md:px-6 bg-qs-surface/50 border-t border-qs-primary/10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-qs-text mb-4">
              Start at step one
            </h2>
            <p className="font-body text-qs-text-section mb-9">
              Discovery begins with a free call. Bring the problem, not a spec —
              working out what to build is part of the job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={bookingEnabled ? "/contact#book" : "/contact"}
                onClick={() => trackClick("Start discovery", "process")}
                className="inline-flex items-center justify-center gap-2 bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary font-bold px-8 py-3.5 rounded-glass shadow-qs-neon transition-all duration-300 transform hover:scale-105"
              >
                {bookingEnabled ? (
                  <><CalendarClock size={18} /> Book a free call</>
                ) : (
                  <>Send a project brief <ArrowRight size={18} /></>
                )}
              </Link>
              <Link
                to="/pricing"
                onClick={() => trackClick("See engagement models", "process")}
                className="inline-flex items-center justify-center gap-2 glass text-qs-primary border border-qs-primary font-bold px-8 py-3.5 rounded-glass hover:bg-qs-primary hover:text-qs-on-primary transition-all duration-300 transform hover:scale-105"
              >
                Engagement models <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
