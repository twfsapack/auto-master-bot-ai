
import React from 'react';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

// Los idiomas disponibles en la aplicación
const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
];

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    console.log(`Idioma cambiado a: ${langCode}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full hover:bg-white/10 text-white/70 hover:text-white w-8 h-8 transition-all duration-300"
        >
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('changeLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 glass-card border-white/20 backdrop-blur-md bg-slate-900/90 text-white z-50"
      >
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className={`text-white hover:bg-white/10 hover:text-white cursor-pointer ${
              language === lang.code ? "bg-blue-500/20 text-blue-200" : ""
            }`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
