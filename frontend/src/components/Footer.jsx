import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-5 mt-5 border-top border-secondary border-opacity-10" style={{ background: 'rgba(11, 15, 25, 0.4)' }}>
      <div className="container">
        <div className="row g-4 justify-content-between">
          <div className="col-lg-4 col-md-6">
            <h5 className="heading-font fw-bold mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-book-half text-primary fs-4"></i>
              <span>Libri<span className="text-info">AI</span></span>
            </h5>
            <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
              Your intelligent library assistant and modern inventory system. Connecting students with books and knowledge through AI integration.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-secondary hover-scale"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-secondary hover-scale"><i className="bi bi-twitter fs-5"></i></a>
              <a href="#" className="text-secondary hover-scale"><i className="bi bi-github fs-5"></i></a>
              <a href="#" className="text-secondary hover-scale"><i className="bi bi-linkedin fs-5"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-3">
            <h6 className="heading-font fw-bold mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
              <li><Link to="/" className="text-muted text-decoration-none hover-scale">Home</Link></li>
              <li><Link to="/books" className="text-muted text-decoration-none hover-scale">Catalog</Link></li>
              <li><Link to="/ai-chat" className="text-muted text-decoration-none hover-scale">AI Chat</Link></li>
              <li><Link to="/faq" className="text-muted text-decoration-none hover-scale">FAQs</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h6 className="heading-font fw-bold mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Contact Info</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-muted" style={{ fontSize: '0.9rem' }}>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt-fill text-info"></i> Central Campus, Building B
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill text-info"></i> +1-555-0199
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill text-info"></i> support@library.edu
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-clock-fill text-info"></i> Mon - Fri: 8:00 AM - 8:00 PM
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-secondary border-opacity-10" />
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 text-muted" style={{ fontSize: '0.8rem' }}>
          <span>© {new Date().getFullYear()} LibriAI Library. All rights reserved.</span>
          <div className="d-flex gap-3">
            <a href="#" className="text-muted text-decoration-none">Terms of Use</a>
            <a href="#" className="text-muted text-decoration-none">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
