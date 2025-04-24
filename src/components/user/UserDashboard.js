import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-blue-950 text-center">User Dashboard</h2>
        <p className="text-center text-gray-700">Welcome, <span className="font-semibold">USER-FIRST-NAME</span></p>

        <div className="bg-gray-100 rounded-lg p-4 shadow space-y-4">
          <div className="space-y-2">
            <p><span className="font-medium">Username:</span> user123 <span className="text-sm text-gray-500 italic">editable?</span></p>
            <p><span className="font-medium">Email:</span> user@example.com <span className="text-sm text-gray-500 italic">editable?</span></p>
            <p>
              <span className="font-medium">CV Type:</span>{" "}
              <Link to="/download-cv" className="text-red-600 underline hover:text-red-700 transition">
                Download
              </Link>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <Link to="/logout" className="hover:text-red-600 transition">Log out</Link>
          <Link to="/delete-account" className="hover:text-red-600 transition">Delete account</Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
