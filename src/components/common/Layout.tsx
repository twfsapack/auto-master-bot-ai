
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
        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-purple-400/30">
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
    return <main className="min-h-screen gradient-bg">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen gradient-bg overflow-x-hidden">
      {/* Futuristic Header */}
      <header className="sticky top-0 w-full glass-card z-40 mx-2 mt-2 mb-4 animate-slide-in-left safe-area-top">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-fade-in-up overflow-hidden">
              <img 
                src="/lovable-uploads/96d55c60-b5db-4e5f-aa7f-d0c00219953f.png" 
                alt="Auto Master Bot" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-bold text-sm">AMB</span>';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-bold text-white animate-glow-pulse">
                Auto Master Bot
              </h1>
              {selectedVehicle && (
                <p className="text-xs sm:text-sm text-purple-300">
                  {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {user?.isPremium && (
              <div className="hidden sm:flex items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-yellow-500/30 backdrop-blur">
                Premium
              </div>
            )}
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:bg-white/10 text-white/70 hover:text-white w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="rounded-full hover:bg-red-500/20 text-white/70 hover:text-red-300 w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-2 sm:px-4 pb-20 sm:pb-24 animate-fade-in-up safe-area-bottom">
        {children}
      </main>

      {/* Futuristic Floating Navigation */}
      <nav className="floating-nav safe-area-bottom">
        <div className="glass-card p-1 sm:p-2">
          <ScrollArea className="w-full" type="always">
            <div className="flex justify-between items-center px-1 sm:px-2 space-x-1 sm:space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => item.external ? window.open(item.path, '_blank') : navigate(item.path)}
                  className={cn(
                    "nav-item group min-w-[60px] sm:min-w-[70px] p-2 rounded-lg",
                    location.pathname === item.path && "active"
                  )}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div className={cn(
                      "p-1.5 sm:p-2 rounded-lg transition-all duration-300",
                      location.pathname === item.path 
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25" 
                        : "text-white/60 group-hover:text-white group-hover:bg-white/10"
                    )}>
                      {item.icon}
                    </div>
                    <span className={cn(
                      "transition-all duration-300 text-xs font-medium",
                      location.pathname === item.path 
                        ? "text-white" 
                        : "text-white/60 group-hover:text-white"
                    )}>
                      {t(item.name)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <ScrollBar 
              orientation="horizontal" 
              className="h-1 sm:h-2 bg-purple-500/20 rounded-full mt-1 sm:mt-2"
              forceMount 
            />
          </ScrollArea>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
