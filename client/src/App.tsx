import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import Theatres from './pages/customer/Theatres';
import Seats from './pages/customer/Seats';
import Info from './pages/customer/Info';
import SignUp from './pages/customer/SignUp';
import SignIn from './pages/customer/SignIn';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/theatres" element={<Theatres />} />
        <Route path="/seats" element={<Seats />} />
        <Route path="/info" element={<Info />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
}
