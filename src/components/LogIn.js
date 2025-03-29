import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
    setFormData({
      ...formData,
      [name]: value
    });
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
      window.location.href = "/CandidateDashboard";
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed", error);
    }
    
    setLoading(false);
  };

  return (
    <div className="contact-form row justify-content-center">
      <div className="col-6 custom-container">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>

          {error && <p className="text-danger">{error}</p>}
        
          <div className='mb-3'>
            <label htmlFor="Email1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              maxLength="50"
              required
            />
          </div>
          
          <div className='mb-3'>
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              placeholder="Password*"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              maxLength="16"
              required
            />
            <button
              type="button"
              className="btn btn-link"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : " Show"}
            </button>
          </div>

          <div className='mb-3'>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Logging in...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>

        <div className="mt-3">
          <p>
            Don't have an account? <button className="btn btn-link" onClick={() => navigate("/signup")}>Create an account</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
