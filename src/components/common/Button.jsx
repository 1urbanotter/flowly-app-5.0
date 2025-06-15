import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  size = "lg",
}) => {
  const baseStyles =
    "relative flex items-center justify-center rounded-lg font-bold font-mono transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4";

  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-primary-light text-black shadow-lg shadow-primary-light/50 hover:bg-primary-light/10 hover:text-white focus:ring-teal-300",
    secondary:
      "bg-secondary-light text-black shadow-lg shadow-yellow-400/50 hover:bg-yellow-300 focus:ring-yellow-200",
    outline:
      "bg-transparent border-2 border-primary text-primary-light hover:bg-primary-light/50 hover:text-white focus:ring-teal-300",
    danger:
      "bg-red-600 text-white shadow-lg shadow-red-600/50 hover:bg-red-500 focus:ring-red-400",
    ghost:
      "bg-transparent text-teal-400 hover:bg-teal-500/20 focus:ring-teal-300",
  };

  const disabledStyles = "opacity-40 cursor-not-allowed pointer-events-none";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        disabled ? disabledStyles : ""
      } ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
