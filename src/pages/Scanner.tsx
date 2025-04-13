
import { useState } from 'react';
import Layout from '@/components/common/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scan, AlertTriangle, Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useVehicle } from '@/contexts/VehicleContext';
import { useNavigate } from 'react-router-dom';

// Mock error codes and descriptions
const errorCodes = [
  { code: 'P0300', description: 'Random/Multiple Cylinder Misfire Detected', severity: 'high' },
  { code: 'P0171', description: 'System Too Lean (Bank 1)', severity: 'medium' },
  { code: 'P0456', description: 'Evaporative Emission System Leak Detected (very small leak)', severity: 'low' },
  { code: 'P0420', description: 'Catalyst System Efficiency Below Threshold (Bank 1)', severity: 'medium' },
  { code: 'P0302', description: 'Cylinder 2 Misfire Detected', severity: 'high' },
];

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [detectedErrors, setDetectedErrors] = useState<typeof errorCodes>([]);
  const { user } = useAuth();
  const { selectedVehicle } = useVehicle();
  const navigate = useNavigate();

  const handleStartScan = () => {
    if (!user?.isPremium) {
      navigate('/settings');
      return;
    }
    
    setIsScanning(true);
    setDetectedErrors([]);
    setScanComplete(false);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      // Randomly select 0-3 error codes
      const numErrors = Math.floor(Math.random() * 3);
      const selectedErrors = [];
      
      for (let i = 0; i < numErrors; i++) {
        const randomIndex = Math.floor(Math.random() * errorCodes.length);
        selectedErrors.push(errorCodes[randomIndex]);
      }
      
      setDetectedErrors(selectedErrors);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-orange-500/10 text-orange-500';
      case 'low':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  if (!user?.isPremium) {
    return (
      <Layout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">OBD-II Scanner</h1>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Premium Feature
              </CardTitle>
              <CardDescription>
                The OBD-II scanner is only available to premium subscribers
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8">
              <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Premium Feature</h3>
              <p className="text-muted-foreground text-center mb-6">
                Upgrade to Premium to access the OBD-II scanner and diagnose error codes
              </p>
              <Button onClick={() => navigate('/settings')}>
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">OBD-II Scanner</h1>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5" />
              Scan Vehicle
            </CardTitle>
            <CardDescription>
              Connect to your vehicle's OBD-II port to scan for error codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedVehicle && (
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-medium">Connected Vehicle:</p>
                  <p>
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </p>
                </div>
              )}
              
              {isScanning && (
                <div className="flex flex-col items-center justify-center p-6">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <h3 className="text-xl font-medium mb-2">Scanning...</h3>
                  <p className="text-muted-foreground text-center">
                    Communicating with your vehicle's onboard computer
                  </p>
                </div>
              )}
              
              {scanComplete && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 p-4 bg-primary/5 rounded-lg">
                    <Check className="h-6 w-6 text-green-500" />
                    <span className="font-medium">Scan Complete</span>
                  </div>
                  
                  {detectedErrors.length > 0 ? (
                    <div className="space-y-2">
                      <h3 className="font-medium">Detected Error Codes:</h3>
                      {detectedErrors.map((error, index) => (
                        <div 
                          key={index} 
                          className={`p-3 rounded-lg ${getSeverityColor(error.severity)}`}
                        >
                          <div className="flex justify-between">
                            <span className="font-bold">{error.code}</span>
                            <span className="text-sm capitalize">{error.severity} severity</span>
                          </div>
                          <p>{error.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6">
                      <Check className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Errors Detected</h3>
                      <p className="text-muted-foreground text-center">
                        Your vehicle's diagnostic system didn't report any error codes
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleStartScan} 
              disabled={isScanning}
              className="w-full"
            >
              {isScanning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : scanComplete ? 'Scan Again' : 'Start Scan'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Scanner;
