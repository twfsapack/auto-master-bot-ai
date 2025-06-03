
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight, Bell, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useVehicle } from '@/contexts/VehicleContext';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { TaskDetailsModal } from '@/components/maintenance/TaskDetailsModal';

// Definimos la interfaz para las tareas
interface MaintenanceTask {
  id: string;
  title: string;
  dueDate: Date;
  type: string;
  description: string;
  status?: 'active' | 'completed';
}

// Interface for tasks read from localStorage where dueDate is a string
interface StoredMaintenanceTask extends Omit<MaintenanceTask, 'dueDate'> {
  dueDate: string;
}

// Clave para almacenar las tareas en localStorage
const MAINTENANCE_TASKS_KEY = 'maintenance_tasks';

export const MaintenanceReminders = () => {
  const navigate = useNavigate();
  const { selectedVehicle } = useVehicle();
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceTask[]>([]);

  // Cargar las tareas desde localStorage cuando el componente se monta
  useEffect(() => {
    const loadTasks = () => {
      const storedTasks = localStorage.getItem(MAINTENANCE_TASKS_KEY);
      
      if (storedTasks) {
        try {
          // Parse the JSON and convert date strings back to Date objects
          const parsedTasks = JSON.parse(storedTasks).map((task: StoredMaintenanceTask) => ({
            ...task,
            dueDate: new Date(task.dueDate)
          }));
          
          // Filter out only active tasks
          const activeTasks = parsedTasks.filter((task: MaintenanceTask) => 
            task.status !== 'completed'
          );
          
          setMaintenanceItems(activeTasks);
        } catch (error) {
          console.error("Error parsing tasks from localStorage:", error);
          
          // Si hay un error, usar tareas predeterminadas
          setDefaultTasks();
        }
      } else {
        // Si no hay tareas guardadas, usar tareas predeterminadas
        setDefaultTasks();
      }
    };

    // Función para establecer tareas predeterminadas
    const setDefaultTasks = () => {
      const defaultTasks = [
        {
          id: '1',
          title: 'Oil Change',
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
          type: 'routine',
          description: 'Regular oil change to ensure optimal engine performance and longevity. Recommended every 5,000 miles or 6 months.'
        },
        {
          id: '2',
          title: 'Tire Rotation',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          type: 'routine',
          description: 'Rotate tires to ensure even wear and extend tire life. Check tire pressure and balance as needed.'
        },
        {
          id: '3',
          title: 'Brake Inspection',
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (overdue)
          type: 'important',
          description: 'Inspect brake pads, rotors, and fluid levels. Critical for vehicle safety.'
        }
      ];
      
      setMaintenanceItems(defaultTasks);
      
      // También guardar las tareas predeterminadas en localStorage
      localStorage.setItem(MAINTENANCE_TASKS_KEY, JSON.stringify(defaultTasks));
    };

    loadTasks();
    
    // Escuchar cambios en localStorage para actualizar en tiempo real
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === MAINTENANCE_TASKS_KEY) {
        loadTasks();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Evento personalizado para detectar cambios dentro de la misma pestaña
    window.addEventListener('maintenanceTasksUpdated', loadTasks);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('maintenanceTasksUpdated', loadTasks);
    };
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast({
          title: "Notifications enabled",
          description: "You will receive reminders for maintenance tasks",
        });
      }
    } catch {
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
  
  const deleteNotification = (taskId: string) => {
    // Primero actualizar el estado local
    setMaintenanceItems(prev => prev.filter(item => item.id !== taskId));
    
    // Luego actualizar localStorage
    const storedTasks = localStorage.getItem(MAINTENANCE_TASKS_KEY);
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks) as StoredMaintenanceTask[];
        const updatedTasks = parsedTasks.filter((task: StoredMaintenanceTask) => task.id !== taskId);
        localStorage.setItem(MAINTENANCE_TASKS_KEY, JSON.stringify(updatedTasks));
        
        // Disparar evento para que otros componentes sepan que se actualizó
        window.dispatchEvent(new Event('maintenanceTasksUpdated'));
      } catch (error) {
        console.error("Error updating tasks in localStorage:", error);
      }
    }
    
    toast({
      title: "Notification deleted",
      description: "The maintenance reminder has been removed",
    });
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

  const handleShowDetails = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
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
          {maintenanceItems.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No maintenance tasks scheduled.
            </div>
          ) : (
            maintenanceItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg flex justify-between items-center
                  ${
                    item.dueDate.getTime() < new Date().getTime()
                      ? 'bg-destructive/10 dark:bg-destructive/20'
                      : item.type === 'important' || item.type === 'urgent'
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
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleShowDetails(item)}
                  >
                    Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => deleteNotification(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      
      {selectedTask && (
        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          task={selectedTask}
        />
      )}
    </Card>
  );
};
