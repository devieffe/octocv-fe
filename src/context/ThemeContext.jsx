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
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";

    const rootBackground = theme === "dark" ? "#020617" : "#ffffff";
    const rootColor = theme === "dark" ? "#f8fafc" : "#0f172a";

    document.body.style.backgroundColor = rootBackground;
    document.body.style.color = rootColor;
    document.body.style.transition = "background-color 0.45s ease, color 0.45s ease";

    const metaThemeColor = document.querySelector("meta[name='theme-color']:not([media])");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", rootBackground);
    }

    try {
      localStorage.setItem("octocv_theme", theme);
      writeCookie("octocv_theme", theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className="app-shell"
        data-theme={theme}
        style={{
          backgroundColor: theme === "dark" ? "#020617" : "#f8fafc",
          color: theme === "dark" ? "#f8fafc" : "#0f172a",
          transition: "background-color 0.45s ease, color 0.45s ease, opacity 0.45s ease",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
