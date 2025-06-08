import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "../../components/user/Sidebar";
import { ArrowLeft } from "lucide-react";

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/users/${id}/`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!user) return <p className="p-6">Loading user data...</p>;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center text-sm text-gray-600 hover:text-[#e91919] transition mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-[#e91919]">User Detail</h1>

        <section className="bg-white border rounded-xl p-6 shadow space-y-2">
          <h2 className="text-xl font-semibold text-[#e91919]">Personal Info</h2>
          <div className="text-gray-700 space-y-1">
            <p><strong>Full Name:</strong> {user.full_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>
            {user.LinkedIn && (
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={user.LinkedIn}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </p>
            )}
          </div>
        </section>

        <section className="bg-white border rounded-xl p-6 shadow space-y-2">
          <h2 className="text-xl font-semibold text-[#e91919]">Test Grades</h2>
          <div className="text-gray-700 space-y-1">
            <p><strong>Motivation:</strong> {user.motivation_grade}</p>
            <p><strong>Computer Literacy:</strong> {user.computer_literacy_grade}</p>
            <p><strong>Problem Solving:</strong> {user.problem_solving_grade}</p>
          </div>
        </section>

        <section className="bg-white border rounded-xl p-6 shadow space-y-2">
          <h2 className="text-xl font-semibold text-[#e91919]">Profile</h2>
          <div className="text-gray-700 space-y-1">
            <p><strong>Occupation:</strong> {user.occupation}</p>
            <p><strong>Languages:</strong> {user.spoken_languages}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Career Objective:</strong> {user.profile_or_career_objective}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
