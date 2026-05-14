// import React, { useState, useEffect } from "react";
// import { PlayCircle, Truck, Users, Layout } from "lucide-react";

// export default function Hero() {
//   const slides = [
//     {
//       id: 1,
//       image: "https://res.cloudinary.com/dhmm1ruxa/image/upload/v1776249982/products/abgfy2fhjbszdh8n4idf.jpg",
//       titleBangla: "নববর্ষ উৎসব",
//       dateBangla: "৮ - ১৪ এপ্রিল",
//       subtitleBangla: "নতুনর আমানদ, দশে সেরা পছনদ",
//       themeColor: "text-red-600",
//       btnColor: "bg-red-600"
//     },
//     {
//       id: 2,
//       image: "https://res.cloudinary.com/dhmm1ruxa/image/upload/v1776245098/products/ftahtlsm39jzfb1x28pd.jpg",
//       titleBangla: "বৈশাখী মেলা",
//       dateBangla: "১৪ - ২০ এপ্রিল",
//       subtitleBangla: "সেরা ফ্যাশন, সেরা দামে",
//       themeColor: "text-indigo-600",
//       btnColor: "bg-indigo-600"
//     },
//   ];

//   const features = [
//     {
//       icon: <Layout className="w-4 h-4 md:w-6 md:h-6" />,
//       title: "Product Varieties",
//       desc: "Explore styles",
//       color: "bg-indigo-50 text-indigo-600",
//     },
//     {
//       icon: <Users className="w-4 h-4 md:w-6 md:h-6" />,
//       title: "Happy Customers",
//       desc: "10k+ shoppers",
//       color: "bg-green-50 text-green-600",
//     },
//     {
//       icon: <Truck className="w-4 h-4 md:w-6 md:h-6" />,
//       title: "Free Delivery",
//       desc: "Orders over $99",
//       color: "bg-orange-50 text-orange-600",
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [currentFeature, setCurrentFeature] = useState(0);

//   useEffect(() => {
//     const slideTimer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     const featureTimer = setInterval(() => {
//       setCurrentFeature((prev) => (prev + 1) % features.length);
//     }, 3500);
//     return () => {
//       clearInterval(slideTimer);
//       clearInterval(featureTimer);
//     };
//   }, [slides.length, features.length]);

//   return (
//     <section className="bg-white pb-6 md:pb-16 font-sans">
      
//       {/* --- HERO BANNER (Image Clear on Mobile) --- */}
//       <div className="relative h-55 md:h-137.5 overflow-hidden bg-gray-100 md:bg-transparent md:rounded-b-0 shadow-lg md:shadow-none">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
//               index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
//             }`}
//           >
//             {/* Background Image - এখন ১০০% ক্লিয়ার (full visibility) */}
//             <div className="absolute inset-0">
//               {/* <img 
//                 src={slide.image} 
//                 className="w-full h-full object-cover" // Removed extra opacity
//                 alt="hero" 
//               /> */}
//               <img 
//   src={slide.image}
//   className="w-full h-full object-cover"
//   alt={slide.titleBangla}
//   width={1200}
//   height={600}
//   loading={index === 0 ? "eager" : "lazy"}
//   fetchPriority={index === 0 ? "high" : "low"}
//   decoding={index === 0 ? "sync" : "async"}
// />
//               {/* Overlay: পিসিতে সাদা গ্রাডিয়েন্ট, মোবাইলে কালো গ্রাডিয়েন্ট (লেখা স্পষ্ট করার জন্য) */}
//               <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent md:from-white/90 md:via-white/40 md:to-transparent"></div>
//             </div>

//             {/* Content Content (নিচে নামানো হয়েছে এবং লেখা সেন্টারে) */}
//             <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-end justify-center md:items-center md:justify-start pb-6 md:pb-0">
//               <div className="text-center md:text-left">
//                 <h1 className={`text-4xl md:text-7xl font-black bn-font mb-1 leading-tight text-red-600 md:text-red-600`}>
//                   {slide.titleBangla}
//                 </h1>
//                 <p className="text-xl md:text-3xl font-bold bn-font text-white md:text-gray-900 opacity-90 mb-3 md:mb-4">
//                   {slide.dateBangla}
//                 </p>
                
//                 <div className="flex justify-center md:justify-start">
//                   <button aria-label={slide.btnText || "আরো দেখুন"} className={`flex items-center gap-2 px-5 py-2.5 md:px-8 md:py-4 ${slide.btnColor} text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base shadow-lg transition active:scale-95`}>
//                     <PlayCircle size={18} className="md:w-5 md:h-5" />
//                     <span>Live Now</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* --- COMPACT FEATURES SLIDER (Same as before) --- */}
//       <div className="max-w-6xl mx-auto px-4 -mt-6 md:-mt-8 relative z-40">
//         <div className="bg-white/95 backdrop-blur-sm shadow-xl shadow-gray-200/50 rounded-2xl md:rounded-[2.5rem] border border-gray-100 p-1 md:p-2 overflow-hidden">
          
