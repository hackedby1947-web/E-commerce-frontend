

import React, { useEffect, useState , useMemo, useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Trash2, Truck } from "lucide-react";
import { ErrorMessage } from "../validation/Validations";
import {
  initialCheckoutData,
  // checkoutRules,
  // validateForm,
} from "../validation/validationUtils";
import { useCart } from "../context/CartContext";

import api from "../api";
import DeliveryForm from "./form/DeliveryForm ";
import { AuthContext } from "../context/AuthContext"; // path adjust করুন আপনার প্রোজেক্ট অনুযায়ী
import toast from "react-hot-toast";

const Checkout = () => {
  const { setCartItems: setGlobalCartItems  } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  // const { cartItem, deliveryEnabled } = location.state; // ProductDetails থেকে আসা
 const { user  } = useContext(AuthContext);
// এখন currentUser এ logged-in user object থাকবে, login না থাকলে null

  const [errors, setErrors] = useState({});
  // const [formData, setFormData] = useState(initialCheckoutData);
  const [formData, setFormData] = useState({
  ...initialCheckoutData,
  division: "",
  district: "",
  upazila: "",
 
});

  // location.state না থাকলে redirect — state ছাড়া checkout এ আসা ঠিক না
  const singleProduct = location.state?.productDetails;
  const multipleProducts = location.state?.items;
  const hasState = !!(singleProduct || (Array.isArray(multipleProducts) && multipleProducts.length > 0));
 
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // const [savedAddress, setSavedAddress] = useState(null);
const [savedAddresses, setSavedAddresses] = useState([]); // multiple addresses
const [selectedAddress, setSelectedAddress] = useState(null);
const [loading, setLoading] = useState(true); 
const [showForm, setShowForm] = useState(false);





  const products = useMemo(() => {
  if (Array.isArray(multipleProducts) && multipleProducts.length > 0) {
    return multipleProducts;
  } else if (singleProduct) {
    return [singleProduct];
  } else {
    return [];
  }
}, [multipleProducts, singleProduct]);


  const [cartItems, setCartItems] = useState(products);


const hasFreeDelivery = cartItems.some(item => !item.deliveryEnabled);
const hasPaidDelivery = cartItems.some(item => item.deliveryEnabled);

  useEffect(() => {
    // state না থাকলে (direct URL access বা refresh) redirect করো
    // কিন্তু address loading এর জন্য একটু সময় দাও
    if (!hasState) {
      navigate("/", { replace: true });
    }
  }, [hasState, navigate]);


// ১. আইটেমগুলোর বেস প্রাইস (ডেলিভারি ছাড়া)
const itemsTotal = useMemo(() => {
  return cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );
}, [cartItems]);


const [deliveryFees, setDeliveryFees] = useState([]);


  // Fetch delivery fee from backend once
  useEffect(() => {
    api.get("/api/deliveryfee")
      .then(res => setDeliveryFees(res.data)) // [{region, fee}, ...]
      .catch(err => console.error(err));
  }, []);


// // ডেলিভারি ফি (region অনুযায়ী)

  


const deliveryFee = useMemo(() => {
  const selectedDivision = divisions.find(d => d._id === formData.division);
  const selectedRegion = selectedDivision?.name?.toLowerCase().replace(/\s+/g, '');

  if (!selectedRegion) return 0;

  const hasDeliverableItem = cartItems.some(item => item.deliveryEnabled);
  if (!hasDeliverableItem) return 0;

  const feeObj = deliveryFees.find(
    f => f.region.toLowerCase().replace(/\s+/g, '') === selectedRegion
  );

  return feeObj ? feeObj.fee : 0;
}, [cartItems, formData.division, deliveryFees, divisions]);
// total calculation (items total + delivery fee)
const grandTotal = useMemo(() => {
  return itemsTotal + deliveryFee;
}, [itemsTotal, deliveryFee]);


// form input handle change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  //   if (errors[name]) setErrors({ ...errors, [name]: "" });
  // };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => {
    // যদি division change হয়
    if (name === "division") {
      setDistricts([]);   // district reset
      setUpazilas([]);    // upazila reset
      return { ...prev, division: value, district: "", upazila: "" };
    }

    // যদি district change হয়
    if (name === "district") {
      setUpazilas([]);    // upazila reset
      return { ...prev, district: value, upazila: "" };
    }

    // normal field
    return { ...prev, [name]: value };
  });

  // reset error for this field
  if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
};


useEffect(() => {
  api.get("/api/divisions")
    .then(res => setDivisions(res.data))
    .catch(err => console.error(err));
}, []);

