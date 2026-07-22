import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const styles = {
    primary:
      "bg-green-700 text-white shadow-[0_8px_24px_rgba(46,125,50,0.25)] hover:bg-green-800 hover:shadow-[0_12px_28px_rgba(46,125,50,0.3)] hover:-translate-y-0.5",
    secondary:
      "border border-gray-300 bg-white text-gray-900 hover:border-green-600 hover:bg-[#f7faf7] hover:text-green-800",
    ghost: "text-gray-900 hover:bg-gray-100",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-300 disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
