import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavbarUser from "../../components/Navbar/NavbarUser";
import { getUserHistory, deleteAppointment } from "../../api/appointmentsApi";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        const data = await getUserHistory(userId);
        setHistory(data);
      } catch (error) {
        setMessage("שגיאה בטעינת ההיסטוריה");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (userId, appointmentDate) => {
    if (!window.confirm("האם את בטוחה שברצונך למחוק את התור?"))
      return;
    try {
      await deleteAppointment(userId, appointmentDate);
      setMessage("התור נמחק בהצלחה! ✅");
      setHistory(history.filter(
        (h) => h.appointmentDate !== appointmentDate
      ));
    } catch (error) {
      setMessage(
        typeof error.response?.data === "string"
          ? error.response.data
          : "שגיאה במחיקת התור"
      );
    }
  };

  return (
    <div style={styles.page}>
      <NavbarUser />

      <div style={styles.content}>
        <h1 style={styles.title}>היסטוריית תורים</h1>

        {message && (
          <p style={styles.message}>{message}</p>
        )}

        {loading ? (
          <p style={styles.loading}>טוען...</p>
        ) : history.length === 0 ? (
          <p style={styles.empty}>אין היסטוריה להצגה</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>שירות</th>
                  <th style={styles.th}>תאריך</th>
                  <th style={styles.th}>שעה</th>
                  <th style={styles.th}>מחיר</th>
                  <th style={styles.th}>סטטוס</th>
                  <th style={styles.th}>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => {
                  const isPast = new Date(item.appointmentDate) < new Date();
                  return (
                    <tr
                      key={index}
                      style={isPast ? styles.rowPast : styles.rowFuture}
                    >
                      <td style={styles.td}>{item.serviceName}</td>
                      <td style={styles.td}>
                        {new Date(item.appointmentDate)
                          .toLocaleDateString("he-IL")}
                      </td>
                      <td style={styles.td}>
                        {new Date(item.appointmentDate)
                          .toLocaleTimeString("he-IL", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </td>
                      <td style={styles.td}>₪{item.price}</td>
                      <td style={styles.td}>
                        <span
                          style={
                            isPast ? styles.badgePast : styles.badgeFuture
                          }
                        >
                          {isPast ? "עבר" : "עתידי"}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {!isPast && (
                          <div style={styles.actions}>
                            <button
                              style={styles.btnUpdate}
                              onClick={() =>
                                navigate("/appointments", {
                                  state: { appointment: item },
                                })
                              }
                            >
                              עדכון
                            </button>
                            <button
                              style={styles.btnDelete}
                              onClick={() =>
                                handleDelete(
                                  item.userId,
                                  item.appointmentDate
                                )
                              }
                            >
                              מחיקה
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
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
    maxWidth: "900px",
    margin: "0 auto",
    padding: "32px 16px",
  },
  title: {
    color: "#2D3F50",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "24px",
  },
  message: {
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#2D3F50",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "16px",
  },
  loading: {
    textAlign: "center",
    color: "#2D3F50",
    fontSize: "18px",
  },
  empty: {
    textAlign: "center",
    color: "#2D3F50",
    fontSize: "18px",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: "24px",
    borderRadius: "12px",
  },
  tableWrapper: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(212, 147, 154, 0.3)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#D4939A",
    color: "white",
    padding: "14px 16px",
    textAlign: "right",
    fontSize: "15px",
    fontWeight: "bold",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #F2C9CC",
    color: "#2D3F50",
    fontSize: "14px",
  },
  rowPast: {
    backgroundColor: "rgba(232, 180, 184, 0.15)",
  },
  rowFuture: {
    backgroundColor: "white",
  },
  badgePast: {
    backgroundColor: "#E8B4B8",
    color: "#2D3F50",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  badgeFuture: {
    backgroundColor: "#D4939A",
    color: "white",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  btnUpdate: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
  },
  btnDelete: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
  },
};

export default History;