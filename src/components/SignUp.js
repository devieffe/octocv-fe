import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/register/`, formData);

      if (response?.status === 201) {
        dispatch(signup({ user: response.data.user, token: response.data.token }));
        setSuccess(true);
        navigate("/user");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Required Fields");
      } else if (err.response?.status === 409) {
        setErrMsg("User Already Exists");
      } else if (err.response?.status === 500) {
        setErrMsg("Server Error. Please try again later.");
      } else {
        setErrMsg("Sign Up Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1 className="text-xl font-semibold">Registration Successful!</h1>
          <p>
            <Link to="/login" className="text-red-600 hover:text-red-500">
              Log in
            </Link>
          </p>
        </section>
      ) : (
        <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold text-blue-950">
              Sign up for an account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* First + Last Name side by side */}
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="sm:w-1/2">
                  <label htmlFor="first_name" className="block text-sm font-medium text-blue-950">
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-blue-950 focus:outline-2 focus:outline-red-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:w-1/2 mt-4 sm:mt-0">
                  <label htmlFor="last_name" className="block text-sm font-medium text-blue-950">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-blue-950 focus:outline-2 focus:outline-red-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-blue-950">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-blue-950 focus:outline-2 focus:outline-red-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-950">
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
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
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base text-gray-900 focus:outline-2 focus:outline-red-600 sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm font-semibold text-red-600 hover:text-red-500"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>

              <button
                type="submit"
                className="w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-2 focus:outline-red-600"
              >
                Register
              </button>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-red-600 hover:text-red-500">
                  Log in
                </Link>
              </p>

              <p
                ref={errRef}
                className={errMsg ? "errmsg text-red-600" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default SignUp;
