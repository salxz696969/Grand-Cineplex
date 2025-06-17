import express, { Express, Request, Response } from "express";
import cors from "cors";
import movieRoute from "./routes/moviesRoute";
import showTimesRoute from "./routes/showTimesRoute";
import seatsRoute from "./routes/seatsRoute";
import bookingsRoute from "./routes/bookingsRoute";
import usersRoute from "./routes/usersRoute";

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/movies", movieRoute);
app.use("/showtimes", showTimesRoute);
app.use("/seats", seatsRoute);
app.use("/bookings", bookingsRoute);
app.use("/users", usersRoute);

export default app;
