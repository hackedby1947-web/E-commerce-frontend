

// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
// import { ShoppingCart, Heart, Share2, CheckCircle2, Star, X } from "lucide-react";
// import { useCart } from '../context/CartContext';
// // import { products } from '../data/products'; // demo data import
// // import { reviews } from "../data/reviews";
// import axios from "axios";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate(); 
//   const { addToCart } = useCart();
//   const [selectedImages, setSelectedImages] = useState(null);
  

//   // ID অনুযায়ী সঠিক প্রোডাক্টটি খুঁজে বের করা
//   // const product = products.find((p) => p.id === parseInt(id));
// // const productReviews = reviews.filter(r => r.productId === product.id);
//   // const [selectedImage, setSelectedImage] = useState(product ? product.images[0] : "");
//   // const [selectedColor, setSelectedColor] = useState(product ? product.colors[0] : "");
//   const [selectedImage, setSelectedImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [wishlist, setWishlist] = useState(false);
//   const [product, setProduct] = useState(null);
  
//   // const [stockRequested, setStockRequested] = useState(false);
//   const [stockRequested, setStockRequested] = useState(() => {
//   return localStorage.getItem(`stockRequested_${id}`) === "true";
// });
//   const [totalRequests, setTotalRequests] = useState(0);
//   const localKey = `stockRequested_${id}`; // browser localStorage key


//   // const discount = Math.round(((product.oldprice - product.price) / product.oldprice) * 100);
//   const discount = product && product.oldprice
//   ? Math.round(((product.oldprice - product.price) / product.oldprice) * 100)
//   : 0;

//   const handleAddToCart = () => {
//     addToCart({
//       id: product._id,
//       title: product.title,
//       price: product.price,
//       oldprice: product.oldprice,
//       inStock: product.inStock,
//       images: [selectedImage], // যেই image select আছে
//       selectedColor: selectedColor, // যেই color select আছে
//       quantity: quantity,
//       colors: product.colors,
//       deliveryEnabled: product.deliveryEnabled


//     });
//     alert("Product added to cart!");
//   };

//  const handleOrderNow = () => {
// //     // ৩. ফাংশনের ভেতরে শুধু ভেরিয়েবলটি (navigate) ব্যবহার করুন
//     // navigate('/checkout', { state: { fromOrderButton: true } });
// navigate('/checkout', { 
//       state: { 
//         fromOrderButton: true, // সিকিউরিটির জন্য (আগে যা ছিল)
//         productDetails: {
//           _id: product._id,
//           title: product.title,
//           price: product.price,
//           oldprice: product.oldprice,
//           images: [selectedImage],
//           selectedColor: selectedColor,
//           quantity: quantity,
//           deliveryEnabled: product.deliveryEnabled
        
//         }
//       } 
//     })

//   };


// // const handleRequestStock = async () => {
// //   try {
// //     await axios.post("http://localhost:5000/api/products/request-stock", {
// //   productId: product._id,
// //   userName: "guest"
// // });
// //     alert("Your stock request has been sent!");
// //   } catch (err) {
// //     console.error(err);
// //     alert("Failed to request stock: " + (err.response?.data?.message || err.message));
// //   }
// // };

  

// //   useEffect(() => {
// //   // Backend থেকে fetch
// //   fetch("http://localhost:5000/api/products") // তোমার API
// //     .then(res => res.json())
// //     .then(data => {
// //       const found = data.find(p => p._id === id); // _id দিয়ে খুঁজো
// //       if (found) {
// //         setProduct(found);
// //         setSelectedImage(found.images[0]); // fetch হওয়ার পরে set
// //         setSelectedColor(found.colors[0]); // fetch হওয়ার পরে set
// //       }
// //     })
// //     .catch(err => console.error(err));
// // }, [id]);


// const handleRequestStock = async () => {
//   if (stockRequested) {
//     alert("You have already requested stock for this product!");
//     return;
//   }

//   try {
//     const res = await axios.post("http://localhost:5000/api/products/request-stock", {
//       productId: product._id,
//       userName: "guest"
//     });

