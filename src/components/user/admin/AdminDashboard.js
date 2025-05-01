import React from "react";
import { Link } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "Full Name",
    email: "name@email.com",
    date: "10.10.2025",
    quiz: "OK",
    cvType: "Full-stack",
  },
  {
    id: 2,
    name: "Full Name",
    email: "name@email.com",
    date: "10.10.2025",
    quiz: "-",
    cvType: "-",
  },
  {
    id: 3,
    name: "Full Name",
    email: "name@email.com",
    date: "10.10.2025",
    quiz: "OK",
    cvType: "Data",
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-blue-950 text-center">Admin Dashboard</h2>
        <p className="text-center text-gray-600">Welcome, Admin!</p>

        <div className="overflow-x-auto mt-8">
          <table className="min-w-full table-auto border border-gray-200 shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700 text-sm font-semibold">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Quiz</th>
                <th className="px-4 py-2">CV Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className="text-sm text-gray-700">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                    <div className="text-gray-400 text-xs italic">- {user.date} -</div>
                  </td>
                  <td className="px-4 py-3">{user.quiz}</td>
                  <td className="px-4 py-3">{user.cvType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-6">
          <Link to="/logout" className="text-red-600 hover:underline hover:text-red-700 text-sm">
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
