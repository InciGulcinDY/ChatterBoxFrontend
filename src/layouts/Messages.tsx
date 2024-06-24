import React, { useEffect, useState } from "react";
import { MessageModel } from "../models/MessageModel";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import MessageService from "../services/MessageService";
import NewMessageCard from "../components/NewMessageCard";
import SentMessageCard from "../components/SentMessageCard";
import ReceivedMessageCard from "../components/ReceivedMessageCard";


type Props = {
  messages: MessageModel[];
  currentUserId: number;
  selectedCorrespondentId: number | null;
  onMessageRead: (messageId: number) => void;
};



const Messages: React.FC<Props> = ({
  messages: initialMessages,
  currentUserId,
  selectedCorrespondentId,
  onMessageRead,
}) => {
  const [messages, setMessages] = useState<MessageModel[]>(initialMessages);

  //  Root State
  const friendId = useSelector(
    (state: RootState) => state.messages.sentMessage?.recipientId
  );
  const sentMessage = useSelector(
    (state: RootState) => state.messages.sentMessage
  );

  // Fetching unread messages
  useEffect(() => {
    if (selectedCorrespondentId === null) return;

    const fetchMessages = async () => {
      try {
        const unreadMessages = await MessageService.getUnreadMessages(
          currentUserId,
          selectedCorrespondentId
        );
        setMessages(unreadMessages);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [currentUserId, selectedCorrespondentId]);

  //  Handling marking unread messages as read
  const handleMarkAsRead = (messageId: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
    onMessageRead(messageId);
  };

  return (
    <div id="messages" className="container-fluid bg-light-subtle">
      <div className="row">
        {
          /* SentMessages | Received Messages - Starts */
          messages.map((message) =>
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
              /* SentMessages | Received Messages - Ends */
            )
          )
        }
        {
          //New Message - Starts
          sentMessage !== null && selectedCorrespondentId == friendId ? (
            <NewMessageCard message={sentMessage} />
          ) : (
            ""
          )
          //New Message - Ends
        }
      </div>
    </div>
  );
};

export default React.memo(Messages);
