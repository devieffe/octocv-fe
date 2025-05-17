import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { logout } from "../../slices/authSlice";

const MOCK_USER = {
  first_name: "Pam",
  username: "pamstr",
  email: "pamellaester.ps@gmail.com",
};

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  // const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axiosInstance.get("/api/user/",
          {
            headers: {
              "Content-Type": "application/json",
            },
          });
        setUserInfo(res.data);
      } catch (error) {
        console.warn("Backend not ready, using mock data.");
        setUserInfo(MOCK_USER);
      }
    };

    fetchUserData();
  }, [navigate, token]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  if (!userInfo) {
    return <div className="text-center py-10">Loading user dashboard...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-blue-950 text-center">User Dashboard</h2>
        <p className="text-center text-gray-700">
          Welcome, <span className="font-semibold">{userInfo.first_name}</span>
        </p>

        <div className="bg-gray-100 rounded-lg p-4 shadow space-y-4">
          <div className="space-y-2">
            <p><span className="font-medium">Username:</span> {userInfo.username}</p>
            <p><span className="font-medium">Email:</span> {userInfo.email}</p>
            <p>
              <span className="font-medium">CV Type:</span>{" "}
              <Link to="/download-cv" className="text-red-600 underline hover:text-red-700 transition">
                Download
              </Link>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <button onClick={handleLogout} className="hover:text-red-600 transition">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
