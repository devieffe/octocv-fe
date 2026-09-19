// DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-50 text-gray-800 h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b shadow-sm flex items-center justify-between px-6 z-40">
        <div className="text-base font-semibold tracking-tight text-red-700">
          OctoCV
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right leading-tight">
            <span className="text-sm font-medium">
              {user?.first_name || user?.username || "Account"} {user?.last_name || ""}
            </span>
            <span className="text-xs text-gray-400">
              {user?.is_staff ? "Staff" : "Student"}
            </span>
          </div>
          <div className="h-9 w-9 rounded-full bg-red-100 border border-red-300 flex items-center justify-center text-sm font-semibold text-red-600">
            {(user?.first_name || user?.username || "U").charAt(0).toUpperCase()}
          </div>
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