
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useVehicle } from '@/contexts/VehicleContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ScanBarcode } from 'lucide-react';

// Generate a range of years from current year to 20 years ago
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

// Mock car makes and models
const carMakes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai', 
  'Kia', 'Mazda', 'Subaru', 'Lexus', 'Acura'
];

interface VehicleFormProps {
  initialVin?: string;
}

export const VehicleForm = ({ initialVin }: VehicleFormProps = {}) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(currentYear);
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState<number | undefined>();
  const { addVehicle } = useVehicle();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Apply initial VIN if provided
  useEffect(() => {
    if (initialVin) {
      setVin(initialVin);
    }
  }, [initialVin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!make || !model || !year) {
      toast({
        variant: "destructive",
        title: "Campos requeridos faltantes",
        description: "Marca, modelo y año son obligatorios.",
      });
      return;
    }

    addVehicle({
      make,
      model,
      year,
      vin: vin || undefined,
      mileage: mileage || undefined,
    });

    navigate('/dashboard');
  };

  const handleSkip = () => {
    toast({
      title: "Omitido",
      description: "Puedes añadir un vehículo más tarde en ajustes.",
    });
    navigate('/dashboard');
  };

  const handleScanVin = () => {
    navigate('/scanner', { state: { returnTo: '/onboarding', field: 'vin' } });
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t('vehicleDetails')}</CardTitle>
          <CardDescription className="text-center">
            {t('addVehicleDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* VIN Field - Moved to the top as first option */}
          <div className="space-y-2">
            <Label htmlFor="vin">{t('vin')} ({t('optional')})</Label>
            <div className="flex gap-2">
              <Input
                id="vin"
                placeholder={t('vinPlaceholder')}
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={handleScanVin}
                title={t('scanVin')}
              >
                <ScanBarcode className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="make">{t('make')} *</Label>
            <Select onValueChange={setMake} required>
              <SelectTrigger>
                <SelectValue placeholder={t('selectMake')} />
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
          
          <div className="space-y-2">
            <Label htmlFor="model">{t('model')} *</Label>
            <Input
              id="model"
              placeholder="ej. Corolla, Civic, F-150"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year">{t('year')} *</Label>
            <Select onValueChange={(value) => setYear(parseInt(value))} defaultValue={currentYear.toString()} required>
              <SelectTrigger>
                <SelectValue placeholder={t('selectYear')} />
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
          
          <div className="space-y-2">
            <Label htmlFor="mileage">{t('mileage')} ({t('optional')})</Label>
            <Input
              id="mileage"
              type="number"
              placeholder="ej. 45000"
              value={mileage || ''}
              onChange={(e) => setMileage(e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleSkip}>
            {t('skip')}
          </Button>
          <Button type="submit">
            {t('addVehicle')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
