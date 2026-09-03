import { useState, useEffect, useRef, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/Logo 3.1.webp";
import ThemeToggle from "@/components/ui/ThemeToggle";
import routes from "@/constants/routes";

// Navigation comes from constants/routes.js so Header and Footer can't drift apart.
const navLinks = routes.map((route) => ({ name: route.name, to: route.path }));

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

  // One background layer, not two. There used to be a
  // `from-qs-bg via-qs-surface to-qs-bg` gradient underneath the nav as well;
  // in light theme its midpoint was a translucent dark value, which painted a
  // grey band from the dark palette across the header.
  return (
    <header className="fixed top-0 left-0 w-full z-50" role="banner">
      <nav
        className="relative flex items-center justify-between px-4 md:px-12 h-16 md:h-20 max-w-[1400px] mx-auto w-full border-b border-qs-hairline bg-qs-glass backdrop-blur-xl"
        aria-label="Primary"
      >
        {/* Logo & Title */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <img
              src={logo}
              alt="QuantumSync Labs Logo"
              className="relative h-7 w-7 md:h-9 md:w-9 object-contain"
              draggable={false}
            />
          </div>
          <span className="font-headline text-lg md:text-xl font-extrabold tracking-wide text-qs-text hidden sm:inline">
            QuantumSync<span className="text-qs-primary">Labs</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
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
                  `relative font-mono text-xs font-semibold uppercase tracking-widest px-4 py-2.5 transition-all duration-300
                   ${isActive
                     ? "text-qs-primary"
                     : "text-qs-text-muted hover:text-qs-primary"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute left-4 right-4 -bottom-0.5 h-px bg-qs-gradient-primary transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </>
                )}
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
            className="flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-transparent text-qs-text hover:bg-qs-primary/10 transition group"
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {/* bg-current inherits the button's themed text colour via CSS.
                Deriving it from JS theme state instead caused a hydration
                mismatch against the prerendered HTML on every light-theme load. */}
            <span
              className={`block w-6 h-0.5 rounded-full bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : "mb-1.5"}`}
            ></span>
            <span
              className={`block w-6 h-0.5 rounded-full bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 rounded-full bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : "mt-1.5"}`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-qs-overlay backdrop-blur-sm z-40"
                onClick={() => setMenuOpen(false)}
              />
              {/* Menu */}
              <motion.ul
                id="mobile-menu"
                ref={menuRef}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="md:hidden absolute top-17 left-3 right-3 flex flex-col py-4 gap-1 border border-qs-hairline z-50 rounded-lg shadow-qs-medium bg-qs-glass backdrop-blur-xl"
                tabIndex={-1}
                role="menu"
              >
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <NavLink
                        to={link.to}
                        onClick={() => setMenuOpen(false)}
                        className={`block w-full font-mono text-sm font-semibold uppercase tracking-widest py-3.5 px-6 transition-all duration-300 border-l-2 ${
                          isActive
                            ? "text-qs-primary border-qs-primary bg-qs-primary-soft"
                            : "text-qs-text-muted border-transparent hover:text-qs-primary hover:border-qs-primary/40"
                        }`}
                        tabIndex={0}
                        role="menuitem"
                      >
                        {link.name}
                      </NavLink>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default memo(Header);
