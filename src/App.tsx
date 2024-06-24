import "./App.css";
import { Route, Routes } from "react-router-dom";
import MyMessagesPage from "./pages/MyMessagesPage";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyChatPage from "./pages/MyChatPage";
import { useEffect } from "react";
import { Client } from '@stomp/stompjs';

function App() {
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

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Provider store={store}>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/register" element={<Register />} />
          <Route path="/api/messages/:id" element={<MyMessagesPage />} />
          <Route path="/api/chat" element={<MyChatPage />} />
        </Routes>

        <Footer />
      </Provider>
    </>
  );
}

export default App;
