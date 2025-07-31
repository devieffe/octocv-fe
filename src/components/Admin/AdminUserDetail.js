import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, ArrowLeft } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

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

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center bg-[#fefefe] p-8">
        <p className="animate-pulse text-[#e91919] font-semibold text-lg select-none">
          Loading user details...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen justify-center items-center bg-[#fefefe] p-8">
        <p className="text-[#e91919] font-semibold text-lg select-none">User not found.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen ">
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center text-[#e91919] hover:text-[#c21515] transition select-none font-semibold mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={`${user.full_name} avatar`}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#e91919]"
              />
            ) : (
              <UserCircle className="w-28 h-28 text-[#e91919] opacity-80" />
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-[#e91919] truncate">{user.full_name}</h1>
            <p className="text-[#e91919]/90 text-base mt-1 italic truncate">{user.occupation || "No occupation listed"}</p>
            <p className="text-[#e91919]/70 mt-2 truncate">{user.address || "No address provided"}</p>

            <p className="mt-4 text-[#e91919]/90">
              <strong className="font-semibold">Email:</strong>{" "}
              <a
                href={`mailto:${user.email}`}
                className="underline hover:text-[#c21515] transition"
              >
                {user.email}
              </a>
            </p>

            {user.LinkedIn && (
              <p className="mt-2 text-[#e91919]/90">
                <strong className="font-semibold">LinkedIn:</strong>{" "}
                <a
                  href={user.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#c21515] transition"
                >
                  View Profile
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Personal Info */}
          <section className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#e91919] mb-4 select-none border-b border-[#e91919]/30 pb-2">
              Personal Info
            </h2>
            <ul className="space-y-3 text-[#e91919]/90 text-sm leading-relaxed">
              <li>
                <span className="font-semibold">Full Name:</span> {user.full_name}
              </li>
              <li>
                <span className="font-semibold">Joined:</span>{" "}
                {new Date(user.date_joined).toLocaleDateString()}
              </li>
              <li>
                <span className="font-semibold">Languages:</span> {user.spoken_languages || "N/A"}
              </li>
            </ul>
          </section>

          {/* Test Grades */}
          <section className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#e91919] mb-4 select-none border-b border-[#e91919]/30 pb-2">
              Test Grades
            </h2>
            <ul className="space-y-3 text-[#e91919]/90 text-sm leading-relaxed">
              <li>
                <span className="font-semibold">Motivation:</span> {user.motivation_grade}
              </li>
              <li>
                <span className="font-semibold">Computer Literacy:</span> {user.computer_literacy_grade}
              </li>
              <li>
                <span className="font-semibold">Problem Solving:</span> {user.problem_solving_grade}
              </li>
            </ul>
          </section>

          {/* Career Objective */}
          <section className="bg-white rounded-3xl shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-[#e91919] mb-4 select-none border-b border-[#e91919]/30 pb-2">
              Career Objective
            </h2>
            <p className="text-[#e91919]/90 text-sm leading-relaxed">
              {user.profile_or_career_objective || "No career objective provided."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
