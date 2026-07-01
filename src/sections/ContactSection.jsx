import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// eslint-disable-next-line no-unused-vars
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID)
      .then(
        () => {
          setSent(true);
          setSending(false);
          // Reset form after success
          formRef.current?.reset();
          // Auto-reset success message after 4 seconds
          setTimeout(() => setSent(false), 4000);
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
      eyebrow="05 — Contact"
      title="Get In Touch"
      description="Start your next project, ask a question, or just say hello. We'd love to hear from you!"
      containerClassName="relative max-w-3xl mx-auto section-center z-10"
      titleClassName="font-headline text-3xl md:text-4xl font-bold holo-text text-center mb-4"
      descriptionClassName="font-body text-qs-text-section text-lg text-center mb-12 max-w-xl mx-auto"
    >
      {/* Decorative BG */}
      <SectionBackgroundBlur />

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="glass rounded-qs-lg shadow-neon p-8 md:p-10 flex flex-col gap-6 max-w-xl mx-auto relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Decorative top accent */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-qs-gradient-primary rounded-full opacity-50 -mt-1"></div>

        {/* Name field */}
        <div className="flex flex-col gap-2 pt-4">
          <label htmlFor="user_name" className="font-body text-qs-primary font-semibold text-sm">
            Name <span className="text-qs-accent">*</span>
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            className="rounded-qs-lg bg-qs-surface border border-qs-hairline px-4 py-3 font-body text-qs-text placeholder-qs-text-muted focus:outline-none focus:ring-2 focus:ring-qs-primary transition"
            required
            disabled={sending || sent}
            placeholder="Your Name"
          />
        </div>

        {/* Email field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="user_email" className="font-body text-qs-primary font-semibold text-sm">
            Email <span className="text-qs-accent">*</span>
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            className="rounded-qs-lg bg-qs-surface border border-qs-hairline px-4 py-3 font-body text-qs-text placeholder-qs-text-muted focus:outline-none focus:ring-2 focus:ring-qs-primary transition"
            required
            disabled={sending || sent}
            placeholder="you@email.com"
          />
        </div>

        {/* Subject field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="font-body text-qs-primary font-semibold text-sm">
            Subject <span className="text-qs-accent">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            className="rounded-qs-lg bg-qs-surface border border-qs-hairline px-4 py-3 font-body text-qs-text focus:outline-none focus:ring-2 focus:ring-qs-primary transition cursor-pointer"
            required
            disabled={sending || sent}
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
          <label htmlFor="message" className="font-body text-qs-primary font-semibold text-sm">
            Message <span className="text-qs-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="rounded-qs-lg bg-qs-surface border border-qs-hairline px-4 py-3 font-body text-qs-text placeholder-qs-text-muted focus:outline-none focus:ring-2 focus:ring-qs-primary resize-none transition"
            required
            disabled={sending || sent}
            placeholder="How can we help you?"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="flex items-center justify-center bg-qs-primary hover:bg-qs-primary-hover text-qs-bg font-bold rounded-qs-lg px-7 py-3 shadow-qs-neon transition text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-qs-primary"
          disabled={sending || sent}
        >
          {sending && "Sending..."}
          {!sending && !sent && <>Send Message <Send size={18} className="ml-2" /></>}
          {sent && <>Sent! <Send size={18} className="ml-2" /></>}
        </button>

        {/* Status messages */}
        {error && (
          <div className="text-red-400 text-sm text-center font-semibold">
            {error}
          </div>
        )}
        {sent && (
          <div className="text-qs-success text-sm text-center font-semibold">
            ✓ Thank you! Your message has been sent.
          </div>
        )}
      </motion.form>
    </SectionShell>
  );
}
