import express from "express";
import { getUserInfo, logInUser } from "../controllers/userController";
import authMiddlewareCashier from "../../../middleware/authMiddlewareCashier";

const route = express.Router();
route.use(authMiddlewareCashier)

route.get("/", getUserInfo);
route.post("/login", logInUser);

export default route;
