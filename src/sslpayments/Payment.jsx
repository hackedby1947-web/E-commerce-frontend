// import React, { useState } from 'react';
// import { useLocation, useNavigate, Navigate } from 'react-router-dom';
// import api from '../api';
// import { CreditCard, Truck, ChevronLeft, ShieldCheck, ArrowRight } from 'lucide-react';
// import toast from 'react-hot-toast';

// const Payment = () => {
//   const { state: checkoutData } = useLocation();
//   const [method, setMethod] = useState('cod'); // Default 'cod'
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // যদি কোনো কারণে checkoutData না থাকে, তবে ব্যাকে পাঠিয়ে দিবে
//   if (!checkoutData) {
//     return <Navigate to="/checkout" replace />;
//   }

//   const handleFinalOrder = async () => {
//     setLoading(true);
//     try {
//       // ধাপ ১: আগে অর্ডারটি সেভ করুন
//       const orderPayload = {
//         ...checkoutData,
//         paymentMethod: method,
//       };

//       const { data: orderRes } = await api.post("/api/orders", orderPayload);
//       const orderId = orderRes.order._id;

//       // ধাপ ২: পেমেন্ট মেথড চেক করা
//       if (method === 'online') {
//         // আপনার ব্যাকএন্ড রাউট অনুযায়ী পেমেন্ট সেশন শুরু করা
//         const { data: paymentRes } = await api.get(`/api/payment/init/${orderId}`);
        
//         if (paymentRes.url) {
//           window.location.replace(paymentRes.url); // SSLCommerz গেটওয়েতে রিডাইরেক্ট
//         } else {
//           toast.error("পেমেন্ট গেটওয়ে লোড করা যায়নি");
//         }
//       } else {
//         // Cash on Delivery এর ক্ষেত্রে সরাসরি সাকসেস পেজ
//         toast.success("অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!");
//         navigate(`/order-success/${orderId}`, { 
//           state: { order: orderRes.order },
//           replace: true 
//         });
//       }
//     } catch (err) {
//       console.error("Order process error:", err);
//       toast.error(err.response?.data?.message || "অর্ডার সম্পন্ন করতে সমস্যা হয়েছে");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-md mx-auto">
//         {/* Back Button & Header */}
//         <button 
//           onClick={() => navigate(-1)} 
//           className="flex items-center text-gray-500 mb-6 hover:text-black transition-colors"
//         >
//           <ChevronLeft size={20} /> <span className="text-sm font-medium">ফিরে যান</span>
//         </button>

//         <h2 className="text-2xl font-bold text-gray-900 mb-2 font-bengali">পেমেন্ট মেথড</h2>
//         <p className="text-gray-500 mb-8 text-sm">আপনার পছন্দের পেমেন্ট মাধ্যমটি নির্বাচন করুন।</p>

//         {/* Payment Methods */}
//         <div className="space-y-4 mb-8">
//           {/* Cash on Delivery */}
//           <div 
//             onClick={() => setMethod('cod')} 
//             className={`group p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
//               method === 'cod' ? 'border-black bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
//             }`}
//           >
//             <div className="flex items-center justify-between relative z-10">
//               <div className="flex items-center gap-4">
//                 <div className={`p-3 rounded-xl ${method === 'cod' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
//                   <Truck size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-900">Cash on Delivery</p>
//                   <p className="text-xs text-gray-500">পণ্য হাতে পেয়ে পেমেন্ট করুন</p>
//                 </div>
//               </div>
//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-black' : 'border-gray-300'}`}>
//                 {method === 'cod' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
//               </div>
//             </div>
//           </div>

