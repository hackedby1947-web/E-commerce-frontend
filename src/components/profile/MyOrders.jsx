


// import React, { useState, useEffect } from 'react';
// import { 
//   ShoppingBasket, ChevronRight, Clock, Truck, 
//   CheckCircle, Package, XCircle, AlertCircle, CalendarDays
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api';
// import ReviewForm from '../form/ReviewForm';

// const MyOrders = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('All');
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [myReviews, setMyReviews] = useState([]); // 🔥 NEW

// // const user = JSON.parse(localStorage.getItem("user")); // বা যেখান থেকে logged-in user আসে

//   const orderTabs = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

//   const statusMap = {
//     Pending: 'pending',
//     Confirmed: 'processing',
//     Shipped: 'shipped',
//     Delivered: 'delivered',
//     Cancelled: 'cancelled'
//   };
// const [reviewingProduct, setReviewingProduct] = useState(null);


//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await api.get("/api/orders/my-orders");
//         setOrders(res.data.orders || []);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//   const fetchMyReviews = async () => {
//     try {
//       const res = await api.get("/api/products/my-reviews");

//       setMyReviews(res.data.reviews || []); // 🔥 IMPORTANT

//     } catch (err) {
//       console.error(err);
//       setMyReviews([]);
//     }
//   };

//   fetchMyReviews();
// }, []);

// const hasReviewed = (productId, orderId) => {
//   if (!Array.isArray(myReviews) || !productId || !orderId) return false;

//   return myReviews.some(r => 
//     r.productId === productId.toString() &&
//     r.orderId === orderId.toString()
//   );
// };

//   // const filteredOrders = orders.filter(order => {
//   //   if (activeTab === 'All') return true;
//   //   return order.status?.toLowerCase() === statusMap[activeTab];
//   // });

//   const filteredOrders = orders
//   .slice() // copy to avoid mutating state directly
//   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // 🔹 নতুন অর্ডার প্রথম
//   .filter(order => {
//     if (activeTab === 'All') return true;
//     return order.status?.toLowerCase() === statusMap[activeTab];
//   });

//   const getStatusDetails = (status) => {
//     const s = status?.toLowerCase();
//     switch (s) {
//       case 'delivered': return { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <CheckCircle size={14} /> };
//       case 'shipped': return { color: 'text-blue-600 bg-blue-50 border-blue-100', icon: <Truck size={14} /> };
//       case 'pending': return { color: 'text-amber-600 bg-amber-50 border-amber-100', icon: <Clock size={14} /> };
//       case 'processing': return { color: 'text-purple-600 bg-purple-50 border-purple-100', icon: <Package size={14} /> };
//       case 'cancelled': return { color: 'text-rose-600 bg-rose-50 border-rose-100', icon: <XCircle size={14} /> };
//       default: return { color: 'text-slate-500 bg-slate-50 border-slate-100', icon: <AlertCircle size={14} /> };
//     }
//   };

//   const handleCancelOrder = async (orderId) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await api.put(`/api/orders/${orderId}/status`, { status: 'cancelled' });
//       setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: 'cancelled' } : o));
//     } catch  {
//       alert("Failed to cancel order");
//     }
//   };



//   return (
//   <section className="max-w-6xl mx-auto p-4 md:p-8 bg-white min-h-screen">
//   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//     <div>
//       <h2 className="text-2xl font-bold text-slate-900">My Orders</h2>
//       <p className="text-sm text-slate-500">Manage and track your recent purchases</p>
//     </div>
//     <button onClick={() => navigate('/')} className="w-fit px-6 py-2 bg-pink-600 text-white text-sm font-bold rounded-full hover:bg-pink-700 transition-all shadow-md shadow-pink-100">
//       Continue Shopping
//     </button>
//   </div>

//   {/* Tabs */}
//   <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar border-b border-slate-100 mb-8">
//     {orderTabs.map((tab) => (
//       <button
//         key={tab}
//         onClick={() => setActiveTab(tab)}
//         className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
//           activeTab === tab ? 'text-pink-600' : 'text-slate-400 hover:text-slate-600'
//         }`}
//       >
//         {tab}
//         {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500 rounded-t-full" />}
//       </button>
//     ))}
//   </div>

