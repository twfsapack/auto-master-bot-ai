
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home,
  MessageSquare,
  Calendar,
  Database,
  Settings,
  LogOut,
  Moon,
  Sun,
  Car,
  ShoppingCart,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVehicle } from '@/contexts/VehicleContext';
import LanguageSelector from './LanguageSelector';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const { selectedVehicle } = useVehicle();
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  const navItems = [
    { 
      name: 'Home', 
      path: '/dashboard', 
      icon: selectedVehicle?.image ? (
        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-blue-light/30">
          <img 
            src={selectedVehicle.image} 
            alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
              e.currentTarget.onerror = null;
            }}
          />
        </div>
      ) : <Home className="w-5 h-5" />
    },
    { name: 'Chat', path: '/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Maintenance', path: '/maintenance', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Database', path: '/database', icon: <Database className="w-5 h-5" /> },
    { name: 'Vehicle', path: '/vehicle', icon: <Car className="w-5 h-5" /> },
    { 
      name: 'Store', 
      path: 'https://autoparts.trucktruest.com', 
      icon: <ShoppingCart className="w-5 h-5" />,
      external: true 
    },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  if (location.pathname === '/' || location.pathname.includes('/auth')) {
    return <main className="min-h-screen bg-bg-dark animate-fade-in">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark">
      {/* Header moderno */}
      <header className="sticky top-0 w-full glass-card z-40 mx-4 mt-4 mb-6 animate-slide-down">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Auto Master Bot" 
              className="h-10 w-10 object-contain animate-fade-in"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-text-primary">
                Auto Master Bot
              </h1>
              {selectedVehicle && (
                <p className="text-sm text-text-secondary">
                  {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {user?.isPremium && (
              <div className="hidden sm:flex items-center bg-accent-orange/20 text-accent-orange px-3 py-1 rounded-full text-xs font-medium">
                Premium
              </div>
            )}
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:bg-blue-secondary/20 text-text-secondary hover:text-text-primary"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="rounded-full hover:bg-red-500/20 text-text-secondary hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 container mx-auto px-4 pb-24 animate-fade-in">
        {children}
      </main>

      {/* Navegación flotante mejorada */}
      <nav className="floating-nav">
        <div className="glass-card p-2">
          <ScrollArea className="w-full" type="always">
            <div className="flex justify-between items-center px-2 space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => item.external ? window.open(item.path, '_blank') : navigate(item.path)}
                  className={cn(
                    "nav-item group",
                    location.pathname === item.path && "active"
                  )}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      location.pathname === item.path 
                        ? "bg-blue-secondary text-white" 
                        : "text-text-secondary group-hover:text-blue-light group-hover:bg-blue-secondary/10"
                    )}>
                      {item.icon}
                    </div>
                    <span className={cn(
                      "transition-colors",
                      location.pathname === item.path 
                        ? "text-blue-light font-medium" 
                        : "text-text-secondary group-hover:text-text-primary"
                    )}>
                      {t(item.name)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <ScrollBar 
              orientation="horizontal" 
              className="h-2 bg-blue-secondary/20 rounded-full mt-2"
              forceMount 
            />
          </ScrollArea>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
