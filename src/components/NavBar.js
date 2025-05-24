// components/Navbar.jsx
import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { FaLinkedin } from "react-icons/fa";

const navigation = [{ name: "Home", to: "/" }];

export default function Navbar({ onSidebarToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const isDashboard = location.pathname.startsWith("/user") || location.pathname.startsWith("/make") || location.pathname.startsWith("/settings") || location.pathname.startsWith("/career-path");

  return (
    <Disclosure as="nav" className="bg-white shadow-sm sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Sidebar toggle on mobile (if dashboard) */}
              {isAuthenticated && isDashboard && (
                <button
                  onClick={onSidebarToggle}
                  className="sm:hidden text-blue-950 hover:text-red-500 focus:outline-none"
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
              )}

              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-blue-950">
                  Octo<span className="text-red-500">CV</span>
                </Link>
              </div>

              {/* Right links */}
              <div className="hidden sm:flex items-center space-x-4">
                {!isAuthenticated &&
                  navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="text-sm font-medium text-blue-950 hover:text-red-500 transition"
                    >
                      {item.name}
                    </Link>
                  ))}

                {!isAuthenticated ? (
                  <>
                    <Link to="/login" className="text-sm font-medium text-blue-950 hover:text-red-500 transition">
                      Log in
                    </Link>
                    <Link to="/signup" className="text-sm font-medium text-blue-950 hover:text-red-500 transition">
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    <a
                      href="https://www.linkedin.com/company/octocv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-950 hover:text-red-500 transition"
                    >
                      <FaLinkedin className="h-5 w-5 mr-1" />
                      LinkedIn
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-blue-950 hover:text-red-500 transition"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="h-0.5 bg-red-500" />
        </>
      )}
    </Disclosure>
  );
}