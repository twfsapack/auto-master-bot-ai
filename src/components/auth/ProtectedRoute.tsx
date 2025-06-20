
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

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

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate(redirectTo);
        return;
      }

      if (requireEmailConfirmed && !user.email_confirmed_at) {
        navigate('/auth');
        return;
      }
    }
  }, [user, isLoading, navigate, redirectTo, requireEmailConfirmed]);

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-white/70">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireEmailConfirmed && !user.email_confirmed_at) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-xl text-white">Confirma tu email</h2>
          <p className="text-white/70">
            Por favor revisa tu correo electrónico y confirma tu cuenta para continuar.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
