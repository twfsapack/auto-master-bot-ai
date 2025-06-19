
import { useEffect } from 'react';

export const MobileOptimizations = () => {
  useEffect(() => {
    // Prevenir zoom en inputs en iOS
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Configurar tema de la barra de estado
    const themeColor = document.querySelector('meta[name=theme-color]');
    if (!themeColor) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#1a1a1a';
      document.head.appendChild(meta);
    }

    // Configurar splash screen
    const splashMeta = document.createElement('meta');
    splashMeta.name = 'mobile-web-app-capable';
    splashMeta.content = 'yes';
    document.head.appendChild(splashMeta);

  }, []);

  return null;
};
