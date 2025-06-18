import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/customer/Home";
import Theatres from "../pages/customer/Theatres";
import Seats from "../pages/customer/Seats";
import Info from "../pages/customer/Info";
import SignUp from "../pages/customer/SignUp";
import SignIn from "../pages/customer/SignIn";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/theatres" element={<Theatres />} />
      <Route path="/seats" element={<Seats />} />
      <Route path="/info" element={<Info />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default CustomerRoutes;
