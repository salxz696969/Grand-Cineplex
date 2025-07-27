import express from "express";
import {
  getUserInfo,
  updateUserInfo,
  addUser,
  deleteUser,
  logInUser,
} from "../controllers/userController";
import authMiddleware from "../../../middleware/authMiddleware";

const route = express.Router();

route.get("/", authMiddleware, getUserInfo);
route.patch("/", authMiddleware, updateUserInfo);
route.post("/", addUser);
route.delete("/:id", authMiddleware, deleteUser);
route.post("/login", logInUser);

export default route;
