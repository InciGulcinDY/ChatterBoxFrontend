import { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../constants/apiConstants";
import { AddMessageModel } from "../../models/AddMessageModel";


type Props = {
    room: string,
    userId: number;
    recipientId: number;
}

export const useSocket = (props: Props) => {
  const [socket, setSocket] = useState<Socket>(); //holds the Socket.IO client instance
  const [socketResponse, setSocketResponse] = useState({  //holds the response data from the server
    content: "",
    room: "",
    senderId: 0,
    recipientId: 0,
    messageType: "",

    //createdDateTime: "",
  });
  const [isConnected, setConnected] = useState(false);   //tracks the connection status
  const sendData = useCallback(
    (payload:AddMessageModel) => {
      if (socket) {
        socket.emit("send_message", {
          content: payload.content,
          room: props.room,
          senderId: props.userId,
          recipientId: props.recipientId,
          messageType: "CLIENT",
        });
      }
    },
    [socket, props.room]
  );
  useEffect(() => {
    const socket = io(SOCKET_BASE_URL, {
      reconnection: false,
      //reconnectionDelayMax: 10000,
      query: {
        "room": `${props.room}`
      },
    });
    setSocket(socket);
    socket.on("connect", () => setConnected(true));
    socket.on("read_message", (res) => { 
      console.log(res);
      setSocketResponse({
        content: res.content,
        room: res.room,
        senderId: res.senderId,
        recipientId: res.recipientId,
        messageType: res.messageType,
        //createdDateTime: res.createdDateTime,//
      });
    });
    return () => {
      socket.off("connect");
      socket.off("read_message");
      socket.disconnect();
    };
  }, [props.room]);

  return { socketResponse, isConnected, sendData};
};