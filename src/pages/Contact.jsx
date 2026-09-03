import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PageMeta from "@/components/seo/PageMeta";
import BookingEmbed, { bookingEnabled } from "@/components/integrations/BookingEmbed";
import services from "@/data/services";
import { SUBJECTS, BUDGET_BANDS, TIMELINES } from "@/constants/leadForm";
import { sendLead, hasAutoReply } from "@/utils/leads";
import { trackFormSubmit, trackConversion, trackEvent } from "@/utils/analytics";

const FIELD_CLASS =
  "bg-qs-surface text-qs-text border border-qs-hairline rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-primary transition font-body";
const LABEL_CLASS = "font-body text-qs-primary font-semibold";
const OPTIONAL_CLASS = "text-qs-text-muted font-normal text-sm";

export default function Contact() {
  const formRef = useRef();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const RATE_LIMIT_MS = 15000; // 15 seconds between submissions

  // Service pages link here with ?service=<id>, so the enquiry arrives already
  // scoped to what the visitor was reading.
  const preselectedService = services.find(
    (s) => s.id === searchParams.get("service")
  );
  const preselectedSubject = searchParams.get("subject") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const now = Date.now();
    const formEl = e.target;

    // Basic client-side rate limiting to reduce spam/bots
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      setStatus("error");
      setError("Please wait a few seconds before sending another message.");
      return;
    }

    // Honeypot field check – if filled, silently ignore submission
    if (new FormData(formEl).get("company_website")) {
      // Treat as success to avoid giving bots feedback
      setStatus("success");
      formEl.reset();
      return;
    }

    setStatus("pending");
    trackFormSubmit("contact_page");

    try {
      const lead = await sendLead(formEl, "contact_page");
      setStatus("success");
      setLastSubmitTime(now);
      formEl.reset();

      trackConversion("contact_inquiry");
      trackEvent("generate_lead", {
        form_name: "contact_page",
        subject: lead.subject,
        service: lead.service,
        budget: lead.budget,
        timeline: lead.timeline,
      });
    } catch {
      setStatus("error");
      setError(
        "Something went wrong while sending your message. Please try again, or email us directly at labsquantumsync@gmail.com."
      );
      trackEvent("form_error", { form_name: "contact_page" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-qs-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-qs-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="Contact"
        description="Book a consultation or send a project brief to QuantumSync Labs. We reply to every enquiry within one working day."
        url="/contact"
      />
      <main className="flex flex-1 flex-col items-center py-16 sm:py-20 md:py-28 px-4 relative z-10" role="main">
        {/* Header section */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="eyebrow mb-4">Let&apos;s Talk</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text mb-4">
            Get in Touch
          </h1>
          <p className="font-body text-lg sm:text-xl text-qs-text-section mb-3">
            {bookingEnabled
              ? "Book a call straight into our calendar, or send a brief and we'll come back to you within one working day."
              : "Tell us about your project and we'll come back to you within one working day."}
          </p>
        </div>

        {/* Booking — renders only when VITE_BOOKING_URL is configured */}
        {/* scroll-mt clears the fixed header when arriving via /contact#book */}
        {bookingEnabled && (
          <section className="w-full max-w-3xl mx-auto mb-16 scroll-mt-28" id="book">
            <BookingEmbed />
            <div className="flex items-center gap-4 mt-14" aria-hidden="true">
              <span className="h-px flex-1 bg-qs-hairline" />
              <span className="font-mono text-xs uppercase tracking-widest text-qs-text-muted">
                or send a brief
              </span>
              <span className="h-px flex-1 bg-qs-hairline" />
            </div>
          </section>
        )}

        {/* Form container */}
        <div className="glass rounded-glass shadow-neon p-8 sm:p-10 md:p-12 w-full max-w-2xl mx-auto relative">
          {/* Decorative top accent */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-qs-gradient-primary rounded-full opacity-50 -mt-1"></div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            aria-describedby={status ? "contact-status" : undefined}
          >
            {/* Honeypot field for spam bots – users should not see or fill this */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company_website">Company Website</label>
              <input
                id="company_website"
                name="company_website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            {/* Name field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={LABEL_CLASS}>Your Name</label>
              <input
                id="name"
                name="user_name"
                type="text"
                required
                className={FIELD_CLASS}
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={LABEL_CLASS}>Email Address</label>
              <input
                id="email"
                name="user_email"
                type="email"
                required
                className={FIELD_CLASS}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>

            {/* Phone field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className={LABEL_CLASS}>
                Phone <span className={OPTIONAL_CLASS}>(optional)</span>
              </label>
              <input
                id="phone"
                name="user_phone"
                type="tel"
                pattern="^[0-9+\-()\s]{7,}$"
                className={FIELD_CLASS}
                placeholder="+1 (234) 111-2222"
                autoComplete="tel"
              />
            </div>

            {/* Subject field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className={LABEL_CLASS}>Subject</label>
              <select
                id="subject"
                name="subject"
                required
                defaultValue={
                  preselectedService ? "Project Inquiry" : preselectedSubject
                }
                className={`${FIELD_CLASS} cursor-pointer`}
              >
                <option value="">Select a subject...</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Qualification: which service */}
            <div className="flex flex-col gap-2">
              <label htmlFor="service" className={LABEL_CLASS}>
                What do you need help with?{" "}
                <span className={OPTIONAL_CLASS}>(optional)</span>
              </label>
              <select
                id="service"
                name="service"
                defaultValue={preselectedService?.title || ""}
                className={`${FIELD_CLASS} cursor-pointer`}
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Something else">Something else</option>
              </select>
            </div>

            {/* Qualification: budget and timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className={LABEL_CLASS}>
                  Budget <span className={OPTIONAL_CLASS}>(optional)</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  className={`${FIELD_CLASS} cursor-pointer`}
                  defaultValue=""
                >
                  <option value="">Select a range...</option>
                  {BUDGET_BANDS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="timeline" className={LABEL_CLASS}>
                  Timeline <span className={OPTIONAL_CLASS}>(optional)</span>
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  className={`${FIELD_CLASS} cursor-pointer`}
                  defaultValue=""
                >
                  <option value="">Select a timeline...</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className={LABEL_CLASS}>Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className={`${FIELD_CLASS} resize-none`}
                placeholder="Tell us about your project, idea, or question..."
                defaultValue={
                  preselectedService
                    ? `I'd like to talk about ${preselectedService.title}.\n\n`
                    : ""
                }
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "pending"}
              className="bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary font-bold rounded-glass shadow-qs-neon px-8 py-3 transition text-base mt-2 focus:outline-none focus:ring-2 focus:ring-qs-primary disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 duration-300"
            >
              {status === "pending" ? "Sending..." : "Send Message"}
            </button>

            <p className="font-body text-xs text-qs-text-muted text-center">
              We reply within one working day. Please don&apos;t share passwords, API keys,
              or other secrets in this form.
            </p>

            {/* Status messages */}
            <div
              id="contact-status"
              className="min-h-6 text-center font-body text-sm"
              aria-live="polite"
            >
              {status === "success" && (
                <div className="text-qs-success font-semibold">
                  ✓ Message sent
                  {hasAutoReply
                    ? " — check your inbox for a confirmation. We'll be in touch within one working day."
                    : " — we'll get back to you within one working day."}
                </div>
              )}
              {status === "error" && (
                <div className="text-qs-danger font-semibold">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
