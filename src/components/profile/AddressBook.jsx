

//  import React, { useState, useEffect } from "react";
//  import { MapPin, Phone, User, Edit2, Trash2, CheckCircle2, Plus } from "lucide-react";
//  import api from "../../api";

//  const AddressBook = ({ selectedId, onSelect, onEdit, onDelete, openAddressForm }) => {
//    const [savedAddresses, setSavedAddresses] = useState([]);
//    const [loading, setLoading] = useState(true);

//     API থেকে address fetch
//     const fetchAddresses = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("http:localhost:5000/api/address", {
//           method: "GET",
//           credentials: "include",  JWT cookie পাঠানোর জন্য
//         });
//         const data = await res.json();
//         if (res.ok) {
//            backend থেকে populated data আসছে ধরে নেওয়া হয়েছে
//           setSavedAddresses(data.data || []);
//         } else {
//           console.error(data.message);
//           setSavedAddresses([]);
//         }
//       } catch (err) {
//         console.error(err);
//         setSavedAddresses([]);
//       }
//       setLoading(false);
//     };
//  const fetchAddresses = async () => {
//    setLoading(true);
//    try {
//      const res = await api.get("/api/address", {
//        withCredentials: true,  JWT cookie পাঠানোর জন্য
//      });
//       Axios response data এ ডিরেক্টলি থাকে res.data
//      setSavedAddresses(res.data.data || []);
//    } catch (err) {
//      console.error(err);
//      setSavedAddresses([]);
//    } finally {
//      setLoading(false);
//    }
//  };
//    useEffect(() => {
//      fetchAddresses();
//    }, []);

//    if (loading) {
//      return (
//        <div className="flex items-center justify-center p-14 bg-slate-50 rounded-3xl border border-slate-200 text-center">
//          <p>Loading addresses...</p>
//        </div>
//      );
//    }

//    if (savedAddresses.length === 0) {
//      return (
//        <div className="flex flex-col items-center justify-center p-14 bg-slate-50 rounded-3xl border border-slate-200 text-center">
//          <MapPin size={40} className="text-indigo-400 mb-4" />
//          <h3 className="text-xl font-bold">No Address</h3>
//          <button 
//            onClick={openAddressForm} 
//            className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-xl"
//          >
//            Add Address
//          </button>
//        </div>
//      );
//    }

//    return (
//      <div className="space-y-6">

//        {/* Header */}
//        <div className="flex justify-between items-center">
//          <button 
//            onClick={openAddressForm}
//            className="flex items-center gap-2 border border-indigo-500 text-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition"
//          >
//            <Plus size={16}/> Add New
//          </button>
//          <p className="text-sm text-slate-400">Saved ({savedAddresses.length})</p>
//        </div>

//        {/* Address Cards */}
//        <div className="grid md:grid-cols-2 gap-5">
//          {savedAddresses.map((address) => (
//            <div 
//              key={address._id}
//              onClick={() => onSelect && onSelect(address._id)}
//              className={`relative p-5 rounded-2xl cursor-pointer transition-all border ${
//                selectedId === address._id 
//                ? "border-indigo-500 bg-indigo-50 shadow-md scale-[1.02]" 
//                : "border-slate-200 bg-white hover:shadow-lg"
//              }`}
//            >

//              {/* Selected mark */}
//              {selectedId === address._id && (
//                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white p-1 rounded-full">
//                  <CheckCircle2 size={16}/>
//                </div>
//              )}

//              {/* Top */}
//              <div className="flex items-center gap-3 mb-4">
//                <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-xl">
//                  <User size={16}/>
//                </div>
//                <h4 className="font-bold">{address.fullName}</h4>
//              </div>

//              {/* Address */}
//              <div className="text-sm text-slate-600 mb-3 flex gap-2">
//                <MapPin size={14}/>
//                {address.house}, {address.upazila?.name}, {address.district?.name}, {address.division?.name}
//              </div>

//              {/* Phone */}
//              <div className="text-sm font-semibold flex gap-2 mb-4">
//                <Phone size={14}/>
//                {address.phone}
//              </div>

