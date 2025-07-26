import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/manager/Main";
import Auth from "../pages/manager/Auth";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default ManagerRoutes;
