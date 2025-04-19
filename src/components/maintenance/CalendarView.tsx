
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useVehicle } from '@/contexts/VehicleContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { es, enUS, fr, de, pt } from 'date-fns/locale';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface CalendarViewProps {
  onShowTaskDetails?: (task: any) => void;
}

// Mock maintenance tasks
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

// Map language codes to date-fns locales
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
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'routine',
    description: ''
  });
  const { selectedVehicle } = useVehicle();
  const { language, t } = useLanguage();

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedDate(selectedDate);
  };

  const getEventsForDate = (date: Date) => {
    if (!date) return [];
    return maintenanceTasks.filter(
      (task) => format(task.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const handleAddTask = () => {
    // In a real app, this would add the task to the database
    // For now, we're just closing the dialog
    setIsDialogOpen(false);
    setNewTask({
      title: '',
      type: 'routine',
      description: ''
    });
  };

  const handleShowDetails = (task: any) => {
    if (onShowTaskDetails) {
      // Map the task format to match the expected format
      onShowTaskDetails({
        ...task,
        dueDate: task.date
      });
    }
  };

  // Get the appropriate locale based on the selected language
  const dateLocale = localeMap[language as keyof typeof localeMap] || es;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('maintenanceCalendar')}</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('addTask')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('addTask')}</DialogTitle>
              <DialogDescription>
                {t('addTaskDescription')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">{t('taskTitle')}</Label>
                <Input
                  id="task-title"
                  placeholder="e.g., Oil Change"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-date">{t('date')}</Label>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {selectedDate ? format(selectedDate, 'PPP', { locale: dateLocale }) : t('selectDate')}
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-type">{t('type')}</Label>
                <Select 
                  value={newTask.type} 
                  onValueChange={(value) => setNewTask({ ...newTask, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectTaskType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">{t('routine')}</SelectItem>
                    <SelectItem value="important">{t('important')}</SelectItem>
                    <SelectItem value="urgent">{t('urgent')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-description">{t('description')}</Label>
                <Textarea
                  id="task-description"
                  placeholder={t('descriptionPlaceholder')}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {t('cancel')}
              </Button>
              <Button onClick={handleAddTask}>{t('addTask')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            <div className="space-y-2">
              {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg
                      ${
                        task.type === 'urgent'
                          ? 'bg-destructive/10 dark:bg-destructive/20'
                          : task.type === 'important'
                          ? 'bg-secondary/10 dark:bg-secondary/20'
                          : 'bg-primary/5 dark:bg-primary/10'
                      }
                    `}
                  >
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full
                          ${
                            task.type === 'urgent'
                              ? 'bg-destructive/20 text-destructive'
                              : task.type === 'important'
                              ? 'bg-secondary/20 text-secondary'
                              : 'bg-primary/20 text-primary'
                          }
                        `}
                      >
                        {t(task.type)}
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleShowDetails(task)}
                        >
                          {t('details')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    {t('noTasks')}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('addTask')}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
