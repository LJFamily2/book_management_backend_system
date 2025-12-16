import React, { useState } from "react";

const AdminDashboard = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      status: "Available",
      copies: 5,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0446310789",
      status: "Borrowed",
      copies: 2,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      status: "Available",
      copies: 8,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // For edit

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const openAddModal = () => {
    setCurrentBook(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setCurrentBook(book);
    setIsModalOpen(true);
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
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              dashboard
            </span>
            <span className="hidden lg:block text-sm font-medium">
              Dashboard
            </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/20 text-slate-900 dark:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-slate-900 dark:text-primary">
              book
            </span>
            <span className="hidden lg:block text-sm font-bold">Inventory</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              group
            </span>
            <span className="hidden lg:block text-sm font-medium">Users</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              analytics
            </span>
            <span className="hidden lg:block text-sm font-medium">Reports</span>
          </a>
        </nav>
        <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              settings
            </span>
            <span className="hidden lg:block text-sm font-medium">
              Settings
            </span>
          </a>
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
                Jane Doe
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Admin
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
                className="block w-64 rounded-full border-0 py-2 pl-10 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-slate-50 dark:bg-slate-800 dark:ring-slate-700 dark:text-white shadow-sm"
                placeholder="Search books, authors..."
              />
            </div>
            <button className="cursor-pointer relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
            </button>
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

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Total Books
                </span>
                <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">
                    library_books
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {books.length}
                </span>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                  +5%
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  New This Month
                </span>
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                  <span className="material-symbols-outlined text-[18px]">
                    new_releases
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  32
                </span>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                  +12%
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Checked Out
                </span>
                <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">
                    outbox
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  85
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">
                  -2%
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Overdue
                </span>
                <div className="size-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">
                    warning
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  12
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">
                  +4%
                </span>
              </div>
            </div>
          </div>

          {/* Book List Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-bold text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Book Title</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">ISBN</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Copies</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {books.map((book) => (
                    <tr
                      key={book.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {book.title}
                      </td>
                      <td className="px-6 py-4">{book.author}</td>
                      <td className="px-6 py-4 font-mono text-xs">
                        {book.isbn}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            book.status === "Available"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {book.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{book.copies}</td>
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
                            onClick={() => handleDelete(book.id)}
                            className="cursor-pointer p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              {/* Form fields would go here */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Book Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                  defaultValue={currentBook?.title}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Author
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                  defaultValue={currentBook?.author}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  ISBN
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                  defaultValue={currentBook?.isbn}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Status
                  </label>
                  <select
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                    defaultValue={currentBook?.status || "Available"}
                  >
                    <option>Available</option>
                    <option>Borrowed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Copies
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                    defaultValue={currentBook?.copies || 1}
                  />
                </div>
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
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer px-4 py-2 text-sm font-bold text-black bg-primary hover:bg-primary-hover rounded-lg transition-colors"
              >
                Save Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
