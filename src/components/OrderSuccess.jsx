


// import React, { useEffect } from 'react';
// import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
// import { CheckCircle, ShoppingBag, ArrowRight, Copy } from 'lucide-react';
// import toast from 'react-hot-toast';

// const OrderSuccess = () => {
//   const location = useLocation();
//   // navigate থেকে পাঠানো state রিসিভ করা
//   const order = location.state?.order;
//   const navigate = useNavigate(); // এটি কম্পোনেন্টের ভেতরে উপরে লিখুন


// useEffect(() => {
//     // যখন ইউজার এই পেজে থাকবে, তখন ব্যাক বাটন চাপলে তাকে হোমে পাঠিয়ে দিবে
//     const handleBackButton = (event) => {
//       event.preventDefault();
//       navigate('/', { replace: true });
//     };

//     window.history.pushState(null, null, window.location.pathname);
//     window.addEventListener('popstate', handleBackButton);

//     return () => {
//       window.removeEventListener('popstate', handleBackButton);
//     };
//   }, [navigate]);

//   if (!order) {
//     return <Navigate to="/" replace />;
//   }



//   const copyOrderId = () => {
//     navigator.clipboard.writeText(order._id.slice(-8).toUpperCase());
//     toast.success('আইডি কপি করা হয়েছে!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
//       <div className="max-w-md w-full bg-white rounded-4xl shadow-2xl p-8 text-center border border-gray-100">
        
//         {/* Success Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-green-50 p-5 rounded-full animate-pulse">
//             <CheckCircle size={70} className="text-green-500" strokeWidth={1.5} />
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold text-gray-900 mb-2">ধন্যবাদ!</h2>
//         <p className="text-gray-500 mb-8 px-4">
//           আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আমাদের একজন প্রতিনিধি কল করবেন।
//         </p>

//         {/* Dynamic Order Card */}
//         <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left border border-gray-100 relative group">
//           <div className="space-y-3">
//             <div className="flex justify-between items-center border-b border-gray-200 pb-2">
//               <span className="text-gray-400 text-sm uppercase tracking-wider font-semibold">অর্ডার আইডি</span>
//               <button 
//                 onClick={copyOrderId}
//                 className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
//               >
//                 <span className="font-mono font-semibold text-[16px]">#{order._id.slice(-8).toUpperCase()}</span>
//                 <Copy size={14} />
//               </button>
//             </div>

//                <div className="flex justify-between">
//             <span className="text-gray-500 font-semibold text-sm">ডেলিভারি সময়:</span>
//              <span className="text-gray-500 font-semibold text-sm">২-৩ কার্যদিবস</span>
//            </div>
            
//             <div className="flex justify-between items-center">
//               <span className="text-gray-500 font-semibold text-sm">মোট পেমেন্ট:</span>
//               <span className="font-bold text-gray-800 text-lg">
//                 ৳{order.totalAmount || order.totalPrice || 0}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="space-y-4">
//           {/* <Link
//             to="/my-orders"
//             className="w-full bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
//           >
//             অর্ডার ট্র্যাক করুন <ArrowRight size={20} />
//           </Link> */}
          
//           <button
//             onClick={()=>navigate('/')}
//             className="w-full bg-white text-gray-700 py-4 rounded-2xl font-semibold border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98]"
//           >
//             <ShoppingBag size={20} /> আরও কেনাকাটা করুন <ArrowRight size={20} />
//           </button>
//         </div>

//         <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
//           প্রয়োজনে সাপোর্ট টিমে কথা বলুন: <br/>
//           <span className="text-gray-600 font-medium">+৮৮০১৭XXXXXXXX</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;


// import React, { useEffect } from 'react';
// import { useLocation, useNavigate, Navigate } from 'react-router-dom';
// import { CheckCircle, ShoppingBag, ArrowRight, Copy, CreditCard, ShieldCheck, Truck } from 'lucide-react';
// import toast from 'react-hot-toast';

// const OrderSuccess = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const order = location.state?.order;

//   useEffect(() => {
//     // ব্যাক বাটন আটকাতে
//     const handleBackButton = (event) => {
//       event.preventDefault();
//       navigate('/', { replace: true });
//     };
//     window.history.pushState(null, null, window.location.pathname);
//     window.addEventListener('popstate', handleBackButton);
//     return () => window.removeEventListener('popstate', handleBackButton);
//   }, [navigate]);

