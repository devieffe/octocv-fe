import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Search } from "lucide-react";

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
        setUsers([]);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [search, ordering, page]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 space-y-6 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-[#e91919] mb-12 select-none drop-shadow-sm">
          Admin Dashboard
        </h1>

        {/* Controls */}
        <section className="flex flex-wrap items-center gap-4 mb-3 max-w-lg">
          <div className="relative flex-grow min-w-[220px] max-w-sm">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e91919]/60 pointer-events-none"
              size={20}
              aria-hidden="true"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search by name or email..."
              className="w-full rounded-3xl border border-[#e91919]/30 bg-white pl-12 pr-5 py-3 text-[#e91919] placeholder-[#e91919]/40 focus:outline-none focus:ring-2 focus:ring-[#e91919] transition-shadow shadow-sm" aria-label="Search users by name or email"
            />
          </div>

          <select
            value={ordering}
            onChange={(e) => {
              setPage(1);
              setOrdering(e.target.value);
            }}
            className="rounded-3xl border border-[#e91919]/30 bg-white px-6 py-3 text-[#e91919]
                       focus:outline-none focus:ring-2 focus:ring-[#e91919] transition-shadow shadow-sm"
            aria-label="Sort users"
          >
            <option value="full_name">Name (A-Z)</option>
            <option value="-full_name">Name (Z-A)</option>
            <option value="email">Email (A-Z)</option>
            <option value="-email">Email (Z-A)</option>
            <option value="date_joined">Date Joined (Oldest)</option>
            <option value="-date_joined">Date Joined (Newest)</option>
          </select>
        </section>

        {/* Loading */}
        {loading ? (
          <section className="grid gap-6">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse rounded-3xl bg-white p-6 shadow-md flex justify-between items-center"
              >
                <div className="space-y-3 w-full max-w-xl">
                  <div className="h-6 bg-[#e91919]/20 rounded-full w-1/3"></div>
                  <div className="h-4 bg-[#e91919]/10 rounded-full w-1/2"></div>
                  <div className="h-4 bg-[#e91919]/10 rounded-full w-1/4"></div>
                </div>
                <div className="h-10 bg-[#e91919]/20 rounded-2xl w-28"></div>
              </div>
            ))}
          </section>
        ) : noResults ? (
          <p className="text-center text-[#e91919]/50 mt-16 select-none text-lg">
            No users found.
          </p>
        ) : (
          <section className="grid gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-3xl p-6 shadow-md flex justify-between items-center
                           transition-shadow hover:shadow-xl cursor-pointer"
                onClick={() => navigate(`/admin/user/${user.id}`)}
              >
                <div className="max-w-[70%] min-w-0">
                  <h3 className="font-semibold text-[#e91919] text-xl mb-1 truncate">
                    <Link
                      to={`/admin/user/${user.id}`}
                      className="hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {user.full_name}
                    </Link>
                  </h3>
                  <p className="text-[#e91919]/70 text-sm truncate">{user.email}</p>
                  <p className="text-[#e91919]/50 text-xs mt-2 select-none">
                    Joined: {new Date(user.date_joined).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/user/${user.id}`);
                  }}
                  className="bg-[#e91919] hover:bg-[#c21515] text-white rounded-3xl px-6 py-2 transition-shadow shadow-md whitespace-nowrap"
                  aria-label={`More info about ${user.full_name}`}
                >
                  More Info
                </button>
              </div>
            ))}
          </section>
        )}

        {/* Pagination */}
        {!loading && !noResults && (
          <nav
            className="flex justify-center items-center gap-6 mt-12 max-w-sm mx-auto select-none"
            aria-label="Pagination Navigation"
          >
            <button
              onClick={() => previous && setPage(page - 1)}
              disabled={!previous}
              className="px-6 py-2 rounded-full bg-[#e91919]/20 text-[#e91919] font-semibold disabled:opacity-50
                         transition-colors hover:bg-[#e91919]/30 focus:outline-none focus:ring-2 focus:ring-[#e91919]"
              aria-disabled={!previous}
            >
              Previous
            </button>
            <span className="text-[#e91919] font-semibold">Page {page}</span>
            <button
              onClick={() => next && setPage(page + 1)}
              disabled={!next}
              className="px-6 py-2 rounded-full bg-[#e91919]/20 text-[#e91919] font-semibold disabled:opacity-50
                         transition-colors hover:bg-[#e91919]/30 focus:outline-none focus:ring-2 focus:ring-[#e91919]"
              aria-disabled={!next}
            >
              Next
            </button>
          </nav>
        )}
      </main>
    </div>
  );
}
