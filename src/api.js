// import axios from "axios";

// const api = axios.create({
//   // baseURL: "http://localhost:5000",
//   baseURL: "https://api-royalcart-8iay.onrender.com",
//   // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",

//     // baseURL: import.meta.env.VITE_API_URL, // env থেকে URL পড়বে
//   withCredentials: true, // 🔹 cookie পাঠানোর জন্য
// });

// export default api;

import axios from "axios";

// fallback add করা হলো
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ Request interceptor (token attach)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor (refresh logic)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // ❗ important conditions added
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // ✅ api instance use করো (BASE_URL repeat না)
        const refreshRes = await api.get("/api/auth/refresh");

        const newAccessToken = refreshRes.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        // header update
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        // ❗ clear + prevent infinite loop
        localStorage.removeItem("accessToken");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;