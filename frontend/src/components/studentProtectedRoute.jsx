import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function StudentProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkStudent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/student",
          {
            withCredentials: true,
          }
        );

        if (response.data.user?.role === "student") {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkStudent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default StudentProtectedRoute;