
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    title: string;
    dueDate: Date;
    type: string;
    description?: string;
  };
  onRequestNotification?: (task: any) => void;
}

export const TaskDetailsModal = ({ 
  isOpen, 
  onClose, 
  task,
  onRequestNotification 
}: TaskDetailsModalProps) => {
  const { t } = useLanguage();
  
  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'important':
        return <AlertTriangle className="h-5 w-5 text-secondary" />;
      default:
        return <CheckCircle className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTaskTypeIcon(task.type)}
            {task.title}
          </DialogTitle>
          <DialogDescription>
            {t('taskDetails')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{t('dueDate')}</p>
              <p className="text-sm text-muted-foreground">
                {format(task.dueDate, 'PPP')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{t('status')}</p>
              <p className="text-sm text-muted-foreground">
                {task.dueDate.getTime() < new Date().getTime() 
                  ? t('overdue') 
                  : t('upcoming')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className={`h-5 w-5 rounded-full mt-0.5
              ${task.type === 'urgent' 
                ? 'bg-destructive' 
                : task.type === 'important' 
                  ? 'bg-secondary' 
                  : 'bg-primary'}`} 
            />
            <div>
              <p className="font-medium">{t('priority')}</p>
              <p className="text-sm text-muted-foreground">
                {t(task.type)}
              </p>
            </div>
          </div>
          
          {task.description && (
            <div className="border-t pt-4 mt-4">
              <p className="font-medium mb-2">{t('description')}</p>
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          {onRequestNotification && (
            <Button 
              variant="outline" 
              onClick={() => onRequestNotification(task)}
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              {t('setReminder')}
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="outline">{t('close')}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
