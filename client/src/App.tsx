import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRoutes from './routes/CustomerRoutes';
import CashierRoutes from './routes/CashierRoutes';
import ManagerRoutes from './routes/ManagerRoutes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/cashier/*" element={<CashierRoutes />} />
        <Route path="/manager/*" element={<ManagerRoutes />} />
      </Routes>
    </Router>
  );
}
