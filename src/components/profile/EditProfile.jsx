// import  {useContext} from 'react';
// import { Camera, Calendar, ChevronDown, CheckCircle2 } from 'lucide-react';
// import { AuthContext } from '../../context/AuthContext';

// const EditProfile = () => {

//   const { user } = useContext(AuthContext);
  
//   const displayName = user?.name || "User";
//   const [firstName, lastName] = displayName.split(" ");
//   // const displayContact = user?.mobile || user?.email || "";

//   const email = user?.email || "enter your email";
// const mobile = user?.mobile || "enter your mobile number";


//   return (
//     <div className="bg-white md:rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//       {/* Header */}
//       <div className="px-8 py-5 border-b border-slate-100">
//         <h3 className="text-xl font-bold text-slate-800">Edit Profile</h3>
//       </div>

//       <div className="p-8">
      
//         {/* Form Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          
//           {/* First Name */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">First Name<span className="text-rose-500">*</span></label>
//             <input 
//               type="text" 
//               defaultValue={firstName || ""}
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600"
//             />
//           </div>

//           {/* Last Name */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">Last Name <span className="text-rose-500">*</span></label>
//             <input 
//               type="text" 
//               defaultValue={lastName || "enter your last name"}           
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600"
//             />
//           </div>

//           {/* Email Address */}
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <label className="text-[13px] font-bold text-slate-700">Email Address</label>
//               <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
//                 <CheckCircle2 size={12} /> Verified
//               </span>
//             </div>
//             <input 
//               type="email" 
              
//               defaultValue={email}
              
//               className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-sm text-slate-400 cursor-not-allowed"
//             />
//           </div>

//           {/* Contact Number */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">Contact Number</label>
//             <div className="relative">
//               <input 
//                 type="text" 
//                 placeholder="Enter Contact Number"
//               defaultValue={mobile}
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600 pr-20"
//               />
//               <button className="absolute right-2 top-2 bottom-2 px-3 bg-slate-800 text-white text-[11px] font-bold rounded-lg hover:bg-slate-700 transition-all">
//                 Verify
//               </button>
//             </div>
//           </div>

//           {/* Date of Birth */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">Date of Birth</label>
//             <div className="relative">
//               <input 
//                 type="text" 
//                 placeholder="Must be 18+"
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600 pl-10"
//               />
//               <Calendar className="absolute left-3 top-3.5 text-slate-400" size={18} />
//             </div>
//           </div>

//           {/* Gender */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">Gender</label>
//             <div className="relative">
//               <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600 appearance-none bg-white">
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={18} />
//             </div>
//           </div>

//         </div>

//         {/* Footer Actions */}
//         <div className="mt-12 flex justify-end items-center gap-4">
//           <button className="px-10 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
//             Cancel
//           </button>
//           <button className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
//             Save Changes
//           </button>
         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

// import { useContext, useState, useEffect } from "react";
// import { Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";

// const EditProfile = ({ onCancel }) => {
//   const { user, setUser } = useContext(AuthContext);

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [gender, setGender] = useState("");

//   useEffect(() => {
//     if (user) {
//       const nameParts = user.name?.split(" ") || [];
//       setFirstName(nameParts[0] || "");
//       setLastName(nameParts[1] || "");
//       setEmail(user.email || "");
//       setMobile(user.mobile || "");
//       setDateOfBirth(user.dateOfBirth?.split("T")[0] || "");
//       setGender(user.gender || "");
//     }
//   }, [user]);

//  const handleUpdate = async () => {
//   try {
//     const updatedUser = {};

//     if (firstName || lastName) updatedUser.name = `${firstName} ${lastName}`.trim();
//     if (email) updatedUser.email = email;
//     if (mobile) updatedUser.mobile = mobile;
//     if (dateOfBirth) updatedUser.dateOfBirth = dateOfBirth;
//     if (gender) updatedUser.gender = gender;

//     const { data } = await axios.put(
//       "http://localhost:5000/api/auth/profile",
//       updatedUser,
//       { withCredentials: true }
//     );

//     setUser(data.user);
//     alert("Profile updated successfully!");
//     if (onCancel && typeof onCancel === "function") {
//       onCancel(); // <-- safe now
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.response?.data?.message || "Failed to update profile");
//   }
// };

