
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  mileage?: number;
  lastService?: string;
};

type VehicleContextType = {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  isLoading: boolean;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  selectVehicle: (id: string) => void;
};

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};

export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Initialize vehicles
  useEffect(() => {
    if (user) {
      // Mock fetch vehicles from storage
      const storedVehicles = localStorage.getItem(`auto_master_vehicles_${user.id}`);
      if (storedVehicles) {
        const parsedVehicles = JSON.parse(storedVehicles);
        setVehicles(parsedVehicles);
        if (parsedVehicles.length > 0) {
          setSelectedVehicle(parsedVehicles[0]);
        }
      }
    }
    setIsLoading(false);
  }, [user]);

  // Save vehicles to storage whenever they change
  useEffect(() => {
    if (user && vehicles.length > 0) {
      localStorage.setItem(`auto_master_vehicles_${user.id}`, JSON.stringify(vehicles));
    }
  }, [vehicles, user]);

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    if (!user?.isPremium && vehicles.length >= 1) {
      toast({
        variant: "destructive",
        title: "Free account limit reached",
        description: "Upgrade to premium to add more vehicles.",
      });
      return;
    }

    const newVehicle = {
      ...vehicle,
      id: Date.now().toString(),
    };

    setVehicles((prev) => [...prev, newVehicle]);
    if (vehicles.length === 0) {
      setSelectedVehicle(newVehicle);
    }
    
    toast({
      title: "Vehicle added",
      description: `${vehicle.make} ${vehicle.model} has been added successfully.`,
    });
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, ...updates } : vehicle
      )
    );

    // If updating the selected vehicle, also update that
    if (selectedVehicle?.id === id) {
      setSelectedVehicle(prev => prev ? { ...prev, ...updates } : null);
    }

    toast({
      title: "Vehicle updated",
      description: "Vehicle information has been updated.",
    });
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
    
    // If deleting the selected vehicle, select another one if available
    if (selectedVehicle?.id === id) {
      setSelectedVehicle((prev) => {
        const remaining = vehicles.filter(v => v.id !== id);
        return remaining.length > 0 ? remaining[0] : null;
      });
    }

    toast({
      title: "Vehicle removed",
      description: "The vehicle has been removed from your account.",
    });
  };

  const selectVehicle = (id: string) => {
    const vehicle = vehicles.find(v => v.id === id);
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
  };

  const value = {
    vehicles,
    selectedVehicle,
    isLoading,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    selectVehicle
  };

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
};
