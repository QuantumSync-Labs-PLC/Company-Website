import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ArrowRight, CalendarClock } from "lucide-react";
import { caseStudiesForService } from "@/data/crossLinks";
import { bookingEnabled } from "@/components/integrations/BookingEmbed";
import { trackClick } from "@/utils/analytics";

/**
 * End-of-page CTA for a single service.
 *
 * Intent is highest here, so this offers the two next steps directly — book a
 * call, or send a brief already scoped to this service — alongside the case
 * studies that prove the service. A generic "Contact us" link wastes the moment.
 */
export default function ServiceCta({ service }) {
  const proof = caseStudiesForService(service.id);
  const briefLink = `/contact?service=${encodeURIComponent(service.id)}`;

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 sm:mt-20">
      <div className="glass rounded-glass border border-qs-primary/20 shadow-neon p-8 sm:p-10 flex flex-col gap-8">
        <div className="text-center">
          <span className="eyebrow mb-3">Next step</span>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold holo-text mb-3">
            Talk to us about {service.title}
          </h2>
          <p className="font-body text-qs-text-section max-w-xl mx-auto">
            Tell us what you&apos;re building and we&apos;ll come back with an approach,
            a rough shape of the work, and what it would take — within one working day.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {bookingEnabled && (
            <Link
              to="/contact#book"
              onClick={() => trackClick(`Book a call — ${service.title}`, "service_cta")}
              className="inline-flex items-center justify-center gap-2 bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary font-bold px-8 py-3.5 rounded-glass shadow-qs-neon transition-all duration-300 transform hover:scale-105 text-base"
            >
              <CalendarClock size={18} /> Book a call
            </Link>
          )}
          <Link
            to={briefLink}
            onClick={() => trackClick(`Send a brief — ${service.title}`, "service_cta")}
            className={`inline-flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-glass transition-all duration-300 transform hover:scale-105 text-base ${
              bookingEnabled
                ? "glass text-qs-primary border border-qs-primary hover:bg-qs-primary hover:text-qs-on-primary"
                : "bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary shadow-qs-neon"
            }`}
          >
            Send a project brief <ArrowRight size={18} />
          </Link>
        </div>

        {proof.length > 0 && (
          <div className="border-t border-qs-hairline pt-7">
            <h3 className="font-mono text-xs uppercase tracking-widest text-qs-text-muted text-center mb-5">
              {proof.length === 1 ? "Proof for this service" : "Proof for this service"}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {proof.map((study) => (
                <li key={study.id}>
                  <Link
                    to={`/work/${study.id}`}
                    onClick={() => trackClick(`Proof: ${study.title}`, "service_cta")}
                    className="group flex flex-col h-full gap-2 p-5 rounded-qs-lg bg-qs-surface border border-qs-hairline hover:border-qs-primary/40 transition-colors duration-300"
                  >
                    <span className="font-body text-xs text-qs-accent">{study.industry}</span>
                    <span className="font-headline text-base font-bold text-qs-text group-hover:text-qs-primary transition-colors">
                      {study.title}
                    </span>
                    {study.metrics?.[0] && (
                      <span className="font-mono text-sm text-qs-primary mt-auto pt-2">
                        {study.metrics[0].value}
                        {study.metrics[0].suffix}{" "}
                        <span className="text-qs-text-muted text-xs">
                          {study.metrics[0].label}
                        </span>
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

ServiceCta.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
