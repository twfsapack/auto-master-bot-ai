
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, QrCode } from 'lucide-react';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const carMakes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai', 
  'Kia', 'Mazda', 'Subaru', 'Lexus', 'Acura'
];

interface AddVehicleFormProps {
  onAddVehicle: (vehicle: {
    make: string;
    model: string;
    year: number;
    vin: string;
    mileage?: number;
  }) => void;
  initialVin?: string;
}

const AddVehicleForm = ({ onAddVehicle, initialVin = '' }: AddVehicleFormProps) => {
  const navigate = useNavigate();
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: currentYear,
    vin: initialVin,
    mileage: undefined as number | undefined,
  });

  const handleScanVin = () => {
    navigate('/scanner', { state: { returnTo: '/vehicle', field: 'newVehicleVin' } });
  };

  const handleSubmit = () => {
    if (!newVehicle.make || !newVehicle.model || !newVehicle.year) {
      return;
    }
    
    onAddVehicle(newVehicle);
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Add New Vehicle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="make">Make *</Label>
            <Select 
              onValueChange={(value) => setNewVehicle({ ...newVehicle, make: value })} 
              value={newVehicle.make}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                {carMakes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="model">Model *</Label>
            <Input
              id="model"
              placeholder="e.g. Corolla, Civic, F-150"
              value={newVehicle.model}
              onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="year">Year *</Label>
            <Select 
              onValueChange={(value) => setNewVehicle({ ...newVehicle, year: parseInt(value) })}
              value={newVehicle.year.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="vin">VIN (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="vin"
                placeholder="Vehicle Identification Number"
                value={newVehicle.vin}
                onChange={(e) => setNewVehicle({ ...newVehicle, vin: e.target.value })}
                className="flex-1"
              />
              <Button 
                type="button"
                variant="outline"
                size="icon"
                onClick={handleScanVin}
                title="Scan VIN"
              >
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="mileage">Current Mileage (Optional)</Label>
            <Input
              id="mileage"
              type="number"
              placeholder="e.g. 45000"
              value={newVehicle.mileage || ''}
              onChange={(e) => setNewVehicle({ ...newVehicle, mileage: e.target.value ? parseInt(e.target.value) : undefined })}
            />
          </div>
          
          <Button onClick={handleSubmit} className="mt-2">
            Add Vehicle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddVehicleForm;
