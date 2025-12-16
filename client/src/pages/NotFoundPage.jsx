import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-[#1c1c0d] dark:text-gray-100 p-4">
      <h1 className="text-9xl font-black text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        Oops! The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-primary text-black font-bold rounded-xl hover:bg-[#e6e205] transition-colors shadow-lg shadow-primary/20"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