//           {/* Desktop Grid (আগের মতোই থাকবে) */}
//           <div className="hidden md:grid grid-cols-3 divide-x divide-gray-50 py-4">
//             {features.map((f, i) => (
//               <div key={i} className="flex items-center gap-5 px-10 py-4">
//                 <div className={`p-4 rounded-2xl ${f.color} shrink-0`}>{f.icon}</div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">{f.title}</h3>
//                   <p className="text-gray-500 text-sm">{f.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Mobile Auto-Slider (এখন আরও সটো এবং ক্লিন) */}
//           <div className="md:hidden relative h-14 flex items-center justify-center">
//             {features.map((f, i) => (
//               <div
//                 key={i}
//                 className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-1000 ${
//                   i === currentFeature ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
//                 }`}
//               >
//                 <div className={`p-2 rounded-lg ${f.color} shrink-0`}>{f.icon}</div>
//                 <div className="flex flex-col">
//                   <h4 className="font-bold text-gray-900 text-[13px] leading-tight">{f.title}</h4>
//                   <p className="text-gray-400 text-[10px]">{f.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>

//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlayCircle, Truck, Users, Layout } from "lucide-react";
import api from "../api"; // Apnar api.js file

// API fetching function using Axios
const fetchBanners = async () => {
  const response = await api.get("/api/banners");
  return response.data; // Axios automatically parsed data provide kore
};

export default function Hero() {
  // React Query for Caching and Performance
  const { data: slides = [], isLoading, isError } = useQuery({
    queryKey: ["heroBanners"],
    queryFn: fetchBanners,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  const features = [
    {
      icon: <Layout className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Product Varieties",
      desc: "Explore styles",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: <Users className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Happy Customers",
      desc: "10k+ shoppers",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: <Truck className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Free Delivery",
      desc: "Orders over ৳1500 ",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Auto Slider Logic
  useEffect(() => {
    if (slides && slides.length > 0) {
      const slideTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(slideTimer);
    }
  }, [slides]);

  useEffect(() => {
    const featureTimer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(featureTimer);
  }, [features.length]);

  if (isLoading) return <div className="h-55 md:h-137.5 bg-gray-50 animate-pulse"></div>;
  if (isError) return null; // Error hole banner section hide thakbe

  return (
    <section className="bg-white pb-6 md:pb-16 font-sans">
      
      {/* --- HERO BANNER --- */}
      <div className="relative h-55 md:h-137.5 overflow-hidden bg-gray-100 md:bg-transparent md:rounded-b-0 shadow-lg md:shadow-none">
        {slides.map((slide, index) => (
          <div
            key={slide._id || index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
             <img 
  src={slide.imageUrl}
  className="w-full h-full object-cover object-center" // object-center ব্যবহার করুন
  alt={slide.title}
  width={1600}
  height={800}
  loading={index === 0 ? "eager" : "lazy"}
/>
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent md:from-white/90 md:via-white/40 md:to-transparent"></div>
            </div>

            {/* Content Content */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-end justify-center md:items-center md:justify-start pb-6 md:pb-0">
              <div className="text-center md:text-left">
                {/* Dynamic Theme Color */}
                <h1 
                  style={{ color: slide.themeColor }}
                  className="text-4xl md:text-7xl font-black bn-font mb-1 leading-tight"
                >
                  {slide.title}
                </h1>
                <p className="text-xl md:text-3xl font-bold bn-font text-white md:text-gray-900 opacity-90 mb-3 md:mb-4">
                  {slide.subtitle || ""}
                </p>
                
                <div className="flex justify-center md:justify-start">
                  <button 

                    style={{ backgroundColor: slide.themeColor }}
                    aria-label={slide.btnText || "আরো দেখুন"} 
                      onClick={() => window.open("https://www.royalcartx.com/product/6a0187e4eb6044bce4289a1a", "_blank")}
                    className="flex items-center gap-2 px-5 py-2.5 md:px-8 md:py-4 text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base shadow-lg transition active:scale-95"
                  >
                    <PlayCircle size={18} className="md:w-5 md:h-5" />
                    <span>{slide.btnText || "Live Now"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- COMPACT FEATURES SLIDER --- */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 md:-mt-8 relative z-40">
        <div className="bg-white/95 backdrop-blur-sm shadow-xl shadow-gray-200/50 rounded-2xl md:rounded-[2.5rem] border border-gray-100 p-1 md:p-2 overflow-hidden">
          
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 divide-x divide-gray-50 py-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-5 px-10 py-4">
                <div className={`p-4 rounded-2xl ${f.color} shrink-0`}>{f.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Auto-Slider */}
          <div className="md:hidden relative h-14 flex items-center justify-center">
            {features.map((f, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-1000 ${
                  i === currentFeature ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className={`p-2 rounded-lg ${f.color} shrink-0`}>{f.icon}</div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-gray-900 text-[13px] leading-tight">{f.title}</h4>
                  <p className="text-gray-400 text-[10px]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}