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
route.use(authMiddlewareManager);

// All ticket routes are unused in manager interface
// route.get("/", verifyToken, getAllTickets); // UNUSED
// route.get("/:id", verifyToken, getTicketBasedOnId); // UNUSED
// route.post("/", verifyToken, addTicket); // UNUSED
// route.patch("/:id", verifyToken, updateTicket); // UNUSED
// route.delete("/:id", verifyToken, deleteTicket); // UNUSED

export default route;