useEffect(() => {
  if (!formData.division) return;
  api.get(`/api/districts/${formData.division}`)
    .then(res => {
      setDistricts(res.data)
    })
    .catch(err => console.error(err));
}, [formData.division]);


useEffect(() => {
  if (!formData.district) return;


  api.get(`/api/upazilas/${formData.district}`)
    .then(res => {
      setUpazilas(res.data);
    })
    .catch(err => console.error(err));

}, [formData.district]);


// order confirm করার সময় প্রথমে stock update হবে তারপর order create হবে backend এ, এবং সবশেষে cart clear হবে frontend এ। যদি stock update বা order create কোনটাতেই error আসে তাহলে user কে alert দেখানো হবে।


// const handleConfirmOrder = async () => {
//   // Validate form fields
//   const newErrors = validateForm(
//     {
//       ...formData,
//       region: formData.division,
//       city: formData.district,
//       area: formData.upazila
//     },
//     checkoutRules
//   );
//   setErrors(newErrors);

//   if (Object.keys(newErrors).length > 0) return;

//   try {
//     // Find selected division, district, upazila names
//     const selectedDivision = divisions.find(d => d._id === formData.division);
//     const selectedDistrict = districts.find(d => d._id === formData.district);
//     const selectedUpazila = upazilas.find(u => u._id === formData.upazila);

//     const orderData = {
//       user:  user  ? user._id : "guest",

//       items: cartItems.map(item => ({
//         productId: item._id || item.id,
//         quantity: item.quantity || 1,
//         selectedColor: item.selectedColor || null
//       })),

//       deliveryInfo: {
//         fullName: formData.fullName,
//         phoneNumber: formData.phone,
//         region: selectedDivision ? selectedDivision.name : "",
//         city: selectedDistrict ? selectedDistrict.name : "",
//         area: selectedUpazila ? selectedUpazila.name : "",
//         buildingNo: formData.house,
//         address: formData.address,
//         landmark: formData.landmark || ""
//       }
//     };

//     const { data } = await axios.post(
//       "http://localhost:5000/api/orders",
//       orderData
//     );

//     // Clear purchased items from cart
//     setGlobalCartItems(prev =>
//       prev.filter(item => !(item.selected && item.inStock))
//     );

//     alert("Order confirmed successfully!");

//     navigate("/order-success", {
//       state: { order: data.order },
//       replace: true
//     });

//   } catch (error) {
//     console.error("Order failed:", error.response?.data || error.message);
//     alert(
//       "Failed to place order: " +
//       (error.response?.data?.message || error.message)
//     );
//   }
// };

useEffect(() => {
  if (!selectedAddress) return;

  setFormData(prev => ({
    ...prev,
   
    division: selectedAddress.division?._id || "",
    
  }));
}, [selectedAddress]);


// ✅ cartItems ready হওয়ার পর InitiateCheckout fire হবে
// fbq script load না হলে retry করবে
const initCheckoutFiredRef = React.useRef(false);
useEffect(() => {
  if (!cartItems.length) return;
  if (initCheckoutFiredRef.current) return;

  const fireEvent = () => {
    if (typeof window.fbq !== "function") return false;
    window.fbq("track", "InitiateCheckout", {
      value: grandTotal,
      currency: "BDT",
      num_items: cartItems.length,
      content_ids: cartItems.map(item => item._id || item.id),
      content_type: "product",
    });
    initCheckoutFiredRef.current = true;
    return true;
  };

  // fbq already loaded হলে সাথে সাথে fire করো
  if (fireEvent()) return;

  // না হলে max 3 সেকেন্ড পর্যন্ত retry করো
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (fireEvent() || attempts >= 15) clearInterval(interval);
  }, 200);

  return () => clearInterval(interval);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [cartItems]);






