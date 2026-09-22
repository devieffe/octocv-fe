import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${SERVER_URL}api/register/`, data, {
        headers: { "Content-Type": "application/json" },
      });

      navigate("/verify-email", { state: { email: data.email } });
    } catch (error) {
      const errData = error?.response?.data;

      if (errData && typeof errData === "object") {
        for (const [field, messages] of Object.entries(errData)) {
          if (Array.isArray(messages)) {
            setError(field, {
              type: "server",
              message: messages[0], // or use a formatter
            });
          }
        }
      } else {
        setError("root", { message: "Sign up failed. Please try again." });
      }
    }
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
          Sign up for an account
        </h2>
      </div>

      <div
        className={`mt-10 sm:mx-auto sm:w-full sm:max-w-md rounded-2xl border p-6 sm:p-8 ${
          isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-lg"
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <p className="text-red-500 text-sm text-center" role="alert">{errors.root.message}</p>
          )}

          {/* First + Last Name */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="sm:w-1/2">
              <label className={labelClass}>First Name</label>
              <input
                {...register("first_name", { required: "First name is required" })}
                className={inputClass}
                placeholder="First Name"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
              )}
            </div>

            <div className="sm:w-1/2 mt-4 sm:mt-0">
              <label className={labelClass}>Last Name</label>
              <input
                {...register("last_name", { required: "Last name is required" })}
                className={inputClass}
                placeholder="Last Name"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className={labelClass}>Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              className={inputClass}
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              type="email"
              className={inputClass}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                type={showPassword ? "text" : "password"}
                className={`${inputClass} pr-11`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={`absolute right-3 top-1/2 mt-1 -translate-y-1/2 transition-colors ${
                  isDark ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-xl bg-red-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-2 focus:outline-red-600 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Signing up..." : "Create account"}
          </button>

          {/* Login link */}
          <p className={`text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-red-500 hover:text-red-400">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