//   {/* Orders List */}
//   {loading ? (
//     <div className="py-20 text-center flex flex-col items-center gap-3">
//       <div className="w-8 h-8 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
//       <p className="text-slate-400 text-sm italic">Loading your history...</p>
//     </div>
//   ) : filteredOrders.length === 0 ? (
//     <div className="py-20 text-center border-2 border-dashed border-slate-50 rounded-3xl">
//       <ShoppingBasket size={64} className="mx-auto text-slate-200 mb-4" />
//       <h4 className="text-lg font-bold text-slate-800">No orders found</h4>
//       <p className="text-slate-500 text-sm">You haven't placed any orders in this category yet.</p>
//     </div>
//   ) : (
//     <div className="grid gap-6">
//       {filteredOrders.map((order) => {
//         const status = getStatusDetails(order.status);
//         return (
//           <div key={order._id} className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
//             {/* Order Header */}
//             <div className="p-4 bg-slate-50/50 flex flex-wrap justify-between items-center gap-4 border-b border-slate-50">
//               <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
//                 <span className="bg-white px-2 py-1 rounded border border-slate-100 uppercase tracking-tighter">ID: #{order._id?.slice(-6)}</span>
//                 <span className="flex items-center gap-1"><CalendarDays size={14}/> {new Date(order.createdAt).toLocaleDateString()}</span>
//               </div>
//               <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border flex items-center gap-1.5 ${status.color}`}>
//                 {status.icon} {order.status}
//               </div>
//             </div>

//             {/* Items */}
//             <div className="p-4 divide-y divide-slate-50">
//               {order.items?.map((item, idx) => (
                
//                 <div key={idx} className="flex flex-col gap-2">
//                   <div className="flex gap-4 items-center py-4 first:pt-0 last:pb-0" onClick={() => navigate(`/product/${item.productId}`)}>
//                     <img 
//                       src={item?.images?.[0]} 
//                       alt={item?.title} 
//                       className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl bg-slate-100 border border-slate-50"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h5 className="text-sm font-bold text-slate-800 truncate">{item?.title || "Product Name Not Found"}</h5>
//                       <p className="text-[11px] text-slate-500 mt-1">Qty: {item?.quantity} | Price: ৳{item?.price}</p>
//                       <p className="text-sm font-black text-pink-600 mt-1">৳{(item?.price * item?.quantity) || 0}</p>
//                     </div>
//                     <ChevronRight size={18} className="text-slate-400" />
//                   </div>

//                   {/* Footer per item */}
//                   <div className="p-4 border-t border-slate-50 flex justify-between items-center bg-white rounded-b-2xl">
//                     <div>
//                       <p className="text-[10px] text-slate-400 font-bold uppercase">Total Amount</p>
//                       <p className="text-xl font-black text-slate-900">৳{(item?.price * item?.quantity) || 0}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       {order.status?.toLowerCase() === 'pending' && (
//                         <button 
//                           onClick={() => handleCancelOrder(order._id)}
//                           className="px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100"
//                         >
//                           Cancel
//                         </button>
//                       )}
// {order.status?.toLowerCase() === 'delivered' && (
//   hasReviewed(item.productId, order._id) ? (
//     <span className="px-4 py-2 text-xs font-bold text-green-600 bg-green-100 rounded-lg">
//       Reviewed ✅
//     </span>
//   ) : (
//     <button 
//       onClick={() => setReviewingProduct({ productId: item.productId, orderId: order._id })}
//       className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
//     >
//       Add Review
//     </button>
//   )
// )}



//                     </div>
//                   </div>

//                   {/* Review Form */}
//                {reviewingProduct && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//     <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
//       {/* Close button */}
//       <button
//         onClick={() => setReviewingProduct(null)}
//         className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
//       >
//         ✕
//       </button>

//     <ReviewForm
//   productId={reviewingProduct.productId}
//   orderId={reviewingProduct.orderId}
//   onCancel={() => setReviewingProduct(null)}
//   onSuccess={async () => {
//     setReviewingProduct(null);

//     // 🔹 Freshly fetch reviews after submit
//     try {
//       const res = await api.get("/api/products/my-reviews");
//       setMyReviews(res.data.reviews || []);
//     } catch (err) {
//       console.error("Failed to fetch reviews:", err);
//     }
//   }}
// />
//     </div>
//   </div>
// )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   )}
// </section>
//   );
// };

// export default MyOrders;

