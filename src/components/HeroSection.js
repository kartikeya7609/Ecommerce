import React, { useEffect } from 'react';
import '../App.css';

export default function HeroSection() {
 
  useEffect(() => {
    const typingText = document.querySelector('.typing-text');
    const texts = [
      "Great Deals Every Day",
      "Fast & Free Delivery",
      "Trusted by Thousands",
      "Shop Smart with ShopSphere"
    ];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentText = texts[currentTextIndex];

      if (isDeleting) {
        typingText.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        typingText.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
  }, []);

  return (
    <section id="home" className="hero d-flex align-items-center justify-content-center text-center text-white">
      <div className="hero-content container">
        <h1 className="display-4 fw-bold">
          Welcome to <span className="highlight">ShopSphere</span>
        </h1>
        <p className="subtitle fs-4">
          <i className="fas fa-shopping-cart me-2"></i>Electronics, Fashion, Home & More
        </p>

        <div className="typing-container">
          <span className="typing-text"></span>
          <span className="typing-cursor">|</span>
        </div>

        <p className="location mt-3">
          <i className="fas fa-map-marker-alt me-2"></i>Delivering Across India
        </p>

        <a href="#products" className="btn cta-button mt-4">
          <i className="fas fa-arrow-right me-2"></i>Start Shopping
        </a>
      </div>
    </section>
  );
}


