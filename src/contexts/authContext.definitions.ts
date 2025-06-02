import { createContext, useContext } from 'react';
import { AuthContextType } from '@/types/auth'; // Assuming AuthContextType is defined here

// Re-export AuthContextType if it's defined in '@/types/auth' and consumers of useAuth would need it.
// Or ensure consumers import it directly from '@/types/auth'.
// For now, just importing it for use in this file.

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, useAuth };
// If AuthContextType needs to be part of the public API of this definitions file:
// export { AuthContext, useAuth, type AuthContextType };
// However, it's better if components import AuthContextType directly from '@/types/auth' if they need it.
