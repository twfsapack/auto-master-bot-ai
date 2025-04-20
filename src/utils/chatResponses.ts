import { Vehicle } from '@/contexts/VehicleContext';

type PartSpecification = {
  name: string;
  description: string;
  imageUrl?: string;
  estimatedCost?: string;
};

type VehicleResponses = {
  [key: string]: {
    default: {
      text: string[];
      parts?: PartSpecification[];
      imageUrl?: string;
    };
    specific: {
      [make: string]: {
        text: string[];
        parts?: PartSpecification[];
        imageUrl?: string;
      };
    };
  };
};

export const vehicleSpecificResponses: VehicleResponses = {
  'aceite': {
    default: {
      text: [
        "Generalmente, los vehículos necesitan cambiar el aceite cada 5,000-7,500 kilómetros.",
        "El cambio de aceite es crucial para mantener el motor en buenas condiciones."
      ],
      parts: [
        {
          name: "Filtro de aceite",
          description: "Filtro estándar compatible con la mayoría de los vehículos",
          imageUrl: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7",
          estimatedCost: "$15-30"
        }
      ],
      imageUrl: "/lovable-uploads/photo-1518770660439-4636190af475"
    },
    specific: {
      'Toyota': {
        text: [
          "Para los Toyota, recomendamos aceite sintético 5W-30 específico para tu modelo.",
          "Los Toyota suelen tener intervalos de cambio de aceite cada 7,000 kilómetros."
        ],
        parts: [
          {
            name: "Filtro de aceite Toyota Original",
            description: "Filtro OEM específico para Toyota",
            imageUrl: "/lovable-uploads/photo-1531297484001-80022131f5a1",
            estimatedCost: "$20-35"
          }
        ],
        imageUrl: "/lovable-uploads/photo-1498050108023-c5249f4df085"
      },
      'Honda': {
        text: [
          "Los Honda funcionan mejor con aceite sintético 0W-20.",
          "Para tu Honda, el cambio de aceite es recomendable cada 6,000-7,000 kilómetros."
        ],
        parts: [
          {
            name: "Filtro de aceite Honda Genuine",
            description: "Filtro original Honda con sello anti-drenaje",
            imageUrl: "/lovable-uploads/photo-1531297484001-80022131f5a1",
            estimatedCost: "$18-32"
          }
        ]
      }
    }
  },
  'frenos': {
    default: {
      text: [
        "Las pastillas de freno generalmente duran entre 30,000 y 50,000 kilómetros.",
        "Es importante revisar los frenos periódicamente para garantizar tu seguridad."
      ],
      parts: [
        {
          name: "Pastillas de freno universales",
          description: "Juego de pastillas de freno de alta calidad",
          imageUrl: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7",
          estimatedCost: "$40-80"
        }
      ]
    },
    specific: {
      'Toyota': {
        text: [
          "En Toyota, las pastillas de freno pueden durar hasta 50,000 kilómetros con un mantenimiento adecuado.",
          "Presta atención a cualquier chirrido inusual en los frenos de tu Toyota."
        ],
        parts: [
          {
            name: "Pastillas de freno Toyota Original",
            description: "Juego de pastillas de freno originales Toyota",
            imageUrl: "/lovable-uploads/photo-1531297484001-80022131f5a1",
            estimatedCost: "$60-100"
          }
        ]
      },
      'Honda': {
        text: [
          "Los Honda suelen tener pastillas de freno que duran alrededor de 40,000 kilómetros.",
          "Mantén un registro de tus revisiones de frenos para tu Honda."
        ],
        parts: [
          {
            name: "Pastillas de freno Honda Genuine",
            description: "Juego completo de pastillas originales Honda",
            imageUrl: "/lovable-uploads/photo-1531297484001-80022131f5a1",
            estimatedCost: "$55-95"
          }
        ]
      }
    }
  }
};

export const getRelevantResponse = (
  input: string, 
  isPremium: boolean | undefined,
  selectedVehicle: Vehicle | null
): {
  text: string;
  imageUrl?: string;
  parts?: PartSpecification[];
} => {
  if (!selectedVehicle) {
    return {
      text: "Por favor, agrega un vehículo en la sección de vehículos para obtener respuestas personalizadas."
    };
  }

  const lowercaseInput = input.toLowerCase();
  let response = {
    text: "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?",
    imageUrl: undefined,
    parts: undefined
  };

  for (const [key, responses] of Object.entries(vehicleSpecificResponses)) {
    if (lowercaseInput.includes(key)) {
      if (responses.specific[selectedVehicle.make]) {
        const specificResponse = responses.specific[selectedVehicle.make];
        response = {
          text: specificResponse.text[Math.floor(Math.random() * specificResponse.text.length)],
          ...(isPremium && {
            imageUrl: specificResponse.imageUrl,
            parts: specificResponse.parts
          })
        };
      } else {
        const defaultResponse = responses.default;
        response = {
          text: defaultResponse.text[Math.floor(Math.random() * defaultResponse.text.length)],
          ...(isPremium && {
            imageUrl: defaultResponse.imageUrl,
            parts: defaultResponse.parts
          })
        };
      }

      response.text = response.text.replace(
        '{vehicle}',
        `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
      );
      break;
    }
  }

  return response;
};
