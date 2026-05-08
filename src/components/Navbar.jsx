

// import { useCart } from "../context/CartContext";
// import { ShoppingCart, User, Search, Home, Box, Mic, Scan } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/useAuth";
// import {  useState } from "react";

// export default function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const { cartItems } = useCart();

//   const handleProfileClick = () => {
//     isAuthenticated ? navigate("/profile") : navigate("/login");
//   };

//   const [search, setSearch] = useState("");
 

// const handleSearch = (e) => {
//   if (e.key === "Enter") {
//     navigate(`/categories?search=${search}`);
//   }
// };

//   const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
//   const categories = ["All", "Men", "Women", "Phones", "Watches", "Grocery"];

//   return (
//     <>
//       <nav className="sticky top-0 z-50 bg-indigo-900 shadow-md">
//         {/* DESKTOP VIEW (Unchanged) */}
//         <div className="hidden md:flex max-w-7xl mx-auto px-6 py-3 items-center justify-between border-b border-white/10">
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">M</div>
//             <h1 className="text-xl font-bold text-white">Mou Shop</h1>
//           </Link>
//           <div className="flex items-center gap-8">
//             <div className="relative">
//               <Search  size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// <input
//   type="text"
//   placeholder="Search..."
//   value={search}
//   onChange={(e) => {
//     setSearch(e.target.value);
//     // new search এ page reset
//   }}
//   onKeyDown={handleSearch}
//   className="w-80 pl-11 pr-5 py-2 bg-gray-100 rounded-full focus:outline-none"
// />

//             </div>
//             <div className="flex gap-6 font-medium text-white">
//               <Link to="/">Home</Link>
//               <Link to="/trendingproducts">Products</Link>
//               <Link to="/categories" className="hover:text-indigo-600 transition">Category</Link>
//               <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
//             </div>
//           </div>
//           <div className="flex items-center gap-5">
//             {/* <Link to="/cart" className="relative text-white"><ShoppingCart size={24} /></Link> */}
//                 <Link to="/cart" className="relative hidden md:block">
//                <ShoppingCart size={24} className="text-slate-100 hover:text-indigo-600" />
//               {cartCount > 0 && (
              
//              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                {cartCount}
            
//              </span>
//           )}
//            </Link>

//             <button onClick={handleProfileClick} className="text-white"><User size={24} /></button>
//           </div>
//         </div>

//         {/* MOBILE COMPACT VIEW (Optimized) */}
//         <div className="md:hidden">
//           {/* Search Row */}
//           <div className="px-3 pt-2 pb-1 flex items-center gap-2">
//             <div className="relative flex-1 flex items-center bg-white rounded-lg overflow-hidden h-10 shadow-inner">
//               <input
//                 type="text"
//                 placeholder="T-shirt"
//                 className="w-full pl-3 pr-16 py-1 text-sm text-gray-700 focus:outline-none"
//               />
//               <Mic size={18} className="absolute right-11 text-gray-400" />
//               <button className="absolute right-0 top-0 bottom-0 bg-red-800 text-white px-3 flex items-center justify-center">
//                 <Search size={18} />
//               </button>
//             </div>
//             <button className="bg-white/10 p-2 rounded-lg border border-white/20 text-white h-10 w-10 flex items-center justify-center">
//               <Scan size={20} />
//             </button>
//           </div>

//           {/* Compact Category Tabs */}
//           <div className="flex gap-5 overflow-x-auto no-scrollbar px-3 py-1.5 text-white/80 border-t border-white/5">
//             {categories.map((cat, index) => (
//               <button
//                 key={index}
//                 className={`text-[13px] whitespace-nowrap transition-all ${
//                   index === 0 ? "text-white font-bold border-b-2 border-white" : "opacity-70"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE BOTTOM NAV */}
//       <div className="fixed bottom-0 left-0 w-full z-50 bg-slate-900 text-white border-t border-white/10 md:hidden h-14">
//         <div className="flex justify-around items-center h-full">
//           <Link to="/" className="flex flex-col items-center">
//             <Home size={20} className={location.pathname === "/" ? "text-indigo-400" : "text-gray-400"} />
//             <span className="text-[9px] mt-0.5">Home</span>
//           </Link>
//           <Link to="/trendingproducts" className="flex flex-col items-center">
//             <Box size={20} className={location.pathname === "/trendingproducts" ? "text-indigo-400" : "text-gray-400"} />
//             <span className="text-[9px] mt-0.5">Products</span>
//           </Link>
//           <Link to="/cart" className="flex flex-col items-center relative">
//             <ShoppingCart size={20} className={location.pathname === "/cart" ? "text-indigo-400" : "text-gray-400"} />
//             <span className="text-[9px] mt-0.5">Cart</span>
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//           <button onClick={handleProfileClick} aria-label="প্রোফাইল দেখুন" className="flex flex-col items-center">
//             <User size={20} className={location.pathname === "/profile" ? "text-indigo-400" : "text-gray-400"} />
//             <span className="text-[9px] mt-0.5">Profile</span>
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </>
//   );
// }


import { useCart } from "../context/CartContext";
import { ShoppingCart, User, Search, Home, Box, Mic, Scan } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // আপনার পাথ অনুযায়ী ঠিক করে নিন
import { useState } from "react";
// import BottomNav from "./BottomNav";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const [search, setSearch] = useState("");



