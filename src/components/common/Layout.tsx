
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
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVehicle } from '@/contexts/VehicleContext';
import LanguageSelector from './LanguageSelector';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { selectedVehicle } = useVehicle();
  const { t } = useLanguage();
  
  const navItems = [
    { 
      name: 'Home', 
      path: '/dashboard', 
      icon: selectedVehicle?.image ? (
        <div className="relative w-5 h-5 rounded-full overflow-hidden">
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
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 w-full glass-card z-50 px-4 py-2 mb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Auto Master Bot Logo" 
              className="h-10 w-10 mr-2"
            />
            <span className="font-bold text-xl bg-gradient-to-r from-navy to-purple text-transparent bg-clip-text">
              Auto Master Bot
            </span>
            {selectedVehicle && (
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full"
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
              className="rounded-full"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 pb-20">{children}</main>

      <nav className="fixed bottom-0 w-full glass-card px-4 py-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => item.external ? window.open(item.path, '_blank') : navigate(item.path)}
              className={cn(
                "nav-item flex flex-col items-center",
                location.pathname === item.path && "active"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
