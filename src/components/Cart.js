import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const enriched = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCartItems(enriched);
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

const removeItem = (id) => {
  const updatedCart = cartItems.filter(item => String(item.id) !== String(id));
  setCartItems(updatedCart);
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  console.log("Removing item with ID:", id);

};

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return total + price * quantity;
    }, 0).toFixed(2);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty!</p>
      ) : (
        <div style={styles.grid}>
          {cartItems.map(item => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} alt={item.title} style={styles.image} />
              <div style={styles.info}>
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.price}>${item.price} × {item.quantity}</p>
                <div style={styles.quantityControls}>
                  <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span style={styles.qtyText}>{item.quantity}</span>
                  <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>🗑 Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div style={styles.totalContainer}>
          <h2 style={styles.total}>Total: ${getTotal()}</h2>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#121212',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '8rem 1.5rem 3rem 1.5rem',
    fontFamily: 'Segoe UI, sans-serif',
    transition: 'all 0.3s ease'
  },
  heading: {
    fontSize: '2.8rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#00d0ff',
    textShadow: '0 0 10px #00d0ff66'
  },
  empty: {
    textAlign: 'center',
    fontSize: '1.4rem',
    color: '#bbb',
    marginTop: '5rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem'
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: '15px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 15px #00d0ff33',
    transition: 'transform 0.3s, box-shadow 0.3s',
    animation: 'fadeIn 0.4s ease-in-out',
  },
  image: {
    width: '110px',
    height: '110px',
    objectFit: 'contain',
    marginRight: '1rem',
    borderRadius: '10px',
    backgroundColor: '#2a2a2a',
    padding: '5px'
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#00ffe5'
  },
  price: {
    fontSize: '1.1rem',
    color: '#f0f0f0',
    marginBottom: '0.5rem'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  qtyBtn: {
    backgroundColor: '#00d0ff',
    border: 'none',
    color: '#000',
    padding: '5px 12px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: '0 6px',
    transition: 'all 0.2s ease'
  },
  qtyText: {
    minWidth: '32px',
    textAlign: 'center',
    fontSize: '1rem'
  },
  removeBtn: {
    backgroundColor: '#ff0055',
    border: 'none',
    color: '#fff',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  },
  totalContainer: {
    marginTop: '3rem',
    textAlign: 'center',
    paddingTop: '1.5rem',
    borderTop: '1px solid #444'
  },
  total: {
    fontSize: '2rem',
    color: '#00ff88',
    textShadow: '0 0 8px #00ff8866'
  }
};

export default Cart;
