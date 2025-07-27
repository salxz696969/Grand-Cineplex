import express, { Request, Response, NextFunction } from "express";
import { getBookingBasedOnId, createBooking, viewBookingHistory } from "../controllers/bookingsController";
import authMiddleware from "../../../middleware/authMiddleware";

const route = express.Router();


route.get("/:id", authMiddleware, getBookingBasedOnId);
route.post("/", authMiddleware, createBooking);
route.get("/history", viewBookingHistory);
// Right now let not protect it 

export default route;
