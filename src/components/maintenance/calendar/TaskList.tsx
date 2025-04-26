
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarCheck, Check, ListTodo } from 'lucide-react';
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
  onAddTaskClick: () => void;
}

export const TaskList = ({ tasks, onShowDetails, onAddTaskClick }: TaskListProps) => {
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
    <div className="space-y-4">
      {activeTasks.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            {t('activeTasks')}
          </h3>
          <div className="space-y-2">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/50
                  ${
                    task.type === 'urgent'
                      ? 'bg-destructive/10 dark:bg-destructive/20'
                      : task.type === 'important'
                      ? 'bg-secondary/10 dark:bg-secondary/20'
                      : 'bg-primary/5 dark:bg-primary/10'
                  }
                `}
                onClick={() => onShowDetails(task)}
              >
                <h4 className="font-medium">{task.title}</h4>
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
            {t('completedTasks')}
          </h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onShowDetails(task)}
              >
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <h4 className="font-medium line-through">{task.title}</h4>
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
