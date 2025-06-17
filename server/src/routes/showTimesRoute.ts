import express from "express";
import { getAllShowTimes, getShowTimesBasedOnMovieId, getTodayShowTimes } from "../controllers/showTimesController";

const route = express.Router();

route.get("/today", getTodayShowTimes);
route.get("/", getAllShowTimes);
route.get("/movie/:id", getShowTimesBasedOnMovieId);
export default route;