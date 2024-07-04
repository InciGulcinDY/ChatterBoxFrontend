import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../constants/apiConstants";


type Props = {
    room: string,
    //username: string
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
  /*const sendData = useCallback(
    (payload:MessageModel) => {
      socket.emit("send_message", {
        room: props.room,
        content: payload.content,
        username: props.username,
        messageType: "CLIENT",
      });
    },
    [socket, props.room]
  );*/
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

  return { socketResponse, isConnected};
};