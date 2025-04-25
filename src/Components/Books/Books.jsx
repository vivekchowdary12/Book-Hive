import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Books.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const genres = [
  { label: 'Fiction', value: 'fiction' },
  { label: 'Romance', value: 'romance' },
  { label: 'Science Fiction', value: 'science_fiction' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Horror', value: 'horror' },
  { label: 'Mystery', value: 'mystery' },
  { label: 'History', value: 'history' },
  { label: 'Poetry', value: 'poetry' },
];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('fiction');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://openlibrary.org/subjects/${selectedGenre}.json?limit=9`);
        const booksWithPrices = res.data.works.map((book) => ({
          ...book,
          price: (Math.random() * 30 + 5).toFixed(2),
        }));
        setBooks(booksWithPrices);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [selectedGenre]);

  const handleAddToCart = (book) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, book];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${book.title} added to cart!`);
  };

  return (
    <div className="container my-4">
      {/* Header: Genre Selector + Checkout Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <select
          className="form-select"
          style={{ width: '350px' }}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </select>

        <Button variant="success" onClick={() => navigate('/checkout')}>
          Go to Checkout
        </Button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="cards-wrapper d-flex flex-wrap justify-content-center gap-4">
          {books.map((book, index) => (
            <div
              key={index}
              className="card shadow-sm d-flex flex-column justify-content-between"
              style={{
                width: '300px',
                minHeight: '500px',
                borderRadius: '12px',
                backgroundColor: '#f9f9f9',
              }}
            >
              {book.cover_id ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                  alt={book.title}
                  className="card-img-top"
                  style={{
                    height: '220px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                  }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-secondary text-white"
                  style={{
                    height: '220px',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    fontSize: '18px',
                  }}
                >
                  No Image
                </div>
              )}
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <p className="card-text mb-1">
                    <strong>Author:</strong> {book.authors?.map((a) => a.name).join(', ') || 'Unknown'}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Genre:</strong> {book.subject?.slice(0, 2).join(', ') || selectedGenre}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Title:</strong> {book.title}
                  </p>
                  <p className="card-text text-success">
                    <strong>Price:</strong> ${book.price}
                  </p>
                </div>
                <Button variant="primary" onClick={() => handleAddToCart(book)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
