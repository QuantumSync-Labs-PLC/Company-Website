import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

const SERVICE_ID = 'service_u9kwu6r';
const TEMPLATE_ID = 'template_7ynrrvv';
const USER_ID = 'LrlAWWQTNgpmXwnMq'; // Public key

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("pending");
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID)
      .then(
        () => setStatus("success"),
        () => setStatus("error")
      );
    e.target.reset();
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-section">
      <ScrollToTop showButton={true} />
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center py-20 px-4 md:py-32">
        <div className="glass rounded-glass shadow-neon-blue p-8 w-full max-w-2xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-blue text-center mb-2">
            Get in Touch
          </h1>
          <p className="font-body text-lg text-section text-center mb-10 max-w-xl mx-auto">
            Questions, projects, partnership ideas, or just want to say hello? Fill out the form and our team will respond promptly.
          </p>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-body text-blue font-semibold">Your Name</label>
              <input
                id="name"
                name="user_name"
                type="text"
                required
                className="bg-navy text-white border border-blue rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan font-body"
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-body text-blue font-semibold">Email</label>
              <input
                id="email"
                name="user_email"
                type="email"
                required
                className="bg-navy text-white border border-blue rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan font-body"
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-body text-blue font-semibold">Phone <span className="text-section font-normal text-sm">(optional)</span></label>
              <input
                id="phone"
                name="user_phone"
                type="tel"
                pattern="^[0-9+\-()\s]{7,}$"
                className="bg-navy text-white border border-blue rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan font-body"
                placeholder="+1 (234) 111-2222"
                autoComplete="tel"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="font-body text-blue font-semibold">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="bg-navy text-white border border-blue rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan font-body"
                placeholder="Project Inquiry, Support, Partnership, etc."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-body text-blue font-semibold">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="bg-navy text-white border border-blue rounded-glass px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan font-body resize-none"
                placeholder="Tell us about your project, idea, or question..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "pending"}
              className="bg-blue text-white font-bold rounded-glass shadow-neon-blue px-8 py-3 hover:bg-cyan transition text-base mt-2"
            >
              {status === "pending" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <div className="text-green-400 font-body text-sm mt-2 text-center">
                Message sent! We'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="text-red-400 font-body text-sm mt-2 text-center">
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