//              {/* Actions */}
//              <div className="flex gap-4 text-xs">
//                <button 
//                  onClick={(e) => { e.stopPropagation(); onEdit && onEdit(address); }} 
//                  className="hover:text-indigo-600 flex gap-1"
//                >
//                  <Edit2 size={14}/> Edit
//                </button>

//                <button 
//                  onClick={async (e) => {
//                    e.stopPropagation();
//                    if (!window.confirm("Are you sure you want to delete?")) return;
//                    try {
//                      const res = await fetch(`https:api-royalcart-8iay.onrender.com/api/address/${address._id}`, {
//                        method: "DELETE",
//                        credentials: "include",
//                      });
//                      if (res.ok) fetchAddresses();
//                    } catch(err) {
//                      console.error(err);
//                    }
//                    onDelete && onDelete(address._id);
//                  }} 
//                  className="hover:text-red-500 flex gap-1"
//                >
//                  <Trash2 size={14}/> Delete
//                </button>
//              </div>

//            </div>
//          ))}
//        </div>
//      </div>
//    );
//  };

//  export default AddressBook;


//  import React, { useState, useEffect } from "react";
//  import { MapPin, Phone, User, Edit2, Trash2, CheckCircle2, Plus } from "lucide-react";
//  import api from "../../api";

//  const AddressBook = ({ selectedId, onSelect, onEdit, onDelete, openAddressForm }) => {
//    const [savedAddresses, setSavedAddresses] = useState([]);
//    const [loading, setLoading] = useState(true);

//    const fetchAddresses = async () => {
//      setLoading(true);
//      try {
//        const res = await api.get("/api/address", {
//          withCredentials: true,
//        });
//        setSavedAddresses(res.data.data || []);
//      } catch (err) {
//        console.error(err);
//        setSavedAddresses([]);
//      } finally {
//        setLoading(false);
//      }
//    };

//    useEffect(() => {
//      fetchAddresses();
//    }, []);

//    if (loading) {
//      return (
//        <div className="flex items-center justify-center p-14 bg-white md:bg-slate-50 rounded-3xl border border-slate-200 text-center">
//          <div className="flex flex-col items-center gap-2">
//            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//            <p className="text-slate-500 font-medium">Loading addresses...</p>
//          </div>
//        </div>
//      );
//    }

//    if (savedAddresses.length === 0) {
//      return (
//        <div className="flex flex-col items-center justify-center p-10 md:p-14 bg-white md:bg-slate-50 rounded-3xl border border-slate-100 md:border-slate-200 text-center">
//          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
//            <MapPin size={40} className="text-indigo-400" />
//          </div>
//          <h3 className="text-xl font-bold text-slate-800">No Address Found</h3>
//          <p className="text-slate-500 mb-6 max-w-xs">You haven't added any delivery addresses yet.</p>
//          <button 
//            onClick={openAddressForm} 
//            className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all"
//          >
//            Add New Address
//          </button>
//        </div>
//      );
//    }

//    return (
//      <div className="space-y-6 pb-24 md:pb-0">
//        {/* Header */}
//        <div className="flex justify-between items-center px-1">
//          <h3 className="font-bold text-slate-800 hidden md:block">Saved Addresses</h3>
//          <button 
//            onClick={openAddressForm}
//            className="hidden md:flex items-center gap-2 border border-indigo-500 text-indigo-600 px-5 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all font-bold"
//          >
//            <Plus size={18}/> Add New
//          </button>
//          <p className="text-sm font-semibold text-slate-500">Total: {savedAddresses.length}</p>
//        </div>

//        {/* Address Cards */}
//        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//          {savedAddresses.map((address) => (
//            <div 
//              key={address._id}
//              onClick={() => onSelect && onSelect(address._id)}
//              className={`relative p-5 rounded-2xl cursor-pointer transition-all border ${
//                selectedId === address._id 
//                ? "border-indigo-500 bg-indigo-50/30 shadow-md ring-1 ring-indigo-500" 
//                : "border-slate-200 bg-white hover:border-indigo-200 shadow-sm"
//              }`}
//            >
//              {/* Selected mark */}
//              {selectedId === address._id && (
//                <div className="absolute top-4 right-4 text-indigo-600">
//                  <CheckCircle2 size={20} fill="currentColor" className="text-white" />
//                </div>
//              )}

