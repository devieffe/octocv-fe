import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      dispatch(login({ user: response.data.user, token: response.data.token }));
      navigate("/CandidateDashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed", error);
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
            <label htmlFor="email" className="block text-sm font-medium text-blue-950">
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-gray-900 focus:outline-2 focus:outline-red-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-950">
              Password
            </label>
            <div className="mt-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-gray-900 focus:outline-2 focus:outline-red-600 sm:text-sm"
              />
            </div>
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
