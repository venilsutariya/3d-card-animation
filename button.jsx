"use client";

import React from "react";

const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  default: "bg-black text-white hover:bg-gray-800",
  outline: "border border-gray-300 text-black hover:bg-gray-100",
  ghost: "text-black hover:bg-gray-100",
  link: "text-black underline-offset-4 hover:underline",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  children,
  onClick,
  className = "",
  variant = "default",
  type = "button",
  ...props
}) {
  const combinedClassName = `${baseStyles} ${variants[variant] || ""} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
}
