// I have not did this , just put it default

import express from "express";
import {
  addTicket,
  deleteTicket,
  getAllTickets,
  getTicketBasedOnId,
  updateTicket,
} from "../controllers/ticketsController";
import verifyToken from "../../../middleware/authMiddlewareManager";
const route = express.Router();

// All ticket routes are unused in customer interface
// route.get("/", verifyToken, getAllTickets); // UNUSED
// route.get("/:id", verifyToken, getTicketBasedOnId); // UNUSED
// route.post("/", verifyToken, addTicket); // UNUSED
// route.patch("/:id", verifyToken, updateTicket); // UNUSED
// route.delete("/:id", verifyToken, deleteTicket); // UNUSED

export default route;
