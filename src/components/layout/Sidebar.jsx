import React, { useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdClose,
  MdDashboard,
  MdListAlt,
  MdAccountBalanceWallet,
  MdSettings,
  MdLogout,
  MdBarChart,
  MdInventory,
} from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import FlowlyLogo from "../../assets/flowly-logo.svg";
import toast from "react-hot-toast";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const navLinks = useMemo(
    () => [
      { name: "Dashboard", path: "/", icon: MdDashboard },
      { name: "Transactions", path: "/transactions", icon: MdListAlt },
      { name: "Accounts", path: "/accounts", icon: MdAccountBalanceWallet },
      { name: "Inventory", path: "/inventory", icon: MdInventory },
      { name: "Reports", path: "/reports", icon: MdBarChart },
      { name: "Settings", path: "/settings", icon: MdSettings },
    ],
    []
  );

  const handleClose = () => setIsOpen(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      handleClose();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      const focusableElements = sidebarRef.current.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      firstElement?.focus();

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          handleClose();
          e.preventDefault();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  // Click outside to close on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background-dark/50 backdrop-blur-sm lg:hidden transition-opacity duration-fast"
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed left-0 z-50 h-auto w-64 rounded-xl font-sans bg-background-base/20 dark:bg-background-dark/20 backdrop-blur-md border-r border-primary-light/20 shadow-glass-light dark:shadow-glass-dark transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-5 translate-y-8" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
        aria-expanded={isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary-light/20">
          <Link
            to="/"
            onClick={handleClose}
            className="flex items-center gap-2"
            aria-label="Flowly Home"
          >
            <img src={FlowlyLogo} alt="Flowly Logo" className="h-12" />
            <span className="text-3xl font-mono font-bold text-primary-light dark:text-secondary-light">
              Flowly
            </span>
          </Link>
          <button
            onClick={handleClose}
            className="lg:hidden p-2 rounded-md text-text-base dark:text-text-light hover:bg-primary-light/20 dark:hover:bg-secondary-light/20 focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-background-base transition-all duration-fast"
            aria-label="Close sidebar"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4" role="navigation">
          <ul className="space-y-2">
            {navLinks.map(({ name, path, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <li key={name}>
                  <Link
                    to={path}
                    onClick={handleClose}
                    className={`flex items-center p-3 rounded-lg text-base font-mono font-semibold transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-secondary-light dark:focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-background-base hover:scale-105 ${
                      isActive
                        ? "bg-primary-light/20 dark:bg-secondary-light/20 text-text-base dark:text-text-light border border-primary-light shadow-glass-light"
                        : "text-text-base dark:text-text-light hover:bg-primary-light/20 dark:hover:bg-secondary-light/20 hover:border hover:border-primary-light"
                    }`}
                    aria-label={`Navigate to ${name}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      size={20}
                      className={`mr-3 ${
                        isActive
                          ? "text-text-base dark:text-text-light"
                          : "text-primary-light dark:text-secondary-light"
                      }`}
                    />
                    <span className="truncate">{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout */}
          <div className="mt-4 pt-4 border-t border-primary-light/20">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center w-full p-3 rounded-lg text-base font-mono font-semibold text-danger dark:text-danger hover:bg-danger/20 dark:hover:bg-danger/20 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 focus:ring-offset-background-base transition-all duration-fast hover:scale-105 ${
                isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Log out"
            >
              <MdLogout size={20} className="mr-3" />
              <span className="truncate">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
