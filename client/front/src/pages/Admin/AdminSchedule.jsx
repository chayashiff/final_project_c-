import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../../components/Navbar/NavbarUser";
import {
  getTodaySchedule,
  getScheduleByDate,
  sendReminders,
  sendTestEmail,
} from "../../api/scheduleApi";

const AdminSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [sending, setSending] = useState(false);
  const [reminderMsg, setReminderMsg] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const navigate = useNavigate();

  const fetchSchedule = async (date) => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const data = date === today
        ? await getTodaySchedule()
        : await getScheduleByDate(date);
      setAppointments(data);
    } catch (error) {
      console.error("שגיאה:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule(selectedDate);
  }, [selectedDate]);

  const handleSendReminders = async () => {
    setSending(true);
    setReminderMsg("");
    try {
      const result = await sendReminders();
      setReminderMsg(`✅ ${result.message}`);
    } catch {
      setReminderMsg("❌ שגיאה בשליחת התזכורות");
    } finally {
      setSending(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) return;
    setReminderMsg("");
    try {
      await sendTestEmail(testEmail);
      setReminderMsg("✅ מייל בדיקה נשלח בהצלחה!");
    } catch {
      setReminderMsg("❌ שגיאה בשליחת מייל בדיקה");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Scheduled": return styles.statusScheduled;
      case "Completed": return styles.statusCompleted;
      case "Cancelled": return styles.statusCancelled;
      default: return styles.statusScheduled;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Scheduled": return "מתוכנן";
      case "Completed": return "הושלם";
      case "Cancelled": return "בוטל";
      default: return status;
    }
  };

  const todayFormatted = new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={styles.page}>
      <NavbarUser />

      <div style={styles.content}>

        {/* כותרת */}
        <div style={styles.header}>
          <h1 style={styles.title}>📅 לוח תורים יומי</h1>
          <p style={styles.date}>{todayFormatted}</p>
        </div>

        {/* כרטיס תזכורות */}
        <div style={styles.reminderCard}>
          <div style={styles.reminderHeader}>
            <h3 style={styles.reminderTitle}>📧 תזכורות מייל</h3>
            <span style={styles.reminderBadge}>אוטומטי בשעה 18:00</span>
          </div>
          <p style={styles.reminderDesc}>
            שליחת תזכורות לכל הלקוחות עם תור מחר
          </p>

          <button
            style={sending ? styles.reminderBtnDisabled : styles.reminderBtn}
            onClick={handleSendReminders}
            disabled={sending}
          >
            {sending ? "⏳ שולח..." : "📧 שלחי תזכורות למחר"}
          </button>

          <div style={styles.testEmailBox}>
            <p style={styles.testEmailLabel}>🧪 מייל בדיקה:</p>
            <div style={styles.testEmailRow}>
              <input
                type="email"
                placeholder="הכניסי מייל לבדיקה"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                style={styles.testEmailInput}
              />
              <button
                style={styles.testBtn}
                onClick={handleTestEmail}
              >
                שלחי
              </button>
            </div>
          </div>

          {reminderMsg && (
            <p style={reminderMsg.includes("❌")
              ? styles.reminderMsgError
              : styles.reminderMsgSuccess}>
              {reminderMsg}
            </p>
          )}
        </div>

        {/* בחירת תאריך */}
        <div style={styles.datePickerBox}>
          <label style={styles.dateLabel}>בחרי תאריך:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={styles.dateInput}
          />
          <button
            style={styles.todayBtn}
            onClick={() => setSelectedDate(
              new Date().toISOString().split("T")[0]
            )}
          >
            היום
          </button>
        </div>

        {/* סטטיסטיקות */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>{appointments.length}</span>
            <span style={styles.statLabel}>סה"כ תורים</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>
              {appointments.filter((a) => a.status === "Scheduled").length}
            </span>
            <span style={styles.statLabel}>מתוכננים</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>
              {appointments.reduce((sum, a) => sum + a.durationMinutes, 0)}
            </span>
            <span style={styles.statLabel}>דקות עבודה</span>
          </div>
        </div>

        {/* טבלה */}
        {loading ? (
          <p style={styles.loading}>טוען...</p>
        ) : appointments.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>אין תורים לתאריך זה 🎉</p>
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>שעה</th>
                  <th style={styles.th}>שם לקוחה</th>
                  <th style={styles.th}>מזהה</th>
                  <th style={styles.th}>סוג שירות</th>
                  <th style={styles.th}>משך</th>
                  <th style={styles.th}>סיום</th>
                  <th style={styles.th}>סטטוס</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt, index) => (
                  <tr
                    key={apt.appointmentId}
                    style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                  >
                    <td style={styles.td}>
                      {new Date(apt.appointmentDate).toLocaleTimeString(
                        "he-IL",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </td>
                    <td style={{ ...styles.td, fontWeight: "bold" }}>
                      {apt.fullName}
                    </td>
                    <td style={styles.td}>#{apt.userId}</td>
                    <td style={styles.td}>{apt.serviceName}</td>
                    <td style={styles.td}>{apt.durationMinutes} דק'</td>
                    <td style={styles.td}>
                      {new Date(apt.endTime).toLocaleTimeString("he-IL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td style={styles.td}>
                      <span style={getStatusStyle(apt.status)}>
                        {getStatusText(apt.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* כפתור חזרה */}
        <button
          style={styles.backBtn}
          onClick={() => navigate("/home")}
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
    padding: "32px 16px",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  title: {
    color: "#2D3F50",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  date: {
    color: "#fff",
    fontSize: "16px",
    textShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },
  reminderCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 4px 16px rgba(212,147,154,0.2)",
  },
  reminderHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  reminderTitle: {
    color: "#2D3F50",
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
  },
  reminderBadge: {
    backgroundColor: "#F2C9CC",
    color: "#2D3F50",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  reminderDesc: {
    color: "#888",
    fontSize: "14px",
    margin: "0 0 16px 0",
  },
  reminderBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#D4939A",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "16px",
  },
  reminderBtnDisabled: {
    width: "100%",
    padding: "13px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#ccc",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "not-allowed",
    marginBottom: "16px",
  },
  testEmailBox: {
    backgroundColor: "#FDF6F7",
    borderRadius: "12px",
    padding: "16px",
  },
  testEmailLabel: {
    color: "#2D3F50",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  testEmailRow: {
    display: "flex",
    gap: "8px",
  },
  testEmailInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1.5px solid #E8B4B8",
    fontSize: "14px",
    outline: "none",
    direction: "ltr",
  },
  testBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2D3F50",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  reminderMsgSuccess: {
    marginTop: "12px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#d4edda",
    color: "#155724",
    fontSize: "14px",
    textAlign: "center",
  },
  reminderMsgError: {
    marginTop: "12px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#fdecea",
    color: "#c0392b",
    fontSize: "14px",
    textAlign: "center",
  },
  datePickerBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  dateLabel: {
    color: "#2D3F50",
    fontWeight: "bold",
    fontSize: "16px",
  },
  dateInput: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1.5px solid #D4939A",
    fontSize: "15px",
    color: "#2D3F50",
    backgroundColor: "white",
    outline: "none",
  },
  todayBtn: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#D4939A",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(212,147,154,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statNumber: {
    color: "#D4939A",
    fontSize: "32px",
    fontWeight: "bold",
  },
  statLabel: {
    color: "#2D3F50",
    fontSize: "14px",
  },
  loading: {
    textAlign: "center",
    color: "#2D3F50",
    fontSize: "18px",
  },
  empty: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: "16px",
    padding: "40px",
    textAlign: "center",
  },
  emptyText: {
    color: "#2D3F50",
    fontSize: "18px",
    margin: 0,
  },
  tableWrapper: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(212,147,154,0.3)",
    marginBottom: "24px",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#2D3F50",
    color: "white",
    padding: "14px 16px",
    textAlign: "right",
    fontSize: "14px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #F2C9CC",
    color: "#2D3F50",
    fontSize: "14px",
  },
  rowEven: { backgroundColor: "white" },
  rowOdd: { backgroundColor: "#FDF6F7" },
  statusScheduled: {
    backgroundColor: "#E8B4B8",
    color: "#2D3F50",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  statusCompleted: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  statusCancelled: {
    backgroundColor: "#fdecea",
    color: "#721c24",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
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

export default AdminSchedule;