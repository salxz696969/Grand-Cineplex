import express from "express";
import {
  addSeat,
  deleteSeat,
  getAllSeatsBasedOnShowTime,
  updateSeat,
} from "../controllers/seatsController";
import authMiddlewareCashier from "../../../middleware/authMiddlewareCashier";

const route = express.Router();
route.use(authMiddlewareCashier);

route.get("/available-seats/:id", getAllSeatsBasedOnShowTime);
export default route;
