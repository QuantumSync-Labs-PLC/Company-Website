import { useRef, useState } from "react";
import emailjs from "emailjs-com";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

// Your EmailJS settings
const SERVICE_ID = 'service_u9kwu6r';
const TEMPLATE_ID = 'template_7ynrrvv';
const USER_ID = 'LrlAWWQTNgpmXwnMq'; // Public key

export default function ContactSection() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const getButtonContent = () => {
    if (sending) return "Sending...";
    if (sent) return "Sent!";
    return <>Send Message <FaPaperPlane className="ml-2" /></>;
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
    <section
      id="contact"
      className="relative py-20 px-4 md:px-0 bg-section scroll-mt-24"
      aria-labelledby="contact-heading"
    >
      {/* Decorative BG */}
      <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 bg-blue blur-3xl opacity-10 z-0" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-cyan blur-2xl opacity-10 z-0" />

      <div className="relative max-w-3xl mx-auto section-center z-10">
        <h2
          id="contact-heading"
          className="font-headline text-3xl md:text-4xl font-bold text-blue text-center mb-4"
        >
          Get In Touch
        </h2>
        <p className="font-body text-section text-lg text-center mb-12 max-w-xl mx-auto">
          Start your next project, ask a question, or just say hello. We’d love to hear from you!
        </p>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass rounded-glass shadow-neon-blue p-8 flex flex-col gap-6 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="user_name" className="font-body text-section text-sm mb-1">
              Name <span className="text-blue">*</span>
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="rounded bg-navy-dk/70 px-4 py-3 font-body text-white border border-blue/30 focus:outline-none focus:ring-2 focus:ring-blue"
              required
              disabled={sending || sent}
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="user_email" className="font-body text-section text-sm mb-1">
              Email <span className="text-blue">*</span>
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              className="rounded bg-navy-dk/70 px-4 py-3 font-body text-white border border-blue/30 focus:outline-none focus:ring-2 focus:ring-blue"
              required
              disabled={sending || sent}
              placeholder="you@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-body text-section text-sm mb-1">
              Message <span className="text-blue">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="rounded bg-navy-dk/70 px-4 py-3 font-body text-white border border-blue/30 focus:outline-none focus:ring-2 focus:ring-blue resize-none"
              required
              disabled={sending || sent}
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center bg-blue text-white font-semibold rounded-glass px-7 py-3 shadow-neon-blue hover:bg-cyan transition text-base mt-2 disabled:opacity-60"
            disabled={sending || sent}
          >
            {getButtonContent()}
          </button>
          {error && (
            <div className="text-red-400 text-sm mt-2 text-center">{error}</div>
          )}
          {sent && (
            <div className="text-green-400 text-sm mt-2 text-center">
              Thank you! Your message has been sent.
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
