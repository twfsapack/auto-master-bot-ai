
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Zap, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useVehicle } from '@/contexts/VehicleContext';
import { useOpenAIChat } from '@/hooks/use-openai-chat';
import { generateAIResponse } from '@/services/openai';

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
  isAIGenerated?: boolean;
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: {
        text: 'Hola! Soy tu asistente Auto Master con IA avanzada. ¿Cómo puedo ayudarte con tu vehículo hoy?'
      },
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { selectedVehicle } = useVehicle();
  const { isLoading, remainingQuestions } = useOpenAIChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: { text: input },
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    try {
      // Usar OpenAI para generar respuesta
      const aiResponse = await generateAIResponse(
        currentInput,
        `Eres un experto mecánico automotriz. ${selectedVehicle ? `El vehículo es: ${selectedVehicle.make} ${selectedVehicle.model} ${selectedVehicle.year}. ` : ''}Responde en español de manera detallada y práctica.`,
        user?.isPremium || false
      );
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: { text: aiResponse },
        sender: 'bot',
        timestamp: new Date(),
        isAIGenerated: true,
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al generar respuesta:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: { text: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta nuevamente.' },
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)]">
      {/* Header con información del plan */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg mb-4 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">Chat IA Powered by OpenAI</span>
            {user?.isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
          </div>
          <div className="text-sm text-gray-600">
            {user?.isPremium ? (
              <span className="text-green-600 font-medium">✨ Preguntas ilimitadas</span>
            ) : (
              <span>
                {remainingQuestions > 0 ? (
                  <span className="text-blue-600">{remainingQuestions} preguntas restantes</span>
                ) : (
                  <span className="text-red-600">Límite alcanzado - Actualiza a Premium</span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>

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
                className={`${
                  message.sender === 'user'
                    ? 'bg-white text-black border border-gray-200'
                    : 'bg-white text-black border border-gray-200'
                } ${message.isAIGenerated ? 'border-l-4 border-l-blue-500' : ''}`}
              >
                <CardContent className="p-3 space-y-3">
                  {message.isAIGenerated && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 mb-2">
                      <Zap className="h-3 w-3" />
                      <span>Respuesta generada por IA</span>
                      {user?.isPremium && <Crown className="h-3 w-3 text-yellow-500" />}
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-line">{message.content.text}</div>
                  {message.sender === 'bot' && user?.isPremium && (
                    <>
                      {message.content.imageUrl && (
                        <img 
                          src={message.content.imageUrl} 
                          alt="Diagnóstico visual" 
                          className="rounded-lg max-w-full h-auto"
                        />
                      )}
                      {message.content.parts && (
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">Refacciones recomendadas:</p>
                          {message.content.parts.map((part, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded-lg">
                              <p className="font-medium text-sm">{part.name}</p>
                              <p className="text-xs text-gray-600">{part.description}</p>
                              {part.estimatedCost && (
                                <p className="text-xs text-black font-medium">Costo estimado: {part.estimatedCost}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  <p className="text-xs text-gray-500">
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
              <Card className="bg-white text-black border border-gray-200 border-l-4 border-l-blue-500">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-3 w-3 text-blue-600 animate-pulse" />
                    <span className="text-xs text-blue-600">Generando respuesta con IA...</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <Input
          placeholder={
            !user?.isPremium && remainingQuestions <= 0 
              ? "Actualiza a Premium para más preguntas..." 
              : "Pregunta sobre tu vehículo..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          disabled={isLoading || (!user?.isPremium && remainingQuestions <= 0)}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || !input.trim() || (!user?.isPremium && remainingQuestions <= 0)}
          className="relative"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};
