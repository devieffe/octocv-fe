import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import Sidebar from "../user/Sidebar";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Settings = () => {
  const user = useSelector((state) => state.auth?.user || {});
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    old_password: "",
    new_password: "",
    confirm_password: "",
    delete_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload = {};
      if (formData.first_name.trim()) payload.first_name = formData.first_name;
      if (formData.last_name.trim()) payload.last_name = formData.last_name;

      await axiosInstance.put("/api/profile/update/", payload);
      setMessage("Profile updated successfully");
    } catch {
      setMessage("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!formData.old_password || !formData.new_password) {
      setMessage("Please fill in both old and new passwords.");
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/api/password/change/", {
        old_password: formData.old_password,
        new_password: formData.new_password,
      });
      setMessage("Password changed successfully");
    } catch {
      setMessage("Password change failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    if (!formData.delete_password) {
      setMessage("Please enter your password to delete account.");
      return;
    }

    try {
      await axiosInstance.delete("/api/profile/delete/", {
        data: { password: formData.delete_password },
      });
      dispatch(logout());
    } catch {
      setMessage("Account deletion failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <section className="flex-1 p-10 bg-white">
        <motion.h2
          className="text-2xl font-semibold text-blue-950 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Settings
        </motion.h2>

        {message && (
          <motion.div
            className="mb-4 text-sm text-red-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Profile */}
          <motion.div
            className="bg-white shadow-md rounded-lg p-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <h3 className="text-lg font-medium text-blue-950 mb-4">Profile</h3>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-700">First Name</span>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 rounded-md border border-gray-300 p-2 focus:outline-red-600"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-700">Last Name</span>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 rounded-md border border-gray-300 p-2 focus:outline-red-600"
                />
              </label>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleUpdate}
                disabled={loading}
                className="w-fit rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
              >
                {loading ? "Updating..." : "Update Profile"}
              </motion.button>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            className="bg-white shadow-md rounded-lg p-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <h3 className="text-lg font-medium text-blue-950 mb-4">Change Password</h3>
            <div className="flex flex-col gap-4">
              <input
                type="password"
                name="old_password"
                placeholder="Old Password"
                value={formData.old_password}
                onChange={handleChange}
                className="rounded-md border border-gray-300 p-2 focus:outline-red-600"
              />
              <input
                type="password"
                name="new_password"
                placeholder="New Password"
                value={formData.new_password}
                onChange={handleChange}
                className="rounded-md border border-gray-300 p-2 focus:outline-red-600"
              />
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm New Password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="rounded-md border border-gray-300 p-2 focus:outline-red-600"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePasswordChange}
                disabled={loading}
                className="w-fit rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
              >
                {loading ? "Changing..." : "Change Password"}
              </motion.button>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            className="bg-red-50 border border-red-300 shadow-md rounded-lg p-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <h3 className="text-lg font-medium text-red-700 mb-4">Danger Zone</h3>

            <input
              type="password"
              name="delete_password"
              placeholder="Enter password to confirm"
              value={formData.delete_password}
              onChange={handleChange}
              className="mb-4 rounded-md border border-gray-300 p-2 focus:outline-red-600"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDeleteAccount}
              className="w-fit rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
            >
              Delete Account
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
