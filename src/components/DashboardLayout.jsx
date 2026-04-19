import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const DashboardLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Skip to main content — screen-reader + keyboard */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-xl focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* ── Top Navbar ─────────────────────────────────────────────────── */}
      <header
        role="banner"
        aria-label="Site header"
        className="fixed top-0 left-0 right-0 h-14 bg-slate-950/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-40"
      >
        {/* Brand */}
        <Link
          to="/"
          aria-label="OctoCV — go to home page"
          className="text-lg font-black tracking-tight text-white"
        >
          Octo<span className="text-red-500" aria-hidden="true">CV</span>
        </Link>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <nav aria-label="Authentication">
              <ul className="flex gap-2 list-none m-0 p-0">
                {[
                  { path: "/login",  label: "Sign in" },
                  { path: "/signup", label: "Sign up" },
                ].map(({ path, label }) => {
                  const isActive = location.pathname === path;
                  return (
                    <li key={path}>
                      <Link
                        to={path}
                        aria-current={isActive ? "page" : undefined}
                        className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-red-600 text-white"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : (
            <div
              className="flex items-center gap-3"
              aria-label={`Signed in as ${user?.first_name || ""} ${user?.last_name || ""}`.trim()}
            >
              <div className="flex flex-col text-right leading-tight" aria-hidden="true">
                <span className="text-sm font-medium text-white">
                  {user?.first_name || ""} {user?.last_name || ""}
                </span>
                <span className="text-xs text-gray-500">
                  {user?.is_staff ? "Staff" : "Student"}
                </span>
              </div>
              <div
                className="h-8 w-8 rounded-full bg-red-600/15 border border-red-500/25 flex items-center justify-center text-sm font-bold text-red-400"
                aria-hidden="true"
              >
                {user?.first_name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          )}

          {/* ── Theme toggle ───────────────────────────────────────────── */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "light"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950"
          >
            {theme === "dark"
              ? <Sun  size={16} aria-hidden="true" />
              : <Moon size={16} aria-hidden="true" />
            }
          </button>
        </div>
      </header>

      {/* ── Sidebar + main content ─────────────────────────────────────── */}
      <div className="flex pt-14 min-h-screen">
        <Sidebar />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 ml-16 bg-slate-950 focus:outline-none"
          aria-label="Main content"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
