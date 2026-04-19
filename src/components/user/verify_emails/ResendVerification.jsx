import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ResendVerification = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [verifyLink, setVerifyLink] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError(""); setVerified(false); setAlreadyVerified(false);
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${SERVER_URL}api/resend-verification-email/`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(res.data.message);
      setVerifyLink(res.data.verify_email_url);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend email.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyClick = async () => {
    try {
      const res = await axios.get(verifyLink);
      const msg = res.data.message || "";
      if (msg.includes("confirmed")) {
        setVerified(true); setMessage(msg); setRedirecting(true);
      } else if (msg.toLowerCase().includes("already verified")) {
        setAlreadyVerified(true); setMessage(msg); setRedirecting(true);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Verification failed.");
    }
  };

  if (redirecting) {
    setTimeout(() => navigate("/login"), 2000);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-red-600/15 border border-red-500/25 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Resend verification email</h2>
          <p className="text-gray-500 text-sm mt-1">Enter your email to get a new link</p>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-2xl p-7">
          {(verified || alreadyVerified) ? (
            <div className="text-center space-y-3">
              <p className="text-green-400 text-sm">{message}</p>
              {redirecting && <p className="text-gray-500 text-xs">Redirecting to sign in...</p>}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              {message && !verifyLink && (
                <p className="text-green-400 text-sm text-center">{message}</p>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com" required
                  className="w-full bg-slate-800/50 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-50">
                {loading ? "Sending..." : "Resend email"}
              </button>
              {verifyLink && (
                <button type="button" onClick={handleVerifyClick}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-xl py-3 transition-colors">
                  Confirm verification link
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResendVerification;
