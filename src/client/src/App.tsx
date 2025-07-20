import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerRoutes from "./routes/CustomerRoutes";
import CashierRoutes from "./routes/CashierRoutes";
import ManagerRoutes from "./routes/ManagerRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<CustomerRoutes />} />
      <Route path="/cashier/*" element={<CashierRoutes />} />
      <Route path="/manager/*" element={<ManagerRoutes />} />
    </Routes>
  );
}
