
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Calendar, Wrench, AlertTriangle } from 'lucide-react';
import { useVehicle } from '@/contexts/VehicleContext';
import { useNavigate } from 'react-router-dom';

export const VehicleCard = () => {
  const { selectedVehicle } = useVehicle();
  const navigate = useNavigate();

  if (!selectedVehicle) {
    return (
      <Card className="glass-card animate-fade-in">
        <CardHeader>
          <CardTitle className="text-logo-primary">No Vehicle Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-logo-secondary">You haven't added any vehicles yet. Add your first vehicle to get started.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate('/vehicle')} className="w-full bg-logo-secondary hover:bg-logo-accent">
            Add Vehicle
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center animate-fade-in">
          <CardTitle className="flex items-center gap-2 text-logo-primary">
            <Car className="h-5 w-5 text-logo-accent" />
            Current Vehicle
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 animate-fade-in">
          <div className="text-2xl font-bold text-logo-primary">
            {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
          </div>
          
          {selectedVehicle.vin && (
            <div className="text-sm text-logo-secondary">
              <span className="font-semibold">VIN:</span> {selectedVehicle.vin}
            </div>
          )}
          
          {selectedVehicle.mileage && (
            <div className="text-sm text-logo-secondary">
              <span className="font-semibold">Mileage:</span> {selectedVehicle.mileage.toLocaleString()} miles
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-accent/20 hover:bg-logo-secondary/10 hover:border-logo-accent"
              onClick={() => navigate('/maintenance')}
            >
              <Calendar className="h-5 w-5 mb-1 text-logo-accent" />
              <span className="text-xs text-logo-primary">Maintenance</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-accent/20 hover:bg-logo-secondary/10 hover:border-logo-accent"
              onClick={() => navigate('/chat')}
            >
              <AlertTriangle className="h-5 w-5 mb-1 text-logo-accent" />
              <span className="text-xs text-logo-primary">Diagnose</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 transition-all duration-300 transform hover:scale-105 animate-fade-in border-logo-accent/20 hover:bg-logo-secondary/10 hover:border-logo-accent"
              onClick={() => navigate('/database')}
            >
              <Wrench className="h-5 w-5 mb-1 text-logo-accent" />
              <span className="text-xs text-logo-primary">Repairs</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
