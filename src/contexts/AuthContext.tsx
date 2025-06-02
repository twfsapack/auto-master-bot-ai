
import React, { useEffect } from 'react';
// AuthContextType will be used by the AuthContext in authContext.definitions.ts
// No need to import AuthContextType here if AuthProvider itself doesn't directly reference it for props/state.
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { usePremiumEmails } from '@/hooks/use-premium-emails';
import { AuthContext } from './authContext.definitions'; // Import the context

// useAuth hook is now exported from authContext.definitions.ts
// const AuthContext = createContext... is now in authContext.definitions.ts

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    user,
    setUser,
    isLoading,
    setIsLoading,
    login,
    register,
    logout,
    googleSignIn,
    appleSignIn,
    upgradeAccount,
    grantPremiumToEmail
  } = useAuthOperations();
  const { isPremiumEmail } = usePremiumEmails();

  // Initialize auth state
  useEffect(() => {
    // Mock check for stored user
    const storedUser = localStorage.getItem('auto_master_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Verificar si el email está en la lista de premium
      if (isPremiumEmail(parsedUser.email)) {
        parsedUser.isPremium = true;
        localStorage.setItem('auto_master_user', JSON.stringify(parsedUser));
      }
      
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, [setUser, setIsLoading, isPremiumEmail]);

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    googleSignIn,
    appleSignIn,
    upgradeAccount,
    grantPremiumToEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
