
// import React, { useState } from "react";
// import api from "../../api";

// const ReviewForm = ({ productId, orderId, onCancel, onSuccess }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFiles = (e) => {
//     const selected = Array.from(e.target.files);

//     if (images.length + selected.length > 5) {
//       alert("Max 5 images allowed");
//       return;
//     }

//     setImages([...images, ...selected]);
//   };

//   const handleSubmit = async () => {
//     if (!rating || !comment.trim()) {
//       alert("Please select rating and write your comment.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("rating", rating);
//       formData.append("comment", comment);
//       formData.append("orderId", orderId);

//       images.forEach((img) => {
//         formData.append("images", img);
//       });

//       await api.post(`/api/products/${productId}/review`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "x-multiple": "true", // 🔥 must for your backend logic
//         },
//       });

//       alert("Review submitted successfully!");
//       onSuccess();
//     } catch (err) {
//       console.error("Review submission failed:", err);
//       alert("Failed to submit review");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 p-4">
//       <div className="bg-white max-w-md w-full rounded-xl shadow-xl p-6 relative">
//         <button
//           onClick={onCancel}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
//         >
//           ×
//         </button>

//         <h2 className="text-xl font-bold mb-4">Add Review</h2>

//         {/* Rating */}
//         <div className="flex gap-1 mb-4">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               onClick={() => setRating(star)}
//               className={`text-3xl cursor-pointer ${
//                 star <= rating ? "text-yellow-400" : "text-gray-300"
//               }`}
//             >
//               ★
//             </span>
//           ))}
//         </div>

//         {/* Comment */}
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="w-full border p-2 mb-4"
//           placeholder="Write your review..."
//         />

//         {/* Image upload */}
//         <input type="file" multiple accept="image/*" onChange={handleFiles} />

//         {/* Preview */}
//         <div className="flex gap-2 mt-3">
//           {images.map((img, i) => (
//             <img
//               key={i}
//               src={URL.createObjectURL(img)}
//               alt=""
//               className="w-16 h-16 object-cover rounded"
//             />
//           ))}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-2 mt-4">
//           <button onClick={onCancel}>Cancel</button>
//           <button onClick={handleSubmit} disabled={loading}>
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewForm;


// import React, { useState } from "react";
// import api from "../../api";
// import { Camera, X, Star } from "lucide-react"; // Lucide icons recommended

// const ReviewForm = ({ productId, orderId, onCancel, onSuccess }) => {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFiles = (e) => {
//     const selected = Array.from(e.target.files);
    
//     // Logic: Maximum 3 images
//     if (images.length + selected.length > 3) {
//       alert("You can only upload a maximum of 3 images.");
//       return;
//     }

//     setImages([...images, ...selected]);
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!rating || !comment.trim()) {
//       alert("Please provide a rating and a comment.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("rating", rating);
//       formData.append("comment", comment);
//       formData.append("orderId", orderId);

//       images.forEach((img) => {
//         formData.append("images", img);
//       });

//       await api.post(`/api/products/${productId}/review`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "x-multiple": "true",
//         },
//       });

//       alert("Review submitted successfully!");
//       onSuccess();
//     } catch (err) {
//       console.error("Review submission failed:", err);
//       alert("Failed to submit review");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 p-4">
//       <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
//         {/* Header */}
//         <div className="p-6 pb-0 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-800">Write a Review</h2>
//           <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
//             <X size={20} className="text-gray-500" />
//           </button>
//         </div>

//         <div className="p-6 space-y-5">
//           {/* Star Rating */}
//           <div className="flex flex-col items-center py-2 bg-gray-50 rounded-xl">
//             <p className="text-sm text-gray-500 mb-2">How would you rate this product?</p>
//             <div className="flex gap-2">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onMouseEnter={() => setHoverRating(star)}
//                   onMouseLeave={() => setHoverRating(0)}
//                   onClick={() => setRating(star)}
//                   className="transition-transform active:scale-90"
//                 >
//                   <Star
//                     size={32}
//                     fill={(hoverRating || rating) >= star ? "#facc15" : "none"}
//                     className={(hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Comment Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-28 resize-none"
//               placeholder="What did you like or dislike?"
//             />
//           </div>

//           {/* Image Upload Section */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Add Photos <span className="text-gray-400 font-normal">({images.length}/3)</span>
//             </label>
//             <div className="flex flex-wrap gap-3">
//               {/* Image Previews */}
//               {images.map((img, i) => (
//                 <div key={i} className="relative group w-20 h-20">
//                   <img
//                     src={URL.createObjectURL(img)}
//                     alt="preview"
//                     className="w-full h-full object-cover rounded-lg border border-gray-100"
//                   />
//                   <button
//                     onClick={() => removeImage(i)}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               ))}

//               {/* Upload Button Placeholder */}
//               {images.length < 3 && (
//                 <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-400 hover:text-blue-500">
//                   <Camera size={24} />
//                   <span className="text-[10px] mt-1">Add</span>
//                   <input type="file" multiple accept="image/*" onChange={handleFiles} className="hidden" />
//                 </label>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="p-6 bg-gray-50 flex gap-3">
//           <button
//             onClick={onCancel}
//             className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-white transition-colors"
//           >
//             Not Now
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`flex-1 px-4 py-2.5 rounded-xl font-medium text-white transition-all ${
//               loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"
//             }`}
//           >
//             {loading ? "Posting..." : "Submit Review"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewForm;


