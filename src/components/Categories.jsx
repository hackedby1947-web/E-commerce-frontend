

// import React, { useEffect, useState } from "react";
// import { Loader2, Star, Truck } from "lucide-react";
// import { Link } from "react-router-dom";
// import api from "../api";

// export default function Categories() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await api.get("/api/products?status=published");
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center pt-32 h-screen bg-slate-100">
//         <Loader2 className="animate-spin text-indigo-600" size={40} />
//         <p className="text-slate-500 font-bold">Products Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-4">Categories</h2>

//       {/* আপনার আগের গ্রিড ডিজাইন যা আপনি চেয়েছিলেন */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {products.map((prod) => (
//           <Link key={prod._id} to={`/product/${prod._id}`}>
//             <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer border border-gray-50 h-full flex flex-col">
              
//               {/* Image Section - Height কমানো হয়েছে (মোবাইলে h-40, পিসিতে h-44) */}
//               <div className="relative">
//                 <img
//                   src={thumbImage(prod.images[0])}
                    // loading="lazy"
//                   alt={prod.title}
//                   className="w-full h-40 md:h-44 object-cover" // আগে h-56 ছিল, এখন কমানো হয়েছে
//                 />

//                 {/* Discount Badge */}
//                 {prod.oldprice && prod.price && prod.oldprice > prod.price && (
//                   <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
//                     -{Math.round(((prod.oldprice - prod.price) / prod.oldprice) * 100)}% OFF
//                   </span>
//                 )}



//                 {/* Free Delivery Badge */}
//                 {!prod.deliveryEnabled && (
//                   <div className="absolute bottom-0 left-0 right-0 bg-[#00A1DE] text-white flex items-center justify-center gap-2 py-1.5 px-2 rounded-t z-10 shadow-md">
//                     <Truck size={16} className="text-white" />
//                     <span className="text-xs font-bold uppercase tracking-wide">
//                       FREE DELIVERY
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Product Info Section */}
//               <div className="p-2 grow flex flex-col">
//                 <h3 className="text-sm font-semibold text-slate-900 truncate" title={prod.title}>
//                   {prod.title}
//                 </h3>
//                 <p className={`text-[11px] font-bold  ${prod.inStock ? "text-green-600" : "text-red-500 animate-pulse"}  md:text-[11px] text-[6px] `}>
//   {prod.inStock ? "" : "Out of Stock"}
// </p>
//                 <div className="flex items-center justify-between mt-1 mb-1">
//                   <span className="text-orange-500 font-bold">৳{prod.price}</span>
//                   <span className="text-gray-400 text-xs line-through">৳{prod.oldprice}</span>
//                 </div>

//                 {/* Ratings (নিচে ফিক্সড রাখা হয়েছে) */}
//                 <div className="mt-auto flex items-center justify-between">
//                   <div className="flex items-center">
//                     <span className="flex items-center gap-0.5 text-yellow-400">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <Star
//                           key={i}
//                           size={12}
//                           className={i < Math.floor(prod.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//                         />
//                       ))}
//                     </span>
//                     <span className="text-gray-500 text-[10px] ml-1">({prod.totalRatings})</span>
//                   </div>
 
//                 </div>
               
//               </div>

//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Loader2, Star, Truck } from "lucide-react";
// import { Link, useLocation } from "react-router-dom"; // useLocation যোগ করা হয়েছে
// import api from "../api";

// export default function Categories() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // URL থেকে সার্চ কুয়েরি ধরার জন্য
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const searchQuery = searchParams.get("search") || "";

// useEffect(() => {
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/api/products", {
//         params: {
//           status: "published",
//           search: searchQuery // এটি ব্যাকএন্ডে যাচ্ছে
//         }
//       });

//       console.log("Original Data from API:", res.data);

//       // ব্যাকএন্ড যদি ফিল্টার না করে সব পাঠায়, তবে আমরা এখানে ম্যানুয়ালি ফিল্টার করবো
//       const allProducts = Array.isArray(res.data) ? res.data : (res.data.products || []);

//       if (searchQuery.trim() !== "") {
//         // টাইটেল এর সাথে সার্চ কিউয়েরি ম্যাচ করানো হচ্ছে
//         const filtered = allProducts.filter((prod) =>
//           prod.title.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setProducts(filtered);
//       } else {
//         setProducts(allProducts);
//       }

//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchProducts();
// }, [searchQuery]);

