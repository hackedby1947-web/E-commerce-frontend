// import React from 'react';
// import { User, MapPin, Phone, Building, Home, Navigation, Globe } from 'lucide-react';

// const AddressForm = ({ 
//   formData = {}, 
//   handleChange, 
//   errors = {}, // Default empty object to avoid undefined errors
//   divisions = [], 
//   districts = [], 
//   upazilas = [] 
// }) => {

//   // ১. একটি ইন্টারনাল রেন্ডার ফাংশন যা এরর চেক করবে নিরাপদে
//   const renderError = (field) => {
//     if (errors && errors[field]) {
//       return (
//         <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium animate-in fade-in slide-in-from-top-1">
//           {errors[field]}
//         </p>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 max-w-4xl mx-auto">
//       <div className="flex items-center gap-3 mb-8">
//         <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
//           <MapPin size={24} />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Delivery Information</h2>
//           <p className="text-sm text-slate-500">Please enter your accurate delivery details</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        
//         {/* Full Name */}
//         <div className="space-y-1.5">
//           <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
//             <User size={16} className="text-slate-400" /> Full Name
//           </label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData?.fullName || ''}
//             onChange={handleChange}
//             placeholder="Enter your first and last name"
//             className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 ${
//               errors?.fullName ? "border-red-400 ring-red-50" : "border-slate-200 focus:border-indigo-500"
//             }`}
//           />
//           {renderError('fullName')}
//         </div>

//         {/* Phone Number */}
//         <div className="space-y-1.5">
//           <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
//             <Phone size={16} className="text-slate-400" /> Phone Number
//           </label>
//           <input
//             type="text"
//             name="phone"
//             value={formData?.phone || ''}
//             onChange={handleChange}
//             placeholder="017XXXXXXXX"
//             className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 ${
//               errors?.phone ? "border-red-400 ring-red-50" : "border-slate-200 focus:border-indigo-500"
//             }`}
//           />
//           {renderError('phone')}
//         </div>

//         {/* Region / Division */}
//         <div className="space-y-1.5">
//           <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
//             <Globe size={16} className="text-slate-400" /> Region / Division
//           </label>
//           <div className="relative group">
//             <select
//               name="division"
//               value={formData?.division || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all appearance-none cursor-pointer"
//             >
//               <option value="">Select Division</option>
//               {divisions?.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
//             </select>
//             <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
//               <Navigation size={14} className="rotate-90" />
//             </div>
//           </div>
//           {renderError('region')}
//         </div>

//         {/* City / District */}
//         <div className="space-y-1.5">
//           <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
//             <Building size={16} className="text-slate-400" /> City / District
//           </label>
//           <select
//             name="district"
//             value={formData?.district || ''}
//             onChange={handleChange}
//             disabled={!districts?.length}
//             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:opacity-50 transition-all cursor-pointer"
//           >
//             <option value="">Select District</option>
//             {districts?.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
//           </select>
//           {renderError('city')}
//         </div>

//         {/* Area / Upazila */}
//         <div className="space-y-1.5">
//           <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
//             <Navigation size={16} className="text-slate-400" /> Area / Upazila
//           </label>
//           <select
//             name="upazila"
//             value={formData?.upazila || ''}
//             onChange={handleChange}
//             disabled={!upazilas?.length}
//             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:opacity-50 transition-all cursor-pointer"
//           >
//             <option value="">Select Upazila</option>
//             {upazilas?.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
//           </select>
//           {renderError('area')}
//         </div>

//         {/* Building / House */}
//         <div className="space-y-1.5">
//           <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
//             <Home size={16} className="text-slate-400" /> Building / House / Street
//           </label>
//           <input
//             type="text"
//             name="house"
//             value={formData?.house || ''}
//             onChange={handleChange}
//             placeholder="House# 123, Street# 1, ABC Road"
//             className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-50 ${
//               errors?.house ? "border-red-400 ring-red-50" : "border-slate-200 focus:border-indigo-500"
//             }`}
//           />
//           {renderError('house')}
//         </div>

