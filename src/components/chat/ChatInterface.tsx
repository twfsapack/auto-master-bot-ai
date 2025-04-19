
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useVehicle } from '@/contexts/VehicleContext';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hola! Soy tu asistente Auto Master. ¿Cómo puedo ayudarte con tu vehículo hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { selectedVehicle } = useVehicle();

  const vehicleSpecificResponses = {
    // Convertimos a objeto para mayor especificidad
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
        // Añadir más marcas según sea necesario
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
    },
    // Añadir más categorías con respuestas genéricas y específicas
  };

  const getRelevantResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    let response = "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?";
    
    // Verificamos si el usuario es premium y tiene un vehículo seleccionado
    if (!user?.isPremium) {
      return "Esta función está disponible solo para usuarios premium. Por favor, actualiza tu cuenta.";
    }

    if (!selectedVehicle) {
      return "Por favor, agrega un vehículo en la sección de vehículos para obtener respuestas personalizadas.";
    }

    // Buscar coincidencias en las categorías
    for (const [key, responses] of Object.entries(vehicleSpecificResponses)) {
      if (lowercaseInput.includes(key)) {
        // Primero intentamos con respuesta específica por marca
        if (responses.specific[selectedVehicle.make]) {
          const specificResponses = responses.specific[selectedVehicle.make];
          response = specificResponses[Math.floor(Math.random() * specificResponses.length)];
        } else {
          // Si no hay respuesta específica, usamos la respuesta genérica
          const defaultResponses = responses.default;
          response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }

        // Reemplazar marcadores si es necesario
        response = response.replace(
          '{vehicle}', 
          `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
        );
        break;
      }
    }
    
    return response;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = getRelevantResponse(input);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)]">
      <div className="flex-1 overflow-y-auto pb-4 pr-2 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`flex ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              } items-start gap-2 max-w-[80%]`}
            >
              <Avatar className="w-8 h-8">
                {message.sender === 'user' ? (
                  <AvatarFallback className="bg-purple text-white">
                    {user?.name.charAt(0) || 'U'}
                  </AvatarFallback>
                ) : (
                  <AvatarImage src="/lovable-uploads/41987b97-5895-4626-9613-a66c597a304a.png" alt="Bot" />
                )}
              </Avatar>
              <Card
                className={`glass-card ${
                  message.sender === 'user'
                    ? 'bg-primary bg-opacity-10'
                    : 'bg-secondary bg-opacity-10'
                }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex flex-row items-start gap-2 max-w-[80%]">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/lovable-uploads/41987b97-5895-4626-9613-a66c597a304a.png" alt="Bot" />
              </Avatar>
              <Card className="glass-card bg-secondary bg-opacity-10">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-300"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <Input
          placeholder="Ask me about your vehicle..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
