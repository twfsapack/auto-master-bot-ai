
import React, { useState, useEffect } from 'react';
import Layout from '@/components/common/Layout';
import { FileUpload, UploadedFile, getFilesFromStorage } from '@/components/common/FileUpload';
import { FilesList } from '@/components/common/FilesList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen, FileText, Wrench, Database, Settings } from 'lucide-react';

const Files = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = () => {
    const storedFiles = getFilesFromStorage();
    setFiles(storedFiles);
  };

  const handleFileUploaded = () => {
    loadFiles();
  };

  const categories = [
    { id: 'all', name: 'Todos los archivos', icon: FolderOpen },
    { id: 'maintenance', name: 'Mantenimiento', icon: Wrench },
    { id: 'diagnostics', name: 'Diagnósticos', icon: FileText },
    { id: 'database', name: 'Base de datos', icon: Database },
    { id: 'general', name: 'General', icon: Settings },
  ];

  const getFilesByCategory = (category: string) => {
    if (category === 'all') return files;
    return files.filter(file => file.category === category);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Gestión de Archivos</h2>
          <p className="text-muted-foreground">
            Sube y gestiona tus documentos PDF relacionados con el vehículo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Subir Archivo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general" className="space-y-4">
                    <FileUpload 
                      onFileUploaded={handleFileUploaded}
                      category="general"
                    />
                  </TabsContent>
                  
                  <TabsContent value="maintenance" className="space-y-4">
                    <FileUpload 
                      onFileUploaded={handleFileUploaded}
                      category="maintenance"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Files List Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const count = getFilesByCategory(category.id).length;
                  return (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Icon className="h-3 w-3" />
                      <span className="hidden sm:inline">{category.name}</span>
                      {count > 0 && (
                        <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full px-1">
                          {count}
                        </span>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <FilesList
                    files={getFilesByCategory(category.id)}
                    onFileDeleted={loadFiles}
                    category={category.id === 'all' ? undefined : category.id}
                    title={category.name}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Files;
