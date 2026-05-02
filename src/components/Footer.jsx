import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0f172a] text-white mt-20">
      {/* Upper Footer: Newsletter / Branding */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              RoyalCarti
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
            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium transition-all active:scale-95">
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
            RoyalCarti একটি আধুনিক ই-কমার্স প্ল্যাটফর্ম যেখানে আপনি পাচ্ছেন প্রিমিয়াম কোয়ালিটি পণ্য এবং দ্রুত ডেলিভারির নিশ্চয়তা।
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-all group">
              <Facebook size={20} className="text-gray-400 group-hover:text-white" />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-all group">
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
            <li><Link to="/shop" className="hover:text-indigo-400 flex items-center gap-2"><ExternalLink size={14}/> শপ</Link></li>
            <li><Link to="/orders" className="hover:text-indigo-400 flex items-center gap-2"><ExternalLink size={14}/> আমার অর্ডার</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 flex items-center gap-2"><ExternalLink size={14}/> যোগাযোগ</Link></li>
          </ul>
        </div>

        {/* Support/Policies */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-l-4 border-indigo-500 pl-3">পলিসি ও সাপোর্ট</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer">রিফান্ড পলিসি</li>
            <li className="hover:text-indigo-400 cursor-pointer"
            onClick={() => navigate('/privacy-policy')}
            >গোপনীয়তা নীতি</li>
            <li className="hover:text-indigo-400 cursor-pointer">শর্তাবলী</li>
            <li className="hover:text-indigo-400 cursor-pointer">FAQs</li>
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
              <span>support@royalcarti.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#0a0f1d] py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-medium">
          <p>© 2026 <span className="text-indigo-400">RoyalCarti</span>. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3 opacity-50 grayscale hover:grayscale-0 transition-all" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}