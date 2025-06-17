import express from "express";
import { getUserInfo } from "../controllers/userController";
import verifyToken from "../middleware/verifyToken";

const route = express.Router();

route.get("/", verifyToken,getUserInfo)

export default route;