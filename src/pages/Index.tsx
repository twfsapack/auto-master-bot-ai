
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Apple } from 'lucide-react';

const Index = () => {
  const { user, googleSignIn, appleSignIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  const handleAppleSignIn = async () => {
    await appleSignIn();
  };

  const handleEmailSignIn = () => {
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#0F1218] text-white flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 animate-fade-in">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <img 
              src="/logo.png"
              alt="Auto Master Bot Logo"
              className="w-32 h-32 mb-4 object-contain"
            />
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold text-center">
                AUTO MASTER BOT
              </h1>
              <p 
                className="text-xs text-gray-400 mt-1 italic opacity-80"
              >
                powered by Trucktruest.com
              </p>
            </div>
            <p className="text-sm text-center text-gray-400 mb-8">
              TO INTERACT WITH THE APPLICATION<br />
              YOU NEED TO SIGN IN
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:opacity-90 rounded-full"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z" 
                />
              </svg>
              SIGN IN WITH GOOGLE
            </Button>

            <Button
              onClick={handleAppleSignIn}
              className="w-full h-12 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:opacity-90 rounded-full"
            >
              <Apple className="mr-2 h-5 w-5" />
              SIGN IN WITH APPLE
            </Button>

            <Button
              onClick={handleEmailSignIn}
              className="w-full h-12 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:opacity-90 rounded-full"
            >
              <Mail className="mr-2 h-5 w-5" />
              SIGN IN WITH EMAIL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
