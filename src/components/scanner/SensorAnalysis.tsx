
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartLine, Gauge, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

// Definición de tipos para los sensores
interface SensorData {
  id: string;
  name: string;
  units: string;
  description: string;
  maxValue: number;
  minValue: number;
}

interface SensorReading {
  timestamp: number;
  value: number;
}

interface SensorReadingWithTimestamp {
  time: string;
  [key: string]: string | number;
}

// Lista de sensores disponibles
const availableSensors: SensorData[] = [
  {
    id: 'rpm',
    name: 'RPM del Motor',
    units: 'rpm',
    description: 'Revoluciones por minuto del motor',
    maxValue: 8000,
    minValue: 0
  },
  {
    id: 'speed',
    name: 'Velocidad',
    units: 'km/h',
    description: 'Velocidad actual del vehículo',
    maxValue: 220,
    minValue: 0
  },
  {
    id: 'temp',
    name: 'Temperatura del Motor',
    units: '°C',
    description: 'Temperatura del refrigerante del motor',
    maxValue: 130,
    minValue: -20
  },
  {
    id: 'maf',
    name: 'Flujo de Masa de Aire',
    units: 'g/s',
    description: 'Cantidad de aire que entra al motor',
    maxValue: 300,
    minValue: 0
  },
  {
    id: 'o2',
    name: 'Sensor de Oxígeno',
    units: 'V',
    description: 'Voltaje del sensor de oxígeno',
    maxValue: 1.2,
    minValue: 0
  },
  {
    id: 'map',
    name: 'Presión Absoluta',
    units: 'kPa',
    description: 'Presión absoluta del colector de admisión',
    maxValue: 120,
    minValue: 0
  },
  {
    id: 'throttle',
    name: 'Posición del Acelerador',
    units: '%',
    description: 'Posición del pedal del acelerador',
    maxValue: 100,
    minValue: 0
  },
  {
    id: 'fuelLevel',
    name: 'Nivel de Combustible',
    units: '%',
    description: 'Nivel actual de combustible',
    maxValue: 100,
    minValue: 0
  }
];

