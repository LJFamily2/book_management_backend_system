import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [user, setUser] = useState(null);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sort = searchParams.get("sort") || "newest"; // 'newest' or 'oldest'

  // Data state
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const search = searchParams.get("search") || "";

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/books`,
          {
            withCredentials: true,
            params: {
              page,
              limit,
              sort,
              search,
            },
          }
        );
        setBooks(response.data.data);
        setTotalPages(response.data.pagination.pages);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, limit, sort, search]);

  // Handlers
  const handleSortChange = (newSort) => {
    setSearchParams({ page: "1", limit, sort: newSort, search });
    setIsFilterOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search");
    setSearchParams({ page: "1", limit, sort, search: query });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString(), limit, sort, search });
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      navigate("/");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#1c1c0d] dark:text-gray-100 min-h-screen flex flex-col font-display transition-colors duration-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass-card border-b border-[#f4f4e6] dark:border-white/10 px-6 py-4 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#1c1c0d] dark:text-white">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-black">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Book Management
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* User Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzuvWrEmyiAmgF4SlxMNY8J9TyJigQy5uEX61nCkxNLkNBqcNlHds4PX3npVYv7nGCaTjwTGM2Y1eOeyjXgpM1covlcz1Ks1n6p7l_A2V_mIPVHfOUKBQu8CjwF3f2CBZ-K8wVl5JDEwmqEUrtXjethK2UhE-_CQrLS18ovbxHpy_hsdPI2wKqpcCtWsqps7orT2rR5bknIEXUziqfe9RZfw7RCGx8_lx0bzjc-UcR6nDNK-knqcpz7d137K81nxSnlBVhySBiVak")',
                }}
              ></button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#23220f] rounded-sm shadow-lg border border-gray-100 dark:border-white/10 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                    <p className="text-sm font-bold text-[#1c1c0d] dark:text-white">
                      {user?.firstname} {user?.lastname}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      logout
                    </span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Welcome Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1c1c0d] dark:text-white">
              Discover your next <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
                favorite book.
              </span>
            </h1>
            <p className="text-[#6b6b47] dark:text-gray-400 text-lg">
              Explore thousands of titles from our library collection.
            </p>
          </div>
        </section>

        {/* Search and Filters Section */}
        <section className="flex flex-col gap-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">
                search
              </span>
            </div>
            <input
              type="text"
              name="search"
              defaultValue={search}
              className="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white dark:bg-white/5 text-[#1c1c0d] dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-black/20 shadow-soft transition-all text-base font-medium"
              placeholder="Search by title, author, or ISBN..."
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button
                type="submit"
                className="cursor-pointer bg-primary hover:bg-[#e6e205] text-black font-bold py-2 px-4 rounded-lg text-sm transition-colors shadow-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mr-2">
              Browse:
            </span>
            <button className="cursor-pointer px-5 py-2 rounded-full bg-primary text-black text-sm font-bold shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-[#f8f8f5] dark:ring-offset-[#23220f]">
              All Books
            </button>

            <div className="ml-auto relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="cursor-pointer flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  tune
                </span>
                Filters
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#23220f] rounded-sm shadow-lg border border-gray-100 dark:border-white/10 py-1 z-20">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-white/10">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                      Sort By
                    </p>
                  </div>
                  <button
                    onClick={() => handleSortChange("newest")}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      sort === "newest"
                        ? "bg-primary/10 text-primary-dark font-bold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    Newest to Oldest
                  </button>
                  <button
                    onClick={() => handleSortChange("oldest")}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      sort === "oldest"
                        ? "bg-primary/10 text-primary-dark font-bold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    Oldest to Newest
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {books.length > 0 ? (
              books.map((book) => (
                <article
                  key={book._id}
                  className="group relative flex flex-col bg-white dark:bg-[#23220f] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-white/5"
                >
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[#1c1c0d] dark:text-white leading-tight line-clamp-1 group-hover:text-primary-dark transition-colors">
                        {book.title}
                      </h3>
                      <span className="shrink-0 text-xs font-bold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                        {book.publicationYear}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      {book.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {book.summary}
                    </p>
                    <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/10 flex gap-3">
                      <Link
                        to={`/student/book/${book._id}`}
                        className="cursor-pointer flex-1 bg-primary hover:bg-[#e6e205] text-black text-sm font-bold py-2.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          visibility
                        </span>
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No books found.
              </div>
            )}
          </section>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-4 pb-12">
          <button
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 rounded-lg bg-white dark:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/20 transition-colors text-sm font-bold"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 rounded-lg bg-white dark:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/20 transition-colors text-sm font-bold"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
