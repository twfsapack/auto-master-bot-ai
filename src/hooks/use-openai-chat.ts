
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const useOpenAIChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const MAX_FREE_QUESTIONS = 10;

  const sendMessage = async (message: string, vehicleInfo?: any, obdData?: any): Promise<string> => {
    // Verificar límites para usuarios gratuitos
    if (!user?.isPremium && questionCount >= MAX_FREE_QUESTIONS) {
      toast({
        title: "Límite alcanzado",
        description: "Has alcanzado el límite de 10 preguntas. Actualiza a Premium para preguntas ilimitadas.",
        variant: "destructive"
      });
      return "Has alcanzado el límite de preguntas gratuitas. Actualiza a Premium para continuar.";
    }

    setIsLoading(true);
    
    try {
      // Construir contexto del vehículo
      let context = "Eres un experto mecánico automotriz especializado en diagnósticos. ";
      
      if (vehicleInfo) {
        context += `El vehículo del usuario es: ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}. `;
      }
      
      if (obdData) {
        context += `Datos del escáner OBD-II: ${JSON.stringify(obdData)}. `;
      }
      
      context += "Proporciona respuestas detalladas, prácticas y en español sobre problemas automotrices.";

      const response = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context,
          isPremium: user?.isPremium || false
        }),
      });

      if (!response.ok) {
        throw new Error('Error al comunicarse con OpenAI');
      }

      const data = await response.json();
      
      // Incrementar contador solo para usuarios gratuitos
      if (!user?.isPremium) {
        setQuestionCount(prev => prev + 1);
      }

      return data.response;
    } catch (error) {
      console.error('Error en OpenAI Chat:', error);
      toast({
        title: "Error",
        description: "No se pudo obtener respuesta de la IA. Intenta nuevamente.",
        variant: "destructive"
      });
      return "Lo siento, no pude procesar tu consulta en este momento. Por favor, intenta nuevamente.";
    } finally {
      setIsLoading(false);
    }
  };

  const getRemainingQuestions = () => {
    if (user?.isPremium) return -1; // Ilimitadas
    return Math.max(0, MAX_FREE_QUESTIONS - questionCount);
  };

  const resetQuestionCount = () => {
    setQuestionCount(0);
  };

  return {
    sendMessage,
    isLoading,
    questionCount,
    remainingQuestions: getRemainingQuestions(),
    resetQuestionCount
  };
};
