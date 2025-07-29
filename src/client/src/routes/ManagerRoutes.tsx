import React from "react";
import { Routes, Route } from "react-router-dom";
import { StaffAuthProvider } from "../components/context/StaffAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Main from "../pages/manager/Main";
import Auth from "../pages/manager/Auth";

const ManagerRoutes = () => {
  return (
    <StaffAuthProvider>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute requiredRole="manager">
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </StaffAuthProvider>
  );
};

export default ManagerRoutes;
