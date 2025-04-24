import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Sell = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    price: '',
    description: '',
    image: null,
    sellerName: '',
    email: '',
    phone: '',
    city: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const genres = ['Fiction', 'Education', 'Science', 'Biography', 'Comics'];
  const conditions = ['New', 'Like New', 'Good', 'Acceptable'];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Book title is required';
    if (!formData.author) newErrors.author = 'Author name is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Image is required';
    if (!formData.sellerName) newErrors.sellerName = 'Seller name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.city) newErrors.city = 'City is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      setSubmitted(false);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log('Form Data:', formData);
    }
  };

  return (
    <div style={{ backgroundColor: '#e6f7ff', padding: '30px 0' }}>
      <Container className="py-4">
        <h2 className="mb-4 text-center">📚 Sell Your Book</h2>
        {submitted && <Alert variant="success">Book submitted successfully!</Alert>}
        <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">

          {/* Book Info */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  isInvalid={!!errors.author}
                />
                <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category / Genre</Form.Label>
                <Form.Select name="genre" value={formData.genre} onChange={handleChange} isInvalid={!!errors.genre}>
                  <option value="">Select Genre</option>
                  {genres.map((g, idx) => <option key={idx} value={g}>{g}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Condition</Form.Label>
                <Form.Select name="condition" value={formData.condition} onChange={handleChange} isInvalid={!!errors.condition}>
                  <option value="">Select Condition</option>
                  {conditions.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.condition}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Upload Book Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                  isInvalid={!!errors.image}
                />
                <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Book Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          {/* Seller Info */}
          <h5 className="mt-4">👤 Seller Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Seller Name</Form.Label>
                <Form.Control
                  type="text"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  isInvalid={!!errors.sellerName}
                />
                <Form.Control.Feedback type="invalid">{errors.sellerName}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number (optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City / Location</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit Book
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Sell;
