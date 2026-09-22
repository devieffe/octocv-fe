import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import { getApiErrorMessage } from "../../utils/apiError";
import { useTheme } from "../../context/ThemeContext";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (formData) => {
    try {
      const { username, password } = formData;
      const response = await axiosInstance.post(
        `/api/login/`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const { access, refresh, is_staff } = response.data;
  
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
  
      const safeUser = {
        username,
        is_staff: Boolean(is_staff),
      };
  
      dispatch(
        login({
          user: safeUser,
          accessToken: access,
          refreshToken: refresh || null,
        })
      );
  
      return safeUser;
    } catch (error) {
      setLoading(false);
      setError(getApiErrorMessage(error, "Login failed. Please try again."));

      console.error("Login error:", {
        message: error.message,
        response: error.response,
      });
  
      return null;
    }
  };  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const user = await handleLogin(formData);
  
    if (user) {
      try {
        if (user.is_staff) {
          navigate("/admin");
        } else {
          const testResponse = await axiosInstance.get("/api/passed-tests/", {
            headers: { "Content-Type": "application/json" },
          });
          const tests = testResponse.data.response;
          const allPassed = tests.every(Boolean);
  
          navigate(allPassed ? "/user" : "/onboarding");
        }
      } catch (testError) {
        console.error("Failed to fetch onboarding status:", testError);
        setError("Something went wrong checking your onboarding progress.");
      }
    }
  
    setLoading(false);
  };
  

  const labelClass = `block text-sm font-medium ${isDark ? "text-slate-200" : "text-blue-950"}`;
  const inputClass = `mt-2 block w-full rounded-xl border px-4 py-2.5 text-base focus:outline-2 focus:outline-red-500 sm:text-sm transition-colors ${
    isDark
      ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
  }`;

  return (
    <section
      className={`flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/"
          aria-label="OctoCV — home"
          className={`block text-center text-[1.65rem] font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Octo<span className="text-red-500" aria-hidden="true">CV</span>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold">
          Log in to your account
        </h2>
      </div>

      <div
        className={`mt-10 sm:mx-auto sm:w-full sm:max-w-md rounded-2xl border p-6 sm:p-8 ${
          isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-lg"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center" role="alert">{error}</p>}

          <div>
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={`absolute right-3 top-1/2 mt-1 -translate-y-1/2 transition-colors ${
                  isDark ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-red-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-2 focus:outline-red-600 transition-colors disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className={`text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold text-red-500 hover:text-red-400">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LogIn;


