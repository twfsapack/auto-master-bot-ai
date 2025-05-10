
interface BluetoothDevice {
  id: string;
  name?: string;
  gatt?: {
    connect: () => Promise<any>;
  };
  addEventListener: (event: string, callback: Function) => void;
  removeEventListener: (event: string, callback: Function) => void;
}

interface BluetoothRemoteGATTServer {
  connect: () => Promise<BluetoothRemoteGATTServer>;
  disconnect: () => void;
  getPrimaryService: (service: string | number) => Promise<any>;
  device: BluetoothDevice;
}

interface BluetoothRequestDeviceOptions {
  filters?: Array<{
    services?: string[] | number[];
    name?: string;
    namePrefix?: string;
  }>;
  optionalServices?: string[] | number[];
  acceptAllDevices?: boolean;
}

interface Bluetooth {
  requestDevice: (options: BluetoothRequestDeviceOptions) => Promise<BluetoothDevice>;
  getAvailability: () => Promise<boolean>;
  addEventListener: (event: string, callback: Function) => void;
  removeEventListener: (event: string, callback: Function) => void;
}

// Extender la interfaz Navigator para incluir la propiedad bluetooth
interface Navigator {
  bluetooth: Bluetooth;
}
