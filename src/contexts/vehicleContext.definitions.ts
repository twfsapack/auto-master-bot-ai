import { createContext, useContext } from 'react';

/**
 * Represents a user's vehicle.
 */
export type Vehicle = {
  /** Unique identifier for the vehicle. */
  id: string;
  /** Make of the vehicle (e.g., Toyota). */
  make: string;
  /** Model of the vehicle (e.g., Camry). */
  model: string;
  /** Manufacturing year of the vehicle. */
  year: number;
  /** Vehicle Identification Number (optional). */
  vin?: string;
  /** Current mileage of the vehicle (optional). */
  mileage?: number;
  /** Date of the last service (optional, stored as string or Date). */
  lastService?: string;
  /** URL or path to an image of the vehicle (optional). */
  image?: string;
};

/**
 * Defines the shape of the vehicle context.
 * Manages a list of vehicles, the currently selected vehicle, loading state,
 * and functions to manage vehicles.
 */
export type VehicleContextType = {
  /** Array of vehicles managed by the user. */
  vehicles: Vehicle[];
  /** The currently selected vehicle, or null if none is selected. */
  selectedVehicle: Vehicle | null;
  /** True if vehicle data is currently being loaded or modified. */
  isLoading: boolean;
  /**
   * Adds a new vehicle to the user's list.
   * @param vehicle - The vehicle data, excluding the 'id' which will be generated.
   */
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  /**
   * Updates an existing vehicle.
   * @param id - The ID of the vehicle to update.
   * @param updates - An object containing the properties to update.
   */
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  /**
   * Deletes a vehicle from the user's list.
   * @param id - The ID of the vehicle to delete.
   */
  deleteVehicle: (id: string) => void;
  /**
   * Sets a vehicle as the currently selected one.
   * @param id - The ID of the vehicle to select.
   */
  selectVehicle: (id: string) => void;
};

/**
 * Context for managing vehicle data.
 * Provides vehicle list, selected vehicle, loading state, and CRUD-like operations for vehicles.
 * @type {React.Context<VehicleContextType | undefined>}
 */
export const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

/**
 * Hook to access the vehicle context.
 * Must be used within a {@link VehicleProvider}.
 * @returns {VehicleContextType} The vehicle context value.
 * @throws {Error} If used outside of a VehicleProvider.
 */
export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};
