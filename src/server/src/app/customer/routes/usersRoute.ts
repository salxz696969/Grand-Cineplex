import express from "express";
import {
  getUserInfo,
  login,
  signup
} from "../controllers/userController";
import authMiddleware from "../../../middleware/authMiddleware";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.get("/", authMiddleware, getUserInfo);


export default route;