//           {/* Online Payment */}
//           <div 
//             onClick={() => setMethod('online')} 
//             className={`group p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
//               method === 'online' ? 'border-blue-600 bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
//             }`}
//           >
//             <div className="flex items-center justify-between relative z-10">
//               <div className="flex items-center gap-4">
//                 <div className={`p-3 rounded-xl ${method === 'online' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
//                   <CreditCard size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-900">Online Payment</p>
//                   <p className="text-xs text-gray-500">SSLCommerz (বিকাশ, কার্ড, নগদ)</p>
//                 </div>
//               </div>
//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'online' ? 'border-blue-600' : 'border-gray-300'}`}>
//                 {method === 'online' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Order Summary Card */}
//         <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8 shadow-sm">
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-gray-500">অর্ডার টোটাল:</span>
//             <span className="font-bold text-gray-900">৳{checkoutData.itemsTotal}</span>
//           </div>
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-gray-500">ডেলিভারি ফি:</span>
//             <span className="font-bold text-gray-900">৳{checkoutData.deliveryFee}</span>
//           </div>
//           <div className="h-px bg-gray-100 mb-4" />
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-bold text-gray-900">মোট প্রদেয়:</span>
//             <span className="text-2xl font-black text-orange-600 font-mono italic">৳{checkoutData.grandTotal}</span>
//           </div>
//         </div>

//         {/* Security Badge */}
//         <div className="flex items-center justify-center gap-2 mb-8 text-gray-400">
//           <ShieldCheck size={16} />
//           <span className="text-[10px] uppercase font-bold tracking-widest">100% Secure Checkout</span>
//         </div>

//         {/* Final Button */}
//         <button 
//           onClick={handleFinalOrder} 
//           disabled={loading}
//           className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
//             loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-zinc-800'
//           }`}
//         >
//           {loading ? (
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//           ) : (
//             <>অর্ডার কনফার্ম করুন <ArrowRight size={20} /></>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;


// import React, { useState } from 'react';
// import { useLocation, useNavigate, Navigate } from 'react-router-dom';
// import api from '../api';
// import { Truck, ChevronLeft, ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
// import toast from 'react-hot-toast';



// const Payment = () => {
//   const { state: checkoutData } = useLocation();
//   const [method, setMethod] = useState('bkash');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   if (!checkoutData) {
//     return <Navigate to="/checkout" replace />;
//   }

//   const handleFinalOrder = async () => {
//     setLoading(true);
//     try {
//       const orderPayload = { ...checkoutData, paymentMethod: method };
//       const { data: orderRes } = await api.post("/api/orders", orderPayload);
//       const orderId = orderRes.order._id;

//       // ================= SSL (commented out) =================
//       /* if (method === 'ssl') {
//         const { data: paymentRes } = await api.get(`/api/payment/init/${orderId}`);
//         if (paymentRes.url) window.location.replace(paymentRes.url);
//         else toast.error("SSL payment gateway লোড হয়নি");
//       } 
//       */

//       if (method === 'bkash') {
//         const { data: paymentRes } = await api.post(`/api/payment/bkash/init/${orderId}`);
//         if (paymentRes.url) window.location.replace(paymentRes.url);
//         else toast.error("bKash payment gateway লোড হয়নি");
//       } else {
//         toast.success("অর্ডার সফলভাবে গ্রহণ করা হয়েছে!");
//         navigate(`/order-success/${orderId}`, {
//           state: { order: orderRes.order },
//           replace: true,
//         });
//       }
//     } catch (err) {
//       console.error("Order error:", err);
//       toast.error(err.response?.data?.message || "অর্ডার করতে সমস্যা হয়েছে");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const btnStyle =
//     method === 'bkash'
//       ? 'bg-[#E2136E] hover:bg-[#c4105e] shadow-lg shadow-pink-200'
//       : 'bg-slate-900 hover:bg-black shadow-lg shadow-gray-200';

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-10 px-4">
//       <div className="w-full max-w-md">
        
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 transition-all group"
//         >
//           <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
//           ফিরে যান
//         </button>

//         <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/60 border border-slate-100">
//           {/* Header */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-extrabold text-slate-900 mb-2">পেমেন্ট মেথড</h2>
//             <p className="text-sm text-slate-500">আপনার সুবিধাজনক পেমেন্ট পদ্ধতিটি বেছে নিন</p>
//           </div>

