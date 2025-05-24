
import OpenAI from 'openai';

// Configuración de OpenAI (necesitarás configurar la API key)
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  dangerouslyAllowBrowser: true // Solo para desarrollo, en producción usar backend
});

export const generateAIResponse = async (
  userMessage: string,
  context: string,
  isPremium: boolean
): Promise<string> => {
  try {
    // Simular respuesta si no hay API key configurada
    if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'demo-key') {
      return generateMockResponse(userMessage, isPremium);
    }

    const completion = await openai.chat.completions.create({
      model: isPremium ? "gpt-4" : "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: context
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: isPremium ? 1000 : 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "No pude generar una respuesta.";
  } catch (error) {
    console.error('Error al llamar OpenAI:', error);
    return generateMockResponse(userMessage, isPremium);
  }
};

const generateMockResponse = (userMessage: string, isPremium: boolean): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = {
        free: [
          "Basándome en tu consulta, te recomiendo revisar los siguientes puntos básicos:",
          "Como mecánico especializado, sugiero que verifiques:",
          "Según mi experiencia, este problema podría estar relacionado con:",
        ],
        premium: [
          "Análisis detallado del problema:",
          "Diagnóstico avanzado basado en los datos del vehículo:",
          "Solución completa paso a paso:",
        ]
      };

      const responseTemplates = isPremium ? responses.premium : responses.free;
      const randomTemplate = responseTemplates[Math.floor(Math.random() * responseTemplates.length)];
      
      let response = `${randomTemplate}\n\n`;
      
      if (userMessage.toLowerCase().includes('motor') || userMessage.toLowerCase().includes('engine')) {
        response += "• Revisa el nivel de aceite del motor\n• Verifica las bujías\n• Inspecciona el filtro de aire";
      } else if (userMessage.toLowerCase().includes('freno')) {
        response += "• Inspecciona las pastillas de freno\n• Verifica el nivel del líquido de frenos\n• Revisa los discos de freno";
      } else if (userMessage.toLowerCase().includes('batería') || userMessage.toLowerCase().includes('bateria')) {
        response += "• Revisa los terminales de la batería\n• Verifica la carga de la batería\n• Inspecciona el alternador";
      } else {
        response += "• Realiza una inspección visual general\n• Verifica los niveles de fluidos\n• Consulta el manual del propietario";
      }

      if (isPremium) {
        response += "\n\n🔧 Diagnóstico Premium:\n";
        response += "• Análisis de códigos OBD-II disponible\n";
        response += "• Recomendaciones de refacciones específicas\n";
        response += "• Estimación de costos de reparación\n";
        response += "• Localización de talleres cercanos";
      }

      resolve(response);
    }, 1500);
  });
};
