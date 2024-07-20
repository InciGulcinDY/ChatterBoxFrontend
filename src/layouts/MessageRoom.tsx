import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageService from "../services/MessageService";
import { ChatMessageModel } from "../models/ChatMessageModel";
import MessageSendingCard from "../components/MessageSendingCard";
import { Manager, Socket } from "socket.io-client";
import { SOCKET_BASE_URL } from "../utils/constants/apiConstants";

type Props = {
  userId: number;
  room: string;
  recipientId: number;
};

const MessageRoom = (props: Props) => {
  const [messages, setMessages] = useState<ChatMessageModel[]>([]);

  const [socket, setSocket] = useState<Socket | null>();

  //  Connection to Socket.io
  const connectToSocket = async () => {
    const socketManager = new Manager(SOCKET_BASE_URL, {
      reconnectionDelayMax: 10000,
      autoConnect: true,
      query: {
        room: props.room,
      },
    });

    const socket = socketManager.socket("/"); // main namespace
    setSocket(socket);
    

    socket.on("connect", () => {
      console.log("Socket connected with id:", socket.id);
      console.log(socket.connected);
    });

    socket.io.on("error", (error) => {
      console.log(error.message);
    });

    return () => {socket.off()};
    
  };

  //  Connecting websocket with Socket.io
  useEffect(() => {
    connectToSocket();
  }, []);

  //  Fetching messages in HTTP Protocol
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
    return () => {};
  }, [props.room, messages]);

  return (
    <div className="message_root_div" style={{ marginBottom: "60px" }}>
      <span className="room_name">Room: {props.room} </span>
      <span className="user_name">Welcome: {props.userId} </span>
      <div className="message_component">
        <MessageList username={props.userId} messageList={messages} />
      </div>
      <div className="">
        <MessageSendingCard
          recipientId={2}
          senderId={props.userId}
          room={props.room}
          socket={(socket)? socket : null}
        />
      </div>
    </div>
  );
};

export default MessageRoom;
