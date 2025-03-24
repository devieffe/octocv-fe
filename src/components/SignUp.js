import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../slices/authSlice";
import {useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL = "http://localhost:3000";


const academicLevels = [
  "High School",
  "Associate Degree",
  "Bachelor’s Degree",
  "Master’s Degree",
  "Doctorate (PhD)",
  "Other",
];

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errRef = useRef();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    country: "",
    academylevel: "",
    edubg: "",
  });

  const [countries, setCoutries] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map((country) => country.name.common).sort();
        setCoutries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formData.email, formData.password, formData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/signup`, formData);

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
          <h1>Registration Successful!</h1>
          <p>
            <a href="/login">Go to Login</a>
          </p>
        </section>
      ) : (
        <section className="signup-container">
            <div className="signup-form">
            <h1>Sign Up</h1>
              <form onSubmit={handleSubmit}>
              <label>Personal Information</label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={handleChange}
                name="email"
                placeholder="Email"
                value={formData.email}
                required
              />
              <input
                type="password"
                id="password"
                onChange={handleChange}
                name="password"
                placeholder="Password"
                value={formData.password}
                required
              />
              <input
                type="text"
                id="name"
                onChange={handleChange}
                name="name"
                placeholder="Full Name"
                value={formData.name}
                required
              />
              <select
                name="country"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Country</option>
                {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
                ))}
                </select>
              <label>Academic Information</label>
              <select
                type="text"
                id="academlevel"
                onChange={handleChange}
                name="academlevel"
                placeholder="Academic Level"
                value={formData.academylevel}
                  required
              >
                <option value="" disabled>Select Academic Level</option>
                  {academicLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}  
              </select>
              <input
                type="text"
                id="edubg"
                onChange={handleChange}
                name="edubg"
                placeholder="Education Background"
                value={formData.edubg}
                required
              />
              <button type="submit">Register</button>
              <p>
                Already have an account?
                <br />
                <span className="line">
                  <a href="/login">Log in</a>
                </span>
              </p>
            </form>
            <p
              ref={errRef}
              className={errMsg ? "errmsg show-errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </div>
        </section>
      )}

    </>
  );
};

export default SignUp;
