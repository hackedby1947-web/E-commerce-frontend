import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  User, MapPin, Package, Ticket, Heart, MessageCircle, 
  LogOut, Star, Undo2, XCircle, Camera, ShoppingBasket, 
  ChevronRight, CreditCard, Clock, CheckCircle, Truck, 
  PackageCheck, MessageSquare, LayoutGrid, Settings, HelpCircle, Bell, ShieldCheck
} from 'lucide-react';
import MyOrders from './profile/MyOrders';
import MyProfile from './profile/MyProfile';
import EditProfile from './profile/EditProfile';
import { AuthContext } from "../context/AuthContext";
import AddressBook from './profile/AddressBook';
import AddressForm from './profile/AddressForm';
import Messages from './Message';
import api from '../api';
import TrendingProducts from './TrendingProducts';
const Profile = () => {
  const navigate = useNavigate();
  

  const [activeMenu, setActiveMenu] = useState("My Orders");
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useContext(AuthContext); // 🔹 context থেকে আনছো
  const { user } = useContext(AuthContext); // context থেকে user



  // displayName সেট করা
  const displayName = user?.name || "User";
  const displayContact = user?.mobile || user?.email || "";

  const handleLogout = async () => {
    try {
      // Backend logout call (cookie remove)
      await api.post(
        "/api/auth/logout",
        {},
        { withCredentials: true } // cookie পাঠানোর জন্য জরুরি
      );

      // Frontend context reset
      logout();

      navigate("/login"); // login page এ redirect
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Sidebar Menu Structure (PC ONLY)
  const menuSections = [
    {
      title: "Manage My Account",
      items: [
        { icon: <User size={16} />, label: "My Profile" },
        { icon: <MapPin size={16} />, label: "Address Book" },
      ]
    },
    {
      title: "Voucher Center",
      items: [
        { icon: <Ticket size={16} />, label: "My Voucher" },
      ]
    },
    {
      title: "All Orders",
      items: [
        { icon: <Package size={16} />, label: "My Orders" },
        { icon: <Undo2 size={16} />, label: "My Returns" },
        // { icon: <XCircle size={16} />, label: "My Cancellation" },
      ]
    },
    {
      title: "Personal",
      items: [
        { icon: <Star size={16} />, label: "My Reviews" },
        { icon: <Heart size={16} />, label: "My Wishlist" },
        { icon: <MessageCircle size={16} />, label: "Live Chat",   onClick: () => navigate("/live-chat"), // the route you want to go
     },
      ]
    }
  ];


  // Mobile Grid Icons (Based on image 009cc1.png)
  const mobileOrderGrid = [
    { icon: <LayoutGrid size={24} />, label: 'All', onClick: () => navigate("/profile/my-order") },
    { icon: <CreditCard size={24} />, label: 'To Pay' },
    { icon: <Clock size={24} />, label: 'Pending' },
    { icon: <CheckCircle size={24} />, label: 'Confirmed' },
    { icon: <Truck size={24} />, label: 'To Ship' },
    { icon: <PackageCheck size={24} />, label: 'Shipped' },
    { icon: <MessageSquare size={24} />, label: 'Reviews' },
    { icon: <XCircle size={24} />, label: 'Cancellations' },
  ];

  const mobileServiceGrid = [
    { icon: <Settings size={24} />, label: 'Setting' },
    { icon: <HelpCircle size={24} />, label: 'Help', onClick: () => navigate("/profile/live-chat") },
    { icon: <Undo2 size={24} />, label: 'Returns' },
    { icon: <MapPin size={24} />, label: 'Address', onClick: () => navigate("/profile/address-book"),  },
    { icon: <ShieldCheck size={24} />, label: 'Policies' },
    { icon: <Bell size={24} />, label: 'Notifications' },
    { icon: <Heart size={24} />, label: 'My Wishlist' },
    { icon: <LogOut onClick={handleLogout}
       size={24} />, label: 'Logout' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* ==========================================
            EXACT SIDEBAR DESIGN (PC)
            ========================================== */}
        <aside className="hidden md:block w-64 bg-white shadow-sm border border-slate-100 h-fit sticky top-8">
          <div className="p-2 px-6">
            <p className="text-xs text-slate-400">Hello,</p>
            <p className="font-bold text-slate-800 mb-1">{displayName}</p>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">Verified Account</span>
          </div>

          <nav className="pb-6">
            {menuSections.map((section, idx) => (
              <div key={idx} className="mt-0">
                <h3 className={`px-6 py-2 text-[13px] font-bold ${idx === 0 ? 'text-pink-600' : 'text-slate-800'}`}>
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item, i) => (
                    <button
  key={i}
  onClick={() => setActiveMenu(item.label)}
  className={`w-full flex items-center gap-3 px-8 py-1.5 text-[13px] transition-all ${
    activeMenu === item.label
      ? "text-indigo-600 bg-slate-50 font-medium"
      : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
  }`}
>
  <span className="opacity-70">{item.icon}</span>
  <span>{item.label}</span>
</button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleLogout} aria-label="লগআউট করুন" className="w-full flex items-center gap-3 px-8 py-2 border-t border-slate-50 text-slate-500 hover:text-rose-600 text-[13px] font-medium">
              <LogOut size={16} /> <span>Logout</span>
            </button>
          </nav>
        </aside>


        <div>
  
 

  

</div>

        {/* ==========================================
            MAIN CONTENT AREA
            ========================================== */}
        <main className="flex-1 space-y-4 md:space-y-6">
          
          {/* Header Section (Mobile Adaptive) */}
          <section className="bg-white p-6 md:rounded-lg shadow-sm flex items-center justify-between border-b md:border border-slate-100">
             <div className="flex items-center space-x-5">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                     <User size={30} className="text-slate-300" />
                  </div>
                  <button aria-label="প্রোফাইল ছবি পরিবর্তন করুন" className="absolute bottom-0 right-0 bg-white shadow-md p-1 rounded-full border border-slate-100 md:hidden">
                    <Camera size={12} className="text-slate-600" />
                  </button>
                </div>
                <div>
                   <h2 className="text-xl font-bold text-slate-800 leading-tight">{displayName}</h2>
                   <p className="text-slate-400 text-xs truncate max-w-37.5 md:max-w-none">{displayContact}</p>
                   <div className="flex gap-2 mt-2 md:hidden">
                    <Link to="/profile/edit-profile">
                      <button className="text-[10px] font-bold bg-slate-100 px-3 py-1 rounded text-slate-600"
                      
                      >Edit Profile</button>
                      </Link>
                      <button aria-label="আমার ভাউচার দেখুন" className="text-[10px] font-bold text-pink-600 border border-pink-100 px-3 py-1 rounded">My Voucher</button>
                   </div>
                </div>
             </div>
             <button
  onClick={() => {
    setActiveMenu("Edit Profile");
    setIsEditing(true);
  }}
  className="hidden md:block text-xs font-bold text-indigo-600 border border-indigo-100 px-4 py-2 rounded-md hover:bg-indigo-50 transition-all uppercase"
>
  Mange Profile
</button>
          </section>

          {/* MOBILE ONLY: Order Grid Section */}
          <section className="bg-white md:hidden shadow-sm overflow-hidden border-b border-slate-100">
            <div className="px-5 py-3 border-b flex justify-between items-center">
               <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                 <Package size={18} className="text-slate-400" /> My Orders
               </h3>
               <ChevronRight size={16} className="text-slate-300" />
            </div>
            <div className="grid grid-cols-4 gap-y-6 py-6">
               {mobileOrderGrid.map((item, idx) => (
                 <div key={idx}
                 onClick={item.onClick}
                 className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                   <div className="text-slate-600">{item.icon}</div>
                   <span className="text-[10px] text-slate-500 font-semibold">{item.label}</span>
                 </div>
               ))}
            </div>
          </section>

          {/* PC ONLY: Orders Section with Tabs (Ager Motoi) */}
        
              {activeMenu === "My Orders" && (
  <div className="hidden md:block">

   <MyOrders/>
   </div>
  )}

 

{activeMenu === "My Profile" && (
  <div className="hidden md:block">
    <MyProfile 
      openEditProfile={() => {
        setActiveMenu("Edit Profile");
        setIsEditing(true);
      }}
    />
  </div>
)}

{activeMenu === "Edit Profile" && (
  <div className="hidden md:block">
    <EditProfile isEditing={isEditing} setIsEditing={setIsEditing} />
  </div>
)}


 



  {activeMenu === "Address Book" && (
  <div className="w-full">
    <AddressBook 
      openAddressForm ={() => {
        setActiveMenu("Address Form");
        setIsEditing(true);
      }}
    />
  </div>
)}

  {activeMenu === "Address Form" && (
  <div className="hidden md:block">
    <AddressForm isEditing={isEditing} setIsEditing={setIsEditing} />
  </div>
)}

      
              {activeMenu === "Live Chat" && (
   <Messages/>
  )}
          {/* MOBILE ONLY: Track Orders & Services */}
          <section className="md:hidden space-y-4 pb-10">
            <div className="bg-white shadow-sm px-5 py-3 flex items-center gap-2 border-b">
               <Truck size={18} className="text-slate-400" />
               <h3 className="font-bold text-slate-700 text-sm">Track Orders</h3>
            </div>
            
            <div className="bg-white shadow-sm grid grid-cols-4 gap-y-8 py-8">
               {mobileServiceGrid.map((item, idx) => (
                 <div key={idx}
                 onClick={item.onClick}
                 className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                   <div className="text-slate-500">{item.icon}</div>
                   <span className="text-[10px] text-slate-500 font-semibold text-center leading-tight">{item.label}</span>
                 </div>
               ))}
            </div>
<TrendingProducts/> {/* এই লাইনটি যোগ করা হয়েছে যাতে প্রোফাইল পেজে ট্রেন্ডিং প্রোডাক্টস দেখানো যায় */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;