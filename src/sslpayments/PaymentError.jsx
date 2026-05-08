import React from 'react';
import { useNavigate } from 'react-router-dom'; // Link এর বদলে useNavigate ভালো কাজ করবে
import { XCircle, RefreshCw, MessageSquare, ChevronLeft } from 'lucide-react';

const PaymentError = () => {
  const navigate = useNavigate();

  // আবার চেষ্টা করার ফাংশন
  const handleRetry = () => {
    // navigate(-1) দিলে ইউজার ঠিক আগের যে পেজ থেকে এখানে এসেছিল সেখানে ফিরে যাবে
    // সাধারণত এটি পেমেন্ট মেথড সিলেক্ট করার পেজ হয়।
    navigate(-1); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center bg-gray-50">
      <div className="bg-white p-10 rounded-[2.5rem] border border-red-50 max-w-md w-full shadow-xl">
        
        {/* Error Icon */}
        <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
           <XCircle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2 font-bengali tracking-tight">পেমেন্ট সফল হয়নি!</h1>
        <p className="text-gray-500 mb-10 text-sm leading-relaxed">
          দুঃখিত, আপনার পেমেন্ট প্রসেস করার সময় একটি সমস্যা হয়েছে। আপনার কার্ড বা ওয়ালেটে পর্যাপ্ত ব্যালেন্স আছে কি না চেক করে আবার চেষ্টা করুন।
        </p>
        
        <div className="flex flex-col gap-4">
          {/* Retry Button */}
          <button 
            onClick={handleRetry}
            className="flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-200"
          >
            <RefreshCw size={20} /> আবার চেষ্টা করুন
          </button>

          {/* Support Button */}
          <button aria-label="হোমে ফিরে যান" className="flex items-center justify-center gap-2 border-2 border-gray-100 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all text-gray-700 active:scale-95">
            <MessageSquare size={20} /> কাস্টমার সাপোর্টে কথা বলুন
          </button>
        </div>

        {/* Home Link */}
        <button 
          onClick={() => navigate('/')}
          className="mt-8 text-gray-400 text-sm font-medium hover:text-black transition-colors flex items-center justify-center gap-1 mx-auto"
        >
          <ChevronLeft size={16} /> হোম পেজে ফিরে যান
        </button>
      </div>
    </div>
  );
};

export default PaymentError;