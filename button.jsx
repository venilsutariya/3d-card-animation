"use client";

import React from "react";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
