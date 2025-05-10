
import React, { createContext, useContext, useEffect } from 'react';
import { AuthContextType } from '@/types/auth';
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { usePremiumEmails } from '@/hooks/use-premium-emails';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

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
