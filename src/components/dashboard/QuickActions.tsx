
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scan, AlertCircle, Settings, Zap, BadgeInfo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20"
            onClick={() => navigate('/chat')}
          >
            <AlertCircle className="h-5 w-5 mb-1" />
            <span className="text-xs">Ask AI</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20"
            onClick={() => navigate('/scanner')}
            disabled={!user?.isPremium}
          >
            <Scan className="h-5 w-5 mb-1" />
            <span className="text-xs">OBD-II Scan</span>
            {!user?.isPremium && (
              <span className="text-[10px] text-muted-foreground">Premium</span>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20"
            onClick={() => navigate('/database')}
          >
            <BadgeInfo className="h-5 w-5 mb-1" />
            <span className="text-xs">KB Articles</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5 mb-1" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
