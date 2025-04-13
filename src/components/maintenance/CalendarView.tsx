
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useVehicle } from '@/contexts/VehicleContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock maintenance tasks
const maintenanceTasks = [
  {
    id: '1',
    title: 'Oil Change',
    date: new Date(2025, 3, 15), // April 15, 2025
    vehicle: '123',
    type: 'routine'
  },
  {
    id: '2',
    title: 'Tire Rotation',
    date: new Date(2025, 3, 20), // April 20, 2025
    vehicle: '123',
    type: 'routine'
  },
  {
    id: '3',
    title: 'Brake Inspection',
    date: new Date(2025, 3, 10), // April 10, 2025
    vehicle: '123',
    type: 'important'
  },
  {
    id: '4',
    title: 'Air Filter Replacement',
    date: new Date(2025, 4, 5), // May 5, 2025
    vehicle: '123',
    type: 'routine'
  }
];

export const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'routine'
  });
  const { selectedVehicle } = useVehicle();

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
      type: 'routine'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Maintenance Calendar</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Maintenance Task</DialogTitle>
              <DialogDescription>
                Create a new maintenance task for your vehicle.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  placeholder="e.g., Oil Change"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-date">Date</Label>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {selectedDate ? format(selectedDate, 'PPP', { locale: es }) : 'Select a date'}
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-type">Type</Label>
                <Select 
                  value={newTask.type} 
                  onValueChange={(value) => setNewTask({ ...newTask, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, 'PPPP', { locale: es }) : 'Selected Date'}
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
                        {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                      </span>
                      <Button size="sm" variant="ghost">
                        Complete
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    No maintenance tasks scheduled for this date
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
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
