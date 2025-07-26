import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/customer/Home";
import SignIn from "../pages/customer/Auth";
import SeatContainer from "../pages/customer/SeatContainer";
import PaymentContainer from "../pages/customer/PaymentContainer";
import MovieSelectedContainer from "../pages/customer/MovieSelectedContainer";
import ForgotPassword from "../pages/customer/ForgotPassword";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/seats/:screeningId" element={<SeatContainer />} />
      {/* <Route path="/payment/:bookingId" element={<PaymentContainer />} /> */}
      <Route path="/payment" element={<PaymentContainer />} />
      <Route path="/auth" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/movie/:id" element={<MovieSelectedContainer />} />
    </Routes>
  );
};
export default CustomerRoutes;
