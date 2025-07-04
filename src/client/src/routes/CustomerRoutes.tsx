import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/customer/Home";
import TheatrePage from "../pages/customer/TheatrePage";
import SignUp from "../pages/customer/SignUp";
import SignIn from "../pages/customer/SignIn";
import SeatContainer from "../pages/customer/SeatContainer";
import PaymentContainer from "../pages/customer/PaymentContainer";
import MovieSelectedContainer from "../pages/customer/MovieSelectedContainer";

const CustomerRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theatres" element={<TheatrePage/>} />
          <Route path="/seats/:movieId/:cinemaId/:time" element={<SeatContainer />} />
          <Route path="/payment" element={<PaymentContainer />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/movie/:id" element={<MovieSelectedContainer/>} />
      </Routes>
  );
};

export default CustomerRoutes;
