
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/welcome' 
}) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      // If no user, redirect to welcome for authentication
      if (!user) {
        navigate(redirectTo);
        return;
      }

      // Check if email is confirmed
      if (!user.email_confirmed_at) {
        console.log('Email not confirmed, redirecting to welcome');
        navigate('/welcome');
        return;
      }

      // Additional validation can be added here for profile completeness
      console.log('User authenticated and verified:', user.email);
    }
  }, [user, isLoading, navigate, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If no user or email not confirmed, show nothing while redirecting
  if (!user || !user.email_confirmed_at) {
    return null;
  }

  return <>{children}</>;
};
