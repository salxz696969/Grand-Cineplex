import express from "express";
import { getAllMovies, getMovieBasedOnId } from "../controllers/moviesController";

const route = express.Router();

route.get("/", getAllMovies);
route.get("/:id", getMovieBasedOnId)

export default route;