//   return (
//     <div className="bg-white md:rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//       <div className="px-8 py-5 border-b border-slate-100">
//         <h3 className="text-xl font-bold text-slate-800">Edit Profile</h3>
//       </div>

//       <div className="p-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
//           {/* First Name */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">
//               First Name <span className="text-rose-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600"
//             />
//           </div>

//           {/* Last Name */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">
//               Last Name <span className="text-rose-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600"
//             />
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <label className="text-[13px] font-bold text-slate-700">
//                 Email Address
//               </label>
//               {email && (
//                 <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
//                   <CheckCircle2 size={12} /> Verified
//                 </span>
//               )}
//             </div>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600"
//             />
//           </div>

//           {/* Mobile */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">Contact Number</label>
//             <input
//               type="text"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none text-sm text-slate-600"
//             />
//           </div>

//           {/* Date of Birth */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">Date of Birth</label>
//             <input
//               type="date"
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none text-sm text-slate-600"
//             />
//           </div>

//           {/* Gender */}
//           <div className="space-y-2">
//             <label className="text-[13px] font-bold text-slate-700">Gender</label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none text-sm text-slate-600 appearance-none bg-white"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>

//         {/* Footer Buttons */}
//         <div className="mt-12 flex justify-end items-center gap-4">
//           <button
//             onClick={onCancel}
//             className="px-10 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleUpdate}
//             className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

import { useContext, useState, useEffect } from "react";
import { Calendar, CheckCircle2, Calendar1 } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CustomDatePicker from "../datepicker/CustomDatePicker";

const EditProfile = ({ onCancel }) => {
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    gender: ""
  });

  const [errors, setErrors] = useState({}); // Inline error state

 useEffect(() => {
  if (!user) return;

  const nameParts = (user.name || "").split(" ");

  // Use setTimeout to avoid cascading render warning
  setTimeout(() => {
    setFormData({
      firstName: nameParts[0] || "",
      lastName: nameParts[1] || "",
      email: user.email || "",
      mobile: user.mobile || "",
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      gender: user.gender || "",
    });
  }, 0);
}, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
 // Mobile validation: max 11 digits, only numbers
    if (name === "mobile") {
      // allow empty
      if (value === "" || (/^\d+$/.test(value) && value.length <= 11)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateMobile = (mobile) => {
    if (!mobile) return true; // optional field
    // Must start with 01 and be exactly 11 digits
    return /^01\d{9}$/.test(mobile);
  };

  const handleUpdate = async () => {
    let tempErrors = {};

    // Frontend validation: mobile
    if (!validateMobile(formData.mobile)) {
      tempErrors.mobile = "Enter a valid 11-digit Bangladeshi mobile number (01XXXXXXXXX)";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      const updatedUser = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        mobile: formData.mobile,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/auth/profile",
        updatedUser,
        { withCredentials: true }
      );

      setUser(data.user); // Update context
      setErrors({});
      alert("Profile updated successfully!");

      if (onCancel && typeof onCancel === "function") onCancel();
    } catch (err) {
      const backendError = err.response?.data?.message || "Server error";
      setErrors({ backend: backendError });
    }
  };

  return (
    <div className="bg-white md:rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-5 border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-800">Edit Profile</h3>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {/* First Name */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-700">
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-700">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[13px] font-bold text-slate-700">
              Email Address
            </label>
            {formData.email && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 size={12} /> Verified
              </span>
            )}
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm text-slate-600"
          />
        </div>

        {/* Mobile */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-700">Contact Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none text-sm text-slate-600"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm px-2">{errors.mobile}</p>
          )}
            {/* Backend error */}
        {errors.backend && (
          <p className="text-red-500 text-sm px-2">{errors.backend}</p>
        )}
        </div>

        {/* Date of Birth */}
        {/* <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-700">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none text-sm text-slate-600"
          />
        </div> */}



<div className="space-y-2 max-w-sm">
  {/* Label */}
 <CustomDatePicker formData={formData} setFormData={setFormData} />
  
  {/* Optional: হেল্পার টেক্সট */}
  <p className="text-[11px] text-slate-400 mt-1 ml-1">Please select your official birth date.</p>
</div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none text-sm text-slate-600 appearance-none bg-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

      

        {/* Footer Buttons */}
        <div className="mt-12 flex justify-end items-center gap-4 col-span-full">
          <button
            onClick={onCancel}
            className="px-10 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;