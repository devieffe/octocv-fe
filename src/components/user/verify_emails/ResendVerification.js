import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ResendVerification = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [verifyLink, setVerifyLink] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);  // New state for handling redirect
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setVerified(false);
    setAlreadyVerified(false);

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${SERVER_URL}api/resend-verification-email/`, { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
      setMessage(res.data.message);
      setVerifyLink(res.data.verify_email_url);
    } catch (err) {
      const errMsg = err.response?.data?.error || "Failed to resend email.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyClick = async () => {
    try {
      const res = await axios.get(verifyLink);
      const msg = res.data.message || "";

      if (msg.includes("confirmed")) {
        setVerified(true);
        setMessage(msg);
        // After verification, set redirect state to true and navigate
        setRedirecting(true);
      } else if (msg.toLowerCase().includes("already verified")) {
        setAlreadyVerified(true);
        setMessage(msg);
        // After already verified, set redirect state to true and navigate
        setRedirecting(true);
      }
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Verification failed.";
      setError(errMsg);
    }
  };

  // Redirect immediately if we are in the redirecting state
  if (redirecting) {
    setTimeout(() => {
      navigate("/login");
    }, 2000);  // Delay the redirect for 2 seconds so the user can see the message
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold text-center text-blue-950 mb-4">Resend Verification Email</h2>

      {!verified && !alreadyVerified && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full rounded-md border px-3 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500"
          >
            {loading ? "Sending..." : "Verify Email"}
          </button>
        </form>
      )}

      {message && !verified && !alreadyVerified && (
        <div className="mt-4 text-green-600 text-sm text-center space-y-2">
          <p>{message}</p>
          {verifyLink && (
            <button
              onClick={handleVerifyClick}
              className="underline text-blue-800 hover:text-blue-600"
            >
              Click here to verify
            </button>
          )}
        </div>
      )}

      {(verified || alreadyVerified) && (
        <div className="mt-6 text-center space-y-4">
          <p className="text-green-700 font-medium">
            {verified
              ? "Your email was verified successfully!"
              : "Email is already verified."}
          </p>
          {/* Display button for redirection */}
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
          >
            Go to Login
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default ResendVerification;
