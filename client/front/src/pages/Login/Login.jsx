import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/authApi";
import logo from "../../assets/logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
      await api.post(
        `/AddUser/register?fullName=${formData.fullName}&email=${formData.email}&password=${formData.password}&phoneNumber=${formData.phoneNumber}`
      );
      navigate("/home");
    } catch (error) {
      if (error.response?.status === 400) {
        try {
          const loginResponse = await api.post(
            `/Login?email=${formData.email}&password=${formData.password}`
          );
          login(loginResponse.data.token);
navigate("/home");
        } catch {
          setIsError(true);
          setMessage("אימייל או סיסמה שגויים!");
        }
      } else {
        setIsError(true);
        setMessage("משהו השתבש, נסי שוב");
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgOverlay}></div>
      <img src={logo} alt="logo bg" style={styles.bgLogo} />
      <div style={styles.card}>
        <img src={logo} alt="logo" style={styles.logo} />
        <h2 style={styles.title}>כניסה / הרשמה</h2>
        <p style={styles.subtitle}>פאה בקו אישי</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="fullName"
            placeholder="שם מלא"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="אימייל"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="סיסמה"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="טלפון"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            כניסה / הרשמה
          </button>
        </form>
        {isError && message && (
          <p style={styles.error}>{message}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#E8B4B8",
    direction: "rtl",
  },
  bgLogo: {
    position: "absolute",
    width: "100%", height: "100%",
    objectFit: "cover",
    opacity: 0.15,
    filter: "blur(8px)",
    zIndex: 0,
  },
  bgOverlay: {
    position: "absolute",
    width: "100%", height: "100%",
    backgroundColor: "rgba(232, 180, 184, 0.7)",
    zIndex: 1,
  },
  card: {
    position: "relative",
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderRadius: "20px",
    padding: "40px",
    width: "380px",
    boxShadow: "0 8px 32px rgba(212, 147, 154, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: "120px",
    borderRadius: "50%",
    marginBottom: "16px",
    boxShadow: "0 4px 12px rgba(212, 147, 154, 0.4)",
  },
  title: {
    color: "#2D3F50",
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  subtitle: {
    color: "#D4939A",
    fontSize: "14px",
    marginBottom: "24px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #E8B4B8",
    fontSize: "15px",
    color: "#2D3F50",
    backgroundColor: "#FDF6F7",
    outline: "none",
    textAlign: "right",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#D4939A",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "8px",
  },
  error: {
    color: "#c0392b",
    backgroundColor: "#fdecea",
    padding: "10px 16px",
    borderRadius: "8px",
    marginTop: "12px",
    fontSize: "14px",
    width: "100%",
    textAlign: "center",
    boxSizing: "border-box",
  },
};

export default Login;