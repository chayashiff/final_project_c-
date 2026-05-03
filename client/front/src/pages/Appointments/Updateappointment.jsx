import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarUser from "../../components/Navbar/NavbarUser";
import { getServices, bookAppointment, updateAppointment } from "../../api/appointmentsApi";

const Updateappointment = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        setMessage("שגיאה בטעינת השירותים");
        setIsError(true);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService || !selectedDate) {
      setMessage("יש למלא את כל השדות");
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const decoded = jwtDecode(token);

      console.log("decoded token:", decoded);
      console.log("userId:", decoded.userId);
      console.log("serviceId:", selectedService);
      console.log("date:", selectedDate.toISOString());

      await Updateappointment(
        parseInt(decoded.userId),
        parseInt(selectedService),
        selectedDate.toISOString()
      );

      setIsError(false);
      setMessage("התור עודכן בהצלחה! 🎉");
      setSelectedService("");
      setSelectedDate(null);
    } catch (error) {
      setIsError(true);
      const errMsg = error.response?.data;
      console.log("error response:", error.response);
      setMessage(
        typeof errMsg === "string"
          ? errMsg
          : errMsg?.title || errMsg?.message || "שגיאה בעדכון התור");
    } finally {
      setLoading(false);
    }
  };

  const filterDate = (date) => {
    const day = date.getDay();
    return day !== 6 && date >= new Date();
  };

  const filterTime = (time) => {
    const hours = time.getHours();
    return hours >= 9 && hours < 18;
  };

  return (
    <div style={styles.page}>
      <NavbarUser />

      <div style={styles.content}>
        <div style={styles.card}>
          <h1 style={styles.title}>קביעת תור</h1>
          <p style={styles.subtitle}>בחרי שירות ותאריך מתאים</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>סוג שירות</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={styles.select}
              >
                <option value="">— בחרי שירות —</option>
                {services.map((service) => (
                  <option key={service.serviceId} value={service.serviceId}>
                    {service.serviceName}  — ₪ {service.price}
                    ({service.timetoservice} שעות)
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>תאריך ושעה</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="dd/MM/yyyy HH:mm"
                minDate={new Date()}
                filterDate={filterDate}
                filterTime={filterTime}
                placeholderText="לחצי לבחירת תאריך"
                customInput={<input style={styles.dateInput} />}
              />
            </div>

            <button
              type="submit"
              style={loading ? styles.btnDisabled : styles.btn}
              disabled={loading}
            >
              {loading ? "שומר..." : "עידכון תור"}
            </button>
          </form>

          {message && (
            <p style={isError ? styles.error : styles.success}>
              {message}
            </p>
          )}

          <button
            style={styles.btnHistory}
            onClick={() => navigate("/history")}
          >
            צפייה בתורים
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
    paddingTop: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    maxWidth: "480px",
    padding: "16px",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 8px 32px rgba(212, 147, 154, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#2D3F50",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#D4939A",
    fontSize: "14px",
    marginBottom: "28px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "#2D3F50",
    fontSize: "15px",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #E8B4B8",
    fontSize: "15px",
    color: "#2D3F50",
    backgroundColor: "#FDF6F7",
    outline: "none",
    cursor: "pointer",
  },
  dateInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #E8B4B8",
    fontSize: "15px",
    color: "#2D3F50",
    backgroundColor: "#FDF6F7",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#D4939A",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "8px",
  },
  btnDisabled: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ccc",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "not-allowed",
    marginTop: "8px",
  },
  btnHistory: {
    marginTop: "16px",
    backgroundColor: "transparent",
    border: "none",
    color: "#D4939A",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "underline",
  },
  success: {
    color: "#2D3F50",
    backgroundColor: "#F2C9CC",
    padding: "10px 16px",
    borderRadius: "8px",
    marginTop: "12px",
    fontSize: "14px",
    width: "100%",
    textAlign: "center",
    boxSizing: "border-box",
  },
  error: {
    color: "#c0392b",
    backgroundColor: "#fdecea",
    padding: "10px 16px",
    borderRadius: "8px",
    marginTop: "12px",
    fontSize: "14px",
    width: "100%",
    textAlign: "center",
    boxSizing: "border-box",
  },
};

export default Updateappointment;