import express from "express";
import {
  addSeat,
  deleteSeat,
  getAllSeatsBasedOnShowTime,
  updateSeat,
} from "../controllers/seatsController";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = express.Router();
route.use(authMiddlewareManager)

route.get("/available-seats/:id", getAllSeatsBasedOnShowTime);
route.post("/", addSeat);
route.patch("/:id", updateSeat);
route.delete("/:id", deleteSeat);
export default route;
