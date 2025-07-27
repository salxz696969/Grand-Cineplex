import express from "express";
import {
	addTicket,
	deleteTicket,
	getAllTickets,
	getTicketBasedOnId,
	updateTicket,
} from "../controllers/ticketsController";
import authMiddlewareCashier from "../../../middleware/authMiddlewareCashier";

const route = express.Router();
route.use(authMiddlewareCashier)

route.get("/",  getAllTickets);
route.get("/:id",  getTicketBasedOnId);
route.post("/",  addTicket);
route.patch("/:id",  updateTicket);
route.delete("/:id",  deleteTicket);

export default route;
