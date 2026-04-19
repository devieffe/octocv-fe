// DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-slate-950/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-40">
        <Link to="/" className="text-lg font-black tracking-tight text-white">
          Octo<span className="text-red-500">CV</span>
        </Link>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <div className="flex gap-2">
              {["/login", "/signup"].map((path) => {
                const label = path === "/login" ? "Sign in" : "Sign up";
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right leading-tight">
                <span className="text-sm font-medium text-white">
                  {user?.first_name || ""} {user?.last_name || ""}
                </span>
                <span className="text-xs text-gray-500">
                  {user?.is_staff ? "Staff" : "Student"}
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-600/15 border border-red-500/25 flex items-center justify-center text-sm font-bold text-red-400">
                {user?.first_name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex pt-14 min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-16 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;