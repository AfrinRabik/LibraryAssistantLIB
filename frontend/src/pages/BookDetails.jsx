import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const data = await bookService.getBookById(id);
        setBook(data);
      } catch (err) {
        console.error(err);
        setError('Book not found or server is unreachable.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleAskAI = () => {
    if (book) {
      navigate(`/ai-chat?prefill=${encodeURIComponent(`Explain why I should read ${book.title} by ${book.author} and detail its core concepts.`)}`);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center fade-in">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container py-5 text-center fade-in">
        <div className="glass-card p-5 border-0 d-inline-block" style={{ maxWidth: '500px' }}>
          <i className="bi bi-exclamation-octagon display-4 text-danger mb-3"></i>
          <h3 className="fw-bold mb-2">Failed to load details</h3>
          <p className="text-muted mb-4">{error || 'This book could not be found.'}</p>
          <Link to="/books" className="btn btn-primary rounded-pill px-4">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Cover image fallback
  const coverImage = book.imageUrl || `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600`;

  // Parse shelf letter for map highlights (e.g. A-101 -> A, SE-201 -> SE)
  const getShelfSection = (shelf) => {
    if (!shelf) return 'A';
    return shelf.split('-')[0].toUpperCase();
  };
  const section = getShelfSection(book.shelfNumber);

  // Simple structure representing library sections
  const libraryMapSections = ['A', 'B', 'DB', 'SE', 'P', 'F', 'AI', 'ML', 'NW', 'OS'];

  return (
    <div className="container py-5 fade-in">
      <div className="mb-4">
        <Link to="/books" className="text-decoration-none text-muted">
          <i className="bi bi-arrow-left me-1"></i> Back to Catalog
        </Link>
      </div>

      <div className="row g-5">
        {/* Book Image */}
        <div className="col-lg-4 text-center">
          <div className="glass-card p-3 border-0 rounded-4 shadow mb-4" style={{ display: 'inline-block' }}>
            <img 
              src={coverImage} 
              alt={book.title} 
              className="img-fluid rounded-3"
              style={{ maxHeight: '420px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
              onError={(e) => {
                e.target.src = `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600`;
              }}
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-2">
            <button className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center gap-2 py-3" onClick={handleAskAI}>
              <i className="bi bi-robot"></i> Ask AI Assistant About This Book
            </button>
            {isAdmin && (
              <Link to={`/admin/edit-book/${book.id}`} className="btn btn-outline-info rounded-pill py-2">
                <i className="bi bi-pencil-square me-1"></i> Edit Book Details
              </Link>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div className="col-lg-8">
          <div className="badge bg-secondary text-white rounded-pill px-3 py-1.5 mb-3">{book.category}</div>
          <h1 className="display-5 fw-extrabold heading-font mb-2">{book.title}</h1>
          <h4 className="text-primary mb-4">by {book.author}</h4>

          <div className="row g-4 mb-4">
            <div className="col-md-6 col-lg-3 col-6">
              <div className="border border-secondary border-opacity-10 rounded-3 p-3 text-center">
                <small className="text-muted d-block text-uppercase mb-1">Availability</small>
                <span className={`badge rounded-pill ${book.availability ? 'bg-success' : 'bg-danger'}`}>
                  {book.availability ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-6">
              <div className="border border-secondary border-opacity-10 rounded-3 p-3 text-center">
                <small className="text-muted d-block text-uppercase mb-1">Shelf Number</small>
                <strong className="text-info">{book.shelfNumber || 'N/A'}</strong>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-6">
              <div className="border border-secondary border-opacity-10 rounded-3 p-3 text-center">
                <small className="text-muted d-block text-uppercase mb-1">Stock Quantity</small>
                <strong>{book.quantity}</strong>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-6">
              <div className="border border-secondary border-opacity-10 rounded-3 p-3 text-center">
                <small className="text-muted d-block text-uppercase mb-1">Publisher</small>
                <span className="text-truncate d-block" title={book.publisher}>{book.publisher || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold heading-font mb-3">Book Description</h5>
            <p className="text-muted lh-lg" style={{ whiteSpace: 'pre-wrap' }}>
              {book.description || 'No description available for this book.'}
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <h5 className="fw-bold heading-font mb-3">Book Specifications</h5>
              <table className="table table-borderless text-muted mb-0">
                <tbody>
                  <tr>
                    <td className="ps-0 py-1" style={{ width: '120px' }}>ISBN-13:</td>
                    <td className="py-1 text-white">{book.isbn || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="ps-0 py-1">Publisher:</td>
                    <td className="py-1 text-white">{book.publisher || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="ps-0 py-1">Shelf Code:</td>
                    <td className="py-1 text-white">{book.shelfNumber || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Visual Floor Map Location (WOW factor!) */}
            <div className="col-md-6">
              <h5 className="fw-bold heading-font mb-3">Location inside Library</h5>
              <div className="glass-card p-3 border-0 bg-opacity-25 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">Interactive Floor Layout (2nd Floor)</small>
                  <span className="badge bg-primary">Zone {section}</span>
                </div>
                <div className="bg-dark p-3 rounded border border-secondary border-opacity-10 d-grid" style={{
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '8px',
                  minHeight: '120px'
                }}>
                  {libraryMapSections.map((sec) => (
                    <div 
                      key={sec}
                      className={`d-flex align-items-center justify-content-center rounded fw-bold text-center`}
                      style={{
                        height: '40px',
                        fontSize: '0.85rem',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: sec === section ? 'rgba(99, 102, 241, 0.8)' : 'rgba(255, 255, 255, 0.05)',
                        color: sec === section ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                        boxShadow: sec === section ? '0 0 10px rgba(99, 102, 241, 0.5)' : 'none',
                        transform: sec === section ? 'scale(1.05)' : 'none'
                      }}
                    >
                      {sec}
                    </div>
                  ))}
                </div>
                <div className="d-flex gap-2 align-items-center mt-2 small text-muted">
                  <i className="bi bi-info-circle text-info"></i>
                  <span>Locate Shelf <strong>{book.shelfNumber}</strong> in the highlighted zone.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
