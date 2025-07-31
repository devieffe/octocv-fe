// DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className="bg-gray-50 text-gray-800 h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b shadow-sm flex items-center justify-between px-6 z-40">
        <div className="text-base font-semibold tracking-tight text-red-700">
          OctoCV
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <div className="relative flex gap-6">
              {["/login", "/signup"].map((path) => {
                const label = path === "/login" ? "Login" : "Sign Up";
                const isActive = location.pathname === path;

                return (
                  <motion.div key={path} transition={{ type: "spring", stiffness: 300 }} className="relative">
                    <Link
                      to={path}
                      className={`text-sm font-medium pb-1 transition-colors duration-300 ${
                        isActive ? "text-red-700" : "text-gray-500 hover:text-red-600"
                      }`}
                    >
                      {label}
                      {isActive && (
                        <motion.div
                          layoutId="auth-tab"
                          className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-red-500 rounded"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right leading-tight">
                <span className="text-sm font-medium">
                  {user?.first_name || "Unknown"} {user?.last_name || "User"}
                </span>
                <span className="text-xs text-gray-400">
                  {user?.is_staff ? "Staff" : "Student"}
                </span>
              </div>
              <div className="h-9 w-9 rounded-full bg-red-100 border border-red-300 flex items-center justify-center text-sm font-semibold text-red-600">
                {user?.first_name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex pt-14 h-full">
        <Sidebar />

        <main className="flex-1 ml-20 overflow-y-auto px-8 py-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;