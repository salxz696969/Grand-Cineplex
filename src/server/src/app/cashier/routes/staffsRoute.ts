import { Router } from "express";
import {
  addStaff,
  getStaffInfo,
  updateStaffInfo,
  deleteStaff,
} from "../controllers/staffsController";
import authMiddlewareCashier from "../../../middleware/authMiddlewareCashier";

const route = Router();
route.use(authMiddlewareCashier)

// Add a new staff member
route.post("/", addStaff);

// Get staff info by ID
route.get("/:id", getStaffInfo);

// Update staff info by ID
route.put("/:id", updateStaffInfo);

// Delete staff by ID
route.delete("/:id", deleteStaff);

export default route;
