import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { login, signup } from "../slices/authSlice";
import axiosInstance from "../api/axiosInstance";
import { useForm } from "react-hook-form";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const inputCls =
  "w-full bg-slate-800/50 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition disabled:opacity-50";
const labelCls = "block text-xs font-medium text-gray-400 mb-1.5";
const fieldErrCls = "text-red-400 text-xs mt-1";

// ─── Login form ───────────────────────────────────────────────────────────────
const LoginForm = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { username, password } = formData;
      const { data } = await axiosInstance.post(
        "/api/login/",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const { access, refresh, is_staff } = data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      const safeUser = { username, is_staff: Boolean(is_staff) };
      dispatch(login({ user: safeUser, accessToken: access, refreshToken: refresh || null }));
      if (is_staff) {
        navigate("/admin");
      } else {
        try {
          const tr = await axiosInstance.get("/api/passed-tests/", {
            headers: { "Content-Type": "application/json" },
          });
          navigate(tr.data.response.every(Boolean) ? "/user" : "/onboarding");
        } catch {
          navigate("/user");
        }
      }
    } catch (err) {
      const s = err?.response?.status;
      if (!s) setError("No server response. Check your internet connection.");
      else if (s === 400 || s === 401) setError("Invalid username or password.");
      else if (s === 500) setError("Server error. Please try again later.");
      else setError("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3" role="alert">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="m-login-username" className={labelCls}>Username</label>
        <input
          id="m-login-username" name="username" type="text"
          autoComplete="username" placeholder="your_username"
          value={formData.username} onChange={handleChange}
          disabled={loading} required className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="m-login-password" className={labelCls}>Password</label>
        <div className="relative">
          <input
            id="m-login-password" name="password"
            type={showPw ? "text" : "password"}
            autoComplete="current-password" placeholder="••••••••"
            value={formData.password} onChange={handleChange}
            disabled={loading} required
            className={inputCls + " pr-10"}
          />
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            aria-label={showPw ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {showPw ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-sm text-gray-500">
        No account yet?{" "}
        <button
          type="button" onClick={onSwitch}
          className="text-red-400 hover:text-red-300 font-medium transition-colors focus-visible:outline-none focus-visible:underline"
        >
          Create one
        </button>
      </p>
    </form>
  );
};

// ─── Signup form ──────────────────────────────────────────────────────────────
const SignupForm = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register, handleSubmit, setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${SERVER_URL}api/register/`, data, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch(signup({ user: response.data.user, token: response.data.token }));
      navigate("/verify-email");
    } catch (error) {
      const errData = error?.response?.data;
      if (errData && typeof errData === "object") {
        for (const [field, messages] of Object.entries(errData)) {
          if (Array.isArray(messages))
            setError(field, { type: "server", message: messages[0] });
        }
      } else {
        setError("root", { message: "Sign up failed. Please try again." });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      {errors.root && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3" role="alert">
          <p className="text-red-400 text-sm">{errors.root.message}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>First name</label>
          <input {...register("first_name", { required: "Required" })} className={inputCls} placeholder="Jane" />
          {errors.first_name && <p className={fieldErrCls}>{errors.first_name.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Last name</label>
          <input {...register("last_name", { required: "Required" })} className={inputCls} placeholder="Doe" />
          {errors.last_name && <p className={fieldErrCls}>{errors.last_name.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls}>Username</label>
        <input
          {...register("username", { required: "Username is required" })}
          className={inputCls} placeholder="your_username"
        />
        {errors.username && <p className={fieldErrCls}>{errors.username.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          type="email" className={inputCls} placeholder="jane@example.com"
        />
        {errors.email && <p className={fieldErrCls}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Password</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          type="password" className={inputCls} placeholder="••••••••"
        />
        {errors.password && <p className={fieldErrCls}>{errors.password.message}</p>}
      </div>

      <button
        type="submit" disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button
          type="button" onClick={onSwitch}
          className="text-red-400 hover:text-red-300 font-medium transition-colors focus-visible:outline-none focus-visible:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

// ─── Modal shell ──────────────────────────────────────────────────────────────
const AuthModal = ({ type: initialType = "login" }) => {
  const [type, setType] = useState(initialType);
  const navigate = useNavigate();
  const location = useLocation();
  const closeBtnRef = useRef(null);
  const isLogin = type === "login";

  const close = () => {
    if (location.state?.backgroundLocation) navigate(-1);
    else navigate("/");
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [location]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Focus close button on mount
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const switchTo = (next) => {
    setType(next);
    navigate(`/${next}`, { replace: true, state: location.state });
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm"
        onClick={close}
      />

      {/* Card */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={isLogin ? "Sign in to OctoCV" : "Create an OctoCV account"}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 28, stiffness: 340 }}
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden pointer-events-auto">

          {/* ── Top bar: tabs + close ─────────────────────────────────── */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
            {/* Tab switcher */}
            <div
              role="tablist"
              aria-label="Authentication mode"
              className="flex gap-0.5 p-1 rounded-xl bg-white/5 border border-white/8"
            >
              {[
                { key: "login",  label: "Sign in"  },
                { key: "signup", label: "Sign up"  },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={type === key}
                  type="button"
                  onClick={() => switchTo(key)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    type === key
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Close */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {/* ── Title ─────────────────────────────────────────────────── */}
          <div className="px-6 pt-5 pb-3">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-lg font-black text-white leading-tight">
                  {isLogin ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  {isLogin
                    ? "Sign in to your OctoCV account"
                    : "Start your career journey today"}
                </p>
              </div>
            </div>
          </div>

          {/* ── Form ──────────────────────────────────────────────────── */}
          <div className="px-6 pb-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={type}
                initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
                transition={{ duration: 0.16 }}
              >
                {isLogin
                  ? <LoginForm  onSwitch={() => switchTo("signup")} />
                  : <SignupForm onSwitch={() => switchTo("login")}  />
                }
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AuthModal;
