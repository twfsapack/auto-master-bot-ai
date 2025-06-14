import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useAuthOperations = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error de inicio de sesión",
          description: error.message,
        });
        return;
      }

      if (data.user) {
        setUser(data.user);
        toast({
          title: "Inicio de sesión exitoso",
          description: "¡Bienvenido de vuelta!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: "Por favor verifica tus credenciales e intenta de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
          emailRedirectTo: `https://automasterbot.trucktruest.com/`
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error de registro",
          description: error.message,
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Registro exitoso",
          description: "¡Tu cuenta ha sido creada! Revisa tu email para confirmarla.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: "Por favor intenta de nuevo con un email diferente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al cerrar sesión",
        description: "Hubo un problema al cerrar la sesión.",
      });
    }
  };

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `https://automasterbot.trucktruest.com/dashboard`
        }
      });

      if (error) {
        if (error.message.includes('provider is not enabled')) {
          toast({
            variant: "destructive",
            title: "Google Auth no disponible",
            description: "El proveedor de Google no está configurado. Por favor usa email y contraseña.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error con Google",
            description: error.message,
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error con Google",
        description: "Por favor intenta de nuevo más tarde o usa email y contraseña.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const appleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `https://automasterbot.trucktruest.com/dashboard`
        }
      });

      if (error) {
        if (error.message.includes('provider is not enabled')) {
          toast({
            variant: "destructive",
            title: "Apple Auth no disponible",
            description: "El proveedor de Apple no está configurado. Por favor usa email y contraseña.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error con Apple",
            description: error.message,
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error con Apple",
        description: "Por favor intenta de nuevo más tarde o usa email y contraseña.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeAccount = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ is_premium: true })
          .eq('id', user.id);

        if (error) {
          toast({
            variant: "destructive",
            title: "Error al actualizar cuenta",
            description: error.message,
          });
          return;
        }

        toast({
          title: "¡Cuenta actualizada!",
          description: "Ahora tienes acceso a las funciones premium.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error al actualizar cuenta",
          description: "Por favor intenta de nuevo más tarde.",
        });
      }
    }
  };

  const grantPremiumToEmail = async (email: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_premium: true })
        .eq('email', email);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error al otorgar premium",
          description: error.message,
        });
        return false;
      }

      toast({
        title: "Acceso Premium Otorgado",
        description: `Acceso premium otorgado a ${email}`,
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al otorgar premium",
        description: "Por favor intenta de nuevo más tarde.",
      });
      return false;
    }
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
