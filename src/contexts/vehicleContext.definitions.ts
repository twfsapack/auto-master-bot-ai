import { createContext, useContext } from 'react';

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  mileage?: number;
  lastService?: string;
  image?: string;
};

export type VehicleContextType = {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  isLoading: boolean;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  selectVehicle: (id: string) => void;
};

export const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};
