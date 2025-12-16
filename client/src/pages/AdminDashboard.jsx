import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // For edit
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publicationYear: "",
    summary: "",
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
      navigate("/");
    }
  };

  // Fetch books from API
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/books`,
        {
          withCredentials: true,
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: debouncedSearchQuery,
          },
        }
      );
      setBooks(response.data.data);
      setTotalBooks(response.data.pagination.total);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage, debouncedSearchQuery]);

  const openDeleteModal = (id) => {
    setBookToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/books/${bookToDelete}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Book deleted successfully");
      fetchBooks();
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };

  const openAddModal = () => {
    setCurrentBook(null);
    setFormData({
      title: "",
      author: "",
      publicationYear: "",
      summary: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setCurrentBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear,
      summary: book.summary,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (currentBook) {
        // Update
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/books/${currentBook._id}`, // Assuming _id from MongoDB
          formData,
          { withCredentials: true }
        );
        toast.success("Book updated successfully");
      } else {
        // Create
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/books`,
          formData,
          {
            withCredentials: true,
          }
        );
        toast.success("Book created successfully");
      }
      fetchBooks();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error(error.response?.data?.message || "Error saving book");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-hidden flex h-screen w-full flex-row">
      {/* Side Navigation */}
      <aside className="flex h-full w-20 lg:w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 z-20">
        <div className="flex h-16 items-center justify-center lg:justify-start lg:px-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-black font-bold text-xl">
              BM
            </div>
            <div className="hidden lg:flex flex-col">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-none">
                BookManager
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
                Admin Console
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-2 px-3">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/20 text-slate-900 dark:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-slate-900 dark:text-primary">
              book
            </span>
            <span className="hidden lg:block text-sm font-bold">Inventory</span>
          </a>
        </nav>
        <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group cursor-pointer"
          >
            <span className="material-symbols-outlined text-red-500 group-hover:text-red-700 transition-colors">
              logout
            </span>
            <span className="hidden lg:block text-sm font-medium">Logout</span>
          </button>
          <div className="mt-4 flex items-center gap-3 px-3 pt-2">
            <div
              className="size-8 rounded-full bg-cover bg-center ring-2 ring-slate-100 dark:ring-slate-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDCoq7ZCh8YBRfA7kOyJWlPsY6w8O5q3lkga82jRN6y9_EpeL1DkdC2qiPhFTo2tr-XXwogcQmUVIcwOBKqIudvmLhahCth57xkCi_sel46jvo1VjVIbtnyLpslC6iAHL8iVTuJWi-dpEgfpCB6y1mBUTV9AAwb0-a8wHtate8lczLBnO4w-pnkmJs-c9PrHXR_rc7GTOJvbnf3WiHFSOr9kAn1aBqfLtVoq8lSA9zHUVe7bVdn05dZIFHf9zHGg_YoSozpp44xEY')",
              }}
            ></div>
            <div className="hidden lg:flex flex-col">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {user?.firstname} {user?.lastname}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-background-dark">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-10 sticky top-0 w-full">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Inventory Management
          </h2>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                  search
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-64 rounded-full border-0 py-2 pl-10 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-slate-50 dark:bg-slate-800 dark:ring-slate-700 dark:text-white shadow-sm"
                placeholder="Search books, authors..."
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 scroll-smooth">
          {/* Page Heading & Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Book Inventory
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Manage your library collection and track book status.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="cursor-pointer group flex items-center gap-2 bg-primary hover:bg-primary-hover text-black px-5 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add New Book</span>
            </button>
          </div>

          {/* Book List Table */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-bold text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Book Title</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Year</th>
                    <th className="px-6 py-4">Created By</th>
                    <th className="px-6 py-4">Summary</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : books.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center">
                        No books found.
                      </td>
                    </tr>
                  ) : (
                    books.map((book) => (
                      <tr
                        key={book._id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                          {book.title}
                        </td>
                        <td className="px-6 py-4">{book.author}</td>
                        <td className="px-6 py-4 font-mono text-xs">
                          {book.publicationYear}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          {book.createdBy?.firstname
                            ? `${book.createdBy.firstname} ${book.createdBy.lastname}`
                            : "Unknown"}
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate">
                          {book.summary}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(book)}
                              className="cursor-pointer p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                edit
                              </span>
                            </button>
                            <button
                              onClick={() => openDeleteModal(book._id)}
                              className="cursor-pointer p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {totalBooks > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                {Math.min(currentPage * itemsPerPage, totalBooks)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {totalBooks}
              </span>{" "}
              results
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1 || loading}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="cursor-pointer px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages || loading}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="cursor-pointer px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal (Simplified) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentBook ? "Edit Book" : "Add New Book"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Form fields */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Publication Year
                </label>
                <input
                  type="number"
                  name="publicationYear"
                  value={formData.publicationYear}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Summary
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="cursor-pointer px-4 py-2 text-sm font-bold text-black bg-primary hover:bg-primary-hover rounded-lg transition-colors"
              >
                Save Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 opacity-100">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <span className="material-symbols-outlined text-red-600 dark:text-red-500 text-2xl">
                  warning
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Delete Book
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Are you sure you want to delete this book? This action cannot be
                undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="cursor-pointer px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-lg shadow-red-600/20"
                >
                  Delete Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
