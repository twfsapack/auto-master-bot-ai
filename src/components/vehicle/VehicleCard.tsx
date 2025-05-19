
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, ScanBarcode, Trash } from 'lucide-react';
import { Vehicle } from '@/contexts/VehicleContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (id: string, field: string, value: string | number) => void;
  onDelete: (id: string) => void;
  onScanVin: (isNewVehicle: boolean, vehicleId?: string) => void;
}

const VehicleCard = ({
  vehicle,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onScanVin
}: VehicleCardProps) => {
  return (
    <Card className={`glass-card animate-fade-in ${isSelected ? 'border-2 border-primary' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            {vehicle.year} {vehicle.make} {vehicle.model}
          </span>
          {isSelected && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
              Actual
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor={`vin-${vehicle.id}`}>VIN</Label>
            <div className="flex gap-2">
              <Input
                id={`vin-${vehicle.id}`}
                value={vehicle.vin || ''}
                onChange={(e) => onUpdate(vehicle.id, 'vin', e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onScanVin(false, vehicle.id)}
                title="Escanear VIN"
              >
                <ScanBarcode className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor={`mileage-${vehicle.id}`}>Kilometraje Actual</Label>
            <Input
              id={`mileage-${vehicle.id}`}
              type="number"
              value={vehicle.mileage || ''}
              onChange={(e) => onUpdate(vehicle.id, 'mileage', e.target.value ? parseInt(e.target.value) : 0)}
            />
          </div>
          
          <div className="flex justify-between mt-4">
            {!isSelected ? (
              <Button onClick={onSelect}>
                Seleccionar Vehículo
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Vehículo Actual
              </Button>
            )}
            
            <Button 
              variant="destructive" 
              size="icon"
              onClick={() => onDelete(vehicle.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
