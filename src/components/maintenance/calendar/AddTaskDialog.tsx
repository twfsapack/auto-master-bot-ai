
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format, Locale } from "date-fns"; // Import Locale type
import { useLanguage } from "@/contexts/LanguageContext";

// Define a specific type for the new task data
interface NewTaskData {
  title: string;
  type: string;
  description: string;
}

interface AddTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
  newTask: NewTaskData; // Use the specific type here
  onNewTaskChange: (task: NewTaskData) => void; // And here
  onAddTask: () => void;
  dateLocale: Locale; // Use the specific type here
  isEditMode?: boolean;
}

export const AddTaskDialog = ({
  isOpen,
  onOpenChange,
  selectedDate,
  newTask,
  onNewTaskChange,
  onAddTask,
  dateLocale,
  isEditMode = false,
}: AddTaskDialogProps) => {
  const { t } = useLanguage();
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNewTaskChange({
      ...newTask,
      title: e.target.value,
    });
  };

  const handleTypeChange = (value: string) => {
    onNewTaskChange({
      ...newTask,
      type: value,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onNewTaskChange({
      ...newTask,
      description: e.target.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t('editTask') : t('addTask')}
          </DialogTitle>
          <DialogDescription>
            {selectedDate
              ? format(selectedDate, 'PPP', { locale: dateLocale })
              : t('selectDate')}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">{t('title')}</Label>
            <Input
              id="title"
              value={newTask.title}
              onChange={handleTitleChange}
              placeholder={t('taskTitlePlaceholder')}
            />
          </div>

          <div className="grid gap-2">
            <Label>{t('taskType')}</Label>
            <RadioGroup
              value={newTask.type}
              onValueChange={handleTypeChange}
              className="flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="routine" id="routine" />
                <Label htmlFor="routine">{t('routine')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="important" id="important" />
                <Label htmlFor="important">{t('important')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent">{t('urgent')}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              value={newTask.description}
              onChange={handleDescriptionChange}
              placeholder={t('taskDescriptionPlaceholder')}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onAddTask}>
            {isEditMode ? t('saveChanges') : t('addTask')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

