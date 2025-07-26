import express from "express";
import { createKhqrPayment } from "../controllers/paymentController";

const route = express.Router();

route.post("/qr-code", createKhqrPayment);

export default route;
