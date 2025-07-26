import React, { useState, useEffect, createContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

import { getToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "cashier" | "manager";
  exp?: number;
  token?: string;
}

interface AuthContextType {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  isCashier: boolean;
  isManager: boolean;
  hasPermission: (requiredRole: "cashier" | "manager") => boolean;
}

export const StaffAuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const StaffAuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper functions for role checking
  const isCashier = auth?.role === "cashier";
  const isManager = auth?.role === "manager";

  const hasPermission = (requiredRole: "cashier" | "manager") => {
    if (!auth) return false;
    if (requiredRole === "manager") {
      return auth.role === "manager";
    }
    // Cashiers can access cashier features, managers can access both
    return auth.role === requiredRole || auth.role === "manager";
  };

  useEffect(() => {
    const token = getToken();

    if (token) {
      try {
        const decoded = jwtDecode(token) as {
          exp: number;
          role?: "cashier" | "manager";
          id?: number;
          name?: string;
          email?: string;
        };
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          const userInfoString = localStorage.getItem("user");

          if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            setAuth({
              ...userInfo,
              role: decoded.role || userInfo.role || "cashier", // Default to cashier if no role
              exp: decoded.exp,
              token
            });
          } else {
            setAuth({
              id: decoded.id || 0,
              name: decoded.name || "Staff User",
              email: decoded.email || "",
              role: decoded.role || "cashier",
              exp: decoded.exp,
              token
            });
          }

          // Auto logout timer
          const timeout = (decoded.exp - now) * 1000;
          setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setAuth(null);
            navigate(`${isCashier ? "/cashier" : "/manager"}/auth`);
          }, timeout);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuth(null);
          navigate(`${isCashier ? "/cashier" : "/manager"}/auth`);
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth(null);
        navigate(`${isCashier ? "/cashier" : "/manager"}/auth`);
      }
    } else {
      setAuth(null);
    }

    setLoading(false);
  }, [navigate]);

  return (
    <StaffAuthContext.Provider value={{
      auth,
      setAuth,
      loading,
      isCashier,
      isManager,
      hasPermission
    }}>
      {children}
    </StaffAuthContext.Provider>
  );
};

// Default export for easier imports
export default StaffAuthContext;
