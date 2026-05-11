import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0f172a] text-white">
      {/* Upper Footer: Newsletter / Branding */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              RoyalCartX
            </h2>
            <p className="text-gray-400 mt-2 max-w-sm">
              আমাদের প্রিমিয়াম কালেকশন থেকে আপনার পছন্দের পণ্যটি বেছে নিন।
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="আপনার ইমেইল..." 
              className="bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            />
            <button aria-label="সাবস্ক্রাইব করুন" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium transition-all active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-l-4 border-indigo-500 pl-3">আমাদের সম্পর্কে</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            RoyalCartX একটি আধুনিক ই-কমার্স প্ল্যাটফর্ম যেখানে আপনি পাচ্ছেন প্রিমিয়াম কোয়ালিটি পণ্য এবং দ্রুত ডেলিভারির নিশ্চয়তা।
          </p>
          <div className="flex gap-4 pt-2">
            <a href="https://www.facebook.com/royalsareehouse1" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-all group">
              <Facebook size={20} className="text-gray-400 group-hover:text-white" />
            </a>
            <a href="https://www.instagram.com/royalsareehouse1" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-all group">
              <Instagram size={20} className="text-gray-400 group-hover:text-white" />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-all group">
              <Twitter size={20} className="text-gray-400 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-l-4 border-indigo-500 pl-3">প্রয়োজনীয় লিঙ্ক</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-indigo-400 flex items-center gap-2"><ExternalLink size={14}/> হোম পেজ</Link></li>
            <li><Link to="/categories" className="hover:text-indigo-400 flex items-center gap-2"><ExternalLink size={14}/> শপ</Link></li>
            <li><Link to="/profile/my-order" className="hover:text-indigo-400 flex items-center gap-2"><ExternalLink size={14}/> আমার অর্ডার</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 flex items-center gap-2"><ExternalLink size={14}/> যোগাযোগ</Link></li>
          </ul>
        </div>

        {/* Support/Policies */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-l-4 border-indigo-500 pl-3">পলিসি ও সাপোর্ট</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer"
            onClick={() => navigate('/refund-policy')}
            >রিফান্ড পলিসি</li>
            <li className="hover:text-indigo-400 cursor-pointer"
            onClick={() => navigate('/privacy-policy')}
            >গোপনীয়তা নীতি</li>
            <li className="hover:text-indigo-400 cursor-pointer"
            onClick={() => navigate('/terms')}
            >শর্তাবলী</li>
            <li className="hover:text-indigo-400 cursor-pointer"
            onClick={() => navigate('/faqs')}
            >FAQs</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-l-4 border-indigo-500 pl-3">যোগাযোগ</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-indigo-500 shrink-0" />
              <span>ঢাকা, বাংলাদেশ</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-indigo-500 shrink-0" />
              <span>+880 1XXX-XXXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-indigo-500 shrink-0" />
              <span>support@royalcartX.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      {/* <div className="bg-[#0a0f1d] py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-medium">
          <p>© 2026 <span className="text-indigo-400">RoyalCartX</span>. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3 opacity-50 grayscale hover:grayscale-0 transition-all" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div> */}

          {/* Payment Methods Section */}
      <div className="border-t border-gray-800 bg-[#0c1220]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-4">
            নিরাপদ পেমেন্ট পদ্ধতি
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">

            {/* bKash */}
            <div className="flex items-center gap-1.5 rounded-xl bg-[#e2136e] px-4 py-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-900/30">
              <span className="text-base">📱</span>
              <span className="text-sm font-bold text-white tracking-wide">bKash</span>
            </div>

            {/* Nagad */}
            <div className="flex items-center gap-1.5 rounded-xl bg-[#f15a22] px-4 py-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-900/30">
              <span className="text-base">💛</span>
              <span className="text-sm font-bold text-white tracking-wide">Nagad</span>
            </div>

            {/* Rocket */}
            <div className="flex items-center gap-1.5 rounded-xl bg-[#8b1fa8] px-4 py-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-900/30">
              <span className="text-base">🚀</span>
              <span className="text-sm font-bold text-white tracking-wide">Rocket</span>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-700 mx-1" />

            {/* Visa */}
            <div className="flex items-center justify-center rounded-xl bg-[#1a1f71] px-5 py-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-900/30">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-4 w-auto brightness-0 invert"
              />
            </div>

            {/* Mastercard */}
            <div className="flex items-center justify-center gap-1 rounded-xl bg-gray-800 px-4 py-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-gray-900/50">
              {/* Mastercard circles */}
              <div className="relative flex items-center">
                <div className="h-6 w-6 rounded-full bg-[#eb001b] opacity-90" />
                <div className="h-6 w-6 rounded-full bg-[#f79e1b] opacity-90 -ml-2.5" />
              </div>
              <span className="text-xs font-bold text-gray-300 ml-1">Mastercard</span>
            </div>

            {/* Cash on Delivery */}
            <div className="flex items-center gap-1.5 rounded-xl bg-emerald-800/60 border border-emerald-700/50 px-4 py-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-900/30">
              <span className="text-base">💵</span>
              <span className="text-xs font-semibold text-emerald-400 tracking-wide">Cash on Delivery</span>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#0a0f1d] py-5 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-gray-500 text-sm">
          <p>© 2026 <span className="text-indigo-400 font-medium">RoyalCartX</span>. All rights reserved.</p>
          <p className="text-xs text-gray-600">🔒  Secured · আপনার তথ্য সম্পূর্ণ নিরাপদ</p>
        </div>
      </div>


    </footer>
  );
}