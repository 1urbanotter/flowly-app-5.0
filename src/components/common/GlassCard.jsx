import React from "react";

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`bg-background-base/50 dark:bg-background-darker/50 p-4 rounded-xl shadow-glass-light dark:shadow-glass-dark backdrop-blur-md border border-primary-light/20 transition-all-ease duration-smooth animate-fade-in ${className}`}
  >
    {children}
  </div>
);

export default GlassCard;
