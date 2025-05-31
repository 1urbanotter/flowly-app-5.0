import React from "react";
import { useTheme } from "../../hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme(); // Leverage theme context for consistency

  return (
    <footer
      className="w-11/12 mx-auto mb-6 rounded-xl bg-background-base dark:bg-background-dark bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 dark:bg-opacity-20 border border-primary-light/20 shadow-glass-light dark:shadow-glass-dark p-4 text-center text-lg text-text-base dark:text-text-light font-sans transition-all-ease duration-smooth"
      aria-label="Site footer"
    >
      © {new Date().getFullYear()} Flowly. All rights reserved.
    </footer>
  );
};

export default Footer;
