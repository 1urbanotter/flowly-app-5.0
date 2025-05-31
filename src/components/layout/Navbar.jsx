import React from "react";
import { MdMenu, MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";
import FlowlyLogo from "../../assets/flowly-logo.svg";

const Navbar = ({ setIsSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="sticky m-4 top-4 z-40 bg-background-base dark:bg-background-dark bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 dark:bg-opacity-30 border border-primary-light/20 shadow-glass-light dark:shadow-glass-dark p-4 flex items-center justify-between rounded-xl transition-all-ease duration-smooth"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-primary-light dark:text-text-light lg:hidden p-2 rounded-md hover:bg-primary-light/20 dark:hover:bg-secondary-light/20 focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-background-base transition-all-ease duration-fast"
          aria-label="Open sidebar"
        >
          <MdMenu size={28} />
        </button>
        <Link to="/" className="flex items-center gap-4">
          <img src={FlowlyLogo} alt="Flowly Logo" className="h-12 w-auto" />
          <span className="text-3xl font-mono font-bold text-primary-light dark:text-secondary-light">
            Flowly
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-text-base dark:text-text-light p-2 rounded-full border border-primary-light/20 shadow-glass-light dark:shadow-glass-dark hover:bg-primary-light/20 dark:hover:bg-secondary-light/20 focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-background-base transition-all-ease duration-fast"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <MdDarkMode size={28} />
          ) : (
            <MdLightMode size={28} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
