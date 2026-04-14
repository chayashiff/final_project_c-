import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserHome from "./pages/Home/UserHome";
import History from "./pages/History/History";
import Appointments from "./pages/Appointments/Appointments";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/history" element={<History />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;