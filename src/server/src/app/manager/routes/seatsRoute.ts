import express from "express";
import {
  addSeat,
  deleteSeat,
  getAllSeatsBasedOnShowTime,
  updateSeat,
} from "../controllers/seatsController";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = express.Router();
route.use(authMiddlewareManager);

// All seat routes are unused in manager interface
// route.get("/available-seats/:id", getAllSeatsBasedOnShowTime); // UNUSED
// route.post("/", addSeat); // UNUSED
// route.patch("/:id", updateSeat); // UNUSED
// route.delete("/:id", deleteSeat); // UNUSED
export default route;
