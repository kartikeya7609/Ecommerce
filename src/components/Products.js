import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);

  const API_URL = "https://fakestoreapi.com/products";

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🧊 Our Glassy Products</h1>

      {/* Toast Message */}
      <div
        style={{ ...styles.toast, ...(toastVisible ? {} : styles.toastHidden) }}
      >
        ✅ Item added to cart!
      </div>

      {loading ? (
        <p style={styles.loading}>Loading products...</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  const [hover, setHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(hover ? styles.cardHover : {}),
      }}
      onClick={() => {
        window.location.href = `/product/${product.id}`;
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={product.image} alt={product.title} style={styles.image} />
      <h2 style={styles.title}>{product.title}</h2>
      <p style={styles.description}>{product.description.slice(0, 100)}...</p>
      <p style={styles.price}>${product.price}</p>
      <button
        style={{
          ...styles.button,
          ...(buttonHover ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};

const styles = {
  page: {
    background: `url("https://images.unsplash.com/photo-1526403226271-3e4fdc6c7795") center/cover no-repeat`,
    minHeight: "100vh",
    padding: "4rem 2rem",
    backdropFilter: "blur(6px)",
  },
  heading: {
    fontSize: "2.8rem",
    textAlign: "center",
    marginBottom: "3rem",
    color: "white",
    fontWeight: 700,
    textShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#eee",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    padding: "0 1rem",
  },
  card: {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.12)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.7)",
    padding: "1.2rem",
    textAlign: "center",
    color: "white",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 12px 24px rgba(255,255,255,1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "12px",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: "600",
    margin: "1rem 0 0.5rem",
  },
  description: {
    fontSize: "0.85rem",
    color: "#ddd",
    marginBottom: "0.8rem",
  },
  price: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#f1f1f1",
  },
  button: {
    background: "#00ff9d",
    border: "none",
    color: "white",
    transition: "background 0.3s",
    padding: "0.5rem 1.5rem",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    marginTop: "1rem",
  },
  buttonHover: {
    background: "#00e68a",
    color: "#fff",
  },
  toast: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
    zIndex: 1050,
    opacity: 1,
    transition: "opacity 0.5s ease-in-out",
  },
  toastHidden: {
    opacity: 0,
    pointerEvents: "none",
  },
};

export default Home;