//              {/* Top User Info */}
//              <div className="flex items-center gap-3 mb-4">
//                <div className="w-10 h-10 bg-slate-100 text-slate-500 flex items-center justify-center rounded-xl">
//                  <User size={18}/>
//                </div>
//                <div>
//                  <h4 className="font-bold text-slate-800">{address.fullName}</h4>
//                  <div className="text-[12px] text-slate-400 font-medium">Receiver Name</div>
//                </div>
//              </div>

//              {/* Address Details */}
//              <div className="space-y-2.5 mb-5">
//                <div className="text-[13px] text-slate-600 flex gap-2 leading-relaxed">
//                  <MapPin size={15} className="text-slate-400 shrink-0 mt-0.5"/>
//                  <span>{address.house}, {address.upazila?.name}, {address.district?.name}, {address.division?.name}</span>
//                </div>

//                <div className="text-[13px] text-slate-800 font-bold flex items-center gap-2">
//                  <Phone size={14} className="text-slate-400 shrink-0"/>
//                  {address.phone}
//                </div>
//              </div>

//              {/* Actions */}
//              <div className="flex gap-4 pt-4 border-t border-slate-50">
//                <button 
//                  onClick={(e) => { e.stopPropagation(); onEdit && onEdit(address); }} 
//                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
//                >
//                  <Edit2 size={14}/> Edit
//                </button>

//                <button 
//                  onClick={async (e) => {
//                    e.stopPropagation();
//                    if (!window.confirm("Are you sure you want to delete?")) return;
//                    try {
//                      const res = await api.delete(`/api/address/${address._id}`, {
//                        withCredentials: true,
//                      });
//                      if (res.status === 200) fetchAddresses();
//                    } catch(err) {
//                      console.error(err);
//                    }
//                    onDelete && onDelete(address._id);
//                  }} 
//                  className="flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors"
//                >
//                  <Trash2 size={14}/> Delete
//                </button>
//              </div>
//            </div>
//          ))}
//        </div>

//        {/* MOBILE ONLY: Floating Action Button */}
//        <div className="md:hidden fixed bottom-24 right-6 z-50">
//          <button 
//            onClick={(e) => {
//              e.preventDefault();
//              e.stopPropagation();
//              openAddressForm();
//            }}
//            className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all border-4 border-white"
//          >
//            <Plus size={28} strokeWidth={3} />
//          </button>
//        </div>
//      </div>
//    );
//  };

//  export default AddressBook;


import React, { useState, useEffect } from "react";
import { MapPin, Phone, User, Edit2, Trash2, CheckCircle2, Plus, X } from "lucide-react";
import api from "../../api";
import AddressForm from "./AddressForm"; 

