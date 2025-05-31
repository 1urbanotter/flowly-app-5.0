import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "py-4 px-6 rounded-xl text-base text-lg font-semibold font-mono focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-out"; // Adjusted padding, rounded, font-size, and focus ring basics

  const variantStyles = {
    primary:
      "bg-primary text-text-light dark:text-text-dark hover:bg-primary-dark focus:ring-primary-light focus:ring-opacity-60", // Corrected text color and focus ring
    secondary:
      "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary-light focus:ring-opacity-60", // Corrected focus ring
    outline:
      "bg-transparent border-4 border-text-light npmdark:border-primary-light text-text-light dark:text-primary-light hover:bg-primary dark:hover:bg-primary-light hover:text-black dark:hover:text-black focus:ring-primary-light focus:ring-opacity-60 focus:bg-primary-light dark:focus:bg-primary-dark",
    danger:
      "bg-danger text-text-base dark:text-text-dark hover:opacity-80 focus:ring-danger focus:ring-opacity-60", // Adjusted text color, using opacity for hover for now, added focus ring
    ghost:
      "bg-transparent text-text-light dark:text-text-base hover:bg-background-base dark:hover:bg-background-dark focus:ring-primary-light focus:ring-opacity-60", // Adjusted text colors, hover background, and focus ring
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? disabledStyles : ""
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
