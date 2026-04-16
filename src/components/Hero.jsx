import React, { useState, useEffect } from "react";
import { PlayCircle, Truck, Users, Layout } from "lucide-react";

export default function Hero() {
  const slides = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dhmm1ruxa/image/upload/v1776249982/products/abgfy2fhjbszdh8n4idf.jpg",
      titleBangla: "নববর্ষ উৎসব",
      dateBangla: "৮ - ১৪ এপ্রিল",
      subtitleBangla: "নতুনর আমানদ, দশে সেরা পছনদ",
      themeColor: "text-red-600",
      btnColor: "bg-red-600"
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dhmm1ruxa/image/upload/v1776245098/products/ftahtlsm39jzfb1x28pd.jpg",
      titleBangla: "বৈশাখী মেলা",
      dateBangla: "১৪ - ২০ এপ্রিল",
      subtitleBangla: "সেরা ফ্যাশন, সেরা দামে",
      themeColor: "text-indigo-600",
      btnColor: "bg-indigo-600"
    },
  ];

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
      desc: "Orders over $99",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    const featureTimer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => {
      clearInterval(slideTimer);
      clearInterval(featureTimer);
    };
  }, [slides.length, features.length]);

  return (
    <section className="bg-white pb-6 md:pb-16 font-sans">
      
      {/* --- HERO BANNER (Image Clear on Mobile) --- */}
      <div className="relative h-55 md:h-137.5 overflow-hidden bg-gray-100 md:bg-transparent md:rounded-b-0 shadow-lg md:shadow-none">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image - এখন ১০০% ক্লিয়ার (full visibility) */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                className="w-full h-full object-cover" // Removed extra opacity
                alt="hero" 
              />
              {/* Overlay: পিসিতে সাদা গ্রাডিয়েন্ট, মোবাইলে কালো গ্রাডিয়েন্ট (লেখা স্পষ্ট করার জন্য) */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent md:from-white/90 md:via-white/40 md:to-transparent"></div>
            </div>

            {/* Content Content (নিচে নামানো হয়েছে এবং লেখা সেন্টারে) */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-end justify-center md:items-center md:justify-start pb-6 md:pb-0">
              <div className="text-center md:text-left">
                <h1 className={`text-4xl md:text-7xl font-black bn-font mb-1 leading-tight text-red-600 md:text-red-600`}>
                  {slide.titleBangla}
                </h1>
                <p className="text-xl md:text-3xl font-bold bn-font text-white md:text-gray-900 opacity-90 mb-3 md:mb-4">
                  {slide.dateBangla}
                </p>
                
                <div className="flex justify-center md:justify-start">
                  <button className={`flex items-center gap-2 px-5 py-2.5 md:px-8 md:py-4 ${slide.btnColor} text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base shadow-lg transition active:scale-95`}>
                    <PlayCircle size={18} className="md:w-5 md:h-5" />
                    <span>Live Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- COMPACT FEATURES SLIDER (Same as before) --- */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 md:-mt-8 relative z-40">
        <div className="bg-white/95 backdrop-blur-sm shadow-xl shadow-gray-200/50 rounded-2xl md:rounded-[2.5rem] border border-gray-100 p-1 md:p-2 overflow-hidden">
          
          {/* Desktop Grid (আগের মতোই থাকবে) */}
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

          {/* Mobile Auto-Slider (এখন আরও সটো এবং ক্লিন) */}
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;700&display=swap');
        .bn-font { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>
    </section>
  );
}