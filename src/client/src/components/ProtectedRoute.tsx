import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { StaffAuthContext } from "./context/StaffAuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: "cashier" | "manager";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const context = useContext(StaffAuthContext);
    const location = useLocation();

    console.log("ProtectedRoute: Checking access for", requiredRole, "at", location.pathname);
    console.log("ProtectedRoute: Context available:", !!context);

    if (!context) {
        console.log("ProtectedRoute: No context, redirecting to auth");
        // If StaffAuthContext is not available, redirect to auth
        return <Navigate to={`/${requiredRole}/auth`} replace />;
    }

    const { auth, loading, hasPermission } = context;

    console.log("ProtectedRoute: Auth state:", { auth: !!auth, loading, hasPermission: hasPermission(requiredRole) });

    // Show loading while checking authentication
    if (loading) {
        console.log("ProtectedRoute: Loading, showing spinner");
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // If not authenticated, redirect to auth page
    if (!auth) {
        console.log("ProtectedRoute: Not authenticated, redirecting to auth");
        return <Navigate to={`/${requiredRole}/auth`} replace />;
    }

    // If user doesn't have permission for this role, redirect to auth
    if (!hasPermission(requiredRole)) {
        console.log("ProtectedRoute: No permission for", requiredRole, "redirecting to auth");
        return <Navigate to={`/${requiredRole}/auth`} replace />;
    }

    console.log("ProtectedRoute: Access granted, rendering children");
    // If authenticated and has permission, render the children
    return <>{children}</>;
} 