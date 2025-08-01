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
import authMiddlewareCashier from "../../../middleware/authMiddlewareCashier";

const route = express.Router();
route.use(authMiddlewareCashier);

route.get("/today", getTodayShowTimes);
route.get("/", getAllShowTimes);
route.get("/movie/:id", getShowTimesBasedOnMovieId);
route.get("/coming-soon", getComingSoonMovies);
route.get("/:id", getShowTimesBasedOnId);
export default route;
