import React, { useState, ReactNode } from 'react';
import {
  LanguageContext,
  translations,
  // LanguageContextType and useLanguage are not needed by the Provider itself
} from './languageContext.definitions';

// LanguageContextType, LanguageContext, useLanguage, and translations moved to .definitions.ts

/**
 * Provides language state and translation functionality to its children components.
 * Manages the current language and provides a function `t` for translating keys.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The LanguageProvider component.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    // @ts-expect-error Type 'string' cannot be used to index type '{ es: { ... }; en: { ... }; ... }'.
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
