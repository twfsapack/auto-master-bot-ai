
import { Vehicle } from '@/contexts/VehicleContext';
import VehicleCard from './VehicleCard';
import EmptyVehicleState from './EmptyVehicleState';

interface VehicleListProps {
  vehicles: Vehicle[];
  selectedVehicleId: string | undefined;
  onSelectVehicle: (id: string) => void;
  onUpdateVehicle: (id: string, field: string, value: string | number) => void;
  onDeleteVehicle: (id: string) => void;
  onScanVin: (isNewVehicle: boolean, vehicleId?: string) => void;
  isPremium: boolean;
}

const VehicleList = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
  onScanVin
}: VehicleListProps) => {

  if (vehicles.length === 0) {
    return <EmptyVehicleState onAddVehicle={() => {}} />;
  }

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          isSelected={selectedVehicleId === vehicle.id}
          onSelect={() => onSelectVehicle(vehicle.id)}
          onUpdate={onUpdateVehicle}
          onDelete={onDeleteVehicle}
          onScanVin={onScanVin}
        />
      ))}
    </div>
  );
};

export default VehicleList;
