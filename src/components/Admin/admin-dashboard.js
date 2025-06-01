import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../../utils/mockApi";
import Sidebar from "../../components/user/Sidebar";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    mockApi.getUsers().then(setUsers);
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-[#e91919] mb-6">Admin Panel</h1>
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-[#e91919] text-lg">{user.username}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={() => navigate(`/admin/user/${user.id}`)}
                className="text-white bg-[#e91919] px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                More Info
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
