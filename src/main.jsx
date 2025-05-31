import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Your global CSS, including Tailwind directives

// Import your context providers
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { ThemeProvider } from "./context/ThemeContext";

// Import the Toaster for global notifications
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <ThemeProvider>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "dark:bg-background-darker dark:text-text-darker",
              style: {
                background: "var(--tw-colors-background-light)",
                color: "var(--tw-colors-text-light)",
              },
              success: {
                iconTheme: {
                  primary: "var(--tw-colors-success)",
                  secondary: "white",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--tw-colors-danger)",
                  secondary: "white",
                },
              },
            }}
          />
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
