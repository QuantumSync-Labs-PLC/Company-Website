import {
  FaFacebook, FaLinkedin, FaInstagram, FaGithub, FaTiktok, FaEnvelope, FaPhone,
} from "react-icons/fa";
import logo from "../../assets/images/logo1.png";

// Social Media Links
const socialLinks = [
  { href: "https://github.com/QuantumSync-Labs-PLC/", icon: <FaGithub />, label: "GitHub" },
  { href: "https://www.linkedin.com/company/quantumsync-labs", icon: <FaLinkedin />, label: "LinkedIn" },
  { href: "https://www.facebook.com/share/12FQynVu8TR/?mibextid=wwXIfr", icon: <FaFacebook />, label: "Facebook" },
  { href: "https://www.instagram.com/quantumsync_labs?igsh=NmVjeG04b2R6dXF5&utm_source=qr", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://www.tiktok.com/@quantumsync.labs?_t=ZS-8xnNboWCY5q&_r=1", icon: <FaTiktok />, label: "TikTok" },
];

// Contact Details
const contactDetails = [
  {
    icon: <FaEnvelope className="text-blue text-xl" />,
    text: "labsquantumsync@gmail.com",
    href: "mailto:labsquantumsync@gmail.com",
    label: "Email"
  },
  {
    icon: <FaPhone className="text-blue text-xl" />,
    text: "+94 741 240 337",
    href: "tel:+94741240337",
    label: "Phone"
  },
];

export default function Footer() {
  return (
    <footer className="bg-transparent mt-24 relative z-10">
      <div className="glass max-w-7xl mx-auto px-6 py-10 md:py-14 rounded-t-glass shadow-neon-blue flex flex-col md:flex-row md:items-start items-center justify-between gap-12 md:gap-20">
        {/* Left: Logo & About */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <img src={logo} alt="QuantumSync Labs Logo" className="h-12 mb-1" draggable={false} />
          <h2 className="font-headline text-2xl text-blue font-bold tracking-wide">QuantumSync Labs</h2>
          <p className="text-section text-base max-w-xs">
            Empowering your digital transformation with modern, secure, and scalable IT solutions.
          </p>
        </div>

        {/* Right: Contact */}
        <div className="flex-1 flex flex-col items-center md:items-end space-y-3">
          <span className="font-headline text-lg font-semibold text-blue mb-2">Contact Us</span>
          <ul className="flex flex-col gap-3 items-center md:items-end text-section w-full">
            {contactDetails.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                {item.icon}
                <a
                  href={item.href}
                  className="hover:text-blue transition break-all"
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
                className="text-blue hover:text-cyan transition text-2xl"
              >
                {item.icon}
              </a>
            ))}
          </div>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-navy text-center text-section py-4 text-sm font-body">
        &copy; {new Date().getFullYear()} QuantumSync Labs. All rights reserved.
      </div>
    </footer>
  );
}