// import React, { useState } from "react";
// import api from "../../api";
// import { Camera, X, Star, Send } from "lucide-react";

// const ReviewForm = ({ productId, orderId, onCancel, onSuccess }) => {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFiles = (e) => {
//     const selected = Array.from(e.target.files);
//     if (images.length + selected.length > 3) {
//       alert("Max 3 images allowed");
//       return;
//     }
//     setImages([...images, ...selected]);
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!rating || !comment.trim()) {
//       alert("Please add rating and comment");
//       return;
//     }
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("rating", rating);
//       formData.append("comment", comment);
//       formData.append("orderId", orderId);
//       images.forEach((img) => formData.append("images", img));

//       await api.post(`/api/products/${productId}/review`, formData, {
//         headers: { "Content-Type": "multipart/form-data", "x-multiple": "true" },
//       });
//       onSuccess();
//     } catch  {
//       alert("Failed to post review");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center  backdrop-blur-[0.5px] p-0 sm:p-4">
//       {/* কার্ডটি মোবাইলে নিচ থেকে উঠবে (Bottom Sheet Style) */}
//       <div className="bg-white w-full max-w-[360px] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        
//         {/* Header - Minimalist */}
//         <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
//           <h2 className="text-md font-semibold text-gray-800">Rate Product</h2>
//           <button onClick={onCancel} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
//             <X size={18} className="text-gray-400" />
//           </button>
//         </div>

//         <div className="p-5 space-y-4">
//           {/* Compact Star Rating */}
//           <div className="flex flex-col items-center">
//             <div className="flex gap-1.5">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => setRating(star)}
//                   onMouseEnter={() => setHoverRating(star)}
//                   onMouseLeave={() => setHoverRating(0)}
//                   className="transition-transform active:scale-125"
//                 >
//                   <Star
//                     size={28}
//                     fill={(hoverRating || rating) >= star ? "#FFB800" : "none"}
//                     strokeWidth={1.5}
//                     className={(hoverRating || rating) >= star ? "text-[#FFB800]" : "text-gray-300"}
//                   />
//                 </button>
//               ))}
//             </div>
//             <p className="text-[11px] font-medium text-gray-400 mt-1 uppercase tracking-wider">
//               {rating === 5 ? "Excellent!" : rating === 1 ? "Disappointed" : "Tap to rate"}
//             </p>
//           </div>

//           {/* Compact Textarea */}
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none h-24 resize-none placeholder:text-gray-400"
//             placeholder="Share your experience with this item..."
//           />

//           {/* Image Upload - Scrollable horizontally */}
//           <div>
//             <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
//               {/* Camera Button */}
//               {images.length < 3 && (
//                 <label className="flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-400 transition-all">
//                   <Camera size={20} />
//                   <input type="file" multiple accept="image/*" onChange={handleFiles} className="hidden" />
//                 </label>
//               )}

//               {/* Preview Thumbs */}
//               {images.map((img, i) => (
//                 <div key={i} className="relative flex-shrink-0 w-14 h-14">
//                   <img
//                     src={URL.createObjectURL(img)}
//                     alt=""
//                     className="w-full h-full object-cover rounded-lg ring-1 ring-gray-100"
//                   />
//                   <button
//                     onClick={() => removeImage(i)}
//                     className="absolute -top-1.5 -right-1.5 bg-black/70 text-white rounded-full p-0.5 border border-white"
//                   >
//                     <X size={10} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <p className="text-[10px] text-gray-400 mt-2">Up to 3 photos allowed</p>
//           </div>
//         </div>

//         {/* Action Button - Full Width Mobile Style */}
//         <div className="px-5 pb-5 pt-2">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
//               loading ? "bg-gray-300" : "bg-black hover:bg-gray-800 active:scale-[0.98]"
//             }`}
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//             ) : (
//               <>
//                 <span>Submit Review</span>
//                 <Send size={16} />
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewForm;


// import React, { useState } from "react";
// import api from "../../api";
// import { Camera, X, Star, ChevronRight } from "lucide-react";

// const ReviewForm = ({ productId, orderId, onCancel, onSuccess }) => {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [comment, setComment] = useState("");
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFiles = (e) => {
//     const selected = Array.from(e.target.files);
//     if (images.length + selected.length > 3) {
//       alert("Maximum 3 images allowed");
//       return;
//     }
//     setImages([...images, ...selected]);
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!rating || !comment.trim()) {
//       alert("Please provide a rating and comment");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("rating", rating);
//       formData.append("comment", comment);
//       formData.append("orderId", orderId);
//       images.forEach((img) => formData.append("images", img));

//       await api.post(`/api/products/${productId}/review`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "x-multiple": "true",
//         },
//       });

//       onSuccess();
//     } catch  {
//       alert("Failed to submit review");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
//       {/* Overlay */}
//       <div
//         className="absolute inset-0  backdrop-blur-0.5"
//         onClick={onCancel}
//       />

//       {/* Card */}
//       <div className="relative w-full max-w-md rounded-[28px] overflow-hidden shadow-2xl bg-white animate-in zoom-in-95 duration-200">

//         {/* Gradient Header */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
//           <h2 className="text-xl font-semibold">Write a Review</h2>
//           <p className="text-xs opacity-80 mt-1">
//             Share your experience with this product
//           </p>

//           <button
//             onClick={onCancel}
//             className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         <div className="p-6">

//           {/* Rating */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="flex gap-2">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   onClick={() => setRating(star)}
//                   onMouseEnter={() => setHover(star)}
//                   onMouseLeave={() => setHover(0)}
//                   className="transition-all duration-200 hover:scale-125"
//                 >
//                   <Star
//                     size={34}
//                     fill={(hover || rating) >= star ? "#FACC15" : "none"}
//                     className={`${
//                       (hover || rating) >= star
//                         ? "text-yellow-400 drop-shadow"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 </button>
//               ))}
//             </div>

//             <p className="text-sm mt-3 font-medium text-gray-600">
//               {rating ? `You rated ${rating} star${rating > 1 ? "s" : ""}` : "Tap to rate"}
//             </p>
//           </div>

//           {/* Comment */}
//           <div className="mb-5">
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Describe your experience..."
//               className="w-full h-28 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="flex gap-3 flex-wrap mb-6">
//             {images.map((img, i) => (
//               <div key={i} className="relative w-16 h-16 group">
//                 <img
//                   src={URL.createObjectURL(img)}
//                   alt="preview"
//                   className="w-full h-full object-cover rounded-xl border"
//                 />
//                 <button
//                   onClick={() => removeImage(i)}
//                   className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
//                 >
//                   <X size={12} />
//                 </button>
//               </div>
//             ))}

//             {images.length < 3 && (
//               <label className="w-16 h-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition text-gray-400">
//                 <Camera size={20} />
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleFiles}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
//               loading
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-lg"
//             }`}
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//             ) : (
//               <>
//                 Submit Review
//                 <ChevronRight size={18} />
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewForm;

import React, { useState } from "react";
import api from "../../api";
import { Camera, X, Star, ChevronRight } from "lucide-react";

const ReviewForm = ({ productId, orderId, onCancel, onSuccess }) => {
  // ✅ default 5 star
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ max 3 images (auto trim)
  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    const combined = [...images, ...selected];
    setImages(combined.slice(0, 3));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      alert("Please provide a rating and comment");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);
      formData.append("orderId", orderId);
      images.forEach((img) => formData.append("images", img));

      await api.post(`/api/products/${productId}/review`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-multiple": "true",
        },
      });

      onSuccess();
    } catch  {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 mt-10">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 "
        onClick={onCancel}
      />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-[28px] overflow-hidden shadow-2xl bg-white animate-in zoom-in-95 duration-200">

        {/* Gradient Header */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h2 className="text-xl font-semibold">Write a Review</h2>
          <p className="text-xs opacity-80 mt-1">
            Share your experience with this product
          </p>

          <button
            onClick={onCancel}
            className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">

          {/* Rating */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-all duration-200 hover:scale-125"
                >
                  <Star
                    size={34}
                    fill={(hover || rating) >= star ? "#FACC15" : "none"}
                    className={`${
                      (hover || rating) >= star
                        ? "text-yellow-400 drop-shadow"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-sm mt-3 font-medium text-gray-600">
              You rated {rating} star{rating > 1 ? "s" : ""}
            </p>
          </div>

          {/* Comment */}
          <div className="mb-5">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your experience..."
              className="w-full h-28 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <div className="flex gap-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative w-16 h-16 group">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-full h-full object-cover rounded-xl border"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {images.length < 3 && (
                <label className="w-16 h-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition text-gray-400">
                  <Camera size={20} />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFiles}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* ✅ UX hint */}
            <p className="text-xs text-gray-400 mt-2">
              Max 3 images allowed
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-lg"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Submit Review
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
