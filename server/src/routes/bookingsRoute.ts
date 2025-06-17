import express from "express";
import { getAllBookingsForUser, getBookingBasedOnId } from "../controllers/bookingsController";
import verifyToken from "../middleware/verifyToken";

const route = express.Router();

route.get("/", verifyToken,getAllBookingsForUser)
route.get("/:id", verifyToken,getBookingBasedOnId)

export default route;