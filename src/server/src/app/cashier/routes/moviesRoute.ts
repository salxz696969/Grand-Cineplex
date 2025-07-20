import express from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovieAndScreeningBasedOnId,
  getMoviesAndItsScreenings,
  getMoviesFor7Days,
  updateMovie,
} from "../controllers/moviesController";
import verifyToken from "../../../middleware/verifyToken";
import { get } from "http";

const route = express.Router();

route.get("/", getMoviesFor7Days);
route.get("/:id", getMovieAndScreeningBasedOnId)
route.get("/details", getMoviesAndItsScreenings);
route.post("/movies", verifyToken, addMovie);
route.patch("/movies/:id", verifyToken, updateMovie);
route.delete("/movies/:id", verifyToken, deleteMovie);

export default route;
