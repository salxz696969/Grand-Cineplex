import express from "express";
import {
  addShowTime,
  deleteShowTime,
  getAllShowTimes,
  getShowTimesBasedOnId,
  getShowTimesBasedOnMovieId,
  getTodayShowTimes,
  updateShowTime,
} from "../controllers/showTimesController";
import { getComingSoonMovies } from "../controllers/moviesController";

const route = express.Router();

route.get("/today", getTodayShowTimes);
route.get("/", getAllShowTimes);
route.get("/movie/:id", getShowTimesBasedOnMovieId);
route.get("/coming-soon", getComingSoonMovies);
route.post("/", addShowTime);
route.patch("/:id", updateShowTime);
route.delete("/:id", deleteShowTime);
route.get("/:id", getShowTimesBasedOnId);
export default route;
