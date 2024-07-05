import React, { useEffect, useState } from 'react'
import MessageList from './MessageList';
import MessageService from '../services/MessageService';
import { ChatMessageModel } from '../models/ChatMessageModel';
import { useSocket } from '../utils/custom/useSocket';
import MessageSendingCard from '../components/MessageSendingCard';

type Props = {
    userId: number,
    room: string,
    recipientId: number;
}

const MessageRoom = (props: Props) => {
    const [messages, setMessages] = useState<ChatMessageModel[]>([]);

    const username=  "in";
    const socketInfo = {props, username}

    const { isConnected, socketResponse } = useSocket(props);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
              const fetchedMessages = await MessageService.getAllMessages(props.room);
              setMessages(fetchedMessages);
            } catch (error) {
              console.error("Failed to fetch messages", error);
            }
          };

          fetchMessages();
      return () => {
        
      }
    }, [props.room])

    //const { responseData, error, loading } = useFetch();



  return (
    <div className="message_root_div" style={{marginBottom:"60px"}}>
      <span className="room_name">Room: {props.room} </span>
      <span className="user_name">Welcome: {props.userId} </span>
      <div className="message_component">
        <MessageList username={props.userId} messageList={messages} />
      </div>
      <div className=""><MessageSendingCard recipientId={2} senderId={props.userId} room= {props.room} /></div>
    </div>
  )
}

export default MessageRoom