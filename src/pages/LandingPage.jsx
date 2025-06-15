import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// COMPONENT IMPORTS (Assumed to exist and be styled according to the design system)
import Button from "../components/common/Button";
import GlassCard from "../components/common/GlassCard";
import SectionHeader from "../components/common/SectionHeader";

// ICON IMPORTS (Using a consistent icon library like react-icons is best practice)
import {
  MdArrowForward,
  MdBarChart,
  MdCheckCircle,
  MdDashboard,
  MdInventory,
  MdSecurity,
  MdTrendingUp,
} from "react-icons/md";

// ASSET IMPORTS (The logo is a local asset as it's part of the core brand)
import FlowlyLogo from "../assets/flowly-logo.svg";

const LandingPage = () => {
  // Memoized data arrays to prevent unnecessary re-renders.
  const features = useMemo(
    () => [
      {
        icon: (
          <MdTrendingUp
            size={32}
            className="text-primary-light dark:text-secondary-light"
          />
        ),
        title: "Profit Optimization",
        description:
          "Go beyond simple revenue tracking. Our smart analytics help you identify and maximize your most profitable products and sales channels.",
      },
      {
        icon: (
          <MdInventory
            size={32}
            className="text-primary-light dark:text-secondary-light"
          />
        ),
        title: "Smart Inventory",
        description:
          "Receive predictive stock alerts and sales velocity insights. Avoid stockouts and overstocking to keep your cash flow healthy.",
      },
      {
        icon: (
          <MdBarChart
            size={32}
            className="text-primary-light dark:text-secondary-light"
          />
        ),
        title: "Financial Analytics",
        description:
          "Connect your sales data to get a real-time, actionable view of your business performance. Make confident decisions backed by data.",
      },
      {
        icon: (
          <MdSecurity
            size={32}
            className="text-primary-light dark:text-secondary-light"
          />
        ),
        title: "Secure & Accessible",
        description:
          "Built with bank-level security and a mobile-first design, your data is safe and accessible wherever you are, on any device.",
      },
    ],
    []
  );

  const howItWorksSteps = useMemo(
    () => [
      {
        icon: <MdCheckCircle size={28} className="text-green-500" />,
        title: "Connect Your Data",
        description:
          "Easily sync your sales platforms or upload your transaction data in minutes. Our system guides you through the simple setup process.",
      },
      {
        icon: <MdDashboard size={28} className="text-blue-500" />,
        title: "Visualize Your Metrics",
        description:
          "Watch as Flowly transforms your raw numbers into intuitive dashboards and beautiful, easy-to-understand reports and charts.",
      },
      {
        icon: <MdArrowForward size={28} className="text-purple-500" />,
        title: "Take Action & Grow",
        description:
          "Use the powerful insights to optimize inventory, adjust pricing, and make strategic decisions that directly boost your bottom line.",
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        quote:
          "Flowly completely changed how I see my business. I boosted my profit margins by 20% in just one month by focusing on the right products!",
        author: "Sarah J., CEO of TechCraze",
        // REAL STOCK IMAGE IMPLEMENTED
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        quote:
          "As a small retail owner, inventory was my biggest headache. Flowly's smart inventory is a lifesaver. It's the best, most intuitive tool I've used.",
        author: "Michael B., Owner of The Retail Hub",
        // REAL STOCK IMAGE IMPLEMENTED
        avatar:
          "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    []
  );

  const handleDemoRequest = () => {
    toast.success("Demo request sent! Our team will contact you shortly.");
  };

  return (
    <div className="scroll-smooth bg-background-base dark:bg-background-dark text-text-base dark:text-text-light font-sans antialiased">
      {/* ======================================================================================== */}
      {/* Hero Section */}
      {/* ======================================================================================== */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <img
                  src={FlowlyLogo}
                  alt="Flowly Logo"
                  className="h-12 w-auto mb-6 sm:mx-auto lg:mx-0"
                />
                <h1 className="text-3xl tracking-tight font-extrabold font-mono text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Unlock Your True</span>
                  <span className="block text-primary-light dark:text-secondary-light">
                    Profit Potential
                  </span>
                </h1>
                <p className="mt-3 text-base text-text-base dark:text-text-light sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Flowly is the lightweight PWA that helps you track, analyze,
                  and optimize your dollars-to-units ratio for smarter,
                  data-driven growth.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/auth">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Start Free Trial
                      <MdArrowForward className="ml-2" />
                    </Button>
                  </Link>
                  <a href="#features">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Explore Features
                    </Button>
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          {/* REAL STOCK IMAGE IMPLEMENTED */}
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1634017839464-5c33923cb395?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Abstract illustration of data flowing and transforming into profit charts."
          />
        </div>
      </header>

      {/* ======================================================================================== */}
      {/* Features Section */}
      {/* ======================================================================================== */}
      <section
        id="features"
        className="py-20 lg:py-24 bg-background-light-alt dark:bg-background-dark-alt"
        role="region"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="features-heading"
            title="Why Choose Flowly?"
            subtitle="Everything you need to make smarter business decisions, nothing you don't."
          />
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <GlassCard
                key={index}
                className="p-6 text-left transition-all duration-300 ease-in-out hover:shadow-glass-light/50 dark:hover:shadow-glass-dark/50 hover:-translate-y-2"
              >
                <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full bg-primary-light/10 dark:bg-secondary-light/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold font-mono text-text-base dark:text-text-light mb-2">
                  {feature.title}
                </h3>
                <p className="text-base text-text-light dark:text-text-dark">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================================== */}
      {/* How It Works Section */}
      {/* ======================================================================================== */}
      <section
        id="how-it-works"
        className="py-20 lg:py-24"
        role="region"
        aria-labelledby="how-it-works-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="how-it-works-heading"
            title="Get Started in 3 Simple Steps"
            subtitle="From data chaos to actionable clarity, effortlessly."
          />
          <div className="mt-12 grid gap-10 grid-cols-1 md:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 mx-auto mb-5 rounded-full bg-background-light-alt dark:bg-background-dark-alt">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold font-mono text-text-base dark:text-text-light">
                  {`Step ${index + 1}: ${step.title}`}
                </h3>
                <p className="mt-2 text-base text-text-light dark:text-text-dark">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================================== */}
      {/* Visual Mockups Section */}
      {/* ======================================================================================== */}
      <section
        id="mockups"
        className="py-20 lg:py-24 bg-background-light-alt dark:bg-background-dark-alt"
        role="region"
        aria-labelledby="mockups-heading"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="mockups-heading"
            title="See Flowly in Action"
            subtitle="An intuitive interface designed for clarity and speed."
          />
          <div className="mt-12">
            <GlassCard className="p-4 md:p-6 transition-all duration-300 ease-in-out hover:shadow-glass-light/50 dark:hover:shadow-glass-dark/50 hover:scale-105">
              {/* REAL STOCK IMAGE IMPLEMENTED */}
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="A mockup of the Flowly dashboard showing charts and key performance indicators."
                className="w-full h-auto rounded-lg shadow-2xl object-cover aspect-video"
              />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ======================================================================================== */}
      {/* Testimonials Section */}
      {/* ======================================================================================== */}
      <section
        id="testimonials"
        className="py-20 lg:py-24"
        role="region"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="testimonials-heading"
            title="Trusted by Businesses Like Yours"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <GlassCard
                key={index}
                className="p-8 flex flex-col items-center text-center animate-fade-in"
              >
                <img
                  src={testimonial.avatar}
                  alt={`Avatar of ${testimonial.author}`}
                  className="w-20 h-20 rounded-full mb-6 object-cover"
                />
                <blockquote className="text-lg font-medium text-text-base dark:text-text-light mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="font-semibold text-text-light dark:text-text-dark not-italic">
                  — {testimonial.author}
                </cite>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================================== */}
      {/* Call to Action Section */}
      {/* ======================================================================================== */}
      <section
        id="cta"
        className="py-20 lg:py-24 bg-primary-light/90 dark:bg-secondary-light/90 text-white"
        role="region"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl font-extrabold font-mono tracking-tight"
          >
            Ready to Boost Your Business?
          </h2>
          <p className="mt-4 text-lg md:text-xl text-primary-dark max-w-2xl mx-auto">
            Join Flowly today and turn your data into your most valuable asset.
            Start your free, no-risk 14-day trial now. No credit card required.
          </p>
          <div className="mt-8 mx-auto flex justify-center">
            <Link to="/auth">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Sign Up Now
                <MdArrowForward className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================================================== */}
      {/* Footer */}
      {/* ======================================================================================== */}
      <footer
        className="bg-background-light-alt dark:bg-background-dark-alt"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <img src={FlowlyLogo} alt="Flowly Logo" className="h-8 w-auto" />
              <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                © {new Date().getFullYear()} Flowly. All rights reserved.
              </p>
            </div>
            <nav
              className="flex flex-wrap justify-center gap-x-6 gap-y-2"
              aria-label="Footer"
            >
              <Link
                to="/about"
                className="text-sm hover:text-primary-light dark:hover:text-secondary-light transition-colors"
              >
                About
              </Link>
              <Link
                to="/privacy"
                className="text-sm hover:text-primary-light dark:hover:text-secondary-light transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm hover:text-primary-light dark:hover:text-secondary-light transition-colors"
              >
                Terms of Service
              </Link>
              <button
                onClick={handleDemoRequest}
                className="text-sm hover:text-primary-light dark:hover:text-secondary-light transition-colors"
                aria-label="Request a demo"
              >
                Request a Demo
              </button>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
