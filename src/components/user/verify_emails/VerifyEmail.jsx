import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      axios
        .get(`${SERVER_URL}api/verify-email/?token=${token}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setMessage(res.data.message);
          setSuccess(true);
        })
        .catch((err) => {
          setError("Verification failed. Redirecting...");
          console.error("Error:", err.response?.data || err.message);
          setTimeout(() => navigate("/resend-verification"), 3000);
        })
        .finally(() => setLoading(false));
    } else {
      setError("Invalid verification link. Redirecting...");
      setTimeout(() => navigate("/resend-verification"), 3000);
      setLoading(false);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm w-full bg-slate-900 border border-white/5 rounded-2xl p-8">
        {loading ? (
          <>
            <Loader size={40} className="text-red-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">{message}</p>
          </>
        ) : error ? (
          <>
            <XCircle size={40} className="text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
          </>
        ) : success ? (
          <>
            <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Email verified!</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 transition-colors"
            >
              Go to sign in
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyEmail;
