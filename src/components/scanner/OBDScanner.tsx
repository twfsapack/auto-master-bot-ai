import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scan, Activity, ChartLine } from 'lucide-react';
import { BluetoothConnect } from './BluetoothConnect';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SensorAnalysis } from './SensorAnalysis';

interface ScanResult {
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export const OBDScanner = () => {
  const [connection, setConnection] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('diagnostics');
  const [showSensorAnalysis, setShowSensorAnalysis] = useState(false);
  const { toast } = useToast();

  const handleConnected = (deviceConnection: any) => {
    setConnection(deviceConnection);
    // Show options dialog when successfully connected
    setShowOptions(true);
  };

  const handleDisconnected = () => {
    setConnection(null);
    setShowOptions(false);
    setResults([]);
    setShowSensorAnalysis(false);
  };

  const handleScan = async () => {
    if (!connection) return;

    setIsScanning(true);
    setResults([]);

    try {
      // Simulamos un escaneo OBD-II
      toast({
        title: "Escaneando vehículo",
        description: "Por favor, espere mientras se realiza el diagnóstico...",
      });

      // Simulamos una espera para el escaneo
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulamos resultados de escaneo
      const mockResults: ScanResult[] = [
        {
          code: "P0171",
          description: "Sistema demasiado pobre (Banco 1)",
          severity: "medium"
        },
        {
          code: "P0300",
          description: "Detectado fallo aleatorio/múltiple en la ignición",
          severity: "high"
        },
        {
          code: "P0420",
          description: "Eficiencia del catalizador por debajo del umbral (Banco 1)",
          severity: "low"
        }
      ];

      setResults(mockResults);
      
      toast({
        title: "Escaneo completado",
        description: `Se encontraron ${mockResults.length} códigos de diagnóstico.`,
      });
    } catch (error) {
      console.error("Error durante el escaneo:", error);
      
      toast({
        variant: "destructive",
        title: "Error de escaneo",
        description: "No se pudo completar el escaneo. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'Baja';
      case 'medium':
        return 'Media';
      case 'high':
        return 'Alta';
      default:
        return 'Desconocida';
    }
  };

  // Si estamos mostrando el análisis de sensores, renderizamos ese componente
  if (showSensorAnalysis && connection) {
    return (
      <SensorAnalysis 
        connection={connection}
        onBack={() => setShowSensorAnalysis(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <BluetoothConnect 
        onConnected={handleConnected} 
        onDisconnected={handleDisconnected}
      />
      
      {/* Options Dialog after successful connection */}
      <Dialog open={showOptions && !!connection} onOpenChange={(open) => setShowOptions(open)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Opciones de diagnóstico OBD-II</DialogTitle>
            <DialogDescription>
              Seleccione el tipo de diagnóstico que desea realizar.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="diagnostics" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Diagnóstico del vehículo
              </TabsTrigger>
              <TabsTrigger value="sensors" className="flex items-center gap-2">
                <ChartLine className="h-4 w-4" />
                Análisis por Sensores
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="diagnostics" className="space-y-4 mt-4">
              <p className="text-sm">
                Realizar un diagnóstico completo del vehículo para detectar posibles fallos.
              </p>
              <Button 
                onClick={() => {
                  setShowOptions(false);
                  handleScan();
                }} 
                className="w-full"
              >
                Iniciar diagnóstico completo
              </Button>
            </TabsContent>
            
            <TabsContent value="sensors" className="space-y-4 mt-4">
              <p className="text-sm">
                Analizar los valores en tiempo real de los sensores del vehículo.
              </p>
              <Button 
                onClick={() => {
                  setShowOptions(false);
                  setShowSensorAnalysis(true);
                  toast({
                    title: "Análisis de sensores",
                    description: "Iniciando monitoreo de sensores en tiempo real...",
                  });
                }}
                className="w-full"
              >
                Iniciar análisis de sensores
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Diagnóstico OBD-II
          </CardTitle>
        </CardHeader>
        <CardContent>
          {connection ? (
            <div className="space-y-4">
              {results.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm font-medium">Códigos de diagnóstico:</p>
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <div key={index} className="border rounded-md p-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="font-bold">{result.code}</p>
                          <Badge className={getSeverityColor(result.severity)}>
                            Severidad: {getSeverityText(result.severity)}
                          </Badge>
                        </div>
                        <p className="text-sm">{result.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  Haz clic en "Iniciar diagnóstico" o selecciona una opción para analizar el vehículo.
                </p>
              )}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Conecta un dispositivo OBD-II para iniciar el diagnóstico.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={() => setShowOptions(true)} 
            disabled={!connection || isScanning}
            className="w-full"
          >
            {isScanning ? (
              <>
                <Scan className="h-4 w-4 mr-2 animate-spin" />
                Escaneando...
              </>
            ) : (
              <>
                <Scan className="h-4 w-4 mr-2" />
                Opciones de diagnóstico
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
