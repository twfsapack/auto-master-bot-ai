
import { ChatInterface } from '@/components/chat/ChatInterface';
import Layout from '@/components/common/Layout';

const Chat = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh-12rem)] pb-4">
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
