




// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { CheckCircle, ShoppingBag, ArrowRight, Copy, CreditCard, ShieldCheck, Truck } from 'lucide-react';
// import toast from 'react-hot-toast';
// import api from '../api';

// const OrderSuccess = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // ১. স্টেট ম্যানেজমেন্ট
//   const [order, setOrder] = useState(location.state?.order || null);
//   const [loading, setLoading] = useState(!order);

// useEffect(() => {
//   const fetchOrder = async () => {
//     // যদি আইডি থাকে এবং অলরেডি স্টেট-এ ডাটা না থাকে
//     if (id && !order) {
//       try {
//         setLoading(true);
//         const { data } = await api.get(`/api/orders/${id}`);
//         setOrder(data);
//       } catch (err) {
//         console.error("Order fetch error:", err);
//         setOrder(null); // ডাটা না পেলে স্টেট নাল করে দিবে
//         toast.error("অর্ডারটি খুঁজে পাওয়া যায়নি");
//       } finally {
//         setLoading(false); // সাকসেস হোক বা এরর, লোডিং বন্ধ হবে
//       }
//     } else {
//       setLoading(false);
//     }
//   };

//   fetchOrder();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [id]); // এখানে শুধু [id] ডিপেন্ডেন্সি হিসেবে দিন

//   // ব্যাক বাটন হ্যান্ডেল
// useEffect(() => {
//     // ১. হিস্টোরি স্ট্যাক কন্ট্রোল: 
//     // পেজ লোড হওয়ার সাথে সাথে বর্তমান ইউআরএলটিকে হিস্টোরিতে রিপ্লেস করা
//     window.history.pushState(null, null, window.location.pathname);

//     const handleBackButton = (event) => {
//       // ২. ডিফল্ট ব্যাক অ্যাকশন ব্লক করা
//       event.preventDefault();

//       // ৩. সরাসরি হোমে পাঠানো এবং সাকসেস পেজটি হিস্টোরি থেকে মুছে ফেলা (replace: true)
//       navigate('/', { replace: true });
//     };

//     // 'popstate' লিসেনার যোগ করা (ব্যাক বাটন ডিটেক্ট করার জন্য)
//     window.addEventListener('popstate', handleBackButton);

//     // ক্লিনআপ ফাংশন: পেজ থেকে চলে গেলে লিসেনার রিমুভ করা
//     return () => {
//       window.removeEventListener('popstate', handleBackButton);
//     };
//   }, [navigate]);

//   const copyOrderId = () => {
//     if (order?._id) {
//       navigator.clipboard.writeText(order._id);
//       toast.success('আইডি কপি করা হয়েছে!');
//     }
//   };

//   // ৩. লোডিং অবস্থায় স্পিনার দেখানো (সবচেয়ে গুরুত্বপূর্ণ)
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
//           <p className="text-gray-500 font-medium font-bengali">অর্ডার তথ্য লোড হচ্ছে...</p>
//         </div>
//       </div>
//     );
//   }

//   // ৪. যদি কোনো ডাটা না থাকে
//   if (!order) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 mb-4 font-bold">দুঃখিত, কোনো অর্ডার পাওয়া যায়নি!</p>
//           <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-2 rounded-xl">হোমে ফিরে যান</button>
//         </div>
//       </div>
//     );
//   }

//   // ৫. ডাটা পাওয়ার পর মেইন ডিজাইন
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
//       <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 text-center border border-gray-100">
        
//         <div className="flex justify-center mb-6">
//           <div className={`${order.isPaid ? 'bg-blue-50' : 'bg-green-50'} p-5 rounded-full relative`}>
//             {order.isPaid ? (
//               <ShieldCheck size={70} className="text-blue-500 animate-pulse" />
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
//             ? 'আপনার পেমেন্ট আমরা পেয়েছি। শীঘ্রই শাড়িটি আপনার ঠিকানায় পাঠিয়ে দেওয়া হবে।' 
//             : 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। ডেলিভারি ম্যান যাওয়ার আগে আপনাকে কল করবেন।'}
//         </p>

//         <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-left border border-gray-100 space-y-4">
//           <div className="flex justify-between items-center border-b pb-3">
//             <span className="text-gray-400 text-[11px] font-bold uppercase tracking-tighter">অর্ডার আইডি</span>
//             <button onClick={copyOrderId} className="flex items-center gap-1 text-gray-700">
//               <span className="font-mono font-bold text-sm">
//                 #{order._id?.slice(-8).toUpperCase()}
//               </span>
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
//               <span className="text-gray-900 font-extrabold text-lg italic font-mono italic">৳{order.totalAmount}</span>
//             </div>
//           </div>

//           {!order.isPaid && (
//             <div className="bg-orange-100/50 p-3 rounded-xl border border-orange-100">
//               <p className="text-[11px] text-orange-800 leading-tight">
//                 <strong>মনে রাখবেন:</strong> ডেলিভারি ম্যানকে ৳{order.totalAmount} পরিশোধ করে আপনার পার্সেলটি বুঝে নিন।
//               </p>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={() => navigate('/')}
//           className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg"
//         >
//           <ShoppingBag size={20} /> আরও কেনাকাটা করুন <ArrowRight size={20} />
//         </button>

//         <div className="mt-8 pt-6 border-t text-[11px] text-gray-400 italic font-bengali">
//           প্রয়োজনে কল করুন: +৮৮০১৭XXXXXXXX
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight, Copy, CreditCard, ShieldCheck, Truck, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';

const OrderSuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(location.state?.order || null);
  // const capiEventId = location.state?.capiEventId || null;
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    const fetchOrder = async () => {
      if (id && !order) {
        try {
          setLoading(true);
          const { data } = await api.get(`/api/orders/${id}`);
          setOrder(data);
        } catch (err) {
          console.error("Order fetch error:", err);
          setOrder(null);
          toast.error("অর্ডারটি খুঁজে পাওয়া যায়নি");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);


  // // ✅ fbq Purchase event — Order success page লোড হওয়ার পর fire হবে
  // useEffect(() => {
  //   if (!order) return;

  //   // Purchase event fire — CAPI এর সাথে same event_id দিয়ে deduplication
  //   const purchaseEventId = capiEventId || `Purchase_${order._id}_${Date.now()}`;

  //   if (typeof window.fbq === "function") {
  //     window.fbq("track", "Purchase", {
  //       value: order.totalAmount,
  //       currency: "BDT",
  //       order_id: order._id,
  //       num_items: order.items?.length || 1,
  //       content_ids: order.items?.map(i => i.productId?.toString()) || [],
  //       content_type: "product",
  //     }, { eventID: purchaseEventId });
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [order?._id]); // order._id দিয়ে দেওয়া হয়েছে যাতে শুধু একবার fire হয়

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate('/', { replace: true });
    };
    window.addEventListener('popstate', handleBackButton);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">অর্ডার তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white">
        <div className="text-center max-w-xs">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} className="text-red-500" />
          </div>
          <p className="text-gray-900 font-bold text-lg mb-2">দুঃখিত!</p>
          <p className="text-gray-500 text-sm mb-6">আপনার কাঙ্ক্ষিত অর্ডারটি খুঁজে পাওয়া যায়নি।</p>
          <button onClick={() => navigate('/')} className="w-full bg-black text-white py-3 rounded-xl font-semibold shadow-lg">হোমে ফিরে যান</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start sm:items-center justify-center px-4 py-6 sm:py-12">
      <div className="max-w-md w-full bg-white rounded-4xl sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 sm:p-8 text-center border border-gray-50 relative overflow-hidden">
        
        {/* Background Accent */}
        <div className={`absolute top-0 left-0 w-full h-2 ${order.isPaid ? 'bg-blue-500' : 'bg-green-500'}`}></div>

        <div className="flex justify-center mt-4 mb-4">
          <div className={`${order.isPaid ? 'bg-blue-50' : 'bg-green-50'} p-4 sm:p-5 rounded-full`}>
            {order.isPaid ? (
              <ShieldCheck size={60} className="text-blue-500 animate-pulse sm:w-[70px] sm:h-[70px]" />
            ) : (
              <CheckCircle size={60} className="text-green-500 sm:w-17.5 sm:h-[70px]" />
            )}
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          {order.isPaid ? 'পেমেন্ট সফল!' : 'অর্ডার সম্পন্ন!'}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mb-8 px-2 leading-relaxed">
          {order.isPaid 
            ? 'আপনার পেমেন্ট আমরা পেয়েছি। আপনার পার্সেলটি দ্রুত ডেলিভারি করার কাজ শুরু হয়েছে।' 
            : 'অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।'}
        </p>

        {/* Info Card */}
        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 mb-2 text-left border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200/60 pb-3">
            <span className="text-gray-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">অর্ডার আইডি</span>
            <button onClick={copyOrderId} aria-label="অর্ডার আইডি কপি করুন" className="flex items-center gap-1.5 text-gray-700 active:opacity-50 transition-opacity">
              <span className="font-mono font-bold text-xs sm:text-sm">
                #{order._id?.slice(-8).toUpperCase()}
              </span>
              <Copy size={14} className="text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-2">
            <div>
              <span className="text-gray-400 text-[10px] font-bold uppercase block mb-1">পেমেন্ট মেথড</span>
              <div className={`font-bold text-xs sm:text-sm flex items-center gap-1.5 ${order.isPaid ? 'text-blue-600' : 'text-gray-700'}`}>
                {order.isPaid ? <CreditCard size={14} /> : <Truck size={14} />}
                {order.isPaid ? 'Online Paid' : 'Cash on Delivery'}
              </div>
            </div>
            <div className="text-right">
              <span className="text-gray-400 text-[10px] font-bold uppercase block mb-1">মোট পরিমাণ</span>
              <span className="text-gray-900 font-extrabold text-base sm:text-lg italic font-mono uppercase">৳{order.totalAmount}</span>
            </div>
          </div>

          {!order.isPaid && (
            <div className="bg-orange-50 p-3 rounded-xl border border-orange-100/50">
              <p className="text-[10px] sm:text-[11px] text-orange-800 leading-snug">
                <span className="font-bold">সতর্কতা:</span> ডেলিভারি ম্যানকে <span className="font-bold">৳{order.totalAmount}</span> বুঝিয়ে দিয়ে পণ্যটি গ্রহণ করুন।
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-xl shadow-black/10"
        >
          <ShoppingBag size={18} /> 
          <span className="text-sm sm:text-base">আরও কেনাকাটা করুন</span> 
          <ArrowRight size={18} />
        </button>

        {/* Help Footer */}
        <div className=" pt-2 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-gray-400 font-medium italic">
            <Phone size={12} className="text-gray-300" />
            {import.meta.env.VITE_SUPPORT_PHONE || "+৮৮০১XXXXXXXXX"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;