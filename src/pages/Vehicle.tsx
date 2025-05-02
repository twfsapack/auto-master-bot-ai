
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Plus, Trash, QrCode } from 'lucide-react';
import { useVehicle } from '@/contexts/VehicleContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface LocationState {
  scannedVin?: string;
  forNewVehicle?: boolean;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const carMakes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai', 
  'Kia', 'Mazda', 'Subaru', 'Lexus', 'Acura'
];

const Vehicle = () => {
  const { vehicles, selectedVehicle, addVehicle, updateVehicle, deleteVehicle, selectVehicle } = useVehicle();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [isAdding, setIsAdding] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: currentYear,
    vin: '',
    mileage: undefined as number | undefined,
  });

  // Handle receiving scanned VIN from scanner page
  useEffect(() => {
    if (state?.scannedVin) {
      if (state.forNewVehicle) {
        setNewVehicle(prev => ({ ...prev, vin: state.scannedVin || '' }));
        setIsAdding(true);
      }
      
      // Clear location state to avoid re-applying the VIN on refresh
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  const handleAddVehicle = () => {
    if (!user?.isPremium && vehicles.length >= 1) {
      toast({
        variant: "destructive",
        title: "Free account limit reached",
        description: "Upgrade to premium to add more vehicles.",
      });
      navigate('/settings');
      return;
    }
    
    if (!newVehicle.make || !newVehicle.model || !newVehicle.year) {
      toast({
        variant: "destructive",
        title: "Required fields missing",
        description: "Make, model and year are required.",
      });
      return;
    }
    
    addVehicle(newVehicle);
    setNewVehicle({
      make: '',
      model: '',
      year: currentYear,
      vin: '',
      mileage: undefined,
    });
    setIsAdding(false);
  };

  const handleUpdateVehicle = (id: string, field: string, value: string | number) => {
    updateVehicle(id, { [field]: value });
  };

  const handleScanVin = (isNewVehicle: boolean, vehicleId?: string) => {
    if (isNewVehicle) {
      navigate('/scanner', { state: { returnTo: '/vehicle', field: 'newVehicleVin' } });
    } else if (vehicleId) {
      navigate('/scanner', { state: { returnTo: '/vehicle', field: 'existingVehicleVin', vehicleId } });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Vehicles</h1>
          <Button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1"
          >
            {isAdding ? 'Cancel' : (
              <>
                <Plus className="h-4 w-4" />
                Add Vehicle
              </>
            )}
          </Button>
        </div>
        
        {/* Add Vehicle Form */}
        {isAdding && (
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
                      onClick={() => handleScanVin(true)}
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
                
                <Button onClick={handleAddVehicle} className="mt-2">
                  Add Vehicle
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Vehicle List */}
        {vehicles.length > 0 ? (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <Card 
                key={vehicle.id} 
                className={`glass-card animate-fade-in ${selectedVehicle?.id === vehicle.id ? 'border-2 border-primary' : ''}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </span>
                    {selectedVehicle?.id === vehicle.id && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        Current
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
                          onChange={(e) => handleUpdateVehicle(vehicle.id, 'vin', e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleScanVin(false, vehicle.id)}
                          title="Scan VIN"
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`mileage-${vehicle.id}`}>Current Mileage</Label>
                      <Input
                        id={`mileage-${vehicle.id}`}
                        type="number"
                        value={vehicle.mileage || ''}
                        onChange={(e) => handleUpdateVehicle(vehicle.id, 'mileage', e.target.value ? parseInt(e.target.value) : 0)}
                      />
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      {selectedVehicle?.id !== vehicle.id ? (
                        <Button onClick={() => selectVehicle(vehicle.id)}>
                          Select Vehicle
                        </Button>
                      ) : (
                        <Button variant="outline" disabled>
                          Current Vehicle
                        </Button>
                      )}
                      
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => deleteVehicle(vehicle.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass-card">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Car className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Vehicles Added</h3>
              <p className="text-muted-foreground text-center mb-4">
                Add your first vehicle to start using Auto Master Bot
              </p>
              <Button onClick={() => setIsAdding(true)}>Add Your First Vehicle</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Vehicle;
