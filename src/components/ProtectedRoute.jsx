// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/useAuth";

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) return <div>Loading...</div>; // 🔹 wait for API
//   if (!isAuthenticated) return <Navigate to="/login" replace />;

//   return children;
// }

import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // 🔹 Loading এর সময় কোন redirect হবে না
  if (loading) return <div>Loading...</div>;

  // 🔹 User না থাকলে login page এ redirect
  if (!user) return <Navigate to="/login" replace />;

  return children;
}