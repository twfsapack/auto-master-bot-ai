
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Locale } from 'date-fns';

interface AddTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | undefined;
  newTask: {
    title: string;
    type: string;
    description: string;
  };
  onNewTaskChange: (task: any) => void;
  onAddTask: () => void;
  dateLocale: Locale;
}

export const AddTaskDialog = ({
  isOpen,
  onOpenChange,
  selectedDate,
  newTask,
  onNewTaskChange,
  onAddTask,
  dateLocale
}: AddTaskDialogProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onChange={(e) => onNewTaskChange({ ...newTask, title: e.target.value })}
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
              onValueChange={(value) => onNewTaskChange({ ...newTask, type: value })}
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
              onChange={(e) => onNewTaskChange({ ...newTask, description: e.target.value })}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={onAddTask}>{t('addTask')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
