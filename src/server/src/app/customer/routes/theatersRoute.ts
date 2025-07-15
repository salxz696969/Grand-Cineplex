import { Router } from "express";
import { getAllTheaters, getTheaterById } from "../controllers/theatersController";

const router = Router();

router.get("/", getAllTheaters);
router.get("/:id", getTheaterById);

export default router;
