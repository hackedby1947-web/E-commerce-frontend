import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import api from "../api";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Validation function
  const validate = () => {
    let newErrors = {};

    const mobileRegex = /^01[3-9]\d{8}$/;

    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      newErrors.mobile = "Enter valid BD mobile number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Login API
// login.jsx

// const handleLogin = async (e) => {
//   e.preventDefault();

//   if (!validate()) return;

//   try {
//     const res = await api.post(
//       "/api/auth/login",
//       { mobile, password },
//       { withCredentials: true } // 🔹 কুকি পাঠানোর জন্য জরুরি
//     );

//     // save user in context
//     login(res.data.user);

//     navigate("/profile");
//   } catch (error) {
//     setErrors((prev) => ({
//       ...prev,
//       api: error.response?.data?.message || "Login failed",
//     }));
//   }
// };

// // Google login
// const handleGoogleLogin = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     // Backend এ send করো
//     const res = await api.post(
//       "/api/auth/google",
//       { name: user.displayName, email: user.email },
//       { withCredentials: true } // 🔹 কুকি পাঠানোর জন্য জরুরি
//     );

//     // save user in context
//     login(res.data.user);

//     navigate("/profile");
//   } catch (error) {
//     console.log(error.message);
//     setErrors((prev) => ({
//       ...prev,
//       api: "Google login failed"
//     }));
//   }
// };
 
// const handleLogin = async (e) => {
//   e.preventDefault();

//   if (!validate()) return;

//   try {
//     const res = await api.post(
//       "/api/auth/login",
//       { mobile, password },
//       { withCredentials: true } // HttpOnly cookie পাঠানোর জন্য
//     );

//     // save user in context + access token
//     login(res.data.user, res.data.accessToken); // 🔑 এখানে token পাঠানো হচ্ছে

//     navigate("/profile");
//   } catch (error) {
//     setErrors((prev) => ({
//       ...prev,
//       api: error.response?.data?.message || "Login failed",
//     }));
//   }
// };

const handleLogin = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  // লগইন শুরু হওয়ার সাথে সাথে একটি লোডিং টোস্ট দেখাবে
  const loadingToast = toast.loading("লগইন হচ্ছে...");

  try {
    const res = await api.post(
      "/api/auth/login",
      { mobile, password },
      { withCredentials: true }
    );

    // ১. কনটেক্সট আপডেট
    login(res.data.user, res.data.accessToken);

    // ২. লোডিং টোস্ট সরিয়ে সাকসেস মেসেজ দেখানো
    toast.success("লগইন সফল হয়েছে! স্বাগতম।", { id: loadingToast });

    // ৩. রিডাইরেক্ট
    navigate("/profile");

  } catch (error) {
    // লোডিং টোস্ট সরিয়ে এরর মেসেজ দেখানো
    const errorMessage = error.response?.data?.message || "লগইন ব্যর্থ হয়েছে";
    toast.error(errorMessage, { id: loadingToast });
    
    // প্রয়োজনে সেট এরর রাখতে পারেন নিচের মতো করে (যদি ইনপুটের নিচে মেসেজ দেখান)
    setErrors((prev) => ({ ...prev, api: errorMessage }));
  }
};

// const handleGoogleLogin = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     // Backend এ send করো
//     const res = await api.post(
//       "/api/auth/google",
//       { name: user.displayName, email: user.email },
//       { withCredentials: true } // HttpOnly cookie পাঠানোর জন্য
//     );

//     // save user in context + access token
//     login(res.data.user, res.data.accessToken); // 🔑 token saved

//     navigate("/");
//   } catch (error) {
//     console.log(error.message);
//     setErrors((prev) => ({
//       ...prev,
//       api: "Google login failed"
//     }));
//   }
// };
const handleGoogleLogin = async () => {
  // লোডিং শুরু
  const googleToast = toast.loading("গুগল দিয়ে লগইন হচ্ছে...");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Backend এ ডাটা পাঠানো
    const res = await api.post(
      "/api/auth/google",
      { name: user.displayName, email: user.email },
      { withCredentials: true }
    );

    // ১. কনটেক্সট আপডেট
    login(res.data.user, res.data.accessToken);

    // ২. সাকসেস টোস্ট (একই পপআপে)
    toast.success(`স্বাগতম, ${user.displayName}!`, { id: googleToast });

    // ৩. রিডাইরেক্ট
    navigate("/");

  } catch (error) {
    // এরর মেসেজ হ্যান্ডলিং
    const errorMessage = error.code === 'auth/popup-closed-by-user' 
      ? "লগইন উইন্ডো বন্ধ করা হয়েছে" 
      : "গুগল লগইন ব্যর্থ হয়েছে";

    toast.error(errorMessage, { id: googleToast });

    setErrors((prev) => ({
      ...prev,
      api: errorMessage
    }));
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500">Login to your account</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Mobile */}
          <div>
            <input
              type="tel"
              placeholder="Mobile Number"
              maxLength={11}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setErrors((prev) => ({ ...prev, mobile: "", api: "" }));
              }}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "", api: "" }));
              }}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* API Error */}
          {errors.api && (
            <p className="text-red-500 text-center text-sm">{errors.api}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 border rounded-xl hover:shadow-md"
        >
          <FcGoogle size={24} />
          <span className="font-semibold text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}