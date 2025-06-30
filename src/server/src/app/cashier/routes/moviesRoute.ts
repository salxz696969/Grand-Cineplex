import express from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovieBasedOnId,
  getMoviesAndItsScreenings,
  getMoviesFor7Days,
  updateMovie,
} from "../controllers/moviesController";
import verifyToken from "../../../middleware/verifyToken";

const route = express.Router();

route.get("/", getMoviesFor7Days);
route.get("/details", getMoviesAndItsScreenings);
route.post("/movies", verifyToken, addMovie);
route.patch("/movies/:id", verifyToken, updateMovie);
route.delete("/movies/:id", verifyToken, deleteMovie);

export default route;
