import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import PageMeta from "../components/common/PageMeta";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const RATE_LIMIT_MS = 15000; // 15 seconds between submissions

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const now = Date.now();

    // Basic client-side rate limiting to reduce spam/bots
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      setStatus("error");
      setError("Please wait a few seconds before sending another message.");
      return;
    }

    // Honeypot field check – if filled, silently ignore submission
    const formData = new FormData(e.target);
    if (formData.get("company_website")) {
      // Treat as success to avoid giving bots feedback
      setStatus("success");
      e.target.reset();
      return;
    }

    setStatus("pending");
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID)
      .then(
        () => {
          setStatus("success");
          setLastSubmitTime(now);
        },
        () => {
          setStatus("error");
          setError("Something went wrong while sending your message. Please try again.");
        }
      );
    e.target.reset();
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
        description="Contact QuantumSync Labs to discuss your next software, cloud, or AI project."
        url="/contact"
      />
      <main className="flex flex-1 flex-col items-center justify-center py-16 sm:py-20 md:py-28 px-4 relative z-10" role="main">
        {/* Header section */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="eyebrow mb-4">Let's Talk</span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text mb-4">
            Get in Touch
          </h1>
          <p className="font-body text-lg sm:text-xl text-qs-text-section mb-3">
            Questions, projects, partnership ideas, or just want to say hello? We'd love to hear from you.
          </p>
          <p className="font-body text-sm text-qs-text-muted">
            We use EmailJS to securely deliver your message. Please avoid sharing passwords, API keys, or other sensitive secrets in this form.
          </p>
        </div>

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
              <label htmlFor="name" className="font-body text-qs-primary font-semibold">Your Name</label>
              <input
                id="name"
                name="user_name"
                type="text"
                required
                className="bg-qs-surface text-qs-text border border-qs-hairline rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-primary transition font-body"
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-body text-qs-primary font-semibold">Email Address</label>
              <input
                id="email"
                name="user_email"
                type="email"
                required
                className="bg-qs-surface text-qs-text border border-qs-hairline rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-primary transition font-body"
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>

            {/* Phone field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-body text-qs-primary font-semibold">Phone <span className="text-qs-text-muted font-normal text-sm">(optional)</span></label>
              <input
                id="phone"
                name="user_phone"
                type="tel"
                pattern="^[0-9+\-()\s]{7,}$"
                className="bg-qs-surface text-qs-text border border-qs-hairline rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-primary transition font-body"
                placeholder="+1 (234) 111-2222"
                autoComplete="tel"
              />
            </div>

            {/* Subject field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="font-body text-qs-primary font-semibold">Subject</label>
              <select
                id="subject"
                name="subject"
                required
                className="bg-qs-surface text-qs-text border border-qs-hairline rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-primary transition font-body cursor-pointer"
              >
                <option value="">Select a subject...</option>
                <option value="Project Inquiry">Project Inquiry</option>
                <option value="Support">Support</option>
                <option value="Partnership">Partnership</option>
                <option value="General Question">General Question</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-body text-qs-primary font-semibold">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="bg-qs-surface text-qs-text border border-qs-hairline rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-primary transition font-body resize-none"
                placeholder="Tell us about your project, idea, or question..."
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "pending"}
              className="bg-qs-primary hover:bg-qs-primary-hover text-qs-bg font-bold rounded-glass shadow-qs-neon px-8 py-3 transition text-base mt-4 focus:outline-none focus:ring-2 focus:ring-qs-primary disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 duration-300"
            >
              {status === "pending" ? "Sending..." : "Send Message"}
            </button>

            {/* Status messages */}
            <div
              id="contact-status"
              className="mt-3 min-h-[1.5rem] text-center font-body text-sm"
              aria-live="polite"
            >
              {status === "success" && (
                <div className="text-qs-success font-semibold">
                  ✓ Message sent! We'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="text-red-400 font-semibold">
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
