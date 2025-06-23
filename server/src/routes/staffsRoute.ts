import { Router } from "express";
import {
	addStaff,
	getStaffInfo,
	updateStaffInfo,
	deleteStaff,
} from "../controllers/staffsController";

const router = Router();

// Add a new staff member
router.post("/", addStaff);

// Get staff info by ID
router.get("/:id", getStaffInfo);

// Update staff info by ID
router.put("/:id", updateStaffInfo);

// Delete staff by ID
router.delete("/:id", deleteStaff);

export default router;
