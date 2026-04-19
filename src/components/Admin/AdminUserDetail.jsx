import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, ArrowLeft, Loader } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <p className="text-sm text-gray-300">{value || "—"}</p>
  </div>
);

export default function AdminUserDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const userId = window.location.pathname.split("/").pop();
        const response = await axiosInstance.get(`/api/admin/users/${userId}/`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-400">
        <Loader size={20} className="animate-spin" />
        <span className="text-sm">Loading user...</span>
      </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <p className="text-gray-400 text-sm">User not found.</p>
    </div>
  );

  return (
    <div className="bg-slate-950 px-6 py-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-8"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Profile Header */}
      <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <div className="shrink-0">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt={user.full_name}
              className="w-20 h-20 rounded-full object-cover border-2 border-red-500/30" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-red-600/15 border border-red-500/25 flex items-center justify-center">
              <span className="text-2xl font-black text-red-400">{user.full_name?.[0]?.toUpperCase()}</span>
            </div>
          )}
        </div>
        <div className="text-center sm:text-left flex-1 min-w-0">
          <h1 className="text-xl font-black text-white truncate">{user.full_name}</h1>
          {user.occupation && <p className="text-sm text-gray-400 mt-0.5">{user.occupation}</p>}
          {user.email && (
            <a href={`mailto:${user.email}`} className="text-sm text-red-400 hover:text-red-300 transition mt-1 block">
              {user.email}
            </a>
          )}
          {user.LinkedIn && (
            <a href={user.LinkedIn} target="_blank" rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-300 transition mt-1 block">
              LinkedIn Profile ↗
            </a>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Personal Info</h2>
          <div className="space-y-4">
            <Field label="Full Name" value={user.full_name} />
            <Field label="Address" value={user.address} />
            <Field label="Languages" value={user.spoken_languages} />
            <Field label="Date Joined" value={new Date(user.date_joined).toLocaleDateString()} />
          </div>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Test Grades</h2>
          <div className="space-y-4">
            <Field label="Motivation" value={user.motivation_grade} />
            <Field label="Computer Literacy" value={user.computer_literacy_grade} />
            <Field label="Problem Solving" value={user.problem_solving_grade} />
          </div>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 md:col-span-2">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Career Objective</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            {user.profile_or_career_objective || "No career objective provided."}
          </p>
        </div>
      </div>
    </div>
  );
}
