import express, { Request, Response, NextFunction } from "express";
import {
  getBookingBasedOnId,
  createBooking,
  viewBookingHistory,
} from "../controllers/bookingsController";
import authMiddleware from "../../../middleware/authMiddleware";

const route = express.Router();

route.get("/history", authMiddleware, viewBookingHistory);
route.post("/", authMiddleware, createBooking);
// route.get("/:id", authMiddleware, getBookingBasedOnId); // UNUSED

export default route;
