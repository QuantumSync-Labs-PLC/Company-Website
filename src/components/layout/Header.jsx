import { useState, useEffect, useRef, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo2.png";
import ThemeToggle from "../common/ThemeToggle";
import { useTheme } from "../../hooks/useTheme";

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
  const { theme } = useTheme();

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
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl transition-all duration-300" role="banner">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-qs-bg via-qs-surface to-qs-bg opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-b from-qs-primary/5 via-transparent to-qs-accent/5" />
      
      <nav className="relative flex items-center justify-between px-4 md:px-12 h-16 md:h-20 max-w-[1400px] mx-auto w-full border-b border-qs-primary/20 shadow-qs-neon" aria-label="Primary" style={{background: 'var(--qs-glass-bg)', backdropFilter: 'blur(20px)'}}>
        {/* Logo & Title */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative p-3 bg-gradient-to-br from-qs-primary/25 via-qs-accent/20 to-qs-primary/15 rounded-xl border border-qs-primary/30 shadow-qs-soft">
            <div className="absolute inset-0 bg-gradient-to-br from-qs-primary/10 to-qs-accent/10 rounded-xl blur-sm" />
            <img
              src={logo}
              alt="QuantumSync Labs Logo"
              className="relative h-8 w-8 md:h-10 md:w-10 object-contain drop-shadow-lg"
              draggable={false}
            />
          </div>
          <span className="font-headline text-lg md:text-xl font-extrabold tracking-wider text-qs-text hidden sm:inline filter drop-shadow-sm">
            QuantumSync Labs
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-2">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.name}
              variants={linkVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05 }}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative font-body text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 border border-transparent
                   ${isActive 
                     ? "bg-gradient-to-r from-qs-primary/20 to-qs-accent/15 text-qs-primary border-qs-primary/40 shadow-qs-soft backdrop-blur-sm" 
                     : "text-qs-text hover:bg-gradient-to-r hover:from-qs-primary/10 hover:to-qs-accent/8 hover:text-qs-primary hover:border-qs-primary/20 hover:shadow-qs-soft hover:backdrop-blur-sm"}`
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
            <span 
              className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : "mb-1.5"}`}
              style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#0f172a" }}
            ></span>
            <span 
              className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#0f172a" }}
            ></span>
            <span 
              className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : "mt-1.5"}`}
              style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#0f172a" }}
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
                className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
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
                className="md:hidden absolute top-[4.25rem] left-3 right-3 flex flex-col py-4 gap-2 border border-qs-primary/40 z-50 rounded-2xl shadow-qs-neon"
                style={{
                  background: 'linear-gradient(135deg, var(--qs-glass-bg) 0%, rgba(255,255,255,0.1) 100%)',
                  backdropFilter: 'blur(24px)',
                  borderImage: 'linear-gradient(135deg, var(--qs-primary), var(--qs-accent)) 1'
                }}
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
                        className={`block w-full text-base font-body font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 border border-transparent ${
                          isActive 
                            ? "bg-gradient-to-r from-qs-primary/25 to-qs-accent/20 text-qs-primary border-qs-primary/30 shadow-qs-soft" 
                            : "text-qs-text hover:bg-gradient-to-r hover:from-qs-primary/15 hover:to-qs-accent/10 hover:text-qs-primary hover:border-qs-primary/20 hover:shadow-qs-soft"
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
