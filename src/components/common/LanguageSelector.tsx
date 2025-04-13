
import React, { useState } from 'react';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Los idiomas disponibles en la aplicación
const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
];

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('es'); // Español por defecto

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    // Aquí podríamos implementar la lógica para cambiar el idioma en toda la aplicación
    console.log(`Idioma cambiado a: ${langCode}`);
  };

  // Encontrar el nombre del idioma actual
  const currentLanguageName = languages.find(lang => lang.code === currentLanguage)?.name || 'Español';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full"
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((language) => (
          <DropdownMenuItem 
            key={language.code}
            className={currentLanguage === language.code ? "bg-muted" : ""}
            onClick={() => handleLanguageChange(language.code)}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
