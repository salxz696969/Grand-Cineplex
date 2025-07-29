import React from "react";
import { Routes, Route } from "react-router-dom";
import { StaffAuthProvider } from "../components/context/StaffAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Movies from "../pages/cashier/Movies";
import MovieDetail from "../pages/cashier/MovieDetail";
import { SeatSelection } from "../pages/cashier/SeatSelection";
import { Payment } from "../pages/cashier/Payment";
import Auth from "../pages/cashier/Auth";

const CashierRoutes = () => {
  return (
    <StaffAuthProvider>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute requiredRole="cashier">
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail/movie/:id/:screeningDate"
          element={
            <ProtectedRoute requiredRole="cashier">
              <MovieDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seats/:id"
          element={
            <ProtectedRoute requiredRole="cashier">
              <SeatSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute requiredRole="cashier">
              <Payment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </StaffAuthProvider>
  );
};

export default CashierRoutes;
