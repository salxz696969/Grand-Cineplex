import express from "express";
import {
  bookSeats,
  selectSeat,
  getAllSeatsBasedOnShowTime,
} from "../controllers/seatsController";

const route = express.Router();

route.get("/screening/:id", getAllSeatsBasedOnShowTime);
route.post("/selected", selectSeat);
route.post("/booked", bookSeats);


export default route;
