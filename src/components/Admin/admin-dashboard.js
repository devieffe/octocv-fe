import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "../../components/user/Sidebar";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("date_joined");
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          search,
          ordering,
          page,
        });
        const response = await axiosInstance.get(`/api/admin/users/?${params}`);
        setUsers(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setNoResults(response.data.results.length === 0);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [search, ordering, page]);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-[#e91919] mb-6">Admin Dahsboard</h1>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1); // reset page when searching
              setSearch(e.target.value);
            }}
            placeholder="Search by name or email..."
            className="border p-2 rounded w-full max-w-sm"
          />
          <select
            value={ordering}
            onChange={(e) => {
              setPage(1); // reset page when ordering
              setOrdering(e.target.value);
            }}
            className="border p-2 rounded"
          >
            <option value="full_name">Name (A-Z)</option>
            <option value="-full_name">Name (Z-A)</option>
            <option value="email">Email (A-Z)</option>
            <option value="-email">Email (Z-A)</option>
            <option value="date_joined">Date Joined (Oldest)</option>
            <option value="-date_joined">Date Joined (Newest)</option>
          </select>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-4">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-white border border-gray-200 rounded-xl p-4 shadow-md flex justify-between items-center"
              >
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : noResults ? (
          <p className="text-gray-500 text-center mt-10">No users found.</p>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-[#e91919] text-lg">
                    <Link to={`/users/${user.id}`}>{user.full_name}</Link>
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Joined: {user.date_joined}</p>
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
        )}

        {/* Pagination */}
        {!loading && !noResults && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => previous && setPage(page - 1)}
              disabled={!previous}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">Page {page}</span>
            <button
              onClick={() => next && setPage(page + 1)}
              disabled={!next}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