// only Cash On Delivery (COD) available for now, so no payment integration yet. Order confirm করার সাথে সাথে অর্ডার প্লেস হয়ে যাবে।
const handleConfirmOrder = async () => {
  // ১. ভ্যালিডেশন লজিক (যদি সেভ করা অ্যাড্রেস সিলেক্ট না থাকে)
  if (!selectedAddress) {
    const newErrors = {};

    if (!formData.fullName?.trim()) newErrors.fullName = "আপনার পুরো নাম লিখুন";
    if (!formData.phone?.trim()) newErrors.phone = "ফোন নম্বরটি প্রয়োজন";
    if (!formData.division) newErrors.division = "বিভাগ সিলেক্ট করুন";
    if (!formData.district) newErrors.district = "জেলা সিলেক্ট করুন";
    // if (!formData.upazila) newErrors.upazila = "উপজেলা সিলেক্ট করুন";
    // if (!formData.address?.trim()) newErrors.address = "বিস্তারিত ঠিকানা লিখুন";
    if (!formData.house?.trim()) newErrors.house = "home ঠিকানা লিখুন";


    setErrors(newErrors);

    // যদি কোনো এরর থাকে, তবে ফাংশনটি এখানে থেমে যাবে
    if (Object.keys(newErrors).length > 0) {
      toast.error("অনুগ্রহ করে সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন");
      return;
    }
  }

  // ২. ডেলিভারি ডাটা নির্ধারণ
  const deliveryData = selectedAddress
    ? {
        fullName: selectedAddress.fullName || "",
        phoneNumber: selectedAddress.phone || "",
        region: selectedAddress.division?.name || "",
        city: selectedAddress.district?.name || "",
        area: selectedAddress.upazila?.name || "",
        buildingNo: selectedAddress.house || "",
        address: selectedAddress.address || "",
        landmark: selectedAddress.landmark || ""
      }
    : {
        fullName: formData.fullName || "",
        phoneNumber: formData.phone || "",
        region: (divisions.find(d => d._id === formData.division)?.name) || "",
        city: (districts.find(d => d._id === formData.district)?.name) || "",
        area: (upazilas.find(u => u._id === formData.upazila)?.name) || "",
        buildingNo: formData.house || "",
        address: formData.address || "",
        landmark: formData.landmark || ""
      };

  // ৩. অর্ডার সাবমিশন প্রসেস
  try {
    // const orderData = {
    //   user: user ? user._id : "guest",
    //   items: cartItems.map(item => ({
    //     productId: item._id || item.id,
    //     quantity: item.quantity || 1,
    //     selectedColor: item.selectedColor || null
    //   })),
    //   deliveryInfo: deliveryData
    // };

    // Facebook cookies read করার helper
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const orderData = {
  user: user ? user._id : "guest",
  items: cartItems.map(item => ({
    productId: item._id || item.id,
    quantity: item.quantity || 1,
    selectedColor: item.selectedColor || null
  })),
  deliveryInfo: deliveryData,
  fbp: getCookie("_fbp"),
  fbc: getCookie("_fbc"),
  email: user?.email || null,
};

    const { data } = await api.post("/api/orders", orderData);

    // কার্ড ক্লিয়ার করা
    setGlobalCartItems(prev =>
      prev.filter(item => !(item.selected && item.inStock))
    );

    toast.success('Order confirmed successfully! 🛍️', {
      duration: 2000,
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
      },
    });

    navigate("/order-success", {
      state: { order: data.order },
      replace: true
    });

  } catch (error) {
    toast.error("অর্ডার ব্যর্থ হয়েছে: " + (error.response?.data?.message || "আবার চেষ্টা করুন"), {
      duration: 4000,
      style: {
        borderRadius: '12px',
        background: '#ef4444',
        color: '#fff',
      },
    });
  }
};


// Online Payment & Cash On Delivery integration kaj korbe
// const handleConfirmOrder = async () => {
//   // ১. ভ্যালিডেশন (আগের মতোই থাকবে)
//   if (!selectedAddress) {
//     const newErrors = {};
//     if (!formData.fullName?.trim()) newErrors.fullName = "আপনার পুরো নাম লিখুন";
//     if (!formData.phone?.trim()) newErrors.phone = "ফোন নম্বরটি প্রয়োজন";
//     if (!formData.division) newErrors.division = "বিভাগ সিলেক্ট করুন";
//     if (!formData.district) newErrors.district = "জেলা সিলেক্ট করুন";
//     if (!formData.upazila) newErrors.upazila = "উপজেলা সিলেক্ট করুন";
//     if (!formData.house?.trim()) newErrors.house = "বাসার ঠিকানা লিখুন";

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       toast.error("অনুগ্রহ করে সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন");
//       return;
//     }
//   }

//   // ২. ডেলিভারি ডাটা নির্ধারণ (আগের মতোই)
//   const deliveryData = selectedAddress
//     ? {
//         fullName: selectedAddress.fullName || "",
//         phoneNumber: selectedAddress.phone || "",
//         region: selectedAddress.division?.name || "",
//         city: selectedAddress.district?.name || "",
//         area: selectedAddress.upazila?.name || "",
//         buildingNo: selectedAddress.house || "",
//         address: selectedAddress.address || "",
//         landmark: selectedAddress.landmark || ""
//       }
//     : {
//         fullName: formData.fullName || "",
//         phoneNumber: formData.phone || "",
//         region: (divisions.find(d => d._id === formData.division)?.name) || "",
//         city: (districts.find(d => d._id === formData.district)?.name) || "",
//         area: (upazilas.find(u => u._id === formData.upazila)?.name) || "",
//         buildingNo: formData.house || "",
//         address: formData.address || "",
//         landmark: formData.landmark || ""
//       };

