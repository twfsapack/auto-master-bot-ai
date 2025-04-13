
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
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
      content: 'Hello! I\'m your Auto Master Bot assistant. How can I help you with your vehicle today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { selectedVehicle } = useVehicle();

  // Sample responses for demo
  const sampleResponses = [
    "Based on your description, it sounds like you might have an issue with the alternator. This could explain the battery drain and electrical problems.",
    "For that check engine light, I'd recommend reading the OBD-II code first. You can use the scanner feature in this app to diagnose the specific code.",
    "Regular oil changes are essential. For your vehicle, I recommend changing the oil every 5,000 to 7,500 miles with synthetic oil.",
    "That grinding noise when braking likely indicates worn brake pads. I'd suggest having them inspected and replaced if necessary.",
    "Based on the mileage of your vehicle, you're due for a timing belt replacement. This is a critical maintenance item.",
    "The AC not blowing cold air could be due to low refrigerant levels. Check for leaks or have it recharged by a professional.",
    "For optimal fuel efficiency in your vehicle, ensure proper tire pressure, regular maintenance, and avoid aggressive acceleration.",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      
      let botResponse = randomResponse;
      
      // Personalize the response if vehicle is available
      if (selectedVehicle) {
        botResponse = botResponse.replace('your vehicle', `your ${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`);
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
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
