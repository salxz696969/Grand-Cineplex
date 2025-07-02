import express from "express";
import {
  getAllMovies,
  getMovieBasedOnId,
  getUpcomingMovies,
  getNowShowingMovies,
  getTopRatedMovies
} from "../controllers/moviesController";
import verifyToken from "../../../middleware/verifyToken";

const route = express.Router();

route.get("/", getAllMovies);
route.get("/now-showing", getNowShowingMovies);
route.get("/upcoming", getUpcomingMovies);
route.get("/top-rated", getTopRatedMovies);
route.get("/:id", getMovieBasedOnId);




export default route;
