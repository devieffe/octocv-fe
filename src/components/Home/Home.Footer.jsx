import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const FOOTER_LINKS = {
  Product: ["Features", "How it works", "Career Guide", "CV Templates"],
  Resources: ["Documentation", /* "Blog", */ "FAQ", "Changelog"],
  Company: ["About", "Careers", "Privacy Policy", "Terms of Service"],
};

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer aria-label="Site footer" className={isDark ? "bg-black pt-12 pb-16" : "bg-white pt-12 pb-16"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4 border-t border-transparent pt-8 md:border-t-0 md:pt-0">
          <div>
            <Link to="/" aria-label="OctoCV home" className={isDark ? "text-2xl font-black text-white tracking-tight" : "text-2xl font-black text-slate-900 tracking-tight"}>
              Octo<span className="text-red-500" aria-hidden="true">CV</span>
            </Link>
            <p className={isDark ? "text-gray-500 text-sm mt-3 leading-relaxed" : "text-slate-600 text-sm mt-3 leading-relaxed"}>
              AI-powered career platform helping professionals land roles they love.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <span className={isDark ? "text-[11px] font-black tracking-[0.28em] text-gray-400 uppercase" : "text-[11px] font-black tracking-[0.28em] text-slate-500 uppercase"}>FOLLOW</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/octocv/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="OctoCV on LinkedIn"
                  className={isDark
                    ? "w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 shadow-sm shadow-red-500/5"
                    : "w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-200 shadow-sm"
                  }
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h2 className={isDark ? "text-white font-semibold text-sm mb-4" : "text-slate-900 font-semibold text-sm mb-4"}>{category}</h2>
              <ul className="space-y-2 list-none m-0 p-0">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className={isDark ? "text-gray-500 hover:text-gray-300 text-sm transition-colors" : "text-slate-600 hover:text-slate-900 text-sm transition-colors"}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
