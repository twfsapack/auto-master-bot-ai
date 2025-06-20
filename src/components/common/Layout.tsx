import React, { useState } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  
  const navItems = [
    { 
      name: 'Home', 
      path: '/dashboard', 
      icon: selectedVehicle?.image ? (
        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-blue-400/30">
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
      path: 'https://webapp.trucktruest.com', 
      icon: <ShoppingCart className="w-5 h-5" />,
      external: true 
    },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsLogoutDialogOpen(false);
  };

  if (location.pathname === '/' || location.pathname.includes('/auth')) {
    return <main className="min-h-screen gradient-bg">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen gradient-bg overflow-x-hidden">
      {/* Compact Header */}
      <header className="sticky top-0 w-full glass-card z-40 mx-1 mt-1 mb-2 animate-slide-in-left safe-area-top">
        <div className="flex items-center justify-between p-2 sm:p-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center animate-fade-in-up overflow-hidden">
              <img 
                src="/lovable-uploads/6da80a74-f370-4e8a-a5ca-dd8b844969f9.png" 
                alt="Auto Master Bot" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-bold text-xs">AMB</span>';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm sm:text-base font-bold text-white animate-glow-pulse">
                Auto Master Bot
              </h1>
              {selectedVehicle && (
                <p className="text-xs text-blue-300">
                  {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {user?.isPremium && (
              <div className="hidden sm:flex items-center bg-gradient-to-r from-blue-500/20 to-blue-700/20 text-blue-300 px-2 py-1 rounded-full text-xs font-medium border border-blue-500/30 backdrop-blur">
                Premium
              </div>
            )}
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:bg-white/10 text-white/70 hover:text-white w-8 h-8 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-red-500/20 text-white/70 hover:text-red-300 w-8 h-8 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className={cn(
                "bg-slate-900/95 backdrop-blur-md border border-blue-500/30",
                isMobile 
                  ? "max-w-xs mx-auto w-[90vw] max-w-[280px] rounded-xl p-3 left-[50%] right-auto transform -translate-x-1/2" 
                  : "max-w-lg"
              )}>
                <AlertDialogHeader className={cn(isMobile ? "space-y-1.5" : "")}>
                  <AlertDialogTitle className={cn(
                    "text-white",
                    isMobile ? "text-base text-center" : ""
                  )}>
                    {t('logout')}
                  </AlertDialogTitle>
                  <AlertDialogDescription className={cn(
                    "text-white/80",
                    isMobile ? "text-xs text-center leading-relaxed" : ""
                  )}>
                    ¿Estás seguro de que quieres cerrar sesión?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={cn(
                  isMobile ? "flex-col space-y-1.5 sm:space-y-0 pt-2" : ""
                )}>
                  <AlertDialogCancel className={cn(
                    "bg-slate-700/50 text-white border-slate-600 hover:bg-slate-600/50",
                    isMobile ? "w-full h-8 text-xs" : ""
                  )}>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleLogout}
                    className={cn(
                      "bg-red-500/80 text-white hover:bg-red-600/80",
                      isMobile ? "w-full h-8 text-xs" : ""
                    )}
                  >
                    Cerrar Sesión
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      {/* Expanded Main Content */}
      <main className="flex-1 container mx-auto px-1 sm:px-2 pb-16 sm:pb-20 animate-fade-in-up safe-area-bottom max-w-none">
        {children}
      </main>

      {/* Compact Floating Navigation */}
      <nav className="floating-nav safe-area-bottom">
        <div className="glass-card p-1">
          <ScrollArea className="w-full" type="always">
            <div className="flex justify-between items-center px-1 space-x-1 min-w-max">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => item.external ? window.open(item.path, '_blank') : navigate(item.path)}
                  className={cn(
                    "nav-item group min-w-[50px] sm:min-w-[60px] p-1.5 sm:p-2 rounded-lg flex-shrink-0",
                    location.pathname === item.path && "active"
                  )}
                >
                  <div className="flex flex-col items-center space-y-0.5 sm:space-y-1">
                    <div className={cn(
                      "p-1 sm:p-1.5 rounded-lg transition-all duration-300",
                      location.pathname === item.path 
                        ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/25" 
                        : "text-white/60 group-hover:text-white group-hover:bg-white/10"
                    )}>
                      {item.icon}
                    </div>
                    <span className={cn(
                      "transition-all duration-300 text-xs font-medium whitespace-nowrap",
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
              className="h-1 bg-blue-500/20 rounded-full mt-1"
              forceMount 
            />
          </ScrollArea>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
