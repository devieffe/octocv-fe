import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../../slices/authSlice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-blue-950">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <p className="text-red-600 text-sm text-center">{errors.root.message}</p>
          )}

          {/* First + Last Name */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="sm:w-1/2">
              <label className="block text-sm font-medium text-blue-950">First Name</label>
              <input
                {...register("first_name", { required: "First name is required" })}
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-blue-950 sm:text-sm"
                placeholder="First Name"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
              )}
            </div>

            <div className="sm:w-1/2 mt-4 sm:mt-0">
              <label className="block text-sm font-medium text-blue-950">Last Name</label>
              <input
                {...register("last_name", { required: "Last name is required" })}
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-blue-950 sm:text-sm"
                placeholder="Last Name"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-blue-950">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-blue-950 sm:text-sm"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-blue-950">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              type="email"
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-gray-900 sm:text-sm"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-blue-950">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              type="password"
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-gray-900 sm:text-sm"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-500"
          >
            {isSubmitting ? "Signing up..." : "Submit"}
          </button>

          {/* Login link */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-red-600 hover:text-red-500">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
