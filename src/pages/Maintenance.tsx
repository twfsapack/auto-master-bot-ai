
import { CalendarView } from '@/components/maintenance/CalendarView';
import Layout from '@/components/common/Layout';
import { useState } from 'react';
import { TaskDetailsModal } from '@/components/maintenance/TaskDetailsModal';
import { useToast } from '@/hooks/use-toast';

const Maintenance = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleShowTaskDetails = (task: any) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleRequestNotification = (task: any) => {
    if (Notification.permission === "granted") {
      toast({
        title: "Notificación programada",
        description: `Te notificaremos cuando sea tiempo para "${task.title}"`,
      });
      
      // Simulate scheduling a notification
      const now = new Date().getTime();
      const taskTime = task.dueDate.getTime();
      
      if (taskTime > now) {
        setTimeout(() => {
          new Notification("Recordatorio de mantenimiento", {
            body: `¡Es hora de realizar ${task.title}!`,
            icon: "/logo.png"
          });
        }, Math.min(10000, taskTime - now)); // For demo purposes, notify in 10s max
      }
    } else {
      requestNotificationPermission();
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast({
          title: "Notificaciones activadas",
          description: "Recibirás recordatorios para tareas de mantenimiento",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron habilitar las notificaciones",
      });
    }
  };

  return (
    <Layout>
      <CalendarView onShowTaskDetails={handleShowTaskDetails} />
      
      {selectedTask && (
        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          task={selectedTask}
          onRequestNotification={handleRequestNotification}
        />
      )}
    </Layout>
  );
};

export default Maintenance;
