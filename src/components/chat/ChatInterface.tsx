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
    'aceite': [
      "Para tu {vehicle}, recomiendo usar aceite sintético 5W-30. Cambia el aceite cada 5,000-7,500 kilómetros.",
      "El aceite recomendado para tu {vehicle} es sintético 5W-30 o 5W-40, dependiendo del clima de tu región.",
    ],
    'frenos': [
      "Si escuchas un chirrido en los frenos de tu {vehicle}, probablemente necesites cambiar las pastillas. Es recomendable revisarlas cada 20,000 kilómetros.",
      "Para tu {vehicle}, las pastillas de freno deberían durar entre 30,000 y 50,000 kilómetros, dependiendo de tu estilo de conducción.",
    ],
    'batería': [
      "La batería de tu {vehicle} debería durar entre 3-5 años. Si notas que el arranque es más lento, es hora de revisarla.",
      "Para tu {vehicle}, recomiendo una batería de 12V con capacidad similar a la original. Revisa los terminales regularmente.",
    ],
    'diagnóstico': [
      "Basado en tu descripción, tu {vehicle} podría tener un problema con {issue}. Te recomiendo revisar {component}.",
      "Para tu {vehicle}, ese síntoma suele estar relacionado con {issue}. Un diagnóstico profesional sería recomendable.",
    ],
    'mantenimiento': [
      "El programa de mantenimiento para tu {vehicle} sugiere: cambio de aceite cada 5,000-7,500 km, filtros cada 15,000 km, y revisión general cada 10,000 km.",
      "Para mantener tu {vehicle} en óptimas condiciones, revisa: niveles de fluidos mensualmente, presión de neumáticos cada 2 semanas, y realiza una inspección visual semanal.",
    ],
  };

  const getRelevantResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    let response = "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?";
    
    // Check for keywords in the input
    for (const [key, responses] of Object.entries(vehicleSpecificResponses)) {
      if (lowercaseInput.includes(key)) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        if (selectedVehicle) {
          response = randomResponse.replace(
            '{vehicle}',
            `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
          );
        } else {
          response = "Por favor, primero agrega tu vehículo en la sección de vehículos para poder darte información más específica.";
        }
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
