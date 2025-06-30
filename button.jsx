"use client";

import React from "react";

const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 shadow-md",
  outlined: "border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2",
  text: "text-blue-600 hover:bg-blue-50 px-4 py-2",
  disabled: "bg-gray-300 text-white cursor-not-allowed px-6 py-2",
};

export default function Button({
  children,
  onClick,
  className = "",
  variant = "default",
  type = "button",
  disabled = false,
  ...props
}) {
  const combinedClassName = `${baseStyles} ${variants[variant] || variants.default} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