//   // ৩. অর্ডার ডাটা গুছিয়ে পেমেন্ট পেজে পাঠিয়ে দেওয়া
//   const checkoutPayload = {
//     items: cartItems.map(item => ({
//       productId: item._id || item.id,
//       title: item.title,
//       image: item.images?.[0],
//       quantity: item.quantity || 1,
//       price: item.price,
//       selectedColor: item.selectedColor || null
//     })),
//     deliveryInfo: deliveryData,
//     itemsTotal,
//     deliveryFee,
//     grandTotal
//   };

//   // পেমেন্ট পেজে নেভিগেট করা
//   navigate("/payment", { state: checkoutPayload });
// };






  const handleRemove = (id) => {
  if (cartItems.length > 1) {
    // এখানে item.id এর বদলে item._id ব্যবহার করুন
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    
    // ঐচ্ছিক: রিমুভ করার পর একটি টোস্ট দেখাতে পারেন
    toast.error('আইটেমটি রিমুভ করা হয়েছে');
  }
};

// useEffect(() => {
//   const fetchAddress = async () => {
//     try {
//       const res = await api.get("/api/address"); // backend returns { success, data }
//       const addresses = res.data.data;
//       setSavedAddresses(addresses);
//       // setSelectedAddress(addresses.length > 0 ? addresses[0] : null); // default first
//             setSelectedAddress(null); // প্রথমে unselected

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchAddress();
// }, []);

