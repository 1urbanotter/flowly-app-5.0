import React from "react";
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

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/", icon: MdDashboard },
    { name: "Transactions", path: "/transactions", icon: MdListAlt },
    { name: "Accounts", path: "/accounts", icon: MdAccountBalanceWallet },
    { name: "Inventory", path: "/inventory", icon: MdInventory },
    { name: "Reports", path: "/reports", icon: MdBarChart },
    { name: "Settings", path: "/settings", icon: MdSettings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <>
      {/* Mobile overlay for seamless dismissal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background-dark/50 backdrop-blur-sm lg:hidden transition-all-ease duration-smooth"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed z-50 m-4 w-64 rounded-xl font-sans bg-background-base dark:bg-background-dark bg-opacity-20 dark:bg-opacity-20 backdrop-blur-md border border-primary-light/20 shadow-glass-light dark:shadow-glass-dark transform transition-all-ease duration-smooth ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-glass-light lg:dark:shadow-glass-dark`}
        aria-label="Main navigation sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary-light/20">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-background-base rounded-md transition-all-ease duration-fast"
          >
            <img src={FlowlyLogo} alt="Flowly Logo" className="h-8 w-auto" />
            <span className="text-2xl font-mono font-bold text-primary-light dark:text-secondary-light">
              Flowly
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-base dark:text-text-light lg:hidden p-2 rounded-md hover:bg-primary-light/20 dark:hover:bg-secondary-light/20 focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-background-base transition-all-ease duration-fast"
            aria-label="Close sidebar"
          >
            <MdClose size={28} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul role="menu" className="space-y-2">
            {navLinks.map(({ name, path, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <li key={name} role="none">
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center p-3 rounded-lg text-xl font-semibold transition-all-ease duration-fast focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-background-base ${
                      isActive
                        ? "bg-primary-light/90 dark:bg-secondary-light/90 text-text-light dark:text-text-light shadow-glass"
                        : "text-text-base dark:text-text-light hover:bg-primary-light/20 dark:hover:bg-secondary-light/20"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={`mr-3 ${
                        isActive
                          ? "text-text-light dark:text-text-light"
                          : "text-primary-light dark:text-secondary-light"
                      }`}
                    />
                    <span className="truncate">{name}</span>
                  </Link>
                </li>
              );
            })}

            {/* Logout */}
            <li className="pt-4 border-t border-primary-light/20" role="none">
              <button
                onClick={handleLogout}
                role="menuitem"
                className="flex items-center w-full p-3 text-left text-xl font-semibold text-danger dark:text-danger hover:bg-danger/20 dark:hover:bg-danger/20 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 focus:ring-offset-background-base rounded-lg transition-all-ease duration-fast"
              >
                <MdLogout size={24} className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
