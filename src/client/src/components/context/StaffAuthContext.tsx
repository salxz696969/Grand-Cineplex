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

  // Function to check and set authentication
  const checkAuth = () => {
    console.log("StaffAuthContext: checkAuth called");
    const token = getToken();
    console.log("StaffAuthContext: Checking token:", token ? "exists" : "not found");

    if (token) {
      try {
        // 1. Decode JWT Token
        const decoded = jwtDecode(token) as {
          exp: number;
          role?: "cashier" | "manager";
          id?: number;
          name?: string;
          email?: string;
        };
        console.log("StaffAuthContext: Decoded token:", decoded);

        // 2. Check Token Expiration
        const now = Date.now() / 1000;
        console.log("StaffAuthContext: Token expiration check:", { exp: decoded.exp, now, isValid: decoded.exp > now });

        if (decoded.exp > now) {

          // 3. Extract User Data
          const userInfoString = localStorage.getItem("user");
          console.log("StaffAuthContext: User info from localStorage:", userInfoString);

          if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            const userData = {
              ...userInfo,
              role: decoded.role || userInfo.role,
              exp: decoded.exp,
              token
            };

            const path = window.location.pathname;
            if (path.startsWith('/cashier') && userData.role === 'manager') {
              navigate('/cashier/auth');
            } else if (path.startsWith('/manager') && userData.role === 'cashier') {
              navigate('/manager/auth');
            }
            console.log("StaffAuthContext: Setting auth with user data:", userData);
            setAuth(userData);

            // 4. Set Auto-Logout Timer
            const timeout = (decoded.exp - now) * 1000;
            setTimeout(() => {
              console.log("StaffAuthContext: Token expired, logging out");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setAuth(null);
              // Redirect based on current path
              const currentPath = window.location.pathname;
              if (currentPath.startsWith("/cashier")) {
                navigate("/cashier/auth");
              } else if (currentPath.startsWith("/manager")) {
                navigate("/manager/auth");
              }
            }, timeout);
          } else {
            const userData = {
              id: decoded.id || 0,
              name: decoded.name || "Staff User",
              email: decoded.email || "",
              role: decoded.role || "cashier",
              exp: decoded.exp,
              token
            };
            console.log("StaffAuthContext: Setting auth with decoded data:", userData);
            setAuth(userData);

            // Auto logout timer
            const timeout = (decoded.exp - now) * 1000;
            setTimeout(() => {
              console.log("StaffAuthContext: Token expired, logging out");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setAuth(null);
              // Redirect based on current path
              const currentPath = window.location.pathname;
              if (currentPath.startsWith("/cashier")) {
                navigate("/cashier/auth");
              } else if (currentPath.startsWith("/manager")) {
                navigate("/manager/auth");
              }
            }, timeout);
          }
        } else {
          console.log("StaffAuthContext: Token expired, clearing auth");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuth(null);
          // Redirect based on current path
          const currentPath = window.location.pathname;
          if (currentPath.startsWith("/cashier")) {
            navigate("/cashier/auth");
          } else if (currentPath.startsWith("/manager")) {
            navigate("/manager/auth");
          }
        }
      } catch (err) {
        console.error("StaffAuthContext: Error decoding token:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth(null);
        // Redirect based on current path
        const currentPath = window.location.pathname;
        if (currentPath.startsWith("/cashier")) {
          navigate("/cashier/auth");
        } else if (currentPath.startsWith("/manager")) {
          navigate("/manager/auth");
        }
      }
    } else {
      console.log("StaffAuthContext: No token found, setting auth to null");
      setAuth(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("StaffAuthContext: useEffect triggered");
    checkAuth();

    // Listen for storage changes (when token is set/removed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        console.log("StaffAuthContext: Storage changed, re-checking auth");
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  console.log("StaffAuthContext: Current state:", { auth, loading, isCashier, isManager });

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
