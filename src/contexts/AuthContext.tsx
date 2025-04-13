
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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    // Mock check for stored user
    const storedUser = localStorage.getItem('auto_master_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login
      setTimeout(() => {
        const mockUser = {
          id: '123',
          email,
          name: email.split('@')[0],
          isPremium: false
        };
        setUser(mockUser);
        localStorage.setItem('auto_master_user', JSON.stringify(mockUser));
        toast({
          title: "Login successful",
          description: "Welcome back!",
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

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    googleSignIn,
    appleSignIn,
    upgradeAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
