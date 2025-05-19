
import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ScanBarcode, Image, X } from 'lucide-react';

interface VinScannerProps {
  onDetected?: (vin: string) => void;
}

const VinScanner = ({ onDetected }: VinScannerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [scannerMode, setScannerMode] = useState<'barcode' | 'image'>('barcode');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "vin-scanner-container";
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.stop().catch(error => console.error("Error stopping scanner:", error));
        } catch (error) {
          console.error("Error cleaning up scanner:", error);
        }
      }
    };
  }, []);

  const startScanner = async () => {
    try {
      setScanning(true);
      const html5QrCode = new Html5Qrcode(scannerContainerId);
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 100 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          handleVinDetected(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          console.log("QR Code scanning error:", errorMessage);
        }
      );
    } catch (error) {
      console.error("Error starting scanner:", error);
      toast({
        variant: "destructive",
        title: "Error al iniciar el escáner",
        description: "No se pudo acceder a la cámara. Verifique los permisos.",
      });
      setScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop()
        .then(() => {
          setScanning(false);
        })
        .catch(err => {
          console.error("Error stopping scanner:", err);
          setScanning(false);
        });
    } else {
      setScanning(false);
    }
  };

  const handleImageScan = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(scannerContainerId);
      }

      setScanning(true);
      const decodedText = await scannerRef.current.scanFile(file, true);
      handleVinDetected(decodedText);
    } catch (error) {
      console.error("Error scanning image:", error);
      toast({
        variant: "destructive",
        title: "Error al escanear imagen",
        description: "No se pudo leer un código de barras en la imagen.",
      });
    } finally {
      setScanning(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleVinDetected = (decodedText: string) => {
    // Limpiar el texto para asegurar que sea un VIN válido
    const vin = decodedText.trim().replace(/\s+/g, '');
    
    toast({
      title: "VIN Detectado",
      description: `${vin}`,
    });

    // Si hay un callback directo, usarlo
    if (onDetected) {
      onDetected(vin);
      return;
    }

    // Si no, usar la navegación con state para regresar a la página anterior
    const state = location.state || {};
    const returnTo = state.returnTo || '/vehicle';
    const field = state.field;
    const vehicleId = state.vehicleId;

    navigate(returnTo, {
      state: {
        scannedVin: vin,
        field,
        vehicleId,
        forNewVehicle: field === 'newVehicleVin'
      },
      replace: true
    });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="glass-card animate-fade-in mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <ScanBarcode className="h-5 w-5" />
            Escáner de VIN
          </CardTitle>
          {scanning && (
            <Button
              variant="ghost"
              size="icon"
              onClick={stopScanner}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            <Button
              variant={scannerMode === 'barcode' ? 'default' : 'outline'}
              onClick={() => setScannerMode('barcode')}
              className="flex items-center gap-2"
              disabled={scanning}
            >
              <ScanBarcode className="h-4 w-4" />
              Código de barras
            </Button>

            <Button
              variant={scannerMode === 'image' ? 'default' : 'outline'}
              onClick={() => setScannerMode('image')}
              className="flex items-center gap-2"
              disabled={scanning}
            >
              <Image className="h-4 w-4" />
              Desde imagen
            </Button>
          </div>

          {/* Scanner Container */}
          <div 
            id={scannerContainerId} 
            className={`w-full h-64 bg-muted ${scanning && scannerMode === 'barcode' ? 'block' : 'hidden'}`}
          />

          {/* Hidden file input for image scanning */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageScan}
            ref={fileInputRef}
            className="hidden"
          />

          {/* Action buttons */}
          <div className="flex justify-center">
            {!scanning && scannerMode === 'barcode' && (
              <Button onClick={startScanner} className="w-full">
                <ScanBarcode className="h-4 w-4 mr-2" />
                Iniciar escáner
              </Button>
            )}

            {!scanning && scannerMode === 'image' && (
              <Button onClick={triggerFileInput} className="w-full">
                <Image className="h-4 w-4 mr-2" />
                Seleccionar imagen
              </Button>
            )}
          </div>

          {scanning && scannerMode === 'barcode' && (
            <p className="text-center text-sm text-muted-foreground">
              Apunte la cámara al código de barras del VIN
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VinScanner;
