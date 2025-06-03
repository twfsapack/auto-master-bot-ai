
// Represents the properties of a Bluetooth characteristic.
interface BluetoothCharacteristicProperties {
  broadcast: boolean;
  read: boolean;
  writeWithoutResponse: boolean;
  write: boolean;
  notify: boolean;
  indicate: boolean;
  authenticatedSignedWrites: boolean;
  reliableWrite: boolean;
  writableAuxiliaries: boolean;
}

// Represents a GATT Characteristic, which is a basic data element that provides further information about a peripheral’s service.
interface BluetoothRemoteGATTCharacteristic {
  uuid: string;
  value?: DataView;
  properties: BluetoothCharacteristicProperties;
  readValue: () => Promise<DataView>;
  writeValue: (value: BufferSource) => Promise<void>;
  startNotifications: () => Promise<BluetoothRemoteGATTCharacteristic>;
  stopNotifications: () => Promise<BluetoothRemoteGATTCharacteristic>;
  addEventListener: (type: string, listener: (this: this, ev: Event) => void) => void;
  removeEventListener: (type: string, listener: (this: this, ev: Event) => void) => void;
  // Consider adding getDescriptor(s) methods if needed
}

// Represents a GATT Service provided by a remote Bluetooth device.
interface BluetoothRemoteGATTService {
  uuid: string;
  device: BluetoothDevice; // Reference to the device the service belongs to.
  isPrimary: boolean;
  getCharacteristic: (characteristic: string | number) => Promise<BluetoothRemoteGATTCharacteristic>;
  getCharacteristics: (characteristic?: string | number) => Promise<BluetoothRemoteGATTCharacteristic[]>;
  // Consider adding getIncludedService(s) methods if needed
}

// Represents a GATT server on a remote Bluetooth device.
interface BluetoothRemoteGATTServer {
  device: BluetoothDevice; // A reference to the BluetoothDevice object.
  connect: () => Promise<BluetoothRemoteGATTServer>;
  disconnect: () => void;
  getPrimaryService: (service: string | number) => Promise<BluetoothRemoteGATTService>; // Changed any to BluetoothRemoteGATTService
  getPrimaryServices?: (service?: string | number) => Promise<BluetoothRemoteGATTService[]>; // Optional method
}

// Represents a Bluetooth device.
interface BluetoothDevice {
  id: string;
  name?: string; // The human-readable name of the device.
  gatt?: BluetoothRemoteGATTServer; // The GATT server of the device. Changed type of connect
  addEventListener: (type: string, listener: (this: this, ev: Event) => void) => void;
  removeEventListener: (type: string, listener: (this: this, ev: Event) => void) => void;
  // watchingAdvertisements?: boolean; // Example of another property
  // watchAdvertisements: () => Promise<void>; // Example of another method
  // unwatchAdvertisements: () => void;
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
  addEventListener: (type: string, listener: (this: this, ev: Event) => void) => void;
  removeEventListener: (type: string, listener: (this: this, ev: Event) => void) => void;
}

// Extender la interfaz Navigator para incluir la propiedad bluetooth
interface Navigator {
  bluetooth: Bluetooth;
}
