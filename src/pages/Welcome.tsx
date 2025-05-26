
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, VolumeX } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      flag: '🇺🇸',
      welcome: 'Welcome to Auto Master Bot! Your intelligent vehicle diagnostic assistant.',
      voiceId: 'EXAVITQu4vr4xnSDxMaL' // Sarah
    },
    { 
      code: 'es', 
      name: 'Español', 
      flag: '🇪🇸',
      welcome: '¡Bienvenido a Auto Master Bot! Tu asistente inteligente de diagnóstico vehicular.',
      voiceId: 'XB0fDUnXU5powFXDhCwa' // Charlotte
    },
    { 
      code: 'fr', 
      name: 'Français', 
      flag: '🇫🇷',
      welcome: 'Bienvenue à Auto Master Bot! Votre assistant intelligent de diagnostic véhiculaire.',
      voiceId: '9BWtsMINqrJLrRacOk9x' // Aria
    },
  ];

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

      // Simulate text-to-speech (you would need ElevenLabs API key for real implementation)
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

  const handleContinue = () => {
    stopCurrentAudio();
    setLanguage(selectedLanguage);
    localStorage.setItem('welcomeCompleted', 'true');
    navigate('/onboarding');
  };

  useEffect(() => {
    // Auto-play English welcome message on load
    const englishLang = languages.find(lang => lang.code === 'en');
    if (englishLang) {
      setTimeout(() => playWelcomeMessage(englishLang), 1000);
    }

    return () => {
      stopCurrentAudio();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-dark to-gray-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo and Title */}
        <div className="flex flex-col items-center space-y-6 animate-slide-down">
          <img 
            src="/logo.png"
            alt="Auto Master Bot Logo"
            className="w-32 h-32 object-contain animate-scale-in"
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
};

export default Welcome;