//           <div className="space-y-4">


//         {/* bKash Card */}
// <div
//   onClick={() => setMethod('bkash')}
//   className={`group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer
//     ${method === 'bkash' 
//       ? 'border-[#E2136E] bg-[#FFF5F9]' 
//       : 'border-slate-100 bg-white hover:border-slate-200'}`}
// >
//   {/* ইমেজ কন্টেইনার */}
//   <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors overflow-hidden
//     ${method === 'bkash' ? 'bg-white' : 'bg-slate-100'}`}>
//     <img 
//       src="/bkash.png" 
//       alt="bKash" 
//       className="w-full h-full object-contain p-1.5" 
//     />
//   </div>

//   <div className="flex-1">
//     <div className="flex items-center gap-2">
//       <h3 className="font-bold text-slate-900">bKash Payment</h3>
     
//     </div>
//     <p className="text-xs text-slate-500">বিকাশ অ্যাপ দিয়ে পেমেন্ট করুন</p>
//   </div>

//   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
//     ${method === 'bkash' ? 'border-[#E2136E]' : 'border-slate-200'}`}>
//     {method === 'bkash' && <div className="w-3 h-3 rounded-full bg-[#E2136E]" />}
//   </div>
// </div>

//             {/* Cash on Delivery Card */}
//             <div
//               onClick={() => setMethod('cod')}
//               className={`group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer
//                 ${method === 'cod' 
//                   ? 'border-slate-900 bg-slate-50' 
//                   : 'border-slate-100 bg-white hover:border-slate-200'}`}
//             >
//               <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors
//                 ${method === 'cod' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
//                 <Truck size={24} />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-bold text-slate-900">Cash on Delivery</h3>
//                 <p className="text-xs text-slate-500">পণ্য বুঝে পেয়ে টাকা দিন</p>
//               </div>
//               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
//                 ${method === 'cod' ? 'border-slate-900' : 'border-slate-200'}`}>
//                 {method === 'cod' && <div className="w-3 h-3 rounded-full bg-slate-900" />}
//               </div>
//             </div>

           
//           </div>

//           {/* Order Summary Summary */}
//           <div className="mt-8 bg-slate-50 rounded-2xl p-4 border border-slate-100">
//             <div className="flex justify-between text-sm mb-2 text-slate-600">
//               <span>সাব-টোটাল</span>
//               <span className="font-medium text-slate-900">৳{checkoutData.itemsTotal}</span>
//             </div>
//             <div className="flex justify-between text-sm mb-3 text-slate-600">
//               <span>ডেলিভারি চার্জ</span>
//               <span className="font-medium text-slate-900">৳{checkoutData.deliveryFee}</span>
//             </div>
//             <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
//               <span className="font-bold text-slate-900">সর্বমোট</span>
//               <span className="text-xl font-black text-slate-900">৳{checkoutData.grandTotal}</span>
//             </div>
//           </div>

//           {/* Confirm Button */}
//           <button
//             onClick={handleFinalOrder}
//             disabled={loading}
//             className={`w-full mt-6 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 ${btnStyle}`}
//           >
//             {loading ? (
//               <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
//             ) : (
//               <>
//                 অর্ডার সম্পন্ন করুন
//                 <ArrowRight size={20} />
//               </>
//             )}
//           </button>

