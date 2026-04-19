import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

const readCookie = (name) => {
  const m = document.cookie.match(new RegExp("(^|;)\\s*" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
};

const writeCookie = (name, value) => {
  const exp = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp};path=/;SameSite=Lax`;
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return (
        localStorage.getItem("octocv_theme") ||
        readCookie("octocv_theme") ||
        (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
      );
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Update meta theme-color dynamically for mobile browsers
    const metaThemeColor = document.querySelector("meta[name='theme-color']:not([media])");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#020617" : "#f8fafc");
    }
    try {
      localStorage.setItem("octocv_theme", theme);
      writeCookie("octocv_theme", theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