//   if (!order) return <Navigate to="/" replace />;

//   const copyOrderId = () => {
//     navigator.clipboard.writeText(order._id);
//     toast.success('অর্ডার আইডি কপি করা হয়েছে!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
//       <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 text-center border border-gray-100">
        
//         {/* আইকন লজিক: পেমেন্ট সফল হলে একরকম, ক্যাশ অন হলে আরেকরকম */}
//         <div className="flex justify-center mb-6">
//           <div className={`${order.isPaid ? 'bg-blue-50' : 'bg-green-50'} p-5 rounded-full relative`}>
//             {order.isPaid ? (
//               <ShieldCheck size={70} className="text-blue-500 animate-bounce" />
//             ) : (
//               <CheckCircle size={70} className="text-green-500" />
//             )}
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold text-gray-900 mb-2">
//           {order.isPaid ? 'পেমেন্ট সফল!' : 'ধন্যবাদ!'}
//         </h2>
//         <p className="text-gray-500 mb-8 px-2">
//           {order.isPaid 
//             ? 'আপনার পেমেন্ট আমরা পেয়েছি। শীঘ্রই শাড়িটি আপনার ঠিকানায় পাঠিয়ে দেওয়া হবে।' 
//             : 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। ডেলিভারি ম্যান যাওয়ার আগে আপনাকে কল করবেন।'}
//         </p>

//         {/* ডাইনামিক অর্ডার কার্ড */}
//         <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-left border border-gray-100 space-y-4">
//           <div className="flex justify-between items-center border-b pb-3">
//             <span className="text-gray-400 text-[11px] font-bold uppercase tracking-tighter">অর্ডার আইডি</span>
//             <button onClick={copyOrderId} className="flex items-center gap-1 text-gray-700">
//               <span className="font-mono font-bold text-sm">#{order._id.slice(-8).toUpperCase()}</span>
//               <Copy size={14} className="opacity-40" />
//             </button>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <span className="text-gray-400 text-[10px] font-bold uppercase block">পেমেন্ট মেথড</span>
//               <div className={`font-bold text-sm flex items-center gap-1 ${order.isPaid ? 'text-blue-600' : 'text-gray-700'}`}>
//                 {order.isPaid ? <CreditCard size={14} /> : <Truck size={14} />}
//                 {order.isPaid ? 'Online Paid' : 'Cash on Delivery'}
//               </div>
//             </div>
//             <div className="text-right">
//               <span className="text-gray-400 text-[10px] font-bold uppercase block">মোট পরিমাণ</span>
//               <span className="text-gray-900 font-extrabold text-lg italic">৳{order.totalAmount}</span>
//             </div>
//           </div>

//           {/* যদি COD হয় তবে অতিরিক্ত মেসেজ */}
//           {!order.isPaid && (
//             <div className="bg-orange-100/50 p-3 rounded-xl border border-orange-100">
//               <p className="text-[11px] text-orange-800 leading-tight">
//                 <strong>মনে রাখবেন:</strong> ডেলিভারি ম্যানকে ৳{order.totalAmount} পরিশোধ করে আপনার পার্সেলটি বুঝে নিন।
//               </p>
//             </div>
//           )}
//         </div>

//         {/* বাটন */}
//         <button
//           onClick={() => navigate('/')}
//           className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg"
//         >
//           <ShoppingBag size={20} /> আরও কেনাকাটা করুন <ArrowRight size={20} />
//         </button>

//         <div className="mt-8 pt-6 border-t text-[11px] text-gray-400 italic">
//           অর্ডার সংক্রান্ত প্রয়োজনে কল করুন: +৮৮০১৭XXXXXXXX
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight, Copy, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';

const OrderSuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // ১. স্টেট ম্যানেজমেন্ট
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

useEffect(() => {
  const fetchOrder = async () => {
    // যদি আইডি থাকে এবং অলরেডি স্টেট-এ ডাটা না থাকে
    if (id && !order) {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error("Order fetch error:", err);
        setOrder(null); // ডাটা না পেলে স্টেট নাল করে দিবে
        toast.error("অর্ডারটি খুঁজে পাওয়া যায়নি");
      } finally {
        setLoading(false); // সাকসেস হোক বা এরর, লোডিং বন্ধ হবে
      }
    } else {
      setLoading(false);
    }
  };

  fetchOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]); // এখানে শুধু [id] ডিপেন্ডেন্সি হিসেবে দিন

  // ব্যাক বাটন হ্যান্ডেল
