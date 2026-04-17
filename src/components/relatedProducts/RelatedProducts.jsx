// import { useNavigate } from "react-router-dom";
// import api from "../../api";
// import { useQuery } from "@tanstack/react-query";
// import { Star, Truck } from "lucide-react";

// export default function RelatedProducts({ category, currentId }) {
//   const navigate = useNavigate();

//   const fetchRelated = async () => {
//     const res = await api.get("/api/products");

//     return res.data.filter(
//       (p) =>
//         p.category === category &&
//         p._id !== currentId
//     );
//   };

//   const {
//     data: relatedProducts = [],
//     isLoading,
//   } = useQuery({
//     queryKey: ["related-products", category],
//     queryFn: fetchRelated,
//     enabled: !!category,
//     staleTime: 1000 * 60 * 5,
//     refetchOnWindowFocus: false,
//   });

//   // 🔥 Loading Skeleton (Trending style)
//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         <h2 className="text-2xl font-bold mb-6 text-slate-900">
//           Related Products
//         </h2>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div
//               key={i}
//               className="h-56 bg-gray-200 animate-pulse rounded-lg"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!relatedProducts.length) return null;

//   const limitedProducts = relatedProducts.slice(0, 4);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-slate-900">
//           Related Products
//         </h2>

//         {/* {relatedProducts.length > 4 && (
//           <button
//             onClick={() => navigate(`/category/${category}`)}
//             className="text-sm font-semibold text-indigo-600 hover:underline"
//           >
//             View More →
//           </button>
//         )} */}
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

//         {limitedProducts.map((prod) => (
//           <div
//             key={prod._id}
//             onClick={() => navigate(`/product/${prod._id}`)}
//             className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer border border-gray-50 h-full flex flex-col"
//           >

//             {/* IMAGE */}
//             <div className="relative">
//               <img
//                 src={prod.images?.[0] || "/placeholder.jpg"}
//                 alt={prod.title}
//                 className="w-full h-40 md:h-44 object-cover"
//               />

//               {/* Discount Badge */}
//               {prod.oldprice && prod.price && prod.oldprice > prod.price && (
//                 <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded z-10">
//                   -{Math.round(((prod.oldprice - prod.price) / prod.oldprice) * 100)}%
//                 </span>
//               )}

//               {/* Out of Stock */}
//               {!prod.inStock && (
//                 <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] text-center py-1">
//                   Out of Stock
//                 </span>
//               )}
//             </div>

//             {/* INFO */}
//             <div className="p-2 grow flex flex-col">

//               <h3 className="text-sm font-semibold text-slate-900 truncate">
//                 {prod.title}
//               </h3>

//               {/* PRICE */}
//               <div className="flex items-center justify-between mt-1">
//                 <span className="text-orange-500 font-bold text-sm">
//                   ৳{prod.price}
//                 </span>

//                 {prod.oldprice && (
//                   <span className="text-gray-400 text-xs line-through">
//                     ৳{prod.oldprice}
//                   </span>
//                 )}
//               </div>

//               {/* RATING */}
//               <div className="mt-auto flex items-center justify-between pt-2">

//                 <div className="flex items-center gap-0.5 text-yellow-400">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <Star
//                       key={i}
//                       size={10}
//                       className={
//                         i < Math.floor(prod.rating || 0)
//                           ? "fill-yellow-400 text-yellow-400"
//                           : "text-gray-300"
//                       }
//                     />
//                   ))}
//                   <span className="text-gray-500 text-[10px] ml-1">
//                     ({prod.totalRatings || 0})
//                   </span>
//                 </div>

//                 <span className="text-[10px] font-semibold text-gray-600">
//                   Sold {prod.totalSold || 0}
//                 </span>
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>
// {relatedProducts.length > 4 && (
//   <div className="mt-2 flex justify-end">
//     <p
//       onClick={() => navigate(`/category/${category}`)}
//       className="text-sm font-semibold text-indigo-600 cursor-pointer hover:underline"
//     >
//       see more  →
//     </p>
//   </div>
// )}
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

export default function RelatedProducts({ category, currentId }) {
  const navigate = useNavigate();

  // 🔥 optimized fetch
  const fetchRelated = async () => {
    const res = await api.get("/api/products");

    if (!Array.isArray(res.data)) return [];

    return res.data.filter(
      (p) =>
        p.category === category &&
        p._id !== currentId
    );
  };

  const {
    data: relatedProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["related-products", category],
    queryFn: fetchRelated,
    enabled: !!category,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // 🔥 Loading Skeleton (clean)
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-52 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  // 🔥 error fallback
  if (isError) return null;

  const products = relatedProducts.slice(0, 4);

  if (products.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
          Related Products
        </h2>

   
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

        {products.map((prod) => (
          <div
            key={prod._id}
            onClick={() => navigate(`/product/${prod._id}`)}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100 cursor-pointer overflow-hidden flex flex-col"
          >

            {/* IMAGE */}
            <div className="relative">
              <img
                src={prod.images?.[0] || "/placeholder.jpg"}
                alt={prod.title}
                className="w-full h-40 object-cover"
              />

              {prod.oldprice && prod.price && prod.oldprice > prod.price && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded">
                  -{Math.round(((prod.oldprice - prod.price) / prod.oldprice) * 100)}%
                </span>
              )}

              {!prod.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold">
                  Out of Stock
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="p-2 flex flex-col flex-1">

              <h3 className="text-sm font-semibold truncate">
                {prod.title}
              </h3>

              <div className="flex justify-between mt-1">
                <span className="text-orange-500 font-bold">
                  ৳{prod.price}
                </span>

                {prod.oldprice && (
                  <span className="text-gray-400 text-xs line-through">
                    ৳{prod.oldprice}
                  </span>
                )}
              </div>

              {/* RATING */}
              <div className="mt-auto flex justify-between items-center pt-2">

                <div className="flex items-center text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={
                        i < Math.round(prod.rating || 0)
                          ? "fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-[10px] text-gray-500 ml-1">
                    ({prod.totalRatings || 0})
                  </span>
                </div>

                <span className="text-[10px] text-gray-600">
                  Sold {prod.totalSold || 0}
                </span>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* SEE MORE */}
      {relatedProducts.length > 4 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate(`/category/${category}`)}
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            See more →
          </button>
        </div>
      )}

    </div>
  );
}