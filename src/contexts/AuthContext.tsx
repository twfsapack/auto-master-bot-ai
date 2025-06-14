
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { supabase } from '@/integrations/supabase/client';
import { ExtendedUser } from '@/types/user';

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
    login,
    register,
    logout,
    googleSignIn,
    appleSignIn,
    upgradeAccount,
    grantPremiumToEmail
  } = useAuthOperations();

  const [user, setUser] = useState<ExtendedUser | null>(null);

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
  }, [setBaseUser, setIsLoading]);

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
