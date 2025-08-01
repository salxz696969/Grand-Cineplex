import express from "express";
import { getAllBookings } from "../controllers/bookingsController";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = express.Router();
route.use(authMiddlewareManager);

route.get("/", getAllBookings);
export default route;
