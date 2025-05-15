import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemExists = existingCart.find(item => item.id === product.id);
    const updatedCart = itemExists
      ? existingCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert('Item added to cart');
  };

  const buyNow = () => {
    alert('Proceed to checkout (functionality not implemented)');
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!product) return <div style={styles.loading}>Product not found</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.imageSection}>
          <img src={product.image} alt={product.title} style={styles.image} />
        </div>
        <div style={styles.infoSection}>
          <h1 style={styles.title}>{product.title}</h1>
          <p style={styles.description}>{product.description}</p>
          <h2 style={styles.price}>${product.price}</h2>
          <div style={styles.buttonGroup}>
            <button style={styles.cartBtn} onClick={addToCart}>Add to Cart</button>
            <button style={styles.buyBtn} onClick={buyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f9f9f9',
    color: '#000',
    minHeight: '100vh',
    padding: '6rem 2rem',
    fontFamily: 'Segoe UI, sans-serif'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '2rem',
    alignItems: 'flex-start',
    animation: 'fadeIn 0.6s ease-in-out'
  },
  imageSection: {
  flex: '1 1 40%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '12px', 
  overflow: 'hidden',   
  boxShadow: '0 0 20px rgba(0, 255, 157, 1)',
},

image: {
  width: '100%',
  maxWidth: '300px',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '12px',
  boxShadow: '0 0 20px rgba(0, 255, 157, 0.4)',
  transition: 'transform 0.3s ease',
  transform: 'scale(1)',
},
image: {
  
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'scale(1.05)'
  }
},

  infoSection: {
    flex: '1 1 50%',
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#0a0a0a'
  },
  description: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  price: {
    fontSize: '1.8rem',
    color: '#00cc7d',
    marginBottom: '2rem'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  cartBtn: {
    backgroundColor: '#00ff9d',
    color: '#000',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s ease',
    boxShadow: '0 0 12px #00ff9d66',
    fontSize: '1rem',
  },
  buyBtn: {
    backgroundColor: '#00cc7d',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s ease',
    boxShadow: '0 0 12px #00cc7d66',
    fontSize: '1rem',
  },
  loading: {
    fontSize: '1.5rem',
    textAlign: 'center',
    padding: '5rem'
  }
};

// Optional: Add animation keyframe via CSS
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`, styleSheet.cssRules.length);

export default ProductPage;
