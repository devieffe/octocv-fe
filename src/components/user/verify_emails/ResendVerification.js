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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setVerified(false);
    setAlreadyVerified(false);

    try {
      const res = await axios.post(`${SERVER_URL}api/resend-verification-email/`, { email });
      setMessage(res.data.message);
      setVerifyLink(res.data.verify_email_url);
    } catch (err) {
      const errMsg = err.response?.data?.error || "Failed to resend email.";
      setError(errMsg);
    }
  };

  const handleVerifyClick = async () => {
    try {
      const res = await axios.get(verifyLink);
      const msg = res.data.message || "";
  
      if (msg.includes("confirmed")) {
        setVerified(true);
      } else if (msg.toLowerCase().includes("already verified")) {
        setAlreadyVerified(true);
      }
  
      setMessage(msg);
      setError("");
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Verification failed.";
      setError(errMsg);
    }
  };
  

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
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500"
          >
            Resend Email
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
