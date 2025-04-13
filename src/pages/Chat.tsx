
import { ChatInterface } from '@/components/chat/ChatInterface';
import Layout from '@/components/common/Layout';

const Chat = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">AI Diagnostic Chat</h1>
        <p className="text-muted-foreground">
          Describe your vehicle's symptoms or ask questions about maintenance
        </p>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
