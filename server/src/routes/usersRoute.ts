import express from "express";
import { getUserInfo, updateUserInfo, addUser, deleteUser } from "../controllers/userController";
import verifyToken from "../middleware/verifyToken";

const route = express.Router();

route.get("/", verifyToken, getUserInfo);
route.patch("/", verifyToken, updateUserInfo);
route.post("/", addUser);
route.delete("/:id", verifyToken, deleteUser);

export default route;