//     // localStorage mark
//     localStorage.setItem(localKey, "true");
//     setStockRequested(true);

//     // update count
//     setTotalRequests(res.data.totalStockRequests || totalRequests);

//     alert(res.data.message || "Stock request sent!");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to request stock: " + (err.response?.data?.message || err.message));
//   }
// };

// useEffect(() => {

//   // localStorage check first

  

//   fetch("http://localhost:5000/api/products")
//     .then(res => res.json())
//     .then(data => {
//       const found = data.find(p => p._id === id);
//       if (found) {
//         setProduct(found);
//         setSelectedImage(found.images[0]);
//         setSelectedColor(found.colors[0]);
//         setTotalRequests(found.totalStockRequests || 0);
//       }
//     })
//     .catch(err => console.error(err));

// }, [id]);



//   if (!product) return <p>Loading...</p>;

//   if (!product) {
//     return <div className="p-10 text-center text-red-500 font-bold">Product not found!</div>;
//   }
//   return (
//     <div className="max-w-7xl mx-auto p-6 md:p-12">
//       <div className="grid md:grid-cols-2 gap-8 bg-gray-50 shadow-sm rounded-sm">

//         {/* Images */}
//         <div className="md:ml-4">
//           <img
//             src={selectedImage}
//             alt={product.title}
//             className="w-full h-96 object-cover rounded-xl shadow-lg"
//           />

//           <div className="flex mt-4 gap-4 ml-4">
//             {product.images.map((img, i) => (


//               <img
//                 key={i}
//                 src={img}
//                 alt={`Thumbnail ${i}`}
//                 className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
//                   selectedImage === img ? "border-indigo-600" : "border-gray-200"
//                 }`}
//                 onClick={() => setSelectedImage(img)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="flex h-fit flex-col gap-4 ml-4">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

//               <div className="flex items-center gap-2 mt-1">
//                 <div className="text-yellow-500 text-lg">
//                   {"★".repeat(Math.floor(product.rating))}
//                   {"☆".repeat(5 - Math.floor(product.rating))}
//                 </div>
//                 <span className="text-gray-600 text-sm">({product.totalRatings} Ratings)</span>
//               </div>
//             </div>

//             <div className="flex">
//               <button onClick={() => setWishlist(!wishlist)} className="p-2 rounded-full hover:bg-gray-100 transition">
//                 <Heart size={25} className={wishlist ? "text-green-500 fill-green-500" : "text-gray-600"} />
//               </button>

//               <button className="p-2 rounded-full hover:bg-gray-100 transition">
//                 <Share2 size={25} className="text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Price + Discount */}
//           <div className="flex items-center gap-3">
//             <p className="text-2xl font-bold text-indigo-600">৳{product.price}</p>
//             <span className="text-gray-400 text-lg line-through">৳{product.oldprice}</span>
//             <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-0.5 rounded">{discount}% OFF</span>
//           </div>

//           {/* Stock */}
//           <p className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
//             {product.inStock ? "In Stock" : "Out of Stock"}
//        {product.inStock && product.stock <= 5 && (
//     <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 font-semibold rounded-md text-sm">
//       {product.stock} left
//     </span>
//   )}
//           </p>

//           {/* Description */}
//           <p className="text-gray-700">{product.description}</p>

//           {/* Color */}
//           <div>
//             <h3 className="font-semibold mb-2">Color:</h3>
//             <div className="flex gap-2">
//               {product.colors.map((color) => (
//                 <button
//                   key={color}
//                   className={`px-3 py-1 rounded-full border ${selectedColor === color ? "border-indigo-600 bg-indigo-100" : "border-gray-300"}`}
//                   onClick={() => setSelectedColor(color)}
//                 >
//                   {color}
//                 </button>
//               ))}
//             </div>
//           </div>



//           {/* Quantity */}
// <div className="flex items-center mt-4">
//   <h3 className="font-semibold mr-4">Quantity:</h3>
//   <div className="flex border border-gray-300 rounded-lg overflow-hidden w-max">
    
