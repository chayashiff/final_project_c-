import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/">
        <img src={logo} alt="logo" style={styles.logo} />
      </Link>
      <div style={styles.links}>
        <Link to="/about" style={styles.link}>קצת עלינו</Link>
        <Link to="/contact" style={styles.link}>יצירת קשר</Link>
        <Link to="/login" style={styles.btnLogin}>התחברות</Link>
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
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 2px 8px rgba(212, 147, 154, 0.4)",
  },
  links: {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  },
  link: {
    color: "#2D3F50",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
  },
  btnLogin: {
    padding: "8px 24px",
    borderRadius: "20px",
    backgroundColor: "#D4939A",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "bold",
  },
};

export default Navbar;