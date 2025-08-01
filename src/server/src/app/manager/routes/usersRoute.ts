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

// Only keeping the routes that are actually used
route.post("/login", logInUser);
// route.get("/", authMiddlewareManager, getUserInfo); // UNUSED
// route.patch("/", authMiddlewareManager, updateUserInfo); // UNUSED
// route.post("/", authMiddlewareManager, addUser); // UNUSED
// route.delete("/:id", authMiddlewareManager, deleteUser); // UNUSED

export default route;
