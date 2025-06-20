
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/auth/AuthForm';
import LanguageSelector from '@/components/common/LanguageSelector';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      const welcomeCompleted = localStorage.getItem('welcomeCompleted');
      if (!welcomeCompleted) {
        localStorage.setItem('welcomeCompleted', 'true');
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, isLoading, navigate]);

  const handleStart = () => {
    setShowAuthForm(true);
  };

  const handleBack = () => {
    if (showAuthForm) {
      setShowAuthForm(false);
    } else {
      navigate('/');
    }
  };

  if (showAuthForm) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="particles">
          <div className="particle w-2 h-2" style={{top: '10%', left: '10%', animationDelay: '0s'}}></div>
          <div className="particle w-1 h-1" style={{top: '20%', left: '80%', animationDelay: '2s'}}></div>
          <div className="particle w-3 h-3" style={{top: '60%', left: '20%', animationDelay: '4s'}}></div>
          <div className="particle w-1.5 h-1.5" style={{top: '80%', left: '70%', animationDelay: '1s'}}></div>
          <div className="particle w-2 h-2" style={{top: '30%', left: '60%', animationDelay: '3s'}}></div>
        </div>

        <div className="w-full max-w-md px-4 sm:px-6 relative z-10 safe-area-top safe-area-bottom">
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <LanguageSelector />
            </div>
            
            <AuthForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="particles">
        <div className="particle w-2 h-2" style={{top: '10%', left: '10%', animationDelay: '0s'}}></div>
        <div className="particle w-1 h-1" style={{top: '20%', left: '80%', animationDelay: '2s'}}></div>
        <div className="particle w-3 h-3" style={{top: '60%', left: '20%', animationDelay: '4s'}}></div>
        <div className="particle w-1.5 h-1.5" style={{top: '80%', left: '70%', animationDelay: '1s'}}></div>
        <div className="particle w-2 h-2" style={{top: '30%', left: '60%', animationDelay: '3s'}}></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 relative z-10 safe-area-top safe-area-bottom">
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
          {/* Header con botón de regreso y selector de idioma */}
          <div className="flex items-center justify-between w-full animate-fade-in-up">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <LanguageSelector />
          </div>

          <div className="flex flex-col items-center space-y-6 sm:space-y-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {/* Logo */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full logo-container flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/6da80a74-f370-4e8a-a5ca-dd8b844969f9.png" 
                alt="Auto Master Bot Logo" 
                className="w-full h-full object-cover rounded-full filter drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">AMB</div>';
                }}
              />
            </div>
            
            <div className="text-center space-y-3 sm:space-y-4 px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white animate-glow-pulse">
                ¡Bienvenido!
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Tu asistente inteligente para el diagnóstico vehicular está listo para ayudarte
              </p>
              <p className="text-xs sm:text-sm text-purple-300 italic opacity-80">
                powered by Trucktruest.com
              </p>
            </div>
            
            <div className="w-full px-4 sm:px-0 space-y-4">
              <Button
                onClick={handleStart}
                className="w-full h-12 sm:h-14 futuristic-btn rounded-xl text-white font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <span className="text-sm sm:text-base">COMENZAR</span>
              </Button>
              
              <p className="text-xs text-center text-white/50 px-2">
                Crea tu cuenta o inicia sesión para continuar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
