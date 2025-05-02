
import { ChatInterface } from '@/components/chat/ChatInterface';
import Layout from '@/components/common/Layout';

const Chat = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Chat de Diagnóstico IA</h1>
        <p className="text-muted-foreground">
          Describe los síntomas de tu vehículo o haz preguntas sobre mantenimiento
        </p>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
