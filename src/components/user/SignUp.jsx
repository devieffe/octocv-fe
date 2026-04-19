import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../../slices/authSlice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
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
          if (Array.isArray(messages)) {
            setError(field, { type: "server", message: messages[0] });
          }
        }
      } else {
        setError("root", { message: "Sign up failed. Please try again." });
      }
    }
  };

  const inputCls = "w-full bg-slate-800/50 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-2xl font-black text-white tracking-tight">
            Octo<span className="text-red-500">CV</span>
          </span>
          <h2 className="mt-4 text-xl font-bold text-white">Create your account</h2>
          <p className="text-gray-500 text-sm mt-1">Start your career journey today</p>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-2xl p-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{errors.root.message}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>First Name</label>
                <input
                  {...register("first_name", { required: "Required" })}
                  className={inputCls} placeholder="Jane"
                />
                {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Last Name</label>
                <input
                  {...register("last_name", { required: "Required" })}
                  className={inputCls} placeholder="Doe"
                />
                {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelCls}>Username</label>
              <input
                {...register("username", { required: "Username is required" })}
                className={inputCls} placeholder="your_username"
              />
              {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <label className={labelCls}>Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                type="email" className={inputCls} placeholder="jane@example.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
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
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:text-red-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
