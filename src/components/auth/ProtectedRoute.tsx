
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireEmailConfirmed?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/auth',
  requireEmailConfirmed = false
}) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast({
          variant: "destructive",
          title: "Acceso denegado",
          description: "Debes iniciar sesión para acceder a esta página.",
        });
        navigate(redirectTo);
        return;
      }

      if (requireEmailConfirmed && !user.email_confirmed_at) {
        toast({
          variant: "destructive",
          title: "Email no confirmado",
          description: "Por favor confirma tu email antes de continuar.",
        });
        navigate('/auth');
        return;
      }
    }
  }, [user, isLoading, navigate, redirectTo, requireEmailConfirmed, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full gradient-bg flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="text-white/70 text-sm">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireEmailConfirmed && !user.email_confirmed_at) {
    return null;
  }

  return <>{children}</>;
};
