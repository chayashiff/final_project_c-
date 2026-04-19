import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Contact = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.content}>
        <h1 style={styles.title}>📞 יצירת קשר</h1>
        <p style={styles.subtitle}>נשמח לשמוע ממך!</p>

        <div style={styles.grid}>

          {/* כרטיס פרטי קשר */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>פרטי התקשרות</h2>
            <div style={styles.divider}></div>

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
                {copied === "phone" ? "✅ הועתק!" : "העתק"}
              </button>
            </div>

            {/* וואטסאפ */}
            <a
              href="https://wa.me/972548421934"
              target="_blank"
              rel="noreferrer"
              style={styles.whatsappBtn}
            >
              <span>💬</span> שלחי הודעה בוואטסאפ
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
                onClick={() => copyToClipboard("p0583257505@gmail.com", "email")}
              >
                {copied === "email" ? "✅ הועתק!" : "העתק"}
              </button>
            </div>

            {/* כפתור מייל */}
            <a
              href="mailto:p0583257505@gmail.com"
              style={styles.emailBtn}
            >
              <span>✉️</span> שלחי מייל
            </a>

            {/* כתובת */}
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📍</span>
              <div style={styles.contactInfo}>
                <p style={styles.contactLabel}>כתובת</p>
                <p style={styles.contactValue}>עזרא 7/1, רחובות</p>
              </div>
            </div>

            {/* שעות פעילות */}
            <div style={styles.hoursBox}>
              <h3 style={styles.hoursTitle}>🕐 שעות פעילות</h3>
              {[
                { day: "ראשון - חמישי", hours: "09:00 - 20:00" },
                { day: "שישי", hours: "09:00 - 14:00" },
                { day: "שבת", hours: "סגור" },
              ].map((h, i) => (
                <div key={i} style={styles.hoursRow}>
                  <span style={styles.hoursDay}>{h.day}</span>
                  <span style={h.hours === "סגור" ? styles.hoursClosed : styles.hoursTime}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* מפה */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📍 איך מגיעים?</h2>
            <div style={styles.divider}></div>
            <p style={styles.address}>עזרא 7/1, רחובות</p>

            {/* מפה מוטמעת */}
            <iframe
              title="מיקום תמי נחמד"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.5!2d34.8142!3d31.8928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sEzra+St+7%2C+Rehovot!5e0!3m2!1siw!2sil!4v1"
              style={styles.map}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* כפתור waze */}
            <a
              href="https://waze.com/ul?q=עזרא 7 רחובות"
              target="_blank"
              rel="noreferrer"
              style={styles.wazeBtn}
            >
              🚗 פתחי ב-Waze
            </a>

            {/* כפתור Google Maps */}
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

        {/* כפתור חזרה */}
        <button
          style={styles.backBtn}
          onClick={() => navigate("/")}
        >
          🏠 חזרה לעמוד הבית
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#E8B4B8",
    direction: "rtl",
    paddingTop: "80px",
  },
  content: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 16px",
  },
  title: {
    color: "#2D3F50",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "32px",
    textShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 8px 32px rgba(212,147,154,0.3)",
  },
  cardTitle: {
    color: "#2D3F50",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 12px 0",
  },
  divider: {
    width: "50px",
    height: "3px",
    backgroundColor: "#D4939A",
    marginBottom: "24px",
    borderRadius: "2px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #F2C9CC",
    marginBottom: "8px",
  },
  contactIcon: {
    fontSize: "24px",
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    color: "#888",
    fontSize: "12px",
    margin: 0,
  },
  contactValue: {
    color: "#2D3F50",
    fontSize: "16px",
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
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 12px 0",
  },
  hoursRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #F2C9CC",
  },
  hoursDay: {
    color: "#2D3F50",
    fontSize: "14px",
  },
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
    marginBottom: "16px",
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: "300px",
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
  backBtn: {
    display: "block",
    margin: "0 auto",
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

export default Contact;