import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    // אם כבר בעמוד הבית — גלול
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // אם בעמוד אחר — עבור לבית ואז גלול
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/">
        <img src={logo} alt="logo" style={styles.logo} />
      </Link>
      <div style={styles.links}>
        <button
          style={styles.linkBtn}
          onClick={() => scrollTo("about")}
        >
          קצת עלינו
        </button>
        <button
          style={styles.linkBtn}
          onClick={() => scrollTo("contact")}
        >
          יצירת קשר
        </button>
        <Link to="/login" style={styles.btnLogin}>
          התחברות
        </Link>
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
    gap: "32px",
    alignItems: "center",
  },
  linkBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#2D3F50",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
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