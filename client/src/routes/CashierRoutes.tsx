import React from "react";
import { Routes, Route } from "react-router-dom";
import Movies from "../pages/cashier/Movies";
import MovieDetail from "../pages/cashier/MovieDetail";

const CashierRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="/detail" element={<MovieDetail />} />
    </Routes>
  );
};

export default CashierRoutes;
