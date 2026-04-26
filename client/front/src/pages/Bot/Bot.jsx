import { useState } from "react";
import NavbarUser from "../../components/Navbar/NavbarUser";
import api from "../../api/authApi";

const Bot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "שלום! אני הבוט של תמי נחמד 👋 אשמח לעזור לך בכל שאלה על פאות וטיפולי שיער" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { from: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await api.post("/Bot/ask", { message: userMessage });
      setMessages(prev => [...prev, { from: "bot", text: response.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { from: "bot", text: "מצטערת, הייתה שגיאה. נסי שוב 😊" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={styles.page}>
      <NavbarUser />
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.avatar}>💇</div>
          <div>
            <p style={styles.headerTitle}>בוט פאות — תמי נחמד</p>
            <p style={styles.headerSub}>מחובר</p>
          </div>
        </div>

        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <div key={i} style={msg.from === "user" ? styles.userRow : styles.botRow}>
              <div style={msg.from === "user" ? styles.userBubble : styles.botBubble}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={styles.botRow}>
              <div style={styles.botBubble}>מקליד...</div>
            </div>
          )}
        </div>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="כתבי שאלה על פאות..."
          />
          <button style={styles.sendBtn} onClick={sendMessage}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
            </svg>
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
    paddingTop: "80px",
    direction: "rtl",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(212, 147, 154, 0.3)",
    display: "flex",
    flexDirection: "column",
    height: "600px",
  },
  header: {
    backgroundColor: "#D4939A",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
  headerTitle: {
    margin: 0,
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
  },
  headerSub: {
    margin: 0,
    color: "rgba(255,255,255,0.8)",
    fontSize: "12px",
  },
  messages: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#FDF6F7",
  },
  botRow: { display: "flex", justifyContent: "flex-start" },
  userRow: { display: "flex", justifyContent: "flex-end" },
  botBubble: {
    backgroundColor: "white",
    border: "1px solid #F2C9CC",
    borderRadius: "0 12px 12px 12px",
    padding: "10px 14px",
    maxWidth: "75%",
    fontSize: "14px",
    color: "#2D3F50",
  },
  userBubble: {
    backgroundColor: "#D4939A",
    borderRadius: "12px 0 12px 12px",
    padding: "10px 14px",
    maxWidth: "75%",
    fontSize: "14px",
    color: "white",
  },
  inputRow: {
    padding: "12px",
    borderTop: "1px solid #F2C9CC",
    backgroundColor: "white",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderRadius: "20px",
    padding: "10px 16px",
    fontSize: "14px",
    border: "1px solid #E8B4B8",
    outline: "none",
  },
  sendBtn: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#D4939A",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Bot;