//     {/* Decrease */}
//     <button
//       onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
//       className="px-5 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-lg"
//       disabled={quantity <= 1} // 1 এর নিচে যাবে না
//     >
//       -
//     </button>

//     {/* Input */}
//     <input
//       type="number"
//       value={quantity}
//       onChange={(e) => {
//         const val = parseInt(e.target.value) || 1;
//         setQuantity(Math.min(Math.max(1, val), product.stock)); // ✅ stock limit
//       }}
//       className="w-16 text-center border-l border-r border-gray-300 outline-none text-gray-700 font-semibold text-lg"
//     />

//     {/* Increase */}
//     <button
//       onClick={() => setQuantity(prev => Math.min(prev + 1, product.stock))} // ✅ stock limit
//       className="px-5 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-lg"
//       disabled={quantity >= product.stock} // max stock এ disable
//     >
//       +
//     </button>
//   </div>

//   {/* Stock info */}
//   {/* <span className="ml-4 text-gray-500 text-sm">{product.stock} left in stock</span> */}


// </div>




//           {/* Buttons */}
//           <div className="flex gap-4 mt-4 justify-end mr-2">
//             <button onClick={handleAddToCart} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition">
//               <ShoppingCart size={20} /> Add to Cart
//             </button>
//             {/* <button onClick={handleOrderNow} className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-xl shadow-md bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition transform hover:-translate-y-0.5">
//               Order Now
//             </button> */}

//             {/* <button
//   onClick={product.inStock ? handleOrderNow : handleRequestStock}
//   className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-xl shadow-md ${
//     product.inStock
//       ? "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
//       : "bg-red-400 cursor-pointer  hover:via-purple-600"
//   }`}
// >
//   {product.inStock ? "Order Now" : "Request Stock"}
// </button> */}
// {/* 
// <button
//   onClick={product.inStock ? handleOrderNow : handleRequestStock}
//   disabled={stockRequested && !product.inStock} // disable only if out-of-stock & already requested
//   className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-xl shadow-md ${
//     product.inStock
//       ? "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
//       : stockRequested
//         ? "bg-gray-400 cursor-not-allowed"
//         : "bg-red-400 hover:bg-red-500"
//   }`}
// >
//   {product.inStock ? "Order Now" : stockRequested ? "Requested" : "Request Stock"}
// </button> */}



// <div className="relative inline-block">

//   {/* Total Request Badge */}
 
//    {stockRequested && (
//    <span className="absolute lg:-top-16  -top-7 right-0 text-red-500 text-xs font-semibold px-2 py-1 rounded shadow whitespace-nowrap">
//   Total Stock Request {totalRequests}
// </span>
//   )}

//   <button
//     onClick={product.inStock ? handleOrderNow : handleRequestStock}
//     disabled={stockRequested && !product.inStock}
//     className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-xl shadow-md ${
//       product.inStock
//         ? "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
//         : stockRequested
//         ? "bg-gray-400 cursor-not-allowed"
//         : "bg-red-400 hover:bg-red-500"
//     }`}
//   >
//     {product.inStock ? "Order Now" : stockRequested ? "Requested" : "Request Stock"}
//   </button>

// </div>


//           </div>
//         </div>
//       </div>

//       {/* Specifications */}
//       <div className="mt-8 w-full h-fit bg-gray-50 shadow-xs rounded-sm">
//         <h2 className="text-2xl font-semibold mb-3 ml-4">Specifications</h2>
      
// <ul className="list-disc pl-6 space-y-2 text-gray-700 ml-6">
//   {product.specifications?.map((spec, i) => (
//     <li key={i}>{spec}</li>
//   ))}
// </ul>
//       </div>

//       {/* Product Details */}
//       <div className="mt-10 w-full h-fit bg-gray-50 shadow-xs rounded-sm">
//         <h2 className="text-2xl font-semibold mb-3 ml-4">Product Details</h2>
//         <p className="text-gray-700 leading-relaxed ml-6">{product.description}</p>
//       </div>

//       {/* Reviews */}
//  <div className="mt-16">
//   <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
//     <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Customer Reviews</h2>
//     <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
//       {product.reviews?.length || 0} Reviews
//     </span>
//   </div>

