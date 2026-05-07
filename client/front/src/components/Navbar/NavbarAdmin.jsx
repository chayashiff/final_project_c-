import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { useAuth } from "../../context/AuthContext";

const NavbarAdmin = () => {
  const { logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <Link to="/admin">
        <img src={logo} alt="logo" style={styles.logo} />
      </Link>
      <div style={styles.links}>
        <Link to="/admin" style={styles.btnAdmin}>
          🛠️ ניהול
        </Link>
        <button style={styles.btnLogout} onClick={() => {
          logout();
          window.location.href = "/";
        }}>
          התנתקות
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 40px",
    backgroundColor: "rgba(255, 240, 242, 0.97)",
    boxShadow: "0 2px 12px rgba(212, 147, 154, 0.2)",
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 100,
    direction: "rtl",
  },
  logo: {
    width: "60px", height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 2px 8px rgba(212, 147, 154, 0.4)",
  },
  links: {
    display: "flex",
    gap: "28px",
    alignItems: "center",
  },
  btnAdmin: {
    padding: "8px 24px",
    borderRadius: "20px",
    backgroundColor: "#7eb8d4",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "bold",
  },
  btnLogout: {
    padding: "8px 20px",
    borderRadius: "20px",
    backgroundColor: "#D4939A",
    color: "white",
    border: "none",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default NavbarAdmin;