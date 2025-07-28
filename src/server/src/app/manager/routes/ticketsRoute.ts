import express from "express";
import {
	addTicket,
	deleteTicket,
	getAllTickets,
	getTicketBasedOnId,
	updateTicket,
} from "../controllers/ticketsController";
import verifyToken from "../../../middleware/authMiddlewareManager";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = express.Router();
route.use(authMiddlewareManager)

route.get("/", verifyToken, getAllTickets);
route.get("/:id", verifyToken, getTicketBasedOnId);
route.post("/", verifyToken, addTicket);
route.patch("/:id", verifyToken, updateTicket);
route.delete("/:id", verifyToken, deleteTicket);

export default route;
