import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
  // import axios from "axios";
import toast from "react-hot-toast";
import api from "../api";
import { useAuth } from "../context/useAuth";

export default function Register() {
  // const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
const { login } = useAuth();
  const validate = () => {
    let newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    // Mobile validation (BD format)
    const mobileRegex = /^01[3-9]\d{8}$/;
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      newErrors.mobile = "Enter valid BD mobile number";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




// const handleRegister = async (e) => {
//   e.preventDefault();

//   if (!validate()) return;

//   try {
//     const res = await axios.post("http://localhost:5000/api/auth/register", {
//       name,
//       mobile,
//       password,
//     });

//     console.log(res.data);

//     // auto login or redirect
//     navigate("/login");

//   } catch (error) {
//     console.log(error.response?.data?.message);

//     setErrors((prev) => ({
//       ...prev,
//       api: error.response?.data?.message || "Something went wrong",
//     }));
//   }
// };
const handleRegister = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const registerToast = toast.loading("অ্যাকাউন্ট তৈরি হচ্ছে...");

  try {
    const res = await api.post("/api/auth/register", {
      name,
      mobile,
      password,
    });

    // আপনার ব্যাকএন্ড থেকে accessToken এবং user ডাটা আসছে
    if (res.data.accessToken) {
      // ১. অটো-লগইন: কনটেক্সটে ইউজার ও টোকেন সেভ করা
      login(res.data.user, res.data.accessToken);

      // ২. সাকসেস মেসেজ
      toast.success(`স্বাগতম ${res.data.user.name}! আপনার অ্যাকাউন্ট তৈরি হয়েছে।`, { 
        id: registerToast,
        duration: 4000 
      });

      // ৩. সরাসরি হোম পেজে রিডাইরেক্ট
      navigate("/"); 
    } else {
      // যদি কোনো কারণে টোকেন না আসে তবে লগইন পেজে যাবে
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন লগইন করুন।", { id: registerToast });
      navigate("/login");
    }

  } catch (error) {
    const errorMessage = error.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে";
    
    // এরর টোস্ট
    toast.error(errorMessage, { id: registerToast });

    setErrors((prev) => ({
      ...prev,
      api: errorMessage,
    }));
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-700 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500">Join us today!</p>

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={name}
              onChange={(e) => {
  setName(e.target.value);
  setErrors((prev) => ({ ...prev, name: "" }));
}}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div>
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={mobile}
              onChange={(e) => {
    setMobile(e.target.value);
    setErrors((prev) => ({ ...prev, mobile: "" }));
  }}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={password}
onChange={(e) => {
  setPassword(e.target.value);
  setErrors((prev) => ({ ...prev, password: "" }));
}}            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}