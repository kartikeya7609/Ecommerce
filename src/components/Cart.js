import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import { useAuth } from "./AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_CONFIG = {
    BASE_URL: "http://localhost:3002",
    CART: "/api/cart",
    AUTH: "/api/auth",
    PRODUCTS: "/api/products",
  };

  useEffect(() => {
    if (isAuthenticated && user && token) {
      fetchCartItems(user.email, token);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user, token]);

  const fetchCartItems = async (email, token) => {
    try {
      setLoading(true);
      console.log("Fetching cart items with token:", token ? "Token exists" : "No token");
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.CART}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: (status) => status < 500,
          timeout: 10000,
        }
      );

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (res.status === 404) {
        setCartItems([]);
        toast.info("Your cart is empty");
        return;
      }

      let cartData = [];
      if (Array.isArray(res.data)) {
        cartData = res.data;
      } else if (res.data?.items) {
        cartData = res.data.items;
      }

      if (cartData.length === 0) {
        setCartItems([]);
        toast.info("Your cart is empty");
        return;
      }

      // Map cart items to the format expected by the component
      const formattedItems = cartData.map(item => ({
        product_id: item.id,
        name: item.title || "Unknown Product",
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || "/logo192.png"
      }));
      
      console.log("Formatted cart items:", formattedItems);
      setCartItems(formattedItems);
    } catch (err) {
      console.error("Error fetching cart:", err);
      if (err.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error("Failed to load cart. Please try again.");
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUnauthorized = () => {
    toast.error("Session expired. Please login again.");
    navigate("/login");
  };

  const updateQuantity = async (productId, delta) => {
    if (!isAuthenticated) {
      toast.error("Please login to update your cart");
      navigate("/login");
      return;
    }

    try {
      const item = cartItems.find((i) => i.product_id === productId);
      if (!item) {
        toast.error("Item not found in cart");
        return;
      }

      const newQuantity = Math.max(1, item.quantity + delta);
      if (newQuantity === item.quantity) return;

      setLoading(true);
      console.log(`Updating quantity for product ${productId} to ${newQuantity}`);
      const response = await axios.put(
        `${API_CONFIG.BASE_URL}${API_CONFIG.CART}/${productId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        }
      );

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        toast.success("Quantity updated successfully");
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
      if (err.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error(
          err.response?.data?.message || "Failed to update quantity."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    if (!isAuthenticated) {
      toast.error("Please login to modify your cart");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      console.log(`Removing product ${productId} from cart`);
      const response = await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.CART}/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        }
      );

      if (response.status === 200) {
        setCartItems((prev) =>
          prev.filter((item) => item.product_id !== productId)
        );
        toast.success("Item removed successfully");
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
      if (err.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error(err.response?.data?.message || "Failed to remove item.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to modify your cart");
      navigate("/login");
      return;
    }

    if (!window.confirm("Are you sure you want to clear your cart?")) return;

    try {
      setLoading(true);
      console.log("Clearing cart");
      
      // Since we don't have a specific clear cart endpoint, we'll remove each item individually
      const deletePromises = cartItems.map(item => 
        axios.delete(
          `${API_CONFIG.BASE_URL}${API_CONFIG.CART}/${item.product_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000,
          }
        )
      );
      
      await Promise.all(deletePromises);
      
      // After all items are removed, update the cart state
      setCartItems([]);
      toast.success("Cart cleared successfully");
    } catch (err) {
      console.error("Failed to clear cart:", err);
      if (err.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error(err.response?.data?.message || "Failed to clear cart.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="cart-loading">
        <div className="loading-spinner"></div>
        <p>Verifying your session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="cart-empty">
        <h2>Please login to view your cart 🔐</h2>
        {process.env.NODE_ENV === "development" && (
          <div className="debug-info">
            <p>Debug Information:</p>
            <p>Token: {token ? "Exists" : "Missing"}</p>
            <p>Email: {user?.email || "Not available"}</p>
          </div>
        )}
        <button
          className="btn-continue-shopping"
          onClick={() => navigate("/login")}
        >
          Login Now
        </button>
      </div>
    );
  }

  if (!loading && cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty 🛒</h2>
        <button
          className="btn-continue-shopping"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <h1 style={styles.heading}>🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty!</p>
      ) : (
        <>
          <div style={styles.grid}>
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                style={{ ...styles.card, animation: "fadeIn 0.4s ease-in-out" }}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={styles.image} 
                  onError={(e) => {
                    // Use a local placeholder image
                    e.target.src = "/logo192.png";
                  }}
                />
                <div style={styles.info}>
                  <h3 style={styles.title}>{item.name}</h3>
                  <p style={styles.price}>
                    ${item.price} × {item.quantity}
                  </p>
                  <div style={styles.quantityControls}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQuantity(item.product_id, -1)}
                      disabled={item.quantity <= 1 || loading}
                    >
                      -
                    </button>
                    <span style={styles.qtyText}>{item.quantity}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQuantity(item.product_id, 1)}
                      disabled={loading}
                    >
                      +
                    </button>
                  </div>
                  <button
                    style={styles.removeBtn}
                    onClick={() => removeItem(item.product_id)}
                    disabled={loading}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.totalContainer}>
            <h2 style={styles.total}>Total: ${getTotal()}</h2>
            <button 
              style={styles.clearBtn} 
              onClick={clearCart}
              disabled={loading || cartItems.length === 0}
            >
              🧹 Clear Cart
            </button>
            <button
              style={styles.clearBtn}
              onClick={() => navigate("/checkout")}
              disabled={loading || cartItems.length === 0}
            >
              💳 Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    backgroundColor: "#1e1a1c",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='4' viewBox='0 0 8 8'%3E%3Cg fill='%23202b45' fill-opacity='1'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E\")",
    backgroundSize: "cover",
    color: "#ffffff",
    minHeight: "100vh",
    padding: "1rem 1.5rem 3rem 1.5rem",
    fontFamily: "Segoe UI, sans-serif",
    transition: "all 0.3s ease",
  },
  heading: {
    fontSize: "2.8rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#00d0ff",
    textShadow: "0 0 10px #00d0ff66",
  },
  empty: {
    textAlign: "center",
    fontSize: "1.4rem",
    color: "#bbb",
    marginTop: "5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "transform 0.2s",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "1rem",
  },
  info: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    flex: 1,
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#ffffff",
  },
  price: {
    fontSize: "1.1rem",
    color: "#00d0ff",
    fontWeight: "bold",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    margin: "0.5rem 0",
  },
  qtyBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255, 255, 255, 0.15)",
    color: "white",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  qtyText: {
    fontSize: "1.1rem",
    fontWeight: "600",
    minWidth: "30px",
    textAlign: "center",
  },
  removeBtn: {
    marginTop: "auto",
    padding: "0.6rem",
    borderRadius: "8px",
    border: "none",
    background: "rgba(255, 59, 59, 0.7)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  totalContainer: {
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "12px",
    padding: "1.5rem",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  total: {
    fontSize: "1.8rem",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: "1rem",
  },
  clearBtn: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    background: "rgba(0, 208, 255, 0.7)",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s",
    marginBottom: "0.5rem",
  },
};

export default Cart;
