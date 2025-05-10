
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scan } from 'lucide-react';
import { BluetoothConnect } from './BluetoothConnect';
import { useToast } from '@/hooks/use-toast';

interface ScanResult {
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export const OBDScanner = () => {
  const [connection, setConnection] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const { toast } = useToast();

  const handleConnected = (deviceConnection: any) => {
    setConnection(deviceConnection);
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

  return (
    <div className="space-y-6">
      <BluetoothConnect onConnected={handleConnected} />
      
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
                  Haz clic en "Iniciar diagnóstico" para buscar códigos de error en el vehículo.
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
            onClick={handleScan} 
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
                Iniciar diagnóstico
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
