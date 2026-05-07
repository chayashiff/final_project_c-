import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getServices } from "../../api/appointmentsApi";
import NavbarUser from "../../components/Navbar/NavbarUser";

const getCategoryAndIcon = (serviceId) => {
  if ([7, 8, 9].includes(serviceId))
    return { category: "💇‍♀️ סירוק ועיצוב", icon: "💆‍♀️" };
  if ([2, 3, 4, 5, 6].includes(serviceId))
    return { category: "🎨 צבע", icon: "🖌️" };
  if ([1, 10, 11, 12, 13, 14, 15, 16].includes(serviceId))
    return { category: "🔧 תיקונים", icon: "🪡" };
  return { category: "✨ שירותים נוספים", icon: "✨" };
};

const ServicePicker = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("שגיאה:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleSelect = (service) => {
    navigate("/appointments", { state: { selectedService: service } });
  };

  // מיון לפי קטגוריות
  const categories = [
    "💇‍♀️ סירוק ועיצוב",
    "🎨 צבע",
    "🔧 תיקונים",
  ];

  const getServicesByCategory = (category) =>
    services.filter(
      (s) => getCategoryAndIcon(s.serviceId).category === category
    );

  if (loading) return (
    <div style={styles.loadingPage}>
      <p style={styles.loadingText}>טוען שירותים... ✨</p>
    </div>
  );

  return (
    <div style={styles.page}>
      <NavbarUser />

      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/appointments")}
        >
          ← חזרה
        </button>
        <div style={styles.headerText}>
          <h1 style={styles.title}>בחרי שירות</h1>
          <p style={styles.subtitle}>לחצי על השירות הרצוי</p>
        </div>
        <div style={{ width: "80px" }} />
      </div>

      {/* תוכן */}
      <div style={styles.content}>
        {categories.map((category) => {
          const categoryServices = getServicesByCategory(category);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category} style={styles.categorySection}>
              <h2 style={styles.categoryTitle}>{category}</h2>
              <div style={styles.grid}>
                {categoryServices.map((service) => {
                  const { icon } = getCategoryAndIcon(service.serviceId);
                  return (
                    <div
                      key={service.serviceId}
                      style={styles.card}
                      onClick={() => handleSelect(service)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 24px rgba(212,147,154,0.4)";
                        e.currentTarget.style.borderColor = "#D4939A";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 16px rgba(212,147,154,0.2)";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      <span style={styles.icon}>{icon}</span>
                      <h3 style={styles.serviceName}>
                        {service.serviceName}
                      </h3>
                      <div style={styles.priceBox}>
                        <span style={styles.price}>₪{service.price}</span>
                      </div>
                      <div style={styles.duration}>
                        ⏱️ {service.timetoservice} דקות
                      </div>
                      <div style={styles.selectBtn}>בחרי ←</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <p style={styles.note}>
          * המחיר יכול להשתנות בהתאם לאורך/צבע הפאה
        </p>
      </div>
    </div>
  );
};

const styles = {
  loadingPage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8B4B8",
  },
  loadingText: {
    color: "#2D3F50",
    fontSize: "20px",
    fontWeight: "bold",
  },
  page: {
    minHeight: "100vh",
    backgroundColor: "#E8B4B8",
    direction: "rtl",
  },
  header: {
    backgroundColor: "rgba(255,255,255,0.97)",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 12px rgba(212,147,154,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    marginTop: "70px",
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
    width: "80px",
  },
  headerText: {
    textAlign: "center",
  },
  title: {
    color: "#2D3F50",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 4px 0",
  },
  subtitle: {
    color: "#D4939A",
    fontSize: "13px",
    margin: 0,
  },
  content: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "32px 16px",
  },
  categorySection: {
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
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "16px",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "16px",
    padding: "20px 16px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(212,147,154,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    border: "2px solid transparent",
    transition: "all 0.2s",
  },
  icon: { fontSize: "36px" },
  serviceName: {
    color: "#2D3F50",
    fontSize: "14px",
    fontWeight: "bold",
    margin: 0,
    lineHeight: "1.3",
  },
  priceBox: {
    backgroundColor: "#F2C9CC",
    padding: "5px 14px",
    borderRadius: "20px",
  },
  price: {
    color: "#2D3F50",
    fontSize: "15px",
    fontWeight: "bold",
  },
  duration: {
    color: "#888",
    fontSize: "12px",
  },
  selectBtn: {
    backgroundColor: "#D4939A",
    color: "white",
    padding: "7px 18px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    marginTop: "4px",
  },
  note: {
    color: "rgba(45,63,80,0.6)",
    fontSize: "13px",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: "16px",
  },
};

export default ServicePicker;