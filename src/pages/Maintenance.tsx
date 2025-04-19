
import { CalendarView } from '@/components/maintenance/CalendarView';
import Layout from '@/components/common/Layout';
import { useState } from 'react';
import { TaskDetailsModal } from '@/components/maintenance/TaskDetailsModal';

const Maintenance = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleShowTaskDetails = (task: any) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  return (
    <Layout>
      <CalendarView onShowTaskDetails={handleShowTaskDetails} />
      
      {selectedTask && (
        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          task={selectedTask}
        />
      )}
    </Layout>
  );
};

export default Maintenance;
