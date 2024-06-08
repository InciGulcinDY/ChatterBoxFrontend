import React, { useState, useEffect, useCallback } from 'react';
import ReceivedMessageCard from '../../components/ReceivedMessageCard';
import SentMessageCard from '../../components/SentMessageCard';
import { MessageModel } from '../../models/MessageModel';
import MessageService from '../../services/MessageService';

type Props = {
  messages: MessageModel[]
  currentUserId: number;
  selectedCorrespondentId: number | null;
};

const Messages: React.FC<Props> = ({ currentUserId, selectedCorrespondentId }) => {
  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    if (selectedCorrespondentId === null) return;

    const fetchMessages = async () => {
      try {
        const unreadMessages = await MessageService.getUnreadMessages(currentUserId, selectedCorrespondentId);
        setMessages(unreadMessages);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [currentUserId, selectedCorrespondentId]);

  const handleMarkAsRead = (messageId: number) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
  };

  return (
    <div id='messages' className='container-fluid bg-light-subtle'>
      <div className="row">
        {messages.map((message) => (
          message.sender.id === currentUserId ? (
            <div className="col-12" key={message.id}>
              <SentMessageCard message={message} />
            </div>
          ) : (
            <div className="col-12" key={message.id}>
              <ReceivedMessageCard 
                message={message} 
                onMessageRead={handleMarkAsRead} 
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default React.memo(Messages);
