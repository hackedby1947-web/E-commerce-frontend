


import React from 'react';
import { Trash2, Store, Heart, ShieldCheck, Minus, Plus, CheckCircle2, ShoppingBag, BadgeCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

const isAllSelected =
  cartItems?.filter(item => item.inStock).length > 0 &&
  cartItems
    ?.filter(item => item.inStock)
    .every(item => item.selected);


const handleSelectAll = () => {
  const targetValue = !isAllSelected;

  setCartItems(prev =>
    prev.map(item =>
      item.inStock ? { ...item, selected: targetValue } : item
    )
  );
};

const toggleSelect = (id) => {
  setCartItems(prev =>
    prev.map(item =>
      item.id === id
        ? item.inStock
          ? { ...item, selected: !item.selected }
          : item
        : item
    )
  );
};

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  // কালার পরিবর্তনের হ্যান্ডলার
  const handleColorChange = (id, color) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, selectedColor: color } : item
    ));
  };

  // % ডিসকাউন্ট ফর্মুলা
  const calculateDiscount = (price, oldprice) => {
    if (!oldprice || oldprice <= price) return null;
    return Math.round(((oldprice - price) / oldprice) * 100);
  };



const handleCheckout = () => {
  if (!cartItems || cartItems.length === 0) return;

  // ✅ শুধু selected AND in-stock items filter করা
  const selectedInStockItems = cartItems.filter(
    item => item.selected && item.inStock
  );

  if (selectedInStockItems.length === 0) {
    alert("No in-stock items selected for checkout.");
    return;
  }

  // ✅ Checkout page এ পাঠানো
  navigate("/checkout", {
    state: {
      items: selectedInStockItems
    }
  });
};

const selectedItems = cartItems?.filter(  item => item.selected && item.inStock) || [];
  const totalPrice = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="bg-[#F4F4F6] min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 space-y-4">
          {/* হেডার যেখানে আইটেম সংখ্যা দেখাবে */}
          <div className="px-2 mb-2">
            <p className="text-2xl font-black text-gray-800 tracking-tight">Shopping Basket</p>
            <p className="text-sm text-gray-500 font-bold">Total <span className="text-pink-600">{cartItems.length} items</span> added</p>
          </div>

          {/* Select All Bar */}
          <div
          
          className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100">
            <button onClick={handleSelectAll} className="flex items-center gap-3">
              {isAllSelected ? (
                <CheckCircle2
                
                className="text-pink-600 fill-pink-50" size={24} />
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
              )}
              <p className="text-gray-800 font-bold text-sm">Select All Products</p>
            </button>
            {selectedItems.length > 0 && (
              <button onClick={() => setCartItems(prev => prev.filter(i => !i.selected))} className="text-red-500 font-bold text-xs uppercase tracking-wider">
                Delete Selected
              </button>
            )}
          </div>

          {cartItems.map((item) => {
            const discountPercent = calculateDiscount(item.price, item.oldprice);
            
            return (
              <div key={item.id} className={`bg-white p-5 rounded-4xl transition-all border-2 ${item.selected ? 'border-pink-500 shadow-md' : 'border-transparent shadow-sm'}`}>
                
                {/* Verified Shop Label */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <button  disabled={!item.inStock}
  onClick={() => toggleSelect(item.id)}>

    {item.inStock ? (
  item.selected ? (
    <CheckCircle2 className="text-pink-600" size={22} />
  ) : (
    <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
  )
) : (
  <div className="w-5 h-5 border-2 border-gray-200 rounded-full opacity-40 cursor-not-allowed" />
)}
                    </button>
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E7F3FF] border border-[#1877F2]/20 rounded-full shadow-sm">

  <Store size={16} className="text-[#1877F2]" />

  <p className="font-semibold text-[#1877F2] text-xs uppercase tracking-wider">
    Verified Shop
  </p>

  <div className="flex items-center justify-center w-5 h-5 bg-[#1877F2] rounded-full">
    <BadgeCheck size={13} className="text-white" />
  </div>

</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  {/* ইমেজ এবং ডিসকাউন্ট % */}
                  <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden shrink-0 relative border border-gray-100">
                    <img src={item.images?.[0]} alt={item.title} className="w-full h-full object-cover" />
                    {discountPercent && (
                      <div className="absolute top-2 left-2 bg-pink-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                        -{discountPercent}% OFF
                      </div>
                    )}
                  </div>

                  {/* ডিটেইলস */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-bold text-gray-900 leading-tight">{item.title}</p>
                        {/* In Stock - টাইটেলের নিচে */}
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className={`w-2 h-2 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                          <p className={`text-[10px] font-black uppercase tracking-widest ${item.inStock ? 'text-green-600' : 'text-red-500'}`}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-pink-600">৳{item.price}</p>
                        {item.oldprice && <p className="text-xs text-gray-400 line-through font-bold">৳{item.oldprice}</p>}
                      </div>
                    </div>

                    {/* কালার চয়েস - এখান থেকে পরিবর্তন করা যাবে */}
                    <div className="flex items-center gap-2 mt-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase">Color:</p>
                      <div className="flex gap-2">
                        {item.colors?.map((color, i) => (
                          <button 
                            key={i} 
                            onClick={() => handleColorChange(item.id, color)}
                            className={`text-[10px] px-3 py-1 rounded-full font-bold transition-all border ${
                              (item.selectedColor || item.colors[0]) === color 
                              ? 'bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-100' 
                              : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-pink-300'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* কন্ট্রোলস */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"><Minus size={14}/></button>
                        <p className="px-5 font-black text-gray-800">{item.quantity || 1}</p>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"><Plus size={14}/></button>
                      </div>
                      <div className="flex gap-5 text-gray-400">
                        <Heart size={18} className="cursor-pointer hover:text-pink-500 transition-colors" />
                        <Trash2 size={18} className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* অর্ডার সামারি */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50 sticky top-8">
            <p className="text-xl font-black text-gray-800 mb-8 border-b pb-4 uppercase tracking-tighter">Order Summary</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-gray-500 font-bold text-sm">
                <p>Subtotal ({selectedItems.length} items)</p>
                <p className="text-gray-900">৳{totalPrice}</p>
              </div>
              <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
                <p className="text-lg font-black text-gray-800">Total Bill</p>
                <p className="text-3xl font-black text-pink-600 tracking-tighter">৳{totalPrice}</p>
              </div>
            </div>
            <button 
            onClick={handleCheckout}
            disabled={selectedItems.length === 0} className={`w-full mt-10 py-5 rounded-2xl font-black text-white text-lg transition-all shadow-xl active:scale-95 ${selectedItems.length > 0 ? 'bg-black hover:bg-gray-800' : 'bg-gray-200 cursor-not-allowed text-gray-400'}`}>
              Checkout Now ({selectedItems.length})
            </button>
            <div className="mt-6 flex flex-col items-center gap-2 opacity-30">
              <ShieldCheck size={20} className="text-gray-900" />
              <p className="text-[9px] uppercase tracking-widest font-black">100% Secure Transaction</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}