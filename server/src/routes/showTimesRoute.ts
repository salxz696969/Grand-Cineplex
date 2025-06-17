import express from "express";
import { getAllShowTimes, getShowTimesBasedOnMovieId, getTodayShowTimes } from "../controllers/showTimesController";
import { getComingSoonMovies } from "../controllers/moviesController";

const route = express.Router();

route.get("/today", getTodayShowTimes);
route.get("/", getAllShowTimes);
route.get("/movie/:id", getShowTimesBasedOnMovieId);
route.get("/coming-soon", getComingSoonMovies);
export default route;