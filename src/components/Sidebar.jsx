import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User, Shield, FileText, Compass, Settings, LogOut } from "lucide-react";
import { logout } from "../slices/authSlice";

const Sidebar = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isAuthenticated, isStaff } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const links = [
    { to: isStaff ? "/admin" : "/user", icon: <User size={18} aria-hidden="true" />,    label: "Dashboard" },
    ...(isStaff
      ? [{ to: "/admin/tools", icon: <Shield  size={18} aria-hidden="true" />, label: "Admin Tools" }]
      : []
    ),
    { to: "/make",       icon: <FileText size={18} aria-hidden="true" />, label: "CV Maker"  },
    { to: "/careerpath", icon: <Compass  size={18} aria-hidden="true" />, label: "Career"    },
    { to: "/settings",   icon: <Settings size={18} aria-hidden="true" />, label: "Settings"  },
  ];

  const isActive = (path) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <aside
      aria-label="Application sidebar"
      className="fixed top-14 left-0 w-16 h-[calc(100vh-3.5rem)] bg-slate-900 border-r border-white/5 flex flex-col items-center justify-between py-5 z-30"
    >
      <nav aria-label="Main navigation">
        <ul className="flex flex-col gap-2 items-center w-full px-2 list-none m-0 p-0" role="list">
          {links.map(({ to, icon, label }) => (
            <li key={label}>
              <Link
                to={to}
                aria-label={label}
                aria-current={isActive(to) ? "page" : undefined}
                className={`group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive(to)
                    ? "bg-red-600/20 text-red-400 ring-1 ring-red-500/30"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {icon}
                {/* Tooltip */}
                <span
                  role="tooltip"
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-slate-800 border border-white/10 text-white text-xs font-medium px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50 whitespace-nowrap"
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign out */}
      <div className="px-2 w-full flex justify-center">
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Sign out of OctoCV"
          className="group relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <LogOut size={18} aria-hidden="true" />
          <span
            role="tooltip"
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-slate-800 border border-white/10 text-white text-xs font-medium px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50 whitespace-nowrap"
          >
            Sign out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
