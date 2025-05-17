import React from "react";
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const navigation = [
  { name: 'Home', to: '/' },
];

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
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-blue-950">
                  Octo<span className="text-red-500">CV</span>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden sm:block">
                <div className="ml-10 flex space-x-4">
                  {/* Only show Home if not authenticated */}
                  {!isAuthenticated && navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Conditional Links based on Authentication */}
                  {isAuthenticated && (
                    <>
                      <Link
                        to="/announce"
                        className="rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Questionnaire
                      </Link>
                      <Link
                        to="/make"
                        className="rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Make CV
                      </Link>
                    </>
                  )}

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
                      <Link
                        to="/user"
                        className="rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Menu Toggle */}
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
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* Only show Home if not authenticated */}
              {!isAuthenticated && navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              {/* Conditional Links for Mobile Menu */}
              {isAuthenticated && (
                <>
                  <Link
                    to="/announce1"
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Questionnaire
                  </Link>
                  <Link
                    to="/make"
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Make CV
                  </Link>
                </>
              )}

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/user"
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </Disclosure.Panel>

          <div className="max-w-7xl mx-auto px-4">
            <div className="h-0.5 bg-red-500 w-full" />
          </div>
        </>
      )}
    </Disclosure>
  );
}
