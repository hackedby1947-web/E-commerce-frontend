import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const OrderContext = ({ children }) => {
  const location = useLocation();

  // চেক করছি ইউজারের কাছে সেই 'fromOrderButton' স্টেটটি আছে কি না
  const isFromButton = location.state?.fromOrderButton;

  if (!isFromButton) {
    // যদি সরাসরি URL টাইপ করে আসে, তবে তাকে হোম পেজে পাঠিয়ে দাও
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OrderContext;