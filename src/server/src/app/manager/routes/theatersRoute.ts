import { Router } from "express";
import { addTheater, getTheaters } from "../controllers/theatersController";


const router = Router();

router.get("/", getTheaters)
router.post("/", addTheater)

export default router;
