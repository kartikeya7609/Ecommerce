import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import React from 'react';
function App() {
  return (
    <div className="App">
     <Navbar/>
      <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </Router>
     {/* <HeroSection/> */}
     <Footer/>
         </div>
  );
}

export default App;
