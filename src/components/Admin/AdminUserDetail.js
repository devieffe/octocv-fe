import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockApi } from "../../utils/mockApi";
import Sidebar from "../../components/user/Sidebar";

export default function AdminUserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [latestCV, setLatestCV] = useState(null);

  useEffect(() => {
    mockApi.getUserById(id).then(setUser);
    mockApi.getUserQuestionnaires(id).then(setQuestionnaires);
    mockApi.getUserLatestCV(id).then(setLatestCV);
  }, [id]);

  if (!user) return <p className="p-6">Loading user data...</p>;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-[#e91919]">User Detail</h1>

        {/* Personal Info */}
        <section className="bg-white border rounded-xl p-6 shadow space-y-2">
          <h2 className="text-xl font-semibold text-[#e91919]">Personal Info</h2>
          <div className="text-gray-700">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </section>

        {/* Questionnaire Results */}
        <section className="bg-white border rounded-xl p-6 shadow space-y-2">
          <h2 className="text-xl font-semibold text-[#e91919]">Questionnaire Results</h2>
          {questionnaires.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {questionnaires.map((q, index) => (
                <li key={index}>
                  <strong>{q.title}</strong>: {q.resultSummary}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No questionnaires submitted.</p>
          )}
        </section>

        {/* Latest CV */}
        <section className="bg-white border rounded-xl p-6 shadow space-y-2">
          <h2 className="text-xl font-semibold text-[#e91919]">Latest CV</h2>
          {latestCV ? (
            <div className="text-gray-700 space-y-1">
              <p><strong>Career Path:</strong> {latestCV.careerPath}</p>
              <p><strong>Uploaded:</strong> {new Date(latestCV.createdAt).toLocaleString()}</p>
              <a
                href={latestCV.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white bg-[#e91919] px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Download CV
              </a>
            </div>
          ) : (
            <p className="text-gray-500">No CV uploaded yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
