import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publicationYear: 1925,
      summary:
        "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publicationYear: 1960,
      summary:
        "To Kill a Mockingbird is a novel by the American author Harper Lee.",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      publicationYear: 1949,
      summary:
        "1984 is a dystopian social science fiction novel and cautionary tale by English writer George Orwell.",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      publicationYear: 1813,
      summary:
        "Pride and Prejudice is an 1813 romantic novel of manners written by Jane Austen.",
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publicationYear: 1951,
      summary:
        "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.",
    },
    {
      id: 6,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publicationYear: 1937,
      summary:
        "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien.",
    },
    {
      id: 7,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      publicationYear: 1953,
      summary:
        "Fahrenheit 451 is a 1953 dystopian novel by American writer Ray Bradbury.",
    },
    {
      id: 8,
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      publicationYear: 1847,
      summary:
        "Jane Eyre is a novel by English writer Charlotte Brontë, published under the pen name Currer Bell.",
    },
    {
      id: 9,
      title: "Animal Farm",
      author: "George Orwell",
      publicationYear: 1945,
      summary:
        "Animal Farm is a beast fable, in the form of a satirical allegorical novella, by George Orwell.",
    },
    {
      id: 10,
      title: "Wuthering Heights",
      author: "Emily Brontë",
      publicationYear: 1847,
      summary:
        "Wuthering Heights is an 1847 novel by Emily Brontë, initially published under the pseudonym Ellis Bell.",
    },
    {
      id: 11,
      title: "Brave New World",
      author: "Aldous Huxley",
      publicationYear: 1932,
      summary:
        "Brave New World is a dystopian novel by English author Aldous Huxley, written in 1931 and published in 1932.",
    },
    {
      id: 12,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      publicationYear: 1954,
      summary:
        "The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien.",
    },
    {
      id: 13,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      publicationYear: 1997,
      summary:
        "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling.",
    },
    {
      id: 14,
      title: "The Alchemist",
      author: "Paulo Coelho",
      publicationYear: 1988,
      summary:
        "The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988.",
    },
    {
      id: 15,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      publicationYear: 2003,
      summary:
        "The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // For edit
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const openDeleteModal = (id) => {
    setBookToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setBooks(books.filter((book) => book.id !== bookToDelete));
    setIsDeleteModalOpen(false);
    setBookToDelete(null);
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
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/20 text-slate-900 dark:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-slate-900 dark:text-primary">
              book
            </span>
            <span className="hidden lg:block text-sm font-bold">Inventory</span>
          </a>
        </nav>
        <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group cursor-pointer">
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
                    <th className="px-6 py-4">Summary</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {currentItems.map((book) => (
                    <tr
                      key={book.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {book.title}
                      </td>
                      <td className="px-6 py-4">{book.author}</td>
                      <td className="px-6 py-4 font-mono text-xs">
                        {book.publicationYear}
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
                            onClick={() => openDeleteModal(book.id)}
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

          {/* Pagination Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {filteredBooks.length > 0 ? indexOfFirstItem + 1 : 0}-
                {Math.min(indexOfLastItem, filteredBooks.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {filteredBooks.length}
              </span>{" "}
              results
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-bold text-slate-700 dark:text-slate-300"
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
                  Publication Year
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                  defaultValue={currentBook?.publicationYear}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Summary
                </label>
                <textarea
                  className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5"
                  rows="3"
                  defaultValue={currentBook?.summary}
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
                onClick={() => setIsModalOpen(false)}
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
