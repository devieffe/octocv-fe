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
      if (!error?.response) {
        setError("No server response. Please check your internet connection.");
      } else {
        const status = error.response.status;
        if (status === 400) setError("Invalid username or password.");
        else if (status === 401) setError("Unauthorized. Check your credentials.");
        else if (status === 500) setError("Server error. Please try again later.");
        else setError("Login failed. Please try again.");
      }
  
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
  

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-blue-950">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-950">
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
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-gray-900 focus:outline-2 focus:outline-red-600 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-950">
              Password
            </label>
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
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-gray-900 focus:outline-2 focus:outline-red-600 sm:text-sm"
            />
          </div>

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-sm font-semibold text-red-600 hover:text-red-500"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-2 focus:outline-red-600"
          >
            {loading ? "Logging in..." : "Submit"}
          </button>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold text-red-600 hover:text-red-500">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LogIn;


