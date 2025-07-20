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

router.use("/movies", moviesRoute); 
router.use("/bookings", bookingsRoute); 
router.use("/showtimes", showTimesRoute); 
router.use("/seats", seatsRoute);
router.use("/users", usersRoute); 
router.use("/staff", staffRoute);
router.use("/tickets", ticketsRoute);
router.use("/theaters", theaterRoute);

export default router;
