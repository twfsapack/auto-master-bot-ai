
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Mail } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Check if welcome setup was completed
      const welcomeCompleted = localStorage.getItem('welcomeCompleted');
      if (!welcomeCompleted) {
        navigate('/welcome');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleEmailSignIn = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 animate-fade-in">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-6 animate-slide-down">
            {/* Logo Real */}
            <div className="w-40 h-40 -mt-10 logo-gradient rounded-full flex items-center justify-center shadow-elevated animate-scale-in p-4">
              <img 
                src="/logo.png" 
                alt="Auto Master Bot Logo" 
                className="w-32 h-32 object-contain drop-shadow-lg"
                onError={(e) => {
                  console.log('Logo no encontrado, usando fallback');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            <div className="flex flex-col items-center animate-fade-in">
              <h1 className="text-lg font-digital font-bold text-center text-logo-primary tracking-wider">
                AUTOMASTERBOT
              </h1>
              <p className="text-xs text-logo-secondary mt-1 italic opacity-80">
                powered by Trucktruest.com
              </p>
            </div>
            <p className="text-sm text-center text-logo-accent mb-8 animate-fade-in max-w-sm">
              PARA INTERACTUAR CON LA APLICACIÓN<br />
              NECESITA INICIAR SESIÓN
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Sign In Button - Principal */}
            <Button
              onClick={handleEmailSignIn}
              className="w-full h-14 bg-gradient-to-r from-logo-primary to-logo-secondary hover:from-logo-secondary hover:to-logo-accent rounded-xl transition-all duration-300 transform hover:scale-105 animate-slide-up shadow-elevated border border-logo-accent/20"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full p-1 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-logo-primary" />
                </div>
                <span className="font-medium text-white">INICIAR SESIÓN CON EMAIL</span>
              </div>
            </Button>

            {/* Info sobre otros métodos */}
            <div className="text-center pt-2">
              <p className="text-xs text-logo-gray opacity-70">
                Otros métodos de inicio de sesión estarán disponibles próximamente
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-4">
            <p className="text-xs text-logo-gray opacity-60">
              Tu asistente inteligente de diagnóstico vehicular
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