const AddressBook = ({ selectedId, onSelect }) => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);  

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/address", { withCredentials: true });
      setSavedAddresses(res.data.data || []);
    } catch (err) {
      console.error(err);
      setSavedAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

   
  const handleAddNew = () => {
    setEditingAddress(null);
    setIsPopupOpen(true);
  };

   
  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditingAddress(null);
    fetchAddresses(); 
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-14 bg-white md:bg-slate-50 rounded-3xl border border-slate-200 text-center font-medium">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mr-3"></div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 md:pb-0 relative">
      {/* Header */}
      {/* <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-slate-800">Saved Addresses</h3>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 border border-indigo-500 text-indigo-600 px-5 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all font-bold"
        >
          <Plus size={18}/> <span className="hidden md:inline">Add New</span>
        </button>
      </div> */}

      {/* Conditional Header & Empty State Design */}
{savedAddresses.length > 0 ? (
  // ১. যখন অ্যাড্রেস সেভ করা আছে (Compact Header)
  <div className="flex items-center justify-between px-2 py-4 mb-2 bg-white/50 backdrop-blur-sm rounded-2xl">
    <div>
      <h3 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
        Saved Addresses
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-[12px] font-bold text-indigo-600">
          {savedAddresses.length}
        </span>
      </h3>
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Default Shipping Locations</p>
    </div>

    <button 
      onClick={handleAddNew}
      className="group flex items-center gap-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white px-4 py-2.5 rounded-xl transition-all duration-300 font-bold border border-indigo-100 shadow-sm active:scale-95"
    >
      <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
      <span className="hidden md:inline">Add New</span>
    </button>
  </div>
) : (
  // ২. যখন কোনো অ্যাড্রেস সেভ করা নেই (Beautiful Empty State)
  <div className="flex flex-col items-center justify-center p-10 md:p-16 bg-linear-to-b from-indigo-50/50 to-white rounded-[40px] border-2 border-dashed border-slate-200 text-center animate-in fade-in zoom-in duration-500">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-20 rounded-full"></div>
      <div className="relative w-24 h-24 bg-white shadow-xl rounded-3xl flex items-center justify-center border border-indigo-50">
        <MapPin size={48} className="text-indigo-500 animate-bounce" />
      </div>
      <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
        <Plus size={20} className="text-indigo-600 font-bold" />
      </div>
    </div>
    
    <h3 className="text-2xl font-black text-slate-800 mb-2">No Address Found!</h3>
    <p className="text-slate-500 max-w-70 mb-8 leading-relaxed font-medium">
      Looks like you haven't added any shipping address yet. Add one to start shopping!
    </p>

    <button 
      onClick={handleAddNew}
      className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:scale-95 font-bold text-lg"
    >
      <Plus size={22} strokeWidth={3} />
      Add New Address
    </button>
  </div>
)}

        

      {/* Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {savedAddresses.map((address) => (
          <div 
            key={address._id}
            onClick={() => onSelect && onSelect(address._id)}
            className={`relative p-5 rounded-2xl cursor-pointer transition-all border ${
              selectedId === address._id 
              ? "border-indigo-500 bg-indigo-50/30 shadow-md ring-1 ring-indigo-500" 
              : "border-slate-200 bg-white hover:border-indigo-200 shadow-sm"
            }`}
          >
            {selectedId === address._id && (
              <div className="absolute top-4 right-4 text-indigo-600">
                <CheckCircle2 size={20} fill="currentColor" className="text-white" />
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-100 text-slate-500 flex items-center justify-center rounded-xl">
                <User size={18}/>
              </div>
              <h4 className="font-bold text-slate-800">{address.fullName}</h4>
            </div>

            <div className="text-[13px] text-slate-600 mb-4 space-y-1">
                <p className="flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> {address.house}, {address.upazila?.name}, {address.district?.name}</p>
                <p className="font-bold text-slate-800 flex gap-2"><Phone size={14} className="shrink-0 mt-0.5" /> {address.phone}</p>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-50">
              <button 
                onClick={(e) => { e.stopPropagation(); handleEdit(address); }} 
                className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:underline"
              >
                <Edit2 size={14}/> Edit
              </button>
              <button 
                onClick={async (e) => {
                  e.stopPropagation();
                  if (window.confirm("Delete this address?")) {
                      await api.delete(`/api/address/${address._id}`, { withCredentials: true });
                      fetchAddresses();
                  }
                }} 
                className="text-rose-500 text-xs font-bold flex items-center gap-1 hover:underline"
              >
                <Trash2 size={14}/> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- POPUP OVERLAY --- */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={closePopup}
          ></div>

          <div className="relative w-full max-w-2xl bg-white rounded-t-4xl md:rounded-4xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white">
              <h3 className="text-xl font-bold text-slate-800">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <button onClick={closePopup} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Form */}
            <div className="p-4 overflow-y-auto">
              <AddressForm 
                isEditing={!!editingAddress} 
                initialData={editingAddress} 
                onSuccess={closePopup} 
              />
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default AddressBook;