
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Apple, Bot } from 'lucide-react';

const Index = () => {
  const { user, googleSignIn, appleSignIn } = useAuth();
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

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  const handleAppleSignIn = async () => {
    await appleSignIn();
  };

  const handleEmailSignIn = () => {
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-dark via-gray-dark to-bg-dark text-white flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 animate-fade-in">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-6 animate-slide-down">
            {/* Mechanic Robot Logo */}
            <div className="w-40 h-40 mb-4 bg-gradient-to-br from-blue-secondary to-blue-light rounded-full flex items-center justify-center shadow-elevated animate-scale-in">
              <Bot className="w-24 h-24 text-white drop-shadow-lg" />
            </div>
            
            <div className="flex flex-col items-center animate-fade-in">
              <h1 className="text-3xl font-heading font-bold text-center text-text-primary">
                AUTO MASTER BOT
              </h1>
              <p className="text-xs text-text-secondary mt-1 italic opacity-80">
                powered by Trucktruest.com
              </p>
            </div>
            <p className="text-sm text-center text-text-secondary mb-8 animate-fade-in max-w-sm">
              PARA INTERACTUAR CON LA APLICACIÓN<br />
              NECESITA INICIAR SESIÓN
            </p>
          </div>

          <div className="space-y-4">
            {/* Google Sign In Button */}
            <Button
              onClick={handleGoogleSignIn}
              className="w-full h-14 bg-gradient-to-r from-blue-secondary to-blue-light hover:from-blue-light hover:to-blue-secondary rounded-xl transition-all duration-300 transform hover:scale-105 animate-slide-up shadow-elevated border border-blue-light/20"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full p-1 flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path 
                      fill="#4285F4" 
                      d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z" 
                    />
                  </svg>
                </div>
                <span className="font-medium text-white">CONTINUAR CON GOOGLE</span>
              </div>
            </Button>

            {/* Apple Sign In Button */}
            <Button
              onClick={handleAppleSignIn}
              className="w-full h-14 bg-gradient-to-r from-gray-dark to-gray-medium hover:from-gray-medium hover:to-gray-dark rounded-xl transition-all duration-300 transform hover:scale-105 animate-slide-up shadow-elevated border border-gray-light/20"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full p-1 flex items-center justify-center">
                  <Apple className="w-4 h-4 text-black" />
                </div>
                <span className="font-medium text-white">CONTINUAR CON APPLE</span>
              </div>
            </Button>

            {/* Email Sign In Button */}
            <Button
              onClick={handleEmailSignIn}
              className="w-full h-14 bg-gradient-to-r from-accent-orange to-accent-green hover:from-accent-green hover:to-accent-orange rounded-xl transition-all duration-300 transform hover:scale-105 animate-slide-up shadow-elevated border border-accent-orange/20"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 bg-white rounded-full p-1 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-gray-dark" />
                </div>
                <span className="font-medium text-white">CONTINUAR CON EMAIL</span>
              </div>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-4">
            <p className="text-xs text-text-secondary opacity-60">
              Tu asistente inteligente de diagnóstico vehicular
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