useEffect(() => {
    // ১. হিস্টোরি স্ট্যাক কন্ট্রোল: 
    // পেজ লোড হওয়ার সাথে সাথে বর্তমান ইউআরএলটিকে হিস্টোরিতে রিপ্লেস করা
    window.history.pushState(null, null, window.location.pathname);

    const handleBackButton = (event) => {
      // ২. ডিফল্ট ব্যাক অ্যাকশন ব্লক করা
      event.preventDefault();

      // ৩. সরাসরি হোমে পাঠানো এবং সাকসেস পেজটি হিস্টোরি থেকে মুছে ফেলা (replace: true)
      navigate('/', { replace: true });
    };

    // 'popstate' লিসেনার যোগ করা (ব্যাক বাটন ডিটেক্ট করার জন্য)
    window.addEventListener('popstate', handleBackButton);

    // ক্লিনআপ ফাংশন: পেজ থেকে চলে গেলে লিসেনার রিমুভ করা
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  const copyOrderId = () => {
    if (order?._id) {
      navigator.clipboard.writeText(order._id);
      toast.success('আইডি কপি করা হয়েছে!');
    }
  };

  // ৩. লোডিং অবস্থায় স্পিনার দেখানো (সবচেয়ে গুরুত্বপূর্ণ)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium font-bengali">অর্ডার তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // ৪. যদি কোনো ডাটা না থাকে
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4 font-bold">দুঃখিত, কোনো অর্ডার পাওয়া যায়নি!</p>
          <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-2 rounded-xl">হোমে ফিরে যান</button>
        </div>
      </div>
    );
  }

  // ৫. ডাটা পাওয়ার পর মেইন ডিজাইন
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 text-center border border-gray-100">
        
        <div className="flex justify-center mb-6">
          <div className={`${order.isPaid ? 'bg-blue-50' : 'bg-green-50'} p-5 rounded-full relative`}>
            {order.isPaid ? (
              <ShieldCheck size={70} className="text-blue-500 animate-pulse" />
            ) : (
              <CheckCircle size={70} className="text-green-500" />
            )}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {order.isPaid ? 'পেমেন্ট সফল!' : 'ধন্যবাদ!'}
        </h2>
        <p className="text-gray-500 mb-8 px-2">
          {order.isPaid 
            ? 'আপনার পেমেন্ট আমরা পেয়েছি। শীঘ্রই শাড়িটি আপনার ঠিকানায় পাঠিয়ে দেওয়া হবে।' 
            : 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। ডেলিভারি ম্যান যাওয়ার আগে আপনাকে কল করবেন।'}
        </p>

        <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-left border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-400 text-[11px] font-bold uppercase tracking-tighter">অর্ডার আইডি</span>
            <button onClick={copyOrderId} className="flex items-center gap-1 text-gray-700">
              <span className="font-mono font-bold text-sm">
                #{order._id?.slice(-8).toUpperCase()}
              </span>
              <Copy size={14} className="opacity-40" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400 text-[10px] font-bold uppercase block">পেমেন্ট মেথড</span>
              <div className={`font-bold text-sm flex items-center gap-1 ${order.isPaid ? 'text-blue-600' : 'text-gray-700'}`}>
                {order.isPaid ? <CreditCard size={14} /> : <Truck size={14} />}
                {order.isPaid ? 'Online Paid' : 'Cash on Delivery'}
              </div>
            </div>
            <div className="text-right">
              <span className="text-gray-400 text-[10px] font-bold uppercase block">মোট পরিমাণ</span>
              <span className="text-gray-900 font-extrabold text-lg italic font-mono italic">৳{order.totalAmount}</span>
            </div>
          </div>

          {!order.isPaid && (
            <div className="bg-orange-100/50 p-3 rounded-xl border border-orange-100">
              <p className="text-[11px] text-orange-800 leading-tight">
                <strong>মনে রাখবেন:</strong> ডেলিভারি ম্যানকে ৳{order.totalAmount} পরিশোধ করে আপনার পার্সেলটি বুঝে নিন।
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg"
        >
          <ShoppingBag size={20} /> আরও কেনাকাটা করুন <ArrowRight size={20} />
        </button>

        <div className="mt-8 pt-6 border-t text-[11px] text-gray-400 italic font-bengali">
          প্রয়োজনে কল করুন: +৮৮০১৭XXXXXXXX
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;