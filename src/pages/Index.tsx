
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Car, Wrench, Bot } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen gradient-bg text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-fade-in">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-silver to-purple rounded-full blur"></div>
              <div className="relative bg-navy p-4 rounded-full">
                <Car className="h-16 w-16" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Auto Master Bot
          </h1>
          
          <p className="text-xl mb-8 max-w-md mx-auto">
            Your intelligent assistant for vehicle diagnostics and maintenance
          </p>
          
          <div className="grid grid-cols-3 gap-6 mb-12 max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-purple/20 p-3 rounded-lg mb-2">
                <Bot className="h-6 w-6" />
              </div>
              <span className="text-sm">AI Diagnostics</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple/20 p-3 rounded-lg mb-2">
                <Wrench className="h-6 w-6" />
              </div>
              <span className="text-sm">Maintenance</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple/20 p-3 rounded-lg mb-2">
                <Wrench className="h-6 w-6" />
              </div>
              <span className="text-sm">Repair Guides</span>
            </div>
          </div>
          
          <div className="space-x-4">
            <Button
              size="lg"
              className="bg-purple hover:bg-purple/90"
              onClick={() => navigate('/auth/login')}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 hover:bg-white/10"
              onClick={() => navigate('/auth/register')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="text-center p-4 text-white/60 text-sm">
        <p>Auto Master Bot &copy; 2025 | Your Vehicle's AI Assistant</p>
      </footer>
    </div>
  );
};

export default Index;
