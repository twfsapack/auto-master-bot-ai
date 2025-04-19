
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  date: Date;
  type: string;
  description?: string;
}

interface TaskListProps {
  tasks: Task[];
  onShowDetails: (task: Task) => void;
  onAddTaskClick: () => void;
}

export const TaskList = ({ tasks, onShowDetails, onAddTaskClick }: TaskListProps) => {
  const { t } = useLanguage();

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
    <div className="space-y-2">
      {tasks.map((task) => (
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
  );
};