//         {/* Full Address */}
//         <div className="md:col-span-2 space-y-1.5">
//           <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
//             <MapPin size={16} className="text-slate-400" /> Full Address
//           </label>
//           <textarea
//             name="address"
//             rows="2"
//             value={formData?.address || ''}
//             onChange={handleChange}
//             placeholder="Write your detailed address here..."
//             className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-50 resize-none ${
//               errors?.address ? "border-red-400 ring-red-50" : "border-slate-200 focus:border-indigo-500"
//             }`}
//           />
//           {renderError('address')}
//         </div>
//       </div>

//       <button 
//         type="submit"
//         className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] focus:ring-4 focus:ring-indigo-200"
//       >
//         Save Address
//       </button>
//     </div>
//   );
// };

// export default AddressForm;

import React, { useState, useEffect } from "react";
import { User, MapPin, Phone, Building, Home, Navigation, Globe } from "lucide-react";
import api from "../../api";

const AddressForm = () => {
  // ========================
  // Form State
  // ========================
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    division: "",
    district: "",
    upazila: "",
    house: "",
    address: ""
  });

  const [errors, setErrors] = useState({});
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // ========================
  // Fetch Divisions on mount
  // ========================
  useEffect(() => {
    async function fetchDivisions() {
      try {
        const res = await fetch("http://localhost:5000/api/divisions");
        const data = await res.json();
        setDivisions(data);
      } catch (err) {
        console.error("Division fetch failed", err);
      }
    }
    fetchDivisions();
  }, []);

  // ========================
  // Fetch districts when division changes
  // ========================
  // useEffect(() => {
  //   if (!formData.division) {
  //     setDistricts([]);
  //     setFormData(prev => ({ ...prev, district: "", upazila: "" }));
  //     return;
  //   }

  //   async function fetchDistricts() {
  //     try {
  //       const res = await fetch(`http://localhost:5000/api/districts/${formData.division}`);
  //       const data = await res.json();
  //       setDistricts(data);
  //     } catch (err) {
  //       console.error("District fetch failed", err);
  //     }
  //   }
  //   fetchDistricts();
  // }, [formData.division]);

  useEffect(() => {
  if (!formData.division) return;
  api.get(`/api/districts/${formData.division}`)
    .then(res => {
      setDistricts(res.data)
    })
    .catch(err => console.error(err));
}, [formData.division]);

  // ========================
  // Fetch upazilas when district changes
  // ========================
  // useEffect(() => {
  //   if (!formData.district) {
  //     setUpazilas([]);
  //     setFormData(prev => ({ ...prev, upazila: "" }));
  //     return;
  //   }

  //   async function fetchUpazilas() {
  //     try {
  //       const res = await fetch(`http://localhost:5000/api/upazilas/${formData.district}`);
  //       const data = await res.json();
  //       setUpazilas(data);
  //     } catch (err) {
  //       console.error("Upazila fetch failed", err);
  //     }
  //   }
  //   fetchUpazilas();
  // }, [formData.district]);
