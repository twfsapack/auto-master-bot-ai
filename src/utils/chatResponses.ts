
import { Vehicle } from '@/contexts/VehicleContext';

type VehicleResponses = {
  [key: string]: {
    default: string[];
    specific: {
      [make: string]: string[];
    };
  };
};

export const vehicleSpecificResponses: VehicleResponses = {
  'aceite': {
    default: [
      "Generalmente, los vehículos necesitan cambiar el aceite cada 5,000-7,500 kilómetros.",
      "El cambio de aceite es crucial para mantener el motor en buenas condiciones."
    ],
    specific: {
      'Toyota': [
        "Para los Toyota, recomendamos aceite sintético 5W-30 específico para tu modelo.",
        "Los Toyota suelen tener intervalos de cambio de aceite cada 7,000 kilómetros."
      ],
      'Honda': [
        "Los Honda funcionan mejor con aceite sintético 0W-20.",
        "Para tu Honda, el cambio de aceite es recomendable cada 6,000-7,000 kilómetros."
      ],
    }
  },
  'frenos': {
    default: [
      "Las pastillas de freno generalmente duran entre 30,000 y 50,000 kilómetros.",
      "Es importante revisar los frenos periódicamente para garantizar tu seguridad."
    ],
    specific: {
      'Toyota': [
        "En Toyota, las pastillas de freno pueden durar hasta 50,000 kilómetros con un mantenimiento adecuado.",
        "Presta atención a cualquier chirrido inusual en los frenos de tu Toyota."
      ],
      'Honda': [
        "Los Honda suelen tener pastillas de freno que duran alrededor de 40,000 kilómetros.",
        "Mantén un registro de tus revisiones de frenos para tu Honda."
      ],
    }
  }
};

export const getRelevantResponse = (
  input: string, 
  isPremium: boolean | undefined,
  selectedVehicle: Vehicle | null
): string => {
  if (!isPremium) {
    return "Esta función está disponible solo para usuarios premium. Por favor, actualiza tu cuenta.";
  }

  if (!selectedVehicle) {
    return "Por favor, agrega un vehículo en la sección de vehículos para obtener respuestas personalizadas.";
  }

  const lowercaseInput = input.toLowerCase();
  let response = "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?";

  for (const [key, responses] of Object.entries(vehicleSpecificResponses)) {
    if (lowercaseInput.includes(key)) {
      if (responses.specific[selectedVehicle.make]) {
        const specificResponses = responses.specific[selectedVehicle.make];
        response = specificResponses[Math.floor(Math.random() * specificResponses.length)];
      } else {
        const defaultResponses = responses.default;
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }

      response = response.replace(
        '{vehicle}',
        `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
      );
      break;
    }
  }

  return response;
};
