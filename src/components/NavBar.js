import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { FaLinkedin } from "react-icons/fa";

const navigation = [{ name: "Home", to: "/" }];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-blue-950">
                  Octo<span className="text-red-500">CV</span>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden sm:flex items-center space-x-4">
                {!isAuthenticated &&
                  navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}

                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    <a
                      href="https://www.linkedin.com/company/octocv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-950 hover:text-red-600 transition-colors"
                    >
                      <FaLinkedin className="h-5 w-5" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1 text-blue-950 hover:text-red-600 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Toggle */}
              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-blue-950 hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden bg-white shadow-inner">
            <div className="space-y-1 px-4 pt-2 pb-3">
              {!isAuthenticated &&
                navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href="https://www.linkedin.com/in/YOUR_PROFILE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-blue-950 hover:text-red-600"
                  >
                    <FaLinkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-blue-950 hover:text-red-600"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </Disclosure.Panel>

          {/* Red divider */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-0.5 bg-red-500 w-full" />
          </div>
        </>
      )}
    </Disclosure>
  );
}
