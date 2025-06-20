import { CalendarView } from '@/components/maintenance/CalendarView';
import Layout from '@/components/common/Layout';
import { useState, useEffect } from 'react';
import { TaskDetailsModal } from '@/components/maintenance/TaskDetailsModal';
import { useToast } from '@/hooks/use-toast';
import { FileUpload, UploadedFile, getFilesFromStorage } from '@/components/common/FileUpload';
import { FilesList } from '@/components/common/FilesList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Clave para almacenar las tareas en localStorage
const MAINTENANCE_TASKS_KEY = 'maintenance_tasks';

const Maintenance = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = () => {
    const storedFiles = getFilesFromStorage();
    const maintenanceFiles = storedFiles.filter(file => file.category === 'maintenance');
    setFiles(maintenanceFiles);
  };

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
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron habilitar las notificaciones",
      });
    }
  };

  const handleFileUploaded = () => {
    loadFiles();
    toast({
      title: "Archivo de mantenimiento subido",
      description: "El documento ha sido guardado en la sección de mantenimiento",
    });
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6 pb-4 sm:pb-6">
        {/* Header mejorado para móvil */}
        <div className="px-2 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Mantenimiento</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Gestiona tu calendario de mantenimiento y documentos relacionados
          </p>
        </div>

        <div className="px-1 sm:px-0">
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 ${isMobile ? 'mx-2' : ''}`}>
              <TabsTrigger value="calendar" className="flex items-center gap-2 text-xs sm:text-sm">
                <Calendar className="h-4 w-4" />
                <span className={isMobile ? 'hidden xs:inline' : ''}>Calendario</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2 text-xs sm:text-sm">
                <FileText className="h-4 w-4" />
                <span className={isMobile ? 'hidden xs:inline' : ''}>Documentos</span>
                <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded-full text-xs">
                  {files.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4 mt-4 sm:mt-6">
              <CalendarView onShowTaskDetails={handleShowTaskDetails} />
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 mt-4 sm:mt-6">
              <div className={`grid gap-4 sm:gap-6 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-3'}`}>
                <div className={isMobile ? '' : 'lg:col-span-1'}>
                  <Card className={`glass-card ${isMobile ? 'mx-2' : ''}`}>
                    <CardHeader className="pb-3 sm:pb-6">
                      <CardTitle className="text-lg sm:text-xl">Subir Documento</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <FileUpload 
                        onFileUploaded={handleFileUploaded}
                        category="maintenance"
                      />
                      <div className="mt-4 text-xs text-muted-foreground">
                        <p className="font-medium mb-2">Documentos útiles:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Manuales de servicio</li>
                          <li>• Facturas de reparaciones</li>
                          <li>• Garantías de repuestos</li>
                          <li>• Reportes de inspección</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className={isMobile ? '' : 'lg:col-span-2'}>
                  <div className={isMobile ? 'mx-2' : ''}>
                    <FilesList
                      files={files}
                      onFileDeleted={loadFiles}
                      category="maintenance"
                      title="Documentos de Mantenimiento"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
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
