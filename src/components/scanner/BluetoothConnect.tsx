
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BluetoothSearching, BluetoothConnected, Bluetooth, BluetoothOff } from 'lucide-react';
import { useBluetooth } from '@/hooks/use-bluetooth';

// Define the structure of the object returned by a successful connection
export interface OBDConnection {
  deviceId: string;
  deviceName: string;
  sendCommand: (command: string) => Promise<string>;
  getSensorData: (sensorId: string) => Promise<number | string>; // Assuming string or number based on common sensor data
  disconnect: () => void;
}

interface BluetoothConnectProps {
  onConnected?: (deviceInfo: OBDConnection) => void; // Use the specific type here
  onDisconnected?: () => void;
}

export const BluetoothConnect: React.FC<BluetoothConnectProps> = ({ onConnected, onDisconnected }) => {
  const {
    isSupported,
    isConnecting,
    isConnected,
    selectedDevice,
    error,
    scanForDevices,
    disconnectDevice
  } = useBluetooth();

  const handleConnectClick = async () => {
    const connection = await scanForDevices();
    if (connection && onConnected) {
      onConnected(connection);
    }
  };

  const handleDisconnect = () => {
    disconnectDevice();
    if (onDisconnected) {
      onDisconnected();
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isConnected ? (
            <BluetoothConnected className="h-5 w-5 text-green-500" />
          ) : isConnecting ? (
            <BluetoothSearching className="h-5 w-5 text-blue-500 animate-pulse" />
          ) : isSupported ? (
            <Bluetooth className="h-5 w-5" />
          ) : (
            <BluetoothOff className="h-5 w-5 text-red-500" />
          )}
          Conexión OBD-II Bluetooth
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isSupported ? (
          <Alert variant="destructive">
            <AlertTitle>Bluetooth no compatible</AlertTitle>
            <AlertDescription>
              Tu dispositivo o navegador no soporta la API Web Bluetooth. Por favor, utiliza Chrome o Edge en un dispositivo compatible.
            </AlertDescription>
          </Alert>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : isConnected && selectedDevice ? (
          <div className="space-y-2 text-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-md">
              <p className="text-green-700 dark:text-green-300 font-medium">Conectado a:</p>
              <p className="text-lg font-bold">{selectedDevice.name}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Conectado y listo para realizar diagnóstico.
            </p>
          </div>
        ) : (
          <div className="space-y-2 text-center">
            <p className="text-sm">
              Conecta un adaptador OBD-II Bluetooth a tu vehículo y haz clic en el botón para buscar dispositivos.
            </p>
            <p className="text-xs text-muted-foreground">
              Asegúrate de que el adaptador esté encendido y dentro del alcance.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {isConnected ? (
          <Button 
            variant="outline" 
            onClick={handleDisconnect}
            className="w-full"
          >
            <BluetoothOff className="h-4 w-4 mr-2" />
            Desconectar
          </Button>
        ) : (
          <Button 
            onClick={handleConnectClick} 
            disabled={!isSupported || isConnecting}
            className="w-full"
          >
            {isConnecting ? (
              <>
                <BluetoothSearching className="h-4 w-4 mr-2 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <BluetoothSearching className="h-4 w-4 mr-2" />
                Buscar dispositivos
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
