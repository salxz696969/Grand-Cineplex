import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Theatres from './pages/Theatres';
import Seats from './pages/Seats';
import Info from './pages/Info';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MovieChosen from './pages/MovieChose';

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
        <Route path="/movie/:id" element={<MovieChosen/>} />

      </Routes>
    </Router>
  );
}
