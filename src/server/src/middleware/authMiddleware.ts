import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "GrandCineplix_CADT";

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("No Authorization header provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    console.error("Invalid token format");
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = parts[1];
  console.log("Token received:", token);

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("Token decoded:", decoded);
    req.user = decoded;
    return next();
  } catch (err: any) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
