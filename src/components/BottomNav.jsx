// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Home from "../pages/Home";
// import { Box, ShoppingCart, User } from "lucide-react";
// import { useAuth } from "../context/useAuth";
// import { useCart } from "../context/CartContext";

// export default function BottomNav() {
//       const location = useLocation();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const { cartItems } = useCart();

//   const handleProfileClick = () => {
//     isAuthenticated ? navigate("/profile") : navigate("/login");
//   };
//   const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

//     return (
//          <div className="fixed bottom-0 left-0 w-full z-50 bg-slate-900 text-white border-t border-white/10 md:hidden h-14">
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
//           <button onClick={handleProfileClick} className="flex flex-col items-center">
//             <User size={20} className={location.pathname === "/profile" ? "text-indigo-400" : "text-gray-400"} />
//             <span className="text-[9px] mt-0.5">Profile</span>
//           </button>
//         </div>
//       </div>
//     )
// }