
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
      <Card className="glass-card animate-fade-in-up border-white/10">
        <CardHeader>
          <CardTitle className="text-white">No Vehicle Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">You haven't added any vehicles yet. Add your first vehicle to get started.</p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => navigate('/vehicle')} 
            className="w-full futuristic-btn text-white"
          >
            Add Vehicle
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="glass-card animate-fade-in-up border-white/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center animate-fade-in-up">
          <CardTitle className="flex items-center gap-2 text-white">
            <Car className="h-5 w-5 text-purple-400" />
            Current Vehicle
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 animate-fade-in-up">
          <div className="text-2xl font-bold text-white animate-glow-pulse">
            {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
          </div>
          
          {selectedVehicle.vin && (
            <div className="text-sm text-white/70">
              <span className="font-semibold text-purple-300">VIN:</span> {selectedVehicle.vin}
            </div>
          )}
          
          {selectedVehicle.mileage && (
            <div className="text-sm text-white/70">
              <span className="font-semibold text-purple-300">Mileage:</span> {selectedVehicle.mileage.toLocaleString()} miles
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 glass-card border-white/20 hover:border-purple-400/50 text-white hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
              onClick={() => navigate('/maintenance')}
              style={{animationDelay: '0.1s'}}
            >
              <Calendar className="h-5 w-5 mb-1 text-purple-400" />
              <span className="text-xs">Maintenance</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 glass-card border-white/20 hover:border-purple-400/50 text-white hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
              onClick={() => navigate('/chat')}
              style={{animationDelay: '0.2s'}}
            >
              <AlertTriangle className="h-5 w-5 mb-1 text-purple-400" />
              <span className="text-xs">Diagnose</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 glass-card border-white/20 hover:border-purple-400/50 text-white hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
              onClick={() => navigate('/database')}
              style={{animationDelay: '0.3s'}}
            >
              <Wrench className="h-5 w-5 mb-1 text-purple-400" />
              <span className="text-xs">Repairs</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
