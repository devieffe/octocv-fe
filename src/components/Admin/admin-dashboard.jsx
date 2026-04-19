import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

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
        const params = new URLSearchParams({ search, ordering, page });
        const response = await axiosInstance.get(`/api/admin/users/?${params}`);
        setUsers(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setNoResults(response.data.results.length === 0);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]); setNoResults(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [search, ordering, page]);

  return (
    <div className="bg-slate-950 px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black text-white mb-8">Admin Dashboard</h1>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-grow min-w-[220px] max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" aria-hidden="true" />
          <input
            type="text" value={search}
            onChange={(e) => { setPage(1); setSearch(e.target.value); }}
            placeholder="Search by name or email..."
            className="w-full bg-slate-800/50 border border-white/10 text-white placeholder-gray-600 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-500/40 transition"
            aria-label="Search users"
          />
        </div>
        <select
          value={ordering}
          onChange={(e) => { setPage(1); setOrdering(e.target.value); }}
          className="bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500/40 transition"
          aria-label="Sort users"
        >
          <option value="full_name">Name A–Z</option>
          <option value="-full_name">Name Z–A</option>
          <option value="email">Email A–Z</option>
          <option value="-email">Email Z–A</option>
          <option value="date_joined">Oldest first</option>
          <option value="-date_joined">Newest first</option>
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="animate-pulse bg-slate-900 border border-white/5 rounded-2xl p-5 flex justify-between items-center">
              <div className="space-y-2 w-full max-w-xs">
                <div className="h-4 bg-white/10 rounded-full w-1/3"></div>
                <div className="h-3 bg-white/5 rounded-full w-1/2"></div>
              </div>
              <div className="h-8 bg-white/10 rounded-xl w-24"></div>
            </div>
          ))}
        </div>
      ) : noResults ? (
        <p className="text-center text-gray-600 mt-16 text-sm">No users found.</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-slate-900 border border-white/5 hover:border-white/10 rounded-2xl p-5 flex justify-between items-center transition cursor-pointer"
              onClick={() => navigate(`/admin/user/${user.id}`)}
            >
              <div className="min-w-0 flex-1">
                <Link
                  to={`/admin/user/${user.id}`}
                  className="text-sm font-semibold text-white hover:text-red-400 transition truncate block"
                  onClick={(e) => e.stopPropagation()}
                >
                  {user.full_name}
                </Link>
                <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                <p className="text-xs text-gray-600 mt-1">Joined {new Date(user.date_joined).toLocaleDateString()}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/admin/user/${user.id}`); }}
                className="ml-4 shrink-0 bg-red-600/15 hover:bg-red-600/25 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl px-4 py-2 transition"
                aria-label={`View ${user.full_name}`}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !noResults && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => previous && setPage(page - 1)} disabled={!previous}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-30 transition"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span className="text-sm text-gray-400 px-4 py-1.5 bg-slate-900 border border-white/5 rounded-lg">Page {page}</span>
          <button
            onClick={() => next && setPage(page + 1)} disabled={!next}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-30 transition"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
