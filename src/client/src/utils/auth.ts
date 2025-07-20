
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  [key: string]: any; 
}

export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function logout(): void {
  localStorage.removeItem("token");
}

export function isAuthenticated(): DecodedToken | false {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now ? decoded : false;
  } catch (err) {
    console.error("Invalid token", err);
    return false;
  }
}
