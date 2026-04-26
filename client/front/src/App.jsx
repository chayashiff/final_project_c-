import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserHome from "./pages/Home/UserHome";
import History from "./pages/History/History";
import Appointments from "./pages/Appointments/Appointments";
import Bot from "./pages/Bot/Bot";

const FloatingBot = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/bot")}
      style={{
        position: "fixed",
        bottom: "30px",
        left: "30px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#D4939A",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(212, 147, 154, 0.5)",
        fontSize: "26px",
        zIndex: 9999,
      }}
      title="בוט פאות"
    >
      💇
    </button>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <FloatingBot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/history" element={<History />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/bot" element={<Bot />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;