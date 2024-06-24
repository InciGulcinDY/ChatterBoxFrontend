import { Client } from "@stomp/stompjs";
import { Socket } from "dgram";
/*
const { createServer } =require("http");
const { Server } = require("socket.io");


const WEBSOCKET_URL = 'http://localhost:8080/ws';
const httpServer = createServer();
const socket = new Server(httpServer, {
  cors: {
    origin: WEBSOCKET_URL,
  },
});

socket.on("connection", (socket: Socket) => {
  console.log(socket);

})


httpServer.listen(3000, () => {
  console.log("Server is running!");
})




class WebSocketService {
  






  /*
  private stompClient: Client;

  constructor() {
    const socket = new SockJS(WEBSOCKET_URL);
    this.stompClient = over(socket);
  }

  connect(onConnected: () => void, onError: (error: any) => void) {
    this.stompClient.connect({}, onConnected, onError);
    this.stompClient.connected({}, onConnected, onError);
  }

  subscribe(topic: string, onMessageReceived: (message: any) => void) {
    this.stompClient.subscribe(topic, message => {
      onMessageReceived(JSON.parse(message.body));
    });
  }

  send(topic: string, message: any) {
    this.stompClient.send(topic, {}, JSON.stringify(message));
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }
   
}

export default new WebSocketService(); */
