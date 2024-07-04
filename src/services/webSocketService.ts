import { io } from "socket.io-client";
import { MessageModel } from "../models/MessageModel";
import { SOCKET_BASE_URL } from "../utils/constants/apiConstants";
import { useSocket } from "../utils/custom/useSocket";

const socket = useSocket;
//io(SOCKET_BASE_URL); // Adjust the URL to your server
/*
// Connection
const connectToSocket = () => {

  socket.on("connect", () => {
    console.log('Connected to Socket.IO server');
  });
  
  socket.on('message', (message) => {
    console.log(message);
  });


  socket.on("connect_error", (error) => {
    if (socket.active) {
      // temporary failure, the socket will automatically try to reconnect
      socket.on('connect',()=>{
        console.log('Reconnection | Connected to Socket.IO server')
      });
    } else {
      // the connection was denied by the server
      // in that case, `socket.connect()` must be manually called in order to reconnect
      console.log(error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
  });
}

// Sending message
const sendMessage = (message: MessageModel) => {
  socket.emit('message', message); // Adjust the event name as needed
}

const WebSocketService = {
  connectToSocket,
  sendMessage,
}

export default WebSocketService;
















/*

import { Client } from "@stomp/stompjs";
import { MessageModel } from "../models/MessageModel";




  //  Define the Client
  const client = new Client({
    brokerURL: 'ws://localhost:3000/ws',
    connectHeaders: {
      login: 'guest',
      passcode: 'guest'
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  // can I react the socket with the below code block
  const socket = client.webSocket;

  //  Connection
  const connectToSocket = () => {
    client.onConnect = function (frame) {
      console.log('Connected: ' + frame);
      client.subscribe('/user/queue/messages', function (message) {
        console.log(message.body);
      });
    };

    client.onStompError = function (frame) {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.activate();
  }

  //  Sending message
  const sendMessage = (message: MessageModel) => {
    client.publish({
      destination: '/app/chat', // Change this to the appropriate destination
      body: JSON.stringify(message),
      headers: { priority: '9' } // Optional headers
    });
  }

  const WebSocketService = {
    connectToSocket,
  }

  export default WebSocketService;
*/
