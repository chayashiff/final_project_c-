import { useNavigate } from "react-router-dom";

const services = [
  // סירוק ועיצוב
  {
    category: "💇‍♀️ סירוק ועיצוב",
    items: [
      { serviceId: 1, serviceName: "סירוק", price: 120, timetoservice: 30, icon: "💆‍♀️" },
      { serviceId: 2, serviceName: "עיצוב פאה", price: 400, timetoservice: 60, icon: "✨" },
      { serviceId: 3, serviceName: "גזירה עד 2 ס\"מ", price: 150, timetoservice: 30, icon: "✂️" },
    ],
  },
  // צבע
  {
    category: "🎨 צבע",
    items: [
      { serviceId: 4, serviceName: "צבע פאה שלימה", price: 500, timetoservice: 90, icon: "🖌️" },
      { serviceId: 5, serviceName: "צבע שורש", price: 370, timetoservice: 60, icon: "🌿" },
      { serviceId: 6, serviceName: "גוונים", price: 570, timetoservice: 90, icon: "🌈" },
      { serviceId: 7, serviceName: "בליאז'", price: 770, timetoservice: 120, icon: "⭐" },
      { serviceId: 8, serviceName: "גוונים רק בסקין", price: 320, timetoservice: 60, icon: "💫" },
    ],
  },
  // תיקונים
  {
    category: "🔧 תיקונים",
    items: [
      { serviceId: 9, serviceName: "טרס", price: 500, timetoservice: 60, icon: "🪡" },
      { serviceId: 10, serviceName: "העברת רשת", price: 1200, timetoservice: 120, icon: "🕸️" },
      { serviceId: 11, serviceName: "טופ לייס", price: 7500, timetoservice: 180, icon: "👑" },
      { serviceId: 12, serviceName: "טשטושים בטופ", price: 1200, timetoservice: 90, icon: "🔮" },
      { serviceId: 13, serviceName: "דילול טרס", price: 20, timetoservice: 20, icon: "✂️" },
      { serviceId: 14, serviceName: "תפירת טרס", price: 30, timetoservice: 20, icon: "🧵" },
    ],
  },
];

const ServicePicker = () => {
  const navigate = useNavigate();

  const handleSelect = (service) => {
    // שמירת השירות שנבחר ומעבר לקביעת תור
    navigate("/appointments", { state: { selectedService: service } });
  };

  return (
    <div style={styles.page}>
      {/* כותרת */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate("/appointments")}>
          ← חזרה
        </button>
        <h1 style={styles.title}>בחרי שירות</h1>
        <p style={styles.subtitle}>לחצי על השירות הרצוי</p>
      </div>

      {/* קטגוריות */}
      <div style={styles.content}>
        {services.map((cat, catIndex) => (
          <div key={catIndex} style={styles.category}>
            <h2 style={styles.categoryTitle}>{cat.category}</h2>
            <div style={styles.grid}>
              {cat.items.map((service) => (
                <div
                  key={service.serviceId}
                  style={styles.card}
                  onClick={() => handleSelect(service)}
                >
                  {/* אייקון */}
                  <span style={styles.icon}>{service.icon}</span>

                  {/* שם השירות */}
                  <h3 style={styles.serviceName}>{service.serviceName}</h3>

                  {/* מחיר */}
                  <div style={styles.priceBox}>
                    <span style={styles.price}>₪{service.price}</span>
                  </div>

                  {/* משך */}
                  <div style={styles.duration}>
                    ⏱️ {service.timetoservice} דקות
                  </div>

                  {/* כפתור בחירה */}
                  <div style={styles.selectBtn}>בחרי ←</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* הערה */}
        <p style={styles.note}>
          * המחיר יכול להשתנות בהתאם לאורך/צבע הפאה
        </p>
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
  header: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "20px 32px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 2px 12px rgba(212,147,154,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  backBtn: {
    backgroundColor: "transparent",
    border: "1.5px solid #D4939A",
    color: "#D4939A",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  title: {
    color: "#2D3F50",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
    flex: 1,
    textAlign: "center",
  },
  subtitle: {
    color: "#D4939A",
    fontSize: "14px",
    margin: 0,
  },
  content: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "32px 16px",
  },
  category: {
    marginBottom: "40px",
  },
  categoryTitle: {
    color: "#2D3F50",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "2px solid rgba(212,147,154,0.4)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "16px",
    padding: "24px 16px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(212,147,154,0.2)",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    border: "2px solid transparent",
  },
  icon: {
    fontSize: "40px",
  },
  serviceName: {
    color: "#2D3F50",
    fontSize: "15px",
    fontWeight: "bold",
    margin: 0,
  },
  priceBox: {
    backgroundColor: "#F2C9CC",
    padding: "6px 16px",
    borderRadius: "20px",
  },
  price: {
    color: "#2D3F50",
    fontSize: "16px",
    fontWeight: "bold",
  },
  duration: {
    color: "#888",
    fontSize: "13px",
  },
  selectBtn: {
    backgroundColor: "#D4939A",
    color: "white",
    padding: "8px 20px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
    marginTop: "4px",
  },
  note: {
    color: "rgba(45,63,80,0.6)",
    fontSize: "13px",
    textAlign: "center",
    marginTop: "16px",
    fontStyle: "italic",
  },
};

export default ServicePicker;