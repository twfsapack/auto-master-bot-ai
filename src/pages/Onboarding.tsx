
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { VehicleForm } from '@/components/onboarding/VehicleForm';
import { useAuth } from '@/contexts/AuthContext';

interface LocationState {
  scannedVin?: string;
}

const Onboarding = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [scannedVin, setScannedVin] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth/login');
    }
    
    // Handle receiving scanned VIN from scanner page
    if (state?.scannedVin) {
      setScannedVin(state.scannedVin);
      
      // Clear location state to avoid re-applying the VIN on refresh
      window.history.replaceState({}, document.title);
    }
  }, [user, isLoading, navigate, state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {/* Pass scanned VIN to the vehicle form if available */}
          <VehicleForm initialVin={scannedVin} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
