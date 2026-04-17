import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserHome from "./pages/Home/UserHome";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/history" element={<History />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;       