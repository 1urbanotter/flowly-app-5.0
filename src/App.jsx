import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Inventory from "./pages/Inventory";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { useState } from "react";
import Footer from "./components/layout/Footer";
import { useTheme } from "./hooks/useTheme";
import LandingPage from "./pages/LandingPage"; // Import the new LandingPage

function App() {
  const { currentUser, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-text-base dark:text-text-dark transition-colors duration-300">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-primary"></div>
        <p className="ml-3">Loading Flowly...</p>
      </div>
    );
  }

  return (
    <div className={`${theme}`}>
      {" "}
      {/* Apply theme class to root */}
      <Router>
        {currentUser ? (
          <div className="flex min-h-screen">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col">
              <Navbar setIsSidebarOpen={setIsSidebarOpen} />
              <main className="flex-1 p-4 sm:p-6 pb-20 overflow-y-auto">
                {" "}
                {/* Added pb-20 for FAB clearance */}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="*" element={<Navigate to="/" />} />{" "}
                  {/* Redirect unknown paths */}
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />{" "}
            {/* New: Landing page for unauthenticated users */}
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />{" "}
            {/* Redirect all other unknown paths to landing if not logged in */}
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
