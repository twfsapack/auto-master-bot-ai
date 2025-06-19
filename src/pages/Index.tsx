
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Chrome, Apple } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
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
    <div className="min-h-screen gradient-bg flex flex-col items-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="particles">
        <div className="particle w-2 h-2" style={{top: '10%', left: '10%', animationDelay: '0s'}}></div>
        <div className="particle w-1 h-1" style={{top: '20%', left: '80%', animationDelay: '2s'}}></div>
        <div className="particle w-3 h-3" style={{top: '60%', left: '20%', animationDelay: '4s'}}></div>
        <div className="particle w-1.5 h-1.5" style={{top: '80%', left: '70%', animationDelay: '1s'}}></div>
        <div className="particle w-2 h-2" style={{top: '30%', left: '60%', animationDelay: '3s'}}></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-8 animate-fade-in-up">
            {/* Logo Container */}
            <div className="w-32 h-32 rounded-full logo-container flex items-center justify-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <img 
                src="/logo.png" 
                alt="Auto Master Bot Logo" 
                className="w-20 h-20 object-contain filter drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">AMB</div>';
                }}
              />
            </div>
            
            <div className="flex flex-col items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <h1 className="text-2xl font-bold text-center text-white tracking-wider animate-glow-pulse">
                AUTO MASTER BOT
              </h1>
              <p className="text-sm text-purple-300 mt-2 italic opacity-80">
                powered by Trucktruest.com
              </p>
            </div>
            
            <p className="text-sm text-center text-white/80 animate-fade-in-up max-w-sm" style={{animationDelay: '0.6s'}}>
              PARA INTERACTUAR CON LA APLICACIÓN<br />
              NECESITAS INICIAR SESIÓN
            </p>
          </div>

          <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            {/* Email Sign In Button */}
            <Button
              onClick={handleEmailSignIn}
              className="w-full h-14 futuristic-btn rounded-xl text-white font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full p-1 flex items-center justify-center backdrop-blur">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span>INICIAR SESIÓN CON EMAIL</span>
              </div>
            </Button>

            {/* Future authentication methods - styled but disabled */}
            <div className="space-y-3 opacity-50">
              <Button
                disabled
                className="w-full h-12 bg-white/5 border border-white/20 rounded-xl text-white/60 font-medium backdrop-blur transition-all duration-300 cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Chrome className="w-5 h-5" />
                  <span>INICIAR SESIÓN CON GOOGLE</span>
                </div>
              </Button>
              
              <Button
                disabled
                className="w-full h-12 bg-white/5 border border-white/20 rounded-xl text-white/60 font-medium backdrop-blur transition-all duration-300 cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Apple className="w-5 h-5" />
                  <span>INICIAR SESIÓN CON APPLE</span>
                </div>
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-white/50">
                Otros métodos de inicio de sesión estarán disponibles próximamente
              </p>
            </div>
          </div>

          <div className="text-center pt-4 animate-fade-in-up" style={{animationDelay: '1s'}}>
            <p className="text-xs text-white/40">
              Tu asistente inteligente de diagnóstico vehicular
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
