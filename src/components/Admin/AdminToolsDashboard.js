import React from "react";
import { FileText, Compass, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/user/Sidebar";

const tools = [
  {
    title: "Manage Users",
    description: "View and manage all registered users.",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    path: "/admin/manage-users",
  },
  {
    title: "Career Paths",
    description: "View and edit available career paths.",
    icon: <Compass className="w-6 h-6 text-green-600" />,
    path: "/careerpath",
  },
  {
    title: "Generate CV",
    description: "Access CV generator tool.",
    icon: <FileText className="w-6 h-6 text-purple-600" />,
    path: "/make",
  },
  {
    title: "Admin Settings",
    description: "Configure admin settings and options.",
    icon: <Settings className="w-6 h-6 text-red-600" />,
    path: "/settings",
  },
];

const AdminToolsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            onClick={() => navigate(tool.path)}
            className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-gray-100 p-2 rounded-full">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{tool.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminToolsDashboard;
