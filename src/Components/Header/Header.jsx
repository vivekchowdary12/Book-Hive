import React from 'react';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: 'rgba(0, 123, 255, 0.85)' }} variant="dark">
        <Container>
          <Navbar.Brand href="#">📚 Book Hive</Navbar.Brand>
          <Navbar.Toggle aria-controls="bookhive-navbar" />
          <Navbar.Collapse id="bookhive-navbar" className="justify-content-between">
            <Form className="d-flex mx-auto" style={{ maxWidth: '400px', width: '100%' }}>

            </Form>
            <Nav>
              <Link to="/Sell" className="btn btn-outline-light ms-2">Sell Book</Link>
            </Nav>

            <Nav>
              <Link to="/login" className="btn btn-outline-light ms-2">Login</Link>
              <Link to="/Signup" className="btn btn-outline-light ms-2">Sign Up</Link>
              
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
