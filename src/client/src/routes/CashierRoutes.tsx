import React from "react";
import { Routes, Route } from "react-router-dom";
import Movies from "../pages/cashier/Movies";
import MovieDetail from "../pages/cashier/MovieDetail";
import { SeatSelection } from "../pages/cashier/SeatSelection";
import { Payment } from "../pages/cashier/Payment";

const CashierRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="/detail/movie/:id" element={<MovieDetail />} />
      <Route path="/seats" element={<SeatSelection />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};

export default CashierRoutes;