//           {/* Security Note */}
//           <div className="flex items-center justify-center gap-2 mt-6 text-slate-400">
//             <ShieldCheck size={16} />
//             <span className="text-xs font-medium uppercase tracking-wider">End-to-End Secured</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import api from '../api';
import { Truck, ChevronLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Payment = () => {
  const { state: checkoutData } = useLocation();
  const [method, setMethod] = useState('bkash');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!checkoutData) {
    return <Navigate to="/checkout" replace />;
  }

 const handleFinalOrder = async () => {
  setLoading(true);

  try {
    // ================= bKash =================
    if (method === "bkash") {
      const { data: paymentRes } = await api.post(
        "/api/payment/bkash/init",
        {
          ...checkoutData,
          paymentMethod: "bkash",
        }
      );

      if (paymentRes.url) {
        // redirect to bKash payment page
        window.location.replace(paymentRes.url);
        return;
      } else {
        toast.error("bKash payment gateway লোড হয়নি");
      }
    }

    // ================= COD =================
    else if (method === "cod") {
      const { data: orderRes } = await api.post("/api/orders", {
        ...checkoutData,
        paymentMethod: "cod",
        paymentStatus: "Pending",
        isPaid: false,
      });

      toast.success("অর্ডার সফলভাবে গ্রহণ করা হয়েছে!");

      navigate(`/order-success/${orderRes.order._id}`, {
        state: { order: orderRes.order },
        replace: true,
      });
    }
  } catch (err) {
    console.error("Order error:", err);

    toast.error(
      err.response?.data?.message || "অর্ডার করতে সমস্যা হয়েছে"
    );
  } finally {
    setLoading(false);
  }
};

  const btnStyle =
    method === 'bkash'
      ? 'bg-[#E2136E] hover:bg-[#c4105e] shadow-lg shadow-pink-200'
      : 'bg-slate-900 hover:bg-black shadow-lg shadow-gray-200';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 transition-all group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          ফিরে যান
        </button>

        <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/60 border border-slate-100">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">পেমেন্ট মেথড</h2>
            <p className="text-sm text-slate-500">আপনার সুবিধাজনক পেমেন্ট পদ্ধতিটি বেছে নিন</p>
          </div>

          <div className="space-y-4">

            {/* bKash Card */}
            <div
              onClick={() => setMethod('bkash')}
              className={`group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer
                ${method === 'bkash'
                  ? 'border-[#E2136E] bg-[#FFF5F9]'
                  : 'border-slate-100 bg-white hover:border-slate-200'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors overflow-hidden
                ${method === 'bkash' ? 'bg-white' : 'bg-slate-100'}`}>
                <img
                  src="/bkash.png"
                  alt="bKash"
                  className="w-full h-full object-contain p-1.5"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">bKash Payment</h3>
                <p className="text-xs text-slate-500">বিকাশ অ্যাপ দিয়ে পেমেন্ট করুন</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${method === 'bkash' ? 'border-[#E2136E]' : 'border-slate-200'}`}>
                {method === 'bkash' && <div className="w-3 h-3 rounded-full bg-[#E2136E]" />}
              </div>
            </div>

            {/* COD Card */}
            <div
              onClick={() => setMethod('cod')}
              className={`group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer
                ${method === 'cod'
                  ? 'border-slate-900 bg-slate-50'
                  : 'border-slate-100 bg-white hover:border-slate-200'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                ${method === 'cod' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Truck size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">Cash on Delivery</h3>
                <p className="text-xs text-slate-500">পণ্য বুঝে পেয়ে টাকা দিন</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${method === 'cod' ? 'border-slate-900' : 'border-slate-200'}`}>
                {method === 'cod' && <div className="w-3 h-3 rounded-full bg-slate-900" />}
              </div>
            </div>

          </div>

          {/* Order Summary */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex justify-between text-sm mb-2 text-slate-600">
              <span>সাব-টোটাল</span>
              <span className="font-medium text-slate-900">৳{checkoutData.itemsTotal}</span>
            </div>
            <div className="flex justify-between text-sm mb-3 text-slate-600">
              <span>ডেলিভারি চার্জ</span>
              <span className="font-medium text-slate-900">৳{checkoutData.deliveryFee}</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-900">সর্বমোট</span>
              <span className="text-xl font-black text-slate-900">৳{checkoutData.grandTotal}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleFinalOrder}
            disabled={loading}
            className={`w-full mt-6 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-3
              transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${btnStyle}`}
          >
            {loading ? (
              <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                অর্ডার সম্পন্ন করুন
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-slate-400">
            <ShieldCheck size={16} />
            <span className="text-xs font-medium uppercase tracking-wider">End-to-End Secured</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;