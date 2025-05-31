/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Scans files for Tailwind classes
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        mono: ["Roboto+Mono", "monospace"],
      },
      colors: {
        primary: {
          light: "#00DDEB", // Neon cyan for accents
          DEFAULT: "#00A3AF", // Muted cyan for buttons, borders
          dark: "#0F172A", // Dark slate for backgrounds
        },
        secondary: {
          light: "#FF99FF", // Neon magenta for highlights
          DEFAULT: "#CC00CC", // Muted magenta for contrast
          dark: "#4B0082", // Deep indigo for dark mode
        },
        background: {
          light: "rgba(203, 213, 225, 0.85)", // Frosted light for glassmorphism
          base: "rgba(30, 41, 59, 0.85)", // Dark slate, semi-transparent
          dark: "rgba(15, 23, 42, 0.9)", // Deeper slate for dark mode
        },
        text: {
          light: "#F1F5F9", // High-contrast white for readability
          base: "#CBD5E1", // Light slate for body text
          dark: "#64748B", // Muted slate for secondary text
          darker: "#1B2021", // Near-black for emphasis
        },
        success: "#88FFC5", // Vibrant green, retained
        danger: "#FF6B6B", // Soft neon red for errors
        warning: "#F4A261", // Warm orange for warnings
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
      borderRadius: {
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.2)",
        "glass-light":
          "0 8px 32px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)",
        "glass-dark":
          "0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)",
      },
      transitionProperty: {
        "all-ease": "all",
      },
      transitionDuration: {
        fast: "200ms",
        smooth: "300ms",
      },
    },
  },
  plugins: [],
};
