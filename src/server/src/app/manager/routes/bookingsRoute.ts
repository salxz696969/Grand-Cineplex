import express from "express";
import {
	addBookingByStaff,
	deleteBookingByStaff,
	getAllBookings,
	getAllBookingsForUser,
	getBookingBasedOnId,
	updateBookingByStaff,
} from "../controllers/bookingsController";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = express.Router();
route.use(authMiddlewareManager)

route.get("/", getAllBookings);
// route.get("/:id",  getBookingBasedOnId);
route.post("/staff",  addBookingByStaff);
route.patch("/staff/:id",  updateBookingByStaff);
route.patch("/staff/:id",  deleteBookingByStaff);
export default route;
