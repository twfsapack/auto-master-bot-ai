
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Settings, Zap, BadgeInfo, BluetoothSearching } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 animate-fade-in text-logo-primary">
          <Zap className="h-5 w-5 text-logo-accent" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-accent/20 hover:bg-logo-secondary/10 hover:border-logo-accent"
            onClick={() => navigate('/chat')}
          >
            <AlertCircle className="h-5 w-5 mb-1 text-logo-accent" />
            <span className="text-xs text-logo-primary">Ask AI</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-accent/20 hover:bg-logo-secondary/10 hover:border-logo-accent disabled:opacity-50"
            onClick={() => navigate('/scanner')}
            disabled={!user?.isPremium}
          >
            <BluetoothSearching className="h-5 w-5 mb-1 text-logo-accent" />
            <span className="text-xs text-logo-primary">OBD-II Scan</span>
            {!user?.isPremium && (
              <span className="text-[10px] text-logo-gray">Premium</span>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-accent/20 hover:bg-logo-secondary/10 hover:border-logo-accent"
            onClick={() => navigate('/database')}
          >
            <BadgeInfo className="h-5 w-5 mb-1 text-logo-accent" />
            <span className="text-xs text-logo-primary">KB Articles</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-accent/20 hover:bg-logo-secondary/10 hover:border-logo-accent"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5 mb-1 text-logo-accent" />
            <span className="text-xs text-logo-primary">Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
