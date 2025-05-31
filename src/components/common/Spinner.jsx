import React from "react";

const Spinner = ({
  size = "w-8 h-8",
  color = "border-primary-DEFAULT",
  className = "",
}) => {
  return (
    <div
      className={`spinner-border animate-spin inline-block ${size} border-4 rounded-full border-t-transparent ${color} ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
