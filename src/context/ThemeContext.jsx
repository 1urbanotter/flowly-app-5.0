import React, { createContext, useEffect, useState, useRef } from "react"; // Import useRef
import { useData } from "./DataContext";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { settings, loading: settingsLoading } = useData();

  // State to hold the current effective theme: 'light', 'dark', or 'system'
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (
      storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
    ) {
      return storedTheme;
    }
    return "system"; // Default to 'system' if nothing valid in localStorage
  });

  // Ref to track if the theme change was initiated by the user's toggle
  const userInitiatedToggle = useRef(false);

  // Effect to apply the theme class to the document's root element (<html>)
  useEffect(() => {
    const root = window.document.documentElement;
    let effectiveThemeIsDark;

    if (theme === "system") {
      effectiveThemeIsDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    } else {
      effectiveThemeIsDark = theme === "dark";
    }

    root.classList.remove("light", "dark");
    root.classList.add(effectiveThemeIsDark ? "dark" : "light");

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Effect to synchronize the local 'theme' state with settings from Firestore
  useEffect(() => {
    // Only proceed if settings have loaded and are available
    if (!settingsLoading && settings) {
      // If the user just initiated a toggle, temporarily ignore settings updates
      // This prevents settings from overriding the immediate UI change from the toggle
      if (userInitiatedToggle.current) {
        // Reset the flag after a short delay to allow subsequent settings updates
        // This setTimeout(0) ensures it runs after the current render cycle.
        setTimeout(() => {
          userInitiatedToggle.current = false;
        }, 0);
        return;
      }

      // Get theme from settings, defaulting to 'system' if not explicitly set in Firestore
      const themeFromSettings = settings.theme || "system";

      // Update the local 'theme' state if it differs from the settings
      // This handles initial load or changes from other devices/settings page
      if (themeFromSettings !== theme) {
        setTheme(themeFromSettings);
      }
    }
  }, [settings, settingsLoading, theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    // Set the flag to indicate user-initiated toggle
    userInitiatedToggle.current = true;

    setTheme((prevTheme) => {
      let newTheme;
      // Simple toggle between 'light' and 'dark'
      if (prevTheme === "dark") {
        newTheme = "light";
      } else {
        newTheme = "dark";
      }

      // Save the new explicit theme to Firestore
      if (!settingsLoading && settings && settings.updateSettings) {
        settings
          .updateSettings({ theme: newTheme })
          .then(() => {
            // Optional: If you want to be extra sure, reset flag here after successful write
            // userInitiatedToggle.current = false; // Could be here or in setTimeout
          })
          .catch((error) => {
            console.error("Failed to update theme in Firestore:", error);
            // If update fails, you might want to revert userInitiatedToggle.current or handle error
            // For now, it will be reset by the setTimeout in the settings useEffect
          });
      }

      return newTheme; // Update local state for immediate UI reflection
    });
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
