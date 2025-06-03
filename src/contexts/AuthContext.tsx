
import React, { useEffect } from 'react'; // Removed createContext, useContext
import { User, UserSessionData } from '@/types/auth'; // AuthContextType no longer needed here
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { usePremiumEmails } from '@/hooks/use-premium-emails';
import { AuthContext } from './authContext.definitions'; // Import the actual AuthContext

// Removed local AuthContext definition
// Removed local useAuth hook definition

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
      const sessionData = JSON.parse(storedUser) as UserSessionData;
      
      // Construct the full User object for the React state.
      // The 'name' comes from the session, and 'isPremium' is freshly determined.
      // Other User fields not in UserSessionData would be initialized to defaults if necessary.
      const fullUser: User = {
        id: sessionData.id,
        email: sessionData.email,
        name: sessionData.name, // Assuming 'name' is part of UserSessionData as per previous definition
        isPremium: isPremiumEmail(sessionData.email), // isPremium status re-validated
      };
      
      setUser(fullUser);
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
