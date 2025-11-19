import { useState, useEffect, useRef, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo2.png";
import ThemeToggle from "../common/ThemeToggle";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Services", to: "/services" },
  { name: "About", to: "/about" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

const linkVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 18 } },
};

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Prevent background scroll and trap focus when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      // Focus the first link in the mobile menu
      setTimeout(() => {
        menuRef.current?.querySelector("a")?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close on ESC
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-qs-bg/70 shadow-neon transition-all duration-300" role="banner">
      <nav className="glass flex items-center justify-between px-4 md:px-12 h-16 md:h-20 relative" aria-label="Primary">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="QuantumSync Labs Logo"
            className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow"
            draggable={false}
          />
          <span className="font-headline text-xl md:text-2xl font-extrabold tracking-wide text-qs-primary">
            QuantumSync Labs
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.name}
              variants={linkVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.04 }}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative font-body text-base font-medium px-2 py-1 transition text-qs-text hover:text-qs-primary
                   after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:rounded-full after:bg-qs-primary
                   after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform
                   ${isActive ? "text-qs-primary after:scale-x-100" : "after:scale-x-0"}`
                }
              >
                {link.name}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:flex items-center ml-4">
          <ThemeToggle />
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-transparent hover:bg-qs-primary/10 transition group"
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={`block w-6 h-0.5 rounded-full bg-qs-text mb-1.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 rounded-full bg-qs-text transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 rounded-full bg-qs-text mt-1.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              id="mobile-menu"
              ref={menuRef}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              className="md:hidden absolute top-[4.25rem] left-2 right-2 bg-qs-bg/95 glass shadow-neon rounded-glass flex flex-col items-center py-4 gap-4 border border-qs-primary"
              tabIndex={-1}
              role="menu"
            >
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block w-full text-lg font-body font-semibold text-qs-text py-2 px-4 rounded transition hover:bg-qs-primary/20 hover:text-qs-primary ${
                        isActive ? "text-qs-primary" : ""
                      }`
                    }
                    tabIndex={0}
                    role="menuitem"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default memo(Header);
