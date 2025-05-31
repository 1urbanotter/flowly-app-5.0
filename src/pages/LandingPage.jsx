import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button"; // Assuming Button component aligns with the design system
import FlowlyLogo from "../assets/flowly-logo.svg"; // Ensure this path is correct
import {
  MdAttachMoney,
  MdStorage,
  MdBarChart,
  MdSecurity,
} from "react-icons/md";

const LandingPage = () => {
  // Helper class for feature cards for consistent styling and hover effects
  const featureCardBaseStyles =
    "container-base text-center p-6 transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-custom-dark";
  // Helper class for mockup cards
  const mockupCardBaseStyles =
    "bg-background-base dark:bg-background-darker rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-gray-700"; // Added a slightly different hover shadow for dark mode

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-base dark:text-text-dark flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Hero Section */}
      <section className="text-center mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto">
        <img
          src={FlowlyLogo}
          alt="Flowly Logo"
          className="h-20 sm:h-24 w-auto mx-auto mb-6" // Slightly adjusted logo size for responsiveness
        />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary dark:text-primary-light leading-tight mb-4">
          Flowly: Optimize Your Dollars-to-Units Ratio
        </h1>
        <p className="text-lg sm:text-xl text-text-light dark:text-text-darker mb-8 max-w-2xl mx-auto">
          A lightweight Progressive Web App designed to enhance business
          efficiency by tracking and improving your revenue per unit of product
          moved. Gain clarity, drive profitability.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/auth">
            <Button
              variant="primary"
              size="lg" // Assuming your Button component has size props
              className="w-full sm:w-auto" // Removed redundant px, py, text-lg if Button handles sizing
            >
              Get Started
            </Button>
          </Link>
          <a href="#features">
            <Button
              variant="outline"
              size="lg" // Assuming your Button component has size props
              className="w-full sm:w-auto"
            >
              Learn More
            </Button>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full max-w-6xl mb-16 sm:mb-20 lg:mb-24"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary dark:text-primary-light mb-10 sm:mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Feature Item 1 */}
          <div className={featureCardBaseStyles}>
            <MdAttachMoney
              size={40} // Slightly reduced icon size for balance
              className="text-primary dark:text-primary-light mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-text-base dark:text-text-dark mb-2">
              Ratio Tracking
            </h3>
            <p className="text-text-light dark:text-text-darker text-sm">
              Monitor your dollars-to-units ratio to ensure maximum
              profitability for every unit moved.
            </p>
          </div>
          {/* Feature Item 2 */}
          <div className={featureCardBaseStyles}>
            <MdStorage
              size={40}
              className="text-secondary dark:text-secondary-light mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-text-base dark:text-text-dark mb-2">
              Inventory Management
            </h3>
            <p className="text-text-light dark:text-text-darker text-sm">
              Keep a clear overview of your product units in stock with
              customizable definitions.
            </p>
          </div>
          {/* Feature Item 3 */}
          <div className={featureCardBaseStyles}>
            <MdBarChart
              size={40}
              className="text-primary dark:text-primary-light mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-text-base dark:text-text-dark mb-2">
              Financial Insights
            </h3>
            <p className="text-text-light dark:text-text-darker text-sm">
              Track cash flow, balances, and transaction types for actionable
              financial data.
            </p>
          </div>
          {/* Feature Item 4 */}
          <div className={featureCardBaseStyles}>
            <MdSecurity
              size={40}
              className="text-secondary dark:text-secondary-light mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-text-base dark:text-text-dark mb-2">
              Secure & Responsive
            </h3>
            <p className="text-text-light dark:text-text-darker text-sm">
              Secure authentication and a mobile-first design ensure access
              anywhere, anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshot Mockups Section */}
      <section className="w-full max-w-6xl mb-16 sm:mb-20 lg:mb-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary dark:text-primary-light mb-10 sm:mb-12">
          See Flowly in Action
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Mockup Item 1 */}
          <div className={mockupCardBaseStyles}>
            <img
              src="https://placehold.co/600x400/5DEAC7/141315?text=Dashboard+View" // Updated placeholder color
              alt="Dashboard Mockup"
              className="w-full h-auto rounded-md mb-4 aspect-video object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found";
              }}
            />
            <h3 className="text-xl font-semibold text-text-base dark:text-text-dark mb-2">
              Intuitive Dashboard
            </h3>
            <p className="text-text-light dark:text-text-darker text-sm">
              Get a quick overview of your key metrics, cash flow, and recent
              activities at a glance.
            </p>
          </div>
          {/* Mockup Item 2 */}
          <div className={mockupCardBaseStyles}>
            <img
              src="https://placehold.co/600x400/25339F/EBEBEB?text=Transactions+Log" // Updated placeholder color
              alt="Transactions Mockup"
              className="w-full h-auto rounded-md mb-4 aspect-video object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found";
              }}
            />
            <h3 className="text-xl font-semibold text-text-base dark:text-text-dark mb-2">
              Seamless Transaction Management
            </h3>
            <p className="text-text-light dark:text-text-darker text-sm">
              Easily add, edit, and filter transactions to keep your records
              precise and up-to-date.
            </p>
          </div>
          {/* Mockup Item 3 (Example for more items if needed) */}
          <div className={mockupCardBaseStyles}>
            <img
              src="https://placehold.co/600x400/A5F2D5/141315?text=Account+Details" // Updated placeholder color
              alt="Accounts Mockup"
              className="w-full h-auto rounded-md mb-4 aspect-video object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found";
              }}
            />
            <h3 className="text-xl font-semibold text-text-base dark:text-text-dark mb-2">
              Multi-Account Support
            </h3>
            <p className="text-text-light dark:text-text-darker text-sm">
              Organize your finances across different accounts with custom names
              and color indicators.
            </p>
          </div>
          {/* Mockup Item 4 (Example for more items if needed) */}
          <div className={mockupCardBaseStyles}>
            <img
              src="https://placehold.co/600x400/81B7FF/141315?text=PDF+Report+View" // Updated placeholder color
              alt="Reports Mockup"
              className="w-full h-auto rounded-md mb-4 aspect-video object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found";
              }}
            />
            <h3 className="text-xl font-semibold text-text-base dark:text-text-dark mb-2">
              Actionable Reports
            </h3>
            <p className="text-text-light dark:text-text-darker text-sm">
              Generate PDF and CSV reports to analyze your cash flow and product
              movement trends.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-light mb-4">
          Ready to Optimize Your Business?
        </h2>
        <p className="text-lg sm:text-xl text-text-light dark:text-text-darker mb-8">
          Start tracking your dollars-to-units ratio today and unlock greater
          profitability.
        </p>
        <Link to="/auth">
          <Button
            variant="primary"
            size="xl" // Assuming a larger size for the main CTA
            className="w-full sm:w-auto" // Removed redundant px, py, text-xl if Button handles sizing
          >
            Sign Up Now
          </Button>
        </Link>
      </section>

      <footer className="mt-16 sm:mt-20 lg:mt-24 text-center text-sm text-text-light/70 dark:text-text-darker/70">
        &copy; {new Date().getFullYear()} Flowly. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
