// import React, { useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// import api from "../api";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const login = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   useEffect(() => {
//     api.get("/api/auth/me")
//       .then((res) => login(res.data))
//       .catch(() => logout())
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, isAuthenticated, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// import api from "../api";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = (userData, accessToken) => {
//     setUser(userData);
//     if (accessToken) {
//       localStorage.setItem("accessToken", accessToken);
//       api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("accessToken");
//     delete api.defaults.headers.common["Authorization"];
//     api.post("/api/auth/logout", {}, { withCredentials: true });
//   };

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const refreshRes = await api.get("/api/auth/refresh", { withCredentials: true });
//         if (refreshRes.data.accessToken) {
//           const accessToken = refreshRes.data.accessToken;
//           localStorage.setItem("accessToken", accessToken);
//           api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//           const userRes = await api.get("/api/auth/me");
//           setUser(userRes.data);
//         }
//       } catch {
//         console.log("No valid session, user remains null");
//       } finally {
//         setLoading(false);
//       }
//     };
//     initAuth();
//   }, []);

//   const isAuthenticated = !!user; // 🔹 key addition

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, accessToken) => {
    setUser(userData);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      // ✅ user data ও save করুন
      localStorage.setItem("userData", JSON.stringify(userData));
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData"); // ✅ clear করুন
    delete api.defaults.headers.common["Authorization"];
    api.post("/api/auth/logout", {}, { withCredentials: true });
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // ✅ আগে localStorage থেকে user restore করুন — instant
        const savedUser = localStorage.getItem("userData");
        const savedToken = localStorage.getItem("accessToken");

        if (savedUser && savedToken) {
          setUser(JSON.parse(savedUser));
          api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
          setLoading(false); // ✅ এখনই loading শেষ — logout হবে না
        }

        // ✅ Background এ refresh করুন — fail করলেও logout হবে না
        const refreshRes = await api.get("/api/auth/refresh", { withCredentials: true });
        if (refreshRes.data.accessToken) {
          const accessToken = refreshRes.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

          const userRes = await api.get("/api/auth/me");
          setUser(userRes.data);
          localStorage.setItem("userData", JSON.stringify(userRes.data));
        }
      } catch {
        // ✅ Refresh fail করলে localStorage এর user দিয়ে চলবে
        // শুধু token সত্যিই expire হলে logout করুন
        const savedToken = localStorage.getItem("accessToken");
        if (!savedToken) {
          setUser(null);
          localStorage.removeItem("userData");
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};