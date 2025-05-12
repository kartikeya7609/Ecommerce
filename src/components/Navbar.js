import '../App.css';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <a className="nav-brand" href="/">ShopSphere</a>
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
                <a className="nav-link" href="/">
                  <i className="fas fa-info-circle"></i> About
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">
                  <i className="fas fa-store"></i> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <i class="fa-solid fa-right-to-bracket"></i> Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  <i class="fa-solid fa-right-to-bracket"></i> <b>Register Here</b>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  <i className="fas fa-phone"></i> Contact
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