useEffect(() => {
  if (!user) {
    setLoading(false); // guest হলে সরাসরি form দেখাবে
    return;
  }

  const fetchAddress = async () => {
    try {
      const res = await api.get("/api/address");
      const addresses = res.data.data;
      setSavedAddresses(addresses);
      setSelectedAddress(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchAddress();
}, [user]);



  if (!cartItems.length) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* DELIVERY INFORMATION */}
     {/* ================= DELIVERY SECTION ================= */}

{loading ? (
  <div className="flex justify-center p-10">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
  </div>
) : savedAddresses.length > 0 && !showForm ? (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-800">Select Delivery Address</h2>
      <button
          onClick={() => {
    setShowForm(true);
    setSelectedAddress(null);
  }}
        aria-label="নতুন ঠিকানা যোগ করুন"
        className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
      >
        + Add New
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {savedAddresses.map((addr) => (
        <div
          key={addr._id}
          onClick={() => setSelectedAddress(addr)}
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
            selectedAddress?._id === addr._id
              ? "border-blue-500 bg-blue-50/50 shadow-md"
              : "border-gray-100 bg-gray-50 hover:border-gray-300"
          }`}
        >
          {selectedAddress?._id === addr._id && (
            <div className="absolute top-3 right-3">
              <div className="bg-blue-600 rounded-full p-1">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
          <p className="font-bold text-gray-800 mb-1">{addr.fullName}</p>
          <div className="flex items-center text-sm text-gray-700 mb-1">
            <span className="opacity-70 mr-1">📞</span> {addr.phone}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {addr.house && <span>{addr.house}, </span>}
            {addr.address}
          </p>
          <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">
            {addr.upazila?.name} • {addr.district?.name} • {addr.division?.name}
          </p>
        </div>
      ))}
    </div>
  </div>
) : (
  // Show delivery form either savedAddresses empty বা showForm true হলে
  <DeliveryForm 
    formData={formData}
    setFormData={setFormData}
    errors={errors}
    setErrors={setErrors}
    divisions={divisions}
    setDivisions={setDivisions}
    districts={districts}
    setDistricts={setDistricts}
    upazilas={upazilas}
    setUpazilas={setUpazilas}
    handleChange={handleChange}
  />
)}

          {/* PACKAGE PRODUCTS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
  <h2 className="text-lg font-bold text-gray-800">Package 1 of {cartItems.length}</h2>
              <p className="text-sm text-gray-500 italic">
                Shipped by <span className="font-semibold text-green-400 not-italic">SteadFast</span>
              </p>
            </div>

              <p className="text-sm font-medium text-gray-700">Delivery or Pickup</p>
    {/* {cartItems.map((product) => {
              

              return (
              <div className="w-full sm:w-72 border-2 border-cyan-500 rounded-lg p-4 bg-cyan-50/20 relative">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                     {!product.deliveryEnabled && (
                    <p className="font-bold text-gray-800 text-sm italic leading-none mb-1">
                      FREE</p>
                    )}


                    <p className="text-gray-600 text-[13px]">Standard Delivery</p>
                    <p className="mt-4 text-gray-500 text-xs font-medium">3-5 কার্যদিবসের মধ্যে ডেলিভারি</p>
                  </div>
                </div>
              </div>
               );
            })} */}

            {hasFreeDelivery && (
  <div className="w-full sm:w-72 border-2 border-green-500 rounded-lg p-4 bg-green-50/20 relative">
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="font-bold text-gray-800 text-sm italic leading-none mb-1">
          FREE
        </p>
        <p className="text-gray-600 text-[13px]">Standard Delivery</p>
        <p className="mt-4 text-gray-500 text-xs font-medium">
          3-5 কার্যদিবসের মধ্যে ডেলিভারি
        </p>
      </div>
    </div>
  </div>
)}

{hasPaidDelivery && (
  <div className="w-full sm:w-72 border-2 border-cyan-500 rounded-lg p-4 bg-cyan-50/20 relative">
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-0.5">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="font-bold text-gray-800 text-sm italic leading-none mb-1">
          Delivery Fee Applied
        </p>
        <p className="text-gray-600 text-[13px]">Standard Delivery</p>
        <p className="mt-4 text-gray-500 text-xs font-medium">
          3-5 কার্যদিবসের মধ্যে ডেলিভারি
        </p>
      </div>
    </div>
  </div>
)}

           {cartItems.map((product) => {
  const discount = product.oldprice
    ? Math.round(((product.oldprice - product.price) / product.oldprice) * 100)
    : 0;

  return (
    <div key={product._id} className="flex items-center py-4 border-t border-gray-100 mt-2 gap-3 sm:gap-6">
      {/* 1. Image Section */}
      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center border overflow-hidden">
        <img src={product.images?.[0]} alt={product.title} className="object-cover w-full h-full" />
      </div>

      {/* 2. Details Section (Title, Color, Price) */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-[15px] font-bold text-gray-800 truncate leading-tight">
          {product.title}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-500">Color: {product.selectedColor || "N/A"}</p>
        
        {/* Price for Mobile (Visible only on small screens) */}
        <div className="flex items-baseline gap-2 mt-1 sm:hidden">
          <span className="text-orange-600 font-bold text-base">৳{product.price}</span>
          {product.oldprice && (
            <span className="text-[12px] font-medium line-through text-gray-400">৳{product.oldprice}</span>
          )}
        </div>
      </div>

      {/* 3. Desktop Price Section (Hidden on Mobile) */}
      <div className="hidden sm:flex flex-col items-center">
        <p className="text-xl text-orange-600 font-black">৳ {product.price}</p>
        <p className="text-xs line-through text-gray-400">৳ {product.oldprice}</p>
        <p className="text-xs font-bold text-green-600">-{discount}%</p>
      </div>

      {/* 4. Quantity and Delete Section */}
      <div className="flex flex-col items-end gap-1 sm:gap-2 shrink-0">
        <p className="text-[10px] sm:text-xs">
          Qty: <span className="font-bold">{product.quantity || 1}</span>
        </p>
        <button
          onClick={() => handleRemove(product._id)}
          disabled={cartItems.length <= 1}
          className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-sm ${
            cartItems.length > 1
              ? "bg-gray-50 hover:bg-red-100 text-gray-400 hover:text-red-500"
              : "bg-gray-50 text-gray-200 cursor-not-allowed opacity-50"
          }`}
        >
          <Trash2 size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
})}
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="space-y-6">
          {/* PROMOTION BOX */}
          {/* <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Promotion</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter Promo Code" className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none" />
              <button aria-label="কুপন প্রয়োগ করুন" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition text-sm">APPLY</button>
            </div>
          </div> */}

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between mb-2">
              <span>Items Total ({cartItems.length} Item)</span>
              <span className="font-semibold">৳ {itemsTotal}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-semibold">
       <span className="text-orange-600 font-semibold">
         {formData.division
        ? deliveryFee > 0
          ? `৳ ${deliveryFee}`
          : "Free"
        : "Select Region"}
  </span>
              </span>
            </div>

            <div className="flex justify-between border-t pt-4">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-orange-600">৳ {grandTotal}</span>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl mt-6"
            >
              Confirm Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;

