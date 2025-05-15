import React from 'react';
import '../App.css'
const ContactPage = () => {
  return (
    <div className='p-4'>
    <div style={styles.page}>
      <h1 style={styles.heading}>Contact Us</h1>
      <form style={styles.form}>
        <input type="text" placeholder="Your Name" style={styles.input} />
        <input type="email" placeholder="Your Email" style={styles.input} />
        <textarea placeholder="Your Message" rows="5" style={styles.textarea}></textarea>
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    minHeight: '100vh',
    padding: '4rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif'
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    textShadow: 'var(--neon-glow)'
  },
  form: {
    backgroundColor: 'var(--card-bg)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 0 10px var(--border-color)',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '1rem'
  },
  textarea: {
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    resize: 'none'
  },
  button: {
    padding: '1rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'var(--accent-color)',
    color: '#000',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default ContactPage;
