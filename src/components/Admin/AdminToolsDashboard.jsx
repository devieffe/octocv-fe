import React from "react";
import { FileText, Compass, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    title: "Manage Users",
    description: "View and manage all registered users.",
    icon: Users,
    path: "/admin",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Career Paths",
    description: "View and edit available career paths.",
    icon: Compass,
    path: "/careerpath",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    title: "CV Generator",
    description: "Access the CV generator tool.",
    icon: FileText,
    path: "/make",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Admin Settings",
    description: "Configure admin settings and options.",
    icon: Settings,
    path: "/settings",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
];

const AdminToolsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 px-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black text-white mb-8">Admin Tools</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.title}
              onClick={() => navigate(tool.path)}
              className="bg-slate-900 border border-white/5 hover:border-white/10 rounded-2xl p-6 cursor-pointer transition group"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${tool.bg}`}>
                <Icon size={18} className={tool.color} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-red-400 transition">{tool.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{tool.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminToolsDashboard;
