import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useVehicle } from '@/contexts/VehicleContext';
import { useToast } from '@/hooks/use-toast';

export const MaintenanceReminders = () => {
  const navigate = useNavigate();
  const { selectedVehicle } = useVehicle();
  const { toast } = useToast();

  // Mock maintenance data
  const maintenanceItems = [
    {
      id: '1',
      title: 'Oil Change',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      type: 'routine'
    },
    {
      id: '2',
      title: 'Tire Rotation',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      type: 'routine'
    },
    {
      id: '3',
      title: 'Brake Inspection',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (overdue)
      type: 'important'
    }
  ];

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast({
          title: "Notifications enabled",
          description: "You will receive reminders for maintenance tasks",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not enable notifications",
      });
    }
  };

  const scheduleNotification = (task: { title: string, dueDate: Date }) => {
    if (Notification.permission === "granted") {
      const now = new Date().getTime();
      const taskTime = task.dueDate.getTime();
      
      if (taskTime > now) {
        setTimeout(() => {
          new Notification("Maintenance Reminder", {
            body: `Time for ${task.title}!`,
            icon: "/logo.png"
          });
        }, taskTime - now);

        toast({
          title: "Reminder set",
          description: `You will be notified when it's time for ${task.title}`,
        });
      }
    } else {
      requestNotificationPermission();
    }
  };

  if (!selectedVehicle) {
    return null;
  }

  const formatDueDate = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Maintenance Schedule
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('/maintenance')}>
            <span className="text-xs">View All</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {maintenanceItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg flex justify-between items-center
                ${
                  item.dueDate.getTime() < new Date().getTime()
                    ? 'bg-destructive/10 dark:bg-destructive/20'
                    : item.type === 'important'
                    ? 'bg-secondary/10 dark:bg-secondary/20'
                    : 'bg-primary/5 dark:bg-primary/10'
                }
              `}
            >
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p
                  className={`text-xs ${
                    item.dueDate.getTime() < new Date().getTime()
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`}
                >
                  {formatDueDate(item.dueDate)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => scheduleNotification(item)}
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
