import React from "react";

const StudentDashboard = () => {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: "1925",
      description:
        "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
      cover:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIzPemDFED6f_zXKZzyGoJfVCEfEQrdP7FcSakX_5uuSDQUKPrdpY6mR6dlVOOLug7v2yPtix_tyGIp4AB2rL98uEo3XWoE7bJWuTuTNvUoKnmSZCrpDqBFlSvD3dE1KNQarB6leS5OB12EgJMKwU1KtZERWv6MuVX58tH6sdCgvUhmjzUld1XXD4RLO_XgAtIYHSPvcuDz71TBigAVZe_xOUktNftDJjnoHbiYhm3dBe6wnubBhNirXc_jpUooPKW5er_Gh2UGBw",
      isNew: true,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: "1960",
      description:
        "To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize.",
      cover:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIzPemDFED6f_zXKZzyGoJfVCEfEQrdP7FcSakX_5uuSDQUKPrdpY6mR6dlVOOLug7v2yPtix_tyGIp4AB2rL98uEo3XWoE7bJWuTuTNvUoKnmSZCrpDqBFlSvD3dE1KNQarB6leS5OB12EgJMKwU1KtZERWv6MuVX58tH6sdCgvUhmjzUld1XXD4RLO_XgAtIYHSPvcuDz71TBigAVZe_xOUktNftDJjnoHbiYhm3dBe6wnubBhNirXc_jpUooPKW5er_Gh2UGBw",
      isNew: false,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      year: "1949",
      description:
        "1984 is a dystopian social science fiction novel and cautionary tale by English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
      cover:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIzPemDFED6f_zXKZzyGoJfVCEfEQrdP7FcSakX_5uuSDQUKPrdpY6mR6dlVOOLug7v2yPtix_tyGIp4AB2rL98uEo3XWoE7bJWuTuTNvUoKnmSZCrpDqBFlSvD3dE1KNQarB6leS5OB12EgJMKwU1KtZERWv6MuVX58tH6sdCgvUhmjzUld1XXD4RLO_XgAtIYHSPvcuDz71TBigAVZe_xOUktNftDJjnoHbiYhm3dBe6wnubBhNirXc_jpUooPKW5er_Gh2UGBw",
      isNew: false,
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#1c1c0d] dark:text-gray-100 min-h-screen flex flex-col font-display transition-colors duration-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass-card border-b border-[#f4f4e6] dark:border-white/10 px-6 py-4 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#1c1c0d] dark:text-white">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-black">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">LibroManager</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-[#1c1c0d] dark:text-gray-200 text-sm font-semibold hover:text-primary/80 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-[#1c1c0d] dark:hover:text-white transition-colors"
            >
              My Books
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-[#1c1c0d] dark:hover:text-white transition-colors"
            >
              History
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-[#1c1c0d] dark:hover:text-white transition-colors"
            >
              Settings
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="cursor-pointer p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                notifications
              </span>
            </button>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white dark:border-gray-700 shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzuvWrEmyiAmgF4SlxMNY8J9TyJigQy5uEX61nCkxNLkNBqcNlHds4PX3npVYv7nGCaTjwTGM2Y1eOeyjXgpM1covlcz1Ks1n6p7l_A2V_mIPVHfOUKBQu8CjwF3f2CBZ-K8wVl5JDEwmqEUrtXjethK2UhE-_CQrLS18ovbxHpy_hsdPI2wKqpcCtWsqps7orT2rR5bknIEXUziqfe9RZfw7RCGx8_lx0bzjc-UcR6nDNK-knqcpz7d137K81nxSnlBVhySBiVak")',
              }}
            ></div>
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
          <div className="hidden md:block">
            <button className="cursor-pointer bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg">
              <span className="material-symbols-outlined text-[20px]">
                bookmark
              </span>
              Saved Books
            </button>
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
            <button className="cursor-pointer px-5 py-2 rounded-full bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-medium border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all shadow-sm">
              Popular
            </button>
            <button className="cursor-pointer px-5 py-2 rounded-full bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-medium border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all shadow-sm">
              New Arrivals
            </button>
            <button className="cursor-pointer px-5 py-2 rounded-full bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-medium border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all shadow-sm">
              Fiction
            </button>
            <button className="cursor-pointer px-5 py-2 rounded-full bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-medium border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all shadow-sm">
              Science
            </button>
            <button className="cursor-pointer ml-auto flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                tune
              </span>
              Filters
            </button>
          </div>
        </section>

        {/* Books Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {books.map((book) => (
            <article
              key={book.id}
              className="group relative flex flex-col bg-white dark:bg-[#23220f] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-white/5"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <button className="cursor-pointer p-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                    <span className="material-symbols-outlined block text-[20px]">
                      favorite
                    </span>
                  </button>
                </div>
                {book.isNew && (
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-primary text-black text-xs font-bold rounded-full shadow-sm">
                      New
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-[#1c1c0d] dark:text-white leading-tight line-clamp-1 group-hover:text-primary-dark transition-colors">
                    {book.title}
                  </h3>
                  <span className="shrink-0 text-xs font-bold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                    {book.year}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  {book.author}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {book.description}
                </p>
                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/10 flex gap-3">
                  <button className="cursor-pointer flex-1 bg-primary hover:bg-[#e6e205] text-black text-sm font-bold py-2.5 rounded-lg transition-colors shadow-sm">
                    Borrow Now
                  </button>
                  <button className="cursor-pointer px-3 py-2.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-[#1c1c0d] dark:text-white rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      visibility
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
