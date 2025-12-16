import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sort = searchParams.get("sort") || "newest"; // 'newest' or 'oldest'

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publicationYear: 1925,
      summary:
        "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publicationYear: 1960,
      summary:
        "To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize.",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      publicationYear: 1949,
      summary:
        "1984 is a dystopian social science fiction novel and cautionary tale by English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      publicationYear: 1813,
      summary:
        "Pride and Prejudice is an 1813 novel of manners by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publicationYear: 1951,
      summary:
        "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst and alienation, and as a critique on superficiality in society.",
    },
    {
      id: 6,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publicationYear: 1937,
      summary:
        "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
    },
    {
      id: 7,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      publicationYear: 1953,
      summary:
        "Fahrenheit 451 is a 1953 dystopian novel by American writer Ray Bradbury. Often regarded as one of his best works, the novel presents a future American society where books are outlawed and 'firemen' burn any that are found.",
    },
    {
      id: 8,
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      publicationYear: 1847,
      summary:
        "Jane Eyre is a novel by English writer Charlotte Brontë, published under the pen name Currer Bell, on 16 October 1847, by Smith, Elder & Co. of London. The first American edition was published the following year by Harper & Brothers of New York.",
    },
    {
      id: 9,
      title: "Animal Farm",
      author: "George Orwell",
      publicationYear: 1945,
      summary:
        "Animal Farm is a beast fable, in the form of a satirical allegorical novella, by George Orwell, first published in England on 17 August 1945. It tells the story of a group of farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy.",
    },
    {
      id: 10,
      title: "Brave New World",
      author: "Aldous Huxley",
      publicationYear: 1932,
      summary:
        "Brave New World is a dystopian novel by English author Aldous Huxley, written in 1931 and published in 1932. Largely set in a futuristic World State, whose citizens are environmentally engineered into an intelligence-based social hierarchy, the novel anticipates huge scientific advancements in reproductive technology.",
    },
    {
      id: 11,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      publicationYear: 1954,
      summary:
        "The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien. Set in Middle-earth, intended to be a sequel to his 1937 children's book The Hobbit, but eventually developed into a much larger work.",
    },
    {
      id: 12,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      publicationYear: 1997,
      summary:
        "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday.",
    },
    {
      id: 13,
      title: "The Alchemist",
      author: "Paulo Coelho",
      publicationYear: 1988,
      summary:
        "The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.",
    },
    {
      id: 14,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      publicationYear: 2003,
      summary:
        "The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It is Brown's second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons.",
    },
    {
      id: 15,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      publicationYear: 2008,
      summary:
        "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the voice of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.",
    },
  ];

  // Sort books based on publication year
  const sortedBooks = [...books].sort((a, b) => {
    if (sort === "newest") {
      return b.publicationYear - a.publicationYear;
    } else {
      return a.publicationYear - b.publicationYear;
    }
  });

  const totalPages = Math.ceil(sortedBooks.length / limit);
  const startIndex = (page - 1) * limit;
  const displayedBooks = sortedBooks.slice(startIndex, startIndex + limit);

  const handleSortChange = (newSort) => {
    setSearchParams({ page: 1, limit, sort: newSort });
    setIsFilterOpen(false);
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
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      john.doe@example.com
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Handle logout logic here
                      navigate("/");
                    }}
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
          <div className="w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">
                search
              </span>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white dark:bg-white/5 text-[#1c1c0d] dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-black/20 shadow-soft transition-all text-base font-medium"
              placeholder="Search by title, author, or ISBN..."
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button className="cursor-pointer bg-primary hover:bg-[#e6e205] text-black font-bold py-2 px-4 rounded-lg text-sm transition-colors shadow-sm">
                Search
              </button>
            </div>
          </div>

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
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {displayedBooks.map((book) => (
            <article
              key={book.id}
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
                    to={`/student/book/${book.id}`}
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
          ))}
        </section>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 pb-12">
          <button
            disabled={page <= 1}
            onClick={() => navigate(`/student?page=${page - 1}&limit=${limit}`)}
            className="px-4 py-2 rounded-lg bg-white dark:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/20 transition-colors text-sm font-bold"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => navigate(`/student?page=${page + 1}&limit=${limit}`)}
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
