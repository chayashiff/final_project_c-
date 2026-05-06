import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import logo from "../../assets/logo.jpg";

const spinAnimation = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div style={styles.page}>
      <style>{spinAnimation}</style>
      <Navbar />

      {/* ===== SECTION 1 — HERO ===== */}
      <section style={styles.hero}>
        <img src={logo} alt="bg" style={styles.bgLogo} />
        <div style={styles.bgOverlay}></div>
        <div style={styles.heroContent}>
          <img src={logo} alt="logo" style={styles.logo} />
          <h1 style={styles.heroTitle}>ברוכות הבאות</h1>
          <p style={styles.heroSubtitle}>פאה בקו אישי — תמי נחמד</p>
        </div>
      </section>

      {/* ===== SECTION 2 — קצת עלינו ===== */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>✨ קצת עלינו</h2>
          <div style={styles.divider}></div>

          <div style={styles.aboutCard}>
            <p style={styles.text}>
              תמי נחמד היא פאנית בעלת ניסיון של כעשור, המתמחה בסירוק
              והתאמה אישית של פאות לנשים במגזר החרדי.
            </p>
            <p style={styles.text}>
              העסק שלה פועל בתוך הבית ברחובות, שם דגש על יחס אישי,
              זמינות וגמישות מרבית עבור הלקוחות שלה. תמי מציעה מגוון
              פאות איכותיות, המשתמשות בשיער ברזילאי טבעי, בנוסף מוכרת
              גם מטפחות לנשים.
            </p>
            <p style={styles.text}>
              הלקוחות שלה כוללות בעיקר מורות ונשים צעירות שמחפשות פאה
              שתשמש אותן, מתוך ליווי אישי והקפדה על כל פרט.
            </p>
            <p style={styles.textHighlight}>
              המותג של תמי משדר אמינות, אחריות, מקצועיות וחוויית לקוח
              נעימה ורגועה, עם מקסימום דאגה שכל אישה תצא מרוצה ובטוחה
              שהיא נראית ובעיקר מרגישה הכי טוב שיש. 💕
            </p>
          </div>

          {/* כרטיסיות שירותים */}
          <h3 style={styles.servicesTitle}>השירותים שלנו</h3>
          <div style={styles.servicesGrid}>
            {[
              { icon: "💇‍♀️", title: "סירוק וסידור", desc: "סירוק מקצועי והתאמה אישית" },
              { icon: "🎨", title: "צביעה", desc: "צביעה בחומרים איכותיים" },
              { icon: "✂️", title: "תספורת", desc: "תספורת לפי מבנה הפנים" },
              { icon: "🛍️", title: "מכירת פאות", desc: "שיער ברזילאי טבעי" },
              { icon: "🧕", title: "מטפחות", desc: "מגוון מטפחות לנשים" },
              { icon: "⭐", title: "ליווי אישי", desc: "הקפדה על כל פרט" },
            ].map((s, i) => (
              <div key={i} style={styles.serviceCard}>
                <span style={styles.serviceIcon}>{s.icon}</span>
                <h4 style={styles.serviceTitle}>{s.title}</h4>
                <p style={styles.serviceDesc}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* חץ גלילה */}
          <button
            style={styles.scrollBtnDark}
            onClick={() =>
              document.getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            ↓ יצירת קשר
          </button>
        </div>
      </section>

      {/* ===== SECTION 3 — יצירת קשר ===== */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitleWhite}>📞 יצירת קשר</h2>
          <div style={styles.dividerWhite}></div>

          <div style={styles.contactGrid}>
            {/* פרטי קשר */}
            <div style={styles.contactCard}>
              <h3 style={styles.contactCardTitle}>פרטי התקשרות</h3>

              {/* טלפון */}
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📱</span>
                <div style={styles.contactInfo}>
                  <p style={styles.contactLabel}>טלפון</p>
                  <p style={styles.contactValue}>054.842.1934</p>
                </div>
                <button
                  style={styles.copyBtn}
                  onClick={() => copyToClipboard("0548421934", "phone")}
                >
                  {copied === "phone" ? "✅" : "העתק"}
                </button>
              </div>

              {/* וואטסאפ */}
              <a
                href="https://wa.me/972548421934"
                target="_blank"
                rel="noreferrer"
                style={styles.whatsappBtn}
              >
                💬 שלחי הודעה בוואטסאפ
              </a>

              {/* אימייל */}
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📧</span>
                <div style={styles.contactInfo}>
                  <p style={styles.contactLabel}>אימייל</p>
                  <p style={styles.contactValue}>p0583257505@gmail.com</p>
                </div>
                <button
                  style={styles.copyBtn}
                  onClick={() =>
                    copyToClipboard("p0583257505@gmail.com", "email")
                  }
                >
                  {copied === "email" ? "✅" : "העתק"}
                </button>
              </div>

              {/* מייל */}
              <a
                href="mailto:p0583257505@gmail.com"
                style={styles.emailBtn}
              >
                ✉️ שלחי מייל
              </a>

              {/* כתובת */}
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <div style={styles.contactInfo}>
                  <p style={styles.contactLabel}>כתובת</p>
                  <p style={styles.contactValue}>עזרא 7/1, רחובות</p>
                </div>
              </div>

              {/* שעות */}
              <div style={styles.hoursBox}>
                <h4 style={styles.hoursTitle}>🕐 שעות פעילות</h4>
                {[
                  { day: "ראשון - חמישי", hours: "09:00 - 20:00" },
                  { day: "שישי", hours: "09:00 - 14:00" },
                  { day: "שבת", hours: "סגור" },
                ].map((h, i) => (
                  <div key={i} style={styles.hoursRow}>
                    <span style={styles.hoursDay}>{h.day}</span>
                    <span
                      style={
                        h.hours === "סגור"
                          ? styles.hoursClosed
                          : styles.hoursTime
                      }
                    >
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* מפה */}
            <div style={styles.contactCard}>
              <h3 style={styles.contactCardTitle}>📍 איך מגיעים?</h3>
              <p style={styles.address}>עזרא 7/1, רחובות</p>

              <iframe
                title="מיקום תמי נחמד"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.5!2d34.8142!3d31.8928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sEzra+St+7%2C+Rehovot!5e0!3m2!1siw!2sil!4v1"
                style={styles.map}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <a
                href="https://waze.com/ul?q=עזרא 7 רחובות"
                target="_blank"
                rel="noreferrer"
                style={styles.wazeBtn}
              >
                🚗 פתחי ב-Waze
              </a>

              <a
                href="https://maps.google.com/?q=עזרא+7+רחובות"
                target="_blank"
                rel="noreferrer"
                style={styles.mapsBtn}
              >
                🗺️ פתחי ב-Google Maps
              </a>
            </div>
          </div>

          {/* כפתור חזרה למעלה */}
          <button
            style={styles.backTopBtn}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            ↑ חזרה למעלה
          </button>
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    direction: "rtl",
    fontFamily: "Arial, sans-serif",
  },

  // Hero
  hero: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#E8B4B8",
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
  heroContent: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    marginTop: "70px",
  },
  logo: {
    width: "200px", height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid white",
    boxShadow: "0 8px 32px rgba(212,147,154,0.5)",
    animation: "spin 8s linear infinite",
  },
  heroTitle: {
    color: "#2D3F50",
    fontSize: "40px",
    fontWeight: "bold",
    margin: 0,
  },
  heroSubtitle: {
    color: "#fff",
    fontSize: "20px",
    margin: 0,
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  heroBtn: {
    padding: "14px 40px",
    borderRadius: "30px",
    border: "none",
    backgroundColor: "#2D3F50",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(45,63,80,0.3)",
  },
  scrollBtn: {
    backgroundColor: "transparent",
    border: "2px solid white",
    color: "white",
    padding: "10px 24px",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "8px",
  },

  // About
  aboutSection: {
    backgroundColor: "#FDF6F7",
    padding: "80px 16px",
  },
  sectionContent: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  sectionTitle: {
    color: "#2D3F50",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 12px 0",
  },
  divider: {
    width: "60px",
    height: "3px",
    backgroundColor: "#D4939A",
    margin: "0 auto 40px",
    borderRadius: "2px",
  },
  aboutCard: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 4px 24px rgba(212,147,154,0.15)",
    marginBottom: "40px",
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
    margin: 0,
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
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(212,147,154,0.15)",
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
  },
  scrollBtnDark: {
    display: "block",
    margin: "0 auto",
    backgroundColor: "#D4939A",
    border: "none",
    color: "white",
    padding: "12px 32px",
    borderRadius: "20px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  // Contact
  contactSection: {
    backgroundColor: "#2D3F50",
    padding: "80px 16px",
  },
  sectionTitleWhite: {
    color: "white",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 12px 0",
  },
  dividerWhite: {
    width: "60px",
    height: "3px",
    backgroundColor: "#D4939A",
    margin: "0 auto 40px",
    borderRadius: "2px",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  contactCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  contactCardTitle: {
    color: "#2D3F50",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 20px 0",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #F2C9CC",
    marginBottom: "8px",
  },
  contactIcon: { fontSize: "24px" },
  contactInfo: { flex: 1 },
  contactLabel: {
    color: "#888",
    fontSize: "12px",
    margin: 0,
  },
  contactValue: {
    color: "#2D3F50",
    fontSize: "15px",
    fontWeight: "bold",
    margin: 0,
  },
  copyBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid #D4939A",
    backgroundColor: "transparent",
    color: "#D4939A",
    fontSize: "12px",
    cursor: "pointer",
  },
  whatsappBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "#25D366",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "16px",
    boxSizing: "border-box",
  },
  emailBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "#D4939A",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "16px",
    boxSizing: "border-box",
  },
  hoursBox: {
    backgroundColor: "#FDF6F7",
    borderRadius: "12px",
    padding: "16px",
    marginTop: "16px",
  },
  hoursTitle: {
    color: "#2D3F50",
    fontSize: "15px",
    fontWeight: "bold",
    margin: "0 0 12px 0",
  },
  hoursRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #F2C9CC",
  },
  hoursDay: { color: "#2D3F50", fontSize: "14px" },
  hoursTime: {
    color: "#D4939A",
    fontSize: "14px",
    fontWeight: "bold",
  },
  hoursClosed: {
    color: "#e74c3c",
    fontSize: "14px",
    fontWeight: "bold",
  },
  address: {
    color: "#2D3F50",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "16px",
  },
  map: {
    width: "100%",
    height: "280px",
    borderRadius: "12px",
    border: "none",
    marginBottom: "16px",
  },
  wazeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "#00CCFF",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "12px",
    boxSizing: "border-box",
  },
  mapsBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "#4285F4",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "bold",
    boxSizing: "border-box",
  },
  backTopBtn: {
    display: "block",
    margin: "0 auto",
    backgroundColor: "transparent",
    border: "2px solid white",
    color: "white",
    padding: "12px 32px",
    borderRadius: "20px",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default Home;