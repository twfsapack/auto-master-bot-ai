import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  googleSignIn: () => Promise<void>;
  appleSignIn: () => Promise<void>;
  upgradeAccount: () => void;
  grantPremiumToEmail: (email: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Lista de correos con acceso premium
const premiumEmails = ["tecnoworldfuture@gmail.com"];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    // Mock check for stored user
    const storedUser = localStorage.getItem('auto_master_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Verificar si el email está en la lista de premium
      if (premiumEmails.includes(parsedUser.email)) {
        parsedUser.isPremium = true;
        localStorage.setItem('auto_master_user', JSON.stringify(parsedUser));
      }
      
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login
      setTimeout(() => {
        const isPremiumEmail = premiumEmails.includes(email);
        
        const mockUser = {
          id: '123',
          email,
          name: email.split('@')[0],
          isPremium: isPremiumEmail
        };
        setUser(mockUser);
        localStorage.setItem('auto_master_user', JSON.stringify(mockUser));
        
        toast({
          title: "Login successful",
          description: isPremiumEmail ? "Welcome back Premium user!" : "Welcome back!",
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock registration
      setTimeout(() => {
        const mockUser = {
          id: '123',
          email,
          name,
          isPremium: false
        };
        setUser(mockUser);
        localStorage.setItem('auto_master_user', JSON.stringify(mockUser));
        toast({
          title: "Registration successful",
          description: "Your account has been created!",
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please try again with a different email.",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auto_master_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      // Mock Google sign in
      setTimeout(() => {
        const mockUser = {
          id: '123',
          email: 'user@example.com',
          name: 'Google User',
          isPremium: false
        };
        setUser(mockUser);
        localStorage.setItem('auto_master_user', JSON.stringify(mockUser));
        toast({
          title: "Google login successful",
          description: "You have been signed in with Google!",
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: "Please try again later.",
      });
    }
  };

  const appleSignIn = async () => {
    setIsLoading(true);
    try {
      // Mock Apple sign in
      setTimeout(() => {
        const mockUser = {
          id: '123',
          email: 'user@example.com',
          name: 'Apple User',
          isPremium: false
        };
        setUser(mockUser);
        localStorage.setItem('auto_master_user', JSON.stringify(mockUser));
        toast({
          title: "Apple login successful",
          description: "You have been signed in with Apple!",
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Apple login failed",
        description: "Please try again later.",
      });
    }
  };

  const upgradeAccount = () => {
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem('auto_master_user', JSON.stringify(updatedUser));
      toast({
        title: "Account upgraded!",
        description: "You now have access to premium features.",
      });
    }
  };

  // Función para otorgar acceso premium a un email específico
  const grantPremiumToEmail = (email: string) => {
    if (!premiumEmails.includes(email)) {
      premiumEmails.push(email);
      
      // Si el usuario actual tiene este email, actualizar su estado
      if (user && user.email === email) {
        const updatedUser = { ...user, isPremium: true };
        setUser(updatedUser);
        localStorage.setItem('auto_master_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Premium Access Granted",
          description: `Premium access has been granted to ${email}`,
        });
      }
      return true;
    }
    return false;
  };

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