// Navbar ফাংশনের ভেতরে:
const [searchParams] = useSearchParams();
const activeCat = searchParams.get("category") || "All"; // URL থেকে বর্তমান ক্যাটাগরি জানা

const handleCategoryClick = (cat) => {
  // ক্যাটাগরিতে ক্লিক করলে হোম পেজেই থাকবে শুধু URL-এ ?category= নাম যোগ হবে
  if (cat === "All") {
    navigate("/");
  } else {
    navigate(`/?category=${cat}`);
  }
};



  const handleProfileClick = () => {
    isAuthenticated ? navigate("/profile") : navigate("/login");
  };

  // সার্চ ফাংশন (ডেস্কটপ ও মোবাইল উভয়ের জন্য)
  const executeSearch = () => {
    if (search.trim()) {
      navigate(`/categories?search=${search.trim()}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const categories = ["All", "Women", "Men", "Phones", "Watches", "Grocery"];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-indigo-900 shadow-md">
        {/* DESKTOP VIEW */}
        <div className="hidden md:flex max-w-7xl mx-auto px-6 py-3 items-center justify-between border-b border-white/10">
          <Link to="/" aria-label="home" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl overflow-hidden">
  <img
    src="/favicon.svg"
    alt="RoyalcartX"
    className="w-full h-full object-cover"
  />
</div>
            <h1 className="text-xl font-bold text-white">RoyalcartX</h1>
          </Link>

          <div className="flex items-center gap-8">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-80 pl-11 pr-5 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800"
              />
            </div>
            <div className="flex gap-6 font-medium text-white">
              <Link to="/" className="hover:text-indigo-300">Home</Link>
              <Link to="/trendingproducts" className="hover:text-indigo-300">Products</Link>
              <Link to="/categories" className="hover:text-indigo-300">Category</Link>
              <Link to="/contact" className="hover:text-indigo-300">Contact</Link>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link to="/cart" aria-label="কার্ট দেখুন" className="relative">
              <ShoppingCart size={24} className="text-slate-100 hover:text-indigo-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-900">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={handleProfileClick} aria-label="প্রোফাইল দেখুন" className="text-white hover:text-indigo-300">
              <User size={24} />
            </button>
          </div>
        </div>

        {/* MOBILE COMPACT VIEW */}
        <div className="md:hidden">
          <div className="px-3 pt-2 pb-1 flex items-center gap-2">
            <div className="relative flex-1 flex items-center bg-white rounded-lg overflow-hidden h-10 shadow-inner">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-3 pr-20 py-1 text-sm text-gray-700 focus:outline-none"
              />
              <Mic aria-hidden="true" size={18} className="absolute right-12 text-gray-400" />
              <button 
                onClick={executeSearch}
                aria-label="Search" className="absolute right-0 top-0 bottom-0 bg-indigo-600 text-white px-4 flex items-center justify-center active:bg-indigo-700"
              >
                <Search size={18} />
              </button>
            </div>
            <button aria-label="Scan" className="bg-white/10 p-2 rounded-lg border border-white/20 text-white h-10 w-10 flex items-center justify-center">
              <Scan size={20} />
            </button>
          </div>

          {/* Compact Category Tabs */}
          <div className="flex gap-5 overflow-x-auto no-scrollbar px-3 py-1.5 text-white/80 border-t border-white/5">
            {categories.map((cat, index) => (
  <button
    key={index}
    onClick={() => handleCategoryClick(cat)}
    /* "inline-flex flex-col items-center" ব্যবহার করে উইডথ লক করা হয়েছে */
    className={`relative text-[13px] whitespace-nowrap transition-all duration-300 pb-1 border-b-2 inline-flex flex-col items-center ${
      activeCat === cat 
        ? "text-white font-bold border-white" 
        : "opacity-70 text-white/80 border-transparent"
    }`}
  >
    {/* মেইন টেক্সট */}
    {cat}

    {/* ইনভিজিবল বোল্ড টেক্সট: এটি বাটনকে আগে থেকেই বোল্ড উইডথ দিয়ে রাখবে যাতে ক্লিক করলে সাইজ না বাড়ে */}
    <span className="invisible h-0 font-bold block" aria-hidden="true">
      {cat}
    </span>
  </button>
))}

          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-slate-900 text-white border-t border-white/10 md:hidden h-14">
        <div className="flex justify-around items-center h-full">
          <Link to="/" className="flex flex-col items-center">
            <Home size={20} className={location.pathname === "/" ? "text-indigo-400" : "text-gray-400"} />
            <span className="text-[9px] mt-0.5">Home</span>
          </Link>
          <Link to="/trendingproducts" className="flex flex-col items-center">
            <Box size={20} className={location.pathname === "/trendingproducts" ? "text-indigo-400" : "text-gray-400"} />
            <span className="text-[9px] mt-0.5">Products</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center relative">
            <ShoppingCart size={20} className={location.pathname === "/cart" ? "text-indigo-400" : "text-gray-400"} />
            <span className="text-[9px] mt-0.5">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={handleProfileClick} aria-label="প্রোফাইল দেখুন" className="flex flex-col items-center">
            <User size={20} className={location.pathname === "/profile" ? "text-indigo-400" : "text-gray-400"} />
            <span className="text-[9px] mt-0.5">Profile</span>
          </button>
        </div>
      </div>
      {/* <BottomNav/> */}

    
    </>
  );
}


