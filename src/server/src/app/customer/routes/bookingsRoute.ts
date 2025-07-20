import express, { Request, Response, NextFunction } from "express";
import { getBookingBasedOnId, createBooking } from "../controllers/bookingsController";
import authMiddleware from "../../../middleware/authMiddleware";

const route = express.Router();


route.get("/:id", authMiddleware, getBookingBasedOnId);
route.post("/", authMiddleware, createBooking);

export default route;
