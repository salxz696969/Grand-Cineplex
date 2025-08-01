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
route.use(authMiddlewareCashier);

// All ticket routes are unused in cashier interface
// route.get("/",  getAllTickets); // UNUSED
// route.get("/:id",  getTicketBasedOnId); // UNUSED
// route.post("/",  addTicket); // UNUSED
// route.patch("/:id",  updateTicket); // UNUSED
// route.delete("/:id",  deleteTicket); // UNUSED

export default route;
