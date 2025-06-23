import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/manager/Main";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default ManagerRoutes;
