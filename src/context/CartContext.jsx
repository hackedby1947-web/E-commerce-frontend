
// src/context/AuthContext.jsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

// ১. কনটেক্সট তৈরি
const CartContext = createContext();

// ২. মেইন প্রোভাইডার (এটি Default Export হবে)
export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // প্রোডাক্ট অ্যাড করার ফাংশন
const addToCart = (product) => {
  setCartItems((prev) => {
    const isExist = prev.find((item) => item.id === product.id);
    if (isExist) {
      return prev.map((item) =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + product.quantity } // আগের সাথে নতুন quantity যোগ হবে
          : item
      );
    }
    return [...prev, { ...product, selected: true }];
  });
};

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ৩. কাস্টম হুক (এটি Named Export)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};