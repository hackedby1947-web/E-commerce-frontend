import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import api from '../api';
import { CreditCard, Truck, ChevronLeft, ShieldCheck, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Payment = () => {
  const { state: checkoutData } = useLocation();
  const [method, setMethod] = useState('cod'); // Default 'cod'
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // যদি কোনো কারণে checkoutData না থাকে, তবে ব্যাকে পাঠিয়ে দিবে
  if (!checkoutData) {
    return <Navigate to="/checkout" replace />;
  }

  const handleFinalOrder = async () => {
    setLoading(true);
    try {
      // ধাপ ১: আগে অর্ডারটি সেভ করুন
      const orderPayload = {
        ...checkoutData,
        paymentMethod: method,
      };

      const { data: orderRes } = await api.post("/api/orders", orderPayload);
      const orderId = orderRes.order._id;

      // ধাপ ২: পেমেন্ট মেথড চেক করা
      if (method === 'online') {
        // আপনার ব্যাকএন্ড রাউট অনুযায়ী পেমেন্ট সেশন শুরু করা
        const { data: paymentRes } = await api.get(`/api/payment/init/${orderId}`);
        
        if (paymentRes.url) {
          window.location.replace(paymentRes.url); // SSLCommerz গেটওয়েতে রিডাইরেক্ট
        } else {
          toast.error("পেমেন্ট গেটওয়ে লোড করা যায়নি");
        }
      } else {
        // Cash on Delivery এর ক্ষেত্রে সরাসরি সাকসেস পেজ
        toast.success("অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!");
        navigate(`/order-success/${orderId}`, { 
          state: { order: orderRes.order },
          replace: true 
        });
      }
    } catch (err) {
      console.error("Order process error:", err);
      toast.error(err.response?.data?.message || "অর্ডার সম্পন্ন করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Back Button & Header */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-500 mb-6 hover:text-black transition-colors"
        >
          <ChevronLeft size={20} /> <span className="text-sm font-medium">ফিরে যান</span>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-bengali">পেমেন্ট মেথড</h2>
        <p className="text-gray-500 mb-8 text-sm">আপনার পছন্দের পেমেন্ট মাধ্যমটি নির্বাচন করুন।</p>

        {/* Payment Methods */}
        <div className="space-y-4 mb-8">
          {/* Cash on Delivery */}
          <div 
            onClick={() => setMethod('cod')} 
            className={`group p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
              method === 'cod' ? 'border-black bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${method === 'cod' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Truck size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">পণ্য হাতে পেয়ে পেমেন্ট করুন</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-black' : 'border-gray-300'}`}>
                {method === 'cod' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
              </div>
            </div>
          </div>

          {/* Online Payment */}
          <div 
            onClick={() => setMethod('online')} 
            className={`group p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
              method === 'online' ? 'border-blue-600 bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${method === 'online' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <CreditCard size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Online Payment</p>
                  <p className="text-xs text-gray-500">SSLCommerz (বিকাশ, কার্ড, নগদ)</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'online' ? 'border-blue-600' : 'border-gray-300'}`}>
                {method === 'online' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">অর্ডার টোটাল:</span>
            <span className="font-bold text-gray-900">৳{checkoutData.itemsTotal}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">ডেলিভারি ফি:</span>
            <span className="font-bold text-gray-900">৳{checkoutData.deliveryFee}</span>
          </div>
          <div className="h-px bg-gray-100 mb-4" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">মোট প্রদেয়:</span>
            <span className="text-2xl font-black text-orange-600 font-mono italic">৳{checkoutData.grandTotal}</span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mb-8 text-gray-400">
          <ShieldCheck size={16} />
          <span className="text-[10px] uppercase font-bold tracking-widest">100% Secure Checkout</span>
        </div>

        {/* Final Button */}
        <button 
          onClick={handleFinalOrder} 
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-zinc-800'
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>অর্ডার কনফার্ম করুন <ArrowRight size={20} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;