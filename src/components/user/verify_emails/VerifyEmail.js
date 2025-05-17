import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      axios
        .get(`${SERVER_URL}api/verify-email/?token=${token}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then((res) => {
          setMessage(res.data.message);
          setSuccess(true);
        })
        .catch((err) => {
          setError("Verification failed. Redirecting to resend page...");
          console.error("Error:", err.response?.data || err.message);
          setTimeout(() => {
            navigate("/resend-verification");
          }, 3000);
        })
        .finally(() => {
          setLoading(false); 
        });
    } else {
      setError("Invalid verification link. Redirecting...");
      setTimeout(() => {
        navigate("/resend-verification");
      }, 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      {loading ? (
        <p className="text-blue-900">{message}</p> // Show message while loading
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : success ? (
        <div className="text-green-600 space-y-4">
          <p>{message}</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
          >
            Go to Login
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default VerifyEmail;
