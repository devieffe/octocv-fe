import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { LogOut, FileText, Compass, Settings, User } from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <aside className="w-64 border-r border-gray-200 flex flex-col justify-between py-6 px-4">
      <div className="space-y-6">
        <nav className="space-y-4">
         <Link
            to="/user"
            className="flex items-center text-gray-800 hover:text-[#e91919] transition"
          >
            <User className="w-5 h-5 mr-3" />
            Profile
          </Link>
          <Link
            to="/make"
            className="flex items-center text-gray-800 hover:text-[#e91919] transition"
          >
            <FileText className="w-5 h-5 mr-3" />
            Generate CV
          </Link>
          <Link
            to="/career-path"
            className="flex items-center text-gray-800 hover:text-[#e91919] transition"
          >
            <Compass className="w-5 h-5 mr-3" />
            Career Path
          </Link>
          <Link
            to="/settings"
            className="flex items-center text-gray-800 hover:text-[#e91919] transition"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center text-sm text-gray-600 hover:text-[#e91919] transition"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;
