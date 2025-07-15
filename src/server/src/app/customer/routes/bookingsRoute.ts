import express, { Request, Response, NextFunction } from "express";
import { getBookingBasedOnId, createBooking } from "../controllers/bookingsController";

// No auth required, optional auth middleware placeholder
const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  next();
};

const route = express.Router();

route.get("/:id", optionalAuth, getBookingBasedOnId);
route.post("/", optionalAuth, createBooking);

export default route;
