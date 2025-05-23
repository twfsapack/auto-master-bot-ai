
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface BluetoothDevice {
  id: string;
  name: string;
}

export const useBluetooth = () => {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<BluetoothDevice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Comprobar si el navegador soporta Web Bluetooth API
  useEffect(() => {
    const supported = typeof navigator !== 'undefined' && 'bluetooth' in navigator;
    setIsSupported(supported);
    
    if (!supported) {
      setError('Tu navegador no soporta Bluetooth. Por favor, utiliza Chrome o Edge actualizado.');
    }
  }, []);

  // Función para buscar dispositivos Bluetooth
  const scanForDevices = useCallback(async () => {
    if (!isSupported) {
      toast({
        variant: "destructive",
        title: "Error de Bluetooth",
        description: "Tu dispositivo no soporta Bluetooth.",
      });
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      
      // Solicitar dispositivos Bluetooth con el servicio OBD-II
      const device = await navigator.bluetooth.requestDevice({
        // Filtros comunes para dispositivos OBD2
        filters: [
          { services: ['0000fff0-0000-1000-8000-00805f9b34fb'] }, // Servicio común OBD2
          { namePrefix: 'OBD' },
          { namePrefix: 'ELM' },
          { namePrefix: 'OBDII' }
        ],
        // Si no encontramos con los filtros, permitir que el usuario seleccione manualmente
        optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']
      });

      const newDevice = {
        id: device.id,
        name: device.name || 'Dispositivo OBD-II'
      };

      setDevices(prev => [...prev.filter(d => d.id !== newDevice.id), newDevice]);
      setSelectedDevice(newDevice);
      
      toast({
        title: "Dispositivo encontrado",
        description: `Se ha encontrado: ${newDevice.name}`,
      });
      
      // Intentar conectar al dispositivo
      return await connectToDevice(newDevice);
    } catch (error: any) {
      console.error('Error al buscar dispositivos Bluetooth:', error);
      setError(error.message || 'Error al buscar dispositivos Bluetooth');
      
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudo conectar al dispositivo Bluetooth. Por favor, inténtalo de nuevo.",
      });
      
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, [isSupported, toast]);

  // Función para conectar con un dispositivo seleccionado
  const connectToDevice = useCallback(async (device: BluetoothDevice) => {
    if (!isSupported) {
      return null;
    }

    try {
      setIsConnecting(true);
      setError(null);
      
      // Simular la conexión (en una implementación real conectaríamos al GATT server)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsConnected(true);
      setSelectedDevice(device);
      
      toast({
        title: "Conexión exitosa",
        description: `Conectado a ${device.name}`,
      });
      
      // Simulación de una API para comunicarse con el dispositivo OBD
      return {
        deviceId: device.id,
        deviceName: device.name,
        // Función para enviar comandos al dispositivo
        sendCommand: async (command: string) => {
          console.log(`Enviando comando: ${command}`);
          // Simulación de respuesta
          return `Respuesta para ${command}`;
        },
        // Funciones específicas para sensores (simuladas)
        getSensorData: async (sensorId: string) => {
          console.log(`Solicitando datos del sensor: ${sensorId}`);
          // Simular valores aleatorios según el tipo de sensor
          switch (sensorId) {
            case 'rpm':
              return Math.floor(Math.random() * 3000) + 800;
            case 'speed':
              return Math.floor(Math.random() * 100);
            case 'temp':
              return Math.floor(Math.random() * 40) + 70;
            default:
              return Math.random() * 100;
          }
        },
        // Función para desconectar el dispositivo
        disconnect: () => {
          setIsConnected(false);
          setSelectedDevice(null);
          toast({
            title: "Dispositivo desconectado",
            description: "Se ha desconectado del dispositivo OBD-II"
          });
        }
      };
    } catch (error: any) {
      console.error('Error al conectar con el dispositivo:', error);
      setError(error.message || 'Error al conectar con el dispositivo');
      setIsConnected(false);
      
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudo conectar al dispositivo Bluetooth.",
      });
      
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, [isSupported, toast]);

  // Función para desconectar el dispositivo
  const disconnectDevice = useCallback(() => {
    if (selectedDevice) {
      setIsConnected(false);
      setSelectedDevice(null);
      
      toast({
        title: "Dispositivo desconectado",
        description: "Se ha desconectado del dispositivo OBD-II"
      });
    }
  }, [selectedDevice, toast]);

  return {
    isSupported,
    isConnecting,
    isConnected,
    devices,
    selectedDevice,
    error,
    scanForDevices,
    connectToDevice,
    disconnectDevice
  };
};
