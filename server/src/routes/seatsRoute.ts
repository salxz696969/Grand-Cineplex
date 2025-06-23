import express from "express";
import { addSeat, deleteSeat, getAllSeatsBasedOnShowTime, updateSeat } from "../controllers/seatsController";

const route = express.Router();

route.get("/available-seats/:id", getAllSeatsBasedOnShowTime)
route.post("/", addSeat)
route.patch("/:id", updateSeat)
route.delete("/:id", deleteSeat)
export default route;