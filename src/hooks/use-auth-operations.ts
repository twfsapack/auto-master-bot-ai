
import { useState } from 'react';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { usePremiumEmails } from '@/hooks/use-premium-emails';

export const useAuthOperations = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isPremiumEmail, addPremiumEmail } = usePremiumEmails();

  // Password field is part of the form data but not directly used in this specific mock auth operation.
  const login = async (email: string, _password?: string) => {
    setIsLoading(true);
    try {
      // Mock login
      setTimeout(() => {
        const isPremium = isPremiumEmail(email);
        
        const mockUser = {
          id: '123',
          email,
          name: email.split('@')[0],
          isPremium
        };
        setUser(mockUser);
        localStorage.setItem('auto_master_user', JSON.stringify(mockUser));
        
        toast({
          title: "Login successful",
          description: isPremium ? "Welcome back Premium user!" : "Welcome back!",
        });
        setIsLoading(false);
      }, 1000);
    } catch {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    }
  };

  // Password field is part of the form data but not directly used in this specific mock auth operation.
  const register = async (email: string, _password: string, name: string) => {
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
    } catch {
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
    } catch {
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
    } catch {
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

  const grantPremiumToEmail = (email: string) => {
    const added = addPremiumEmail(email);
    
    // Si el usuario actual tiene este email, actualizar su estado
    if (added && user && user.email === email) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem('auto_master_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Premium Access Granted",
        description: `Premium access has been granted to ${email}`,
      });
    }
    return added;
  };

  return {
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
  };
};
