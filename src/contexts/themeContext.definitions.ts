import { createContext, useContext } from 'react';

/**
 * Defines the shape of the theme context.
 */
export type ThemeContextType = {
  /** Whether dark mode is currently active. */
  isDarkMode: boolean;
  /** Function to toggle between light and dark mode. */
  toggleTheme: () => void;
};

/**
 * Context for managing application theme (light/dark mode).
 * @type {React.Context<ThemeContextType | undefined>}
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access the theme context.
 * Provides the current theme status (`isDarkMode`) and a function to toggle the theme.
 * Must be used within a {@link ThemeProvider}.
 * @returns {ThemeContextType} The theme context value.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
