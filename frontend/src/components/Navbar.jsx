import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
    window.dispatchEvent(new Event('storage')); // Notify components of state changes
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark glass-navbar py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="gradient-bg d-flex align-items-center justify-content-center rounded-circle" style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-book-half text-white fs-5"></i>
          </div>
          <span className="heading-font fw-bold text-white fs-4">Libri<span className="text-info">AI</span></span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 ms-lg-3">
            <li className="nav-item">
              <Link className={`nav-link text-white-50 px-3 rounded-pill ${isActive('/') ? 'text-white bg-primary bg-opacity-25' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white-50 px-3 rounded-pill ${isActive('/search') ? 'text-white bg-primary bg-opacity-25' : ''}`} to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white-50 px-3 rounded-pill ${isActive('/books') ? 'text-white bg-primary bg-opacity-25' : ''}`} to="/books">Book Catalog</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white-50 px-3 rounded-pill ${isActive('/ai-chat') ? 'text-white bg-primary bg-opacity-25' : ''}`} to="/ai-chat">
                <i className="bi bi-robot me-1"></i> AI Assistant
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white-50 px-3 rounded-pill ${isActive('/faq') ? 'text-white bg-primary bg-opacity-25' : ''}`} to="/faq">FAQs</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* Theme Toggle */}
            <button 
              className="btn btn-link text-white p-2 theme-switch" 
              onClick={toggleDarkMode}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <i className="bi bi-sun-fill text-warning fs-5"></i>
              ) : (
                <i className="bi bi-moon-stars-fill text-info fs-5"></i>
              )}
            </button>

            {/* Admin Controls */}
            {isAdmin ? (
              <>
                <Link className="btn btn-outline-info rounded-pill px-4 d-flex align-items-center gap-2" to="/admin">
                  <i className="bi bi-grid-1x2-fill"></i> Admin Panel
                </Link>
                <button className="btn btn-danger rounded-pill px-4" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-outline-light rounded-pill px-4" to="/admin-login">
                Librarian Portal
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
