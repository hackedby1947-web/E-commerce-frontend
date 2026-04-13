// Validation.jsx
import React from "react";

/**
 * Reusable Error Message Component
 */
export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
};