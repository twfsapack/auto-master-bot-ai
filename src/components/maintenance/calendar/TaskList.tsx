
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Check, CircleCheck } from 'lucide-react';

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
        <p className="text-muted-foreground">
          {t('noTasks')}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={onAddTaskClick}
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('addTask')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activeTasks.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">{t('activeTasks')}</h3>
          <div className="space-y-2">
            {activeTasks.map((task) => (
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
                      onClick={() => onShowDetails(task)}
                    >
                      {t('details')}
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
          <h3 className="font-medium mb-2">{t('completedTasks')}</h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 text-primary" />
                  <h3 className="font-medium line-through">{task.title}</h3>
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => onShowDetails(task)}
                  >
                    {t('details')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
