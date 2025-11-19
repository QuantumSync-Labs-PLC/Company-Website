import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import SectionBackgroundBlur from "../components/common/SectionBackgroundBlur";
import SectionShell from "../components/common/SectionShell";

// EmailJS configuration from environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactSection() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const getButtonContent = () => {
    if (sending) return "Sending...";
    if (sent) return "Sent!";
    return <>Send Message <Send size={18} className="ml-2" /></>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID)
      .then(
        () => {
          setSent(true);
          setSending(false);
        },
        () => {
          setError("Sorry, something went wrong. Please try again.");
          setSending(false);
        }
      );
  };

  return (
    <SectionShell
      id="contact"
      title="Get In Touch"
      description="Start your next project, ask a question, or just say hello. We'd love to hear from you!"
      sectionClassName="relative py-20 px-4 md:px-0 bg-qs-bg text-qs-text scroll-mt-24 transition-colors duration-300"
      containerClassName="relative max-w-3xl mx-auto section-center z-10"
      titleClassName="font-headline text-3xl md:text-4xl font-bold text-qs-primary text-center mb-4"
      descriptionClassName="font-body text-qs-text-section text-lg text-center mb-12 max-w-xl mx-auto"
    >
      {/* Decorative BG */}
      <SectionBackgroundBlur />

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="glass rounded-glass shadow-neon-blue p-8 flex flex-col gap-6 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
          <div className="flex flex-col gap-2">
            <label htmlFor="user_name" className="font-body text-qs-text-muted text-sm mb-1">
              Name <span className="text-qs-primary">*</span>
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="rounded bg-qs-surface/70 px-4 py-3 font-body text-qs-text border border-qs-primary/30 focus:outline-none focus:ring-2 focus:ring-qs-primary"
              required
              disabled={sending || sent}
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="user_email" className="font-body text-qs-text-muted text-sm mb-1">
              Email <span className="text-qs-primary">*</span>
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              className="rounded bg-qs-surface/70 px-4 py-3 font-body text-qs-text border border-qs-primary/30 focus:outline-none focus:ring-2 focus:ring-qs-primary"
              required
              disabled={sending || sent}
              placeholder="you@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-body text-qs-text-muted text-sm mb-1">
              Message <span className="text-qs-primary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="rounded bg-qs-surface/70 px-4 py-3 font-body text-qs-text border border-qs-primary/30 focus:outline-none focus:ring-2 focus:ring-qs-primary resize-none"
              required
              disabled={sending || sent}
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center bg-qs-primary text-qs-text font-semibold rounded-glass px-7 py-3 shadow-neon-blue hover:bg-qs-accent transition text-base mt-2 disabled:opacity-60"
            disabled={sending || sent}
          >
            {getButtonContent()}
          </button>
          {error && (
            <div className="text-qs-danger text-sm mt-2 text-center">{error}</div>
          )}
          {sent && (
            <div className="text-qs-success text-sm mt-2 text-center">
              Thank you! Your message has been sent.
            </div>
          )}
        </motion.form>
    </SectionShell>
  );
}
