import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  // 1. Initialize state from LocalStorage
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDark");
    return savedTheme === "true";
  });

  // 2. Update DOM and LocalStorage whenever isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("isDark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("isDark", "false");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};