useEffect(() => {
  if (!formData.district) return;


  api.get(`/api/upazilas/${formData.district}`)
    .then(res => {
      setUpazilas(res.data);
    })
    .catch(err => console.error(err));

}, [formData.district]);
  // ========================
  // Handle Input Change
  // ========================
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ========================
  // Validation
  // ========================
  const validate = () => {
    const temp = {};
    if (!formData.fullName) temp.fullName = "Full Name is required";
    if (!formData.phone) temp.phone = "Phone number is required";
    if (!formData.division) temp.division = "Division is required";
    if (!formData.district) temp.district = "District is required";
    if (!formData.upazila) temp.upazila = "Upazila is required";
    if (!formData.house) temp.house = "House/Street is required";
    if (!formData.address) temp.address = "Full address is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ========================
  // Submit Handler
  // ========================
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   try {
  //     const res = await fetch("http://localhost:5000/api/address", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //       credentials: "include"
  //     });
  //     const data = await res.json();
  //     alert("Address saved successfully ✅");
  //     setFormData({
  //       fullName: "",
  //       phone: "",
  //       division: "",
  //       district: "",
  //       upazila: "",
  //       house: "",
  //       address: ""
  //     });
  //     setErrors({});
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to save address");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const res = await api.post(
      "/api/address",
      formData,
      {
        withCredentials: true, // JWT cookie পাঠানোর জন্য
        headers: { "Content-Type": "application/json" },
      }
    );

    alert("Address saved successfully ✅");

    setFormData({
      fullName: "",
      phone: "",
      division: "",
      district: "",
      upazila: "",
      house: "",
      address: ""
    });

    setErrors({});
    console.log(res.data); // Axios response data
  } catch (err) {
    console.error(err);
    alert("Failed to save address");
  }
};

  // ========================
  // Render Error
  // ========================
  const renderError = (field) => {
    if (errors[field]) {
      return (
        <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium animate-in fade-in slide-in-from-top-1">
          {errors[field]}
        </p>
      );
    }
    return null;
  };

  // ========================
  // JSX Form
  // ========================
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
          <MapPin size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Delivery Information</h2>
          <p className="text-sm text-slate-500">Please enter your accurate delivery details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
            <User size={16} className="text-slate-400" /> Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your first and last name"
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 ${
              errors.fullName ? "border-red-400 ring-red-50" : "border-slate-200 focus:border-indigo-500"
            }`}
          />
          {renderError("fullName")}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
            <Phone size={16} className="text-slate-400" /> Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="017XXXXXXXX"
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-indigo-50 ${
              errors.phone ? "border-red-400 ring-red-50" : "border-slate-200 focus:border-indigo-500"
            }`}
          />
          {renderError("phone")}
        </div>

        {/* Division */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
            <Globe size={16} className="text-slate-400" /> Region / Division
          </label>
          <div className="relative group">
            <select
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Division</option>
              {divisions.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
              <Navigation size={14} className="rotate-90" />
            </div>
          </div>
          {renderError("division")}
        </div>

        {/* District */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
            <Building size={16} className="text-slate-400" /> City / District
          </label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!districts.length}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:opacity-50 transition-all cursor-pointer"
          >
            <option value="">Select District</option>
            {districts.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
          {renderError("district")}
        </div>

        {/* Upazila */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
            <Navigation size={16} className="text-slate-400" /> Area / Upazila
          </label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            disabled={!upazilas.length}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:opacity-50 transition-all cursor-pointer"
          >
            <option value="">Select Upazila</option>
            {upazilas.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          {renderError("upazila")}
        </div>

        {/* House / Street */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
            <Home size={16} className="text-slate-400" /> Building / House / Street
          </label>
          <input
            type="text"
            name="house"
            value={formData.house}
            onChange={handleChange}
            placeholder="House# 123, Street# 1, ABC Road"
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-50 ${
              errors.house ? "border-red-400 ring-red-50" : "border-slate-200 focus:border-indigo-500"
            }`}
          />
          {renderError("house")}
        </div>

        {/* Full Address */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 ml-1">
            <MapPin size={16} className="text-slate-400" /> Full Address
          </label>
          <textarea
            name="address"
            rows="2"
            value={formData.address}
            onChange={handleChange}
            placeholder="Write your detailed address here..."
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-50 resize-none ${
              errors.address ? "border-red-400 ring-red-50" : "border-slate-200 focus:border-indigo-500"
            }`}
          />
          {renderError("address")}
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] focus:ring-4 focus:ring-indigo-200"
      >
        Save Address
      </button>
    </form>
  );
};

export default AddressForm;