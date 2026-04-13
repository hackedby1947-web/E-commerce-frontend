

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trash2, Truck } from 'lucide-react'; 
import { ErrorMessage } from '../validation/Validations';
import {  initialCheckoutData, checkoutRules, validateForm,  } from '../validation/validationUtils';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialCheckoutData);

const singleProduct = location.state?.productDetails;
const multipleProducts = location.state?.items;

// দুইটাই support করবে
const products = multipleProducts
  ? multipleProducts
  : singleProduct
  ? [singleProduct]
  : [];

const [cartItems, setCartItems] = useState(products);



  // useEffect(() => {
  //   if (!location.state || !location.state.fromOrderButton) {
  //     navigate('/', { replace: true });
  //   }
  // }, [location, navigate]);

   useEffect(() => {
      if (!products.length) {
        navigate("/", { replace: true });
      }
    }, [products, navigate]);

   const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  if (!products.length) {
  navigate("/", { replace: true });
  return null;
}


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // const handleConfirmOrder = () => {
  //   const newErrors = validateForm(formData, checkoutRules);
  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     console.log("Form Data:", formData);
  //     alert("Order Confirmed!");
  //   }

  //       // navigate("/checkout", { state: { product } }); // product কে state হিসেবে পাঠাচ্ছে

  // }

 const handleConfirmOrder = () => {

    const newErrors = validateForm(formData, checkoutRules);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Order Items:", cartItems);
      console.log("Customer Info:", formData);
      alert("Order Confirmed!");
    }

  };

  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
  };

  if (!cartItems.length) return null;
   

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Delivery Information & Package Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Delivery Information Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>

  <input
    type="text"
    name="fullName"
    value={formData.fullName}
    onChange={handleChange}
    placeholder="Enter your first and last name"
    className={`w-full p-3 border rounded-lg focus:outline-none transition ${
      errors.fullName
        ? "border-red-500"
        : "border-gray-300 "
    }`}
  />

  {/* {errors.fullName && (
    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
  )} */}
  <ErrorMessage message={errors.fullName} />
</div>

              {/* Region */}
                <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>

  <select
    name="region"
    value={formData.region}
    onChange={handleChange}
    className={`w-full p-3 border rounded-lg focus:outline-none transition bg-white ${
      errors.region ? "border-red-500" : "border-gray-300"
    }`}
  >
    <option>Please choose your region</option>
    <option>Dhaka</option>
    <option>Chattogram</option>
  </select>

  {errors.region && (
    <p className="text-red-500 text-xs mt-1">{errors.region}</p>
  )}
</div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Please enter your phone number"
                  className={`w-full p-3 border rounded-lg focus:outline-none transition ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-300 "
                  }`}
                />
                 {errors.phone && (
    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
  )}
              </div>

              {/* City */}
           <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    City
  </label>

  <select
    name="city"
    value={formData.city}
    onChange={handleChange}
    className={`w-full p-3 border rounded-lg focus:outline-none transition bg-white text-gray-600 ${
      errors.city ? "border-red-500" : "border-gray-300"
    }`}
  >
    <option value="">Please choose your city</option>
    <option value="Dhaka">Dhaka</option>
    <option value="Sirajganj">Sirajganj</option>
  </select>

  {errors.city && (
    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
  )}
</div>

              {/* Building / House */}
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Building / House No / Floor / Street
  </label>

  <input
    type="text"
    name="house"
    value={formData.house}
    onChange={handleChange}
    placeholder="House# 123, Street# 123, ABC Road"
    className={`w-full p-3 border rounded-lg focus:outline-none transition ${
      errors.house
        ? "border-red-500"
        : "border-gray-300 "
    }`}
  />

  {errors.house && (
    <p className="text-red-500 text-xs mt-1">{errors.house}</p>
  )}
</div>

              {/* Thana/Upzila */}
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Area / Upazila
  </label>

  <select
    name="area"
    value={formData.area}
    onChange={handleChange}
    className={`w-full p-3 border rounded-lg focus:outline-none transition bg-white text-gray-600 ${
      errors.area ? "border-red-500" : "border-gray-300"
    }`}
  >
    <option value="">Please choose your area</option>
    <option value="Sirajganj">Sirajganj</option>
    <option value="Shahjadpur">Shahjadpur</option>
  </select>

  {errors.area && (
    <p className="text-red-500 text-xs mt-1">{errors.area}</p>
  )}
</div>

              {/* Landmark (আগে বাদ পড়েছিল) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Landmark / Nearby Place</label>
                <input type="text" placeholder="Please enter" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none transition " />
              
              </div>

              {/* Address (আগে বাদ পড়েছিল) */}
           <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Address
  </label>

  <input
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange}
    placeholder="Your full address"
    className={`w-full p-3 border rounded-lg focus:outline-none transition ${
      errors.address
        ? "border-red-500"
        : "border-gray-300 "
    }`}
  />

  {errors.address && (
    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
  )}
