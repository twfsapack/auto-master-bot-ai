
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

interface EmptyVehicleStateProps {
  onAddVehicle: () => void;
}

const EmptyVehicleState = ({ onAddVehicle }: EmptyVehicleStateProps) => {
  return (
    <Card className="glass-card">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Car className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No Vehicles Added</h3>
        <p className="text-muted-foreground text-center mb-4">
          Add your first vehicle to start using Auto Master Bot
        </p>
        <Button onClick={onAddVehicle}>Add Your First Vehicle</Button>
      </CardContent>
    </Card>
  );
};

export default EmptyVehicleState;
