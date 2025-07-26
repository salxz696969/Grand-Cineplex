import React, { useState, useEffect, createContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

import { getToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  exp?: number;
  token?: string;
}

interface AuthContextType {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (token) {
      try {
        const decoded = jwtDecode(token) as { exp: number };
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          const userInfoString = localStorage.getItem("user");

          if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            setAuth({ ...userInfo, exp: decoded.exp, token });
          } else {
            setAuth({ id: 0, name: "User", email: "", exp: decoded.exp, token });
          }

          // Auto logout timer
          const timeout = (decoded.exp - now) * 1000;
          setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setAuth(null);
            navigate("/auth");
          }, timeout);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuth(null);
          navigate("/auth");
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth(null);
        navigate("/auth");
      }
    } else {
      setAuth(null);
    }

    setLoading(false);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