export const SensorAnalysis = ({ connection, onBack }: { connection: any; onBack: () => void }) => {
  const [selectedSensor1, setSelectedSensor1] = useState<string | null>(null);
  const [selectedSensor2, setSelectedSensor2] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingInterval, setRecordingInterval] = useState<number | null>(null);
  const [sensorReadings, setSensorReadings] = useState<{
    [sensorId: string]: SensorReading[];
  }>({});
  const [combinedData, setCombinedData] = useState<SensorReadingWithTimestamp[]>([]);
  const { toast } = useToast();

  // Efecto para simular la lectura de sensores cuando está en modo grabación
  useEffect(() => {
    if (isRecording) {
      const interval = window.setInterval(() => {
        const timestamp = Date.now();
        
        // Actualizar lecturas para el sensor 1 si está seleccionado
        if (selectedSensor1) {
          const sensor = availableSensors.find(s => s.id === selectedSensor1);
          if (sensor) {
            const newValue = simulateSensorReading(sensor);
            setSensorReadings(prev => ({
              ...prev,
              [selectedSensor1]: [...(prev[selectedSensor1] || []), { timestamp, value: newValue }]
            }));
          }
        }
        
        // Actualizar lecturas para el sensor 2 si está seleccionado
        if (selectedSensor2) {
          const sensor = availableSensors.find(s => s.id === selectedSensor2);
          if (sensor) {
            const newValue = simulateSensorReading(sensor);
            setSensorReadings(prev => ({
              ...prev,
              [selectedSensor2]: [...(prev[selectedSensor2] || []), { timestamp, value: newValue }]
            }));
          }
        }
      }, 1000); // Actualizar cada segundo
      
      setRecordingInterval(interval);
    } else if (recordingInterval !== null) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    
    return () => {
      if (recordingInterval !== null) {
        clearInterval(recordingInterval);
      }
    };
  }, [isRecording, selectedSensor1, selectedSensor2]);
  
  // Efecto para combinar los datos de los sensores para la gráfica
  useEffect(() => {
    const newCombinedData: SensorReadingWithTimestamp[] = [];
    const readings1 = selectedSensor1 ? sensorReadings[selectedSensor1] || [] : [];
    const readings2 = selectedSensor2 ? sensorReadings[selectedSensor2] || [] : [];
    
    // Si solo hay un sensor seleccionado, usar sus lecturas
    if (readings1.length > 0 && !selectedSensor2) {
      readings1.forEach((reading, index) => {
        const time = new Date(reading.timestamp).toLocaleTimeString();
        newCombinedData.push({
          time,
          [selectedSensor1]: reading.value
        });
      });
    } 
    // Si solo hay dos sensor seleccionado, usar sus lecturas
    else if (readings2.length > 0 && !selectedSensor1) {
      readings2.forEach((reading, index) => {
        const time = new Date(reading.timestamp).toLocaleTimeString();
        newCombinedData.push({
          time,
          [selectedSensor2]: reading.value
        });
      });
    } 
    // Si hay dos sensores, combinar sus lecturas
    else if (readings1.length > 0 && readings2.length > 0) {
      // Usar el menor número de lecturas para asegurar datos completos
      const numReadings = Math.min(readings1.length, readings2.length);
      
      for (let i = 0; i < numReadings; i++) {
        const time = new Date(readings1[i].timestamp).toLocaleTimeString();
        newCombinedData.push({
          time,
          [selectedSensor1]: readings1[i].value,
          [selectedSensor2]: readings2[i].value
        });
      }
    }
    
    setCombinedData(newCombinedData);
  }, [sensorReadings, selectedSensor1, selectedSensor2]);
  
  // Función para simular la lectura de un sensor
  const simulateSensorReading = (sensor: SensorData): number => {
    const range = sensor.maxValue - sensor.minValue;
    let value: number;
    
    // Obtener la última lectura si existe
    const readings = sensorReadings[sensor.id] || [];
    const lastReading = readings.length > 0 ? readings[readings.length - 1].value : (sensor.minValue + range / 2);
    
    // Simular una pequeña variación sobre la última lectura
    const variation = (Math.random() - 0.5) * (range * 0.1);
    value = lastReading + variation;
    
    // Asegurarse de que el valor está dentro de los límites
    value = Math.max(sensor.minValue, Math.min(sensor.maxValue, value));
    
    return Number(value.toFixed(2));
  };
  
  // Función para iniciar/detener la grabación
  const toggleRecording = () => {
    if (!selectedSensor1 && !selectedSensor2) {
      toast({
        title: "Error",
        description: "Selecciona al menos un sensor para comenzar el análisis.",
        variant: "destructive"
      });
      return;
    }
    
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Grabación detenida",
        description: "Se ha detenido el análisis de sensores."
      });
    } else {
      // Reiniciar datos si ya había lecturas previas
      if (selectedSensor1) {
        setSensorReadings(prev => ({
          ...prev,
          [selectedSensor1]: []
        }));
      }
      
      if (selectedSensor2) {
        setSensorReadings(prev => ({
          ...prev,
          [selectedSensor2]: []
        }));
      }
      
      setIsRecording(true);
      toast({
        title: "Grabación iniciada",
        description: "Se ha iniciado el análisis de sensores."
      });
    }
  };
  
  // Función para obtener el color del sensor
  const getSensorColor = (sensorId: string): string => {
    return sensorId === selectedSensor1 ? "#3b82f6" : "#10b981"; // Azul para el sensor 1, verde para el sensor 2
  };
  
  // Función para obtener la unidad del sensor
  const getSensorUnits = (sensorId: string): string => {
    const sensor = availableSensors.find(s => s.id === sensorId);
    return sensor ? sensor.units : '';
  };
  
  // Función para obtener el nombre del sensor
  const getSensorName = (sensorId: string): string => {
    const sensor = availableSensors.find(s => s.id === sensorId);
    return sensor ? sensor.name : sensorId;
  };
  
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle className="flex flex-1 items-center gap-2">
              <ChartLine className="h-5 w-5" />
              Análisis de Sensores
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sensor1">Sensor Primario</Label>
                <Select 
                  value={selectedSensor1 || ""}
                  onValueChange={(value) => {
                    // Asegurarse de que no se selecciona el mismo sensor dos veces
                    if (value === selectedSensor2) {
                      setSelectedSensor2(null);
                    }
                    setSelectedSensor1(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar sensor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSensors.map((sensor) => (
                      <SelectItem key={sensor.id} value={sensor.id}>
                        {sensor.name} ({sensor.units})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedSensor1 && (
                  <p className="text-xs text-muted-foreground">
                    {availableSensors.find(s => s.id === selectedSensor1)?.description}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sensor2">Sensor Secundario (Comparación)</Label>
                <Select 
                  value={selectedSensor2 || ""}
                  onValueChange={(value) => {
                    // Asegurarse de que no se selecciona el mismo sensor dos veces
                    if (value === selectedSensor1) {
                      setSelectedSensor1(null);
                    }
                    setSelectedSensor2(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar sensor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSensors.map((sensor) => (
                      <SelectItem key={sensor.id} value={sensor.id}>
                        {sensor.name} ({sensor.units})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedSensor2 && (
                  <p className="text-xs text-muted-foreground">
                    {availableSensors.find(s => s.id === selectedSensor2)?.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="recording">Grabación</Label>
                <p className="text-xs text-muted-foreground">
                  {isRecording ? "Analizando sensores en tiempo real" : "Esperando para iniciar análisis"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="recording"
                  checked={isRecording}
                  onCheckedChange={toggleRecording}
                />
                <Badge variant={isRecording ? "default" : "outline"}>
                  {isRecording ? "Grabando" : "Detenido"}
                </Badge>
              </div>
            </div>
            
            {(combinedData.length > 0) && (
              <div className="mt-6 border rounded-lg p-4">
                <h3 className="font-medium mb-2 text-center">
                  Análisis de Datos en Tiempo Real
                </h3>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      [selectedSensor1 || '']: { color: "#3b82f6" }, // Azul para sensor 1
                      [selectedSensor2 || '']: { color: "#10b981" }, // Verde para sensor 2
                    }}
                  >
                    <LineChart data={combinedData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12 }}
                        tickMargin={10}
                      />
                      <YAxis 
                        yAxisId="left"
                        orientation="left"
                        tick={{ fontSize: 12 }}
                        label={{ 
                          value: selectedSensor1 ? getSensorUnits(selectedSensor1) : '', 
                          angle: -90, 
                          position: 'insideLeft' 
                        }}
                      />
                      {selectedSensor1 && selectedSensor2 && (
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          tick={{ fontSize: 12 }}
                          label={{ 
                            value: getSensorUnits(selectedSensor2), 
                            angle: 90, 
                            position: 'insideRight' 
                          }}
                        />
                      )}
                      {selectedSensor1 && (
                        <Line
                          type="monotone"
                          dataKey={selectedSensor1}
                          stroke={getSensorColor(selectedSensor1)}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                          yAxisId="left"
                          name={getSensorName(selectedSensor1)}
                        />
                      )}
                      {selectedSensor2 && (
                        <Line
                          type="monotone"
                          dataKey={selectedSensor2}
                          stroke={getSensorColor(selectedSensor2)}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                          yAxisId={selectedSensor1 ? "right" : "left"}
                          name={getSensorName(selectedSensor2)}
                        />
                      )}
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <ChartTooltip
                        content={({ active, payload }) => (
                          <ChartTooltipContent active={active} payload={payload} />
                        )}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
            )}
            
            {combinedData.length === 0 && (selectedSensor1 || selectedSensor2) && !isRecording && (
              <div className="flex flex-col items-center justify-center border rounded-lg p-8">
                <Gauge className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-center text-muted-foreground">
                  No hay datos disponibles. Inicia la grabación para comenzar el análisis.
                </p>
              </div>
            )}
            
            {!selectedSensor1 && !selectedSensor2 && (
              <div className="flex flex-col items-center justify-center border rounded-lg p-8">
                <ChartLine className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-center text-muted-foreground">
                  Selecciona al menos un sensor para comenzar el análisis.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <Button
            onClick={toggleRecording}
            disabled={!selectedSensor1 && !selectedSensor2}
            variant={isRecording ? "destructive" : "default"}
          >
            {isRecording ? "Detener análisis" : "Iniciar análisis"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
