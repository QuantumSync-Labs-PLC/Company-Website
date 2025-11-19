import { memo } from "react";
import {
  Facebook, Linkedin, Instagram, Github, Music, Mail, Phone,
} from "lucide-react";
import logo from "../../assets/images/logo1.png";

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

function Footer() {
  return (
    <footer className="bg-transparent mt-24 relative z-10" role="contentinfo">
      <div className="glass max-w-7xl mx-auto px-6 py-10 md:py-14 rounded-t-glass shadow-neon flex flex-col md:flex-row md:items-start items-center justify-between gap-12 md:gap-20">
        {/* Left: Logo & About */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <img src={logo} alt="QuantumSync Labs Logo" className="h-12 mb-1" draggable={false} />
          <h2 className="font-headline text-2xl text-qs-primary font-bold tracking-wide">QuantumSync Labs</h2>
          <p className="text-qs-text-section text-base max-w-xs">
            Empowering your digital transformation with modern, secure, and scalable IT solutions.
          </p>
        </div>

        {/* Right: Contact */}
        <div className="flex-1 flex flex-col items-center md:items-end space-y-3">
          <span className="font-headline text-lg font-semibold text-qs-primary mb-2">Contact Us</span>
          <ul className="flex flex-col gap-3 items-center md:items-end text-qs-text-section w-full">
            {contactDetails.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                {item.icon}
                <a
                  href={item.href}
                  className="hover:text-qs-primary transition break-all"
                  aria-label={item.label}
                >
                  {item.text}
                </a>
              </li>
            ))}
            <div className="flex gap-4 mt-2 flex-wrap justify-center md:justify-start">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-qs-primary hover:text-qs-accent transition text-2xl"
              >
                {item.icon}
              </a>
            ))}
          </div>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-qs-bg text-center text-qs-text-muted py-4 text-sm font-body">
        &copy; {new Date().getFullYear()} QuantumSync Labs. All rights reserved.
      </div>
    </footer>
  );
}

export default memo(Footer);
