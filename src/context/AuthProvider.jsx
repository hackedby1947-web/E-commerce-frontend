

// import React, { useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// // উপরে import এ add করো:
// import { getRedirectResult } from "firebase/auth";
// import { auth } from "../firebase";
// import toast from "react-hot-toast";
// import api from "../api";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = (userData, accessToken) => {
//     setUser(userData);
//     if (accessToken) {
//       localStorage.setItem("accessToken", accessToken);
//       // ✅ user data ও save করুন
//       localStorage.setItem("userData", JSON.stringify(userData));
//       api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("userData"); // ✅ clear করুন
//     delete api.defaults.headers.common["Authorization"];
//     api.post("/api/auth/logout", {}, { withCredentials: true });
//   };

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         // ✅ আগে localStorage থেকে user restore করুন — instant
//         const savedUser = localStorage.getItem("userData");
//         const savedToken = localStorage.getItem("accessToken");

//         if (savedUser && savedToken) {
//           setUser(JSON.parse(savedUser));
//           api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
//           setLoading(false); // ✅ এখনই loading শেষ — logout হবে না
//         }

//         // ✅ Background এ refresh করুন — fail করলেও logout হবে না
//         const refreshRes = await api.get("/api/auth/refresh", { withCredentials: true });
//         if (refreshRes.data.accessToken) {
//           const accessToken = refreshRes.data.accessToken;
//           localStorage.setItem("accessToken", accessToken);
//           api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//           const userRes = await api.get("/api/auth/me");
//           setUser(userRes.data);
//           localStorage.setItem("userData", JSON.stringify(userRes.data));
//         }
//       } catch {
//         // ✅ Refresh fail করলে localStorage এর user দিয়ে চলবে
//         // শুধু token সত্যিই expire হলে logout করুন
//         const savedToken = localStorage.getItem("accessToken");
//         if (!savedToken) {
//           setUser(null);
//           localStorage.removeItem("userData");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     initAuth();
//   }, []);

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import api from "../api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, accessToken) => {
    setUser(userData);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userData", JSON.stringify(userData));
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    delete api.defaults.headers.common["Authorization"];
    api.post("/api/auth/logout", {}, { withCredentials: true });
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // ✅ Google Redirect থেকে ফিরে আসলে এখানে handle হবে
        const redirectResult = await getRedirectResult(auth);
        if (redirectResult?.user) {
          const googleUser = redirectResult.user;
          const res = await api.post(
            "/api/auth/google",
            { name: googleUser.displayName, email: googleUser.email },
            { withCredentials: true }
          );
          login(res.data.user, res.data.accessToken);
          toast.success(`স্বাগতম, ${googleUser.displayName}!`);
          setLoading(false);
          return;
        }

        // ✅ localStorage থেকে user restore
        const savedUser = localStorage.getItem("userData");
        const savedToken = localStorage.getItem("accessToken");

        if (savedUser && savedToken) {
          setUser(JSON.parse(savedUser));
          api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
          setLoading(false);
        }

        // ✅ Background এ refresh
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