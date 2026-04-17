// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import api from "../../api";
// import { Star } from "lucide-react";

// export default function RelatedPage() {
//   const { categoryName } = useParams();
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     const res = await api.get("/api/products");

//     return res.data.filter(
//       (p) => p.category === categoryName
//     );
//   };

//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["category-products", categoryName],
//     queryFn: fetchProducts,
//     enabled: !!categoryName,
//   });

//   if (isLoading) {
//     return <p className="text-center py-10">Loading...</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6">

//       <h2 className="text-2xl font-bold mb-6">
//         {categoryName} Products
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {products.map((prod) => (
//           <div
//             key={prod._id}
//             onClick={() => navigate(`/product/${prod._id}`)}
//             className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer border p-2"
//           >
//             <img
//               src={prod.images?.[0]}
//               className="h-40 w-full object-cover"
//             />

//             <p className="text-sm font-semibold mt-2 truncate">
//               {prod.title}
//             </p>

//             <p className="text-orange-500 font-bold">
//               ৳{prod.price}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { ArrowLeft, ChevronRight, Star, Truck } from "lucide-react";

export default function RelatedPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await api.get("/api/products");

    return res.data.filter(
      (p) =>
        p.category?.toLowerCase() === categoryName?.toLowerCase()
    );
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["category-products", categoryName],
    queryFn: fetchProducts,
    enabled: !!categoryName,
  });

  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading products...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

      {/* 🔥 Title */}
      {/* <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 capitalize">
     ‹ Category › {categoryName} 
      </h2> */}

      <div className="mb-6 flex items-center justify-between">

  {/* 🔙 Left Side (Back + Title) */}
 <div className="flex items-center gap-3">

    {/* 🔙 Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-100 transition"
    >
      <ArrowLeft size={18} />
    </button>

    {/* 🔥 Breadcrumb */}
    <div className="flex items-center text-sm md:text-base font-medium">

      <span
        onClick={() => navigate("/")}
        className="cursor-pointer text-gray-400 hover:text-indigo-600 transition"
      >
        Home
      </span>

      <ChevronRight size={16} className="mx-1 text-gray-400" />

      <span className="text-gray-400">
        Category
      </span>

      <ChevronRight size={16} className="mx-1 text-gray-400" />

      <span className="text-slate-900 font-semibold capitalize">
        {categoryName}
      </span>

    </div>

  </div>

</div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No products found in this category.
        </p>
      )}

      {/* 🔥 GRID (Same as Trending) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

        {products.map((prod) => (
          <div
            key={prod._id}
            onClick={() => navigate(`/product/${prod._id}`)}
            className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer border border-gray-50 h-full flex flex-col"
          >

            {/* 🔥 Image Section */}
            <div className="relative">
              <img
                src={prod.images?.[0] || "/placeholder.jpg"}
                alt={prod.title}
                className="w-full h-40 md:h-44 object-cover"
              />

              {/* Discount */}
              {prod.oldprice && prod.price && prod.oldprice > prod.price && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded z-10">
                  -{Math.round(((prod.oldprice - prod.price) / prod.oldprice) * 100)}% OFF
                </span>
              )}

              {/* Free Delivery */}
              {!prod.deliveryEnabled && (
                <div className="absolute bottom-0 left-0 right-0 bg-[#00A1DE] text-white flex items-center justify-center gap-2 py-1.5 px-2 rounded-t z-10 shadow-md">
                  <Truck size={14} />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide">
                    FREE DELIVERY
                  </span>
                </div>
              )}
            </div>

            {/* 🔥 Info Section */}
            <div className="p-2 grow flex flex-col">

              <h3
                className="text-sm font-semibold text-slate-900 truncate"
                title={prod.title}
              >
                {prod.title}
              </h3>

              <p
                className={`text-[10px] font-bold mt-1 ${
                  prod.inStock
                    ? "text-green-600"
                    : "text-red-500 animate-pulse"
                }`}
              >
                {prod.inStock ? "" : "Out of Stock"}
              </p>

              <div className="flex items-center justify-between mt-1 mb-2">
                <span className="text-orange-500 font-bold text-sm md:text-base">
                  ৳{prod.price}
                </span>

                {prod.oldprice && (
                  <span className="text-gray-400 text-xs line-through">
                    ৳{prod.oldprice}
                  </span>
                )}
              </div>

              {/* ⭐ Ratings */}
              <div className="mt-auto flex items-center">
                <div className="flex items-center">
                  <span className="flex items-center gap-0.5 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={
                          i < Math.floor(prod.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </span>

                  <span className="text-gray-500 text-[10px] ml-1">
                    ({prod.totalRatings || 0})
                  </span>
                </div>

                <span className="text-gray-600 font-semibold text-[10px] md:text-sm ml-auto">
                  Sold ({prod.totalSold || 0})
                </span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}