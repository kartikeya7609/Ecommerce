import React, { useEffect, useState } from 'react';
import Cart from './Cart';  // Import Cart component
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);  // Cart state for storing cart items
  const API_URL = 'https://fakestoreapi.com/products';

  // Retrieve cart items from local storage when the component mounts
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

  // Add to cart handler and save to local storage
  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));  // Save cart items to localStorage
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Our Products</h1>
      {loading ? (
        <p style={styles.loading}>Loading products...</p>
      ) : (
        <div style={styles.grid}>
          {products.map(product => (
            <div key={product.id} style={styles.card}>
              <img src={product.image} alt={product.title} style={styles.image} />
              <h2 style={styles.title}>{product.title}</h2>
              <p style={styles.description}>{product.description.slice(0, 200)}...</p>
              <p style={styles.price}>${product.price}</p>
              <button
                style={styles.button}
                onClick={() => addToCart(product)}  // Add product to cart
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
    textShadow: 'var(--border-color) 0px 0px 10px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
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
    padding: '0.5rem',
    textAlign: 'center',
    boxShadow: '0 0 10px #ddd',
  },
  image: {
    width: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  title: {
    fontSize: '1.1rem',
    margin: '1rem 0 0.5rem',
    color: '#333',
  },
  description: {
    fontSize: '0.9rem',
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
    margin: '0.75rem',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    margin: '5px',
    transition: 'background-color 0.3s ease',
  },
};

export default Home;
