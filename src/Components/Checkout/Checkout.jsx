import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { Button, Form } from 'react-bootstrap';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const totalAmount = cart.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleBuyNow = () => {
    if (customer.name && customer.email && customer.phone && customer.address) {
      alert(`Thank you, ${customer.name}! Your order has been placed.`);
      // clear cart and form
      localStorage.removeItem('cart');
      setCart([]);
      setCustomer({ name: '', email: '', phone: '', address: '' });
    } else {
      alert('Please fill in all customer details.');
    }
  };

  return (
    <div className="checkout-container container my-5">
      <h3 className="mb-4 text-center">Checkout</h3>
      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="card mb-3 p-2 d-flex flex-row shadow-sm align-items-center">
                <img
                  src={`https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`}
                  alt={item.title}
                  className="img-thumbnail me-3"
                  style={{ width: '100px', height: '150px', objectFit: 'cover' }}
                />
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="mb-1 text-muted">Author: {item.authors?.map((a) => a.name).join(', ')}</p>
                  <p className="mb-0 fw-bold text-success">Price: ${item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary + Customer Details */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="mb-3">Order Summary</h5>
            <p>Total Items: {cart.length}</p>
            <p className="fw-bold">Total Amount: ${totalAmount}</p>
          </div>

          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Customer Details</h5>
            <Form>
              <Form.Group className="mb-2" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Enter shipping address"
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="success" className="w-100" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
