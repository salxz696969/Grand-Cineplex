import express from "express";
import {
	addBookingByStaff,
	deleteBookingByStaff,
	getAllBookingsForUser,
	getBookingBasedOnId,
	updateBookingByStaff,
} from "../controllers/bookingsController";
import verifyToken from "../middleware/verifyToken";

const route = express.Router();

route.get("/", verifyToken, getAllBookingsForUser);
route.get("/:id", verifyToken, getBookingBasedOnId);
route.post("/staff", verifyToken, addBookingByStaff)
route.patch("/staff/:id", verifyToken, updateBookingByStaff); 
route.patch("/staff/:id", verifyToken, deleteBookingByStaff); 
export default route;
