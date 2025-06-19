
import { useState, useEffect } from 'react';

interface CapacitorInfo {
  isNative: boolean;
  platform: 'web' | 'android' | 'ios';
  isReady: boolean;
}

export const useCapacitor = (): CapacitorInfo => {
  const [capacitorInfo, setCapacitorInfo] = useState<CapacitorInfo>({
    isNative: false,
    platform: 'web',
    isReady: false
  });

  useEffect(() => {
    const checkCapacitor = async () => {
      try {
        // Verificar si Capacitor está disponible
        if (window.Capacitor) {
          const { Capacitor } = await import('@capacitor/core');
          
          setCapacitorInfo({
            isNative: Capacitor.isNativePlatform(),
            platform: Capacitor.getPlatform(),
            isReady: true
          });
        } else {
          setCapacitorInfo({
            isNative: false,
            platform: 'web',
            isReady: true
          });
        }
      } catch (error) {
        console.log('Capacitor not available, running as web app');
        setCapacitorInfo({
          isNative: false,
          platform: 'web',
          isReady: true
        });
      }
    };

    checkCapacitor();
  }, []);

  return capacitorInfo;
};

// Declare global Capacitor interface
declare global {
  interface Window {
    Capacitor?: any;
  }
}
