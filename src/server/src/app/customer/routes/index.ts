import { Router } from "express";
import moviesRoute from "./moviesRoute";
import bookingsRoute from "./bookingsRoute";
import showTimesRoute from "./showTimesRoute";
import seatsRoute from "./seatsRoute";
import usersRoute from "./usersRoute";
import staffRoute from "./staffsRoute";
import ticketsRoute from "./ticketsRoute";
import theaterRoute from "./theatersRoute";


const router = Router();

router.use("/movies", moviesRoute); // customer can see all movies
router.use("/bookings", bookingsRoute); // customer can see all bookings
router.use("/showtimes", showTimesRoute); // customer can see all showtimes
router.use("/seats", seatsRoute); // customer can see all seats
router.use("/users", usersRoute); // customer can see all users
router.use("/staff", staffRoute); // customer can see all staff
router.use("/tickets", ticketsRoute); // customer can see all tickets
router.use("/theaters", theaterRoute);

export default router;
