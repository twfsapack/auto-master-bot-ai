
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Settings, Zap, BadgeInfo, BluetoothSearching } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Card className="glass-card animate-fade-in border border-logo-primary/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 animate-fade-in text-logo-primary">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-primary/20 hover:bg-logo-primary/10 hover:border-logo-primary/40"
            onClick={() => navigate('/chat')}
          >
            <AlertCircle className="h-5 w-5 mb-1 text-logo-primary" />
            <span className="text-xs text-logo-secondary">Ask AI</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-primary/20 hover:bg-logo-primary/10 hover:border-logo-primary/40"
            onClick={() => navigate('/scanner')}
            disabled={!user?.isPremium}
          >
            <BluetoothSearching className="h-5 w-5 mb-1 text-logo-primary" />
            <span className="text-xs text-logo-secondary">OBD-II Scan</span>
            {!user?.isPremium && (
              <span className="text-[10px] text-logo-gray">Premium</span>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-primary/20 hover:bg-logo-primary/10 hover:border-logo-primary/40"
            onClick={() => navigate('/database')}
          >
            <BadgeInfo className="h-5 w-5 mb-1 text-logo-primary" />
            <span className="text-xs text-logo-secondary">KB Articles</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-primary/20 hover:bg-logo-primary/10 hover:border-logo-primary/40"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5 mb-1 text-logo-primary" />
            <span className="text-xs text-logo-secondary">Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
