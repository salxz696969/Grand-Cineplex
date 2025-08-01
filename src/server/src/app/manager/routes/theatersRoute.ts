import { Router } from "express";
import { addTheater, getTheaters } from "../controllers/theatersController";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = Router();
route.use(authMiddlewareManager);

route.get("/", getTheaters);
route.post("/", addTheater);

export default route;
