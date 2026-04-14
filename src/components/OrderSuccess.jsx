


import React, { useEffect } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderSuccess = () => {
  const location = useLocation();
  // navigate থেকে পাঠানো state রিসিভ করা
  const order = location.state?.order;
  const navigate = useNavigate(); // এটি কম্পোনেন্টের ভেতরে উপরে লিখুন


useEffect(() => {
    // যখন ইউজার এই পেজে থাকবে, তখন ব্যাক বাটন চাপলে তাকে হোমে পাঠিয়ে দিবে
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate('/', { replace: true });
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  if (!order) {
    return <Navigate to="/" replace />;
  }



  const copyOrderId = () => {
    navigator.clipboard.writeText(order._id.slice(-8).toUpperCase());
    toast.success('আইডি কপি করা হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-4xl shadow-2xl p-8 text-center border border-gray-100">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-50 p-5 rounded-full animate-pulse">
            <CheckCircle size={70} className="text-green-500" strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">ধন্যবাদ!</h2>
        <p className="text-gray-500 mb-8 px-4">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আমাদের একজন প্রতিনিধি কল করবেন।
        </p>

        {/* Dynamic Order Card */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left border border-gray-100 relative group">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-gray-400 text-sm uppercase tracking-wider font-semibold">অর্ডার আইডি</span>
              <button 
                onClick={copyOrderId}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span className="font-mono font-semibold text-[16px]">#{order._id.slice(-8).toUpperCase()}</span>
                <Copy size={14} />
              </button>
            </div>

               <div className="flex justify-between">
            <span className="text-gray-500 font-semibold text-sm">ডেলিভারি সময়:</span>
             <span className="text-gray-500 font-semibold text-sm">২-৩ কার্যদিবস</span>
           </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-semibold text-sm">মোট পেমেন্ট:</span>
              <span className="font-bold text-gray-800 text-lg">
                ৳{order.totalAmount || order.totalPrice || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          {/* <Link
            to="/my-orders"
            className="w-full bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
          >
            অর্ডার ট্র্যাক করুন <ArrowRight size={20} />
          </Link> */}
          
          <button
            onClick={()=>navigate('/')}
            className="w-full bg-white text-gray-700 py-4 rounded-2xl font-semibold border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            <ShoppingBag size={20} /> আরও কেনাকাটা করুন <ArrowRight size={20} />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
          প্রয়োজনে সাপোর্ট টিমে কথা বলুন: <br/>
          <span className="text-gray-600 font-medium">+৮৮০১৭XXXXXXXX</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;