// if (loading) {
//     return (
//       <div className="flex flex-col items-center pt-32 h-screen bg-slate-100">
//         <Loader2 className="animate-spin text-indigo-600" size={40} />
//         <p className="text-slate-500 font-bold">Products Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6">
//       <h2 className="text-2xl font-bold text-slate-900 mb-4">
//         {searchQuery ? `Search Results for "${searchQuery}"` : "Categories"}
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {products.length > 0 ? (
//           products.map((prod) => (
//             <Link key={prod._id} to={`/product/${prod._id}`}>
//               <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer border border-gray-50 h-full flex flex-col">
                
//                 {/* Image Section */}
//                 <div className="relative">
//                   <img
//                     src={thumbImage(prod.images[0])}
                    // loading="lazy"
//                     alt={prod.title}
//                     className="w-full h-40 md:h-44 object-cover"
//                   />

//                   {/* Discount Badge */}
//                   {prod.oldprice && prod.price && prod.oldprice > prod.price && (
//                     <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
//                       -{Math.round(((prod.oldprice - prod.price) / prod.oldprice) * 100)}% OFF
//                     </span>
//                   )}

//                   {/* Free Delivery Badge */}
//                   {!prod.deliveryEnabled && (
//                     <div className="absolute bottom-0 left-0 right-0 bg-[#00A1DE] text-white flex items-center justify-center gap-2 py-1.5 px-2 rounded-t z-10 shadow-md">
//                       <Truck size={16} className="text-white" />
//                       <span className="text-xs font-bold uppercase tracking-wide">
//                         FREE DELIVERY
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Product Info Section */}
//                 <div className="p-2 grow flex flex-col">
//                   <h3 className="text-sm font-semibold text-slate-900 truncate" title={prod.title}>
//                     {prod.title}
//                   </h3>
//                   <p className={`text-[11px] font-bold ${prod.inStock ? "text-green-600" : "text-red-500 animate-pulse"}`}>
//                     {prod.inStock ? "" : "Out of Stock"}
//                   </p>
//                   <div className="flex items-center justify-between mt-1 mb-1">
//                     <span className="text-orange-500 font-bold">৳{prod.price}</span>
//                     <span className="text-gray-400 text-xs line-through">৳{prod.oldprice}</span>
//                   </div>

//                   {/* Ratings */}
//                   <div className="mt-auto flex items-center justify-between">
//                     <div className="flex items-center">
//                       <span className="flex items-center gap-0.5 text-yellow-400">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <Star
//                             key={i}
//                             size={12}
//                             className={i < Math.floor(prod.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//                           />
//                         ))}
//                       </span>
//                       <span className="text-gray-500 text-[10px] ml-1">({prod.totalRatings})</span>
//                     </div>
//                   <h1 className="text-gray-600 font-semibold text-[10px] md:text-sm ml-auto">Sold ({prod.totalSold})</h1>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-20">
//             <p className="text-gray-500 text-lg">আপনার সার্চ করা পণ্যটি পাওয়া যায়নি।</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { Loader2, Star, Truck } from "lucide-react";
import { thumbImage } from "../utils/imageOptimizer";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {

  // URL search
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // 🔥 API FUNCTION
  const fetchProducts = async () => {
    const res = await api.get("/api/products", {
      params: {
        status: "published",
        search: searchQuery
      }
    });

    const allProducts = Array.isArray(res.data)
      ? res.data
      : (res.data.products || []);

    return allProducts;
  };

  // 🔥 REACT QUERY (CACHE SYSTEM)
  const { data, isLoading } = useQuery({
    queryKey: ['products', searchQuery],
    queryFn: fetchProducts,
    keepPreviousData: true,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // 🔥 frontend filtering (UI unchanged logic)
  const products =
    searchQuery.trim() !== ""
      ? data?.filter((prod) =>
          prod.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data || [];

  // LOADING UI (same as before)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center pt-32 h-screen bg-slate-100">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-slate-500 font-bold">Products Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">

      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Categories"}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

        {products.length > 0 ? (
          products.map((prod) => (
            <Link key={prod._id} to={`/product/${prod._id}`}>

              {/* 🔥 ALL YOUR DESIGN KEPT SAME */}
              <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer border border-gray-50 h-full flex flex-col">

                <div className="relative">
                  <img
                    src={thumbImage(prod.images[0])}
                    loading="lazy"
                    alt={prod.title}
                    className="w-full h-40 md:h-44 object-cover"
                  />

                  {prod.oldprice && prod.price && prod.oldprice > prod.price && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      -{Math.round(((prod.oldprice - prod.price) / prod.oldprice) * 100)}% OFF
                    </span>
                  )}

                  {!prod.deliveryEnabled && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#00A1DE] text-white flex items-center justify-center gap-2 py-1.5 px-2 rounded-t z-10 shadow-md">
                      <Truck size={16} />
                      <span className="text-xs font-bold uppercase">
                        FREE DELIVERY
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-2 grow flex flex-col">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {prod.title}
                  </h3>

                  <p className={`text-[11px] font-bold ${prod.inStock ? "text-green-600" : "text-red-500 animate-pulse"}`}>
                    {prod.inStock ? "" : "Out of Stock"}
                  </p>

                  <div className="flex items-center justify-between mt-1 mb-1">
                    <span className="text-orange-500 font-bold">৳{prod.price}</span>
                    <span className="text-gray-400 text-xs line-through">৳{prod.oldprice}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="flex items-center gap-0.5 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < Math.floor(prod.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </span>
                      <span className="text-gray-500 text-[10px] ml-1">
                        ({prod.totalRatings})
                      </span>
                    </div>

                    <h1 className="text-gray-600 font-semibold text-[10px] md:text-sm ml-auto">
                      Sold ({prod.totalSold})
                    </h1>
                  </div>

                </div>
              </div>

            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 text-lg">
              আপনার সার্চ করা পণ্যটি পাওয়া যায়নি।
            </p>
          </div>
        )}

      </div>
    </div>
  );
}