// import React, { useState, useEffect } from 'react';
// import { 
//   ShoppingBasket, ChevronRight, Clock, Truck, 
//   CheckCircle, Package, XCircle, AlertCircle, CalendarDays,
//   LayoutGrid, CreditCard, PackageCheck, MessageSquare, Trash2
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api';
// import ReviewForm from '../form/ReviewForm';

// const MyOrders = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('All');
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [myReviews, setMyReviews] = useState([]);
//   const [reviewingProduct, setReviewingProduct] = useState(null);

//   // আপনার দেওয়া গ্রিড অনুযায়ী ট্যাপ সিস্টেম
//   const mobileTabs = [
//     { label: 'All', status: 'All', icon: <LayoutGrid size={18} /> },
//     { label: 'Pending', status: 'pending', icon: <Clock size={18} /> },
//     { label: 'Confirmed', status: 'processing', icon: <CheckCircle size={18} /> },
//     { label: 'Shipped', status: 'shipped', icon: <Truck size={18} /> },
//     { label: 'Delivered', status: 'delivered', icon: <PackageCheck size={18} /> },
//     { label: 'Cancelled', status: 'cancelled', icon: <XCircle size={18} /> },
//   ];

//   useEffect(() => {
//     fetchOrders();
//     fetchMyReviews();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/api/orders/my-orders");
//       setOrders(res.data.orders || []);
//     } catch (err) { console.error(err); }
//     finally { setLoading(false); }
//   };

//   const fetchMyReviews = async () => {
//     try {
//       const res = await api.get("/api/products/my-reviews");
//       setMyReviews(res.data.reviews || []);
//     } catch (err) { console.error(err); }
//   };

//   const hasReviewed = (productId, orderId) => {
//     return myReviews.some(r => r.productId === productId.toString() && r.orderId === orderId.toString());
//   };

