
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { File, Eye, Download, Trash2, Calendar } from 'lucide-react';
import { UploadedFile, deleteFileFromStorage, downloadFile } from './FileUpload';
import { useToast } from '@/hooks/use-toast';

interface FilesListProps {
  files: UploadedFile[];
  onFileDeleted?: () => void;
  category?: string;
  title?: string;
}

export const FilesList: React.FC<FilesListProps> = ({ 
  files, 
  onFileDeleted,
  category,
  title = "Archivos subidos"
}) => {
  const { toast } = useToast();

  const filteredFiles = category 
    ? files.filter(file => file.category === category)
    : files;

  const handleDelete = (fileId: string, fileName: string) => {
    deleteFileFromStorage(fileId);
    toast({
      title: "Archivo eliminado",
      description: `${fileName} ha sido eliminado`,
    });
    onFileDeleted?.();
  };

  const handleDownload = (file: UploadedFile) => {
    downloadFile(file);
    toast({
      title: "Descarga iniciada",
      description: `Descargando ${file.name}`,
    });
  };

  const handleView = (file: UploadedFile) => {
    window.open(file.data, '_blank');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (filteredFiles.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No hay archivos subidos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <File className="h-5 w-5" />
          {title} ({filteredFiles.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {filteredFiles.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <File className="h-8 w-8 text-red-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{formatFileSize(file.size)}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(file.uploadDate)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleView(file)}
                className="h-8 w-8 p-0"
                title="Ver archivo"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(file)}
                className="h-8 w-8 p-0"
                title="Descargar archivo"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(file.id, file.name)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                title="Eliminar archivo"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
