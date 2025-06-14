
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useVehicle } from '@/contexts/VehicleContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { es, enUS, fr, de, pt } from 'date-fns/locale';
import { AddTaskDialog } from './calendar/AddTaskDialog';
import { TaskList } from './calendar/TaskList';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { recommendedTasks } from '@/data/recommendedTasks';
import { useToast } from '@/hooks/use-toast';

interface CalendarViewProps {
  onShowTaskDetails?: (task: any) => void;
}

// Clave para almacenar las tareas en localStorage
const MAINTENANCE_TASKS_KEY = 'maintenance_tasks';

const maintenanceTasks = [
  {
    id: '1',
    title: 'Oil Change',
    date: new Date(2025, 3, 15), // April 15, 2025
    vehicle: '123',
    type: 'routine',
    description: 'Regular oil change to ensure optimal engine performance and longevity. Recommended every 5,000 miles or 6 months.'
  },
  {
    id: '2',
    title: 'Tire Rotation',
    date: new Date(2025, 3, 20), // April 20, 2025
    vehicle: '123',
    type: 'routine',
    description: 'Rotate tires to ensure even wear and extend tire life. Check tire pressure and balance as needed.'
  },
  {
    id: '3',
    title: 'Brake Inspection',
    date: new Date(2025, 3, 10), // April 10, 2025
    vehicle: '123',
    type: 'important',
    description: 'Inspect brake pads, rotors, and fluid levels. Critical for vehicle safety.'
  },
  {
    id: '4',
    title: 'Air Filter Replacement',
    date: new Date(2025, 4, 5), // May 5, 2025
    vehicle: '123',
    type: 'routine',
    description: 'Replace air filter to ensure proper engine airflow and improve fuel efficiency.'
  }
];

const localeMap = {
  es: es,
  en: enUS,
  fr: fr,
  de: de,
  pt: pt
};

export const CalendarView = ({ onShowTaskDetails }: CalendarViewProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTask, setEditTask] = useState<any>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'routine',
    description: ''
  });
  
  const [tasks, setTasks] = useState<any[]>([]);

  const { selectedVehicle } = useVehicle();
  const { language, t } = useLanguage();
  const { toast } = useToast();

  // Cargar tareas desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedTasks = localStorage.getItem(MAINTENANCE_TASKS_KEY);
    if (storedTasks) {
      try {
        // Parse the JSON and convert date strings back to Date objects
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          date: new Date(task.date || task.dueDate)
        }));
        
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        // If there's an error, use default tasks
        const defaultTasks = maintenanceTasks.map(task => ({
          ...task,
          status: 'active' as 'active' | 'completed'
        }));
        setTasks(defaultTasks);
        persistTasks(defaultTasks);
      }
    } else {
      // If no tasks are saved, use default tasks
      const defaultTasks = maintenanceTasks.map(task => ({
        ...task,
        status: 'active' as 'active' | 'completed'
      }));
      setTasks(defaultTasks);
      persistTasks(defaultTasks);
    }
  }, []);

  const persistTasks = (updatedTasks: any[]) => {
    // Guardar tareas en localStorage
    localStorage.setItem(MAINTENANCE_TASKS_KEY, JSON.stringify(updatedTasks));
    
    // Disparar evento para que otros componentes sepan que se actualizaron las tareas
    window.dispatchEvent(new Event('maintenanceTasksUpdated'));
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedDate(selectedDate);
  };

  const getEventsForDate = (date: Date) => {
    if (!date) return [];
    return tasks.filter(
      (task) => format(new Date(task.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const handleAddTask = () => {
    if (isEditMode && editTask) {
      // Update existing task
      const updatedTasks = tasks.map(task => 
        task.id === editTask.id
          ? {
              ...task,
              title: newTask.title,
              type: newTask.type,
              description: newTask.description
            }
          : task
      );
      
      setTasks(updatedTasks);
      persistTasks(updatedTasks);
      
      toast({
        title: t('taskUpdated'),
        description: t('taskUpdateSuccess')
      });
    } else {
      // Add new task
      const taskToAdd = {
        id: Date.now().toString(),
        title: newTask.title,
        type: newTask.type,
        description: newTask.description,
        date: selectedDate || new Date(),
        dueDate: selectedDate || new Date(), // Adding dueDate for compatibility with MaintenanceReminders
        vehicle: selectedVehicle?.id || '',
        status: 'active' as 'active' | 'completed'
      };
      
      const updatedTasks = [...tasks, taskToAdd];
      setTasks(updatedTasks);
      persistTasks(updatedTasks);
      
      toast({
        title: t('taskAdded'),
        description: t('taskAddSuccess')
      });
    }
    
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditTask(null);
    setNewTask({
      title: '',
      type: 'routine',
      description: ''
    });
  };

  const handleRecommendedTaskSelect = (task: typeof recommendedTasks[0]) => {
    setNewTask({
      title: task.title,
      type: task.type,
      description: task.description
    });
    setIsEditMode(false);
    setEditTask(null);
    setIsDialogOpen(true);
  };

  const handleEditTask = (task: any) => {
    setEditTask(task);
    setNewTask({
      title: task.title,
      type: task.type,
      description: task.description || ''
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleTaskStatusToggle = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId
        ? { ...task, status: task.status === 'active' ? 'completed' : 'active' }
        : task
    );
    
    setTasks(updatedTasks);
    persistTasks(updatedTasks);
  };
  
  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    persistTasks(updatedTasks);
    
    toast({
      title: t('taskDeleted'),
      description: t('taskDeleteSuccess')
    });
  };

  const handleShowDetails = (task: any) => {
    if (onShowTaskDetails) {
      onShowTaskDetails({
        ...task,
        dueDate: task.date
      });
    }
  };

  const dateLocale = localeMap[language as keyof typeof localeMap] || es;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('maintenanceCalendar')}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('addTask')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {recommendedTasks.map(task => (
              <DropdownMenuItem
                key={task.id}
                onClick={() => handleRecommendedTaskSelect(task)}
              >
                {task.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{t('calendar')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-md"
              locale={dateLocale}
            />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, 'PPPP', { locale: dateLocale }) : t('selectedDate')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskList
              tasks={selectedDate ? getEventsForDate(selectedDate) : []}
              onShowDetails={handleShowDetails}
              onEditTask={handleEditTask}
              onToggleStatus={handleTaskStatusToggle}
              onDeleteTask={handleDeleteTask}
              onAddTaskClick={() => {
                setIsEditMode(false);
                setEditTask(null);
                setNewTask({
                  title: '',
                  type: 'routine',
                  description: ''
                });
                setIsDialogOpen(true);
              }}
            />
          </CardContent>
        </Card>
      </div>

      <AddTaskDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDate={selectedDate}
        newTask={newTask}
        onNewTaskChange={setNewTask}
        onAddTask={handleAddTask}
        dateLocale={dateLocale}
        isEditMode={isEditMode}
      />
    </div>
  );
};
