import { Link } from "react-router-dom";
import { useState } from "react";
import { useRole } from "../../hooks/useRole";
import logo from "../../assets/logo.jpg";
import RatingModal from "../RatingModal/RatingModal";

const NavbarUser = () => {
const { user } = useAuth();

return (
  <nav style={styles.nav}>
    <Link to="/home">
      <img src={logo} alt="logo" style={styles.logo} />
    </Link>
    <div style={styles.links}>
      {user?.role !== "Admin" && (
        <>
          <Link to="/appointments" style={styles.link}>קביעת תור</Link>
          <Link to="/history" style={styles.link}>תורים</Link>
          <Link to="/shop" style={styles.link}>חנות</Link>
          <Link to="/bot" style={styles.link}>בוט פאות</Link>
        </>
      )}
      {user?.role === "Admin" && (
        <Link to="/admin" style={styles.btnAdmin}>ניהול</Link>
      )}
      <button style={styles.btnLogout} onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        התנתקות
      </button>
    </div>
  </nav>
);
  const role = useRole();
  const isAdmin = role === "Admin";
  const [showRating, setShowRating] = useState(false);

  const handleLogout = () => {
    // אדמין — מתנתק ישירות
    if (isAdmin) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }
    // לקוח — מציג חלון דירוג
    setShowRating(true);
  };

  const handleRatingSubmit = (rating, comment) => {
    console.log("דירוג:", rating, "הערה:", comment);
    // כאן אפשר לשלוח לשרת בעתיד
  };

  const handleRatingClose = () => {
    setShowRating(false);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <nav style={styles.nav}>
        <Link to="/home">
          <img src={logo} alt="logo" style={styles.logo} />
        </Link>

        <div style={styles.links}>
          {!isAdmin && (
            <>
              <Link to="/appointments" style={styles.link}>קביעת תור</Link>
              <Link to="/history" style={styles.link}>היסטוריה</Link>
              <Link to="/bot" style={styles.link}>בוט פאות</Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin/schedule" style={styles.link}>📅 לוח יומי</Link>
              <Link to="/admin/users" style={styles.link}>👥 לקוחות</Link>
              <Link to="/admin/appointments" style={styles.link}>📋 כל התורים</Link>
            </>
          )}

          <button style={styles.btnLogout} onClick={handleLogout}>
            התנתקות
          </button>
        </div>
      </nav>

      {/* חלון דירוג */}
      {showRating && (
        <RatingModal
          onClose={handleRatingClose}
          onSubmit={handleRatingSubmit}
        />
      )}
    </>
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
  link: {
    color: "#2D3F50",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
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

export default NavbarUser;