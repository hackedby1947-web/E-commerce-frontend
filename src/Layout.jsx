import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">

        <Outlet />
      </main>

      <Footer />
    </>
  );
}

// import { Outlet, useLocation } from "react-router-dom";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";

// export default function Layout() {
//   const location = useLocation();

//   // যে পাথগুলোতে আপনি Navbar দেখাতে চান না সেগুলো এখানে লিখুন
//   const hideNavbarPaths = ["/profile", "/profile/edit-profile", "/profile/live-chat", "/profile/my-order"];
  
//   // চেক করা হচ্ছে বর্তমান পাথটি hideNavbarPaths লিস্টে আছে কি না
//   const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

//   return (
//     <>
//       {/* যদি shouldHideNavbar মিথ্যা হয়, তবেই Navbar দেখাবে */}
//       {!shouldHideNavbar && <Navbar />}

//       <main className="min-h-screen">
//         <Outlet />
//       </main>

//       <Footer />
//     </>
//   );
// }