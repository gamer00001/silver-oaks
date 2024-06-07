import React from "react";

const Button = ({
  type = "button",
  children,
  variant,
  size,
  fullWidth,
  onClick,
  disabled = false,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "p-8 text-white button opacity-button border bg-custom-red rounded-[1rem] disabled:opacity-50";
      case "secondary":
        return "p-8 button border-custom-red text-custom-red bg-white rounded-[1rem] text-xl text-black enabled:hover:opacity-70 transition-opacity border-2 border-black border-opacity-58";
      case "text":
        return "text-blue-500 hover:text-blue-600";
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-6 py-4 text-md";
      case "large":
        return "px-10 py-6";
      default:
        return "px-1 py-6";
    }
  };

  const fullWidthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getVariantClasses()} ${fullWidthClass} ${getSizeClasses()}`}
    >
      {children}
    </button>
  );
};

export default Button;
