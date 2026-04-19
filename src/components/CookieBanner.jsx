import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";

const CONSENT_KEY = "octocv_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const acceptAllRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const existing = localStorage.getItem(CONSENT_KEY);
        if (!existing) setVisible(true);
      } catch (_) {}
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Move focus to first button when banner opens
  useEffect(() => {
    if (visible && acceptAllRef.current) {
      acceptAllRef.current.focus();
    }
  }, [visible]);

  const accept = (level) => {
    try {
      localStorage.setItem(CONSENT_KEY, level);
      const exp = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${CONSENT_KEY}=${encodeURIComponent(level)};expires=${exp};path=/;SameSite=Lax`;
    } catch (_) {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent"
          aria-describedby="cookie-banner-desc"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 220 }}
          className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-5"
        >
          <div className="max-w-4xl mx-auto bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5 md:p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5"
              >
                <Cookie size={18} className="text-red-400" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-bold text-white mb-1">We use cookies</h2>
                <p id="cookie-banner-desc" className="text-xs text-gray-400 leading-relaxed">
                  OctoCV uses{" "}
                  <strong className="text-gray-300">essential cookies</strong> for authentication and security,
                  and{" "}
                  <strong className="text-gray-300">preference cookies</strong>{" "}
                  to remember your light / dark mode choice. We do not use tracking or advertising cookies.{" "}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
                  >
                    Privacy policy
                  </a>
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Cookie consent options">
                  <button
                    ref={acceptAllRef}
                    onClick={() => accept("all")}
                    className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    Accept all
                  </button>
                  <button
                    onClick={() => accept("essential")}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    Essential only
                  </button>
                </div>
              </div>

              {/* Dismiss */}
              <button
                onClick={() => accept("essential")}
                aria-label="Dismiss — accept essential cookies only"
                className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
