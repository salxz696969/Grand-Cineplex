import { Router } from "express";
import {
  addStaff,
  getStaffInfo,
  updateStaffInfo,
  deleteStaff,
  getAllStaff,
} from "../controllers/staffsController";
import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route = Router();
route.use(authMiddlewareManager);

// Add a new staff member
route.post("/", addStaff);
route.get("/", getAllStaff);

// Get staff info by ID
route.get("/:id", getStaffInfo);

// Update staff info by ID
route.patch("/:id", updateStaffInfo);

// Delete staff by ID
route.delete("/:id", deleteStaff);

export default route;