//   <div className="grid gap-6">
//     {product.reviews?.length > 0 ? (
//       product.reviews.map((review, i) => (
//         <div
//           key={i}
//           className="group bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300"
//         >
//           {/* Header: User and Rating */}
//           <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-white font-bold shadow-md shadow-indigo-100">
//                 {review.user?.name ? review.user.name[0].toUpperCase() : 'U'}
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-800 leading-none mb-1">
//                   {review.user?.name || 'Verified Buyer'}
//                 </h4>
                
//                 <p className="text-[11px] font-bold text-green-600 flex items-center gap-1 uppercase tracking-wider">
//                   <CheckCircle2 size={12} strokeWidth={3} /> Verified Purchase
//                 </p>
//                 {/* Date Section */}
//         <span className="text-[11px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-md border border-gray-100">
//           {new Date(review.createdAt).toLocaleDateString('en-GB', {
//             day: 'numeric',
//             month: 'short',
//             year: 'numeric',
//           })}
//         </span>
//               </div>
//             </div>

//             {/* Star Rating */}
//             <div className="flex items-center gap-0.5 bg-yellow-50/50 px-3 py-1.5 rounded-xl border border-yellow-100/50">
//               {[...Array(5)].map((_, index) => (
//                 <Star
//                   key={index}
//                   size={14}
//                   fill={index < review.rating ? "#FBBF24" : "none"}
//                   className={index < review.rating ? "text-yellow-400" : "text-gray-200"}
//                   strokeWidth={2}
//                 />
//               ))}
//               <span className="ml-2 text-sm font-bold text-yellow-700">{review.rating}</span>
//             </div>
//           </div>

//           {/* Comment */}
//           <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-5 italic">
//             "{review.comment}"
//           </p>

//           {/* Review Images */}
//           {review.images?.length > 0 && (
//             <div className="flex gap-3 flex-wrap mt-2">
//               {review.images.map((image, index) => (
//                 <div key={index} className="relative group/img overflow-hidden rounded-2xl border border-gray-100">
//                   <img
//                     src={image}
//                     alt={`review-${index}`}
//                     className="w-20 h-20 sm:w-24 sm:h-24 object-cover transition-transform duration-500 group-hover/img:scale-110 cursor-pointer"
//                     onClick={() => setSelectedImages(image)}
//                   />
//                   <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none" />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))
//     ) : (
//       <div className="text-center py-16 bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200">
//         <p className="text-gray-400 font-medium italic">No stories shared yet. Be the first!</p>
//       </div>
//     )}

//     {/* Modern Selected Image Modal */}
//     {selectedImages && (
//       <div
//         className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-100 p-4 animate-in fade-in duration-300"
//         onClick={() => setSelectedImages(null)}
//       >
//         <button className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
//           <X size={24} />
//         </button>
//         <img
//           src={selectedImages}
//           alt="review-large"
//           className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
//         />
//       </div>
//     )}
//   </div>
// </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Share2, Star, Minus, Plus, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { useCart } from '../context/CartContext';
import api from "../api";
import toast from "react-hot-toast";
import TrendingProducts from "../components/TrendingProducts";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect } from 'react';
import 'swiper/css';
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // const [product, setProduct] = useState(null);
  // const [selectedImage, setSelectedImage] = useState("");
  // const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [clicked, setClicked] = useState(false);


  // 🔥 FETCH FUNCTION
  const fetchProduct = async () => {
    const res = await api.get(`/api/products`);
    const found = res.data.find((p) => p._id === id);
    return found;
  };

  // 🔥 REACT QUERY (CACHE SYSTEM)
  const {
    data: product,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    staleTime: 1000 * 60 * 10, // 10 min cache
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // 🔥 LOCAL UI STATE (ONLY FOR UI CONTROL)
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  // const [quantity, setQuantity] = useState(1);

  // 🔥 INIT DEFAULT VALUES (NO API CALL)
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0]);
      setSelectedColor(product.colors?.[0]);
    }
  }, [product]);




// useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       const res = await api.get(`/api/products`);
//       const found = res.data.find(p => p._id === id);
//       if (found) {
//         // কনসোলে চেক করুন user অবজেক্ট কি না
//         console.log("Product Reviews Data:", found.reviews); 
//         setProduct(found);
//         setSelectedImage(found.images[0]);
//         setSelectedColor(found.colors[0]);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   fetchProduct();
// }, [id]);



const handleRequestStock = async () => {
  const request = api.post("/api/products/request-stock", {
    productId: product._id,
    userName: "guest"
  });

  // toast.promise একাই সব কাজ করে দিবে
  toast.promise(request, {
    loading: 'অনুরোধ পাঠানো হচ্ছে...',
    success: () => {
      setClicked(true); // সফল হলে বাটন চেঞ্জ হবে
      return 'রিকোয়েস্ট সফল হয়েছে! 📩';
    },
    error: (err) => err.response?.data?.message || 'সার্ভার সমস্যা, আবার চেষ্টা করুন',
  }, {
    style: { borderRadius: '12px', fontWeight: '500' },
    success: { duration: 3000 },
  });
};

const swiperRef = useRef(null); // Swiper-কে কন্ট্রোল করার জন্য Ref

// থাম্বনেইল চেঞ্জ হলে স্লাইডারকে সেই পজিশনে নেওয়ার জন্য
useEffect(() => {
  if (swiperRef.current && product.images) {
    const index = product.images.indexOf(selectedImage);
    if (index !== -1) {
      swiperRef.current.slideTo(index);
    }
  }
}, [selectedImage, product?.images]);

  if (isLoading || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // if (!product) return <div className="h-screen flex items-center justify-center animate-pulse">Loading...</div>;

  const discount = product?.oldprice ? Math.round(((product.oldprice - product.price) / product.oldprice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8 py-0 md:py-10">
        
        <div className="bg-white md:rounded-3xl shadow-sm overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column: Image Gallery */}
            {/* <div className="p-0 md:p-8 bg-white">
              <div className="sticky top-10">
                <div className="aspect-4/3 md:aspect-auto md:h-140  rounded-0 md:rounded-2xl overflow-hidden bg-gray-50 group relative">
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                  />
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      -{discount}% OFF
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2 mt-3 md:mt-6 px-3 md:px-0 overflow-x-auto pb-2 no-scrollbar">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`relative min-w-15 h-15 md:min-w-17.5 md:h-17.5 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img ? "border-indigo-600 ring-2 ring-indigo-50" : "border-gray-100 opacity-60"
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div> */}


   <div className="p-0 md:p-8 bg-white">
  <div className="sticky top-10">
    {/* মোবাইলে aspect-square (Height-Width সমান) এবং পিসিতে md:h-140 */}
    <div className="aspect-square md:aspect-auto md:h-140 rounded-0 md:rounded-2xl overflow-hidden bg-gray-50 group relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setSelectedImage(product.images[swiper.activeIndex])}
        className="w-full h-full"
      >
        {product.images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={product.title}
              
              className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            />
          </SwiperSlide>
        ))}

        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            -{discount}% OFF
          </span>
        )}
      </Swiper>
    </div>
    
    {/* থাম্বনেইল সেকশন */}
    <div className="flex gap-2 mt-2 md:mt-6 px-3 md:px-0 overflow-x-auto md:pb-2 no-scrollbar">
      {product.images.map((img, i) => (
        <button
          key={i}
          onClick={() => setSelectedImage(img)}
          className={`relative min-w-15 h-15 md:min-w-17.5 md:h-17.5 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all ${
            selectedImage === img
              ? "border-indigo-600 ring-2 ring-indigo-50"
              : "border-gray-100 opacity-60"
          }`}
        >
          <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  </div>
</div>
 

            {/* Right Column: Product Info */}
            <div className="p-4 md:p-12 md:border-l border-gray-50">
              <div className="flex flex-col gap-1 md:gap-2  md:mb-6">
                <h1 className="text-lg md:text-2xl font-extrabold text-gray-800 leading-tight">
                  {product.title}
                </h1>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-lg border border-yellow-100">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-xs font-black text-yellow-700">{product.rating}</span>
                    </div>
                    <span className="text-gray-300 text-[10px]">|</span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tight">
                      {product.totalRatings} Ratings
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => setWishlist(!wishlist)} className="p-2 rounded-full bg-gray-50">
                      <Heart size={18} className={wishlist ? "text-red-500 fill-red-500" : "text-gray-400"} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-50">
                      <Share2 size={18} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-4 md:mb-8">
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="text-2xl md:text-4xl font-black text-indigo-600">৳{product.price}</span>
                  {product.oldprice && (
                    <span className="text-base md:text-xl text-gray-400 line-through">৳{product.oldprice}</span>
                  )}
                    <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-0.5 rounded">-{discount}% OFF</span>

                </div>
                <p className={`text-[11px] font-bold ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                  {product.inStock ? "✓ In Stock" : "✕ Out of Stock"}
                </p>
              </div>

              <div className="mb-5 md:mb-8">
                <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 md:mb-4">Select Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-1.5 md:px-6 md:py-2.5 rounded-lg md:rounded-xl text-xs font-bold border-2 transition-all ${
                        selectedColor === color 
                        ? "border-indigo-600 bg-indigo-600 text-white" 
                        : "border-gray-100 bg-white text-gray-600"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* --- PC ACTIONS (Desktop Only) --- */}
              <div className="hidden md:block mb-8 space-y-5">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Quantity:</span>
                  <div className="flex items-center bg-gray-100 rounded-xl p-1">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-white rounded-lg transition-all"><Minus size={18}/></button>
                    <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(product.stock || 10, q + 1))} className="p-2 hover:bg-white rounded-lg transition-all"><Plus size={18}/></button>
                  </div>
                </div>

                {/* <div className="flex gap-4">
                  <button 
                    onClick={() => addToCart({...product, quantity, selectedColor, selectedImage})} 
                    className="flex-1 h-14 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all"
                  >
                    <ShoppingCart size={20}/> Add to Cart
                  </button>
                  <button 
                    onClick={() => navigate('/checkout', { state: { productDetails: {...product, quantity, selectedColor, selectedImage} }})}
                    className="flex-1 h-14 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                  >
                    Order Now
                  </button>
                </div> */}

<div className="flex gap-4 w-full">
      {/* Add to Cart Button */}
      {/* <button 
        onClick={() => addToCart({...product, quantity, selectedColor, selectedImage})} 
        className="flex-1 h-14 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all active:scale-95"
      >
        <ShoppingCart size={20}/> Add to Cart
      </button> */}

      <button 
  onClick={() => {
    addToCart({...product, quantity, selectedColor, selectedImage});
    toast.success('Cart-এ Add করা হয়েছে! 🛍️', {
      duration: 2000,
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
      },
    });
  }} 
  className="flex-1 h-14 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all active:scale-95"
>
  <ShoppingCart size={20}/> Add to Cart
</button>

      {/* Dynamic Button (Order Now / Request Stock / Requested) */}
      <button 
        onClick={product.inStock 
          ? () => navigate('/checkout', { state: { productDetails: {...product, quantity, selectedColor, selectedImage} }}) 
          : handleRequestStock
        }
        // ক্লিক করার পর বাটন ডিজেবল হয়ে যাবে যতক্ষণ না রিফ্রেশ দিচ্ছে
        disabled={!product.inStock && clicked}
        className={`flex-1 h-14 rounded-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 
          ${product.inStock 
            ? "bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700" 
            : clicked 
              ? "bg-gray-400 text-white cursor-not-allowed shadow-none" 
              : "bg-red-500 text-white shadow-red-100 hover:bg-red-600"
          }`}
      >
        {product.inStock ? (
          "Order Now"
        ) : clicked ? (
          "Requested"
        ) : (
          "Request Stock"
        )}
      </button>
    </div>



                
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-50 rounded-lg text-green-600"><Truck size={16}/></div>
                  <span className="text-[10px] font-bold text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600"><ShieldCheck size={16}/></div>
                  <span className="text-[10px] font-bold text-gray-600">100% Original</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className=" gap-8 mt-10 px-4 md:px-0">

<div className="lg:col-span-1">
  <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 sticky top-10">
    <h2 className="text-xl font-bold mb-6 uppercase text-gray-400">Specifications</h2>
    <ul className="space-y-4">
      {product.specifications
        ?.toString()
        // নিচের রেজেক্স (Regex) নিউলাইন, বুলেট বা ড্যাশ দিয়ে টেক্সটকে ভাগ করবে
        .split(/\r?\n|•|-/) 
        .map((spec, i) => {
          const trimmedSpec = spec.trim();
          // যদি টেক্সট খালি না থাকে তবেই রিটার্ন করবে
          return trimmedSpec ? (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              {/* কাস্টম ডট পয়েন্ট */}
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              {/* টেক্সট */}
              <span className="leading-relaxed">{trimmedSpec}</span>
            </li>
          ) : null;
        })}
    </ul>
  </div>
</div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Product Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

          
            
            <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <button onClick={() => navigate(`/product/${product._id}/reviews`)} className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  See All ({product.reviews?.length || 0}) <ArrowRight size={16}/>
                </button>
              </div>
              <div className="space-y-6">
             {product.reviews?.slice(0, 4).map((review, i) => {
                const reviewerName = review.user?.name || "Verified Buyer";
  
  return (
    <div key={i} className="pb-2 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3 mb-1 ">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 uppercase">
          {/* নামের প্রথম অক্ষর */}
          {reviewerName[0]} 
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">
            {reviewerName}
          </h4>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} size={12} fill={idx < (review.rating || 5) ? "currentColor" : "none"} />
            ))}
          </div>
        </div>
      </div>
     {/* px-12 মোবাইলে এবং md:px-14 বড় স্ক্রিনে */}
<p className="text-gray-800 text-sm font-medium pl-14 pr-4 md:px-14 leading-relaxed italic">
  {review.comment}
</p>
      {/* <p className="text-gray-800  text-sm font-medium px-13">{review.comment}</p> */}
    </div>
  );
})}
              </div>
            </div>
          </div>
<TrendingProducts/>
         
        </div>

        
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 p-4 flex items-center gap-3 z-50 md:hidden shadow-lg">
        <div className="flex items-center bg-gray-100 rounded-xl">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3"><Minus size={16}/></button>
          <span className="w-6 text-center font-bold text-sm">{quantity}</span>
          <button onClick={() => setQuantity(q => Math.min(product.stock || 10, q + 1))} className="p-3"><Plus size={16}/></button>
        </div>
        {/* <button onClick={() => navigate('/checkout', { state: { productDetails: {...product, quantity, selectedColor, selectedImage} }})} className="flex-[1.5] h-12 bg-indigo-600 text-white rounded-xl font-bold text-xs">
          Order Now
        </button>  */}

 <button 
        onClick={product.inStock 
          ? () => navigate('/checkout', { state: { productDetails: {...product, quantity, selectedColor, selectedImage} }}) 
          : handleRequestStock
        }
        // ক্লিক করার পর বাটন ডিজেবল হয়ে যাবে যতক্ষণ না রিফ্রেশ দিচ্ছে
        disabled={!product.inStock && clicked}
        className={`flex-[1.5] h-12 bg-indigo-600 text-white rounded-xl font-bold text-xs 
          ${product.inStock 
            ? "bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700" 
            : clicked 
              ? "bg-gray-400 text-white cursor-not-allowed shadow-none" 
              : "bg-red-500 text-white shadow-red-100 hover:bg-red-600"
          }`}
      >
        {product.inStock ? (
          "Order Now"
        ) : clicked ? (
          "Requested"
        ) : (
          "Request Stock"
        )}
      </button>

        <button onClick={() => addToCart({...product, quantity, selectedColor, selectedImage})} className="flex-1 h-12 bg-gray-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2">
           Cart
        </button>
      </div>
    </div>
  );
}