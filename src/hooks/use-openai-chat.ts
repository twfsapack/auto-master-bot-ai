
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

/**
 * Represents a message in the chat.
 */
export interface ChatMessage {
  /** The role of the message sender ('user' or 'assistant'). */
  role: 'user' | 'assistant';
  /** The textual content of the message. */
  content: string;
}

/**
 * Represents basic information about a vehicle.
 */
interface VehicleInfo {
  /** The make of the vehicle (e.g., Toyota). */
  make: string;
  /** The model of the vehicle (e.g., Camry). */
  model: string;
  /** The manufacturing year of the vehicle. */
  year: number | string;
}

/**
 * Represents OBD (On-Board Diagnostics) data.
 * Using a generic record as its structure can vary.
 */
type OBDData = Record<string, unknown>;

/**
 * Custom hook for interacting with the OpenAI chat API.
 * Manages loading states, question counts for free users, and sends messages to the backend API.
 *
 * @returns {object} An object containing chat state and functions.
 * @property {boolean} isLoading - True if a chat message request is currently in progress.
 * @property {number} questionCount - The number of questions asked by a non-premium user in the current session.
 * @property {number} remainingQuestions - The number of questions remaining for a non-premium user. Returns -1 for premium users (unlimited).
 * @property {(message: string, vehicleInfo?: VehicleInfo, obdData?: OBDData) => Promise<string>} sendMessage - Function to send a message to the AI chat.
 * @property {() => void} resetQuestionCount - Function to reset the question count for non-premium users.
 */
export const useOpenAIChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const MAX_FREE_QUESTIONS = 10;

  const sendMessage = async (message: string, vehicleInfo?: VehicleInfo, obdData?: OBDData): Promise<string> => {
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
