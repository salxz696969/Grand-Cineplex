import express from "express";
import { getUserInfo, logInUser } from "../controllers/userController";
import verifyToken from "../../../middleware/verifyToken";

const route = express.Router();

route.get("/", verifyToken, getUserInfo);
route.post("/login", logInUser);

export default route;
