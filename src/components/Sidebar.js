import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Shield,
  FileText,
  Compass,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "../slices/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isStaff } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const links = [
    { to: isStaff ? "/admin" : "/user", icon: <User />, label: "User" },
    ...(isStaff
      ? [{ to: "/admin/tools", icon: <Shield />, label: "Tools" }]
      : []),
    { to: "/make", icon: <FileText />, label: "CV Maker" },
    { to: "/careerpath", icon: <Compass />, label: "Career" },
    { to: "/settings", icon: <Settings />, label: "Settings" },
  ];

  const isActive = (path) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <aside className="fixed  left-0 w-16 h-[calc(100vh-4rem)] bg-white text-red-700 flex flex-col items-center justify-between py-4 z-30 border-r border-gray-200">
      <div className="flex flex-col gap-5 items-center">
        {links.map(({ to, icon, label }) => (
          <Link
            key={label}
            to={to}
            className={`group relative p-2 transition duration-300 rounded-lg flex items-center justify-center ${
              isActive(to)
                ? "bg-red-100 shadow-inner ring-1 ring-red-400"
                : "hover:bg-red-50"
            }`}
          >
            <div
              className={`transition-all duration-300 ${
                isActive(to)
                  ? "text-red-700"
                  : "text-red-500 group-hover:text-red-600"
              }`}
            >
              {icon}
            </div>
            <span
              className="
                absolute left-full top-1/2 -translate-y-1/2 ml-2
                bg-red-700 text-white text-xs font-medium
                px-2 py-0.5 rounded
                opacity-0 group-hover:opacity-100
                pointer-events-none group-hover:pointer-events-auto
                transition-all duration-300 shadow-md z-50 whitespace-nowrap
              "
            >
              {label}
            </span>
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="p-2 rounded-lg hover:bg-red-50 transition duration-300 relative group flex items-center justify-center"
      >
        <LogOut className="text-red-500 group-hover:text-red-700 w-5 h-5" />
        <span
          className="
            absolute left-full top-1/2 -translate-y-1/2 ml-2
            bg-red-700 text-white text-xs font-medium
            px-2 py-0.5 rounded
            opacity-0 group-hover:opacity-100
            pointer-events-none group-hover:pointer-events-auto
            transition-all duration-300 shadow-md z-50 whitespace-nowrap
          "
        >
          Logout
        </span>
      </button>
    </aside>
  );
};

export default Sidebar;