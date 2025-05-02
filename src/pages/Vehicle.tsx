
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useVehicle } from '@/contexts/VehicleContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import VehicleList from '@/components/vehicle/VehicleList';
import AddVehicleForm from '@/components/vehicle/AddVehicleForm';
import EmptyVehicleState from '@/components/vehicle/EmptyVehicleState';

interface LocationState {
  scannedVin?: string;
  forNewVehicle?: boolean;
}

const Vehicle = () => {
  const { vehicles, selectedVehicle, addVehicle, updateVehicle, deleteVehicle, selectVehicle } = useVehicle();
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [isAdding, setIsAdding] = useState(false);

  // Handle receiving scanned VIN from scanner page
  useEffect(() => {
    if (state?.scannedVin) {
      if (state.forNewVehicle) {
        setIsAdding(true);
      }
      
      // Clear location state to avoid re-applying the VIN on refresh
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  const handleAddVehicle = (newVehicle) => {
    if (!user?.isPremium && vehicles.length >= 1) {
      toast({
        variant: "destructive",
        title: "Free account limit reached",
        description: "Upgrade to premium to add more vehicles.",
      });
      return;
    }
    
    addVehicle(newVehicle);
    setIsAdding(false);
  };

  const handleUpdateVehicle = (id: string, field: string, value: string | number) => {
    updateVehicle(id, { [field]: value });
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
          <AddVehicleForm 
            onAddVehicle={handleAddVehicle}
            initialVin={state?.scannedVin || ''}
          />
        )}
        
        {/* Vehicle List */}
        {vehicles.length > 0 ? (
          <VehicleList
            vehicles={vehicles}
            selectedVehicleId={selectedVehicle?.id}
            onSelectVehicle={selectVehicle}
            onUpdateVehicle={handleUpdateVehicle}
            onDeleteVehicle={deleteVehicle}
            isPremium={!!user?.isPremium}
          />
        ) : (
          <EmptyVehicleState onAddVehicle={() => setIsAdding(true)} />
        )}
      </div>
    </Layout>
  );
};

export default Vehicle;
