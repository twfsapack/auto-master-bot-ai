
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarCheck, Check, Edit, ListTodo, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

interface Task {
  id: string;
  title: string;
  date: Date;
  type: string;
  description?: string;
  status?: 'active' | 'completed';
}

interface TaskListProps {
  tasks: Task[];
  onShowDetails: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onToggleStatus: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTaskClick: () => void;
}

export const TaskList = ({ 
  tasks, 
  onShowDetails, 
  onEditTask, 
  onToggleStatus, 
  onDeleteTask,
  onAddTaskClick 
}: TaskListProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const activeTasks = tasks.filter(task => task.status !== 'completed');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  if (tasks.length === 0) {
    return (
      <div className="text-center py-4 sm:py-6">
        <p className="text-muted-foreground mb-3 text-sm">
          {t('noTasks')}
        </p>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={onAddTaskClick}
        >
          <ListTodo className="h-4 w-4 mr-2" />
          {t('addTask')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {activeTasks.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
            <ListTodo className="h-4 w-4" />
            {t('activeTasks')} ({activeTasks.length})
          </h3>
          <div className="space-y-2">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 sm:p-4 rounded-lg transition-colors hover:bg-accent/50
                  ${
                    task.type === 'urgent'
                      ? 'bg-destructive/10 dark:bg-destructive/20'
                      : task.type === 'important'
                      ? 'bg-secondary/10 dark:bg-secondary/20'
                      : 'bg-primary/5 dark:bg-primary/10'
                  }
                `}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 
                      className="font-medium truncate cursor-pointer text-sm sm:text-base" 
                      onClick={() => onShowDetails(task)}
                    >
                      {task.title}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-1 sm:gap-2">
                      <span className="text-xs text-muted-foreground">
                        {format(task.date, isMobile ? 'dd/MM' : 'PPP')}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full w-fit
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
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => onEditTask(task)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => onToggleStatus(task.id)}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
            <CalendarCheck className="h-4 w-4" />
            {t('completedTasks')} ({completedTasks.length})
          </h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 sm:p-4 rounded-lg bg-muted/50 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onShowDetails(task)}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium line-through truncate text-sm sm:text-base">{task.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {format(task.date, isMobile ? 'dd/MM' : 'PPP')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStatus(task.id);
                      }}
                    >
                      <CalendarCheck className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(task.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
