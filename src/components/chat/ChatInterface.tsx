
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useVehicle } from '@/contexts/VehicleContext';
import { getRelevantResponse } from '@/utils/chatResponses';

type MessageContent = {
  text: string;
  imageUrl?: string;
  parts?: {
    name: string;
    description: string;
    imageUrl?: string;
    estimatedCost?: string;
  }[];
};

type Message = {
  id: string;
  content: MessageContent;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: {
        text: 'Hola! Soy tu asistente Auto Master. ¿Cómo puedo ayudarte con tu vehículo hoy?'
      },
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { selectedVehicle } = useVehicle();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: { text: input },
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = getRelevantResponse(input, user?.isPremium, selectedVehicle);
      
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
                <CardContent className="p-3 space-y-3">
                  <p className="text-sm">{message.content.text}</p>
                  {message.sender === 'bot' && message.content.imageUrl && (
                    <img 
                      src={message.content.imageUrl} 
                      alt="Diagnóstico visual" 
                      className="rounded-lg max-w-full h-auto"
                    />
                  )}
                  {message.sender === 'bot' && message.content.parts && (
                    <div className="space-y-2">
                      <p className="font-semibold text-sm">Refacciones recomendadas:</p>
                      {message.content.parts.map((part, index) => (
                        <div key={index} className="bg-background/50 p-2 rounded-lg">
                          <p className="font-medium text-sm">{part.name}</p>
                          <p className="text-xs text-muted-foreground">{part.description}</p>
                          {part.estimatedCost && (
                            <p className="text-xs text-primary">Costo estimado: {part.estimatedCost}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
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
          placeholder="Pregunta sobre tu vehículo..."
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
