
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
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
  Languages
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVehicle } from '@/contexts/VehicleContext';
import LanguageSelector from './LanguageSelector';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { selectedVehicle } = useVehicle();
  
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Chat', path: '/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Maintenance', path: '/maintenance', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Database', path: '/database', icon: <Database className="w-5 h-5" /> },
    { name: 'Vehicle', path: '/vehicle', icon: <Car className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Don't show navigation on auth screens
  if (location.pathname === '/' || location.pathname.includes('/auth')) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 w-full glass-card z-50 px-4 py-2 mb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
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

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 pb-20">{children}</main>

      {/* Bottom Nav Bar for Mobile */}
      <nav className="fixed bottom-0 w-full glass-card px-4 py-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item ${
                location.pathname === item.path ? 'active' : ''
              } flex flex-col items-center`}
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
