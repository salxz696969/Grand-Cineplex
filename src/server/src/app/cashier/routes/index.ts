import { Router } from "express";
import moviesRoute from "./moviesRoute";
import bookingsRoute from "./bookingsRoute";
import showTimesRoute from "./showTimesRoute";
import seatsRoute from "./seatsRoute";
import usersRoute from "./usersRoute";
import ticketsRoute from "./ticketsRoute";
import paymentRoute from "./paymentRoute";

const router = Router();

router.use("/movies", moviesRoute); // customer can see all movies
router.use("/bookings", bookingsRoute); // customer can see all bookings
router.use("/showtimes", showTimesRoute); // customer can see all showtimes
router.use("/seats", seatsRoute); // customer can see all seats
router.use("/users", usersRoute); // customer can see all users
router.use("/tickets", ticketsRoute); // customer can see all tickets
router.use("/payment", paymentRoute); // customer can see all tickets

export default router;
