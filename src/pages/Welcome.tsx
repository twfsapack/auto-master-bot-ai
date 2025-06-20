
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Volume2, VolumeX, Mail, Lock, User } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();
  const { user, login, register, isLoading } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      flag: '🇺🇸',
      welcome: 'Welcome to Auto Master Bot! Your intelligent vehicle diagnostic assistant.',
      voiceId: 'EXAVITQu4vr4xnSDxMaL'
    },
    { 
      code: 'es', 
      name: 'Español', 
      flag: '🇪🇸',
      welcome: '¡Bienvenido a Auto Master Bot! Tu asistente inteligente de diagnóstico vehicular.',
      voiceId: 'XB0fDUnXU5powFXDhCwa'
    },
    { 
      code: 'fr', 
      name: 'Français', 
      flag: '🇫🇷',
      welcome: 'Bienvenue à Auto Master Bot! Votre assistant intelligent de diagnostic véhiculaire.',
      voiceId: '9BWtsMINqrJLrRacOk9x'
    },
  ];

  // Check if user is already authenticated
  useEffect(() => {
    if (user && user.email_confirmed_at) {
      const welcomeCompleted = localStorage.getItem('welcomeCompleted');
      if (welcomeCompleted) {
        navigate('/dashboard');
      } else {
        setShowAuth(false);
      }
    }
  }, [user, navigate]);

  const stopCurrentAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  };

  const playWelcomeMessage = async (language: typeof languages[0]) => {
    try {
      stopCurrentAudio();
      setIsPlaying(true);

      const utterance = new SpeechSynthesisUtterance(language.welcome);
      utterance.lang = language.code === 'en' ? 'en-US' : language.code === 'es' ? 'es-ES' : 'fr-FR';
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error playing welcome message:', error);
      setIsPlaying(false);
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    const language = languages.find(lang => lang.code === langCode);
    if (language) {
      playWelcomeMessage(language);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await register(formData.email, formData.password, formData.name);
    } else {
      await login(formData.email, formData.password);
    }
  };

  const handleContinue = () => {
    if (user && user.email_confirmed_at) {
      stopCurrentAudio();
      setLanguage(selectedLanguage);
      localStorage.setItem('welcomeCompleted', 'true');
      navigate('/onboarding');
    } else {
      setShowAuth(true);
    }
  };

  useEffect(() => {
    const englishLang = languages.find(lang => lang.code === 'en');
    if (englishLang && !user) {
      setTimeout(() => playWelcomeMessage(englishLang), 1000);
    }

    return () => {
      stopCurrentAudio();
    };
  }, []);

  // If user is authenticated and welcome completed, show language selection
  if (user && user.email_confirmed_at && !showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bg-dark to-gray-dark flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo and Title */}
          <div className="flex flex-col items-center space-y-6 animate-slide-down">
            <img 
              src="/lovable-uploads/6da80a74-f370-4e8a-a5ca-dd8b844969f9.png"
              alt="Auto Master Bot Logo"
              className="w-32 h-32 object-cover rounded-full animate-scale-in"
            />
            <div className="text-center">
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Auto Master Bot
              </h1>
              <p className="text-sm text-text-secondary italic">
                powered by Trucktruest.com
              </p>
            </div>
          </div>

          {/* Welcome Card */}
          <Card className="glass-card animate-slide-up">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  Welcome Setup
                </h2>
                <p className="text-sm text-text-secondary">
                  Choose your preferred language to get started
                </p>
              </div>

              {/* Language Selection */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-text-primary">
                  Select Language / Seleccionar Idioma / Choisir la Langue
                </Label>
                
                <RadioGroup 
                  value={selectedLanguage} 
                  onValueChange={handleLanguageChange}
                  className="space-y-3"
                >
                  {languages.map((language) => (
                    <div key={language.code} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-medium/30 hover:border-blue-light/50 transition-colors">
                      <RadioGroupItem 
                        value={language.code} 
                        id={language.code}
                        className="border-blue-light text-blue-light"
                      />
                      <Label 
                        htmlFor={language.code} 
                        className="flex-1 flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{language.flag}</span>
                          <span className="text-text-primary font-medium">{language.name}</span>
                        </div>
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            playWelcomeMessage(language);
                          }}
                          className="h-8 w-8 text-blue-light hover:text-blue-secondary hover:bg-blue-secondary/10"
                          disabled={isPlaying}
                        >
                          {isPlaying ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Audio Status */}
              {isPlaying && (
                <div className="flex items-center justify-center space-x-2 text-blue-light animate-pulse">
                  <Volume2 className="h-4 w-4" />
                  <span className="text-sm">Playing welcome message...</span>
                </div>
              )}

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                className="w-full btn-primary"
                disabled={isPlaying}
              >
                Continue / Continuar / Continuer
              </Button>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-text-secondary">
              Your intelligent vehicle diagnostic assistant
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show authentication form if not authenticated
  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-dark to-gray-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo and Title */}
        <div className="flex flex-col items-center space-y-6 animate-slide-down">
          <img 
            src="/lovable-uploads/6da80a74-f370-4e8a-a5ca-dd8b844969f9.png"
            alt="Auto Master Bot Logo"
            className="w-32 h-32 object-cover rounded-full animate-scale-in"
          />
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Auto Master Bot
            </h1>
            <p className="text-sm text-text-secondary italic">
              powered by Trucktruest.com
            </p>
          </div>
        </div>

        {/* Authentication Card */}
        <Card className="glass-card animate-slide-up">
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
                {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
              </h2>
              <p className="text-sm text-text-secondary">
                {isSignUp ? 'Regístrate para comenzar' : 'Accede a tu cuenta'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-text-primary">
                    Nombre Completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required={isSignUp}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-text-primary">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-text-primary">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Procesando...' : (isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión')}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-blue-light hover:text-blue-secondary transition-colors"
              >
                {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-text-secondary">
            Your intelligent vehicle diagnostic assistant
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
