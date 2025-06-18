import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/cashier/Home";
import CashierSignIn from "../pages/cashier/SignIn";

const CashierRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<CashierSignIn />} />
    {/* //   <Route path="/booking" element={<CreateBooking />} />
    //   <Route path="/seats" element={<SelectSeats />} />
    //   <Route path="/payment" element={<ProcessPayment />} /> */}
    </Routes>
  );
};

export default CashierRoutes;
