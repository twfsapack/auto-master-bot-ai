
import React, { useState, useEffect } from 'react';
import { ThemeContext } from './themeContext.definitions'; // Import the context

// ThemeContextType and useTheme are now in themeContext.definitions.ts

/**
 * Provides theme state (light/dark mode) and a toggle function to its children.
 * It synchronizes the theme with localStorage and applies/removes the 'dark' class to the document element.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The ThemeProvider component.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check user preference
    const savedTheme = localStorage.getItem('auto_master_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('auto_master_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('auto_master_theme', 'light');
      }
      return newMode;
    });
  };

  const value = {
    isDarkMode,
    toggleTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
