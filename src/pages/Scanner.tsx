
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Camera } from 'lucide-react';
import { useVehicle } from '@/contexts/VehicleContext';
import { Html5QrcodeScanType, Html5Qrcode } from 'html5-qrcode';
import Layout from '@/components/common/Layout';

interface LocationState {
  returnTo: string;
  field: string;
  vehicleId?: string;
}

const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { updateVehicle } = useVehicle();
  const [qrScanner, setQrScanner] = useState<Html5Qrcode | null>(null);
  const state = location.state as LocationState;

  useEffect(() => {
    return () => {
      // Clean up scanner on component unmount
      if (qrScanner && qrScanner.isScanning) {
        qrScanner.stop();
      }
    };
  }, [qrScanner]);

  const startScanning = async () => {
    try {
      setScanning(true);
      
      const html5QrCode = new Html5Qrcode("reader");
      setQrScanner(html5QrCode);

      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        formatsToSupport: [
          Html5QrcodeScanType.SCAN_TYPE_1D_BAR_CODE
        ]
      };

      await html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        onScanSuccess,
        onScanFailure
      );
    } catch (err) {
      console.error("Error starting camera:", err);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Failed to access camera. Please check permissions and try again.",
      });
      setScanning(false);
    }
  };

  const onScanSuccess = async (decodedText: string) => {
    setScanned(true);
    
    if (qrScanner && qrScanner.isScanning) {
      await qrScanner.stop();
    }

    handleScannedCode(decodedText);
  };

  const onScanFailure = (error: unknown) => {
    // Handle scanning failure silently to avoid spamming the console
    // console.error("Code scan error:", error);
  };

  const handleScannedCode = (code: string) => {
    toast({
      title: "VIN Scanned Successfully",
      description: "VIN code has been captured",
    });

    // Redirect to the appropriate page with the scanned VIN
    if (state) {
      const { returnTo, field, vehicleId } = state;
      
      if (field === 'newVehicleVin' && returnTo === '/vehicle') {
        navigate(returnTo, { state: { scannedVin: code, forNewVehicle: true } });
      } 
      else if (field === 'existingVehicleVin' && vehicleId) {
        updateVehicle(vehicleId, { vin: code });
        navigate(returnTo);
      }
      else if (field === 'vin' && returnTo === '/onboarding') {
        navigate(returnTo, { state: { scannedVin: code } });
      }
      else {
        navigate(returnTo || '/');
      }
    } else {
      navigate('/');
    }
  };

  const handleCancel = async () => {
    if (qrScanner && qrScanner.isScanning) {
      await qrScanner.stop();
    }
    navigate(state?.returnTo || '/');
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto mt-4">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Scan VIN Barcode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div 
                id="reader" 
                className="w-full" 
                style={{ minHeight: '300px', display: scanning ? 'block' : 'none' }} 
              />

              {!scanning && !scanned && (
                <div className="bg-muted aspect-video w-full flex items-center justify-center rounded-md">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground">
                {!scanning && !scanned && "Position the barcode within the scanner to capture the VIN number."}
                {scanning && !scanned && "Scanning..."}
                {scanned && "VIN captured successfully!"}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <Button 
              variant="outline" 
              className="w-1/2" 
              onClick={handleCancel}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            
            {!scanning && !scanned ? (
              <Button 
                className="w-1/2" 
                onClick={startScanning}
              >
                Start Scanning
              </Button>
            ) : (
              <Button 
                className="w-1/2" 
                onClick={handleCancel}
                variant={scanned ? "default" : "destructive"}
              >
                {scanned ? "Continue" : "Cancel"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Scanner;