//   const filteredOrders = orders
//     .slice()
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .filter(order => {
//       if (activeTab === 'All') return true;
//       return order.status?.toLowerCase() === activeTab.toLowerCase();
//     });

//   const getStatusStyle = (status) => {
//     const s = status?.toLowerCase();
//     switch (s) {
//       case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
//       case 'shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
//       case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
//       case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
//       default: return 'bg-slate-50 text-slate-600 border-slate-100';
//     }
//   };

//   return (
//     <section className="max-w-4xl mx-auto min-h-screen bg-slate-50/50 pb-20">
//       {/* Header - Mobile Optimized */}
//       <div className="bg-white p-4 sticky top-0 z-30 border-b border-slate-100">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-black text-slate-900">My Orders</h2>
//           <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500 uppercase">
//             {filteredOrders.length} Orders
//           </span>
//         </div>

//         {/* Horizontal Tabs - Mobile Grid Style */}
//         <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
//           {mobileTabs.map((tab) => (
//             <button
//               key={tab.label}
//               onClick={() => setActiveTab(tab.status)}
//               className={`flex flex-col items-center min-w-[70px] gap-1.5 p-2 rounded-2xl transition-all ${
//                 activeTab === tab.status 
//                 ? 'bg-pink-50 text-pink-600 scale-105 shadow-sm shadow-pink-100' 
//                 : 'text-slate-400'
//               }`}
//             >
//               <div className={`${activeTab === tab.status ? 'text-pink-600' : 'text-slate-400'}`}>
//                 {tab.icon}
//               </div>
//               <span className="text-[10px] font-bold whitespace-nowrap">{tab.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Orders List */}
//       <div className="p-4 space-y-4">
//         {loading ? (
//           <div className="py-20 text-center flex flex-col items-center gap-3">
//             <div className="w-8 h-8 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
//           </div>
//         ) : filteredOrders.length === 0 ? (
//           <div className="py-20 text-center bg-white rounded-3xl border border-slate-100">
//             <ShoppingBasket size={48} className="mx-auto text-slate-200 mb-2" />
//             <p className="text-slate-500 font-bold text-sm">No {activeTab} orders</p>
//           </div>
//         ) : (
//           filteredOrders.map((order) => (
//             <div key={order._id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
//               {/* Card Header */}
//               <div className="px-4 py-3 bg-slate-50/50 flex justify-between items-center border-b border-slate-50">
//                 <div className="flex flex-col">
//                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Order ID</span>
//                   <span className="text-xs font-black text-slate-700">#{order._id?.slice(-8)}</span>
//                 </div>
//                 <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wide ${getStatusStyle(order.status)}`}>
//                   {order.status}
//                 </div>
//               </div>

//               {/* Card Body - Products */}
//               <div className="p-4 space-y-4">
//                 {order.items?.map((item, idx) => (
//                   <div key={idx} className="flex gap-3">
//                     <img 
//                       src={item?.images?.[0]} 
//                       alt="" 
//                       className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-50"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h4 className="text-sm font-bold text-slate-800 truncate">{item.title}</h4>
//                       <p className="text-[11px] text-slate-500">Qty: {item.quantity} × ৳{item.price}</p>
//                       <div className="flex justify-between items-end mt-1">
//                         <span className="text-sm font-black text-pink-600">৳{item.price * item.quantity}</span>
                        
//                         {/* Status based Actions */}
//                         {order.status?.toLowerCase() === 'delivered' && (
//                           hasReviewed(item.productId, order._id) ? (
//                             <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md">Reviewed ✅</span>
//                           ) : (
//                             <button 
//                               onClick={() => setReviewingProduct({ productId: item.productId, orderId: order._id })}
//                               className="text-[10px] font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg active:scale-95"
//                             >
//                               Write Review
//                             </button>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Card Footer */}
//               <div className="px-4 py-3 border-t border-slate-50 bg-white flex justify-between items-center">
//                 <div className="flex items-center gap-1.5 text-slate-400">
//                   <CalendarDays size={14} />
//                   <span className="text-[11px] font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 {order.status?.toLowerCase() === 'pending' && (
//                    <button 
//                      onClick={() => handleCancelOrder(order._id)}
//                      className="text-xs font-bold text-rose-500 px-3 py-1.5 border border-rose-100 rounded-lg hover:bg-rose-50 transition-colors"
//                    >
//                      Cancel Order
//                    </button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Review Modal Backdrop - Mobile Optimized */}
//       {reviewingProduct && (
//         <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 md:p-4">
//           <div className="bg-white w-full max-w-md rounded-t-[32px] md:rounded-2xl p-6 animate-in slide-in-from-bottom duration-300">
//             <div className="flex justify-between items-center mb-6">
//                <h3 className="font-black text-lg text-slate-800">Product Review</h3>
//                <button onClick={() => setReviewingProduct(null)} className="p-2 bg-slate-100 rounded-full text-slate-500">✕</button>
//             </div>
//             <ReviewForm
//               productId={reviewingProduct.productId}
//               orderId={reviewingProduct.orderId}
//               onCancel={() => setReviewingProduct(null)}
//               onSuccess={async () => {
//                 setReviewingProduct(null);
//                 fetchMyReviews();
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default MyOrders;


import React, { useState, useEffect } from 'react';
import { 
  ShoppingBasket, ChevronRight, Clock, Truck, 
  CheckCircle, Package, XCircle, AlertCircle, CalendarDays,
  LayoutGrid, PackageCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import ReviewForm from '../form/ReviewForm';

const MyOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myReviews, setMyReviews] = useState([]);
  const [reviewingProduct, setReviewingProduct] = useState(null);

  const orderTabs = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  const statusMap = {
    Pending: 'pending',
    Confirmed: 'processing',
    Shipped: 'shipped',
    Delivered: 'delivered',
    Cancelled: 'cancelled'
  };

  useEffect(() => {
    fetchOrders();
    fetchMyReviews();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders/my-orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyReviews = async () => {
    try {
      const res = await api.get("/api/products/my-reviews");
      setMyReviews(res.data.reviews || []);
    } catch (err) {
      console.error(err);
    }
  };

  const hasReviewed = (productId, orderId) => {
    if (!Array.isArray(myReviews) || !productId || !orderId) return false;
    return myReviews.some(r => 
      r.productId === productId.toString() &&
      r.orderId === orderId.toString()
    );
  };

  const filteredOrders = orders
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter(order => {
      if (activeTab === 'All') return true;
      return order.status?.toLowerCase() === statusMap[activeTab];
    });

  const getStatusDetails = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'delivered': return { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <CheckCircle size={14} /> };
      case 'shipped': return { color: 'text-blue-600 bg-blue-50 border-blue-100', icon: <Truck size={14} /> };
      case 'pending': return { color: 'text-amber-600 bg-amber-50 border-amber-100', icon: <Clock size={14} /> };
      case 'processing': return { color: 'text-purple-600 bg-purple-50 border-purple-100', icon: <Package size={14} /> };
      case 'cancelled': return { color: 'text-rose-600 bg-rose-50 border-rose-100', icon: <XCircle size={14} /> };
      default: return { color: 'text-slate-500 bg-slate-50 border-slate-100', icon: <AlertCircle size={14} /> };
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.put(`/api/orders/${orderId}/status`, { status: 'cancelled' });
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: 'cancelled' } : o));
    } catch {
      alert("Failed to cancel order");
    }
  };

  return (
    <section className="max-w-6xl mx-auto bg-slate-50/50 min-h-screen pb-24 md:pb-8">
      {/* Mobile Sticky Header */}
      <div className="bg-white p-4 sticky top-0 z-30 border-b border-slate-100 md:relative md:border-none md:bg-transparent">
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">My Orders</h2>
            <p className="text-[11px] md:text-sm text-slate-500 font-medium">Tracking your lifestyle choices</p>
          </div>
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-pink-600 text-white text-[11px] font-bold rounded-xl shadow-lg shadow-pink-100 active:scale-95 transition-all">
            Shop More
          </button>
        </div>

        {/* Tabs - Mobile Optimized Scroll */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {orderTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab 
                ? 'bg-pink-600 text-white shadow-md shadow-pink-100 scale-105' 
                : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-0 mt-2 md:mt-0">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Updating History</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-4xl border border-slate-100">
            <ShoppingBasket size={48} className="mx-auto text-slate-200 mb-4" />
            <h4 className="text-lg font-bold text-slate-800">No {activeTab} Orders</h4>
            <p className="text-slate-500 text-sm px-10">Time to fill up your basket with something special!</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredOrders.map((order) => {
              const status = getStatusDetails(order.status);
              return (
                <div key={order._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  {/* Card Header */}
                  <div className="px-4 py-3 bg-slate-50/50 flex justify-between items-center border-b border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-600 uppercase tracking-tighter">ID: #{order._id?.slice(-8)}</span>
                      <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1"><CalendarDays size={12}/> {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border flex items-center gap-1.5 ${status.color}`}>
                      {status.icon} {order.status}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="p-4 space-y-4">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-3">
                        <div className="flex gap-3" onClick={() => navigate(`/product/${item.productId}`)}>
                          <img 
                            src={item?.images?.[0]} 
                            alt="" 
                            className="w-16 h-16 rounded-2xl object-cover bg-slate-100 border border-slate-50"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-bold text-slate-800 truncate">{item?.title}</h5>
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Qty: {item?.quantity} | ৳{item?.price}</p>
                            <div className="flex justify-between items-end mt-1">
                                <p className="text-sm font-black text-pink-600">৳{item?.price * item?.quantity}</p>
                                
                                {/* Action Buttons per Product */}
                                {order.status?.toLowerCase() === 'delivered' && (
                                  hasReviewed(item.productId, order._id) ? (
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Reviewed ✅</span>
                                  ) : (
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setReviewingProduct({ productId: item.productId, orderId: order._id });
                                      }}
                                      className="text-[10px] font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg active:scale-90"
                                    >
                                      Add Review
                                    </button>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer - Only Cancel button if Pending */}
                  {order.status?.toLowerCase() === 'pending' && (
                    <div className="px-4 py-3 bg-white border-t border-slate-50 flex justify-end">
                      <button 
                        onClick={() => handleCancelOrder(order._id)}
                        className="text-[11px] font-bold text-rose-500 px-4 py-2 border border-rose-100 rounded-xl hover:bg-rose-50"
                      >
                        Cancel Order
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Bottom Sheet Style Review Modal */}
      {reviewingProduct && (
        <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setReviewingProduct(null)}
          ></div>
          <div className="relative w-full max-w-lg bg-white rounded-t-4xl md:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center p-6 border-b bg-white">
              <h3 className="text-lg font-black text-slate-800">Write a Review</h3>
              <button 
                onClick={() => setReviewingProduct(null)}
                className="p-2 bg-slate-100 rounded-full text-slate-500 active:scale-90"
              >
                ✕
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <ReviewForm
                productId={reviewingProduct.productId}
                orderId={reviewingProduct.orderId}
                onCancel={() => setReviewingProduct(null)}
                onSuccess={async () => {
                  setReviewingProduct(null);
                  fetchMyReviews();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyOrders;



