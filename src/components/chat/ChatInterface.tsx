
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Zap, Crown, User, Wrench, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useVehicle } from '@/contexts/VehicleContext';
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

type UserType = 'diy' | 'mechanic' | null;

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { selectedVehicle } = useVehicle();

  const MAX_FREE_QUESTIONS = 10;
  const remainingQuestions = user?.isPremium ? -1 : Math.max(0, MAX_FREE_QUESTIONS - questionCount);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userType) {
      const welcomeMessage: Message = {
        id: '1',
        content: {
          text: userType === 'diy' 
            ? '¡Hola! Soy tu asistente Auto Master con IA. Te ayudaré con el diagnóstico y reparación de tu vehículo. ¿Qué problema estás experimentando?'
            : '¡Hola! Soy tu asistente Auto Master profesional. Te ayudaré con diagnósticos avanzados y análisis técnico. ¿En qué puedo asistirte?'
        },
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [userType]);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || (!user?.isPremium && remainingQuestions <= 0)) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: { text: input },
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const context = `Eres un experto mecánico automotriz. ${
        selectedVehicle ? `El vehículo es: ${selectedVehicle.make} ${selectedVehicle.model} ${selectedVehicle.year}. ` : ''
      }${
        userType === 'diy' 
          ? 'El usuario es un entusiasta DIY, proporciona explicaciones claras y pasos detallados.' 
          : 'El usuario es un mecánico profesional, puedes usar terminología técnica avanzada.'
      } Responde en español de manera ${userType === 'diy' ? 'didáctica y práctica' : 'técnica y profesional'}.`;
      
      const aiResponse = await generateAIResponse(currentInput, context, user?.isPremium || false);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: { text: aiResponse },
        sender: 'bot',
        timestamp: new Date(),
        isAIGenerated: true,
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      if (!user?.isPremium) {
        setQuestionCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error al generar respuesta:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: { text: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta nuevamente.' },
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userType) {
    return (
      <div className="h-full flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10"></div>
          <div className="grid grid-cols-8 gap-2 w-full h-full opacity-20">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-blue-300/10 rounded"></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-sm mx-auto">
          {/* Bot Avatar */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
              <img 
                src="/lovable-uploads/6da80a74-f370-4e8a-a5ca-dd8b844969f9.png" 
                alt="Auto Master Bot" 
                className="w-20 h-20 object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<MessageSquare class="w-10 h-10 text-white" />';
                }}
              />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">¡Bienvenido a Auto Master!</h2>
            <p className="text-white/80 text-sm">
              Selecciona tu perfil para una experiencia personalizada
            </p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-3">
            <Button
              onClick={() => handleUserTypeSelect('diy')}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-3">
                <User className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Entusiasta DIY</div>
                  <div className="text-xs opacity-80">Reparaciones caseras</div>
                </div>
              </div>
            </Button>
            
            <Button
              onClick={() => handleUserTypeSelect('mechanic')}
              className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-3">
                <Wrench className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Mecánico Profesional</div>
                  <div className="text-xs opacity-80">Diagnósticos avanzados</div>
                </div>
              </div>
            </Button>
          </div>

          {/* Plan Info */}
          <div className="glass-card p-3 border border-white/20">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-400" />
                <span className="text-white">IA Powered</span>
                {user?.isPremium && <Crown className="h-4 w-4 text-yellow-400" />}
              </div>
              <div className="text-white/80">
                {user?.isPremium ? (
                  <span className="text-green-400">✨ Ilimitado</span>
                ) : (
                  <span>{remainingQuestions} restantes</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Compact Header */}
      <div className="glass-card border-b border-white/10 p-3 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <img 
                src="/lovable-uploads/6da80a74-f370-4e8a-a5ca-dd8b844969f9.png" 
                alt="Auto Master Bot" 
                className="w-8 h-8 object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<MessageSquare class="w-4 h-4 text-white" />';
                }}
              />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Auto Master Bot</div>
              <div className="text-white/70 text-xs">
                {userType === 'diy' ? 'Modo: Entusiasta DIY' : 'Modo: Mecánico Profesional'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {user?.isPremium && <Crown className="h-4 w-4 text-yellow-400" />}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserType(null)}
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs px-2 py-1"
            >
              Cambiar
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-3 space-y-3 pb-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              } items-start gap-2 max-w-[85%]`}
            >
              <Avatar className="w-7 h-7 flex-shrink-0">
                {message.sender === 'user' ? (
                  <AvatarFallback className="bg-blue-600 text-white text-xs">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                ) : (
                  <AvatarImage 
                    src="/lovable-uploads/6da80a74-f370-4e8a-a5ca-dd8b844969f9.png" 
                    alt="Bot" 
                    className="w-7 h-7 object-cover rounded-full"
                  />
                )}
              </Avatar>
              
              <div
                className={`rounded-2xl px-3 py-2 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'glass-card text-white border border-white/20'
                }`}
              >
                {message.isAIGenerated && (
                  <div className="flex items-center gap-1 text-xs text-blue-300 mb-1">
                    <Zap className="h-3 w-3" />
                    <span>Respuesta IA</span>
                    {user?.isPremium && <Crown className="h-3 w-3 text-yellow-400" />}
                  </div>
                )}
                <div className="text-sm whitespace-pre-line">{message.content.text}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[85%]">
              <Avatar className="w-7 h-7">
                <AvatarImage 
                  src="/lovable-uploads/6da80a74-f370-4e8a-a5ca-dd8b844969f9.png" 
                  alt="Bot" 
                  className="w-7 h-7 object-cover rounded-full"
                />
              </Avatar>
              <div className="glass-card border border-white/20 rounded-2xl px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-3 w-3 text-blue-300 animate-pulse" />
                  <span className="text-xs text-blue-300">Generando respuesta...</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-3 glass-card border-t border-white/10 mt-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            placeholder={
              !user?.isPremium && remainingQuestions <= 0 
                ? "Actualiza a Premium para más preguntas..." 
                : userType === 'diy'
                ? "Describe el problema de tu vehículo..."
                : "Describe los síntomas técnicos..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 glass-card border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 text-sm"
            disabled={isLoading || (!user?.isPremium && remainingQuestions <= 0)}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim() || (!user?.isPremium && remainingQuestions <= 0)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full w-10 h-10 flex-shrink-0"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        
        {/* Message counter */}
        {!user?.isPremium && (
          <div className="mt-2 text-center">
            <span className="text-xs text-white/60">
              {remainingQuestions > 0 ? (
                <>Preguntas restantes: <span className="text-blue-300">{remainingQuestions}</span></>
              ) : (
                <span className="text-red-300">Límite alcanzado - Actualiza a Premium</span>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
