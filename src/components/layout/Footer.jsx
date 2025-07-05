import { 
  FaFacebook, FaLinkedin, FaInstagram, FaGithub, FaTiktok,
  FaEnvelope, FaPhone,
} from "react-icons/fa";
import logo from "../../assets/images/logo1.png"; // Adjust path as needed

const socialLinks = [
  { href: "https://www.facebook.com/yourpage", icon: <FaFacebook />, label: "Facebook" },
  { href: "https://www.linkedin.com/company/quantumsync-labs", icon: <FaLinkedin />, label: "LinkedIn" },
  { href: "https://www.instagram.com/yourpage", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://github.com/your-org", icon: <FaGithub />, label: "GitHub" },
  { href: "https://www.tiktok.com/@yourpage", icon: <FaTiktok />, label: "TikTok" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

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
  // {
  //   icon: <FaMapMarkerAlt className="text-blue text-xl" />,
  //   text: "Colombo, Sri Lanka",
  //   href: "https://goo.gl/maps/xyz123",
  //   label: "Location"
  // }
];

export default function Footer() {
  return (
    <footer className="bg-transparent mt-24 relative z-10">
      <div className="glass max-w-7xl mx-auto px-6 py-10 md:py-14 rounded-t-glass shadow-neon-blue flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Logo & Intro */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
          <img src={logo} alt="QuantumSync Labs Logo" className="h-12 mb-2" />
          <h2 className="font-headline text-2xl text-blue font-bold mb-2 tracking-wide">
            QuantumSync Labs
          </h2>
          <p className="text-section text-base mb-4 max-w-sm">
            Empowering your digital transformation with modern, secure, and scalable IT solutions.
          </p>
          <div className="flex gap-5 mt-2">
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
        </div>

        {/* Quick Links */}
        <div className="flex-1 flex flex-col items-center md:items-end mb-8 md:mb-0">
          <span className="font-headline text-lg font-semibold text-blue mb-3">Quick Links</span>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="font-body text-section hover:text-blue transition px-2 py-1 rounded"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details */}
        <div className="flex-1 flex flex-col items-center md:items-end">
          <span className="font-headline text-lg font-semibold text-blue mb-3">Contact Us</span>
          <ul className="flex flex-col gap-3 items-center md:items-end text-section">
            {contactDetails.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                {item.icon}
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.label === "Location" ? "_blank" : undefined}
                    rel={item.label === "Location" ? "noopener noreferrer" : undefined}
                    className="hover:text-blue transition"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
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
