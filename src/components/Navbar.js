import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    const match = products.find((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (match) {
      navigate(`/product/${match.id}`);
    } else {
      alert("No matching product found");
    }
  };

  return (
    <>
      <div style={{ height: "70px" }}></div>

      <nav className="navbar navbar-expand-lg custom-navbar fixed-top bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            ShopSphere
          </Link>
          <button
            className="navbar-toggler mobile-menu-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav-links navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  <i className="fas fa-info-circle"></i> About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/home"
                >
                  <i className="fas fa-store"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  <i className="fa-solid fa-right-to-bracket"></i>{" "}
                  <b>Register Here</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact">
                  <i className="fas fa-phone"></i> Contact
                </Link>
              </li>
            </ul>
            <div className="d-flex gap-10px">
              <form className="d-flex " role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
