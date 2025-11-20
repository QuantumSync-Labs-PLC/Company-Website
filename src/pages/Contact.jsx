import { useRef, useState } from "react";
import emailjs from "emailjs-com";
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
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="Contact"
        description="Contact QuantumSync Labs to discuss your next software, cloud, or AI project."
        url="/contact"
      />
      <main className="flex flex-1 flex-col items-center justify-center py-16 sm:py-20 md:py-28 px-4" role="main">
        <div className="glass rounded-glass shadow-neon p-6 sm:p-8 w-full max-w-2xl mx-auto">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-qs-primary text-center mb-2">
            Get in Touch
          </h1>
          <p className="font-body text-base sm:text-lg text-qs-text-section text-center mb-4 sm:mb-6 max-w-xl mx-auto">
            Questions, projects, partnership ideas, or just want to say hello? Fill out the form and our team will respond promptly.
          </p>
          <p className="font-body text-xs sm:text-sm text-qs-text-muted text-center mb-6 sm:mb-8 max-w-xl mx-auto">
            We use EmailJS to securely deliver your message. Please avoid sharing passwords, API keys, or other sensitive secrets in this form.
          </p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
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
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-body text-qs-primary font-semibold">Your Name</label>
              <input
                id="name"
                name="user_name"
                type="text"
                required
                className="bg-qs-surface text-qs-text border border-qs-primary rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-accent font-body"
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-body text-qs-primary font-semibold">Email</label>
              <input
                id="email"
                name="user_email"
                type="email"
                required
                className="bg-qs-surface text-qs-text border border-qs-primary rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-accent font-body"
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-body text-qs-primary font-semibold">Phone <span className="text-qs-text-muted font-normal text-sm">(optional)</span></label>
              <input
                id="phone"
                name="user_phone"
                type="tel"
                pattern="^[0-9+\-()\s]{7,}$"
                className="bg-qs-surface text-qs-text border border-qs-primary rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-accent font-body"
                placeholder="+1 (234) 111-2222"
                autoComplete="tel"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="font-body text-qs-primary font-semibold">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="bg-qs-surface text-qs-text border border-qs-primary rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-accent font-body"
                placeholder="Project Inquiry, Support, Partnership, etc."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-body text-qs-primary font-semibold">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="bg-qs-surface text-qs-text border border-qs-primary rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-qs-accent font-body resize-none"
                placeholder="Tell us about your project, idea, or question..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "pending"}
              className="bg-qs-primary text-qs-text font-bold rounded-glass shadow-neon px-8 py-3 hover:bg-qs-accent transition text-sm sm:text-base mt-2 focus:outline-none focus:ring-2 focus:ring-qs-accent"
            >
              {status === "pending" ? "Sending..." : "Send Message"}
            </button>
            <div
              id="contact-status"
              className="mt-3 min-h-[1.5rem] text-center font-body text-sm"
              aria-live="polite"
            >
              {status === "success" && (
                <span className="text-qs-success">
                  Message sent! We'll get back to you soon.
                </span>
              )}
              {status === "error" && (
                <span className="text-red-400">
                  {error}
                </span>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
