
import { ChatInterface } from '@/components/chat/ChatInterface';
import Layout from '@/components/common/Layout';

const Chat = () => {
  return (
    <Layout>
      <div className="h-full">
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
