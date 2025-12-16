import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/books/${id}`,
          { withCredentials: true }
        );
        setBook(response.data.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-[#1c1c0d] dark:text-gray-100 gap-4">
        <p className="text-xl font-bold">{error || "Book not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-[#e6e205] transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#1c1c0d] dark:text-gray-100 min-h-screen flex flex-col font-display transition-colors duration-200 p-8">
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer mb-6 flex items-center gap-2 text-sm font-bold w-fit group"
      >
        <span className="material-symbols-outlined text-sm inline-block transform transition-transform duration-200 group-hover:-translate-x-2">
          arrow_back
        </span>
        Back to Dashboard
      </button>

      <div className="max-w-4xl mx-auto w-full bg-white dark:bg-[#23220f] rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary-dark text-xs font-bold rounded-full mb-3">
                {book.publicationYear}
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#1c1c0d] dark:text-white mb-2">
                {book.title}
              </h1>
              <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
                by {book.author}
              </p>
            </div>

            <div className="my-6 border-t border-b border-gray-100 dark:border-white/10 py-6">
              <h3 className="text-lg font-bold mb-3">Summary</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {book.summary}
              </p>
            </div>

            <div className="mt-auto flex gap-4">
              <button className="flex-1 bg-primary hover:bg-[#e6e205] text-black font-bold py-3 px-6 rounded-xl transition-colors shadow-sm">
                Borrow Book
              </button>
              <button className="px-6 py-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-[#1c1c0d] dark:text-white font-bold rounded-xl transition-colors">
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
