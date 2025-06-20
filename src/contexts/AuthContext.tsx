
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { supabase } from '@/integrations/supabase/client';
import { ExtendedUser } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: ExtendedUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  appleSignIn: () => Promise<void>;
  upgradeAccount: () => Promise<void>;
  grantPremiumToEmail: (email: string) => Promise<boolean>;
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
  const {
    user: baseUser,
    setUser: setBaseUser,
    isLoading,
    setIsLoading,
    login: baseLogin,
    register: baseRegister,
    logout,
    googleSignIn,
    appleSignIn,
    upgradeAccount,
    grantPremiumToEmail
  } = useAuthOperations();

  const [user, setUser] = useState<ExtendedUser | null>(null);
  const { toast } = useToast();

  // Enhanced login with email confirmation validation
  const login = async (email: string, password: string) => {
    try {
      await baseLogin(email, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Enhanced register with better user feedback
  const register = async (email: string, password: string, name: string) => {
    try {
      await baseRegister(email, password, name);
      toast({
        title: "Registro exitoso",
        description: "¡Cuenta creada! Revisa tu email para confirmarla y luego inicia sesión.",
      });
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  // Function to fetch user profile and extend the user object
  const fetchUserProfile = async (userId: string): Promise<ExtendedUser | null> => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return baseUser as ExtendedUser;
      }

      // Extend the user object with profile data
      const extendedUser: ExtendedUser = {
        ...baseUser!,
        isPremium: profile?.is_premium || false,
        name: profile?.name || baseUser?.email?.split('@')[0] || ''
      };

      return extendedUser;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return baseUser as ExtendedUser;
    }
  };

  // Update extended user when base user changes
  useEffect(() => {
    if (baseUser) {
      // Check if email is confirmed
      if (!baseUser.email_confirmed_at) {
        console.log('User email not confirmed yet');
        setUser(baseUser as ExtendedUser);
        return;
      }

      fetchUserProfile(baseUser.id).then(setUser);
    } else {
      setUser(null);
    }
  }, [baseUser]);

  // Initialize auth state and listen for changes
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          if (!session.user.email_confirmed_at) {
            toast({
              title: "Email no confirmado",
              description: "Por favor, revisa tu email y confirma tu cuenta antes de continuar.",
              variant: "destructive"
            });
          }
        }
        
        setBaseUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setBaseUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setBaseUser, setIsLoading, toast]);

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
