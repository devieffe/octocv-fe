import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
      const safeUser = { username, is_staff: Boolean(is_staff) };
      dispatch(login({ user: safeUser, accessToken: access, refreshToken: refresh || null }));
      return safeUser;
    } catch (error) {
      setLoading(false);
      if (!error?.response) {
        setError("No server response. Please check your internet connection.");
      } else {
        const status = error.response.status;
        if (status === 400) setError("Invalid username or password.");
        else if (status === 401) setError("Unauthorized. Check your credentials.");
        else if (status === 500) setError("Server error. Please try again later.");
        else setError("Login failed. Please try again.");
      }
      console.error("Login error:", { message: error.message, response: error.response });
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

  const inputCls = "w-full bg-slate-800/50 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition disabled:opacity-50";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-2xl font-black text-white tracking-tight">
            Octo<span className="text-red-500">CV</span>
          </span>
          <h2 className="mt-4 text-xl font-bold text-white">Welcome back</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-2xl p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-gray-400 mb-1.5">
                Username
              </label>
              <input
                type="text" id="username" name="username" autoComplete="username"
                placeholder="your_username" value={formData.username}
                onChange={handleChange} disabled={loading} required
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-1.5">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password" name="password" autoComplete="current-password"
                placeholder="••••••••" value={formData.password}
                onChange={handleChange} disabled={loading} required
                className={inputCls}
              />
            </div>
            <button type="button" onClick={togglePasswordVisibility}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              {showPassword ? "Hide password" : "Show password"}
            </button>
            <button type="submit" disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          No account yet?{" "}
          <Link to="/signup" className="text-red-400 hover:text-red-300 font-medium transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