</div>
            </div>
          </div>

          {/* 2. Package Details (Image Inspired Design) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Package 1 of 3</h2>
              <p className="text-sm text-gray-500 italic">
                Shipped by <span className="font-semibold text-gray-900 not-italic">Lotto</span>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700">Delivery or Pickup</p>

              <div className="w-full sm:w-72 border-2 border-cyan-500 rounded-lg p-4 bg-cyan-50/20 relative">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm italic leading-none mb-1">FREE</p>
                    <p className="text-gray-600 text-[13px]">Standard Delivery</p>
                    <p className="mt-4 text-gray-500 text-xs font-medium">Guaranteed by 13-15 Mar</p>
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-t border-gray-50 mt-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 p-1">
                    <img src={product.images?.[0]} alt={product.title}  className="object-contain" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded italic leading-none">3.3</span>
                      <h3 className="text-sm font-semibold text-gray-800 leading-tight">{product?.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 font-semibold">Color: <span>{product?.selectedColor}</span></p>
                    <div className="flex items-center gap-1 text-cyan-600 pt-1">
                      <Truck size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Free Shipping</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end mt-4 sm:mt-0 ml-auto sm:ml-0">
                  <div className="text-right">
                    <p className="text-xl text-orange-600 font-bold leading-none">৳ 893</p>
                    <p className="text-xs text-gray-400 line-through mt-1">৳ 1,190</p>
                    <p className="text-xs text-gray-600 font-medium">-25%</p>
                  </div>
                  <div className="mt-3 flex flex-col items-end gap-2">
                    <p className="text-xs text-gray-500">Qty: <span className="text-gray-900 font-bold">{product?.quantity}</span></p>
                    <button className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div> */}

             

                  

<div className="flex flex-col sm:flex-row items-center py-6 border-t border-gray-100 mt-4 gap-6">
  
  {/* ১. বাম পাশে: ইমেজ এবং টাইটেল */}
    
  <div key={product.id} className="flex items-center gap-4 flex-1">
    <div className="relative w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center border
     border-gray-100 overflow-hidden shadow-sm shrink-0">
      <img 
        src={product.images?.[0]} 
        alt={product.title} 
        className="w-full h-full object-cover" 
      />
    </div>

    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="bg-orange-600 text-white text-[10px] font-black px-2 py-0.5 rounded italic shadow-sm">3.3</span>
        <h3 className="text-[15px] font-bold text-gray-800 leading-tight">{product?.title}</h3>
      </div>
      <p className="text-xs text-gray-500 font-medium">
        Color: <span className="text-gray-900 font-bold">{product?.selectedColor || 'N/A'}</span>
      </p>
      <div className="flex items-center gap-1.5 text-cyan-600 bg-cyan-50 w-fit px-2 py-0.5 rounded-full">
        <Truck size={12} strokeWidth={2.5} />
        <span className="text-[10px] font-bold uppercase tracking-tight">Free Shipping</span>
      </div>
    </div>
  </div>

  {/* ২. মাঝখানে: প্রাইস এবং ডিসকাউন্ট (Centered) */}
  <div className="flex flex-col items-center justify-center min-w-50">
    <p className="text-2xl text-orange-600 font-black leading-none">৳ {product?.price}</p>
    <div className="flex items-center gap-2 mt-2">
      <p className="text-xs text-gray-400 line-through font-medium">৳ {product?.oldprice}</p>
      <p className="text-xs text-gray-700 font-bold bg-gray-100 px-1.5 py-0.5 rounded">
        -{discount}% OFF
      </p>
    </div>
  </div>

  {/* ৩. ডান পাশে: কোয়ান্টিটি এবং ডিলিট বাটন */}
 

  <div className="flex flex-col items-end justify-center gap-2 min-w-20 relative">
  {/* Quantity */}
  <p className="text-xs text-gray-500 font-medium whitespace-nowrap">
    Qty: <span className="text-gray-900 font-extrabold text-sm">{product?.quantity || 1}</span>
  </p>

  {/* Trash Icon */}
  
  {/* <button
    //  onClick={() => handleRemove(product.id)}// আপনার remove function
    className="p-2 mt-6 rounded-full bg-gray-50 hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
  >
    <Trash2 size={22} strokeWidth={1.5} />
  </button> */}

<button
    // এখানে 'cartItems' হলো সেই অ্যারে যেটার ভেতর সব প্রোডাক্ট আছে
    onClick={() => {
      if (cartItems.length > 1) {
        const updated = cartItems.filter(item => item.id !== product.id);
        setCartItems(updated);
      }
    }}
    // কন্ডিশন: লেন্থ ১ বা তার কম হলে ডিজেবল থাকবে
    disabled={cartItems.length <= 1}
    className={`p-2 mt-6 rounded-full transition-all duration-300 shadow-md 
      ${cartItems.length > 1 
        ? "bg-gray-50 hover:bg-red-100 text-gray-400 hover:text-red-500 hover:scale-110" 
        : "bg-gray-100 text-gray-200 cursor-not-allowed opacity-50"}`}
  >
    <Trash2 size={22} strokeWidth={1.5} />
  </button>

  
</div>

</div>


            </div>
          </div>
        </div>
        

        {/* Right Side: Order Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Promotion</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter Promo Code" className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none" />
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition text-sm">APPLY</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
              <button className="text-blue-500 hover:underline text-sm font-medium">Edit</button>
            </div>
            <div className="space-y-4 border-b border-gray-100 pb-4 text-gray-600">
              <div className="flex justify-between">
                <span>Items Total (1 Item)</span>
                <span className="font-semibold text-gray-800">৳ 893</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-green-600 uppercase text-sm">Free</span>
              </div>
            </div>
            <div className="pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-orange-600">৳ 893</span>
                  <p className="text-[10px] text-gray-400">VAT included</p>
                </div>
              </div>
              <button 
              onClick={handleConfirmOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 transition-all transform active:scale-[0.98]">
                Confirm Order
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;



