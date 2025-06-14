
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, File, X, Eye, Download, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileUploaded?: (file: UploadedFile) => void;
  accept?: string;
  maxSizeMB?: number;
  category?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  data: string; // base64 data
  uploadDate: Date;
  category?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUploaded,
  accept = ".pdf",
  maxSizeMB = 10,
  category = "general"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.includes('pdf')) {
      toast({
        variant: "destructive",
        title: "Tipo de archivo no válido",
        description: "Solo se permiten archivos PDF",
      });
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast({
        variant: "destructive",
        title: "Archivo muy grande",
        description: `El archivo no puede ser mayor a ${maxSizeMB}MB`,
      });
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64
      const base64Data = await convertFileToBase64(file);
      
      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        data: base64Data,
        uploadDate: new Date(),
        category
      };

      // Save to localStorage
      saveFileToStorage(uploadedFile);

      toast({
        title: "Archivo subido exitosamente",
        description: `${file.name} ha sido guardado`,
      });

      onFileUploaded?.(uploadedFile);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al subir archivo",
        description: "Ocurrió un error al procesar el archivo",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const saveFileToStorage = (file: UploadedFile) => {
    const existingFiles = getFilesFromStorage();
    const updatedFiles = [...existingFiles, file];
    localStorage.setItem('uploaded_files', JSON.stringify(updatedFiles));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={`border-2 border-dashed transition-colors ${
      isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
    }`}>
      <CardContent 
        className="p-6 text-center cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <Upload className={`h-12 w-12 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isUploading ? 'Subiendo archivo...' : 'Arrastra tu archivo PDF aquí'}
              </p>
              <p className="text-xs text-muted-foreground">
                o haz clic para seleccionar (máximo {maxSizeMB}MB)
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            disabled={isUploading}
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick();
            }}
          >
            {isUploading ? 'Subiendo...' : 'Seleccionar archivo'}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};

// Utility functions for localStorage management
export const getFilesFromStorage = (): UploadedFile[] => {
  try {
    const files = localStorage.getItem('uploaded_files');
    return files ? JSON.parse(files) : [];
  } catch {
    return [];
  }
};

export const deleteFileFromStorage = (fileId: string) => {
  const files = getFilesFromStorage();
  const updatedFiles = files.filter(file => file.id !== fileId);
  localStorage.setItem('uploaded_files', JSON.stringify(updatedFiles));
};

export const downloadFile = (file: UploadedFile) => {
  const link = document.createElement('a');
  link.href = file.data;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
