import { Star, Truck, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      setLoading(true);
      try {
        // সার্চ লজিক বাদ দিয়ে সরাসরি ট্রেন্ডিং এপিআই কল করা হচ্ছে
        const res = await api.get("/api/products/trending");

        // ডাটা ফরম্যাট হ্যান্ডলিং (সরাসরি অ্যারে বা অবজেক্টের ভেতর থাকলে)
        const data = Array.isArray(res.data) ? res.data : (res.data.products || []);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching trending products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []); // ডিপেন্ডেন্সি অ্যারে খালি, তাই এটি শুধু একবার লোড হবে

  if (loading) {
    return (
      <div className="flex flex-col items-center pt-32 h-screen bg-slate-100">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-slate-500 font-bold">Just For You Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 ">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Trending Products</h2>

      {products.length === 0 && (
        <p className="text-center text-gray-500 py-10">No trending products available.</p>
      )}

      {/* ৬ কলামের গ্রিড ডিজাইন */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((prod) => (
          <Link key={prod._id} to={`/product/${prod._id}`}>
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer border border-gray-50 h-full flex flex-col">
              
              {/* Image Section */}
              <div className="relative">
                <img
                  src={prod.images?.[0]}
                  alt={prod.title}
                  className="w-full h-40 md:h-44 object-cover"
                />

                {/* Discount Badge */}
                {prod.oldprice && prod.price && prod.oldprice > prod.price && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded z-10">
                    -{Math.round(((prod.oldprice - prod.price) / prod.oldprice) * 100)}% OFF
                  </span>
                )}

                {/* Free Delivery Badge */}
                {!prod.deliveryEnabled && (
                  <div className="absolute bottom-0 left-0 right-0 bg-[#00A1DE] text-white flex items-center justify-center gap-2 py-1.5 px-2 rounded-t z-10 shadow-md">
                    <Truck size={14} className="text-white" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide">
                      FREE DELIVERY
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="p-2 grow flex flex-col">
                <h3 className="text-sm font-semibold text-slate-900 truncate" title={prod.title}>
                  {prod.title}
                </h3>
                
                <p className={`text-[10px] font-bold mt-1 ${prod.inStock ? "text-green-600" : "text-red-500 animate-pulse"}`}>
                  {prod.inStock ? "" : "Out of Stock"}
                </p>

                <div className="flex items-center justify-between mt-1 mb-2">
                  <span className="text-orange-500 font-bold text-sm md:text-base">৳{prod.price}</span>
                  {prod.oldprice && (
                    <span className="text-gray-400 text-xs line-through">৳{prod.oldprice}</span>
                  )}
                </div>

                {/* Ratings Section */}
                <div className="mt-auto flex items-center">
                  <div className="flex items-center">
                    <span className="flex items-center gap-0.5 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < Math.floor(prod.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </span>
                    <span className="text-gray-500 text-[10px] ml-1">({prod.totalRatings || 0})</span>
                  </div>
                  <h1 className="text-gray-600 font-semibold text-[10px] md:text-sm ml-auto">Sold ({prod.totalSold})</h1>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}