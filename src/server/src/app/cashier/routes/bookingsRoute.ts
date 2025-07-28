import express from "express";
import {
	addBookingByStaff,
	deleteBookingByStaff,
	getAllBookingsForUser,
	getBookingBasedOnId,
	updateBookingByStaff,
} from "../controllers/bookingsController";
import authMiddlewareCashier from "../../../middleware/authMiddlewareCashier";

const route = express.Router();
route.use(authMiddlewareCashier)

route.get("/",  getAllBookingsForUser);
route.get("/:id",  getBookingBasedOnId);
route.post("/booking", addBookingByStaff);
route.patch("/staff/:id",  updateBookingByStaff);
route.patch("/staff/:id",  deleteBookingByStaff);
export default route;
