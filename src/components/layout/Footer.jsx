import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook, Linkedin, Instagram, Github, Music, Mail, Phone,
} from "lucide-react";
import logo from "@/assets/images/logo-wordmark-ui.webp";
import NewsletterForm from "@/components/marketing/NewsletterForm";
import routes from "@/constants/routes";

// Social Media Links
const socialLinks = [
  { href: "https://github.com/QuantumSync-Labs-PLC/", icon: <Github className="text-qs-primary" />, label: "GitHub" },
  { href: "https://www.linkedin.com/company/quantumsync-labs", icon: <Linkedin className="text-qs-primary" />, label: "LinkedIn" },
  { href: "https://www.facebook.com/share/12FQynVu8TR/?mibextid=wwXIfr", icon: <Facebook className="text-qs-primary" />, label: "Facebook" },
  { href: "https://www.instagram.com/quantumsync_labs?igsh=NmVjeG04b2R6dXF5&utm_source=qr", icon: <Instagram className="text-qs-primary" />, label: "Instagram" },
  { href: "https://www.tiktok.com/@quantumsync.labs?_t=ZS-8xnNboWCY5q&_r=1", icon: <Music className="text-qs-primary" />, label: "TikTok" },
];

// Contact Details
const contactDetails = [
  {
    icon: <Mail className="text-qs-primary" size={20} />,
    text: "labsquantumsync@gmail.com",
    href: "mailto:labsquantumsync@gmail.com",
    label: "Email"
  },
  {
    icon: <Phone className="text-qs-primary" size={20} />,
    text: "+94 741 240 337",
    href: "tel:+94741240337",
    label: "Phone"
  },
];

// Same source as the header, so a new page appears in both or neither.
const quickLinks = routes.map((route) => ({ name: route.name, to: route.path }));

function Footer() {
  return (
    <footer className="bg-transparent mt-24 relative z-10 grid-backdrop" role="contentinfo">
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 rounded-lg flex flex-col md:flex-row md:items-start items-center justify-between gap-12 md:gap-16 border border-qs-hairline bg-qs-glass backdrop-blur-xl" >
        {/* Left: Logo & About */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-3 bg-qs-surface rounded-md border border-qs-hairline">
            <img src={logo} alt="QuantumSync Labs Logo" className="relative h-10" draggable={false} />
          </div>
          <h2 className="font-headline text-xl font-bold tracking-wide text-qs-text">QuantumSync Labs</h2>
          <p className="text-qs-text-muted text-sm max-w-xs leading-relaxed">
            Empowering your digital transformation with modern, secure, and scalable IT solutions.
          </p>
        </motion.div>

        {/* Middle: Quick Links */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="eyebrow">Quick Links</span>
          <ul className="flex flex-col gap-3 text-qs-text text-sm">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="hover:text-qs-primary transition-all duration-300 flex items-center gap-2 group py-1 px-2"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-qs-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Contact */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-end space-y-4"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="eyebrow">Contact Us</span>
          <ul className="flex flex-col gap-4 text-qs-text w-full md:items-end items-center">
            {contactDetails.map((item) => (
              <li key={item.label} className="flex items-center gap-3 group">
                <a
                  href={item.href}
                  className="flex items-center gap-3 hover:text-qs-primary transition-all duration-300 py-2 px-3"
                  aria-label={item.label}
                >
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-qs-hairline w-full md:justify-end justify-center">
            {socialLinks.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-qs-primary hover:text-qs-violet transition-all duration-300 p-2.5 rounded-md border border-qs-hairline hover:border-qs-primary/40"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Newsletter Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 border-t border-qs-hairline">
        <div className="max-w-2xl mx-auto">
          <NewsletterForm
            label="Stay Updated"
            description="Subscribe to get the latest insights and updates from QuantumSync Labs delivered straight to your inbox."
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="relative text-center text-qs-text-muted py-6 text-sm font-mono border-t border-qs-hairline mt-8">
        <p>&copy; {new Date().getFullYear()} QuantumSync Labs. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default memo(Footer);
