import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h5>Contact Us</h5>
          <p>Email: sakhamudivivek@gmail.com</p>
          <p>Phone: +91 8639068982</p>
          <p>Location: Hyderabad, India</p>
        </div>

        <div className="footer-section">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a href="https://github.com/vivekchowdary12" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/vivek-sakhamudi-a079a1307/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sakhamudi vivek. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
