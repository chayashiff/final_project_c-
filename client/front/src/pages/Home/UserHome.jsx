import NavbarUser from "../../components/Navbar/NavbarUser";
import logo from "../../assets/logo.jpg";

const spinAnimation = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const UserHome = () => {
  return (
    <div style={styles.page}>
      <style>{spinAnimation}</style>
      <NavbarUser />
      <img src={logo} alt="bg" style={styles.bgLogo} />
      <div style={styles.bgOverlay}></div>
      <div style={styles.content}>
        <img src={logo} alt="logo" style={styles.logo} />
        <h1 style={styles.title}>ברוכות הבאות 👋</h1>
        <p style={styles.subtitle}>בחרי מה תרצי לעשות מהתפריט למעלה</p>
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
    opacity: 0.35,
    filter: "blur(4px)",
    zIndex: 0,
  },
  bgOverlay: {
    position: "absolute",
    width: "100%", height: "100%",
    backgroundColor: "rgba(232, 180, 184, 0.5)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    marginTop: "80px",
  },
  logo: {
    width: "200px", height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 8px 32px rgba(212, 147, 154, 0.5)",
    border: "4px solid white",
    animation: "spin 8s linear infinite",
  },
  title: {
    color: "#2D3F50",
    fontSize: "36px",
    fontWeight: "bold",
    margin: 0,
  },
  subtitle: {
    color: "#fff",
    fontSize: "18px",
    margin: 0,
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
};

export default UserHome;