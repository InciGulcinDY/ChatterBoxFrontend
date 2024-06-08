import "./App.css";
import { Route, Routes } from "react-router-dom";
import MyMessagesPage from "./pages/MyMessagesPage";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/messages/:id" element={<MyMessagesPage />} />
        </Routes>

        <Footer />
      </Provider>
    </>
  );
}

export default App;
