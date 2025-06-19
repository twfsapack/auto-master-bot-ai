
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3bce9077b5a8441c84bf0cfe4fcf8ca1',
  appName: 'auto-master-bot-ai',
  webDir: 'dist',
  server: {
    url: 'https://3bce9077-b5a8-441c-84bf-0cfe4fcf8ca1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a1a',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
