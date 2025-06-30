import { Router } from "express";
import moviesRoute from "./moviesRoute";
import bookingsRoute from "./bookingsRoute";
import showTimesRoute from "./showTimesRoute";
import seatsRoute from "./seatsRoute";
import usersRoute from "./usersRoute";
import staffRoute from "./staffsRoute";
import ticketsRoute from "./ticketsRoute";
import verifyToken from "../../../middleware/verifyToken";

const router = Router();

// router.use("/movies", verifyToken, moviesRoute); // customer can see all movies
// router.use("/bookings", verifyToken, bookingsRoute); // customer can see all bookings
// router.use("/showtimes", verifyToken, showTimesRoute); // customer can see all showtimes
// router.use("/seats", verifyToken, seatsRoute); // customer can see all seats
// router.use("/users", verifyToken, usersRoute); // customer can see all users
// router.use("/staff", verifyToken, staffRoute); // customer can see all staff
// router.use("/tickets", verifyToken, ticketsRoute); // customer can see all tickets

router.use("/movies", moviesRoute); // customer can see all movies
router.use("/bookings", bookingsRoute); // customer can see all bookings
router.use("/showtimes", showTimesRoute); // customer can see all showtimes
router.use("/seats", seatsRoute); // customer can see all seats
router.use("/users", usersRoute); // customer can see all users
router.use("/staff", staffRoute); // customer can see all staff
router.use("/tickets", ticketsRoute); // customer can see all tickets

export default router;
