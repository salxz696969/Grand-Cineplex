import express from "express";
import {
	addMovie,
	deleteMovie,
	getAllMovies,
	getMovieBasedOnId,
	getRecentlyAddedMovies,
	updateMovie,
} from "../controllers/moviesController";
import verifyToken from "../../../middleware/authMiddlewareManager";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = express.Router();
route.use(authMiddlewareManager)

route.get("/", getAllMovies);
// route.get("/:id", getMovieBasedOnId);
route.post("/", addMovie);
route.patch("/", updateMovie);
route.delete("/movies/:id", verifyToken, deleteMovie);
route.get("/recently-added", getRecentlyAddedMovies); // Assuming you want to use the same route for recently added movies

export default route;
