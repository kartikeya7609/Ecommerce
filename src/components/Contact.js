import React from "react";
import "../App.css";
import "./Contact.css";
const ContactPage = () => {
  return (
    <div style={styles.wrapper} className="contact-bg">
      <div style={styles.container}>
        <h1 style={styles.heading}>Contact Us</h1>
        <form style={styles.form}>
          <input type="text" placeholder="Your Name" style={styles.input} />
          <input type="email" placeholder="Your Email" style={styles.input} />
          <textarea
            placeholder="Your Message"
            rows="5"
            style={styles.textarea}
          ></textarea>
          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    background:
      "linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))",
    fontFamily: "Segoe UI, sans-serif",
  },
  container: {
    backdropFilter: "blur(16px)",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    padding: "2.5rem",
    maxWidth: "500px",
    width: "100%",
    color: "var(--text-primary)",
    transition: "all 0.3s ease-in-out",
  },
  heading: {
    fontSize: "2.8rem",
    textAlign: "center",
    marginBottom: "1.8rem",
    color: "var(--text-primary)",
    textShadow: "0 0 8px var(--neon-glow)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  input: {
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: "1rem",
    transition: "all 0.2s ease-in-out",
    outline: "none",
  },
  textarea: {
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: "1rem",
    resize: "none",
    outline: "none",
    transition: "all 0.2s ease-in-out",
  },
  button: {
    padding: "1rem",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "var(--accent-color)",
    color: "var(--text-button)",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  },
};

export default ContactPage;
