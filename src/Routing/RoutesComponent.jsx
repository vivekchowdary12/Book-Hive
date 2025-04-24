import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Components/Login/Login.jsx';
import Sell from '../Components/Sell/Sell.jsx';
import Carosel from '../Components/Carosel/Carosel.jsx';
import Books from '../Components/Books/Books.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import SignUp from '../Components/Signup/Signup.jsx';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Carosel />
            <Books />
            <Footer />
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/Sell" element={<Sell />} />
      <Route path='/Signup' element={<SignUp />} />
    </Routes>
  );
};

export default RoutesComponent;
