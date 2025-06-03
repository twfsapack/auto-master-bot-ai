import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';
import { VehicleContext, type Vehicle } from './vehicleContext.definitions';

// Vehicle type, VehicleContextType, VehicleContext, and useVehicle moved to .definitions.ts

/**
 * Provides vehicle data management state and functions to its children components.
 * It handles loading vehicles from localStorage, adding, updating, deleting, and selecting vehicles.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The VehicleProvider component.
 */
export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
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
    
    if (selectedVehicle?.id === id) {
      setSelectedVehicle(() => {
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
