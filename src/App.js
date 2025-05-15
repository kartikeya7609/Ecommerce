import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import Contact from './components/Contact';
import Products from './components/Products';
import Home from './components/Home';
import Cart from './components/Cart';
import FullPage from './components/FullPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import React, { useState } from 'react';
import ProductPage from './components/FullPage';
function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  return (
    <div className="App">
     <Navbar/>
      <Router>
      <Routes>
<Route path="/product/:id" element={<ProductPage />} />
        <Route path="/" element={<HeroSection />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products"element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={      <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />} />

      </Routes>
    </Router>
     <Footer/>
         </div>
  );
}

export default App;
