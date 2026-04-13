// import Hero from "../components/Hero";
// import Categories from "../components/Categories";
// import TrendingProducts from "../components/TrendingProducts";



// export default function Home() {
//   return (
//     <div >
//       <Hero/>
//       <Categories/>
//       <TrendingProducts/>
//     </div>
//   );
// }


// import { useSearchParams } from "react-router-dom";
// import { Suspense, useMemo } from "react";
// import Hero from "../components/Hero";
// import Categories from "../components/Categories";
// import TrendingProducts from "../components/TrendingProducts";
// import WomenCollection from "../components/categories/WomenCollection";



// export default function Home() {
//   const [searchParams] = useSearchParams();
//   const selectedCategory = searchParams.get("category") || "All";

//   // ক্যাটাগরি অনুযায়ী কন্টেন্ট রেন্ডার করার জন্য useMemo ব্যবহার করা হয়েছে পারফরম্যান্সের জন্য
//   const content = useMemo(() => {
//     switch (selectedCategory) {
//       case "Women":
//         return (  <div className="py-6 animate-in fade-in duration-500">
//             {/* ডায়নামিক টাইটেল সেকশন */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="h-8 w-1.5 bg-indigo-600 rounded-full shadow-sm"></div>
//               <div>
//                 <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
//                   {selectedCategory} <span className="text-indigo-600">Items</span>
//                 </h2>
//                 <div className="h-1 w-10 bg-indigo-100 mt-1 rounded-full"></div>
//               </div>
//             </div>
            
//             {/* প্রোডাক্ট গ্রিড */}
//             <WomenCollection category={selectedCategory} />
//           </div>
//         );
      
//       case "Grocery":
//         return <Categories />;

//       case "Men":
//       case "Phones":
//       case "Watches":
//         return (
          
//           <div className="py-6 animate-in fade-in duration-500">
//             {/* ডায়নামিক টাইটেল সেকশন */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="h-8 w-1.5 bg-indigo-600 rounded-full shadow-sm"></div>
//               <div>
//                 <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
//                   {selectedCategory} <span className="text-indigo-600">Items</span>
//                 </h2>
//                 <div className="h-1 w-10 bg-indigo-100 mt-1 rounded-full"></div>
//               </div>
//             </div>
            
//             {/* প্রোডাক্ট গ্রিড */}
//             <TrendingProducts category={selectedCategory} />
//           </div>
//         );

//       default: // অর্থাৎ "All" বা ডিফল্ট হোম পেজ
//         return (
          
//    <div >
//       <Hero/>
//       <Categories/>
//       <TrendingProducts/>
//     </div>
//         );
//     }
//   }, [selectedCategory]);

//   return (
//     <main className="min-h-screen bg-gray-50/50">
//       {/* max-w-7xl হোমের ভেতরের সব কন্টেন্টকে এক সারিতে রাখবে। 
//          প্যাডিংগুলো খুব সতর্কভাবে দেওয়া হয়েছে যাতে মোবাইল স্ক্রিনেও গ্যাপ সুন্দর থাকে।
//       */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
//           {content}
//         </Suspense>
//       </div>
//     </main>
//   );
// }

import { useSearchParams } from "react-router-dom";
import { Suspense, useMemo } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TrendingProducts from "../components/TrendingProducts";
import WomenCollection from "../components/categories/WomenCollection";

export default function Home() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const isDefaultView = selectedCategory === "All";

  // ক্যাটাগরি অনুযায়ী কন্টেন্ট রেন্ডার
  const content = useMemo(() => {
    switch (selectedCategory) {
      case "Women":
        return (
          <div className="py-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-indigo-600 rounded-full shadow-sm"></div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  {selectedCategory} <span className="text-indigo-600">Items</span>
                </h2>
                <div className="h-1 w-10 bg-indigo-100  rounded-full"></div>
              </div>
            </div>
            <WomenCollection category={selectedCategory} />
          </div>
        );
      
      case "Grocery":
        return <div className="py-6"><Categories /></div>;

      case "Men":
      case "Phones":
      case "Watches":
        return (
          <div className="py-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-indigo-600 rounded-full shadow-sm"></div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  {selectedCategory} <span className="text-indigo-600">Items</span>
                </h2>
                <div className="h-1 w-10 bg-indigo-100  rounded-full"></div>
              </div>
            </div>
            <TrendingProducts category={selectedCategory} />
          </div>
        );

      default:
        return (
          <div>
            {/* এখানে হিরো নেই, কারণ হিরো নিচে আলাদাভাবে ফুল উইডথে দেওয়া হয়েছে */}
           
               <Categories />
            
               <TrendingProducts />
            
          </div>
        );
    }
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-gray-50/50">
      
      {/* ১. হিরো সেকশন: যদি All সিলেক্ট থাকে, তবে এটি কন্টেইনারের বাইরে থাকবে যাতে ফুল উইডথ পায় */}
      {isDefaultView && <Hero />}

      {/* ২. বাকি কন্টেন্ট: এটি কন্টেইনারের ভেতরে থাকবে যাতে ডানে-বামে প্যাডিং পায় */}
      <div className="max-w-7xl mx-auto ">
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          {content}
        </Suspense>
      </div>
    </main>
  );
}