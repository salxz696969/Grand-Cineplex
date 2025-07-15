import express from "express";
import {
  getAllMovies,
  getMovieBasedOnId,
  // getUpcomingMovies,
  getMoviesFor7Days,
  getComingSoonMovies,
  getMoviesAndItsScreenings
} from "../controllers/moviesController";
// import verifyToken from "../../../middleware/verifyToken";

const route = express.Router();

route.get("/", getAllMovies);
route.get("/now-showing", getMoviesFor7Days);
route.get("/upcoming", getComingSoonMovies);
route.get("/screenings", getMoviesAndItsScreenings);




export default route;
