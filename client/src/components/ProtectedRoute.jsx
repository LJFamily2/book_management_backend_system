import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ allowedRoles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          { withCredentials: true }
        );
        const currentUser = response.data;
        setUser(currentUser);

        if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch {
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={{ user }} />;
};

export default ProtectedRoute;
