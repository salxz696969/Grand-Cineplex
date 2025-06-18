import express from "express";
import { addMovie, deleteMovie, getAllMovies, getMovieBasedOnId, updateMovie } from "../controllers/moviesController";
import verifyToken from "../middleware/verifyToken";

const route = express.Router();

route.get("/", getAllMovies);
route.get("/:id", getMovieBasedOnId)
route.post("/movies", verifyToken, addMovie)
route.patch("/movies/:id", verifyToken, updateMovie);
route.delete("/movies/:id", verifyToken, deleteMovie)

export default route;
