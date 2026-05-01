import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook, Linkedin, Instagram, Github, Music, Mail, Phone,
} from "lucide-react";
import logo from "../../assets/images/logo-wordmark-ui.webp";

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

const quickLinks = [
  { name: "Home", to: "/" },
  { name: "Services", to: "/services" },
  { name: "About", to: "/about" },
  { name: "Careers", to: "/careers" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

function Footer() {
  return (
    <footer className="bg-transparent mt-24 relative z-10" role="contentinfo">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-qs-primary/5 via-transparent to-qs-accent/5 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 rounded-3xl shadow-qs-neon flex flex-col md:flex-row md:items-start items-center justify-between gap-12 md:gap-16 border border-qs-primary/30 backdrop-blur-2xl" style={{background: 'linear-gradient(135deg, var(--qs-glass-bg) 0%, rgba(0,115,255,0.05) 50%, rgba(0,163,237,0.05) 100%)'}}>
        {/* Left: Logo & About */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-4 bg-linear-to-br from-qs-primary/25 via-qs-accent/20 to-qs-primary/15 rounded-2xl border border-qs-primary/40 shadow-qs-medium">
            <div className="absolute inset-0 bg-linear-to-br from-qs-primary/10 to-qs-accent/10 rounded-2xl blur-sm" />
            <img src={logo} alt="QuantumSync Labs Logo" className="relative h-12 drop-shadow-lg" draggable={false} />
          </div>
          <h2 className="font-headline text-2xl font-bold tracking-wider text-qs-text filter drop-shadow-sm">QuantumSync Labs</h2>
          <p className="text-qs-text-section text-base max-w-xs leading-relaxed">
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
          <h3 className="font-headline text-lg font-semibold text-qs-text">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-qs-text text-sm">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="hover:text-qs-primary transition-all duration-300 flex items-center gap-2 group py-1 px-2 rounded-lg hover:bg-qs-primary/10 hover:shadow-qs-soft"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-linear-to-r from-qs-primary to-qs-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-qs-soft" />
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
          <h3 className="font-headline text-lg font-semibold text-qs-text">Contact Us</h3>
          <ul className="flex flex-col gap-4 text-qs-text w-full md:items-end items-center">
            {contactDetails.map((item) => (
              <li key={item.label} className="flex items-center gap-3 group">
                <a
                  href={item.href}
                  className="flex items-center gap-3 hover:text-qs-primary transition-all duration-300 py-2 px-3 rounded-lg hover:bg-qs-primary/10 hover:shadow-qs-soft backdrop-blur-sm"
                  aria-label={item.label}
                >
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Social Links */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gradient-to-r from-qs-primary/30 to-qs-accent/30 w-full md:justify-end justify-center" style={{borderImage: 'linear-gradient(90deg, var(--qs-primary), var(--qs-accent)) 1'}}>
            {socialLinks.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-qs-primary hover:text-qs-accent transition-all duration-300 p-3 rounded-xl hover:bg-linear-to-r hover:from-qs-primary/15 hover:to-qs-accent/10 hover:shadow-qs-soft border border-transparent hover:border-qs-primary/30 backdrop-blur-sm"
                whileHover={{ y: -6, scale: 1.15, rotateZ: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Copyright */}
      <div className="relative text-center text-qs-text-muted py-6 text-sm font-body border-t mt-8" style={{borderImage: 'linear-gradient(90deg, transparent, var(--qs-primary), var(--qs-accent), transparent) 1', background: 'linear-gradient(135deg, var(--qs-glass-bg) 0%, rgba(0,115,255,0.02) 100%)', backdropFilter: 'blur(10px)'}}>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-qs-primary/5 to-transparent" />
        <p className="relative">&copy; {new Date().getFullYear()} QuantumSync Labs. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default memo(Footer);
