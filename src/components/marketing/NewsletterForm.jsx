import { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { trackNewsletterSignup } from "@/utils/analytics";

export default function NewsletterForm({
  placeholder = "Enter your email",
  label = "Subscribe to our newsletter",
  description = "Get the latest insights delivered to your inbox.",
  className = "",
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Mailchimp form submission
    const mailchimpFormAction = import.meta.env.VITE_MAILCHIMP_FORM_ACTION;
    const mailchimpEmail = import.meta.env.VITE_MAILCHIMP_EMAIL_TAG || "EMAIL";

    // No list configured means the address has nowhere to go. Say so rather
    // than showing a success message for a signup that would be discarded.
    if (!mailchimpFormAction) {
      setStatus("error");
      setErrorMessage(
        "Newsletter signup is temporarily unavailable. Email us at labsquantumsync@gmail.com and we'll add you to the list."
      );
      return;
    }

    setLoading(true);
    setStatus(null);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append(mailchimpEmail, email);
      // Optional fields if configured
      const nameTag = import.meta.env.VITE_MAILCHIMP_NAME_TAG;
      if (nameTag) {
        formData.append(nameTag, "");
      }

      // Use JSON-P or fetch to Mailchimp endpoint
      // Most Mailchimp forms redirect or handle via POST
      await fetch(mailchimpFormAction, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Mailchimp doesn't allow CORS, so we bypass it
      });

      setStatus("success");
      setEmail("");
      trackNewsletterSignup();
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
      // Auto-reset status after 4 seconds
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`w-full ${className}`}
    >
      {label && (
        <h3 className="font-headline text-lg sm:text-xl font-bold text-qs-text mb-2">
          {label}
        </h3>
      )}

      {description && (
        <p className="font-body text-sm text-qs-text-section mb-4">
          {description}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-qs-text-muted pointer-events-none">
            <Mail size={18} />
          </div>
          <input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || status === "success"}
            className="w-full pl-10 pr-4 py-3 rounded-qs-lg bg-qs-surface border border-qs-primary/20 text-qs-text placeholder-qs-text-muted focus:outline-none focus:ring-2 focus:ring-qs-primary transition font-body disabled:opacity-60"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || status === "success"}
          className="px-6 py-3 rounded-qs-lg bg-qs-signal hover:bg-qs-signal text-qs-on-primary font-bold font-headline transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap hover:scale-105 active:scale-95"
        >
          {status === "success" ? (
            <>
              <Check size={18} /> Subscribed!
            </>
          ) : loading ? (
            <>
              <div className="w-4 h-4 border-2 border-qs-on-signal border-t-transparent rounded-full animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      {/* Status Message */}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-3 flex items-start gap-2 text-qs-danger text-sm font-body"
          role="alert"
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-3 flex items-center gap-2 text-qs-signal text-sm font-body"
        >
          <Check size={16} />
          <span>Thanks for subscribing! Check your email for confirmation.</span>
        </motion.div>
      )}
    </motion.div>
  );
}
