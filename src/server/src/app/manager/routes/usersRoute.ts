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
route.use(authMiddlewareManager)

route.get("/",  getUserInfo);
route.patch("/",  updateUserInfo);
route.post("/", addUser);
route.delete("/:id",  deleteUser);
route.post("/login", logInUser);

export default route;
