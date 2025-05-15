import React, { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);

  const API_URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Our Products</h1>

      {/* Toast Message */}
      <div
        style={{
          ...styles.toast,
          ...(toastVisible ? {} : styles.toastHidden)
        }}
      >
        ✅ Item added to cart!
      </div>

      {loading ? (
        <p style={styles.loading}>Loading products...</p>
      ) : (
        <div style={styles.grid}>
          {products.map(product => (
            <div
              key={product.id}
              style={styles.card}
              onClick={() => {
                window.location.href = `/product/${product.id}`;
              }}
            >
              <img src={product.image} alt={product.title} style={styles.image} />
              <h2 style={styles.title}>{product.title}</h2>
              <p style={styles.description}>{product.description.slice(0, 100)}...</p>
              <p style={styles.price}>${product.price}</p>
              <button
                style={styles.button}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  addToCart(product);
                }}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f4f4f4',
    color: '#333',
    minHeight: '100vh',
    padding: '5rem 2rem',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: 'black',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 0 10px #ddd',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  title: {
    fontSize: '1rem',
    margin: '1rem 0 0.5rem',
    color: '#333',
  },
  description: {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '0.5rem',
  },
  price: {
    fontSize: '1.1rem',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  toast: {
    position: 'fixed',
    top: '56px',
    left: 0,
    width: '100%',
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '12px 0',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '600',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    zIndex: 1050,
    opacity: 1,
    transition: 'opacity 0.5s ease-in-out',
  },
  toastHidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
};

export default Home;
