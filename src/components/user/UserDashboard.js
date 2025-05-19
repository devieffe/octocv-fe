import React, { useEffect, useState, useCallback } from "react";
import {  useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../user/Sidebar";
import axiosInstance from "../../api/axiosInstance";
import {
  FileText,
  Compass,
  Settings,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

const MOCK_USER = {
  first_name: "Pam",
  username: "pamstr",
  email: "pamellaester.ps@gmail.com",
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);

  const fetchUserData = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axiosInstance.get("/api/profile/show/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUserInfo(res.data);
    } catch (error) {
      console.warn("Backend not ready, using mock data.");
      setUserInfo(MOCK_USER);
    }
  }, [navigate, token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (!userInfo) {
    return <div className="text-center py-10">Loading user dashboard...</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto bg-white">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-semibold text-[#e91919]">
            Welcome, {userInfo.first_name}!
          </h1>
          <User className="text-[#e91919]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info Card */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4 transition hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-[#e91919] flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Info
            </h2>
            <div className="text-gray-700 space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">Username:</span>
                <span>{userInfo.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Email:</span>
                <span>{userInfo.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Actions Card */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5 transition hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-[#e91919]">Quick Actions</h2>

            <div className="grid gap-3">
              <Link
                to="/make"
                className="flex items-center justify-center gap-2 bg-[#e91919] text-white font-medium rounded-xl px-5 py-3 hover:bg-[#cc1616] transition-transform hover:scale-105"
              >
                <FileText className="w-5 h-5" />
                Download CV
              </Link>

              <Link
                to="/career-path"
                className="flex items-center justify-center gap-2 border border-[#e91919] text-[#e91919] font-medium rounded-xl px-5 py-3 hover:bg-[#e91919] hover:text-white transition-transform hover:scale-105"
              >
                <Compass className="w-5 h-5" />
                Explore Career Path
              </Link>

              <Link
                to="/profile-settings"
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 font-medium rounded-xl px-5 py-3 hover:bg-gray-200 transition-transform hover:scale-105"
              >
                <Settings className="w-5 h-5" />
                Update Settings
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
