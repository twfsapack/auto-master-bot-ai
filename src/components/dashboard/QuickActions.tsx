
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Settings, Zap, BadgeInfo, BluetoothSearching } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Card className="glass-card animate-fade-in-up border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-white animate-fade-in-up">
          <Zap className="h-5 w-5 text-purple-400" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 glass-card border-white/20 hover:border-purple-400/50 text-white hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
            onClick={() => navigate('/chat')}
            style={{animationDelay: '0.1s'}}
          >
            <AlertCircle className="h-5 w-5 mb-1 text-purple-400" />
            <span className="text-xs">Ask AI</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 glass-card border-white/20 hover:border-purple-400/50 text-white hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
            onClick={() => navigate('/scanner')}
            disabled={!user?.isPremium}
            style={{animationDelay: '0.2s'}}
          >
            <BluetoothSearching className="h-5 w-5 mb-1 text-purple-400" />
            <span className="text-xs">OBD-II Scan</span>
            {!user?.isPremium && (
              <span className="text-[10px] text-yellow-300">Premium</span>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 glass-card border-white/20 hover:border-purple-400/50 text-white hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
            onClick={() => navigate('/database')}
            style={{animationDelay: '0.3s'}}
          >
            <BadgeInfo className="h-5 w-5 mb-1 text-purple-400" />
            <span className="text-xs">KB Articles</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 glass-card border-white/20 hover:border-purple-400/50 text-white hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
            onClick={() => navigate('/settings')}
            style={{animationDelay: '0.4s'}}
          >
            <Settings className="h-5 w-5 mb-1 text-purple-400" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
