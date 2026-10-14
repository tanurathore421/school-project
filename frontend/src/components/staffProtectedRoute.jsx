import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function StaffProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    axios
      .get(" https://school-project-ql8x.onrender.com/api/auth/staff", {
        withCredentials: true,
      })
      .then(() => setAllowed(true))
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) {
    return <p>Loading...</p>;
  }

  if (!allowed) {
    return <Navigate to="/" />;
  }

  return children;
}

export default StaffProtectedRoute;