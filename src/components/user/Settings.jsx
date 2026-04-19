import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { motion } from "framer-motion";
import { User, Lock, AlertTriangle } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

const inputCls = "w-full bg-slate-800/50 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition";

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
      setMessage({ text: "Profile updated successfully", type: "success" });
    } catch {
      setMessage({ text: "Update failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!formData.old_password || !formData.new_password) {
      setMessage({ text: "Please fill in both old and new passwords.", type: "error" }); return;
    }
    if (formData.new_password !== formData.confirm_password) {
      setMessage({ text: "Passwords do not match.", type: "error" }); return;
    }
    setLoading(true);
    try {
      await axiosInstance.post("/api/password/change/", {
        old_password: formData.old_password,
        new_password: formData.new_password,
      });
      setMessage({ text: "Password changed successfully", type: "success" });
    } catch {
      setMessage({ text: "Password change failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;
    if (!formData.delete_password) {
      setMessage({ text: "Please enter your password to delete account.", type: "error" }); return;
    }
    try {
      await axiosInstance.delete("/api/profile/delete/", { data: { password: formData.delete_password } });
      dispatch(logout());
    } catch {
      setMessage({ text: "Account deletion failed", type: "error" });
    }
  };

  return (
    <div className="bg-slate-950 px-6 py-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-black text-white mb-8">Settings</h2>

      {message && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={`mb-6 px-4 py-3 rounded-xl border text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="space-y-5">
        {/* Profile */}
        <motion.div
          className="bg-slate-900 border border-white/5 rounded-2xl p-6"
          variants={fadeIn} initial="hidden" animate="visible" custom={1}
        >
          <div className="flex items-center gap-2 mb-5">
            <User size={16} className="text-red-400" />
            <h3 className="text-sm font-semibold text-white">Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">First Name</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className={inputCls} placeholder="Jane" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Last Name</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className={inputCls} placeholder="Doe" />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleUpdate} disabled={loading}
              className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Profile"}
            </motion.button>
          </div>
        </motion.div>

        {/* Password */}
        <motion.div
          className="bg-slate-900 border border-white/5 rounded-2xl p-6"
          variants={fadeIn} initial="hidden" animate="visible" custom={2}
        >
          <div className="flex items-center gap-2 mb-5">
            <Lock size={16} className="text-red-400" />
            <h3 className="text-sm font-semibold text-white">Change Password</h3>
          </div>
          <div className="space-y-4">
            <input type="password" name="old_password" placeholder="Current password" value={formData.old_password} onChange={handleChange} className={inputCls} />
            <input type="password" name="new_password" placeholder="New password" value={formData.new_password} onChange={handleChange} className={inputCls} />
            <input type="password" name="confirm_password" placeholder="Confirm new password" value={formData.confirm_password} onChange={handleChange} className={inputCls} />
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handlePasswordChange} disabled={loading}
              className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors disabled:opacity-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </motion.button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          className="bg-red-950/20 border border-red-500/15 rounded-2xl p-6"
          variants={fadeIn} initial="hidden" animate="visible" custom={3}
        >
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle size={16} className="text-red-400" />
            <h3 className="text-sm font-semibold text-red-400">Danger Zone</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">Deleting your account is permanent and cannot be undone.</p>
          <input
            type="password" name="delete_password" placeholder="Enter password to confirm"
            value={formData.delete_password} onChange={handleChange}
            className={`${inputCls} mb-4`}
          />
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleDeleteAccount}
            className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors"
          >
            Delete Account
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
