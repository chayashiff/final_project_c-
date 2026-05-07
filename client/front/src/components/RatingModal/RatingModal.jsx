import { useState } from "react";

const RatingModal = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(rating, comment);
    setSubmitted(true);
    setTimeout(() => onClose(), 2000);
  };

  const ratingLabels = {
    1: "לא ממש 😕",
    2: "סביר 😐",
    3: "טוב 🙂",
    4: "מאוד טוב 😊",
    5: "מרוצה מאוד! 🤩",
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {submitted ? (
          // הודעת תודה
          <div style={styles.thankYou}>
            <span style={styles.thankYouIcon}>💕</span>
            <h2 style={styles.thankYouTitle}>תודה על הדירוג!</h2>
            <p style={styles.thankYouText}>
              נשמח לראותך שוב 😊
            </p>
          </div>
        ) : (
          <>
            {/* כותרת */}
            <div style={styles.header}>
              <h2 style={styles.title}>איך היה הביקור? ✨</h2>
              <p style={styles.subtitle}>
                דרגי את חוויית השירות שלך
              </p>
            </div>

            {/* כוכבים */}
            <div style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  style={styles.starBtn}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                >
                  <span style={{
                    ...styles.star,
                    color: star <= (hover || rating)
                      ? "#FFD700"
                      : "#ddd",
                    transform: star <= (hover || rating)
                      ? "scale(1.2)"
                      : "scale(1)",
                  }}>
                    ★
                  </span>
                </button>
              ))}
            </div>

            {/* תווית דירוג */}
            {(hover || rating) > 0 && (
              <p style={styles.ratingLabel}>
                {ratingLabels[hover || rating]}
              </p>
            )}

            {/* תגובה */}
            <textarea
              placeholder="רוצה לשתף משהו? (אופציונלי)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={styles.textarea}
              rows={3}
            />

            {/* כפתורים */}
            <div style={styles.buttons}>
              <button
                style={rating > 0 ? styles.submitBtn : styles.submitBtnDisabled}
                onClick={handleSubmit}
                disabled={rating === 0}
              >
                שלחי דירוג 💕
              </button>
              <button
                style={styles.skipBtn}
                onClick={onClose}
              >
                דלגי
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    direction: "rtl",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "40px",
    width: "380px",
    maxWidth: "90vw",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    textAlign: "center",
    animation: "slideUp 0.3s ease",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    color: "#2D3F50",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#D4939A",
    fontSize: "14px",
    margin: 0,
  },
  starsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  starBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  star: {
    fontSize: "48px",
    transition: "all 0.2s",
    display: "block",
  },
  ratingLabel: {
    color: "#2D3F50",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "16px",
    minHeight: "24px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1.5px solid #E8B4B8",
    fontSize: "14px",
    color: "#2D3F50",
    backgroundColor: "#FDF6F7",
    outline: "none",
    resize: "none",
    boxSizing: "border-box",
    marginBottom: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "right",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#D4939A",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  submitBtnDisabled: {
    width: "100%",
    padding: "14px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#ddd",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "not-allowed",
  },
  skipBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "25px",
    border: "1px solid #ddd",
    backgroundColor: "transparent",
    color: "#888",
    fontSize: "14px",
    cursor: "pointer",
  },
  thankYou: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "20px 0",
  },
  thankYouIcon: {
    fontSize: "60px",
  },
  thankYouTitle: {
    color: "#2D3F50",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  thankYouText: {
    color: "#D4939A",
    fontSize: "16px",
    margin: 0,
  },
};

export default RatingModal;