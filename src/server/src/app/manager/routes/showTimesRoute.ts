import express from "express";
import {
  addShowTime,
  deleteShowTime,
  getAllShowTimes,
  getShowTimesBasedOnMovieId,
  getTodayShowTimes,
  updateShowTime,
} from "../controllers/screeningController";
import { getComingSoonMovies } from "../controllers/moviesController";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = express.Router();
route.use(authMiddlewareManager);

route.get("/", getAllShowTimes);
route.get("/today", getTodayShowTimes);
route.get("/movie/:id", getShowTimesBasedOnMovieId);
route.get("/coming-soon", getComingSoonMovies);
route.post("/", addShowTime);
route.patch("/:id", updateShowTime);
route.delete("/:id", deleteShowTime);
export default route;
