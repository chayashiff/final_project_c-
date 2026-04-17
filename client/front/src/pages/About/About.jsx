import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Navbar from "../../components/Navbar/Navbar";

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Navbar />

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <img src={logo} alt="logo" style={styles.heroLogo} />
          <h1 style={styles.heroTitle}>TAMI (N)ECHMAD</h1>
          <p style={styles.heroSubtitle}>פאה בקו אישי</p>
        </div>
      </div>

      {/* About Section */}
      <div style={styles.section}>
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>✨ קצת עלינו</h2>
          <div style={styles.divider}></div>

          <p style={styles.text}>
            תמי נחמד היא פאנית בעלת ניסיון של כעשור, המתמחה בסירוק והתאמה
            אישית של פאות לנשים במגזר החרדי.
          </p>
          <p style={styles.text}>
            העסק שלה פועל בתוך הבית ברחובות, שם דגש על יחס אישי, זמינות
            וגמישות מרבית עבור הלקוחות שלה. תמי מציעה מגוון פאות איכותיות,
            המשתמשות בשיער ברזילאי טבעי, בנוסף מוכרת גם מטפחות לנשים.
          </p>
          <p style={styles.text}>
            הלקוחות שלה כוללות בעיקר מורות ונשים צעירות שמחפשות פאה
            שתשמש אותן, או לשימוש יומיומי או לאירועים מיוחדים, מתוך ליווי
            אישי והקפדה על כל פרט.
          </p>
          <p style={styles.textHighlight}>
            המותג של תמי משדר אמינות, אחריות, מקצועיות וחוויית לקוח נעימה
            ורגועה, עם מקסימום דאגה שכל אישה תצא מרוצה ובטוחה שהיא נראית
            ובעיקר מרגישה הכי טוב שיש. 💕
          </p>
        </div>

        {/* Services Cards */}
        <h2 style={styles.servicesTitle}>השירותים שלנו</h2>
        <div style={styles.servicesGrid}>
          {[
            { icon: "💇‍♀️", title: "סירוק וסידור", desc: "סירוק מקצועי והתאמה אישית לכל לקוחה" },
            { icon: "🎨", title: "צביעה", desc: "צביעה בחומרים איכותיים לשמירה על השיער" },
            { icon: "✂️", title: "תספורת", desc: "תספורת מותאמת לפי מבנה הפנים" },
            { icon: "🛍️", title: "מכירת פאות", desc: "מגוון פאות איכותיות משיער ברזילאי טבעי" },
            { icon: "🧕", title: "מטפחות", desc: "מגוון מטפחות לנשים" },
            { icon: "⭐", title: "ליווי אישי", desc: "ליווי אישי והקפדה על כל פרט" },
          ].map((service, i) => (
            <div key={i} style={styles.serviceCard}>
              <span style={styles.serviceIcon}>{service.icon}</span>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDesc}>{service.desc}</p>
            </div>
          ))}
        </div>

        {/* כפתורים */}
        <div style={styles.btns}>
          <button
            style={styles.btnPrimary}
            onClick={() => navigate("/contact")}
          >
            📞 יצירת קשר
          </button>
          <button
            style={styles.btnSecondary}
            onClick={() => navigate("/")}
          >
            🏠 חזרה לעמוד הבית
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#E8B4B8",
    direction: "rtl",
  },
  hero: {
    position: "relative",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#2D3F50",
    marginTop: "70px",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(45,63,80,0.9), rgba(212,147,154,0.6))",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  heroLogo: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid white",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  heroTitle: {
    color: "white",
    fontSize: "36px",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "2px",
  },
  heroSubtitle: {
    color: "#E8B4B8",
    fontSize: "18px",
    margin: 0,
  },
  section: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 16px",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 8px 32px rgba(212,147,154,0.3)",
    marginBottom: "40px",
  },
  sectionTitle: {
    color: "#2D3F50",
    fontSize: "26px",
    fontWeight: "bold",
    margin: "0 0 12px 0",
    textAlign: "center",
  },
  divider: {
    width: "60px",
    height: "3px",
    backgroundColor: "#D4939A",
    margin: "0 auto 24px",
    borderRadius: "2px",
  },
  text: {
    color: "#2D3F50",
    fontSize: "16px",
    lineHeight: "1.8",
    marginBottom: "16px",
  },
  textHighlight: {
    color: "#2D3F50",
    fontSize: "16px",
    lineHeight: "1.8",
    backgroundColor: "#F2C9CC",
    padding: "16px",
    borderRadius: "12px",
    borderRight: "4px solid #D4939A",
    marginBottom: 0,
  },
  servicesTitle: {
    color: "#2D3F50",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "24px",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "16px",
    marginBottom: "40px",
  },
  serviceCard: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(212,147,154,0.2)",
    transition: "transform 0.2s",
  },
  serviceIcon: {
    fontSize: "36px",
    display: "block",
    marginBottom: "12px",
  },
  serviceTitle: {
    color: "#2D3F50",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  serviceDesc: {
    color: "#888",
    fontSize: "14px",
    margin: 0,
    lineHeight: "1.5",
  },
  btns: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    padding: "14px 32px",
    borderRadius: "30px",
    border: "none",
    backgroundColor: "#D4939A",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(212,147,154,0.4)",
  },
  btnSecondary: {
    padding: "14px 32px",
    borderRadius: "30px",
    border: "2px solid #2D3F50",
    backgroundColor: "transparent",
    color: "#2D3F50",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default About;