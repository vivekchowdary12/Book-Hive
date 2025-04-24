import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Carosel/carosel.css'; 

const Carosel = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://openlibrary.org/subjects/fiction.json?limit=10`);
        setBooks(res.data.works);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ marginTop: '20px' }}>
      <div style={{ width: '90%', maxWidth: '1200px' }}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <Carousel
            fade
            interval={1000}
            pause="hover"
            controls={false} 
            indicators={true}
            className="custom-carousel"
          >
            {books.map((book, idx) => (
              <Carousel.Item key={idx}>
                <div
                  className="row align-items-center justify-content-center p-4"
                  style={{
                    background: 'linear-gradient(to right, #f0f2f5, #e3e7ed)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="col-md-6 col-sm-12 mb-3 mb-md-0 text-start">
                    <h4 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{book.title}</h4>
                    <p style={{ color: '#555', fontWeight: '500' }}>
                      {book.authors?.map((author) => author.name).join(', ') || 'Unknown Author'}
                    </p>
                    <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                      {book.subject?.slice(0, 3).join(', ') || 'No description available.'}
                    </p>
                  </div>
                  <div className="col-md-6 col-sm-12 text-end">
                    {book.cover_id ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                        alt={book.title}
                        className="img-fluid"
                        style={{
                          height: '300px',
                          objectFit: 'contain',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        }}
                      />
                    ) : (
                      <div
                        className="bg-secondary text-white d-flex align-items-center justify-content-center"
                        style={{
                          height: '300px',
                          width: '200px',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Carosel;
