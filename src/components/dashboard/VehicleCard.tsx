
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Calendar, Tool, AlertTriangle } from 'lucide-react';
import { useVehicle } from '@/contexts/VehicleContext';
import { useNavigate } from 'react-router-dom';

export const VehicleCard = () => {
  const { selectedVehicle } = useVehicle();
  const navigate = useNavigate();

  if (!selectedVehicle) {
    return (
      <Card className="glass-card animate-fade-in">
        <CardHeader>
          <CardTitle>No Vehicle Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You haven't added any vehicles yet. Add your first vehicle to get started.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate('/vehicle')} className="w-full">
            Add Vehicle
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Current Vehicle
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-2xl font-bold">
            {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
          </div>
          
          {selectedVehicle.vin && (
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">VIN:</span> {selectedVehicle.vin}
            </div>
          )}
          
          {selectedVehicle.mileage && (
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">Mileage:</span> {selectedVehicle.mileage.toLocaleString()} miles
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20"
              onClick={() => navigate('/maintenance')}
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs">Maintenance</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20"
              onClick={() => navigate('/chat')}
            >
              <AlertTriangle className="h-5 w-5 mb-1" />
              <span className="text-xs">Diagnose</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20"
              onClick={() => navigate('/database')}
            >
              <Tool className="h-5 w-5 mb-1" />
              <span className="text-xs">Repairs</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
