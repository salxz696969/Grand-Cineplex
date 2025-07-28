import express from "express";
import {
  getUserInfo,
  updateUserInfo,
  addUser,
  deleteUser,
  logInUser,
} from "../controllers/userController";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = express.Router();

route.get("/", authMiddlewareManager, getUserInfo);
route.patch("/", authMiddlewareManager, updateUserInfo);
route.post("/", authMiddlewareManager, addUser);
route.delete("/:id", authMiddlewareManager, deleteUser);
route.post("/login", logInUser);

export default route;
