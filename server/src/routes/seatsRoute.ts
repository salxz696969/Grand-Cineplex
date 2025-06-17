import express from "express";
import { getAllSeatsBasedOnShowTime } from "../controllers/seatsController";

const route = express.Router();

route.get("/available-seats/:id", getAllSeatsBasedOnShowTime)

export default route;