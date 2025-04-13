
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useVehicle } from '@/contexts/VehicleContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Generate a range of years from current year to 20 years ago
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

// Mock car makes and models
const carMakes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai', 
  'Kia', 'Mazda', 'Subaru', 'Lexus', 'Acura'
];

export const VehicleForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(currentYear);
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState<number | undefined>();
  const { addVehicle } = useVehicle();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!make || !model || !year) {
      toast({
        variant: "destructive",
        title: "Required fields missing",
        description: "Make, model and year are required.",
      });
      return;
    }

    addVehicle({
      make,
      model,
      year,
      vin: vin || undefined,
      mileage: mileage || undefined,
    });

    navigate('/dashboard');
  };

  const handleSkip = () => {
    toast({
      title: "Skipped",
      description: "You can add a vehicle later in the settings.",
    });
    navigate('/dashboard');
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Vehicle Details</CardTitle>
          <CardDescription className="text-center">
            Add your vehicle information to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="make">Make *</Label>
            <Select onValueChange={setMake} required>
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
          
          <div className="space-y-2">
            <Label htmlFor="model">Model *</Label>
            <Input
              id="model"
              placeholder="e.g. Corolla, Civic, F-150"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year">Year *</Label>
            <Select onValueChange={(value) => setYear(parseInt(value))} defaultValue={currentYear.toString()} required>
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
          
          <div className="space-y-2">
            <Label htmlFor="vin">VIN (Optional)</Label>
            <Input
              id="vin"
              placeholder="Vehicle Identification Number"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mileage">Current Mileage (Optional)</Label>
            <Input
              id="mileage"
              type="number"
              placeholder="e.g. 45000"
              value={mileage || ''}
              onChange={(e) => setMileage(e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleSkip}>
            Skip
          </Button>
          <Button type="submit">
            Add Vehicle
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
