
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarCheck, Check, Edit, ListTodo } from 'lucide-react';
import { format } from 'date-fns';

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
  onAddTaskClick: () => void;
}

export const TaskList = ({ 
  tasks, 
  onShowDetails, 
  onEditTask, 
  onToggleStatus, 
  onAddTaskClick 
}: TaskListProps) => {
  const { t } = useLanguage();

  const activeTasks = tasks.filter(task => task.status !== 'completed');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  if (tasks.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground mb-2">
          {t('noTasks')}
        </p>
        <Button
          variant="outline"
          className="mt-2"
          onClick={onAddTaskClick}
        >
          <ListTodo className="h-4 w-4 mr-2" />
          {t('addTask')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto p-2">
      {activeTasks.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            {t('activeTasks')} ({activeTasks.length})
          </h3>
          <div className="space-y-2">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-lg transition-colors hover:bg-accent/50
                  ${
                    task.type === 'urgent'
                      ? 'bg-destructive/10 dark:bg-destructive/20'
                      : task.type === 'important'
                      ? 'bg-secondary/10 dark:bg-secondary/20'
                      : 'bg-primary/5 dark:bg-primary/10'
                  }
                `}
              >
                <div className="flex justify-between">
                  <h4 
                    className="font-medium truncate cursor-pointer" 
                    onClick={() => onShowDetails(task)}
                  >
                    {task.title}
                  </h4>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => onEditTask(task)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => onToggleStatus(task.id)}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {format(task.date, 'PPP')}
                  </span>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" />
            {t('completedTasks')} ({completedTasks.length})
          </h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onShowDetails(task)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <h4 className="font-medium line-through truncate">{task.title}</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus(task.id);
                    }}
                  >
                    <CalendarCheck className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {format(task.date, 'PPP')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

