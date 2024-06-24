// src/components/ChatComponent.tsx
import React, { useEffect, useState } from 'react';
//import webSocketService from '../services/webSocketService';


const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const onConnected = () => {
      console.log('Connected to WebSocket');
      //webSocketService.subscribe('/user/queue/messages', onMessageReceived);
    };

    const onError = (error: any) => {
      console.error('Could not connect to WebSocket server:', error);
    };

    //webSocketService.connect(onConnected, onError);

    return () => {
      //webSocketService.disconnect();
    };
  }, []);

  const onMessageReceived = (message: any) => {
    setMessages(prevMessages => [...prevMessages, message.content]);
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      //webSocketService.send('/app/chat', { content: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
