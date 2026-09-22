import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const homeNavVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, staggerDirection: -1 } },
  exit: { opacity: 1, transition: { staggerChildren: 0.07, staggerDirection: 1 } },
};

const homeLetterVariants = {
  hidden: { opacity: 0, width: 0, x: 8 },
  visible: { opacity: 1, width: "auto", x: 0, transition: { duration: 0.18 } },
  exit: { opacity: 0, width: 0, x: 8, transition: { duration: 0.14 } },
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const bgState = { backgroundLocation: location };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 980) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const menuSectionIds = new Set(["features", "how-it-works", "about", "faq"]);
    const sections = Array.from(document.querySelectorAll("main section"));

    const updateActiveSection = () => {
      const focusLine = window.innerHeight * 0.35;
      const focusedSection = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= focusLine && bounds.bottom > focusLine;
      });

      if (!focusedSection) {
        setActiveSection("");
        return;
      }

      const sectionId = focusedSection.id || (focusedSection.getAttribute("aria-labelledby") === "hero-heading" ? "hero" : "");
      setActiveSection(sectionId === "hero" || menuSectionIds.has(sectionId) ? `#${sectionId}` : "");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "About", href: "#about" },
    { label: "Faq", href: "#faq" },
  ];

  const visibleNavLinks = navLinks;

  const isDark = theme === "dark";
  const navLinkClass = isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900";
  const controlClass = isDark
    ? "bg-white/5 hover:bg-white/10 border-white/10 text-gray-400 hover:text-white"
    : "bg-slate-900/[0.04] hover:bg-slate-900/[0.08] border-slate-900/10 text-slate-500 hover:text-slate-900";
  const scrolledHeaderClass = isDark
    ? "bg-slate-950/95 backdrop-blur-md shadow-lg"
    : "bg-white/95 backdrop-blur-md shadow-md";

  return (
    <header
      role="banner"
      aria-label="Site header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? scrolledHeaderClass : "bg-transparent"}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-xl focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">
          <Link
            to="/"
            aria-label="OctoCV — home"
            className={`text-[1.65rem] font-black tracking-tight justify-self-start ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Octo<span className="text-red-500" aria-hidden="true">CV</span>
          </Link>

          <nav aria-label="Page sections" className="hidden nav:flex items-center justify-center gap-8">
            <AnimatePresence initial={false}>
              {activeSection !== "#hero" && (
                <motion.a
                  href="#hero"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={homeNavVariants}
                  className={`section-nav-link text-[0.95rem] font-semibold transition-colors ${navLinkClass}`}
                >
                  {Array.from("Home").map((letter, index) => (
                    <motion.span key={`${letter}-${index}`} variants={homeLetterVariants} className="home-nav-letter">
                      {letter}
                    </motion.span>
                  ))}
                </motion.a>
              )}
            </AnimatePresence>
            {visibleNavLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`section-nav-link text-[0.95rem] font-semibold transition-colors ${navLinkClass} ${activeSection === href ? "section-nav-link--active" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden nav:flex items-center gap-2 justify-self-end">
            <Link
              to="/login"
              state={bgState}
              className="h-9 inline-flex items-center justify-center text-[0.95rem] font-semibold bg-transparent hover:bg-red-500/10 text-red-500 border-2 border-red-500 px-6 rounded-xl transition-colors"
            >
              Sign in
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={theme === "light"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className={`ml-1 w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${controlClass}`}
            >
              {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
          </div>

          <div className="nav:hidden flex items-center gap-2 col-start-3 justify-self-end">
            <div className="relative">
              <button
                type="button"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`w-10 h-10 border flex items-center justify-center transition-colors relative z-10 ${
                  menuOpen
                    ? `rounded-t-xl rounded-b-none border-b-transparent shadow-none ${
                        isDark ? "bg-slate-900 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
                      }`
                    : `rounded-xl ${controlClass}`
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.16 }}
                    className="flex items-center justify-center"
                  >
                    {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.nav
                    id="mobile-nav"
                    aria-label="Mobile navigation"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    style={{ transformOrigin: "top right" }}
                    className={`absolute right-0 top-full -mt-px w-56 rounded-2xl rounded-tr-none border p-2 flex flex-col gap-1 shadow-xl ${
                      isDark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"
                    }`}
                  >
                    {[{ label: "Home", href: "#hero" }, ...visibleNavLinks].map(({ label, href }, index) => (
                      <motion.a
                        key={label}
                        href={href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * index, duration: 0.16 }}
                        onClick={() => setMenuOpen(false)}
                        className={`px-3 py-2.5 rounded-lg text-[0.95rem] font-semibold transition-colors ${
                          activeSection === href
                            ? "bg-red-500/10 text-red-500"
                            : isDark
                              ? "text-gray-300 hover:bg-white/5 hover:text-white"
                              : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
                        }`}
                      >
                        {label}
                      </motion.a>
                    ))}

                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        aria-pressed={theme === "light"}
                        className={`h-10 inline-flex items-center justify-center gap-2 text-[0.95rem] font-semibold rounded-xl border transition-colors ${controlClass}`}
                      >
                        {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
                        {theme === "dark" ? "Light mode" : "Dark mode"}
                      </button>
                      <Link
                        to="/login"
                        state={bgState}
                        onClick={() => setMenuOpen(false)}
                        className="h-10 inline-flex items-center justify-center text-[0.95rem] font-semibold bg-transparent hover:bg-red-500/10 text-red-500 border-2 border-red-500 rounded-xl transition-colors"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/signup"
                        state={bgState}
                        onClick={() => setMenuOpen(false)}
                        className="h-10 inline-flex items-center justify-center text-[0.95rem] font-semibold bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors"
                      >
                        Get started
                      </Link>
                    </div>
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
