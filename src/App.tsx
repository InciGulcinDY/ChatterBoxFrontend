import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyChatPage from "./pages/MyChatPage";
import { useEffect } from "react";
//import WebSocketService from "./services/webSocketService";



function App() {

  return (
    <>
      <Provider store={store}>
        <Navbar />
        
        <Routes >
          <Route path="/" element={<Homepage />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/register" element={<Register />} />
          <Route path="/api/chat/:room" element={<MyChatPage />} /> 
        </Routes>
        
        <Footer />       
      </Provider>
    </>
  );
}

export default App;
